/**
 * Cloudflare Pages Functions Middleware
 *
 * If the environment variable PASSCODE_HASH is set, visitors must enter
 * a passcode before they can view the site. The hash is a PBKDF2-derived
 * key with a random salt.
 *
 * Generate a hash:
 *   bunx @spantree/trellis scaffold --passcode "your-password" --cloudflare ...
 *
 * Or use the legacy (deprecated) SHA-256 format:
 *   echo -n "your-password" | shasum -a 256 | cut -d' ' -f1
 *
 * Set it in the Cloudflare dashboard under Settings → Environment Variables.
 * Leave it unset for a fully public (no-auth) site.
 *
 * Optional: set LINK_KEY to enable ?key= URL authentication for link-sharing.
 * Optional: set AUTH_SESSION_TTL (seconds) to control password-login session duration (default: 604800 = 7 days).
 * Optional: set LINK_SESSION_TTL (seconds) to control link-session duration (default: 604800 = 7 days).
 */

// ---------------------------------------------------------------------------
// Auth helpers
// ---------------------------------------------------------------------------

/**
 * PBKDF2 hash format: "pbkdf2:<iterations>:<hex-salt>:<hex-derived-key>"
 * Legacy format: 64-char hex string (plain SHA-256, deprecated)
 */

async function pbkdf2Hash(password, salt, iterations) {
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveBits']);
  const bits = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', salt: enc.encode(salt), iterations, hash: 'SHA-256' },
    key,
    256
  );
  return [...new Uint8Array(bits)].map(b => b.toString(16).padStart(2, '0')).join('');
}

async function sha256(input) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(input));
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Verify a password against a stored hash.
 * Supports both PBKDF2 (preferred) and legacy SHA-256 formats.
 */
async function verifyPassword(password, storedHash) {
  if (storedHash.startsWith('pbkdf2:')) {
    const parts = storedHash.split(':');
    if (parts.length !== 4) return false;
    const [, iterStr, salt, expectedKey] = parts;
    const iterations = parseInt(iterStr, 10);
    if (!iterations || iterations < 1) return false;
    const derivedKey = await pbkdf2Hash(password, salt, iterations);
    return timingSafeEqual(derivedKey, expectedKey);
  }
  // Legacy: plain SHA-256 hex (deprecated, supported for backward compat)
  const hash = await sha256(password);
  return timingSafeEqual(hash, storedHash);
}

/**
 * Constant-time string comparison to prevent timing attacks.
 * Always iterates over the longer string so length differences
 * don't leak via early return.
 */
function timingSafeEqual(a, b) {
  const len = Math.max(a.length, b.length);
  let result = a.length ^ b.length;
  for (let i = 0; i < len; i++) {
    result |= (a.charCodeAt(i) || 0) ^ (b.charCodeAt(i) || 0);
  }
  return result === 0;
}

function getCookieValue(cookieHeader, name) {
  if (!cookieHeader) return null;
  const match = cookieHeader.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`));
  return match ? match[1] : null;
}

/**
 * Validate that a redirect target is a safe relative path.
 * Rejects absolute URLs, protocol-relative URLs, and other schemes.
 */
function sanitizeRedirect(input) {
  try {
    const url = new URL(input, 'http://localhost');
    if (url.origin !== 'http://localhost') return '/';
    return url.pathname + url.search;
  } catch {
    return '/';
  }
}

// ---------------------------------------------------------------------------
// Link-key (HMAC session) helpers
// ---------------------------------------------------------------------------

async function importHmacKey(secret) {
  const enc = new TextEncoder();
  return crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']);
}

async function createLinkSession(hmacKey, ttlSeconds) {
  const exp = Math.floor(Date.now() / 1000) + ttlSeconds;
  const payload = `exp=${exp}`;
  const sig = await crypto.subtle.sign('HMAC', hmacKey, new TextEncoder().encode(payload));
  const hexSig = [...new Uint8Array(sig)].map(b => b.toString(16).padStart(2, '0')).join('');
  return `${payload}&sig=${hexSig}`;
}

async function verifyLinkSession(cookieValue, hmacKey) {
  try {
    const params = new URLSearchParams(cookieValue);
    const exp = parseInt(params.get('exp') || '', 10);
    const sig = params.get('sig') || '';
    if (!exp || !sig) return false;
    // Check expiry
    if (Math.floor(Date.now() / 1000) > exp) return false;
    // Verify HMAC
    const payload = `exp=${exp}`;
    const expectedSig = await crypto.subtle.sign('HMAC', hmacKey, new TextEncoder().encode(payload));
    const expectedHex = [...new Uint8Array(expectedSig)].map(b => b.toString(16).padStart(2, '0')).join('');
    return timingSafeEqual(sig, expectedHex);
  } catch {
    return false;
  }
}

// ---------------------------------------------------------------------------
// Security headers
// ---------------------------------------------------------------------------

function withSecurityHeaders(response) {
  const res = new Response(response.body, response);
  res.headers.set('Referrer-Policy', 'no-referrer');
  res.headers.set('X-Content-Type-Options', 'nosniff');
  res.headers.set('X-Frame-Options', 'DENY');
  return res;
}

// ---------------------------------------------------------------------------
// Login / success pages
// ---------------------------------------------------------------------------

function getAuthSuccessPage(redirectUrl) {
  const safeUrl = JSON.stringify(redirectUrl).replace(/</g, '\\u003c');
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Authenticating\u2026</title>
</head>
<body>
<script>
  window.location.replace(${safeUrl});
</script>
</body>
</html>`;
}

function getLoginPage(redirectPath, error) {
  const safeRedirect = redirectPath.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Login – Mainframe Playbook</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: system-ui, -apple-system, sans-serif;
      display: flex; align-items: center; justify-content: center;
      min-height: 100vh;
      background: #f5f5f5; color: #333;
    }
    .card {
      background: #fff; border-radius: 12px; padding: 2.5rem;
      box-shadow: 0 4px 24px rgba(0,0,0,.08); max-width: 380px; width: 100%;
    }
    h1 { font-size: 1.25rem; margin-bottom: 1.5rem; text-align: center; }
    .brand { color: #e87722; }
    .password-wrapper {
      position: relative; margin-bottom: 1rem;
    }
    .password-wrapper input {
      width: 100%; padding: .6rem .75rem; padding-right: 2.5rem;
      border: 1px solid #ccc; border-radius: 6px; font-size: 1rem;
    }
    .password-wrapper input:focus { outline: none; border-color: #e87722; box-shadow: 0 0 0 3px #e8772233; }
    .toggle-pw {
      position: absolute; right: .5rem; top: 50%; transform: translateY(-50%);
      background: none; border: none; cursor: pointer; padding: .25rem;
      color: #999; display: flex; align-items: center;
    }
    .toggle-pw:hover { color: #e87722; }
    button[type="submit"] {
      width: 100%; padding: .65rem; border: none; border-radius: 6px;
      background: #e87722; color: #fff; font-size: 1rem; font-weight: 600;
      cursor: pointer;
    }
    button[type="submit"]:hover { opacity: .9; }
    .error { color: #c0392b; font-size: .85rem; margin-bottom: 1rem; text-align: center; }
  </style>
</head>
<body>
  <div class="card">
    <h1><span class="brand">Mainframe Playbook</span></h1>
    ${error ? '<p class="error">Incorrect passcode. Please try again.</p>' : ''}
    <form method="POST" action="/cfp_login">
      <div class="password-wrapper">
        <input id="password" name="password" type="password" placeholder="Password" required autofocus />
        <button type="button" class="toggle-pw" onclick="togglePassword()" aria-label="Toggle password visibility">
          <svg id="eye-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
        </button>
      </div>
      <input type="hidden" name="redirect" value="${safeRedirect}" />
      <button type="submit">Enter</button>
    </form>
  </div>
  <script>
    function togglePassword() {
      var input = document.getElementById('password');
      var icon = document.getElementById('eye-icon');
      if (input.type === 'password') {
        input.type = 'text';
        icon.innerHTML = '<path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/>';
      } else {
        input.type = 'password';
        icon.innerHTML = '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>';
      }
    }
  </script>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// Pages Functions middleware entry
// ---------------------------------------------------------------------------

export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const path = url.pathname;
  const passcodeHash = env.PASSCODE_HASH;

  // ---- Auth gate (only when PASSCODE_HASH is configured) ----
  if (passcodeHash) {
    const linkKey = env.LINK_KEY || '';
    const authSessionTtl = parseInt(env.AUTH_SESSION_TTL || '', 10) || 604800;
    const linkSessionTtl = parseInt(env.LINK_SESSION_TTL || '', 10) || 604800;
    const authHmacKey = await importHmacKey(passcodeHash);
    const linkHmacKey = linkKey ? await importHmacKey(linkKey) : null;

    // Handle login form submission
    if (request.method === 'POST' && path === '/cfp_login') {
      const formData = await request.formData();
      const password = String(formData.get('password') || '');
      const redirect = sanitizeRedirect(formData.get('redirect') || '/');

      if (await verifyPassword(password, passcodeHash)) {
        const authSession = await createLinkSession(authHmacKey, authSessionTtl);
        return withSecurityHeaders(new Response(getAuthSuccessPage(redirect), {
          status: 200,
          headers: {
            'Content-Type': 'text/html;charset=UTF-8',
            // HMAC-signed session — passcode hash never leaves the server.
            'Set-Cookie': `CFP_Auth=${encodeURIComponent(authSession)}; Max-Age=${authSessionTtl}; Path=/; HttpOnly; Secure; SameSite=Lax`,
          },
        }));
      }

      // Wrong password — re-render login with error
      return withSecurityHeaders(new Response(getLoginPage(redirect, true), {
        status: 401,
        headers: { 'Content-Type': 'text/html;charset=UTF-8' },
      }));
    }

    // Handle logout (clear both auth cookies)
    if (path === '/cfp_logout') {
      const headers = new Headers({
        'Content-Type': 'text/html;charset=UTF-8',
      });
      headers.append('Set-Cookie', 'CFP_Auth=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Lax');
      headers.append('Set-Cookie', 'CFP_LinkAuth=; Max-Age=0; Path=/; HttpOnly; Secure; SameSite=Lax');
      return withSecurityHeaders(new Response(
        `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8" /><title>Signing out\u2026</title></head>
<body>
<script>window.location.replace('/');</script>
</body>
</html>`,
        { status: 200, headers }
      ));
    }

    // ?key= link-key authentication
    if (linkHmacKey && url.searchParams.has('key')) {
      const providedKey = url.searchParams.get('key') || '';
      if (providedKey && timingSafeEqual(providedKey, linkKey)) {
        const session = await createLinkSession(linkHmacKey, linkSessionTtl);
        const redirectUrl = new URL(url);
        redirectUrl.searchParams.delete('key');
        const safeTarget = sanitizeRedirect(redirectUrl.pathname + redirectUrl.search);
        return withSecurityHeaders(new Response(null, {
          status: 302,
          headers: {
            'Location': safeTarget,
            'Set-Cookie': `CFP_LinkAuth=${encodeURIComponent(session)}; Max-Age=${linkSessionTtl}; Path=/; HttpOnly; Secure; SameSite=Lax`,
          },
        }));
      }
      // Invalid key — fall through to cookie check / login page
    }

    // Validate auth cookies
    let authenticated = false;

    // Check CFP_Auth (password login session cookie)
    try {
      const authCookie = decodeURIComponent(getCookieValue(request.headers.get('Cookie'), 'CFP_Auth') || '');
      if (authCookie && await verifyLinkSession(authCookie, authHmacKey)) {
        authenticated = true;
      }
    } catch {
      // Malformed cookie — treat as unauthenticated
    }

    // Check CFP_LinkAuth (link-key session cookie)
    if (!authenticated && linkHmacKey) {
      try {
        const linkCookie = decodeURIComponent(getCookieValue(request.headers.get('Cookie'), 'CFP_LinkAuth') || '');
        if (linkCookie && await verifyLinkSession(linkCookie, linkHmacKey)) {
          authenticated = true;
        }
      } catch {
        // Malformed cookie — treat as unauthenticated
      }
    }

    if (!authenticated) {
      return withSecurityHeaders(new Response(getLoginPage(path, false), {
        status: 401,
        headers: { 'Content-Type': 'text/html;charset=UTF-8' },
      }));
    }

    // Root redirect for authenticated users
    if (path === '/') return withSecurityHeaders(new Response(null, { status: 302, headers: { 'Location': '/docs/' } }));
  }

  // ---- Asset serving ----

  // Serve the static asset via Pages
  let response = await context.next();

  // If 404 or redirect and path starts with /slides/, serve slides SPA
  if ((response.status === 404 || response.status === 307) && path.startsWith('/slides/') && !path.includes('.')) {
    const spaUrl = new URL('/slides/', url.origin);
    response = await env.ASSETS.fetch(new Request(spaUrl, request));
  }

  // If 404 or redirect and path starts with /docs/, serve docs SPA
  if ((response.status === 404 || response.status === 307) && path.startsWith('/docs/') && !path.includes('.')) {
    const spaUrl = new URL('/docs/', url.origin);
    response = await env.ASSETS.fetch(new Request(spaUrl, request));
  }

  if (passcodeHash) response = withSecurityHeaders(response);
  return response;
}

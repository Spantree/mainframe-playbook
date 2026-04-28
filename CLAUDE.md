# CLAUDE.md

## Commands

```bash
bun install              # Install dependencies
bun run dev              # Start all dev servers (proxy + docs + slides)
bun run dev:docs         # Docusaurus only (port 3030)
bun run dev:slides       # Slidev only (port 3032)
bun run dev:proxy        # Unified proxy (port 3035)
bun run build            # Build everything to dist/
bunx wrangler pages deploy --project-name mainframe-playbook  # Deploy to Cloudflare Pages
```

## Project Structure

```
├── trellis.config.ts     # Brand config (colors, fonts)
├── docs/                 # Docusaurus documentation site
│   ├── docs/             # Markdown content
│   └── src/css/custom.css
├── slides/               # Slidev presentation deck
│   ├── slides.md         # Slide content
│   └── style.css         # Slide theme
├── functions/            # Cloudflare Pages Functions
│   └── _middleware.js    # Password gate middleware
├── wrangler.jsonc        # Cloudflare Pages config
└── dev-server.ts         # Local dev proxy
```

## Skills

Read the relevant skill before creating content:

- `.claude/skills/slide-content/SKILL.md` — Rules for slide content
- `.claude/skills/docs/SKILL.md` — Rules for documentation pages

## Constraints

- **Sidebar titles ≤30 characters.** The `sidebar_label` (or the first `# heading` if no label is set) must be 30 characters or fewer.
- **No slideuments.** Slides support the speaker — they should be nearly meaningless without narration. Maximum 3 bullet points or 25 words of visible text per slide.
- **Slide overflow is a build error.** Run `bunx slidev-overflow-checker --url http://localhost:3032` to detect overflow.

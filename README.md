# Mainframe Playbook

Built with Trellis

## Prerequisites

- [Bun](https://bun.sh) ≥ 1.0 — this project uses Bun workspaces, `bun --filter`, and direct TypeScript execution. **npm alone will not work.**

```bash
curl -fsSL https://bun.sh/install | bash
```

## Quick Start

```bash
bun install
bun run dev
```

This starts the docs site, slide deck, and a unified dev proxy on port 3035.

## Available Scripts

| Command | Description |
|---------|-------------|
| `bun install` | Install dependencies |
| `bun run dev` | Start all dev servers |
| `bun run dev:docs` | Docusaurus only (port 3030) |
| `bun run dev:slides` | Slidev only (port 3032) |
| `bun run build` | Build everything to `dist/` |
| `bun run deploy` | Build and deploy to Cloudflare Pages |
| `bun run set-pw` | Set the passcode for password-gated access |
| `bun run update:template` | Update from the latest Trellis template |

## Project Structure

```
mainframe-playbook/
├── docs/                 # Docusaurus documentation site
├── slides/               # Slidev presentation deck
├── functions/            # Cloudflare Pages Functions
├── dev-server.ts         # Local dev proxy
├── trellis.config.ts     # Brand config (colors, fonts)
└── package.json
```

## Deployment

This project includes a GitHub Actions workflow for deploying to Cloudflare Pages.

### GitHub Secrets

Add these secrets in your repo's **Settings → Secrets and variables → Actions**:

| Secret | Description |
|--------|-------------|
| `CLOUDFLARE_API_TOKEN` | API token with **Cloudflare Pages: Edit** permission (covers deploy + custom domains) |
| `CLOUDFLARE_ACCOUNT_ID` | Your Cloudflare account ID (Account Home → right sidebar) |

### Manual Deploy

The deploy workflow is configured for manual triggers by default. Run it from the **Actions** tab or via CLI:

```bash
gh workflow run deploy.yml
```

To enable automatic deploys on push to `main` and PR previews, remove the `if:` guard line in `.github/workflows/deploy.yml`.

### Local Deploy

You can also deploy manually from your machine:

```bash
bun run deploy
```

To set up password-gated access, configure `PASSCODE_HASH` in your Cloudflare Pages environment variables. Generate a hash locally:

```bash
bun run set-pw
```

## Template Updates

This project was scaffolded with [Trellis](https://github.com/spantree/trellis). To pull in the latest template changes:

```bash
bun run update:template
```

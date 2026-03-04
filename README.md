# www.tksohishi.com

Static personal site built with React, React Router v7, Tailwind CSS, and daisyUI.

## Stack

- React 19
- React Router v7 (Data mode)
- Tailwind CSS v4
- daisyUI v5
- Vite + TypeScript

## Local development

```bash
pnpm install
pnpm dev
```

`pnpm dev` uses polling mode by default in this project for reliable hot reload.

If you want native file watching instead:

```bash
pnpm dev:native
```

Polling is more reliable in constrained file watcher environments, but it can use more CPU.

Build for production:

```bash
pnpm run build
```

## Routing on Cloudflare Pages

- SPA fallback is configured via [`public/_redirects`](public/_redirects):

```txt
/* /index.html 200
```

## GitHub Actions deployment

Workflow file: `.github/workflows/deploy-pages.yml`

Set these in your GitHub repository settings:
- Secret: `CLOUDFLARE_API_TOKEN`
- Secret: `CLOUDFLARE_ACCOUNT_ID`
- Variable: `CLOUDFLARE_PAGES_PROJECT_NAME`

Trigger:
- Automatic deploy on `main` pushes
- Manual deploy via `workflow_dispatch`

## Cloudflare dashboard checklist

1. Create or confirm a Pages project for this repository.
2. Attach `www.tksohishi.com` and `tksohishi.com` custom domains.
3. Set redirect from apex to `https://www.tksohishi.com`.
4. Redirect only the root `<project>.pages.dev` hostname to `https://www.tksohishi.com`.
5. Keep preview hostnames `<branch>.<project>.pages.dev` available.

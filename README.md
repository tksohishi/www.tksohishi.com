# www.tksohishi.com

Static personal site built with React, React Router v7, Tailwind CSS, and daisyUI. Deployed to Cloudflare Pages.

## Stack

- React 19
- React Router v7 (Data mode)
- Tailwind CSS v4
- daisyUI v5
- Vite + TypeScript

## Local development

```bash
bun install
bun dev
```

Build for production:

```bash
bun run build
```

## Deployment

Pushes to `main` automatically deploy via GitHub Actions (`.github/workflows/deploy-pages.yml`).

SPA fallback is configured via [`public/_redirects`](public/_redirects).

# AGENTS.md

## Overview

Static personal site (www.tksohishi.com) built with React 19, React Router v7, Tailwind CSS v4, daisyUI v5, Vite, and Wrangler (Cloudflare).

## Architecture

- `src/router.tsx` — route definitions (React Router v7, `createBrowserRouter`)
- `src/screens/` — page components (`home-page.tsx`, `not-found-page.tsx`)
- `src/assets/` — static assets imported by components
- `public/_redirects` — Cloudflare Pages SPA fallback
- `.github/workflows/deploy-pages.yml` — CI/CD to Cloudflare Pages on `main` push

## Conventions

- Package manager: **bun** (not pnpm/npm)

## Boundaries

- Do not modify `.github/workflows/` without explicit approval
- Do not commit Cloudflare secrets or API tokens
- `dist/` and `node_modules/` are gitignored; never commit them

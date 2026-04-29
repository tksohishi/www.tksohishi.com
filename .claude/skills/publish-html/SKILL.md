---
name: publish-html
description: Copy a standalone HTML file (and any local assets it references — images, CSS, JS, fonts) from anywhere on disk into public/<slug>/ so it is served by the site. The slug defaults to the source HTML's project folder name. Adds robots.txt Disallow and a noindex meta tag, since published pages are typically private shares. Use when the user asks to "publish", "host", "drop in", or "copy" an HTML file into the site.
---

# publish-html

Imports a standalone HTML page into `public/<slug>/` so Cloudflare Pages serves it at `/<slug>/`. Treats the page as a private share by default: blocks bots via `robots.txt` and `<meta name="robots" content="noindex">`.

## Privacy model

These pages are served at obscure URLs, not behind auth — anyone with the link can fetch them. The skill applies two soft signals to keep them out of search engines:

1. **robots.txt** — appends `Disallow: /<slug>/` to `public/robots.txt`. Polite crawlers (Google, Bing) respect this; malicious scrapers do not.
2. **noindex meta tag** — injects `<meta name="robots" content="noindex">` into the HTML's `<head>`. Stronger than robots.txt because it applies even if a crawler fetches the page directly.

If the user needs real privacy (auth, expiry, access logs), tell them this skill is the wrong tool — they need Cloudflare Access or a different host.

## Inputs

Ask only for what's missing:
- **Source HTML path** — absolute path on disk. Required.
- **Slug** — kebab-case folder name under `public/`. Default: see "Slug derivation" below. Confirm with the user before using a derived slug.

## Slug derivation

From the source HTML path, pick the closest meaningful project name:
1. Walk up from the source file looking for a project root marker (`.git/`, `package.json`, `pyproject.toml`, `Cargo.toml`, `go.mod`). Use that directory's name.
2. If none found within 5 levels, use the immediate parent directory name.
3. If that's still generic (`src`, `dist`, `build`, `public`, `out`, `html`), walk one level up and try again.
4. Slugify: lowercase, spaces/underscores → `-`, strip non-alphanumeric except `-`.

Examples:
- `~/Work/recipe-finder/index.html` → `recipe-finder`
- `~/Work/recipe-finder/dist/index.html` → `recipe-finder` (skip `dist`)
- `~/Downloads/portfolio/v2/index.html` → `portfolio` (no project marker, walk past `v2`? no — `v2` is not in the generic list, use `v2`. Ask the user if unsure.)

## Confirming the slug

Always confirm the slug with the user before copying. How you confirm depends on whether the filename suggests siblings:

**Single-shot file** (filename has no date/version/sequence — e.g. `resume.html`, `index.html`, `pitch.html`): show the single derived slug and the destination path; ask to confirm.

**Sibling-likely file** (filename contains a date, ISO week, version, or numeric sequence — e.g. `weekly-2026-W18.html`, `report-v3.html`, `2026-04-29-notes.html`, `release-1.2.html`): present **2-3 options as a markdown table**, then state your pick and one-sentence rationale, then ask. Use this exact shape:

```
| Option | Path                                    | URL              |
|---     |---                                      |---               |
| **A**  | `public/<project>/index.html`           | `/<project>/`    |
| **B**  | `public/<project>/<date-or-version>/index.html` | `/<project>/<date-or-version>/` |
| **C**  | `public/<project>-<date-or-version>/index.html` | `/<project>-<date-or-version>/` |

My pick: **B**. <one sentence on why — e.g. "history matters more than a memorable URL for archived weeklies".> Which do you want?
```

Default lean: **B** (nested under project) when there's clearly a series; **A** (flat at project root) when it's a one-off snapshot the user will keep refreshing in place. Override your lean only when the filename or context strongly signals otherwise.

## Steps

1. **Read the source HTML.** Confirm it exists. Resolve its directory as the asset base.

2. **Derive and confirm the slug.** Follow "Confirming the slug" above — single derived slug for one-shot files; 2-3 option table with a recommendation for files that look like part of a series. Wait for the user's pick before proceeding.

3. **Find local asset references.** Grep the HTML for `src="..."`, `href="..."`, `url(...)`, `srcset="..."`. Treat as local if the value:
   - is relative (`./foo.png`, `assets/x.css`, `../img/y.jpg`), OR
   - starts with `/` and the file exists relative to the source dir.
   Skip absolute URLs (`http://`, `https://`, `//`, `data:`, `mailto:`, `#`).

4. **Check for collisions.**
   - `public/<slug>/` already exists → ask before overwriting; offer to suffix `-2`, `-3`.
   - Slug shadows a React Router route (grep `src/router.tsx` for the slug) → flag it; static files in `public/` are served before the SPA falls through, so the route becomes unreachable.

5. **Copy files.** Create `public/<slug>/`. Copy the HTML as `index.html` (rename if it isn't already). Copy assets preserving their relative paths under `<slug>/`. Use `mkdir -p` for nested asset dirs.

6. **Inject noindex meta.** In the copied `index.html`, ensure `<meta name="robots" content="noindex">` exists inside `<head>`. If `<head>` is missing, flag it and skip injection.

7. **Update robots.txt.** Append `Disallow: /<slug>/` to `public/robots.txt` under the existing `User-agent: *` block, only if not already present. If the file lacks `User-agent: *`, prepend a fresh block.

8. **Verify.** `ls -R public/<slug>` to show what landed. Grep the copied `index.html` for any leftover absolute paths (`/foo.png`, etc.) that won't resolve under `/<slug>/` and flag them. Confirm the `noindex` tag and robots.txt entry are in place.

9. **Report.**
   - Final path under `public/`
   - URL the page will be served at (`https://www.tksohishi.com/<slug>/`)
   - Asset count copied
   - Confirmation that `noindex` meta and `Disallow` entry were applied
   - Any unresolved references or route collisions flagged in steps 4 and 8
   - Reminder: link is obscurity-only — anyone with the URL can fetch it. Bot indexing is blocked, direct access is not.
   - Reminder: this lands on the next push to `main` via `.github/workflows/deploy-pages.yml`. Don't commit unless the user asks.

## Edge cases

- **Source file missing** → stop and ask for the correct path.
- **Asset outside the source's directory tree** (e.g. `../../shared/logo.png`) → copy it but flatten under `<slug>/assets/` and rewrite the HTML reference. Tell the user what was rewritten.
- **HTML references `/` absolute paths that don't exist locally** → likely CDN-hosted or broken; leave as-is and flag in the report.
- **HTML uses `<base href="...">`** → flag it; the imported copy may not work without adjustment.
- **Source filename is meaningful and not `index.html`** (e.g. `resume.html`, `slides.html`) → ask whether to keep that filename (URL becomes `/<slug>/resume.html`) or rename to `index.html` (URL is `/<slug>/`).

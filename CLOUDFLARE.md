# Cloudflare Pages setup

Recommended Cloudflare Pages settings for this repo.

## Project

- Project name: `tradiewebsites`
- Production branch: `main`
- Framework preset: `None`
- Build command: leave blank
- Build output directory: `/`
- Root directory: `/`

## Domains and redirects

Canonical URL:

- `https://tradiewebsites.com/`

Every other hostname should 301 redirect to that canonical apex while preserving path and query string:

- `http://tradiewebsites.com/*` → `https://tradiewebsites.com/:splat`
- `https://www.tradiewebsites.com/*` → `https://tradiewebsites.com/:splat`
- `http://www.tradiewebsites.com/*` → `https://tradiewebsites.com/:splat`
- `https://tradieswebsites.com/*` → `https://tradiewebsites.com/:splat`
- `http://tradieswebsites.com/*` → `https://tradiewebsites.com/:splat`
- `https://www.tradieswebsites.com/*` → `https://tradiewebsites.com/:splat`
- `http://www.tradieswebsites.com/*` → `https://tradiewebsites.com/:splat`

Cloudflare Pages custom domains:

- `tradiewebsites.com` — primary Pages custom domain.
- `www.tradiewebsites.com` — add as a Pages custom domain only if needed for SSL/routing, then redirect to apex with a Redirect Rule/Bulk Redirect.

Redirect-only alias domain:

- `tradieswebsites.com` and `www.tradieswebsites.com` should not serve the Pages site directly. They should redirect to `https://tradiewebsites.com/`.
- Best setup: move `tradieswebsites.com` to Cloudflare nameservers as its own zone, then create redirect rules there.
- Alternative setup: use Porkbun URL forwarding for both apex and www until the domain is moved to Cloudflare.

Do not use `_redirects` for cross-domain canonical redirects. `_redirects` only accepts relative source paths inside the same Pages project; full hostname redirects belong in Cloudflare Redirect Rules/Bulk Redirects or registrar forwarding.

If Cloudflare Pages says `Hostname 'tradiewebsites.com' already has externally managed DNS records`, delete any existing `A`, `AAAA`, or `CNAME` DNS records for `@` / `tradiewebsites.com` first, then add the Pages custom domain again. Do the same for `www` before attaching `www.tradiewebsites.com`.

## GitHub repo

Cloudflare Pages should connect to:

- `https://github.com/dmoore2k1/tradies.git`
- branch: `main`

## Current repo files relevant to Cloudflare

- `index.html` — static site
- `images/` — static assets
- `_headers` — security/cache headers
- `_redirects` — redirect `tradieswebsites.com` to `tradiewebsites.com`

## Later

Add a Worker for contact form submissions after the static site is live.
Keep the first deployment simple: static Pages first, form handling second.

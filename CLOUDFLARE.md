# Cloudflare Pages setup

Recommended Cloudflare Pages settings for this repo.

## Project

- Project name: `tradiewebsites`
- Production branch: `main`
- Framework preset: `None`
- Build command: leave blank
- Build output directory: `/`
- Root directory: `/`

## Domains

Attach these custom domains:

- `tradiewebsites.com` — primary
- `www.tradiewebsites.com` — optional, redirect to apex if Cloudflare offers it
- `tradieswebsites.com` — redirect alias via Cloudflare Bulk Redirects or registrar redirect, not `_redirects`
- `www.tradieswebsites.com` — optional alias

Both domains should use Cloudflare nameservers or be active zones in the same account before attaching them to Pages. Cross-domain redirects cannot be created in `_redirects`; use Bulk Redirects or the registrar redirect feature.

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

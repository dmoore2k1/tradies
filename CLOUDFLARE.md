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
- `tradieswebsites.com` — redirect alias via `_redirects`
- `www.tradieswebsites.com` — optional alias

Both domains should use Cloudflare nameservers or be active zones in the same account.

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

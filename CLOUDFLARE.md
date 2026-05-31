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
- `_redirects` — internal path redirects (currently empty)
- `functions/api/submit.js` — Pages Function (contact form handler)

## Contact Form Worker

The form at `https://tradiewebsites.com/#contact` posts to `/api/submit`, which is handled by the Pages Function at `functions/api/submit.js`.

To enable email delivery:

1. **Sign up at [resend.com](https://resend.com)** (free tier: 100 emails/month).
2. **Add `tradiewebsites.com` as a verified domain** in Resend (DNS TXT record).
3. **Create a Resend API key**.
4. **Add it as a Cloudflare Pages secret:**
   - Cloudflare dashboard → Pages → `tradiewebsites` → Settings → Environment variables (secrets)
   - Key: `RESEND_API_KEY`
   - Value: your Resend API key
   - Scope: Production
5. **Optionally add a notification email:**
   - Same place, add `NOTIFICATION_EMAIL` = the email address that should receive form submissions
   - Defaults to `hello@tradiewebsites.com` if not set

When `RESEND_API_KEY` is not configured, the form still accepts submissions but logs them to Cloudflare Pages logs without sending an email.

Alternative email methods (if you prefer not to use Resend):
- **Cloudflare Email Routing:** Enable Email Routing for tradiewebsites.com, set up `hello@tradiewebsites.com` → your inbox, then replace the `fetch()` call in the Worker with `env.SEND_EMAIL.send()` and add the binding in Pages settings.
- **Gmail REST API:** Use your existing Google credentials with the Gmail API.

# Tradie Websites landing page strategy

This repo is now aligned to the chosen Agency OS wedge: a simple, trust-first website offer for Australian tradies.

## Current public offer

- Brand/domain: `tradiewebsites.com`
- Redirect alias: `tradieswebsites.com`
- Core product: Tradie Website Starter
- Price: `$599 setup + $59/month`
- Likely minimum term: 6 months, but do not over-emphasise term on the landing page until confirmed
- Starter Plus: `$899 setup + $59/month`, includes simple Logo Reboot
- Logo Reboot add-on: approx `$299`, simple cleanup/modernisation only

## Positioning

Plain-English promise:

> Your tradie website, sorted.

The page should sell a practical starter website, not a broad digital agency or expensive website package.

Tone:

- Australian
- direct
- no-nonsense
- trust-first
- calm and credible
- no AI hype
- no marketing-guru language
- no fake urgency
- no invented testimonials or inflated metrics

## Best-fit prospects

A. No or weak web presence
- No website
- Facebook/directory-only
- broken or abandoned old site
- poor mobile contact path
- Fit: Website Starter

B. Decent site, weak enquiry path
- Already has a real website
- Has photos/services/phone/email but no structured enquiry path
- Fit: enquiry-path refresh, not the basic Starter pitch

C. Strong site
- Clear contact path
- trust proof
- fast mobile experience
- good service-area positioning
- Fit: ignore unless a specific conversion issue is visible

## Landing page structure

1. Hero
   - simple websites for Australian tradies
   - headline: "Your tradie website, sorted."
   - price visible above the fold
   - CTA: Start my website

2. Job-to-be-done section
   - legitimate web presence
   - easier quoting
   - low maintenance

3. Offer/pricing section
   - $599 setup + $59/month
   - clear inclusions
   - Starter Plus mention

4. Fit section
   - who it is for
   - who it is not for
   - avoid pitching "you need a website" to businesses with decent sites

5. Process
   - send details
   - preview
   - go live

6. FAQ
   - focused starter website, not a bloated multi-page build
   - what monthly covers
   - domain support
   - existing site path
   - logo reboot

7. Contact form
   - currently draft/static
   - wire to Cloudflare Worker before deployment

## Technical notes

- Static HTML/CSS/JS only for now
- Deploy via Cloudflare Pages connected to GitHub
- Wire form after static page review using Cloudflare Workers
- Do not add WordPress, Webflow, HubSpot, Pipedrive, or n8n defaults unless David explicitly chooses them

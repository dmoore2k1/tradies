# Tradies Websites - Productised Website Service

## Concept & Vision

A high-converting landing page for selling pre-built, productised websites to Australian tradies (tradespeople). The site feels **Australian, trustworthy, and no-nonsense** — like a reliable tradie who'd show up on time and do the job right. Bold headlines, instant credibility, and friction-free paths to purchase. The personality is confident but approachable — we're not here to waste their time with tech jargon.

## Design Language

### Aesthetic Direction
**Industrial Modern** — Clean lines with subtle construction/building motifs. Dark backgrounds with high-contrast accents suggest professionalism and trust. Feels like a premium tool brand, not a generic web agency.

### Color Palette
- **Primary**: `#1A1A2E` (deep navy — authority, trust)
- **Secondary**: `#16213E` (darker navy for depth)
- **Accent**: `#F59E0B` (amber/gold — energy, Australian warmth, action)
- **Accent Hover**: `#D97706` (darker amber)
- **Background**: `#0F0F1A` (near-black)
- **Surface**: `#1E1E30` (cards, sections)
- **Text Primary**: `#FFFFFF`
- **Text Secondary**: `#94A3B8` (muted slate)
- **Success**: `#10B981` (green for checkmarks, trust signals)

### Typography
- **Headings**: `Space Grotesk` (700) — geometric, modern, trustworthy
- **Body**: `Inter` (400, 500, 600) — clean, highly legible
- **Accent/Numbers**: `Space Grotesk` (500) — for pricing, stats

### Spatial System
- Base unit: 8px
- Section padding: 80px-120px vertical
- Container max-width: 1200px
- Card border-radius: 16px
- Button border-radius: 8px

### Motion Philosophy
- **Entrance animations**: Fade-up on scroll (300ms ease-out, staggered 80ms)
- **Hover states**: Scale 1.02 + shadow lift (200ms ease-out)
- **CTA buttons**: Subtle pulse animation to draw attention
- **Numbers**: Count-up animation when stats enter viewport
- All motion respects `prefers-reduced-motion`

### Visual Assets
- **Icons**: Lucide icons (consistent 24px, 2px stroke)
- **Images**: Unsplash contractor/trades imagery (hard hats, tools, completed work)
- **Decorative**: Subtle grid patterns, gradient overlays, geometric accents

## Layout & Structure

### Visual Pacing (Top to Bottom)

1. **Hero Section** — Full viewport, bold headline, immediate value prop, primary CTA
2. **Trust Bar** — Logos/stats strip (jobs completed, satisfaction rate, etc.)
3. **Problem/Solution** — Brief pain point → solution narrative
4. **Portfolio Preview** — 3 sample websites with brief descriptions
5. **Productised Pricing** — 3 tiers, clear differentiation, best-value highlight
6. **What's Included** — Feature checklist with icons
7. **Process Steps** — 3-step simple process (Choose → We Build → Launch)
8. **Testimonials** — Real-sounding Aussie tradie quotes
9. **FAQ** — 5-6 common objections answered
10. **Final CTA** — Strong closing statement + action button
11. **Footer** — Contact, legal, Australian ownership

### Responsive Strategy
- Mobile-first, single column below 768px
- Pricing cards stack vertically on mobile
- Hero text scales down (clamp: 2.5rem–4.5rem)
- Touch-friendly tap targets (min 48px)

## Features & Interactions

### Hero Section
- Headline: "More Jobs. Less Time. Your Website Sorted."
- Subheadline: "Professional websites for tradies — delivered in 7 days, no tech headaches"
- Primary CTA: "Get My Website" (amber button, pulses subtly)
- Secondary CTA: "See Examples" (ghost button, scrolls to portfolio)
- Background: Subtle gradient with faint grid pattern

### Trust Bar
- Stats: "500+ Websites Delivered" | "4.9★ Average Rating" | "7-Day Turnaround" | "100% Australian Owned"
- Subtle horizontal scroll on mobile

### Portfolio Section
- 3 website mockups displayed in browser frames
- Categories: Electrical, Plumbing, Construction
- Hover: Slight lift + "View Website" overlay appears
- Each links to external example (placeholder # for now)

### Pricing Section
**Tier 1 — Essential** ($1,497)
- Single page website
- Mobile responsive
- Contact form
- 5-day delivery
- Best for: Getting started online

**Tier 2 — Professional** ($2,497) [HIGHLIGHTED]
- Up to 5 pages
- All Tier 1 features
- Google Maps integration
- Social media links
- SEO basics
- 7-day delivery
- **Most Popular** badge

**Tier 3 — Business** ($3,997)
- Up to 10 pages
- All Tier 2 features
- Online booking system
- Photo gallery
- Google Ads setup
- 14-day delivery
- Priority support

CTA on each: "Get Started"

### Process Section
1. **Choose Your Package** — Pick the tier that fits your business
2. **We Build It** — We create your website with your branding
3. **Go Live** — Launch and start getting more customers

### FAQ Items
- "I'm not tech-savvy — will I be able to update it?"
- "Do you do trades outside of website building?"
- "What if I don't like the design?"
- "How long does it take?"
- "Do you offer ongoing support?"
- "What payments do you accept?"

### Form Interactions
- "Get My Website" CTA opens modal or scrolls to contact form
- Form fields: Name, Email, Phone, Business Type (dropdown), Package Interest (dropdown), Message (optional)
- Validation: Inline, real-time
- Submit: Shows loading state, then success message

## Component Inventory

### Navigation
- Fixed top, transparent → solid on scroll
- Logo left, CTA button right
- Mobile: Hamburger menu with slide-in drawer

### Buttons
- **Primary**: Amber bg, dark text, subtle shadow, hover lifts
- **Secondary/Ghost**: Transparent, amber border, amber text, hover fills
- **States**: Default, hover (scale 1.02), active (scale 0.98), disabled (opacity 0.5)

### Cards
- Dark surface bg (#1E1E30), 16px radius, subtle border
- Hover: Lift + border glow (amber at 20% opacity)

### Badges
- Small pill shapes, amber bg, dark text
- Used for "Most Popular", "New", etc.

### Trust Signals
- Green checkmarks for included features
- Star ratings with numeric display
- Australian flag icon for local ownership

### Modal
- Centered, backdrop blur, fade-in
- Close on X, backdrop click, or Escape key

## Technical Approach

### Stack
- Single HTML file with embedded CSS and JavaScript
- No build step — immediately deployable
- Vanilla JS for interactions (no framework needed)
- CSS custom properties for theming
- Google Fonts loaded async

### Performance Targets
- < 200KB total page weight
- First contentful paint < 1.5s
- No external JS dependencies

### Accessibility
- Semantic HTML throughout
- ARIA labels on interactive elements
- Focus visible states
- Color contrast AA compliant
- Reduced motion support

### SEO
- Proper heading hierarchy (single H1)
- Meta description, OG tags
- Structured data (LocalBusiness schema)
- Semantic landmarks

### Form Handling
- Client-side validation
- Form submits to Formspree (or placeholder endpoint)
- Success/error states with user feedback
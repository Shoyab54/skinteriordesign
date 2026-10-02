# SK Interior Design — PRD

## Original problem statement
Premium, modern, high-end website for interior design company "SK Interior Design" — cinematic hero, smooth scroll animations, parallax project cards, dedicated project pages, floating WhatsApp button, fully responsive. Latest requirement: integrate ALL 85 user-uploaded project photos, dedicated `/gallery` page with masonry layout, lightbox, category filtering, replace stock images sitewide, performance + SEO.

## User personas
- Prospective clients (homeowners / businesses) browsing portfolio work
- Visitors contacting the studio via WhatsApp

## Architecture
- Frontend: React (CRA + craco), react-router-dom, framer-motion (reveals, hero kinetic title, lightbox), lenis (smooth momentum scroll), custom CSS design system (obsidian #0b0b0a + champagne gold #c9a86a, Fraunces display + Manrope body + DM Mono accents)
- Backend: FastAPI (not used yet; site is a static portfolio)
- Assets: `/app/frontend/public/gallery/gallery-001..085.jpeg` (user uploads, renamed, black letterbox bars auto-cropped via PIL); dimensions in `/app/frontend/src/gallery-meta.json`
- Structure: `src/pages/{Home,Gallery,ProjectDetail}.js`, `src/components/{Navbar,Footer,Marquee,Reveal,Lightbox,Logo,WhatsAppFloat}.js`, `src/data/site.js` (single source of truth: gallery images + categories, projects, services), `src/lib/{smoothScroll,hooks}.js`

## Core requirements (static)
- Premium luxury aesthetic, responsive, fast
- Every uploaded image used in /gallery
- Masonry + lightbox + category filters
- Floating WhatsApp CTA (wa.me/2349082443145)

## Implemented
- 2026-07 session 1: Landing page, 3D/parallax hero, services, work cards, WhatsApp float, project detail pages (/projects/:slug) with stories/materials/floor plans
- 2026-10-02: All 85 uploaded images integrated (16 letterboxed images auto-cropped). New /gallery page: masonry (3/2/1 cols), filters (All 85, Living 28, Dining 9, Bedroom 20, Kitchen 9, Details 19), full-screen lightbox (arrows, keyboard, swipe, counter, captions). Homepage: kinetic masked-line hero reveal with real photo (gallery-015), scroll parallax, editorial marquee, parallax work cards, gallery teaser strip, real photos everywhere (stock images eliminated). Custom SK diamond SVG logo + favicon. Lenis smooth scrolling. Per-page SEO titles/descriptions + OG tags. Lazy loading + aspect-ratio boxes (no CLS). Fully responsive (verified 375/768/1366).
- 2026-10-02 (branding update): Company is Mumbai-based. Phone/WhatsApp now +91 9082443145 (wa.me/919082443145). Official address added (Sakinaka Kharani Road, Andheri East, Mumbai 400072) in footer + contact section with MapPin icon. New "Visit the studio" map section on Home with dark-themed interactive Google Maps embed (address-query based, no hardcoded lat/lng) + Get Directions button (opens Google Maps in new tab). Social links (Facebook/Instagram/YouTube, exact URLs) in footer + contact with circular gold-hover icons. LocalBusiness JSON-LD structured data + meta descriptions updated to Mumbai. Project location tags localized (Andheri/Bandra/Juhu/Powai). Logo component ready for official logo: drop file at /app/frontend/public/logo.png — it appears in navbar, mobile nav, and footer automatically (SVG mark is fallback until upload arrives). Favicon swap pending logo file.

## Verified working
- /gallery: 85 items render, filters return correct counts, lightbox opens/navigates/closes (keyboard + buttons)
- Project detail: 7-image galleries per project, lightbox, next-project nav
- Home: hero reveal, marquee, work cards, teaser strip, mobile menu
- Contact: +91 phone, email, address, 3 social icons, WhatsApp wa.me/919082443145
- Map: embed loads with marker on Khairani Rd, Get Directions href correct, 440px desktop / 320px mobile
- Footer: address, socials, phone, email, nav links, copyright; stacks cleanly at 375px; no horizontal overflow
- Tablet 768px = 2 columns, mobile = 1 column

## Backlog
- P1: OG image per project page, sitemap.xml + robots.txt
- P1: Image CDN/WebP conversion for faster loads (currently ~130KB avg JPEGs, lazy loaded)
- P2: Contact form with backend email (FastAPI + Resend)
- P2: CMS/admin to add gallery images without code changes
- P2: Before/after slider on project pages

## Deployment config (Vercel)
- 2026-10-02: Added /app/vercel.json (v2): frontend = @vercel/static-build on frontend/package.json (CRA/craco, distDir build, CI=false to avoid warnings-as-errors), backend = @vercel/python on /app/api/index.py (imports FastAPI app from backend/server.py). Routes: /api/* → serverless function; filesystem; catch-all → /frontend/index.html (SPA). Root /app/requirements.txt = lean deps for the serverless function. No bindings needed (frontend never calls backend). Verified: CRA production build passes; ASGI import + routes OK. Vercel env vars to set: MONGO_URL (Atlas), DB_NAME, CORS_ORIGINS, REACT_APP_BACKEND_URL.

## Branding assets
- Official logo: user-provided photo enhanced via PIL (texture/glare removed, flattened to cream tile, 2x upscale + sharpen) at /app/frontend/public/logo.png (932x1130). Used in navbar (38px), mobile nav, footer (72px) with gold hairline border. Favicon: /app/frontend/public/favicon.png (512px, crown+SK crop). Logo component falls back to SVG mark if logo.png missing.
- Instagram: https://www.instagram.com/sk.interior_desing_in_mumbai (updated 2026-10-02; also in JSON-LD sameAs)
- Phone/WhatsApp: +91 9082443145 · Address: Sakinaka Kharani Road, Andheri East, Mumbai 400072

## Next tasks
1. Convert gallery JPEGs to WebP with JPEG fallback
2. Add sitemap.xml/robots.txt for SEO
3. Contact form backend

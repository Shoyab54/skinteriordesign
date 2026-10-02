# SK Interior Design — Product Brief

## Original problem statement
Create a premium, modern, high-end 3D website for SK Interior Design using the brand phone/WhatsApp number 09082443145. The experience should be a cinematic, elegant and professional interior-design portfolio with responsive 3D/parallax motion, project showcase, services, about, contact, WhatsApp CTAs, accessibility, SEO semantics, performance safeguards and reduced-motion support. Preserve existing functionality where present and avoid a basic template look.

## Architecture decisions
- Single-page React portfolio using the existing CRA/CRACO setup.
- CSS-first motion system with IntersectionObserver reveals, GPU-friendly transforms, responsive media queries, and a reduced-motion override.
- External Unsplash imagery supplied by the design direction; no backend data or authentication is needed for this marketing experience.
- WhatsApp uses `https://wa.me/2349082443145` and phone CTAs use `tel:+2349082443145`.

## Implemented
- Cinematic hero with depth-responsive background, grid overlay, CTA buttons and editorial typography.
- Sticky desktop navbar and accessible responsive mobile menu.
- About/introduction, services grid, project slider with navigation controls, manifesto, contact and minimal footer.
- Scroll reveal animations, subtle project image zoom/parallax feel, hover states, floating WhatsApp CTA, phone links and SEO title.
- Fully responsive desktop/mobile layouts, semantic sections, image alt text, unique data-testid selectors, and reduced-motion support.
- Verified production build, lint, and frontend E2E behavior at 1920x800 and 390x844 with no reported issues.

## Prioritized backlog
- P0: None.
- P1: Replace sample project imagery and email address with SK’s final approved content when available.
- P2: Add project detail routes and a real enquiry form if the studio wants lead capture beyond WhatsApp.

## Next tasks
- Curate approved SK project photography and captions.
- Add social proof/testimonials when supplied.
- Connect an enquiry form to the studio’s preferred inbox or CRM.
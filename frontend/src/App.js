import { useEffect, useRef, useState } from "react";
import "@/App.css";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, Menu, MoveUpRight, X } from "lucide-react";
import { BrowserRouter, Link, Route, Routes, useNavigate, useParams } from "react-router-dom";

const whatsapp = "https://wa.me/2349082443145?text=Hello%20SK%20Interior%20Design%2C%20I%27d%20like%20to%20discuss%20a%20project.";
const images = {
  hero: "https://images.unsplash.com/photo-1720247520862-7e4b14176fa8?auto=format&fit=crop&w=2200&q=88",
  portfolio1: "https://images.unsplash.com/photo-1663811397219-c572550dffc5?auto=format&fit=crop&w=1400&q=85",
  portfolio2: "https://images.unsplash.com/photo-1663811397207-418a92396ad5?auto=format&fit=crop&w=1400&q=85",
  portfolio3: "https://images.unsplash.com/photo-1702411200201-3061d0eea802?auto=format&fit=crop&w=1400&q=85",
  portfolio4: "https://images.unsplash.com/photo-1704040686413-2c607dbd2f06?auto=format&fit=crop&w=1400&q=85",
  detail: "https://images.unsplash.com/photo-1648881806148-e5c51179c826?auto=format&fit=crop&w=1100&q=85",
};
const projects = [
  { slug: "the-obsidian-house", name: "The Obsidian House", type: "Residential / Lagos", image: images.portfolio1, number: "01", year: "2024", size: "4,200 sq ft", story: "A private retreat built around contrast — cool stone, warm timber and the slow rhythm of natural light. The Obsidian House is designed as a sequence of intimate moments, where every threshold reveals a new texture.", materials: ["Pietra Grey marble", "Smoked oak", "Hand-finished plaster", "Brushed bronze"], gallery: [images.portfolio1, images.hero, images.detail], rooms: ["Entry court", "Living salon", "Dining room", "Primary suite"] },
  { slug: "aureum-residence", name: "Auréum Residence", type: "Luxury Living / Abuja", image: images.portfolio2, number: "02", year: "2023", size: "6,800 sq ft", story: "A study in soft grandeur for a family who wanted their home to feel collected, never decorated. Curved joinery, luminous fabrics and quiet champagne tones give the residence its gentle sense of ceremony.", materials: ["Travertine", "Champagne linen", "Walnut veneer", "Antique brass"], gallery: [images.portfolio2, images.portfolio4, images.hero], rooms: ["Gallery hall", "Formal lounge", "Family kitchen", "Guest wing"] },
  { slug: "the-quiet-form", name: "The Quiet Form", type: "Hospitality / Ikoyi", image: images.portfolio3, number: "03", year: "2024", size: "12,400 sq ft", story: "Created for a boutique hospitality concept in the heart of Ikoyi, The Quiet Form lets proportion do the talking. Sculptural furniture floats inside a calm, tactile envelope of sand, shadow and greenery.", materials: ["Terrazzo", "Bouclé wool", "Rattan weave", "Limestone"], gallery: [images.portfolio3, images.detail, images.portfolio1], rooms: ["Arrival lounge", "Dining salon", "Library bar", "Private dining"] },
  { slug: "verde-house", name: "Verde House", type: "Residential / Lekki", image: images.portfolio4, number: "04", year: "2023", size: "3,600 sq ft", story: "Verde House brings the garden inside. A restrained palette of mineral green and pale oak frames views to the outdoors, making the home feel open, restorative and deeply connected to its setting.", materials: ["Green onyx", "Pale oak", "Limewash", "Natural linen"], gallery: [images.portfolio4, images.portfolio2, images.detail], rooms: ["Garden room", "Open kitchen", "Primary retreat", "Courtyard"] },
];
const services = [
  ["01", "Residential Interiors", "Thoughtful, tactile homes shaped around how you live, gather and rest."],
  ["02", "Commercial Spaces", "Distinctive environments that turn every brand touchpoint into an experience."],
  ["03", "Turnkey Solutions", "From first sketch to final styling, one considered vision carried through."],
  ["04", "Custom Furniture", "Quietly expressive pieces made to belong to your architecture."],
];

function useReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cursor, setCursor] = useState({ x: -100, y: -100, active: false });
  const heroRef = useRef(null);
  const workRef = useRef(null);
  useReveal();

  useEffect(() => {
    document.title = "SK Interior Design — Crafting Timeless Spatial Sanctuaries";
    const onScroll = () => setScrolled(window.scrollY > 40);
    const onMove = (event) => setCursor({ x: event.clientX, y: event.clientY, active: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("mousemove", onMove); };
  }, []);

  const moveHero = (event) => {
    if (!heroRef.current || window.matchMedia("(pointer: coarse)").matches) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    heroRef.current.style.setProperty("--mouse-x", `${x * 18}px`);
    heroRef.current.style.setProperty("--mouse-y", `${y * 14}px`);
  };
  const scrollTo = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMenuOpen(false); };
  const slide = (direction) => workRef.current?.scrollBy({ left: direction * (workRef.current.clientWidth * 0.72), behavior: "smooth" });

  return <main className="site-shell">
    <div className={`cursor-dot ${cursor.active ? "cursor-visible" : ""}`} style={{ left: cursor.x, top: cursor.y }} aria-hidden="true" />
    <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`} data-testid="site-navbar">
      <button className="brand-mark" onClick={() => scrollTo("home")} data-testid="brand-home-link" aria-label="Go to home"><span>SK</span><small>INTERIOR DESIGN</small></button>
      <div className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
        {["about", "services", "work", "contact"].map((item) => <button key={item} onClick={() => scrollTo(item)} data-testid={`nav-${item}-link`}>{item === "work" ? "Our Work" : item[0].toUpperCase() + item.slice(1)}</button>)}
        <a href={whatsapp} target="_blank" rel="noreferrer" className="nav-cta" data-testid="nav-whatsapp-link">Start a conversation <ArrowUpRight size={14} /></a>
      </div>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} data-testid="mobile-menu-toggle" aria-label={menuOpen ? "Close menu" : "Open menu"}>{menuOpen ? <X /> : <Menu />}</button>
    </nav>

    <section id="home" className="hero" ref={heroRef} onMouseMove={moveHero} data-testid="hero-section">
      <div className="hero-image" style={{ backgroundImage: `url(${images.hero})` }} aria-label="Warm modern interior with sculptural furniture" />
      <div className="hero-shade" /><div className="hero-grid" />
      <div className="hero-content">
        <p className="eyebrow reveal">LAGOS · ABUJA · BEYOND <span /></p>
        <h1 className="hero-title reveal" data-testid="hero-heading">Spaces<br /><em>that speak.</em></h1>
        <p className="hero-copy reveal">We compose refined interiors for people who believe the details are everything.</p>
        <div className="hero-actions reveal"><button className="button button-gold" onClick={() => scrollTo("work")} data-testid="view-work-button">View our work <ArrowRight size={16} /></button><button className="text-button" onClick={() => scrollTo("contact")} data-testid="hero-contact-button">Get in touch <ArrowDown size={16} /></button></div>
      </div>
      <div className="hero-meta"><span>SCROLL TO EXPLORE</span><span className="hero-line" /><span>01 / 04</span></div>
      <div className="hero-stamp">SK<span>✦</span>24</div>
    </section>

    <section className="intro section-pad" id="about" data-testid="about-section"><div className="section-kicker reveal"><span>01</span><span>Our point of view</span></div><div className="intro-grid"><h2 className="display-heading reveal">A room is never<br />just <em>a room.</em></h2><div className="intro-text reveal"><p>It is a feeling, a rhythm, a reflection of who you are. At SK, we create considered interiors where architecture, material and light come together in quiet harmony.</p><button className="underlined-link" onClick={() => scrollTo("contact")} data-testid="about-contact-link">Discover our approach <MoveUpRight size={15} /></button></div></div></section>

    <section className="services section-pad" id="services" data-testid="services-section"><div className="section-kicker reveal"><span>02</span><span>What we do</span></div><div className="services-heading"><h2 className="display-heading reveal">The art of<br /><em>considered living.</em></h2><p className="muted reveal">One studio. Every detail.<br />A complete point of view.</p></div><div className="service-grid">{services.map(([number, title, text], index) => <article className="service-card reveal" style={{ "--delay": `${index * 80}ms` }} key={title} data-testid={`service-card-${number}`}><div className="service-top"><span>{number}</span><ArrowUpRight size={17} /></div><h3>{title}</h3><p>{text}</p><div className="service-rule" /></article>)}</div></section>

    <section className="work section-pad" id="work" data-testid="work-section"><div className="work-top"><div className="section-kicker reveal"><span>03</span><span>Selected work</span></div><div className="slider-controls"><button onClick={() => slide(-1)} data-testid="projects-previous-button" aria-label="Previous project"><ChevronLeft /></button><button onClick={() => slide(1)} data-testid="projects-next-button" aria-label="Next project"><ChevronRight /></button></div></div><div className="work-heading"><h2 className="display-heading reveal">Made to be<br /><em>lived in.</em></h2><p className="muted reveal">A selection of spaces we have had<br />the privilege to shape.</p></div><div className="project-track" ref={workRef} data-testid="project-slider">{projects.map((project, index) => <Link className="project-card reveal" style={{ "--delay": `${index * 100}ms` }} key={project.name} to={`/projects/${project.slug}`} data-testid={`project-card-${project.number}`}><div className="project-image-wrap"><img src={project.image} alt={`${project.name} interior design project`} loading={index > 1 ? "lazy" : "eager"} /><span className="project-number">{project.number}</span><span className="project-view">View project <ArrowUpRight size={15} /></span></div><div className="project-caption"><div><h3>{project.name}</h3><p>{project.type}</p></div><span className="caption-arrow"><ArrowRight size={17} /></span></div></Link>)}</div></section>

    <section className="manifesto section-pad"><div className="manifesto-rule" /><p className="eyebrow reveal">THE SK STANDARD</p><h2 className="manifesto-title reveal">“The most luxurious thing<br />in a space is <em>how it feels.”</em></h2><div className="manifesto-bottom"><span>— SK INTERIOR DESIGN</span><span>04 / 04</span></div></section>

    <section className="contact section-pad" id="contact" data-testid="contact-section"><div className="contact-image" style={{ backgroundImage: `url(${images.detail})` }} /><div className="contact-overlay" /><div className="contact-content"><p className="eyebrow reveal">LET'S CREATE TOGETHER</p><h2 className="display-heading reveal">Your next space<br /><em>starts here.</em></h2><p className="contact-copy reveal">Tell us a little about what you are imagining. We would love to hear from you.</p><a className="button button-gold reveal" href={whatsapp} target="_blank" rel="noreferrer" data-testid="contact-whatsapp-button">Chat on WhatsApp <ArrowUpRight size={16} /></a><div className="contact-details reveal"><a href="tel:+2349082443145" data-testid="contact-phone-link">090 8244 3145</a><span>hello@skinteriordesign.com</span></div></div></section>

    <footer className="footer"><div className="footer-brand" data-testid="footer-brand"><span>SK</span><p>Interior design for<br />the quietly particular.</p></div><div className="footer-nav"><span className="eyebrow">Explore</span><button onClick={() => scrollTo("about")} data-testid="footer-about-link">About</button><button onClick={() => scrollTo("services")} data-testid="footer-services-link">Services</button><button onClick={() => scrollTo("work")} data-testid="footer-work-link">Our Work</button></div><div className="footer-nav"><span className="eyebrow">Connect</span><a href={whatsapp} target="_blank" rel="noreferrer" data-testid="footer-whatsapp-link">WhatsApp <ArrowUpRight size={13} /></a><a href="tel:+2349082443145" data-testid="footer-phone-link">090 8244 3145</a></div><div className="footer-bottom"><span>© 2024 SK Interior Design</span><span>Lagos · Nigeria</span><span>Crafted with intention</span></div></footer>
    <a className="floating-whatsapp" href={whatsapp} target="_blank" rel="noreferrer" data-testid="floating-whatsapp-button" aria-label="Chat with SK Interior Design on WhatsApp"><span>WA</span><small>Chat with us</small></a>
  </main>;
}

function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug) || projects[0];
  useReveal();
  useEffect(() => { document.title = `${project.name} — SK Interior Design`; window.scrollTo(0, 0); }, [project.name]);

  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return <main className="project-page">
    <nav className="detail-nav" data-testid="project-detail-navbar"><Link className="brand-mark" to="/" data-testid="detail-home-link"><span>SK</span><small>INTERIOR DESIGN</small></Link><Link className="detail-back" to="/#work" data-testid="detail-back-link"><ArrowLeft size={15} /> Back to work</Link></nav>
    <header className="project-hero" data-testid="project-detail-hero"><div className="project-hero-image" style={{ backgroundImage: `url(${project.image})` }} /><div className="project-hero-shade" /><div className="project-hero-copy"><p className="eyebrow reveal">PROJECT {project.number} <span /></p><h1 className="project-detail-title reveal">{project.name}</h1><p className="project-detail-type reveal">{project.type}</p></div><div className="project-hero-meta"><span>{project.year}</span><span>{project.size}</span></div></header>
    <section className="project-story section-pad" data-testid="project-story-section"><div className="section-kicker reveal"><span>01</span><span>The story</span></div><div className="project-story-grid"><h2 className="display-heading reveal">A study in<br /><em>quiet detail.</em></h2><div className="project-story-copy reveal"><p>{project.story}</p><p className="story-note">Every element was selected to age beautifully — to become more personal with time, touch and daily life.</p></div></div></section>
    <section className="materials-section section-pad" data-testid="materials-section"><div className="section-kicker reveal"><span>02</span><span>Material language</span></div><div className="materials-grid"><div className="material-intro reveal"><h2 className="display-heading">The palette<br /><em>in touch.</em></h2><p className="muted">A considered selection of surfaces, fibers and finishes that gives this project its character.</p></div><div className="material-list">{project.materials.map((material, index) => <div className="material-row reveal" key={material} data-testid={`material-${index + 1}`}><span>0{index + 1}</span><strong>{material}</strong><span className="material-swatch" style={{ background: ["#6c6d67", "#503a29", "#c3b8a5", "#977d56"][index] }} /></div>)}</div></div></section>
    <section className="gallery-section section-pad" data-testid="project-gallery-section"><div className="gallery-heading"><div className="section-kicker reveal"><span>03</span><span>Inside the project</span></div><p className="muted reveal">A visual record of the spaces, textures<br />and quiet transitions.</p></div><div className="detail-gallery">{project.gallery.map((image, index) => <figure className={`gallery-image gallery-image-${index + 1} reveal`} key={image}><img src={image} alt={`${project.name} interior detail ${index + 1}`} loading={index === 0 ? "eager" : "lazy"} /><figcaption>0{index + 1} / {project.rooms[index]}</figcaption></figure>)}</div></section>
    <section className="floorplan-section section-pad" data-testid="floorplan-section"><div className="section-kicker reveal"><span>04</span><span>Spatial study</span></div><div className="floorplan-grid"><div><h2 className="display-heading reveal">A plan for<br /><em>living well.</em></h2><p className="muted reveal">The layout is built around movement: from arrival to retreat, each room unfolds naturally into the next.</p></div><div className="floorplan reveal" role="img" aria-label={`${project.name} conceptual floor plan`} data-testid="conceptual-floorplan"><div className="plan-label plan-entry">ENTRY</div><div className="plan-room plan-living">LIVING<br /><small>01</small></div><div className="plan-room plan-dining">DINING<br /><small>02</small></div><div className="plan-room plan-suite">PRIMARY SUITE<br /><small>03</small></div><div className="plan-room plan-courtyard">COURTYARD<br /><small>04</small></div><div className="plan-line plan-line-one" /><div className="plan-line plan-line-two" /></div></div></section>
    <section className="detail-next"><p className="eyebrow">NEXT PROJECT</p><Link to={`/projects/${nextProject.slug}`} className="next-project-link" data-testid="next-project-link"><span>{nextProject.name}</span><ArrowUpRight /></Link></section>
    <footer className="detail-footer"><Link to="/" data-testid="detail-footer-home-link">SK Interior Design</Link><a href={whatsapp} target="_blank" rel="noreferrer" data-testid="detail-footer-whatsapp-link">Start a conversation <ArrowUpRight size={14} /></a></footer>
  </main>;
}

function App() {
  return <BrowserRouter><Routes><Route path="/" element={<Home />} /><Route path="/projects/:slug" element={<ProjectDetail />} /></Routes></BrowserRouter>;
}

export default App;

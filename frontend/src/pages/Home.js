import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  MoveUpRight,
} from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Marquee } from "../components/Marquee";
import { Reveal } from "../components/Reveal";
import {
  contactImage,
  heroImage,
  projects,
  services,
  teaserImages,
  whatsapp,
} from "../data/site";
import { scrollToTarget } from "../lib/smoothScroll";
import { usePageMeta } from "../lib/hooks";

const EASE = [0.16, 1, 0.3, 1];
const MotionLink = motion(Link);

const HeroLine = ({ children, delay }) => (
  <span className="line-mask">
    <motion.span
      initial={{ y: "112%" }}
      animate={{ y: 0 }}
      transition={{ duration: 1.15, delay, ease: EASE }}
    >
      {children}
    </motion.span>
  </span>
);

const WorkCard = ({ project, index }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-7%", "7%"]);
  return (
    <MotionLink
      className="project-card"
      to={`/projects/${project.slug}`}
      data-testid={`project-card-${project.number}`}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.9, delay: index * 0.08, ease: EASE }}
    >
      <div className="project-image-wrap" ref={ref}>
        <motion.div className="project-parallax" style={{ y }}>
          <img
            src={project.image}
            alt={`${project.name} — interior by SK Interior Design`}
            loading={index > 1 ? "lazy" : "eager"}
            decoding="async"
          />
        </motion.div>
        <span className="project-number">{project.number}</span>
        <span className="project-view">
          View project <ArrowUpRight size={15} />
        </span>
      </div>
      <div className="project-caption">
        <div>
          <h3>{project.name}</h3>
          <p>{project.type}</p>
        </div>
        <span className="caption-arrow">
          <ArrowRight size={17} />
        </span>
      </div>
    </MotionLink>
  );
};

export default function Home() {
  const heroRef = useRef(null);
  const workRef = useRef(null);
  usePageMeta(
    "SK Interior Design — Crafting Timeless Spatial Sanctuaries",
    "SK Interior Design composes refined residential and commercial interiors across Lagos, Abuja and beyond. Explore our services, signature projects and 85-frame project gallery.",
  );
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "24%"]);
  const fade = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const slide = (direction) =>
    workRef.current?.scrollBy({
      left: direction * (workRef.current.clientWidth * 0.72),
      behavior: "smooth",
    });

  return (
    <main className="site-shell">
      <Navbar />

      <section id="home" className="hero" ref={heroRef} data-testid="hero-section">
        <motion.div className="hero-viewport" style={{ y: bgY }}>
          <motion.div
            className="hero-image"
            style={{ backgroundImage: `url(${heroImage})` }}
            role="img"
            aria-label="Teal sofa living room designed by SK Interior Design"
            initial={{ clipPath: "inset(0 0 100% 0)", scale: 1.3 }}
            animate={{ clipPath: "inset(0 0 0% 0)", scale: 1.06 }}
            transition={{ duration: 1.7, ease: EASE }}
          />
        </motion.div>
        <div className="hero-shade" />
        <div className="hero-grid" />
        <motion.div className="hero-content" style={{ opacity: fade }}>
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8, ease: EASE }}
          >
            LAGOS · ABUJA · BEYOND <span />
          </motion.p>
          <h1 className="hero-title" data-testid="hero-heading">
            <HeroLine delay={0.65}>Spaces</HeroLine>
            <HeroLine delay={0.82}>
              <em>that speak.</em>
            </HeroLine>
          </h1>
          <motion.p
            className="hero-copy"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.9, ease: EASE }}
          >
            We compose refined interiors for people who believe the details are
            everything.
          </motion.p>
          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.25, duration: 0.9, ease: EASE }}
          >
            <button
              className="button button-gold"
              onClick={() => scrollToTarget("#work")}
              data-testid="view-work-button"
            >
              View our work <ArrowRight size={16} />
            </button>
            <Link className="text-button" to="/gallery" data-testid="hero-gallery-button">
              Explore the gallery <ArrowDown size={16} />
            </Link>
          </motion.div>
        </motion.div>
        <motion.div
          className="hero-meta"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.55, duration: 1 }}
        >
          <span>SCROLL TO EXPLORE</span>
          <span className="hero-line" />
          <span>01 / 04</span>
        </motion.div>
        <div className="hero-stamp">
          SK<span>✦</span>26
        </div>
      </section>

      <Marquee
        items={[
          "Residential Interiors",
          "Commercial Spaces",
          "Turnkey Solutions",
          "Custom Furniture",
        ]}
      />

      <section className="intro section-pad" id="about" data-testid="about-section">
        <Reveal className="section-kicker">
          <span>01</span>
          <span>Our point of view</span>
        </Reveal>
        <div className="intro-grid">
          <Reveal as="h2" className="display-heading">
            A room is never
            <br />
            just <em>a room.</em>
          </Reveal>
          <Reveal className="intro-text" delay={0.12}>
            <p>
              It is a feeling, a rhythm, a reflection of who you are. At SK, we
              create considered interiors where architecture, material and light
              come together in quiet harmony.
            </p>
            <button
              className="underlined-link"
              onClick={() => scrollToTarget("#contact")}
              data-testid="about-contact-link"
            >
              Discover our approach <MoveUpRight size={15} />
            </button>
          </Reveal>
        </div>
      </section>

      <section className="services section-pad" id="services" data-testid="services-section">
        <Reveal className="section-kicker">
          <span>02</span>
          <span>What we do</span>
        </Reveal>
        <div className="services-heading">
          <Reveal as="h2" className="display-heading">
            The art of
            <br />
            <em>considered living.</em>
          </Reveal>
          <Reveal as="p" className="muted" delay={0.1}>
            One studio. Every detail.
            <br />A complete point of view.
          </Reveal>
        </div>
        <div className="service-grid">
          {services.map(([number, title, text], index) => (
            <Reveal
              as="article"
              className="service-card"
              delay={index * 0.08}
              key={title}
              data-testid={`service-card-${number}`}
            >
              <div className="service-top">
                <span>{number}</span>
                <ArrowUpRight size={17} />
              </div>
              <h3>{title}</h3>
              <p>{text}</p>
              <div className="service-rule" />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="work section-pad" id="work" data-testid="work-section">
        <div className="work-top">
          <Reveal className="section-kicker">
            <span>03</span>
            <span>Selected work</span>
          </Reveal>
          <div className="slider-controls">
            <button onClick={() => slide(-1)} data-testid="projects-previous-button" aria-label="Previous project">
              <ChevronLeft />
            </button>
            <button onClick={() => slide(1)} data-testid="projects-next-button" aria-label="Next project">
              <ChevronRight />
            </button>
          </div>
        </div>
        <div className="work-heading">
          <Reveal as="h2" className="display-heading">
            Made to be
            <br />
            <em>lived in.</em>
          </Reveal>
          <Reveal as="p" className="muted" delay={0.1}>
            A selection of spaces we have had
            <br />
            the privilege to shape.
          </Reveal>
        </div>
        <div className="project-track" ref={workRef} data-testid="project-slider">
          {projects.map((project, index) => (
            <WorkCard project={project} index={index} key={project.slug} />
          ))}
        </div>
      </section>

      <section className="teaser section-pad" data-testid="gallery-teaser-section">
        <Reveal className="section-kicker">
          <span>04</span>
          <span>Field notes</span>
        </Reveal>
        <div className="work-heading">
          <Reveal as="h2" className="display-heading">
            Frames from
            <br />
            <em>the field.</em>
          </Reveal>
          <Reveal as="p" className="muted" delay={0.1}>
            On-site photography from
            <br />
            recently completed spaces.
          </Reveal>
        </div>
        <div className="teaser-row" data-testid="gallery-teaser-row">
          {teaserImages.map((g, i) => (
            <Link
              to="/gallery"
              className="teaser-item"
              key={g.id}
              data-testid={`teaser-item-${i + 1}`}
              aria-label={`Open gallery — ${g.alt}`}
            >
              <img src={g.src} alt={g.alt} loading="lazy" decoding="async" />
            </Link>
          ))}
        </div>
        <Reveal delay={0.1}>
          <Link to="/gallery" className="underlined-link teaser-link" data-testid="teaser-gallery-link">
            View the full gallery — 85 frames <MoveUpRight size={15} />
          </Link>
        </Reveal>
      </section>

      <section className="manifesto section-pad">
        <div className="manifesto-rule" />
        <Reveal as="p" className="eyebrow">THE SK STANDARD</Reveal>
        <Reveal as="h2" className="manifesto-title" delay={0.08}>
          “The most luxurious thing
          <br />
          in a space is <em>how it feels.”</em>
        </Reveal>
        <div className="manifesto-bottom">
          <span>— SK INTERIOR DESIGN</span>
          <span>EST. LAGOS</span>
        </div>
      </section>

      <section className="contact section-pad" id="contact" data-testid="contact-section">
        <div className="contact-image" style={{ backgroundImage: `url(${contactImage})` }} />
        <div className="contact-overlay" />
        <div className="contact-content">
          <Reveal as="p" className="eyebrow">LET'S CREATE TOGETHER</Reveal>
          <Reveal as="h2" className="display-heading" delay={0.08}>
            Your next space
            <br />
            <em>starts here.</em>
          </Reveal>
          <Reveal as="p" className="contact-copy" delay={0.14}>
            Tell us a little about what you are imagining. We would love to hear
            from you.
          </Reveal>
          <Reveal delay={0.2}>
            <a
              className="button button-gold"
              href={whatsapp}
              target="_blank"
              rel="noreferrer"
              data-testid="contact-whatsapp-button"
            >
              Chat on WhatsApp <ArrowUpRight size={16} />
            </a>
          </Reveal>
          <Reveal className="contact-details" delay={0.26}>
            <a href="tel:+2349082443145" data-testid="contact-phone-link">090 8244 3145</a>
            <span>hello@skinteriordesign.com</span>
          </Reveal>
        </div>
      </section>

      <Footer />
    </main>
  );
}

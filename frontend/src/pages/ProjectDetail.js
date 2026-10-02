import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Reveal } from "../components/Reveal";
import { Lightbox } from "../components/Lightbox";
import { CATEGORY_LABELS, projects, whatsapp } from "../data/site";
import { usePageMeta } from "../lib/hooks";

const EASE = [0.16, 1, 0.3, 1];
const SWATCHES = ["#6c6d67", "#503a29", "#c3b8a5", "#977d56"];

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = projects.find((item) => item.slug === slug) || projects[0];
  const [active, setActive] = useState(-1);
  usePageMeta(
    `${project.name} — SK Interior Design`,
    `${project.name}: ${project.type}. ${project.story.slice(0, 140)}`,
  );
  useEffect(() => setActive(-1), [slug]);

  const currentIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];

  return (
    <main className="project-page">
      <Navbar />

      <header className="project-hero" data-testid="project-detail-hero">
        <motion.div
          key={project.slug}
          className="project-hero-image"
          style={{ backgroundImage: `url(${project.image})` }}
          initial={{ scale: 1.14, opacity: 0.55 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: EASE }}
        />
        <div className="project-hero-shade" />
        <div className="project-hero-copy">
          <motion.p
            className="eyebrow"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8, ease: EASE }}
          >
            PROJECT {project.number} <span />
          </motion.p>
          <h1 className="project-detail-title" data-testid="project-detail-title">
            <span className="line-mask">
              <motion.span
                initial={{ y: "112%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1.1, delay: 0.45, ease: EASE }}
              >
                {project.name}
              </motion.span>
            </span>
          </h1>
          <motion.p
            className="project-detail-type"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            {project.type}
          </motion.p>
        </div>
        <div className="project-hero-meta">
          <span>{project.year}</span>
          <span>{project.size}</span>
        </div>
      </header>

      <section className="project-story section-pad" data-testid="project-story-section">
        <Reveal className="section-kicker">
          <span>01</span>
          <span>The story</span>
        </Reveal>
        <div className="project-story-grid">
          <Reveal as="h2" className="display-heading">
            A study in
            <br />
            <em>quiet detail.</em>
          </Reveal>
          <Reveal className="project-story-copy" delay={0.12}>
            <p>{project.story}</p>
            <p className="story-note">
              Every element was selected to age beautifully — to become more
              personal with time, touch and daily life.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="materials-section section-pad" data-testid="materials-section">
        <Reveal className="section-kicker">
          <span>02</span>
          <span>Material language</span>
        </Reveal>
        <div className="materials-grid">
          <Reveal className="material-intro">
            <h2 className="display-heading">
              The palette
              <br />
              <em>in touch.</em>
            </h2>
            <p className="muted">
              A considered selection of surfaces, fibers and finishes that gives
              this project its character.
            </p>
          </Reveal>
          <div className="material-list">
            {project.materials.map((material, index) => (
              <Reveal
                className="material-row"
                key={material}
                delay={index * 0.06}
                y={14}
                data-testid={`material-${index + 1}`}
              >
                <span>0{index + 1}</span>
                <strong>{material}</strong>
                <span className="material-swatch" style={{ background: SWATCHES[index] }} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="gallery-section section-pad" data-testid="project-gallery-section">
        <div className="gallery-heading">
          <Reveal className="section-kicker">
            <span>03</span>
            <span>Inside the project</span>
          </Reveal>
          <Reveal as="p" className="muted" delay={0.1}>
            A visual record of the spaces, textures
            <br />
            and quiet transitions.
          </Reveal>
        </div>
        <div className="masonry masonry-2 detail-masonry" data-testid="project-detail-gallery">
          {project.gallery.map((g, i) => (
            <Reveal key={g.id} delay={(i % 3) * 0.07}>
              <button
                className="masonry-item"
                style={{ aspectRatio: `${g.w} / ${g.h}` }}
                onClick={() => setActive(i)}
                data-testid={`project-gallery-item-${i + 1}`}
                aria-label={`Open ${g.alt} in lightbox`}
              >
                <img src={g.src} alt={g.alt} loading={i === 0 ? "eager" : "lazy"} decoding="async" />
                <span className="masonry-tag">{CATEGORY_LABELS[g.category]}</span>
              </button>
            </Reveal>
          ))}
        </div>
        <AnimatePresence>
          {active >= 0 && (
            <Lightbox
              items={project.gallery}
              index={active}
              onClose={() => setActive(-1)}
              onNavigate={setActive}
            />
          )}
        </AnimatePresence>
      </section>

      <section className="floorplan-section section-pad" data-testid="floorplan-section">
        <Reveal className="section-kicker">
          <span>04</span>
          <span>Spatial study</span>
        </Reveal>
        <div className="floorplan-grid">
          <div>
            <Reveal as="h2" className="display-heading">
              A plan for
              <br />
              <em>living well.</em>
            </Reveal>
            <Reveal as="p" className="muted" delay={0.1}>
              The layout is built around movement: from arrival to retreat, each
              room unfolds naturally into the next.
            </Reveal>
          </div>
          <Reveal
            className="floorplan"
            role="img"
            aria-label={`${project.name} conceptual floor plan`}
            data-testid="conceptual-floorplan"
          >
            <div className="plan-label plan-entry">ENTRY</div>
            <div className="plan-room plan-living">LIVING<br /><small>01</small></div>
            <div className="plan-room plan-dining">DINING<br /><small>02</small></div>
            <div className="plan-room plan-suite">PRIMARY SUITE<br /><small>03</small></div>
            <div className="plan-room plan-courtyard">COURTYARD<br /><small>04</small></div>
            <div className="plan-line plan-line-one" />
            <div className="plan-line plan-line-two" />
          </Reveal>
        </div>
      </section>

      <section className="detail-next">
        <p className="eyebrow">NEXT PROJECT</p>
        <Link to={`/projects/${nextProject.slug}`} className="next-project-link" data-testid="next-project-link">
          <span>{nextProject.name}</span>
          <ArrowUpRight />
        </Link>
      </section>

      <footer className="detail-footer">
        <Link to="/" data-testid="detail-footer-home-link">SK Interior Design</Link>
        <Link to="/#work" className="detail-back" data-testid="detail-back-link">
          <ArrowLeft size={14} /> Back to work
        </Link>
        <a href={whatsapp} target="_blank" rel="noreferrer" data-testid="detail-footer-whatsapp-link">
          Start a conversation <ArrowUpRight size={14} />
        </a>
      </footer>
    </main>
  );
}

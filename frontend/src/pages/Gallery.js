import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { Lightbox } from "../components/Lightbox";
import { CATEGORY_LABELS, galleryImages } from "../data/site";
import { usePageMeta } from "../lib/hooks";

const EASE = [0.16, 1, 0.3, 1];
const FILTERS = ["all", "living", "dining", "bedroom", "kitchen", "details"];

export default function Gallery() {
  usePageMeta(
    "SK Interior Design | Interior Design Gallery",
    "Browse 85 frames of delivered interiors by SK Interior Design — living rooms, dining spaces, bedrooms, kitchens and crafted details, photographed on site.",
  );
  const [filter, setFilter] = useState("all");
  const [active, setActive] = useState(-1);

  const counts = useMemo(() => {
    const c = { all: galleryImages.length };
    galleryImages.forEach((g) => {
      c[g.category] = (c[g.category] || 0) + 1;
    });
    return c;
  }, []);

  const visible = useMemo(
    () =>
      filter === "all"
        ? galleryImages
        : galleryImages.filter((g) => g.category === filter),
    [filter],
  );

  return (
    <main className="site-shell">
      <Navbar />
      <header className="gallery-hero">
        <motion.p
          className="section-kicker"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <span>SK</span>
          <span>The archive</span>
        </motion.p>
        <h1 className="gallery-title" data-testid="gallery-heading">
          <span className="line-mask">
            <motion.span
              initial={{ y: "112%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1.05, delay: 0.15, ease: EASE }}
            >
              The <em>Gallery.</em>
            </motion.span>
          </span>
        </h1>
        <motion.p
          className="gallery-count"
          data-testid="gallery-count"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          85 FRAMES · PHOTOGRAPHED ON SITE · ZERO STOCK
        </motion.p>
      </header>

      <div className="filter-bar" data-testid="gallery-filters">
        {FILTERS.map((f) => (
          <button
            key={f}
            className={`filter-pill ${filter === f ? "active" : ""}`}
            onClick={() => {
              setFilter(f);
              setActive(-1);
            }}
            data-testid={`gallery-filter-${f}`}
          >
            {f === "all" ? "All" : CATEGORY_LABELS[f]}
            <small>{counts[f] || 0}</small>
          </button>
        ))}
      </div>

      <div className="masonry" key={filter} data-testid="gallery-masonry">
        {visible.map((g, i) => (
          <motion.button
            key={g.id}
            className="masonry-item"
            style={{ aspectRatio: `${g.w} / ${g.h}` }}
            onClick={() => setActive(i)}
            data-testid={`gallery-item-${g.id}`}
            aria-label={`Open ${g.alt} in lightbox`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ duration: 0.7, delay: Math.min(i % 9, 8) * 0.05, ease: EASE }}
          >
            <img src={g.src} alt={g.alt} loading="lazy" decoding="async" />
            <span className="masonry-tag">{CATEGORY_LABELS[g.category]}</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active >= 0 && (
          <Lightbox
            items={visible}
            index={active}
            onClose={() => setActive(-1)}
            onNavigate={setActive}
          />
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}

import { useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { getLenis } from "../lib/smoothScroll";
import { CATEGORY_LABELS } from "../data/site";

const EASE = [0.16, 1, 0.3, 1];

export const Lightbox = ({ items, index, onClose, onNavigate }) => {
  const item = items[index];
  const total = items.length;
  const next = () => onNavigate((index + 1) % total);
  const prev = () => onNavigate((index - 1 + total) % total);

  useEffect(() => {
    const lenis = getLenis();
    lenis?.stop();
    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  });

  const onDragEnd = (_, info) => {
    if (info.offset.x < -70) next();
    else if (info.offset.x > 70) prev();
  };

  return (
    <motion.div
      className="lightbox"
      data-testid="lightbox"
      role="dialog"
      aria-modal="true"
      aria-label={`${item.alt} — image ${index + 1} of ${total}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
    >
      <button className="lightbox-btn lightbox-close" onClick={onClose} data-testid="lightbox-close" aria-label="Close lightbox">
        <X size={18} />
      </button>
      <button
        className="lightbox-btn lightbox-prev"
        onClick={(e) => { e.stopPropagation(); prev(); }}
        data-testid="lightbox-prev"
        aria-label="Previous image"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        className="lightbox-btn lightbox-next"
        onClick={(e) => { e.stopPropagation(); next(); }}
        data-testid="lightbox-next"
        aria-label="Next image"
      >
        <ChevronRight size={20} />
      </button>
      <motion.figure
        key={item.id}
        className="lightbox-figure"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.45, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
      >
        <motion.img
          className="lightbox-img"
          src={item.src}
          alt={item.alt}
          data-testid="lightbox-image"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.18}
          onDragEnd={onDragEnd}
        />
        <figcaption className="lightbox-meta">
          <span>{CATEGORY_LABELS[item.category]} — Frame {item.id}</span>
          <span className="lightbox-counter" data-testid="lightbox-counter">
            {String(index + 1).padStart(2, "0")} / {total}
          </span>
        </figcaption>
      </motion.figure>
    </motion.div>
  );
};

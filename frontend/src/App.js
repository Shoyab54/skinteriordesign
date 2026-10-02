import { useEffect, useState } from "react";
import "@/App.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { initLenis, scrollToTarget, scrollTop } from "@/lib/smoothScroll";
import Home from "@/pages/Home";
import Gallery from "@/pages/Gallery";
import ProjectDetail from "@/pages/ProjectDetail";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

const ScrollManager = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const t = setTimeout(() => scrollToTarget(hash), 100);
      return () => clearTimeout(t);
    }
    scrollTop();
  }, [pathname, hash]);
  return null;
};

const Cursor = () => {
  const [cursor, setCursor] = useState({ x: -100, y: -100, active: false });
  useEffect(() => {
    const onMove = (e) => setCursor({ x: e.clientX, y: e.clientY, active: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <div
      className={`cursor-dot ${cursor.active ? "cursor-visible" : ""}`}
      style={{ left: cursor.x, top: cursor.y }}
      aria-hidden="true"
    />
  );
};

export default function App() {
  useEffect(() => {
    initLenis();
  }, []);
  return (
    <BrowserRouter>
      <ScrollManager />
      <Cursor />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
      </Routes>
      <WhatsAppFloat />
    </BrowserRouter>
  );
}

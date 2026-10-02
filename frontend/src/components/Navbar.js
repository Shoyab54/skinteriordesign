import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { whatsapp } from "../data/site";
import { scrollToTarget } from "../lib/smoothScroll";

const SECTIONS = [
  ["about", "About"],
  ["services", "Services"],
  ["work", "Our Work"],
  ["contact", "Contact"],
];

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const go = (id) => {
    setMenuOpen(false);
    if (pathname !== "/") navigate(`/#${id}`);
    else scrollToTarget(`#${id}`);
  };

  return (
    <nav
      className={`navbar ${scrolled || pathname !== "/" ? "navbar-scrolled" : ""}`}
      data-testid="site-navbar"
    >
      <Link
        className="brand-mark"
        to="/"
        data-testid="brand-home-link"
        aria-label="SK Interior Design — home"
        onClick={() => setMenuOpen(false)}
      >
        <Logo />
        <small>SK INTERIOR DESIGN</small>
      </Link>
      <div className={`nav-links ${menuOpen ? "nav-open" : ""}`}>
        {SECTIONS.map(([id, label]) => (
          <button key={id} onClick={() => go(id)} data-testid={`nav-${id}-link`}>
            {label}
          </button>
        ))}
        <NavLink
          to="/gallery"
          className={({ isActive }) => (isActive ? "active-page" : "")}
          data-testid="nav-gallery-link"
        >
          Gallery
        </NavLink>
        <a
          href={whatsapp}
          target="_blank"
          rel="noreferrer"
          className="nav-cta"
          data-testid="nav-whatsapp-link"
        >
          Start a conversation <ArrowUpRight size={14} />
        </a>
      </div>
      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        data-testid="mobile-menu-toggle"
        aria-label={menuOpen ? "Close menu" : "Open menu"}
      >
        {menuOpen ? <X /> : <Menu />}
      </button>
    </nav>
  );
};

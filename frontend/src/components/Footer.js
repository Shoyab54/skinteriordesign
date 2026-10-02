import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";
import { whatsapp } from "../data/site";
import { scrollToTarget } from "../lib/smoothScroll";

export const Footer = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const go = (id) => {
    if (pathname !== "/") navigate(`/#${id}`);
    else scrollToTarget(`#${id}`);
  };

  return (
    <footer className="footer" data-testid="site-footer">
      <div className="footer-brand" data-testid="footer-brand">
        <Logo size={40} />
        <p>
          Interior design for
          <br />
          the quietly particular.
        </p>
      </div>
      <div className="footer-nav">
        <span className="eyebrow">Explore</span>
        <button onClick={() => go("about")} data-testid="footer-about-link">About</button>
        <button onClick={() => go("services")} data-testid="footer-services-link">Services</button>
        <button onClick={() => go("work")} data-testid="footer-work-link">Our Work</button>
        <Link to="/gallery" data-testid="footer-gallery-link">Gallery</Link>
      </div>
      <div className="footer-nav">
        <span className="eyebrow">Connect</span>
        <a href={whatsapp} target="_blank" rel="noreferrer" data-testid="footer-whatsapp-link">
          WhatsApp <ArrowUpRight size={13} />
        </a>
        <a href="tel:+2349082443145" data-testid="footer-phone-link">090 8244 3145</a>
      </div>
      <div className="footer-bottom">
        <span>© 2026 SK Interior Design</span>
        <span>Lagos · Nigeria</span>
        <span>Crafted with intention</span>
      </div>
    </footer>
  );
};

import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowUpRight, Facebook, Instagram, MapPin, Youtube } from "lucide-react";
import { Logo } from "./Logo";
import { address, phone, socials, whatsapp } from "../data/site";
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
        <Logo size={44} />
        <p>
          Interior design for
          <br />
          the quietly particular.
        </p>
        <p className="footer-address" data-testid="footer-address">
          <MapPin size={14} />
          <span>
            Sakinaka Kharani Road, Andheri East,
            <br />
            Mumbai, Maharashtra, India – 400072
          </span>
        </p>
        <div className="footer-socials" data-testid="footer-socials">
          <a href={socials.facebook} target="_blank" rel="noreferrer" className="social-icon" data-testid="footer-facebook-link" aria-label="SK Interior Design on Facebook">
            <Facebook size={16} />
          </a>
          <a href={socials.instagram} target="_blank" rel="noreferrer" className="social-icon" data-testid="footer-instagram-link" aria-label="SK Interior Design on Instagram">
            <Instagram size={16} />
          </a>
          <a href={socials.youtube} target="_blank" rel="noreferrer" className="social-icon" data-testid="footer-youtube-link" aria-label="SK Interior Design on YouTube">
            <Youtube size={16} />
          </a>
        </div>
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
        <a href={`tel:${phone.raw}`} data-testid="footer-phone-link">{phone.display}</a>
        <a href="mailto:hello@skinteriordesign.com" data-testid="footer-email-link">hello@skinteriordesign.com</a>
      </div>
      <div className="footer-bottom">
        <span>© 2026 SK Interior Design</span>
        <span>Mumbai · India</span>
        <span>Crafted with intention</span>
      </div>
    </footer>
  );
};

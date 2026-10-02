import { motion } from "framer-motion";
import { whatsapp } from "../data/site";

export const WhatsAppFloat = () => (
  <motion.a
    className="floating-whatsapp"
    href={whatsapp}
    target="_blank"
    rel="noreferrer"
    data-testid="floating-whatsapp-button"
    aria-label="Chat with SK Interior Design on WhatsApp"
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
  >
    <span>WA</span>
    <small>Chat with us</small>
  </motion.a>
);

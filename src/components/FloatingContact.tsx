import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { Phone } from "lucide-react";

const PHONE = "+919773053632";
const WHATSAPP_URL = `https://wa.me/${PHONE}`;
const CALL_URL = `tel:${PHONE}`;

export default function FloatingContact() {
  return (
    <div className="fixed right-5 bottom-20 z-[999] flex flex-col gap-3 items-end">
      {/* WhatsApp */}
      <motion.a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="group flex items-center gap-3"
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Label — slides in on hover */}
        <span className="hidden sm:block bg-background border border-border text-white text-xs font-bold uppercase tracking-widest px-3 py-2 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 whitespace-nowrap shadow-lg">
          WhatsApp Us
        </span>

        <motion.div
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 bg-[#25D366] flex items-center justify-center text-white shadow-[0_4px_24px_rgba(37,211,102,0.4)] hover:shadow-[0_4px_32px_rgba(37,211,102,0.6)] transition-shadow"
        >
          <FaWhatsapp size={28} />
        </motion.div>
      </motion.a>

      {/* Call */}
      <motion.a
        href={CALL_URL}
        aria-label="Call us"
        className="group flex items-center gap-3"
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Label — slides in on hover */}
        <span className="hidden sm:block bg-background border border-border text-white text-xs font-bold uppercase tracking-widest px-3 py-2 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 whitespace-nowrap shadow-lg">
          Call Now
        </span>

        <motion.div
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 bg-primary flex items-center justify-center text-black shadow-[0_4px_24px_rgba(255,208,0,0.35)] hover:shadow-[0_4px_32px_rgba(255,208,0,0.55)] transition-shadow"
        >
          <Phone size={24} strokeWidth={2.5} />
        </motion.div>
      </motion.a>
    </div>
  );
}

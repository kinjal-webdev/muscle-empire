import { motion } from "framer-motion";

export default function CTA() {
  const scrollToSection = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-28 relative overflow-hidden bg-[#111111]">
      {/* Background glow */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(255,193,7,0.12) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)`,
          backgroundSize: "56px 56px",
        }}
      />

      <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto"
        >
          {/* Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFC107]/10 border border-[#FFC107]/20 text-[#FFC107] text-[11px] font-bold uppercase tracking-[0.16em] mb-8">
            <span className="w-1.5 h-1.5 bg-[#FFC107] rounded-full" />
            Your Transformation Starts Now
          </div>

          <h2 className="font-display font-black text-[clamp(2.5rem,7vw,4.5rem)] text-white leading-[1.08] tracking-tight mb-5">
            Enough{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #FFC107, #FF8C00)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Excuses.
            </span>
          </h2>

          <p className="text-xl text-white/55 font-medium mb-10 max-w-xl mx-auto leading-relaxed">
            The iron is waiting. The community is here. The only thing missing is your commitment.
          </p>

          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <motion.button
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollToSection("#contact")}
              className="w-full sm:w-auto btn-primary text-base px-10 py-4 rounded-xl"
            >
              Join The Empire
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => scrollToSection("#pricing")}
              className="w-full sm:w-auto btn-outline-dark text-base px-10 py-4"
            >
              View Pricing
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

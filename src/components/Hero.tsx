import { motion, useScroll, useTransform } from "framer-motion";
import heroBg from "@/assets/images/hero-bg.png";

export default function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 800], [0, 140]);
  const overlayOpacity = useTransform(scrollY, [0, 600], [1, 0]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[#0d0d0d] pt-[72px]"
    >
      {/* Background */}
      <motion.div className="absolute inset-0 z-0" style={{ y: y1 }}>
        {/* Reduced overlay for better image visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-[#0d0d0d] z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/30 z-10" />
        <img
          src={heroBg}
          alt="Muscle Empire Gym"
          className="w-full h-full object-cover object-center opacity-80"
        />
      </motion.div>

      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 z-[5] pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Yellow glow orb bottom left */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[300px] bg-[#FFC107]/10 blur-[120px] rounded-full z-[6] pointer-events-none" />

      {/* Content */}
      <motion.div
        className="container relative z-20 mx-auto px-4 md:px-8 flex flex-col items-center text-center"
        style={{ opacity: overlayOpacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl flex flex-col items-center"
        >
          {/* Pill badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.08] backdrop-blur border border-white/[0.12] text-[#FFC107] text-[11px] font-bold uppercase tracking-[0.18em]"
          >
            <span className="w-1.5 h-1.5 bg-[#FFC107] rounded-full animate-pulse" />
            Ghatkopar's Elite Training Arena
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(2.8rem,8vw,5.5rem)] font-black text-white leading-[1.05] tracking-[-0.03em] mb-6"
          >
            Transform{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #FFC107 0%, #FF8C00 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Your Body.
            </span>
            <br />
            Elevate Your Life.
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[clamp(1rem,2.5vw,1.25rem)] text-white/70 max-w-2xl mb-10 font-medium leading-relaxed"
          >
            This isn't a friendly neighborhood gym — it's an arena. Raw power meets precision
            coaching. Step in, put in the work, and earn your results.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
          >
            <button
              className="w-full sm:w-auto btn-primary text-[15px] px-9 py-4 rounded-xl"
              onClick={() => scrollToSection("#contact")}
            >
              Start Training
            </button>
            <button
              className="w-full sm:w-auto btn-outline-dark text-[15px] px-9 py-4"
              onClick={() => scrollToSection("#pricing")}
            >
              View Programs
            </button>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5"
      >
        <span className="text-white/30 text-[10px] font-semibold uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-0.5 h-8 bg-gradient-to-b from-white/40 to-transparent rounded-full"
        />
      </motion.div>
    </section>
  );
}

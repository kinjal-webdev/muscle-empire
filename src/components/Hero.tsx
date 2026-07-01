import { motion, useScroll, useTransform } from "framer-motion";
import heroBg from "@/assets/images/hero-bg.png";

export default function Hero() {
  const { scrollY } = useScroll();
  const bgY        = useTransform(scrollY, [0, 700], [0, 120]);
  const contentY   = useTransform(scrollY, [0, 700], [0, 60]);
  const textOpacity= useTransform(scrollY, [0, 500], [1, 0]);

  const goto = (href: string) => {
    const el = document.querySelector(href);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 76, behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[#080808]"
    >
      {/* ── Parallax background ──────────────────────── */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        {/* Multi-layer gradient for cinematic feel */}
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-[#080808]/65 via-[#080808]/25 to-[#080808]" />
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-[#080808]/70 via-transparent to-[#080808]/30" />
        <img
          src={heroBg}
          alt="Muscle Empire — Elite training facility"
          className="w-full h-[115%] object-cover object-center"
          fetchPriority="high"
        />
      </motion.div>

      {/* ── Grain texture ────────────────────────────── */}
      <div className="absolute inset-0 z-[5] pointer-events-none opacity-[0.06] mix-blend-overlay"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
      />

      {/* ── Ambient glow orbs ────────────────────────── */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[350px] rounded-full bg-[#FFC107]/[0.07] blur-[140px] z-[6] pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-[400px] h-[300px] rounded-full bg-[#FF6B00]/[0.04] blur-[120px] z-[6] pointer-events-none" />

      {/* ── Content ──────────────────────────────────── */}
      <motion.div
        className="relative z-20 w-full max-w-7xl mx-auto px-5 md:px-8 pt-20 flex flex-col items-center text-center"
        style={{ y: contentY, opacity: textOpacity }}
      >
        {/* Eyebrow pill */}
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="mb-7 inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.18em] text-[#FFC107] border border-[#FFC107]/20 bg-[#FFC107]/[0.06] backdrop-blur-sm"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFC107] animate-pulse" />
          Ghatkopar's elite training arena
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-display font-black text-white text-[clamp(3rem,9vw,6.5rem)] leading-[1.0] tracking-[-0.04em] mb-6 max-w-5xl"
        >
          Transform{" "}
          <span className="text-gold-gradient">your body.</span>
          <br className="hidden sm:block" />
          {" "}Elevate your life.
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.38, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-white/60 text-[clamp(1rem,2.2vw,1.2rem)] max-w-xl leading-relaxed mb-10 font-normal"
        >
          This isn't a friendly neighbourhood gym — it's an arena. Raw power meets precision coaching.
          Step in, put in the work, and earn your results.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.52, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto"
        >
          <button
            onClick={() => goto("#contact")}
            className="btn-gold w-full sm:w-auto text-[14.5px] px-9 py-[14px]"
          >
            Start training
          </button>
          <button
            onClick={() => goto("#pricing")}
            className="btn-ghost-dark w-full sm:w-auto text-[14.5px] px-9 py-[14px]"
          >
            View programs
          </button>
        </motion.div>
      </motion.div>

      {/* ── Scroll cue ────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-9 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-white/25 text-[9px] font-semibold uppercase tracking-[0.22em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-white/35 to-transparent"
        />
      </motion.div>
    </section>
  );
}

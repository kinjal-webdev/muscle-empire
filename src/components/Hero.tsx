import { motion, useScroll, useTransform } from "framer-motion";
import heroBg from "@/assets/images/hero-bg.png";

export default function Hero() {
  const { scrollY } = useScroll();
  const bgY        = useTransform(scrollY, [0, 700], [0, 120]);
  const contentY   = useTransform(scrollY, [0, 700], [0, -60]);
  const textOpacity= useTransform(scrollY, [0, 400], [1, 0]);

  const goto = (href: string) => {
    const el = document.querySelector(href);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 76, behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] flex overflow-hidden bg-[#1C1C1E]"
    >
      {/* ── Parallax background ──────────────────────── */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/30 via-black/10 to-[#1C1C1E]" />
        {/* Left column darkener so left text is readable */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/55 via-black/20 to-transparent" />
        <img
          src={heroBg}
          alt="Muscle Empire — Elite training facility"
          className="w-full h-[115%] object-cover object-center"
          fetchPriority="high"
        />
      </motion.div>

      {/* ── Content ──────────────────────────────────── */}
      <motion.div
        className="relative z-20 w-full flex flex-col justify-between px-6 md:px-12 pt-28 pb-12"
        style={{ y: contentY, opacity: textOpacity }}
      >
        {/* Top row: left description + right big headline */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-8 flex-1">

          {/* LEFT — description */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-sm md:self-center"
          >
            {/* Eyebrow */}
            <div className="mb-5 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.08] backdrop-blur border border-white/[0.12] text-[#E8A820] text-[11px] font-bold uppercase tracking-[0.18em]">
              <span className="w-1.5 h-1.5 bg-[#E8A820] rounded-full animate-pulse" />
              Ghatkopar's elite training arena
            </div>

            <p className="text-white/75 text-[1rem] md:text-[1.1rem] leading-relaxed font-normal max-w-[320px]">
              This isn't a friendly neighbourhood gym — it's an arena. Raw power meets precision coaching. Step in and earn your results.
            </p>
          </motion.div>

          {/* RIGHT — big headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="font-display font-black text-white text-right leading-[0.95] tracking-[-0.03em]"
            style={{ fontSize: "clamp(3.2rem, 10vw, 7.5rem)" }}
          >
            Transform{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #E8A820 0%, #FF9500 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              your body.
            </span>
            <br />
            Elevate<br />your life.
          </motion.h1>
        </div>

        {/* Bottom row: right-aligned CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-end mt-10"
        >
          <button
            onClick={() => goto("#pricing")}
            className="btn-gold text-[15px] px-10 py-4 rounded-xl"
          >
            Start training
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}

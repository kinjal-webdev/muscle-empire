import { motion, useScroll, useTransform } from "framer-motion";
import heroBg from "@/assets/images/hero-bg.png";

export default function Hero() {
  const { scrollY } = useScroll();
  const fadeOut = useTransform(scrollY, [0, 420], [1, 0]);
  const slideUp = useTransform(scrollY, [0, 420], [0, -40]);

  const goto = (id: string) => {
    const el = document.querySelector(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 76, behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-[100dvh] overflow-hidden bg-[#0B0B0B]">

      {/* ── Full background — no parallax so image shows completely ── */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 z-10"
          style={{ background: "linear-gradient(to right, rgba(11,11,11,0.80) 0%, rgba(11,11,11,0.45) 55%, rgba(11,11,11,0.15) 100%)" }} />
        <div className="absolute inset-0 z-10"
          style={{ background: "linear-gradient(to top, rgba(11,11,11,1) 0%, transparent 50%)" }} />
        <img
          src={heroBg}
          alt="Muscle Empire gym"
          className="w-full h-full object-cover"
          style={{ objectPosition: "center center" }}
          fetchPriority="high"
        />
      </div>

      {/* ── Ambient glow ──────────────────────────────────────── */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[220px] pointer-events-none z-[5]"
        style={{ background: "radial-gradient(ellipse, rgba(232,168,32,0.07) 0%, transparent 70%)" }} />

      {/* ── Content ───────────────────────────────────────────── */}
      <motion.div
        className="relative z-20 w-full min-h-[100dvh] flex flex-col justify-between"
        style={{ opacity: fadeOut, y: slideUp }}
      >
        {/* ── Split grid — takes up most of the screen ─────────── */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 max-w-[1440px] mx-auto w-full
                        px-5 md:px-10 lg:px-16
                        pt-[120px] md:pt-[140px]
                        pb-6 gap-y-10 lg:gap-y-0 items-end lg:items-center">

          {/* ── LEFT — pushed lower with pt on mobile ─────────── */}
          <div className="flex flex-col gap-6 lg:pr-10 order-2 lg:order-1
                          lg:self-end lg:pb-24">

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.7, ease: [0.16,1,0.3,1] }}
              className="inline-flex items-center gap-2 self-start px-4 py-1.5 rounded-full border border-white/[0.12] backdrop-blur-md"
              style={{ background: "rgba(255,255,255,0.06)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8A820] animate-pulse" />
              <span className="text-[#E8A820] text-[11px] md:text-[12px] font-bold uppercase tracking-[0.18em]">
                Ghatkopar's elite arena
              </span>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38, duration: 0.8, ease: [0.16,1,0.3,1] }}
              className="text-white/80 leading-relaxed max-w-[340px]"
              style={{ fontSize: "clamp(0.95rem, 2.5vw, 1.15rem)" }}
            >
              A space built for serious training, real transformation, and a community that pushes each other to rise higher every single day.
            </motion.p>

            {/* Member card — no avatars, just numbers */}
            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.75, ease: [0.16,1,0.3,1] }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="self-start rounded-[36px] px-6 py-4 flex items-center gap-4 cursor-default"
              style={{
                background: "rgba(255,255,255,0.07)",
                backdropFilter: "blur(18px)",
                WebkitBackdropFilter: "blur(18px)",
                border: "1px solid rgba(255,255,255,0.14)",
                boxShadow: "0 8px 36px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.09)",
              }}
            >
              <div>
                <p className="text-white font-black leading-tight" style={{ fontSize: "clamp(0.95rem,2.5vw,1.05rem)" }}>5k+ Members</p>
                <div className="flex gap-0.5 mt-1">
                  {Array.from({length:5}).map((_,i)=>(
                    <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#E8A820">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT — headline, smaller font so it fits ─────── */}
          <div className="flex flex-col justify-center order-1 lg:order-2 lg:self-end lg:pb-20">
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 1, ease: [0.16,1,0.3,1] }}
              className="font-display font-black text-white uppercase leading-[0.9] tracking-[-0.03em]
                         text-right"
              style={{ fontSize: "clamp(2.4rem, 7.5vw, 6.5rem)" }}
            >
              Transform<br />
              <span style={{
                background: "linear-gradient(135deg, #E8A820 0%, #FF9500 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>your</span><br />
              body.<br />
              Elevate<br />
              your life.
            </motion.h1>
          </div>
        </div>

        {/* ── Start Training — inside hero, bottom right ─────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.6, ease: [0.16,1,0.3,1] }}
          className="w-full max-w-[1440px] mx-auto px-5 md:px-10 lg:px-16 pb-10 flex justify-end"
        >
          <motion.button
            onClick={() => goto("#pricing")}
            whileHover={{ y: -4, boxShadow: "0 18px 48px rgba(232,168,32,0.55)" }}
            whileTap={{ scale: 0.96 }}
            animate={{ y: [0, -4, 0] }}
            transition={{ y: { repeat: Infinity, duration: 2.4, ease: "easeInOut" }, default: { duration: 0.25 } }}
            className="text-[#0B0B0B] font-black uppercase tracking-wide rounded-full"
            style={{
              fontSize: "clamp(0.88rem, 2vw, 1rem)",
              padding: "14px 36px",
              background: "linear-gradient(135deg, #E8A820, #F4B400)",
              boxShadow: "0 8px 28px rgba(232,168,32,0.40)",
            }}
          >
            Start training
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}
        transition={{ delay:1.4, duration:0.6 }} style={{ opacity: fadeOut }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 pointer-events-none">
        <span className="text-white/25 text-[9px] font-semibold uppercase tracking-[0.22em]">Scroll</span>
        <motion.div animate={{ y:[0,7,0] }} transition={{ repeat:Infinity, duration:1.6, ease:"easeInOut" }}
          className="w-px h-7 bg-gradient-to-b from-white/35 to-transparent" />
      </motion.div>
    </section>
  );
}

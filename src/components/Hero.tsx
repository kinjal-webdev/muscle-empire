import { motion, useScroll, useTransform } from "framer-motion";
import heroBg from "@/assets/images/hero-bg.png";

export default function Hero() {
  const { scrollY } = useScroll();
  const fadeOut = useTransform(scrollY, [0, 420], [1, 0]);
  const slideUp = useTransform(scrollY, [0, 420], [0, -50]);

  const goto = (id: string) => {
    const el = document.querySelector(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 76, behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-[100dvh] overflow-hidden bg-[#0B0B0B]">

      {/* ── Background — object-contain so nothing is cropped ── */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 z-10"
          style={{ background: "linear-gradient(to right, rgba(11,11,11,0.82) 0%, rgba(11,11,11,0.50) 55%, rgba(11,11,11,0.20) 100%)" }} />
        <div className="absolute inset-0 z-10"
          style={{ background: "linear-gradient(to top, rgba(11,11,11,1) 0%, transparent 45%)" }} />
        <img
          src={heroBg}
          alt="Muscle Empire gym"
          className="w-full h-full object-cover object-top"
          fetchPriority="high"
        />
      </div>

      {/* ── Ambient glow ──────────────────────────────────────── */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[260px] pointer-events-none z-[5]"
        style={{ background: "radial-gradient(ellipse, rgba(232,168,32,0.07) 0%, transparent 70%)" }} />

      {/* ── Content ───────────────────────────────────────────── */}
      <motion.div
        className="relative z-20 w-full min-h-[100dvh] flex flex-col"
        style={{ opacity: fadeOut, y: slideUp }}
      >
        {/* Split grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-0 max-w-[1440px] mx-auto w-full px-5 md:px-10 lg:px-16 pt-[96px] pb-16 items-center">

          {/* ── LEFT ──────────────────────────────────────────── */}
          <div className="flex flex-col gap-8 lg:pr-10 order-2 lg:order-1 mt-8 lg:mt-0">

            {/* Eyebrow — positioned a bit lower from top */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7, ease: [0.16,1,0.3,1] }}
              className="inline-flex items-center gap-2 self-start px-4 py-1.5 rounded-full border border-white/[0.12] backdrop-blur-md"
              style={{ background: "rgba(255,255,255,0.06)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8A820] animate-pulse" />
              <span className="text-[#E8A820] text-[12px] font-bold uppercase tracking-[0.18em]">
                Ghatkopar's elite arena
              </span>
            </motion.div>

            {/* Description — bigger font */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32, duration: 0.8, ease: [0.16,1,0.3,1] }}
              className="text-white/80 text-[1.1rem] md:text-[1.2rem] leading-relaxed max-w-[360px]"
            >
              A space built for serious training, real transformation, and a community that pushes each other to rise higher every single day.
            </motion.p>

            {/* Member card — no logo image, 5k+ */}
            <motion.div
              initial={{ opacity: 0, y: 32, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.46, duration: 0.75, ease: [0.16,1,0.3,1] }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="self-start rounded-[40px] px-6 py-4 flex items-center gap-5 cursor-default"
              style={{
                background: "rgba(255,255,255,0.07)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.14)",
                boxShadow: "0 8px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.10)",
              }}
            >
              {/* Stacked initials avatars instead of images */}
              <div className="flex -space-x-2.5">
                {["AS","PK","RK"].map((init, i) => (
                  <div key={i}
                    className="w-9 h-9 rounded-full border-2 border-white/20 flex items-center justify-center text-white font-black text-[11px] shrink-0"
                    style={{ background: ["#E65100","#2E7D32","#1565C0"][i] }}>
                    {init}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-white font-black text-[1rem] leading-tight">5k+ Members</p>
                <div className="flex gap-0.5 mt-0.5">
                  {Array.from({length:5}).map((_,i)=>(
                    <svg key={i} width="13" height="13" viewBox="0 0 24 24" fill="#E8A820">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT — headline, one word per line ────────────── */}
          <div className="flex flex-col justify-center order-1 lg:order-2">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 1, ease: [0.16,1,0.3,1] }}
              className="font-display font-black text-white uppercase leading-[0.88] tracking-[-0.03em] text-right"
              style={{ fontSize: "clamp(3rem, 9vw, 7.5rem)" }}
            >
              Transform<br />
              <span style={{
                background: "linear-gradient(135deg, #E8A820 0%, #FF9500 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                your
              </span><br />
              body.<br />
              Elevate<br />
              your life.
            </motion.h1>
          </div>
        </div>
      </motion.div>

      {/* ── Floating Start Training button ────────────────────── */}
      <motion.button
        onClick={() => goto("#pricing")}
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.6, ease: [0.16,1,0.3,1] }}
        /* float bob */
        whileHover={{ y: -4, boxShadow: "0 20px 50px rgba(232,168,32,0.55)" }}
        whileTap={{ scale: 0.95 }}
        className="fixed right-5 bottom-[76px] z-[998] text-[#0B0B0B] font-black text-[14px] uppercase tracking-wide px-7 py-4 rounded-full"
        style={{
          background: "linear-gradient(135deg, #E8A820, #F4B400)",
          boxShadow: "0 8px 32px rgba(232,168,32,0.45)",
        }}
      >
        Start training
      </motion.button>

      {/* ── Scroll cue ─────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        style={{ opacity: fadeOut }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none"
      >
        <span className="text-white/25 text-[9px] font-semibold uppercase tracking-[0.22em]">Scroll</span>
        <motion.div
          animate={{ y: [0,7,0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-white/35 to-transparent"
        />
      </motion.div>
    </section>
  );
}

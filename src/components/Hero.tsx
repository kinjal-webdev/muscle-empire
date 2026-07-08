import { motion, useScroll, useTransform } from "framer-motion";
import heroBg from "@/assets/images/hero-bg.png";
import logo from "@/assets/images/logo.jpeg";

export default function Hero() {
  const { scrollY } = useScroll();
  const bgY      = useTransform(scrollY, [0, 800], [0, 140]);
  const fadeOut  = useTransform(scrollY, [0, 420], [1, 0]);
  const slideUp  = useTransform(scrollY, [0, 420], [0, -50]);

  const goto = (id: string) => {
    const el = document.querySelector(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 76, behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-[100dvh] overflow-hidden bg-[#0B0B0B]">

      {/* ── Parallax background ──────────────────────── */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        {/* cinematic gradient — 65% dark */}
        <div className="absolute inset-0 z-10" style={{
          background: "linear-gradient(to right, rgba(11,11,11,0.85) 0%, rgba(11,11,11,0.55) 50%, rgba(11,11,11,0.25) 100%)"
        }} />
        <div className="absolute inset-0 z-10" style={{
          background: "linear-gradient(to top, rgba(11,11,11,1) 0%, transparent 45%)"
        }} />
        <img
          src={heroBg}
          alt="Muscle Empire gym"
          className="w-full h-[115%] object-cover object-center"
          fetchPriority="high"
        />
      </motion.div>

      {/* ── Ambient gold glow ─────────────────────────── */}
      <div className="absolute bottom-0 left-0 w-[600px] h-[300px] rounded-full pointer-events-none z-[5]"
        style={{ background: "radial-gradient(ellipse, rgba(232,168,32,0.08) 0%, transparent 70%)" }} />

      {/* ── Main content ─────────────────────────────── */}
      <motion.div
        className="relative z-20 w-full min-h-[100dvh] flex flex-col"
        style={{ opacity: fadeOut, y: slideUp }}
      >
        {/* Split grid */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-0 max-w-[1440px] mx-auto w-full px-6 md:px-12 lg:px-16 pt-[100px] pb-14">

          {/* ── LEFT COLUMN ─────────────────────────── */}
          <div className="flex flex-col justify-center gap-10 lg:pr-12 order-2 lg:order-1">

            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.7, ease: [0.16,1,0.3,1] }}
              className="inline-flex items-center gap-2 self-start px-4 py-1.5 rounded-full border border-white/[0.12] backdrop-blur-md"
              style={{ background: "rgba(255,255,255,0.06)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8A820] animate-pulse" />
              <span className="text-[#E8A820] text-[11px] font-bold uppercase tracking-[0.18em]">
                Ghatkopar's elite arena
              </span>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.8, ease: [0.16,1,0.3,1] }}
              className="text-white/75 text-[1.05rem] md:text-[1.15rem] leading-relaxed max-w-[340px]"
            >
              A space built for serious training, real transformation, and a community that pushes each other to rise higher every single day.
            </motion.p>

            {/* ── Glassmorphism member card ─────────── */}
            <motion.div
              initial={{ opacity: 0, y: 32, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.42, duration: 0.75, ease: [0.16,1,0.3,1] }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="self-start rounded-[40px] px-6 py-4 flex items-center gap-5 cursor-default"
              style={{
                background: "rgba(255,255,255,0.07)",
                backdropFilter: "blur(20px)",
                WebkitBackdropFilter: "blur(20px)",
                border: "1px solid rgba(255,255,255,0.14)",
                boxShadow: "0 8px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.10)",
                transition: "transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s",
              }}
            >
              {/* Stacked avatars */}
              <div className="flex -space-x-3">
                {[logo, logo].map((src, i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white/20 overflow-hidden shrink-0">
                    <img src={src} alt="member" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div>
                <p className="text-white font-black text-[0.95rem] leading-tight">2k+ Members</p>
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

          {/* ── RIGHT COLUMN ────────────────────────── */}
          <div className="flex flex-col justify-center order-1 lg:order-2">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 1, ease: [0.16,1,0.3,1] }}
              className="font-display font-black text-white uppercase leading-[0.9] tracking-[-0.03em] text-right"
              style={{ fontSize: "clamp(3.5rem, 10vw, 8rem)" }}
            >
              Transform{" "}
              <span style={{
                background: "linear-gradient(135deg, #E8A820 0%, #FF9500 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}>
                your
              </span>
              <br />body.
              <br />Elevate
              <br />your life.
            </motion.h1>
          </div>
        </div>

        {/* ── Bottom bar ────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55, duration: 0.7, ease: [0.16,1,0.3,1] }}
          className="w-full max-w-[1440px] mx-auto px-6 md:px-12 lg:px-16 pb-10 flex flex-col sm:flex-row items-center justify-end gap-4"
        >
          {/* Promo text */}
          <p className="text-white/60 text-[0.88rem] font-medium">
            🔥 First week free, no excuses
          </p>

          {/* CTA — pill shaped */}
          <motion.button
            onClick={() => goto("#pricing")}
            whileHover={{ y: -3, boxShadow: "0 16px 40px rgba(232,168,32,0.45)" }}
            whileTap={{ scale: 0.97 }}
            className="text-[#0B0B0B] font-black text-[0.95rem] uppercase tracking-wide px-10 py-4 rounded-full transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #E8A820, #F4B400)",
              boxShadow: "0 6px 28px rgba(232,168,32,0.35)",
            }}
          >
            Start training
          </motion.button>
        </motion.div>
      </motion.div>

      {/* ── Scroll cue ────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        style={{ opacity: fadeOut }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
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

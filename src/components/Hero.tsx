import { motion, useScroll, useTransform } from "framer-motion";
import heroBg from "@/assets/images/hero-bg.png";

export default function Hero() {
  const { scrollY } = useScroll();
  const fadeOut = useTransform(scrollY, [0, 380], [1, 0]);
  const slideUp = useTransform(scrollY, [0, 380], [0, -30]);

  const goto = (id: string) => {
    const el = document.querySelector(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 76, behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-[100dvh] overflow-hidden bg-[#0B0B0B]">

      {/* ── Full-cover background, centred, never cropped ── */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 z-10"
          style={{ background: "linear-gradient(to right,rgba(11,11,11,0.78) 0%,rgba(11,11,11,0.40) 55%,rgba(11,11,11,0.12) 100%)" }} />
        <div className="absolute inset-0 z-10"
          style={{ background: "linear-gradient(to top,rgba(11,11,11,1) 0%,transparent 55%)" }} />
        <img src={heroBg} alt="Muscle Empire gym"
          className="absolute inset-0 w-full h-full object-cover object-center"
          fetchPriority="high" />
      </div>

      {/* Ambient glow */}
      <div className="absolute bottom-0 left-0 w-[380px] h-[200px] pointer-events-none z-[5]"
        style={{ background:"radial-gradient(ellipse,rgba(232,168,32,0.07) 0%,transparent 70%)" }} />

      {/* ── Main content ──────────────────────────────────── */}
      <motion.div className="relative z-20 w-full min-h-[100dvh] flex flex-col"
        style={{ opacity: fadeOut, y: slideUp }}>

        {/*
            Layout:
            - Mobile  : headline top, then left content below
            - Desktop : left 40% / right 60% side by side
        */}
        <div className="flex-1 flex flex-col lg:grid lg:grid-cols-[42%_58%]
                        max-w-[1440px] mx-auto w-full
                        px-5 sm:px-8 md:px-10 lg:px-14
                        pt-[96px] sm:pt-[110px] pb-8
                        gap-6 lg:gap-0">

          {/* ── RIGHT / headline — shown first on mobile ── */}
          <div className="order-1 lg:order-2 flex items-end justify-end overflow-hidden">
            <motion.h1
              initial={{ opacity:0, y:36 }}
              animate={{ opacity:1, y:0 }}
              transition={{ delay:0.08, duration:0.9, ease:[0.16,1,0.3,1] }}
              className="font-display font-black text-white uppercase leading-[0.9]
                         tracking-[-0.025em] text-right w-full"
              /* Tight clamp — max 5.5rem on desktop so nothing overflows */
              style={{ fontSize:"clamp(2.2rem,6vw,5.5rem)" }}
            >
              Transform<br/>
              <span style={{ background:"linear-gradient(135deg,#E8A820,#FF9500)",
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                your
              </span><br/>
              body.<br/>
              Elevate<br/>
              your life.
            </motion.h1>
          </div>

          {/* ── LEFT / description + card ──────────────────── */}
          <div className="order-2 lg:order-1 flex flex-col justify-end gap-5 lg:pr-10 pb-4">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
              transition={{ delay:0.25, duration:0.7, ease:[0.16,1,0.3,1] }}
              className="inline-flex items-center gap-2 self-start px-4 py-1.5 rounded-full
                         border border-white/[0.12] backdrop-blur-md"
              style={{ background:"rgba(255,255,255,0.06)" }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8A820] animate-pulse" />
              <span className="text-[#E8A820] text-[11px] font-bold uppercase tracking-[0.18em]">
                Ghatkopar's elite arena
              </span>
            </motion.div>

            {/* Description */}
            <motion.p
              initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }}
              transition={{ delay:0.35, duration:0.75, ease:[0.16,1,0.3,1] }}
              className="text-white/75 leading-relaxed max-w-[300px]"
              style={{ fontSize:"clamp(0.88rem,2vw,1rem)" }}
            >
              A space built for serious training, real transformation, and a community that pushes each other to rise higher every single day.
            </motion.p>

            {/* 5k+ Members card */}
            <motion.div
              initial={{ opacity:0, y:20, scale:0.96 }} animate={{ opacity:1, y:0, scale:1 }}
              transition={{ delay:0.46, duration:0.7, ease:[0.16,1,0.3,1] }}
              whileHover={{ y:-4, scale:1.02 }}
              className="self-start rounded-[36px] px-5 py-3.5 flex items-center gap-3 cursor-default"
              style={{
                background:"rgba(255,255,255,0.07)",
                backdropFilter:"blur(18px)", WebkitBackdropFilter:"blur(18px)",
                border:"1px solid rgba(255,255,255,0.14)",
                boxShadow:"0 8px 32px rgba(0,0,0,0.35)",
              }}
            >
              <div>
                <p className="text-white font-black text-[0.95rem] leading-tight">5k+ Members</p>
                <div className="flex gap-0.5 mt-0.5">
                  {Array.from({length:5}).map((_,i)=>(
                    <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill="#E8A820">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Start Training — bottom of hero ─────────────── */}
        <motion.div
          initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
          transition={{ delay:0.62, duration:0.6, ease:[0.16,1,0.3,1] }}
          className="max-w-[1440px] mx-auto w-full px-5 sm:px-8 md:px-10 lg:px-14 pb-8 flex justify-end"
        >
          <motion.button
            onClick={() => goto("#pricing")}
            whileHover={{ y:-3, boxShadow:"0 16px 44px rgba(232,168,32,0.55)" }}
            whileTap={{ scale:0.96 }}
            animate={{ y:[0,-4,0] }}
            transition={{ y:{ repeat:Infinity, duration:2.4, ease:"easeInOut" }, default:{ duration:0.25 } }}
            className="text-[#0B0B0B] font-black uppercase tracking-wide rounded-full"
            style={{
              fontSize:"clamp(0.85rem,1.8vw,0.95rem)",
              padding:"13px 32px",
              background:"linear-gradient(135deg,#E8A820,#F4B400)",
              boxShadow:"0 8px 28px rgba(232,168,32,0.40)",
            }}
          >
            Start training
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}
        transition={{ delay:1.4, duration:0.6 }} style={{ opacity:fadeOut }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 pointer-events-none">
        <span className="text-white/22 text-[9px] font-semibold uppercase tracking-[0.22em]">Scroll</span>
        <motion.div animate={{ y:[0,7,0] }} transition={{ repeat:Infinity, duration:1.6, ease:"easeInOut" }}
          className="w-px h-7 bg-gradient-to-b from-white/30 to-transparent" />
      </motion.div>
    </section>
  );
}

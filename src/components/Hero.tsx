import { motion, useScroll, useTransform } from "framer-motion";
import heroBg from "@/assets/images/hero-bg.png";

export default function Hero() {
  const { scrollY } = useScroll();
  const fadeOut = useTransform(scrollY, [0, 360], [1, 0]);
  const slideUp = useTransform(scrollY, [0, 360], [0, -28]);

  const goto = (id: string) => {
    const el = document.querySelector(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 76, behavior: "smooth" });
  };

  return (
    <section id="home" className="relative min-h-[100dvh] overflow-hidden bg-[#0B0B0B]">

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 z-10"
          style={{ background:"linear-gradient(to right,rgba(11,11,11,0.82) 0%,rgba(11,11,11,0.38) 50%,rgba(11,11,11,0.10) 100%)" }}/>
        <div className="absolute inset-0 z-10"
          style={{ background:"linear-gradient(to top,rgba(11,11,11,1) 0%,transparent 55%)" }}/>
        <img src={heroBg} alt="Muscle Empire gym" fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover object-center"/>
      </div>
      <div className="absolute bottom-0 left-0 w-[340px] h-[170px] pointer-events-none z-[5]"
        style={{ background:"radial-gradient(ellipse,rgba(232,168,32,0.07) 0%,transparent 70%)" }}/>

      {/* Content wrapper */}
      <motion.div className="relative z-20 w-full min-h-[100dvh] flex flex-col justify-between"
        style={{ opacity:fadeOut, y:slideUp }}>

        {/*
          RIGHT column: headline + Start Training (stacked, no overflow)
          LEFT column: at the BOTTOM via self-end
          On mobile: headline top, left content bottom
        */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[38%_62%]
                        max-w-[1440px] mx-auto w-full
                        px-5 sm:px-8 md:px-10 lg:px-14
                        pt-[100px] sm:pt-[112px] pb-10
                        gap-y-10 lg:gap-y-0">

          {/* LEFT — pinned to bottom on desktop */}
          <div className="order-2 lg:order-1 flex flex-col justify-end gap-5 lg:pr-8 lg:pb-14">

            {/* Eyebrow */}
            <motion.div initial={{ opacity:0,y:14 }} animate={{ opacity:1,y:0 }}
              transition={{ delay:0.3, duration:0.6, ease:[0.16,1,0.3,1] }}
              className="inline-flex items-center gap-2 self-start px-4 py-1.5 rounded-full
                         border border-white/[0.12] backdrop-blur-md"
              style={{ background:"rgba(255,255,255,0.06)" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8A820] animate-pulse"/>
              <span className="text-[#E8A820] text-[11px] font-bold uppercase tracking-[0.18em]">
                Ghatkopar's elite arena
              </span>
            </motion.div>

            {/* Description */}
            <motion.p initial={{ opacity:0,y:14 }} animate={{ opacity:1,y:0 }}
              transition={{ delay:0.4, duration:0.65, ease:[0.16,1,0.3,1] }}
              className="text-white/72 leading-[1.65] max-w-[290px]"
              style={{ fontSize:"clamp(0.86rem,1.6vw,0.97rem)" }}>
              A space built for serious training, real transformation, and a community that pushes each other to rise higher every single day.
            </motion.p>

            {/* 5k+ card */}
            <motion.div initial={{ opacity:0,y:16,scale:0.96 }} animate={{ opacity:1,y:0,scale:1 }}
              transition={{ delay:0.5, duration:0.65, ease:[0.16,1,0.3,1] }}
              whileHover={{ y:-3, scale:1.02 }}
              className="self-start rounded-[32px] px-5 py-3 flex items-center gap-3 cursor-default"
              style={{
                background:"rgba(255,255,255,0.07)",
                backdropFilter:"blur(18px)", WebkitBackdropFilter:"blur(18px)",
                border:"1px solid rgba(255,255,255,0.13)",
                boxShadow:"0 6px 24px rgba(0,0,0,0.28)",
              }}>
              <div>
                <p className="text-white font-black text-[0.9rem] leading-tight">5k+ Members</p>
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

          {/* RIGHT — headline + CTA stacked */}
          <div className="order-1 lg:order-2 flex flex-col justify-end gap-6 lg:pb-10 overflow-hidden">
            <motion.h1
              initial={{ opacity:0,y:32 }} animate={{ opacity:1,y:0 }}
              transition={{ delay:0.08, duration:0.9, ease:[0.16,1,0.3,1] }}
              className="font-display font-black text-white uppercase text-left w-full"
              /* Line-height 1 so lines are tight but distinct */
              style={{ fontSize:"clamp(1.9rem,4.8vw,4.5rem)", lineHeight:1.0, letterSpacing:"-0.025em" }}
            >
              Transform<br/>
              <span style={{ background:"linear-gradient(135deg,#E8A820,#FF9500)",
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
                your body.
              </span><br/>
              Elevate<br/>
              your life.
            </motion.h1>

            {/* Start Training — right below headline, bigger */}
            <motion.button
              initial={{ opacity:0,y:14 }} animate={{ opacity:1,y:0 }}
              transition={{ delay:0.55, duration:0.6, ease:[0.16,1,0.3,1] }}
              onClick={() => goto("#pricing")}
              whileHover={{ y:-3, boxShadow:"0 16px 40px rgba(232,168,32,0.52)" }}
              whileTap={{ scale:0.96 }}
              animate={{ y:[0,-5,0] }}
              /* keep bob separate from initial */
              className="self-start text-[#0B0B0B] font-black uppercase tracking-wide rounded-full"
              style={{
                fontSize:"clamp(0.92rem,1.8vw,1.05rem)",
                padding:"15px 40px",
                background:"linear-gradient(135deg,#E8A820,#F4B400)",
                boxShadow:"0 8px 28px rgba(232,168,32,0.42)",
                animation:"hero-btn-bob 2.5s ease-in-out infinite",
              }}
            >
              Start training
            </motion.button>
            <style>{`@keyframes hero-btn-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}`}</style>
          </div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }}
        transition={{ delay:1.4, duration:0.6 }} style={{ opacity:fadeOut }}
        className="absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1.5 pointer-events-none">
        <span className="text-white/22 text-[9px] font-semibold uppercase tracking-[0.22em]">Scroll</span>
        <motion.div animate={{ y:[0,7,0] }} transition={{ repeat:Infinity, duration:1.6, ease:"easeInOut" }}
          className="w-px h-7 bg-gradient-to-b from-white/28 to-transparent"/>
      </motion.div>
    </section>
  );
}

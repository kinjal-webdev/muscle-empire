import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";

import imgExpert     from "@/assets/images/expert trainers.png";
import imgPersonal   from "@/assets/images/personalised plan.png";
import imgEquipment  from "@/assets/images/modern equipments.png";
import imgCommunity  from "@/assets/images/strong community.png";
import imgTimings    from "@/assets/images/flexible timings.png";
import imgAssessment from "@/assets/images/pro assessment.png";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  { title: "Expert Trainers",    img: imgExpert     },
  { title: "Personalised Plans", img: imgPersonal   },
  { title: "Modern Equipment",   img: imgEquipment  },
  { title: "Strong Community",   img: imgCommunity  },
  { title: "Flexible Timings",   img: imgTimings    },
  { title: "Pro Assessment",     img: imgAssessment },
];
const N = FEATURES.length;

/* Preload all images immediately */
FEATURES.forEach(f => { const img = new window.Image(); img.src = f.img; });

/* ── Desktop: Liftline-exact sticky scroll ─────────────────── */
function DesktopSection() {
  const outerRef  = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: outerRef.current,
        start: "top top",
        end: () => `+=${(N - 1) * window.innerHeight * 0.9}`,
        pin: stickyRef.current,
        pinSpacing: true,
        scrub: 0.6,
        onUpdate(self) {
          setActive(Math.min(N - 1, Math.floor(self.progress * N)));
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={outerRef}>
      <div ref={stickyRef} className="h-screen flex flex-col" style={{ background:"#F7F6F3" }}>
        <div className="max-w-[1380px] mx-auto px-10 lg:px-14 w-full pt-20 pb-10 flex-1 flex flex-col">

          {/* Section header — big, at top */}
          <div className="mb-10">
            <p className="text-[#E8A820] text-[11px] font-black uppercase tracking-[0.22em] mb-3">
              The Empire Standard
            </p>
            <h2 className="font-display font-black text-[#1C1C1E]"
              style={{ fontSize:"clamp(2.2rem,4.5vw,3.2rem)", lineHeight:1.1 }}>
              Why train <span className="text-gold-gradient">with us?</span>
            </h2>
          </div>

          {/* Two-column */}
          <div className="flex gap-16 items-start flex-1">

            {/* LEFT image */}
            <div className="w-[42%] relative flex-shrink-0">
              <div className="absolute -inset-5 rounded-[32px] pointer-events-none"
                style={{ background:"radial-gradient(ellipse 75% 75% at 50% 50%, rgba(232,168,32,0.16) 0%, transparent 70%)", filter:"blur(14px)" }}/>
              <div className="relative overflow-hidden" style={{ borderRadius:20, aspectRatio:"4/5", maxHeight:"58vh" }}>
                <AnimatePresence mode="wait">
                  <motion.img key={active} src={FEATURES[active].img} alt={FEATURES[active].title}
                    initial={{ opacity:0, y:32, scale:0.96 }}
                    animate={{ opacity:1, y:0,  scale:1 }}
                    exit={{ opacity:0, y:-20, scale:0.98 }}
                    transition={{ duration:0.45, ease:[0.16,1,0.3,1] }}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ borderRadius:20 }}/>
                </AnimatePresence>
                <div className="absolute inset-0 pointer-events-none z-10"
                  style={{ borderRadius:20, background:"linear-gradient(to top,rgba(0,0,0,0.38) 0%,transparent 55%)" }}/>
                <div className="absolute bottom-5 left-5 z-20">
                  <span className="text-[#E8A820] text-[10px] font-black uppercase tracking-widest">
                    {String(active+1).padStart(2,"0")} — {FEATURES[active].title}
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT feature list */}
            <div className="w-[58%] flex flex-col justify-center self-stretch">
              {FEATURES.map((f, i) => (
                <div key={i}>
                  <div className="flex items-baseline justify-between py-4">
                    <motion.h3
                      animate={{ color: i===active ? "#1C1C1E" : "rgba(28,28,30,0.25)" }}
                      transition={{ duration:0.32 }}
                      className="font-display font-black leading-none"
                      style={{ fontSize:"clamp(1.4rem,2.8vw,2.2rem)" }}
                    >{f.title}</motion.h3>
                    <motion.span
                      animate={{ color: i===active ? "#E8A820" : "rgba(28,28,30,0.20)" }}
                      transition={{ duration:0.32 }}
                      className="font-display font-black shrink-0 ml-4"
                      style={{ fontSize:"clamp(1.1rem,2.2vw,1.75rem)" }}
                    >{String(i+1).padStart(2,"0")}</motion.span>
                  </div>
                  <div className="h-[2px] w-full rounded-full overflow-hidden" style={{ background:"rgba(28,28,30,0.09)" }}>
                    <motion.div className="h-full rounded-full origin-left" style={{ background:"#E8A820" }}
                      animate={{ scaleX: i===active ? 1 : 0 }}
                      transition={{ duration:0.55, ease:[0.16,1,0.3,1] }}/>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Mobile: clean vertical stack, one feature per screen ───── */
function MobileSection() {
  return (
    <div style={{ background:"#F7F6F3" }} className="px-5 py-16">
      {/* Header */}
      <p className="text-[#E8A820] text-[11px] font-black uppercase tracking-[0.22em] mb-2">
        The Empire Standard
      </p>
      <h2 className="font-display font-black text-[#1C1C1E] text-[2rem] leading-tight mb-10">
        Why train <span className="text-gold-gradient">with us?</span>
      </h2>

      {/* Each feature: image + title stacked */}
      <div className="flex flex-col gap-10">
        {FEATURES.map((f, i) => (
          <motion.div key={i}
            initial={{ opacity:0, y:24 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true, margin:"-60px" }}
            transition={{ duration:0.55, delay: i * 0.04, ease:[0.16,1,0.3,1] }}
          >
            {/* Image */}
            <div className="relative overflow-hidden mb-4" style={{ borderRadius:16, aspectRatio:"16/9" }}>
              <img src={f.img} alt={f.title} className="w-full h-full object-cover" loading="lazy"/>
              <div className="absolute inset-0 pointer-events-none"
                style={{ background:"radial-gradient(ellipse 70% 60% at 50% 80%, rgba(232,168,32,0.15) 0%, transparent 65%)" }}/>
              <div className="absolute inset-0 pointer-events-none"
                style={{ background:"linear-gradient(to top,rgba(0,0,0,0.35) 0%,transparent 50%)", borderRadius:16 }}/>
              <span className="absolute bottom-3 left-3 text-[#E8A820] text-[10px] font-black uppercase tracking-widest">
                {String(i+1).padStart(2,"0")}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-display font-black text-[#1C1C1E] text-[1.5rem] leading-snug mb-3">{f.title}</h3>

            {/* Gold divider */}
            <div className="h-[2px] w-full rounded-full" style={{ background:"#E8A820", opacity:0.7 }}/>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ── Export ─────────────────────────────────────────────────── */
export default function WhyChooseUs() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section id="why-us">
      {isMobile ? <MobileSection /> : <DesktopSection />}
    </section>
  );
}

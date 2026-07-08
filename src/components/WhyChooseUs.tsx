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
/* Each feature gets one "scroll step" of 100vh */
const SECTION_HEIGHT = `${N * 100}vh`;

export default function WhyChooseUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* 
        Pin the sticky inner while the container scrolls through N×100vh.
        scrub:true maps scroll progress directly to feature index.
      */
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: `+=${N * window.innerHeight}`,
        pin: ".why-sticky",
        pinSpacing: false,
        scrub: false,
        onUpdate: (self) => {
          const idx = Math.min(
            N - 1,
            Math.floor(self.progress * N)
          );
          setActive(idx);
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    /* Tall outer container — scroll space */
    <div ref={containerRef} style={{ height: SECTION_HEIGHT }} className="relative">

      {/* Sticky inner — stays at top while outer scrolls */}
      <div
        className="why-sticky sticky top-0 h-screen bg-[#1C1C1E] overflow-hidden flex flex-col justify-center"
      >
        {/* Top gold line */}
        <div className="absolute top-0 inset-x-0 h-px"
          style={{ background:"linear-gradient(90deg,transparent,rgba(232,168,32,0.30),transparent)" }}/>

        <div className="max-w-[1380px] mx-auto px-6 md:px-10 lg:px-14 w-full">

          {/* Section label */}
          <p className="text-[#D89A1A] text-[11px] font-black uppercase tracking-[0.22em] mb-8">
            Why train with us?
          </p>

          {/* Two column */}
          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

            {/* LEFT — image */}
            <div className="w-full lg:w-[40%] relative overflow-hidden flex-shrink-0"
              style={{ borderRadius:20, aspectRatio:"4/5", maxHeight:"72vh" }}>
              <AnimatePresence mode="wait">
                <motion.img
                  key={active}
                  src={FEATURES[active].img}
                  alt={FEATURES[active].title}
                  initial={{ opacity:0, y:40, scale:0.97 }}
                  animate={{ opacity:1, y:0,  scale:1 }}
                  exit={{ opacity:0, y:-20, scale:0.98 }}
                  transition={{ duration:0.55, ease:[0.16,1,0.3,1] }}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ borderRadius:20 }}
                />
              </AnimatePresence>
              <div className="absolute inset-0 rounded-[20px] pointer-events-none"
                style={{ background:"linear-gradient(to top,rgba(0,0,0,0.4) 0%,transparent 50%)" }}/>
            </div>

            {/* RIGHT — feature list */}
            <div className="w-full lg:w-[60%] flex flex-col">
              {FEATURES.map((f, i) => (
                <div key={i} className="group">
                  <div className="flex items-baseline justify-between py-4 sm:py-5">
                    <motion.h3
                      animate={{ color: i === active ? "#ffffff" : "rgba(255,255,255,0.25)" }}
                      transition={{ duration:0.35 }}
                      className="font-display font-black leading-none"
                      style={{ fontSize:"clamp(1.3rem,2.6vw,2.1rem)" }}
                    >
                      {f.title}
                    </motion.h3>
                    <motion.span
                      animate={{ color: i === active ? "rgba(232,168,32,0.9)" : "rgba(255,255,255,0.15)" }}
                      transition={{ duration:0.35 }}
                      className="font-display font-black shrink-0 ml-4"
                      style={{ fontSize:"clamp(1.1rem,2.2vw,1.8rem)" }}
                    >
                      {String(i+1).padStart(2,"0")}
                    </motion.span>
                  </div>

                  {/* Divider */}
                  <div className="h-[2px] w-full bg-white/[0.07] rounded-full overflow-hidden">
                    <motion.div
                      className="h-full rounded-full origin-left"
                      style={{ background:"#E8A820" }}
                      animate={{ scaleX: i === active ? 1 : 0 }}
                      transition={{ duration:0.55, ease:[0.16,1,0.3,1] }}
                    />
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

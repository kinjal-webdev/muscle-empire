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

/* Preload all images so transitions are instant */
if (typeof window !== "undefined") {
  FEATURES.forEach(f => { const i = new Image(); i.src = f.img; });
}

export default function WhyChooseUs() {
  const outerRef  = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    /* Use pinSpacing:true (default) so next section pushes down correctly */
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: outerRef.current,
        start: "top top",
        end: () => `+=${(N - 1) * window.innerHeight}`,
        pin: stickyRef.current,
        pinSpacing: true,          /* ← ensures correct spacing after unpin */
        scrub: 0.5,
        onUpdate(self) {
          setActive(Math.min(N - 1, Math.floor(self.progress * N)));
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={outerRef} id="why-us">
      {/* Sticky panel */}
      <div
        ref={stickyRef}
        className="h-screen flex flex-col justify-center"
        style={{ background: "#F7F6F3" }}
      >
        {/* top border */}
        <div className="absolute top-0 inset-x-0 h-px"
          style={{ background:"linear-gradient(90deg,transparent,rgba(232,168,32,0.30),transparent)" }}/>

        <div className="max-w-[1380px] mx-auto px-6 md:px-10 lg:px-14 w-full">

          {/* Label */}
          <p className="text-[#E8A820] text-[11px] font-black uppercase tracking-[0.22em] mb-8">
            Why train with us?
          </p>

          <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">

            {/* ── LEFT: image with radial glow ── */}
            <div className="w-full lg:w-[42%] relative flex-shrink-0"
              style={{ borderRadius:20 }}>
              {/* Gold radial glow behind image */}
              <div className="absolute -inset-4 rounded-[28px] pointer-events-none z-0"
                style={{ background:"radial-gradient(ellipse 80% 80% at 50% 50%, rgba(232,168,32,0.18) 0%, transparent 70%)", filter:"blur(12px)" }}/>

              <div className="relative z-10 overflow-hidden"
                style={{ borderRadius:20, aspectRatio:"4/5", maxHeight:"68vh" }}>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={active}
                    src={FEATURES[active].img}
                    alt={FEATURES[active].title}
                    initial={{ opacity:0, y:28, scale:0.97 }}
                    animate={{ opacity:1, y:0, scale:1 }}
                    exit={{ opacity:0, y:-18, scale:0.98 }}
                    transition={{ duration:0.42, ease:[0.16,1,0.3,1] }}
                    className="absolute inset-0 w-full h-full object-cover"
                    style={{ borderRadius:20 }}
                  />
                </AnimatePresence>
                {/* bottom overlay */}
                <div className="absolute inset-0 rounded-[20px] pointer-events-none z-10"
                  style={{ background:"linear-gradient(to top,rgba(0,0,0,0.35) 0%,transparent 50%)" }}/>
                {/* active label */}
                <div className="absolute bottom-5 left-5 z-20">
                  <span className="text-[#E8A820] text-[10px] font-black uppercase tracking-widest">
                    {String(active+1).padStart(2,"0")} — {FEATURES[active].title}
                  </span>
                </div>
              </div>
            </div>

            {/* ── RIGHT: feature rows ── */}
            <div className="w-full lg:w-[58%] flex flex-col">
              {FEATURES.map((f, i) => (
                <div key={i}>
                  <div className="flex items-baseline justify-between py-4 sm:py-5">
                    <motion.h3
                      animate={{ color: i === active ? "#1C1C1E" : "rgba(28,28,30,0.28)" }}
                      transition={{ duration:0.32 }}
                      className="font-display font-black leading-none"
                      style={{ fontSize:"clamp(1.25rem,2.4vw,2rem)" }}
                    >
                      {f.title}
                    </motion.h3>
                    <motion.span
                      animate={{ color: i === active ? "#E8A820" : "rgba(28,28,30,0.22)" }}
                      transition={{ duration:0.32 }}
                      className="font-display font-black shrink-0 ml-4"
                      style={{ fontSize:"clamp(1rem,2vw,1.6rem)" }}
                    >
                      {String(i+1).padStart(2,"0")}
                    </motion.span>
                  </div>
                  {/* Divider */}
                  <div className="h-[2px] w-full rounded-full overflow-hidden"
                    style={{ background:"rgba(28,28,30,0.10)" }}>
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

        {/* Mobile: stacked layout — just show active card */}
        {/* (handled by the same layout — on mobile, flex-col stacks naturally) */}
      </div>
    </div>
  );
}

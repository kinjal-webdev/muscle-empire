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

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowRefs    = useRef<(HTMLButtonElement | null)[]>([]);
  const [active, setActive]   = useState(0);
  const [prevActive, setPrev] = useState(-1);

  useEffect(() => {
    /* No ScrollTrigger here — hover/click only for Liftline feel */
    return () => {};
  }, []);

  const activate = (i: number) => {
    setPrev(active);
    setActive(i);
  };

  return (
    <section
      id="why-us"
      ref={sectionRef}
      className="relative bg-[#111111] py-20"
    >
      <div className="absolute top-0 inset-x-0 h-px"
        style={{ background:"linear-gradient(90deg,transparent,rgba(232,168,32,0.25),transparent)" }}/>

      <div className="max-w-[1380px] mx-auto px-6 md:px-10 lg:px-14">

        {/* ── Two column: left image / right list ── */}
        <div className="flex flex-col lg:flex-row items-start gap-12 lg:gap-16">

          {/* LEFT — image (matches list height) */}
          <div className="w-full lg:w-[42%] lg:sticky lg:top-[88px] relative overflow-hidden"
            style={{ borderRadius: 20, aspectRatio:"4/5", minHeight: 320 }}>
            <AnimatePresence mode="wait">
              <motion.img
                key={active}
                src={FEATURES[active].img}
                alt={FEATURES[active].title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ borderRadius: 20 }}
              />
            </AnimatePresence>
            {/* dark overlay */}
            <div className="absolute inset-0 rounded-[20px] pointer-events-none"
              style={{ background:"linear-gradient(to top,rgba(0,0,0,0.4) 0%,transparent 50%)" }}/>
          </div>

          {/* RIGHT — feature rows, no description, all visible */}
          <div className="w-full lg:w-[58%] flex flex-col justify-center self-stretch">
            {FEATURES.map((f, i) => (
              <button
                key={i}
                ref={el => { rowRefs.current[i] = el; }}
                onClick={() => activate(i)}
                onMouseEnter={() => activate(i)}
                className="text-left group focus:outline-none"
                style={{ transition:"opacity 0.3s" }}
              >
                {/* Title row */}
                <div className="flex items-baseline justify-between py-5 sm:py-7">
                  <motion.h3
                    animate={{
                      color: i === active ? "#ffffff" : "rgba(255,255,255,0.32)",
                      scale: i === active ? 1 : 0.98,
                    }}
                    transition={{ duration: 0.3 }}
                    className="font-display font-black leading-none"
                    style={{ fontSize:"clamp(1.6rem,3.5vw,2.8rem)" }}
                  >
                    {f.title}
                  </motion.h3>
                  <motion.span
                    animate={{
                      color: i === active ? "rgba(255,255,255,0.55)" : "rgba(255,255,255,0.18)",
                    }}
                    transition={{ duration: 0.3 }}
                    className="font-display font-black shrink-0 ml-4"
                    style={{ fontSize:"clamp(1.4rem,3vw,2.2rem)" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </motion.span>
                </div>

                {/* Divider — animates from left when active */}
                <div className="h-[2px] w-full bg-white/[0.08] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ background:"#D89A1A", transformOrigin:"left" }}
                    animate={{ scaleX: i === active ? 1 : 0 }}
                    transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

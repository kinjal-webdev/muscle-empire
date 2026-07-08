import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import imgExpert      from "@/assets/images/expert trainers.png";
import imgPersonal    from "@/assets/images/personalised plan.png";
import imgEquipment   from "@/assets/images/modern equipments.png";
import imgCommunity   from "@/assets/images/strong community.png";
import imgTimings     from "@/assets/images/flexible timings.png";
import imgAssessment  from "@/assets/images/pro assessment.png";

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    num: "01",
    title: "Expert Trainers",
    desc: "Certified professionals with years of competitive coaching who push you past every limit and track every milestone.",
    img: imgExpert,
  },
  {
    num: "02",
    title: "Personalised Plans",
    desc: "No cookie-cutter routines. Every programme is designed from scratch around your unique body, schedule, and goals.",
    img: imgPersonal,
  },
  {
    num: "03",
    title: "Modern Equipment",
    desc: "Top-tier, biomechanically superior machines and an extensive free-weight range — everything you need, nothing you don't.",
    img: imgEquipment,
  },
  {
    num: "04",
    title: "Strong Community",
    desc: "Train alongside driven individuals who share your relentless pursuit of progress and hold you accountable.",
    img: imgCommunity,
  },
  {
    num: "05",
    title: "Flexible Timings",
    desc: "Open early morning to late night — six days a week, so your schedule is never an excuse to skip a session.",
    img: imgTimings,
  },
  {
    num: "06",
    title: "Pro Assessment",
    desc: "Full body composition and movement analysis before day one, so every plan begins with complete clarity.",
    img: imgAssessment,
  },
];

export default function WhyChooseUs() {
  const sectionRef  = useRef<HTMLElement>(null);
  const imgRefs     = useRef<(HTMLImageElement | null)[]>([]);
  const itemRefs    = useRef<(HTMLDivElement | null)[]>([]);
  const dividerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      FEATURES.forEach((_, i) => {
        const item = itemRefs.current[i];
        if (!item) return;

        ScrollTrigger.create({
          trigger: item,
          start: "top 55%",
          end: "bottom 45%",
          scrub: false,
          onEnter: () => activateFeature(i),
          onEnterBack: () => activateFeature(i),
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const activateFeature = (i: number) => {
    setActive(i);

    /* image crossfade */
    FEATURES.forEach((_, j) => {
      const img = imgRefs.current[j];
      if (!img) return;
      gsap.to(img, {
        opacity: j === i ? 1 : 0,
        scale:   j === i ? 1 : 0.96,
        duration: 0.6,
        ease: "power2.inOut",
      });
    });

    /* feature items */
    FEATURES.forEach((_, j) => {
      const el = itemRefs.current[j];
      if (!el) return;
      gsap.to(el, {
        opacity:    j === i ? 1 : 0.38,
        y:          j === i ? 0 : 14,
        scale:      j === i ? 1 : 0.985,
        duration:   0.45,
        ease:       "power2.out",
      });
    });

    /* divider expand */
    const div = dividerRefs.current[i];
    if (div) {
      gsap.fromTo(div, { scaleX: 0 }, { scaleX: 1, duration: 0.65, ease: "power2.out", transformOrigin: "left" });
    }
  };

  return (
    <section
      id="why-us"
      ref={sectionRef}
      style={{ background: "#FAF8F5" }}
      className="relative"
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-black/[0.08] to-transparent" />

      <div className="max-w-[1400px] mx-auto px-6 md:px-10 lg:px-14 py-24">

        {/* Section label */}
        <div className="mb-16">
          <p className="text-[#D89A1A] text-[11px] font-black uppercase tracking-[0.22em] mb-3">
            The Empire Standard
          </p>
          <h2 className="font-display font-black text-[#111] text-[clamp(2rem,4vw,3rem)] leading-tight">
            Why train with us?
          </h2>
        </div>

        {/* Two-column */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">

          {/* ── LEFT: sticky image ────────────────────────── */}
          <div className="w-full lg:w-[42%] lg:sticky lg:top-[88px]">
            <div
              className="relative overflow-hidden"
              style={{ borderRadius: 24, aspectRatio: "4/5" }}
            >
              {FEATURES.map((f, i) => (
                <img
                  key={i}
                  ref={el => { imgRefs.current[i] = el; }}
                  src={f.img}
                  alt={f.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    opacity: i === 0 ? 1 : 0,
                    scale:   i === 0 ? "1" : "0.96",
                    borderRadius: 24,
                  }}
                />
              ))}
              {/* overlay */}
              <div className="absolute inset-0 rounded-[24px] pointer-events-none"
                style={{ background:"linear-gradient(to top,rgba(0,0,0,0.35) 0%,transparent 50%)" }}/>
              {/* active label */}
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-[#D89A1A] text-[11px] font-black uppercase tracking-widest mb-1">
                  {FEATURES[active].num} — {FEATURES[active].title}
                </p>
              </div>
            </div>
          </div>

          {/* ── RIGHT: feature list ───────────────────────── */}
          <div className="w-full lg:w-[58%] flex flex-col">
            {FEATURES.map((f, i) => (
              <div
                key={i}
                ref={el => { itemRefs.current[i] = el; }}
                style={{ opacity: i === 0 ? 1 : 0.38 }}
                className="py-10 cursor-default select-none"
                onClick={() => activateFeature(i)}
              >
                <div className="flex items-baseline justify-between gap-4 mb-4">
                  {/* Title */}
                  <h3
                    className="font-display font-black text-[#111] leading-none"
                    style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)" }}
                  >
                    {f.title}
                  </h3>
                  {/* Number */}
                  <span
                    className="font-display font-black shrink-0 leading-none"
                    style={{
                      fontSize: "clamp(2.5rem, 5vw, 4.4rem)",
                      color: i === active ? "rgba(0,0,0,0.45)" : "rgba(0,0,0,0.15)",
                      transition: "color 0.35s",
                    }}
                  >
                    {f.num}
                  </span>
                </div>

                {/* Description */}
                <p
                  className="text-[#666] leading-[1.65] max-w-xl"
                  style={{ fontSize: "clamp(1rem,2vw,1.25rem)" }}
                >
                  {f.desc}
                </p>

                {/* Divider */}
                <div className="mt-8 h-[2.5px] bg-[#E8E0D6] rounded-full overflow-hidden">
                  <div
                    ref={el => { dividerRefs.current[i] = el; }}
                    className="h-full rounded-full"
                    style={{
                      background: "#D89A1A",
                      transformOrigin: "left",
                      scaleX: i === 0 ? 1 : 0,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

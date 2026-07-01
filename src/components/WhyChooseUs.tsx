import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, MotionValue } from "framer-motion";
import { CheckCircle2, Trophy, Clock, Target, Users2, Activity } from "lucide-react";

/* ── Steps ───────────────────────────────────────────────────── */
const STEPS = [
  { Icon: Trophy,       title: "Expert trainers",    desc: "Certified professionals with years of competitive coaching who push you beyond your limits and track every milestone.", iconColor: "#F9A825", glow: "rgba(249,168,37,.22)", bg: "rgba(249,168,37,.08)", stat: "10+",   statLabel: "Years coaching"     },
  { Icon: Target,       title: "Personalised plans", desc: "No cookie-cutter routines. Every programme is designed from scratch around your unique body, schedule, and goals.",    iconColor: "#4ADE80", glow: "rgba(74,222,128,.20)",  bg: "rgba(74,222,128,.08)",  stat: "100%",  statLabel: "Custom built"       },
  { Icon: Activity,     title: "Modern equipment",   desc: "Top-tier biomechanically superior machines and an extensive free-weight range — everything you need, nothing you don't.", iconColor: "#60A5FA", glow: "rgba(96,165,250,.20)",  bg: "rgba(96,165,250,.08)",  stat: "500+",  statLabel: "Equipment pieces"   },
  { Icon: Users2,       title: "Strong community",   desc: "Train alongside driven individuals who share your relentless pursuit of progress. Accountability is built into the culture.", iconColor: "#C084FC", glow: "rgba(192,132,252,.20)", bg: "rgba(192,132,252,.08)", stat: "1000+", statLabel: "Active members"     },
  { Icon: Clock,        title: "Flexible timings",   desc: "Open early morning to late night — your schedule is never an excuse to skip a session. Six days a week, all year.",    iconColor: "#F87171", glow: "rgba(248,113,113,.20)", bg: "rgba(248,113,113,.08)", stat: "16hrs", statLabel: "Open daily"         },
  { Icon: CheckCircle2, title: "Pro assessment",     desc: "Comprehensive body composition and movement analysis before you start, so every plan begins with complete clarity.",    iconColor: "#34D399", glow: "rgba(52,211,153,.20)",  bg: "rgba(52,211,153,.08)",  stat: "Day 1", statLabel: "Assessment"         },
];
const N = STEPS.length;

/* ── Visual card ─────────────────────────────────────────────── */
function VisualCard({ step }: { step: typeof STEPS[0] }) {
  return (
    <motion.div
      key={step.title}
      initial={{ opacity: 0, y: 36, scale: 0.94 }}
      animate={{ opacity: 1, y: 0,  scale: 1    }}
      exit={{    opacity: 0, y: -28, scale: 0.96 }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <div
        className="relative rounded-[28px] flex flex-col items-center justify-center p-10 w-full max-w-[400px] mx-auto"
        style={{
          background: `radial-gradient(circle at 40% 35%, ${step.glow} 0%, transparent 65%), #1e1e20`,
          border: `1.5px solid ${step.iconColor}40`,
          boxShadow: `0 32px 80px rgba(0,0,0,.45), 0 0 60px ${step.glow}`,
          minHeight: 320,
        }}
      >
        {/* top shimmer */}
        <div className="absolute top-0 left-[20%] right-[20%] h-px pointer-events-none"
          style={{ background: `linear-gradient(90deg,transparent,${step.iconColor},transparent)` }} />

        {/* icon */}
        <motion.div
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.5, ease: [0.16,1,0.3,1] }}
          className="w-20 h-20 rounded-3xl flex items-center justify-center mb-7"
          style={{ background: step.bg, color: step.iconColor, boxShadow: `0 0 40px ${step.iconColor}50` }}
        >
          <step.Icon size={42} strokeWidth={1.6} />
        </motion.div>

        {/* stat */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.4 }}
          className="mb-3 px-5 py-2 rounded-full flex items-center gap-2"
          style={{ background: step.bg, border: `1px solid ${step.iconColor}35` }}
        >
          <span className="font-display font-black text-2xl" style={{ color: step.iconColor }}>{step.stat}</span>
          <span className="text-xs font-semibold uppercase tracking-widest text-[#F2EFE9]/50">{step.statLabel}</span>
        </motion.div>

        {/* watermark */}
        <div className="absolute bottom-4 right-4 pointer-events-none opacity-[0.07]" style={{ color: step.iconColor }}>
          <step.Icon size={110} strokeWidth={0.6} />
        </div>
      </div>
    </motion.div>
  );
}

/* ── Step row in left panel ──────────────────────────────────── */
function StepRow({
  step, index, progress,
}: {
  step: typeof STEPS[0];
  index: number;
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, [index - 0.5, index, index + 0.5], [0.3, 1, 0.3]);
  const x       = useTransform(progress, [index - 0.6, index, index + 0.6], [-10, 0, -10]);

  return (
    <motion.div style={{ opacity, x }}
      className="flex items-center gap-3 px-4 py-3 rounded-2xl">
      <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: step.bg, color: step.iconColor }}>
        <step.Icon size={15} strokeWidth={2.2} />
      </div>
      <span className="text-[0.9rem] font-semibold text-[#F2EFE9]/80">{step.title}</span>
    </motion.div>
  );
}

/* ── Progress pip ─────────────────────────────────────────────── */
function Pip({ index, step, progress }: { index: number; step: typeof STEPS[0]; progress: MotionValue<number> }) {
  const h  = useTransform(progress, [index - 0.4, index, index + 0.4], [8, 28, 8]);
  const bg = useTransform(progress, [index - 0.4, index, index + 0.4],
    ["rgba(255,255,255,0.15)", step.iconColor, "rgba(255,255,255,0.15)"]);
  return <motion.div style={{ width: 4, height: h, background: bg, borderRadius: 99 }} />;
}

/* ── Main ─────────────────────────────────────────────────────── */
export default function WhyChooseUs() {
  const containerRef = useRef<HTMLDivElement>(null);

  /* scroll progress over the full tall container */
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  /* continuous float 0 → N-1 */
  const floatStep = useTransform(scrollYProgress, [0, 1], [0, N - 0.001]);

  /* derive integer active step */
  const [activeIdx, setActiveIdx] = useState(0);
  useEffect(() => {
    const unsub = floatStep.on("change", v => setActiveIdx(Math.round(Math.max(0, Math.min(N - 1, v)))));
    return unsub;
  }, [floatStep]);

  return (
    /* tall container — N × 100vh gives one full scroll step per card */
    <div id="why-us" ref={containerRef} style={{ height: `${N * 100}vh` }} className="relative bg-[#1C1C1E]">

      {/* sticky viewport */}
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* ambient */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(232,168,32,.04) 0%, transparent 70%)" }} />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

        <div className="h-full flex items-center">
          <div className="w-full max-w-7xl mx-auto px-5 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">

            {/* LEFT — stays still, step list animates */}
            <div className="order-2 md:order-1">
              <div className="eyebrow mb-4">The Empire standard</div>
              <h2 className="font-display font-black text-[#F2EFE9] text-[clamp(1.8rem,4vw,2.8rem)] leading-tight mb-4">
                Why train <span className="text-gold-gradient">with us?</span>
              </h2>
              <p className="text-[#F2EFE9]/45 text-[0.97rem] leading-relaxed mb-8">
                From our equipment to our culture, every element is engineered for your success.
              </p>

              <div className="flex flex-col gap-1">
                {STEPS.map((step, i) => (
                  <StepRow key={i} step={step} index={i} progress={floatStep} />
                ))}
              </div>
            </div>

            {/* RIGHT — animated visual panel */}
            <div className="order-1 md:order-2 flex items-center justify-center">
              <div className="relative w-full" style={{ height: 380 }}>

                {/* progress pips */}
                <div className="absolute -left-2 top-1/2 -translate-y-1/2 hidden md:flex flex-col gap-2 z-20">
                  {STEPS.map((step, i) => (
                    <Pip key={i} index={i} step={step} progress={floatStep} />
                  ))}
                </div>

                {/* cards */}
                <AnimatePresence mode="wait">
                  <VisualCard key={activeIdx} step={STEPS[activeIdx]} />
                </AnimatePresence>

                {/* mobile dots */}
                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex gap-2 md:hidden">
                  {STEPS.map((_, i) => (
                    <div key={i} className="rounded-full transition-all duration-300"
                      style={{ width: i === activeIdx ? 22 : 7, height: 7,
                        background: i === activeIdx ? STEPS[i].iconColor : "rgba(255,255,255,.2)" }} />
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

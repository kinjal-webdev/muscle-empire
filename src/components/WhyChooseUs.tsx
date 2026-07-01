import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { CheckCircle2, Trophy, Clock, Target, Users2, Activity } from "lucide-react";

/* ── Steps ──────────────────────────────────────────────────── */
const STEPS = [
  {
    Icon: Trophy,
    title: "Expert trainers",
    sub: "Certified coaches who push you past every limit.",
    stat: "10+", statLabel: "Years coaching",
    iconColor: "#F9A825", glow: "rgba(249,168,37,.28)", bg: "rgba(249,168,37,.10)",
  },
  {
    Icon: Target,
    title: "Personalised plans",
    sub: "Built around your body, schedule, and goals.",
    stat: "100%", statLabel: "Custom built",
    iconColor: "#4ADE80", glow: "rgba(74,222,128,.24)", bg: "rgba(74,222,128,.10)",
  },
  {
    Icon: Activity,
    title: "Modern equipment",
    sub: "Top-tier machines and free weights for every goal.",
    stat: "500+", statLabel: "Pieces of equipment",
    iconColor: "#60A5FA", glow: "rgba(96,165,250,.24)", bg: "rgba(96,165,250,.10)",
  },
  {
    Icon: Users2,
    title: "Strong community",
    sub: "Train alongside people who share your drive.",
    stat: "1000+", statLabel: "Active members",
    iconColor: "#C084FC", glow: "rgba(192,132,252,.24)", bg: "rgba(192,132,252,.10)",
  },
  {
    Icon: Clock,
    title: "Flexible timings",
    sub: "Open from 6 AM to 10 PM, six days a week.",
    stat: "16 hrs", statLabel: "Open daily",
    iconColor: "#F87171", glow: "rgba(248,113,113,.24)", bg: "rgba(248,113,113,.10)",
  },
  {
    Icon: CheckCircle2,
    title: "Pro assessment",
    sub: "Full body analysis before day one.",
    stat: "Day 1", statLabel: "Assessment",
    iconColor: "#34D399", glow: "rgba(52,211,153,.24)", bg: "rgba(52,211,153,.10)",
  },
];
const N = STEPS.length;

/* ── Visual card ─────────────────────────────────────────────── */
function VisualCard({ step }: { step: typeof STEPS[0] }) {
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <motion.div
      key={step.title}
      initial={prefersReduced ? false : { opacity: 0, y: 48, scale: 0.93 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={prefersReduced ? undefined : { opacity: 0, y: -36, scale: 0.96 }}
      transition={{ duration: 0.58, ease: [0.16, 1, 0.3, 1] }}
      className="absolute inset-0 flex items-center justify-center"
    >
      <div
        className="relative w-full rounded-[24px] flex flex-col items-center justify-center overflow-hidden"
        style={{
          maxWidth: 380,
          minHeight: 340,
          padding: "40px 36px",
          background: `radial-gradient(ellipse 80% 60% at 40% 30%, ${step.glow} 0%, transparent 65%), #161618`,
          border: `1.5px solid ${step.iconColor}35`,
          boxShadow: `0 32px 80px rgba(0,0,0,.50), 0 0 70px ${step.glow}`,
        }}
      >
        {/* top edge shimmer */}
        <div className="absolute top-0 left-[18%] right-[18%] h-px pointer-events-none"
          style={{ background: `linear-gradient(90deg,transparent,${step.iconColor}90,transparent)` }} />

        {/* big icon */}
        <motion.div
          initial={prefersReduced ? false : { scale: 0.65, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.52, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl flex items-center justify-center mb-8"
          style={{
            width: 88, height: 88,
            background: step.bg, color: step.iconColor,
            boxShadow: `0 0 48px ${step.iconColor}55`,
          }}
        >
          <step.Icon size={44} strokeWidth={1.5} />
        </motion.div>

        {/* stat */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.44 }}
          className="flex items-baseline gap-2 mb-4 px-6 py-2.5 rounded-full"
          style={{ background: step.bg, border: `1px solid ${step.iconColor}30` }}
        >
          <span className="font-display font-black text-[2rem] leading-none" style={{ color: step.iconColor }}>
            {step.stat}
          </span>
          <span className="text-[0.72rem] font-bold uppercase tracking-widest text-[#F2EFE9]/45">
            {step.statLabel}
          </span>
        </motion.div>

        {/* watermark */}
        <div className="absolute bottom-5 right-5 pointer-events-none opacity-[0.065]"
          style={{ color: step.iconColor }}>
          <step.Icon size={108} strokeWidth={0.6} />
        </div>
      </div>
    </motion.div>
  );
}

/* ── Desktop section (sticky scroll) ────────────────────────── */
function DesktopSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  /* Map 0-1 → step 0-(N-1) */
  const floatStep = useTransform(scrollYProgress, [0, 1], [0, N - 0.001]);

  useEffect(() => {
    const unsub = floatStep.on("change", v =>
      setActive(Math.min(N - 1, Math.max(0, Math.round(v))))
    );
    return unsub;
  }, [floatStep]);

  /* Parallax for the heading */
  const headY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <div ref={containerRef} style={{ height: `${N * 90}vh` }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">
        {/* bg glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 65% 55% at 50% 50%, rgba(232,168,32,.05) 0%, transparent 68%)" }} />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

        <div className="w-full max-w-7xl mx-auto px-8 md:px-12 grid grid-cols-2 gap-16 items-center">

          {/* LEFT — heading with parallax */}
          <motion.div style={{ y: headY }}>
            <div className="eyebrow mb-5">The Empire standard</div>
            <h2 className="font-display font-black text-[#F2EFE9] leading-[1.05] tracking-tight mb-5"
              style={{ fontSize: "clamp(2.8rem, 5vw, 4.2rem)" }}>
              Why train
              <br />
              <span className="text-gold-gradient">with us?</span>
            </h2>
            <p className="text-[#F2EFE9]/40 text-[1rem] leading-relaxed max-w-xs mb-10">
              {STEPS[active].sub}
            </p>

            {/* step list */}
            <div className="flex flex-col gap-2">
              {STEPS.map((s, i) => (
                <motion.div key={i}
                  animate={{ opacity: i === active ? 1 : 0.3, x: i === active ? 0 : -8 }}
                  transition={{ duration: 0.35 }}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl"
                  style={{ background: i === active ? `${s.bg}` : "transparent" }}
                >
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: s.bg, color: s.iconColor }}>
                    <s.Icon size={14} strokeWidth={2.2} />
                  </div>
                  <span className="text-[0.88rem] font-semibold text-[#F2EFE9]/80">{s.title}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT — animated card */}
          <div className="relative flex justify-center" style={{ height: 440 }}>
            {/* pips */}
            <div className="absolute -right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20">
              {STEPS.map((s, i) => (
                <motion.div key={i}
                  animate={{ height: i === active ? 28 : 8, background: i === active ? s.iconColor : "rgba(255,255,255,.18)" }}
                  transition={{ duration: 0.35 }}
                  style={{ width: 4, borderRadius: 99 }}
                />
              ))}
            </div>

            <AnimatePresence mode="wait">
              <VisualCard key={active} step={STEPS[active]} />
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Mobile section (sticky scroll, stacked) ────────────────── */
function MobileSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const floatStep = useTransform(scrollYProgress, [0, 1], [0, N - 0.001]);

  useEffect(() => {
    const unsub = floatStep.on("change", v =>
      setActive(Math.min(N - 1, Math.max(0, Math.round(v))))
    );
    return unsub;
  }, [floatStep]);

  return (
    <div ref={containerRef} style={{ height: `${N * 60}vh` }} className="relative">
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col items-center justify-center px-5 py-8 gap-6">

        {/* bg glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 80% 50% at 50% 40%, rgba(232,168,32,.05) 0%, transparent 70%)" }} />

        {/* heading */}
        <div className="w-full text-center z-10">
          <div className="eyebrow justify-center mb-3">The Empire standard</div>
          <h2 className="font-display font-black text-[#F2EFE9] leading-tight"
            style={{ fontSize: "clamp(2rem, 8vw, 2.8rem)" }}>
            Why train <span className="text-gold-gradient">with us?</span>
          </h2>
        </div>

        {/* card */}
        <div className="relative z-10 w-full flex justify-center" style={{ height: 260 }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 28, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.96 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div
                className="rounded-[22px] flex flex-col items-center justify-center p-7 relative overflow-hidden"
                style={{
                  width: Math.min(window.innerWidth - 48, 300),
                  height: 240,
                  background: `radial-gradient(ellipse 80% 60% at 40% 30%, ${STEPS[active].glow} 0%, transparent 65%), #161618`,
                  border: `1.5px solid ${STEPS[active].iconColor}35`,
                  boxShadow: `0 16px 48px rgba(0,0,0,.45), 0 0 50px ${STEPS[active].glow}`,
                }}
              >
                {(() => {
                  const S = STEPS[active];
                  const StepIcon = S.Icon;
                  return (
                    <>
                      <div className="absolute top-0 left-[18%] right-[18%] h-px pointer-events-none"
                        style={{ background: `linear-gradient(90deg,transparent,${S.iconColor}90,transparent)` }} />
                      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                        style={{ background: S.bg, color: S.iconColor, boxShadow: `0 0 32px ${S.iconColor}55` }}>
                        <StepIcon size={32} strokeWidth={1.6} />
                      </div>
                      <div className="flex items-baseline gap-1.5 px-4 py-2 rounded-full mb-2"
                        style={{ background: S.bg, border: `1px solid ${S.iconColor}30` }}>
                        <span className="font-display font-black text-[1.6rem] leading-none" style={{ color: S.iconColor }}>
                          {S.stat}
                        </span>
                        <span className="text-[0.65rem] font-bold uppercase tracking-widest text-[#F2EFE9]/45">
                          {S.statLabel}
                        </span>
                      </div>
                      <h3 className="font-display font-black text-center text-[1.1rem] leading-snug"
                        style={{ color: S.iconColor }}>
                        {S.title}
                      </h3>
                      <div className="absolute bottom-3 right-3 pointer-events-none opacity-[0.06]"
                        style={{ color: S.iconColor }}>
                        <StepIcon size={80} strokeWidth={0.6} />
                      </div>
                    </>
                  );
                })()}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* sub text */}
        <motion.p
          key={`sub-${active}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-[#F2EFE9]/45 text-[0.9rem] text-center max-w-[260px] z-10"
        >
          {STEPS[active].sub}
        </motion.p>

        {/* mobile dots */}
        <div className="flex gap-2 z-10">
          {STEPS.map((s, i) => (
            <motion.div key={i}
              animate={{ width: i === active ? 22 : 7, background: i === active ? s.iconColor : "rgba(255,255,255,.22)" }}
              transition={{ duration: 0.3 }}
              style={{ height: 7, borderRadius: 99 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Export ──────────────────────────────────────────────────── */
export default function WhyChooseUs() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <section id="why-us" className="bg-[#1C1C1E]">
      {isMobile ? <MobileSection /> : <DesktopSection />}
    </section>
  );
}

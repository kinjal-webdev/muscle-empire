import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence, MotionValue } from "framer-motion";
import { CheckCircle2, Trophy, Clock, Target, Users2, Activity } from "lucide-react";

const STEPS = [
  { Icon: Trophy,       title: "Expert trainers",    iconColor: "#F9A825", glow: "rgba(249,168,37,.22)", bg: "rgba(249,168,37,.09)" },
  { Icon: Target,       title: "Personalised plans", iconColor: "#4ADE80", glow: "rgba(74,222,128,.20)",  bg: "rgba(74,222,128,.09)" },
  { Icon: Activity,     title: "Modern equipment",   iconColor: "#60A5FA", glow: "rgba(96,165,250,.20)",  bg: "rgba(96,165,250,.09)" },
  { Icon: Users2,       title: "Strong community",   iconColor: "#C084FC", glow: "rgba(192,132,252,.20)", bg: "rgba(192,132,252,.09)"},
  { Icon: Clock,        title: "Flexible timings",   iconColor: "#F87171", glow: "rgba(248,113,113,.20)", bg: "rgba(248,113,113,.09)"},
  { Icon: CheckCircle2, title: "Pro assessment",     iconColor: "#34D399", glow: "rgba(52,211,153,.20)",  bg: "rgba(52,211,153,.09)" },
];
const N = STEPS.length;

/* ── Single card face ──────────────────────────────────────── */
function CardFace({ step, size = 300 }: { step: typeof STEPS[0]; size?: number }) {
  const fs = Math.max(13, Math.round(size * 0.073));
  return (
    <div
      style={{
        width: size, height: Math.round(size * 1.1),
        background: `radial-gradient(circle at 38% 32%, ${step.glow} 0%, transparent 62%), #1e1e20`,
        border: `1.5px solid ${step.iconColor}40`,
        borderRadius: 22,
        boxShadow: `0 20px 56px rgba(0,0,0,.45), 0 0 48px ${step.glow}`,
        position: "relative", overflow: "hidden",
        display: "flex", flexDirection: "column", padding: 22,
      }}
    >
      <div style={{ position:"absolute", top:0, left:"18%", right:"18%", height:1, pointerEvents:"none",
        background:`linear-gradient(90deg,transparent,${step.iconColor}90,transparent)` }} />
      <div style={{ position:"absolute", bottom:6, right:6, pointerEvents:"none", color:step.iconColor, opacity:0.07 }}>
        <step.Icon size={Math.round(size * 0.46)} strokeWidth={0.7} />
      </div>
      <div style={{ width:46, height:46, borderRadius:14, flexShrink:0,
        display:"flex", alignItems:"center", justifyContent:"center",
        background:step.bg, color:step.iconColor, marginBottom:14, position:"relative", zIndex:2,
        boxShadow:`0 0 20px ${step.iconColor}44` }}>
        <step.Icon size={Math.round(size * 0.13)} strokeWidth={2} />
      </div>
      <h3 style={{ color: step.iconColor, fontFamily:"var(--app-font-display)", fontWeight:900,
        fontSize: fs, lineHeight:1.2, zIndex:2, position:"relative" }}>
        {step.title}
      </h3>
    </div>
  );
}

/* ── Scroll-driven right panel ─────────────────────────────── */
function ScrollCards({ progress }: { progress: MotionValue<number> }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const unsub = progress.on("change", v => {
      setActive(Math.min(N - 1, Math.max(0, Math.round(v * (N - 1)))));
    });
    return unsub;
  }, [progress]);

  return (
    <div style={{ position:"relative", height:340, width:"100%" }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity:0, y:40, scale:0.95 }}
          animate={{ opacity:1, y:0, scale:1 }}
          exit={{ opacity:0, y:-32, scale:0.97 }}
          transition={{ duration:0.48, ease:[0.16,1,0.3,1] }}
          style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center" }}
        >
          <CardFace step={STEPS[active]} size={280} />
        </motion.div>
      </AnimatePresence>

      {/* pips */}
      <div style={{ position:"absolute", right:-16, top:"50%", transform:"translateY(-50%)",
        display:"flex", flexDirection:"column", gap:6 }}>
        {STEPS.map((_,i) => (
          <div key={i} style={{
            width:4, borderRadius:99, transition:"all .3s",
            height: i===active ? 24 : 7,
            background: i===active ? STEPS[i].iconColor : "rgba(255,255,255,.18)"
          }} />
        ))}
      </div>
    </div>
  );
}

/* ── Main section ──────────────────────────────────────────── */
export default function WhyChooseUs() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    /* tall container — scrolling through it drives the card animation */
    <div id="why-us" ref={containerRef} style={{ height:`${N * 80}vh` }} className="relative bg-[#1C1C1E]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center">

        <div className="absolute inset-0 pointer-events-none"
          style={{ background:"radial-gradient(ellipse 70% 60% at 50% 50%, rgba(232,168,32,.04) 0%, transparent 70%)" }} />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

        <div className="w-full max-w-7xl mx-auto px-5 md:px-10 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 items-center">

          {/* LEFT sticky text */}
          <div className="order-2 md:order-1">
            <div className="eyebrow mb-4">The Empire standard</div>
            <h2 className="font-display font-black text-[#F2EFE9] text-[clamp(2rem,4vw,3rem)] leading-tight mb-4">
              Why train <span className="text-gold-gradient">with us?</span>
            </h2>
            <p className="text-[#F2EFE9]/40 text-[0.97rem] leading-relaxed max-w-sm">
              From our equipment to our culture, every element is engineered for your transformation.
            </p>
          </div>

          {/* RIGHT scroll-driven cards */}
          <div className="order-1 md:order-2">
            <ScrollCards progress={scrollYProgress} />
          </div>

        </div>
      </div>
    </div>
  );
}

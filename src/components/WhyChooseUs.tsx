import { useRef, useState, useEffect } from "react";
import { motion, useAnimationFrame } from "framer-motion";
import {
  CheckCircle2, Trophy, Clock, Target, Users2, Activity,
  ChevronLeft, ChevronRight,
} from "lucide-react";

const reasons = [
  { Icon: Trophy,       title: "Expert trainers",     desc: "Certified professionals with years of competitive coaching and hands-on training experience.",  iconColor: "#F9A825", glow: "rgba(249,168,37,0.18)" },
  { Icon: Target,       title: "Personalised plans",  desc: "No cookie-cutter routines. Every programme is designed around your unique body and goals.",      iconColor: "#4ADE80", glow: "rgba(74,222,128,0.15)" },
  { Icon: Activity,     title: "Modern equipment",    desc: "Top-tier, biomechanically superior machines and an extensive range of free weights.",             iconColor: "#60A5FA", glow: "rgba(96,165,250,0.15)" },
  { Icon: Users2,       title: "Strong community",    desc: "Train alongside driven individuals who share your relentless pursuit of progress.",               iconColor: "#C084FC", glow: "rgba(192,132,252,0.15)" },
  { Icon: Clock,        title: "Flexible timings",    desc: "Open early morning to late night — your schedule is never an excuse to skip a session.",          iconColor: "#F87171", glow: "rgba(248,113,113,0.15)" },
  { Icon: CheckCircle2, title: "Pro assessment",      desc: "Comprehensive body and movement analysis before you start, so every plan begins with clarity.",   iconColor: "#34D399", glow: "rgba(52,211,153,0.15)" },
];

/* ── Detect touch device ──────────────────────────────────────── */
const isTouchDevice = () =>
  typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);

/* ── Animated glow for mobile (no cursor) ────────────────────── */
function AnimatedGlow({ color, glow }: { color: string; glow: string }) {
  const [pos, setPos] = useState({ x: 30, y: 40 });
  const tRef = useRef(0);

  useAnimationFrame((t) => {
    tRef.current = t;
    // Lissajous-style path so the glow visits every corner smoothly
    const x = 50 + 38 * Math.sin((t / 4000));
    const y = 50 + 35 * Math.cos((t / 5500));
    setPos({ x, y });
  });

  return (
    <div
      className="absolute inset-0 rounded-[20px] pointer-events-none"
      style={{
        background: `radial-gradient(circle at ${pos.x}% ${pos.y}%, ${glow} 0%, transparent 60%)`,
        opacity: 0.9,
      }}
    />
  );
}

/* ── 3-D tilt card ─────────────────────────────────────────────── */
function TiltCard({ r, alwaysGlow = false }: { r: typeof reasons[0]; alwaysGlow?: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotX: 0, rotY: 0, glowX: 50, glowY: 50 });
  const [hovered, setHovered] = useState(false);
  const isTouch = isTouchDevice();

  // On mobile, treat card as always "hovered" for colour effects
  const active = isTouch ? true : hovered;

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const { left, top, width, height } = card.getBoundingClientRect();
    const x = (e.clientX - left) / width;   // 0-1
    const y = (e.clientY - top) / height;   // 0-1
    setTilt({
      rotX: (0.5 - y) * 18,   // tilt up/down
      rotY: (x - 0.5) * 18,   // tilt left/right
      glowX: x * 100,
      glowY: y * 100,
    });
  };

  const onMouseLeave = () => {
    setTilt({ rotX: 0, rotY: 0, glowX: 50, glowY: 50 });
    setHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onMouseLeave}
      animate={{
        rotateX: tilt.rotX,
        rotateY: tilt.rotY,
        scale: active && !isTouch ? 1.04 : 1,
        z: active && !isTouch ? 20 : 0,
      }}
      transition={{ type: "spring", stiffness: 300, damping: 28, mass: 0.6 }}
      style={{ transformStyle: "preserve-3d", willChange: "transform" }}
      className="relative rounded-[20px] p-7 flex flex-col overflow-hidden cursor-default h-full
                 bg-[#252528] border border-white/[0.09]"
    >
      {/* Cursor-following glow (desktop) or animated glow (mobile) */}
      {isTouch ? (
        <AnimatedGlow color={r.iconColor} glow={r.glow} />
      ) : (
        <div
          className="absolute inset-0 rounded-[20px] pointer-events-none transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at ${tilt.glowX}% ${tilt.glowY}%, ${r.glow} 0%, transparent 65%)`,
            opacity: hovered ? 1 : 0,
          }}
        />
      )}

      {/* Top border glow */}
      <div
        className="absolute top-0 left-[15%] right-[15%] h-px pointer-events-none rounded-full transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${r.iconColor}, transparent)`, opacity: active ? 0.7 : 0 }}
      />

      {/* Badge icon */}
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 shrink-0 relative z-10"
        style={{ background: r.iconColor + "18", color: r.iconColor,
          boxShadow: active ? `0 0 20px ${r.iconColor}40` : "none",
          transition: "box-shadow 0.3s" }}
      >
        <r.Icon size={24} strokeWidth={2} />
      </div>

      {/* Watermark */}
      <div className="absolute bottom-4 right-4 pointer-events-none transition-opacity duration-300"
        style={{ color: r.iconColor, opacity: active ? 0.1 : 0.06 }}>
        <r.Icon size={120} strokeWidth={0.8} />
      </div>

      {/* Title */}
      <h3
        className="font-display font-black text-[1.2rem] leading-snug z-10 relative transition-colors duration-300"
        style={{ color: active ? r.iconColor : "#F2EFE9" }}
      >
        {r.title}
      </h3>
    </motion.div>
  );
}

export default function WhyChooseUs() {
  const [mobileIdx, setMobileIdx] = useState(0);
  const touchStartX = useRef(0);

  const prev = () => setMobileIdx(i => Math.max(0, i - 1));
  const next = () => setMobileIdx(i => Math.min(reasons.length - 1, i + 1));

  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 40)  next();
    if (diff < -40) prev();
  };

  return (
    <section
      id="why-us"
      className="py-24 bg-[#1C1C1E] relative overflow-hidden"
      style={{ perspective: "1200px" }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px]
                      rounded-full bg-[#E8A820]/[0.04] blur-[120px] pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-xl mx-auto px-5 mb-14"
      >
        <div className="eyebrow justify-center mb-4">The Empire standard</div>
        <h2 className="font-display font-black text-[#F2EFE9] text-[clamp(2rem,4.5vw,2.9rem)]">
          Why train <span className="text-gold-gradient">with us?</span>
        </h2>
        <p className="text-[#F2EFE9]/45 text-[1rem] leading-relaxed mt-3">
          From our equipment to our culture, every element is engineered for your success.
        </p>
      </motion.div>

      {/* ── Desktop 3×2 grid ──────────────────────── */}
      <div className="hidden md:grid grid-cols-3 gap-5 max-w-5xl mx-auto px-6">
        {reasons.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="h-full"
            style={{ transformStyle: "preserve-3d" }}
          >
            <TiltCard r={r} />
          </motion.div>
        ))}
      </div>

      {/* ── Mobile swipe carousel ─────────────────── */}
      <div className="md:hidden px-5">
        <div
          className="relative overflow-hidden"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <motion.div
            className="flex"
            animate={{ x: `-${mobileIdx * 100}%` }}
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
          >
            {reasons.map((r, i) => (
              <div key={i} className="w-full shrink-0 min-h-[280px]">
                <TiltCard r={r} />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Dots + arrows */}
        <div className="flex items-center justify-between mt-5 px-1">
          <div className="flex gap-2">
            {reasons.map((_, i) => (
              <button key={i} onClick={() => setMobileIdx(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === mobileIdx ? "w-6 h-2 bg-[#E8A820]" : "w-2 h-2 bg-white/20 hover:bg-[#E8A820]/50"
                }`}
                aria-label={`Card ${i + 1}`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button onClick={prev} disabled={mobileIdx === 0}
              className="w-9 h-9 rounded-xl border border-white/[0.10] flex items-center justify-center text-[#F2EFE9]/60 disabled:opacity-25 hover:bg-white/[0.07] transition-colors">
              <ChevronLeft size={18} />
            </button>
            <button onClick={next} disabled={mobileIdx === reasons.length - 1}
              className="w-9 h-9 rounded-xl border border-white/[0.10] flex items-center justify-center text-[#F2EFE9]/60 disabled:opacity-25 hover:bg-white/[0.07] transition-colors">
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

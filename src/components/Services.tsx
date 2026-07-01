import { useRef, useState, useEffect } from "react";
import { motion, useAnimationFrame } from "framer-motion";
import { Dumbbell, HeartPulse, Flame, Bike, User, Apple } from "lucide-react";
import MagicRings from "@/components/MagicRings";

/* ── Data ─────────────────────────────────────────────────────── */
const SERVICES = [
  { title: "Personal Training",  Icon: User,       bg: "#FFF3E0", color: "#E65100", glow: "rgba(230,81,0,.20)",   border: "#FFCC80" },
  { title: "Strength Training",  Icon: Dumbbell,   bg: "#E8F5E9", color: "#2E7D32", glow: "rgba(46,125,50,.18)",  border: "#A5D6A7" },
  { title: "Weight Loss",        Icon: HeartPulse, bg: "#FCE4EC", color: "#C62828", glow: "rgba(198,40,40,.18)",  border: "#F48FB1" },
  { title: "CrossFit",           Icon: Flame,      bg: "#FFF8E1", color: "#F57F17", glow: "rgba(245,127,23,.20)", border: "#FFE082" },
  { title: "Cycling Sessions",   Icon: Bike,       bg: "#E3F2FD", color: "#1565C0", glow: "rgba(21,101,192,.18)", border: "#90CAF9" },
  { title: "Nutrition Coaching", Icon: Apple,      bg: "#F3E5F5", color: "#6A1B9A", glow: "rgba(106,27,154,.18)", border: "#CE93D8" },
];

const GAP = 16; /* px between cards */

/* ── Touch device helper ──────────────────────────────────────── */
const isTouch = () =>
  typeof window !== "undefined" &&
  ("ontouchstart" in window || navigator.maxTouchPoints > 0);

/* ── Animated glow for touch devices ─────────────────────────── */
function MobileGlow({ glow }: { glow: string }) {
  const [p, setP] = useState({ x: 30, y: 40 });
  useAnimationFrame((t) => {
    setP({ x: 50 + 38 * Math.sin(t / 4000), y: 50 + 35 * Math.cos(t / 5500) });
  });
  return (
    <div
      className="absolute inset-0 rounded-[18px] pointer-events-none"
      style={{ background: `radial-gradient(circle at ${p.x}% ${p.y}%, ${glow} 0%, transparent 60%)` }}
    />
  );
}

/* ── Single card ──────────────────────────────────────────────── */
interface CardProps { s: typeof SERVICES[0]; width: number }

function Card({ s, width }: CardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50 });
  const [hover, setHover] = useState(false);
  const touch = isTouch();
  const active = touch || hover;

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top)  / r.height;
    setTilt({ rx: (0.5 - y) * 16, ry: (x - 0.5) * 16, gx: x * 100, gy: y * 100 });
  };
  const onLeave = () => { setTilt({ rx:0, ry:0, gx:50, gy:50 }); setHover(false); };

  /* card height scales with width for consistent aspect ratio */
  const cardHeight = Math.round(width * 1.15);

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={onLeave}
      animate={{ rotateX: tilt.rx, rotateY: tilt.ry, scale: !touch && hover ? 1.04 : 1 }}
      transition={{ type: "spring", stiffness: 280, damping: 26, mass: 0.6 }}
      className="relative rounded-[18px] flex flex-col p-4 overflow-hidden shrink-0 cursor-default"
      style={{
        width,
        height: cardHeight,
        background: "#252528",
        border: `1.5px solid ${active ? s.color + "80" : "rgba(255,255,255,0.09)"}`,
        transformStyle: "preserve-3d",
        willChange: "transform",
        transition: "border-color .3s",
      }}
    >
      {/* glow */}
      {touch ? (
        <MobileGlow glow={s.glow} />
      ) : (
        <div
          className="absolute inset-0 rounded-[18px] pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, ${s.glow} 0%, transparent 65%)`,
            opacity: hover ? 1 : 0,
            transition: "opacity .3s",
          }}
        />
      )}

      {/* top shimmer */}
      <div
        className="absolute top-0 left-[15%] right-[15%] h-px rounded-full pointer-events-none"
        style={{
          background: `linear-gradient(90deg, transparent, ${s.color}, transparent)`,
          opacity: active ? 0.65 : 0,
          transition: "opacity .3s",
        }}
      />

      {/* watermark — sized relative to card */}
      <div
        className="absolute bottom-2 right-2 pointer-events-none"
        style={{ color: s.color, opacity: active ? 0.12 : 0.06, transition: "opacity .3s" }}
      >
        <s.Icon size={Math.round(width * 0.48)} strokeWidth={0.8} />
      </div>

      {/* badge */}
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center mb-3 shrink-0 z-10"
        style={{
          background: s.color + "18",
          color: s.color,
          boxShadow: active ? `0 0 14px ${s.color}44` : "none",
          transition: "box-shadow .3s",
        }}
      >
        <s.Icon size={18} strokeWidth={2} />
      </div>

      {/* title — clamp to 2 lines so it always fits */}
      <h3
        className="font-display font-black leading-snug z-10 line-clamp-2"
        style={{
          color: active ? s.color : "#F2EFE9",
          transition: "color .3s",
          fontSize: `clamp(0.85rem, ${width * 0.048}px, 1.05rem)`,
        }}
      >
        {s.title}
      </h3>
    </motion.div>
  );
}

/* ── Marquee strip ────────────────────────────────────────────── */
function Marquee({ items }: { items: typeof SERVICES }) {
  const wrapRef  = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const pos      = useRef(0);
  const raf      = useRef(0);
  const lastT    = useRef<number | null>(null); /* null = skip first dt */
  const dragging = useRef(false);
  const dragX0   = useRef(0);
  const pos0     = useRef(0);
  const [cardW, setCardW] = useState(160);

  /* On mobile show ~2 cards (smaller); on desktop cap at 220px */
  useEffect(() => {
    const measure = () => {
      if (!wrapRef.current) return;
      const vw = wrapRef.current.clientWidth;
      const isMobile = vw < 640;
      const cols = isMobile ? 2 : 3;
      const raw = Math.floor((vw - GAP * (cols - 1)) / cols);
      setCardW(Math.min(raw, isMobile ? 180 : 220));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const setW = items.length * (cardW + GAP);

  useEffect(() => {
    if (!setW) return;
    const SPEED = 50;

    const tick = (now: number) => {
      if (!dragging.current) {
        if (lastT.current !== null) {
          const dt = (now - lastT.current) / 1000;
          /* clamp dt to max 100ms to prevent a big jump after drag */
          pos.current -= SPEED * Math.min(dt, 0.1);
          if (pos.current <= -setW) pos.current += setW;
          if (pos.current >  0)     pos.current -= setW;
        }
        lastT.current = now;
      } else {
        /* keep time advancing during drag so resume is smooth */
        lastT.current = now;
      }
      if (trackRef.current)
        trackRef.current.style.transform = `translateX(${pos.current}px)`;
      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [setW]);

  const onDown = (e: React.PointerEvent) => {
    dragging.current = true;
    dragX0.current   = e.clientX;
    pos0.current     = pos.current;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    let next = pos0.current + (e.clientX - dragX0.current);
    if (next <= -setW) next += setW;
    if (next >  0)     next -= setW;
    pos.current = next;
    if (trackRef.current)
      trackRef.current.style.transform = `translateX(${pos.current}px)`;
  };
  const onUp = () => {
    dragging.current = false;
    /* lastT stays at the last rAF time — no jump */
  };

  const looped = [...items, ...items, ...items];

  return (
    <div
      ref={wrapRef}
      className="relative overflow-hidden select-none"
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      style={{ touchAction: "none", cursor: "grab" }}
    >
      <div className="absolute inset-y-0 left-0 w-8 z-10 pointer-events-none bg-gradient-to-r from-[#1C1C1E] to-transparent" />
      <div className="absolute inset-y-0 right-0 w-8 z-10 pointer-events-none bg-gradient-to-l from-[#1C1C1E] to-transparent" />

      <div
        ref={trackRef}
        className="flex will-change-transform py-5"
        style={{ gap: GAP, paddingLeft: GAP, width: "max-content" }}
      >
        {looped.map((s, i) => <Card key={i} s={s} width={cardW} />)}
      </div>
    </div>
  );
}

/* ── Section ──────────────────────────────────────────────────── */
export default function Services() {
  return (
    <section id="services" className="py-20 bg-[#1C1C1E] overflow-hidden relative">
      {/* MagicRings WebGL background */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ opacity: 0.35 }}>
        <MagicRings
          color="#E8A820"
          colorTwo="#ffffff"
          ringCount={7}
          speed={0.6}
          attenuation={9}
          lineThickness={1.8}
          baseRadius={0.28}
          radiusStep={0.11}
          scaleRate={0.1}
          opacity={1}
          blur={0}
          noiseAmount={0.04}
          rotation={0}
          ringGap={1.6}
          fadeIn={0.7}
          fadeOut={0.5}
          followMouse={false}
          hoverScale={1}
          parallax={0}
          clickBurst={false}
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-xl mx-auto px-5 mb-12 relative z-10"
      >
        <div className="eyebrow justify-center mb-4">What we offer</div>
        <h2 className="font-display font-black text-[#F2EFE9] text-[clamp(2rem,4.5vw,2.9rem)]">
          Arsenal of <span className="text-gold-gradient">disciplines</span>
        </h2>
      </motion.div>

      <div className="relative z-10">
        <Marquee items={SERVICES} />
      </div>
    </section>
  );
}

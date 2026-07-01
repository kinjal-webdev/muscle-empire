import { useRef, useState, useEffect } from "react";
import { motion, useAnimationFrame } from "framer-motion";
import { Dumbbell, HeartPulse, Flame, Bike, User, Apple } from "lucide-react";

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

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={onLeave}
      animate={{ rotateX: tilt.rx, rotateY: tilt.ry, scale: !touch && hover ? 1.04 : 1 }}
      transition={{ type: "spring", stiffness: 280, damping: 26, mass: 0.6 }}
      className="relative rounded-[18px] flex flex-col p-5 border-2 overflow-hidden shrink-0 cursor-default"
      style={{
        width,
        height: 220,
        background: s.bg,
        borderColor: active ? s.color : s.border,
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

      {/* watermark */}
      <div
        className="absolute bottom-3 right-3 pointer-events-none"
        style={{ color: s.color, opacity: active ? 0.12 : 0.07, transition: "opacity .3s" }}
      >
        <s.Icon size={100} strokeWidth={0.8} />
      </div>

      {/* badge */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 shrink-0 z-10"
        style={{
          background: s.color + "1A",
          color: s.color,
          boxShadow: active ? `0 0 16px ${s.color}44` : "none",
          transition: "box-shadow .3s",
        }}
      >
        <s.Icon size={20} strokeWidth={2} />
      </div>

      {/* title */}
      <h3
        className="font-display font-black text-[1.1rem] leading-snug z-10"
        style={{ color: active ? s.color : "#1C1C1E", transition: "color .3s" }}
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
  const lastT    = useRef(0);
  const dragging = useRef(false);
  const dragX0   = useRef(0);
  const pos0     = useRef(0);
  const [cardW, setCardW] = useState(300);

  /* measure: 3 cards fill the strip */
  useEffect(() => {
    const measure = () => {
      if (wrapRef.current)
        setCardW(Math.floor((wrapRef.current.clientWidth - GAP * 2) / 3));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const setW = items.length * (cardW + GAP);

  useEffect(() => {
    if (!setW) return;
    const SPEED = 55; /* px/s */
    const tick = (now: number) => {
      if (!dragging.current) {
        const dt = lastT.current ? (now - lastT.current) / 1000 : 0;
        pos.current -= SPEED * dt;
        if (pos.current <= -setW) pos.current += setW;
        if (pos.current >  0)     pos.current -= setW;
      }
      lastT.current = now;
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
    lastT.current    = 0;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    let next = pos0.current + (e.clientX - dragX0.current);
    if (next <= -setW) next += setW;
    if (next >  0)     next -= setW;
    pos.current = next;
  };
  const onUp = () => { dragging.current = false; lastT.current = 0; };

  const looped = [...items, ...items, ...items];

  return (
    <div
      ref={wrapRef}
      className="relative overflow-hidden cursor-grab active:cursor-grabbing select-none"
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      style={{ touchAction: "none" }}
    >
      <div className="absolute inset-y-0 left-0 w-10 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
      <div className="absolute inset-y-0 right-0 w-10 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />

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
    <section id="services" className="py-20 bg-white overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-xl mx-auto px-5 mb-12"
      >
        <div className="eyebrow justify-center mb-4">What we offer</div>
        <h2 className="font-display font-black text-[#1C1C1E] text-[clamp(2rem,4.5vw,2.9rem)]">
          Arsenal of <span className="text-gold-gradient">disciplines</span>
        </h2>
      </motion.div>

      <Marquee items={SERVICES} />
    </section>
  );
}

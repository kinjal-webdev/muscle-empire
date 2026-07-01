import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useSpring, useTransform } from "framer-motion";
import { Dumbbell, HeartPulse, Flame, Bike, User, Apple } from "lucide-react";
import MagicRings from "@/components/MagicRings";

/* ── Data ─────────────────────────────────────────────────────── */
const SERVICES = [
  { title: "Personal Training",  Icon: User,       color: "#E65100", glow: "rgba(230,81,0,.30)",   bg: "rgba(230,81,0,0.10)"   },
  { title: "Strength Training",  Icon: Dumbbell,   color: "#2E7D32", glow: "rgba(46,125,50,.28)",  bg: "rgba(46,125,50,0.10)"  },
  { title: "Weight Loss",        Icon: HeartPulse, color: "#C62828", glow: "rgba(198,40,40,.28)",  bg: "rgba(198,40,40,0.10)"  },
  { title: "CrossFit",           Icon: Flame,      color: "#F57F17", glow: "rgba(245,127,23,.30)", bg: "rgba(245,127,23,0.10)" },
  { title: "Cycling Sessions",   Icon: Bike,       color: "#1565C0", glow: "rgba(21,101,192,.28)", bg: "rgba(21,101,192,0.10)" },
  { title: "Nutrition Coaching", Icon: Apple,      color: "#6A1B9A", glow: "rgba(106,27,154,.28)", bg: "rgba(106,27,154,0.10)" },
];

const N = SERVICES.length;

/* ── 3-D cylinder math ────────────────────────────────────────── */
function cylinderTransform(
  index: number,
  activeIndex: number,
  total: number,
  radius: number
) {
  /* angular step between cards — use full circle divided by total */
  const step = (2 * Math.PI) / total;
  /* offset from active card — shortest path around the circle */
  let offset = index - activeIndex;
  if (offset > total / 2)  offset -= total;
  if (offset < -total / 2) offset += total;

  const angle = offset * step;
  const x = radius * Math.sin(angle);
  const z = radius * (Math.cos(angle) - 1); /* -1 keeps centre card at z=0 */
  const rotateY = -angle * (180 / Math.PI);
  /* depth 0..1 → centre=1, edges=0 */
  const depth = (Math.cos(angle) + 1) / 2;
  const scale  = 0.65 + depth * 0.35;
  const opacity = 0.35 + depth * 0.65;
  const zIndex = Math.round(depth * 100);

  return { x, z, rotateY, scale, opacity, zIndex, depth };
}

/* ── Single card ──────────────────────────────────────────────── */
function Card3D({
  s, index, activeIndex, radius, cardW, cardH,
}: {
  s: typeof SERVICES[0];
  index: number;
  activeIndex: number;
  radius: number;
  cardW: number;
  cardH: number;
}) {
  const { x, z, rotateY, scale, opacity, zIndex, depth } = cylinderTransform(
    index, activeIndex, N, radius
  );
  const isCenter = Math.abs(index - activeIndex) === 0 ||
    Math.abs(index - activeIndex) === N;

  const floatDelay = index * 0.4;
  const ySpring = useSpring(0, { stiffness: 60, damping: 14 });

  useEffect(() => {
    let frame: number;
    let t = floatDelay;
    const animate = () => {
      t += 0.016;
      ySpring.set(Math.sin(t * 0.8) * 3);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [ySpring, floatDelay]);

  const shadowBlur    = Math.round(depth * 40);
  const shadowOpacity = depth * 0.5;
  const fontSize      = `clamp(0.9rem, ${cardW * 0.065}px, 1.25rem)`;

  return (
    <motion.div
      animate={{
        x,
        z,
        rotateY,
        scale,
        opacity,
      }}
      style={{ y: ySpring, zIndex }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 20,
        mass: 0.8,
      }}
      className="absolute"
      /* keep-3d so z-translation is respected */
      /* eslint-disable-next-line react/forbid-dom-props */
    >
      <div
        className="relative rounded-[20px] flex flex-col p-5 overflow-hidden"
        style={{
          width: cardW,
          height: cardH,
          background: "#1e1e20",
          border: `1.5px solid ${isCenter ? s.color + "70" : "rgba(255,255,255,0.08)"}`,
          boxShadow: isCenter
            ? `0 ${shadowBlur}px ${shadowBlur * 2}px rgba(0,0,0,${shadowOpacity}), 0 0 40px ${s.glow}`
            : `0 8px 24px rgba(0,0,0,0.3)`,
          transformStyle: "preserve-3d",
          transition: "border-color 0.4s, box-shadow 0.4s",
        }}
      >
        {/* radial glow bg */}
        <div
          className="absolute inset-0 rounded-[20px] pointer-events-none"
          style={{
            background: `radial-gradient(circle at 40% 40%, ${s.glow} 0%, transparent 65%)`,
            opacity: isCenter ? 0.9 : 0.4,
            transition: "opacity 0.4s",
          }}
        />

        {/* top edge shimmer */}
        <div
          className="absolute top-0 left-[20%] right-[20%] h-px pointer-events-none"
          style={{
            background: `linear-gradient(90deg, transparent, ${s.color}, transparent)`,
            opacity: isCenter ? 0.7 : 0.2,
            transition: "opacity 0.4s",
          }}
        />

        {/* watermark icon */}
        <div
          className="absolute bottom-3 right-3 pointer-events-none"
          style={{ color: s.color, opacity: isCenter ? 0.14 : 0.06, transition: "opacity 0.4s" }}
        >
          <s.Icon size={Math.round(cardW * 0.5)} strokeWidth={0.7} />
        </div>

        {/* badge */}
        <div
          className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 shrink-0 relative z-10"
          style={{
            background: s.bg,
            color: s.color,
            boxShadow: isCenter ? `0 0 20px ${s.color}50` : "none",
            transition: "box-shadow 0.4s",
          }}
        >
          <s.Icon size={24} strokeWidth={2} />
        </div>

        {/* title */}
        <h3
          className="font-display font-black leading-snug z-10 relative line-clamp-2"
          style={{
            color: isCenter ? s.color : "#F2EFE9cc",
            transition: "color 0.4s",
            fontSize,
          }}
        >
          {s.title}
        </h3>
      </div>
    </motion.div>
  );
}

/* ── Cylinder carousel ────────────────────────────────────────── */
function CylinderCarousel({ items }: { items: typeof SERVICES }) {
  const [active, setActive] = useState(0);
  const timerRef   = useRef<ReturnType<typeof setInterval> | null>(null);
  const dragStart  = useRef(0);
  const isDragging = useRef(false);

  /* responsive radius + card size */
  const [cfg, setCfg] = useState({ radius: 420, cardW: 220, cardH: 260 });
  useEffect(() => {
    const calc = () => {
      const vw = window.innerWidth;
      if (vw < 480) setCfg({ radius: 160, cardW: 150, cardH: 180 });
      else if (vw < 640) setCfg({ radius: 200, cardW: 170, cardH: 210 });
      else if (vw < 1024) setCfg({ radius: 300, cardW: 190, cardH: 240 });
      else setCfg({ radius: 420, cardW: 220, cardH: 260 });
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);

  const advance = useCallback((dir = 1) => {
    setActive(a => (a + dir + N) % N);
  }, []);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => advance(1), 2800);
  }, [advance]);

  useEffect(() => { startTimer(); return () => { if (timerRef.current) clearInterval(timerRef.current); }; }, [startTimer]);

  /* drag / swipe */
  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    dragStart.current  = e.clientX;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    if (timerRef.current) clearInterval(timerRef.current);
  };
  const onPointerUp = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    isDragging.current = false;
    const diff = dragStart.current - e.clientX;
    if (Math.abs(diff) > 40) advance(diff > 0 ? 1 : -1);
    startTimer();
  };

  /* keyboard */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")  { advance(-1); startTimer(); }
      if (e.key === "ArrowRight") { advance(1);  startTimer(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [advance, startTimer]);

  /* perspective viewport height */
  const vpH = cfg.cardH + 80;

  return (
    <div className="w-full flex flex-col items-center select-none">
      {/* 3D stage */}
      <div
        className="relative w-full overflow-visible"
        style={{ height: vpH, perspective: "2000px", perspectiveOrigin: "50% 50%", cursor: "grab" }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ transformStyle: "preserve-3d" }}
        >
          {items.map((s, i) => (
            <Card3D
              key={i}
              s={s}
              index={i}
              activeIndex={active}
              radius={cfg.radius}
              cardW={cfg.cardW}
              cardH={cfg.cardH}
            />
          ))}
        </div>
      </div>

      {/* Dot indicators */}
      <div className="flex gap-2 mt-8">
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => { setActive(i); startTimer(); }}
            className={`rounded-full transition-all duration-350 ${
              i === active ? "w-6 h-2 bg-[#E8A820]" : "w-2 h-2 bg-white/20 hover:bg-white/40"
            }`}
            aria-label={`Select ${items[i].title}`}
          />
        ))}
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
        className="text-center max-w-xl mx-auto px-5 mb-10 relative z-10"
      >
        <div className="eyebrow justify-center mb-4">What we offer</div>
        <h2 className="font-display font-black text-[#F2EFE9] text-[clamp(2rem,4.5vw,2.9rem)]">
          Arsenal of <span className="text-gold-gradient">disciplines</span>
        </h2>
      </motion.div>

      <div className="relative z-10 px-4">
        <CylinderCarousel items={SERVICES} />
      </div>
    </section>
  );
}

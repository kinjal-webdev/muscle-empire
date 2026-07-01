import { useRef, useState, useEffect } from "react";
import { motion, useAnimationFrame } from "framer-motion";
import { Dumbbell, HeartPulse, Flame, Bike, User, Apple } from "lucide-react";

const services = [
  { title: "Personal Training",  Icon: User,       bg: "#FFF3E0", iconColor: "#E65100", glow: "rgba(230,81,0,0.18)",   border: "#FFCC80" },
  { title: "Strength Training",  Icon: Dumbbell,   bg: "#E8F5E9", iconColor: "#2E7D32", glow: "rgba(46,125,50,0.16)",  border: "#A5D6A7" },
  { title: "Weight Loss",        Icon: HeartPulse, bg: "#FCE4EC", iconColor: "#C62828", glow: "rgba(198,40,40,0.16)",  border: "#F48FB1" },
  { title: "CrossFit",           Icon: Flame,      bg: "#FFF8E1", iconColor: "#F57F17", glow: "rgba(245,127,23,0.18)", border: "#FFE082" },
  { title: "Cycling Sessions",   Icon: Bike,       bg: "#E3F2FD", iconColor: "#1565C0", glow: "rgba(21,101,192,0.16)", border: "#90CAF9" },
  { title: "Nutrition Coaching", Icon: Apple,      bg: "#F3E5F5", iconColor: "#6A1B9A", glow: "rgba(106,27,154,0.16)", border: "#CE93D8" },
];

const GAP    = 16;

/* ── Detect touch ─────────────────────────────────────────────── */
const isTouchDevice = () =>
  typeof window !== "undefined" && ("ontouchstart" in window || navigator.maxTouchPoints > 0);

/* ── Animated mobile glow ─────────────────────────────────────── */
function AnimatedGlow({ glow }: { glow: string }) {
  const [pos, setPos] = useState({ x: 30, y: 40 });
  useAnimationFrame((t) => {
    setPos({
      x: 50 + 38 * Math.sin(t / 4000),
      y: 50 + 35 * Math.cos(t / 5500),
    });
  });
  return (
    <div
      className="absolute inset-0 rounded-[18px] pointer-events-none"
      style={{ background: `radial-gradient(circle at ${pos.x}% ${pos.y}%, ${glow} 0%, transparent 60%)`, opacity: 0.9 }}
    />
  );
}

/* ── Tilt card ────────────────────────────────────────────────── */
function TiltCard({ s, cardWidth }: { s: typeof services[0]; cardWidth: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotX: 0, rotY: 0, gx: 50, gy: 50 });
  const [hovered, setHovered] = useState(false);
  const isTouch = isTouchDevice();
  const active = isTouch ? true : hovered;

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top)  / r.height;
    setTilt({ rotX: (0.5 - y) * 16, rotY: (x - 0.5) * 16, gx: x * 100, gy: y * 100 });
  };
  const onMouseLeave = () => { setTilt({ rotX:0, rotY:0, gx:50, gy:50 }); setHovered(false); };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onMouseLeave}
      animate={{ rotateX: tilt.rotX, rotateY: tilt.rotY, scale: active && !isTouch ? 1.05 : 1, z: active && !isTouch ? 16 : 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 28, mass: 0.6 }}
      style={{ transformStyle: "preserve-3d", willChange: "transform", width: cardWidth, height: 230 }}
      className="relative rounded-[18px] p-5 flex flex-col border-2 overflow-hidden cursor-default shrink-0"
      /* keep pastel bg always */
      /* eslint-disable-next-line react/forbid-dom-props */
      data-bg={s.bg}
    >
      {/* pastel background */}
      <div className="absolute inset-0 rounded-[18px]" style={{ background: s.bg }} />
      <div className="absolute inset-0 rounded-[18px] border-2 pointer-events-none" style={{ borderColor: active ? s.iconColor : s.border, transition: "border-color 0.3s" }} />

      {/* glow */}
      {isTouch ? (
        <AnimatedGlow glow={s.glow} />
      ) : (
        <div className="absolute inset-0 rounded-[18px] pointer-events-none transition-opacity duration-300"
          style={{ background: `radial-gradient(circle at ${tilt.gx}% ${tilt.gy}%, ${s.glow} 0%, transparent 65%)`, opacity: hovered ? 1 : 0 }} />
      )}

      {/* top border shimmer */}
      <div className="absolute top-0 left-[15%] right-[15%] h-px pointer-events-none rounded-full transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, transparent, ${s.iconColor}, transparent)`, opacity: active ? 0.65 : 0 }} />

      {/* Watermark */}
      <div className="absolute bottom-2 right-2 pointer-events-none transition-opacity duration-300"
        style={{ color: s.iconColor, opacity: active ? 0.12 : 0.07 }}>
        <s.Icon size={90} strokeWidth={0.8} />
      </div>

      {/* Badge */}
      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 shrink-0 z-10 relative"
        style={{ background: s.iconColor + "1A", color: s.iconColor, boxShadow: active ? `0 0 16px ${s.iconColor}40` : "none", transition: "box-shadow 0.3s" }}>
        <s.Icon size={20} strokeWidth={2} />
      </div>

      {/* Title */}
      <h3 className="font-display font-black text-[1.1rem] leading-snug z-10 relative transition-colors duration-300"
        style={{ color: active ? s.iconColor : "#1C1C1E" }}>
        {s.title}
      </h3>
    </motion.div>
  );
}

/* ── Marquee strip — exactly 3 cards visible, continuous scroll ── */
function MarqueeStrip({ items }: { items: typeof services }) {
  const wrapRef    = useRef<HTMLDivElement>(null);
  const trackRef   = useRef<HTMLDivElement>(null);
  const posRef     = useRef(0);
  const rafRef     = useRef<number>(0);
  const isPaused   = useRef(false);
  const isDragging = useRef(false);
  const dragStartX = useRef(0);
  const dragStartPos = useRef(0);
  const [cardW, setCardW] = useState(0);
  const GAP_PX = 16;

  /* measure container → card = (containerW - 2*gap) / 3 */
  useEffect(() => {
    const measure = () => {
      if (wrapRef.current) {
        const w = wrapRef.current.clientWidth;
        setCardW(Math.floor((w - GAP_PX * 2) / 3));
      }
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const setW = cardW > 0 ? items.length * (cardW + GAP_PX) : 0;
  let lastTime = 0;

  useEffect(() => {
    if (!setW) return;
    posRef.current = 0;

    const PX_PER_SEC = 60;
    const tick = (now: number) => {
      if (!isPaused.current && !isDragging.current) {
        const dt = lastTime ? (now - lastTime) / 1000 : 0;
        lastTime = now;
        posRef.current -= PX_PER_SEC * dt;
        if (posRef.current <= -setW) posRef.current += setW;
        if (posRef.current > 0)      posRef.current -= setW;
      } else {
        lastTime = now;
      }
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${posRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [setW]);

  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current  = true;
    dragStartX.current  = e.clientX;
    dragStartPos.current = posRef.current;
    isPaused.current    = true;
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    let next = dragStartPos.current + (e.clientX - dragStartX.current);
    if (next <= -setW) next += setW;
    if (next > 0)      next -= setW;
    posRef.current = next;
  };
  const onPointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    isPaused.current   = false;
    lastTime = 0;
  };

  const looped = [...items, ...items, ...items];

  return (
    <div
      ref={wrapRef}
      className="relative overflow-hidden cursor-grab active:cursor-grabbing select-none px-0"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      style={{ touchAction: "none" }}
    >
      {/* Edge fades */}
      <div className="absolute inset-y-0 left-0 w-12 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
      <div className="absolute inset-y-0 right-0 w-12 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />

      {cardW > 0 && (
        <div
          ref={trackRef}
          className="flex py-5 will-change-transform"
          style={{ gap: GAP_PX, width: "max-content" }}
        >
          {looped.map((s, i) => (
            <TiltCard key={i} s={s} cardWidth={cardW} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" className="py-20 bg-white overflow-hidden">
      <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true, margin:"-60px" }}
        transition={{ duration:0.65, ease:[0.16,1,0.3,1] }} className="text-center max-w-xl mx-auto px-5 mb-12">
        <div className="eyebrow justify-center mb-4">What we offer</div>
        <h2 className="font-display font-black text-[#1C1C1E] text-[clamp(2rem,4.5vw,2.9rem)]">
          Arsenal of <span className="text-gold-gradient">disciplines</span>
        </h2>
      </motion.div>
      <MarqueeStrip items={services} />
    </section>
  );
}

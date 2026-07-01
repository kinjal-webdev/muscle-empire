import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useSpring } from "framer-motion";
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

/* ── Normalise angle to (-PI, PI] ─────────────────────────────── */
function normAngle(a: number) {
  while (a >  Math.PI) a -= 2 * Math.PI;
  while (a < -Math.PI) a += 2 * Math.PI;
  return a;
}

/* ── Cylinder math (fractional offset) ───────────────────────── */
function cardTransform(index: number, active: number, total: number, radius: number) {
  const step   = (2 * Math.PI) / total;
  let offset   = index - active;
  /* shortest-path wrap */
  while (offset >  total / 2) offset -= total;
  while (offset < -total / 2) offset += total;

  const angle   = offset * step;
  const x       = radius * Math.sin(angle);
  const z       = radius * (Math.cos(angle) - 1);   /* centre stays at z=0 */
  const rotateY = -(angle * 180) / Math.PI;
  const depth   = (Math.cos(angle) + 1) / 2;        /* 0=back 1=front */
  /* keep side cards visible — min opacity 0.55 */
  const scale   = 0.68 + depth * 0.32;
  const opacity = 0.55 + depth * 0.45;
  const zIndex  = Math.round(depth * 100);

  return { x, z, rotateY, scale, opacity, zIndex, depth };
}

/* ── Card ─────────────────────────────────────────────────────── */
interface CardProps {
  s: typeof SERVICES[0]; index: number; active: number;
  radius: number; cardW: number; cardH: number;
}
function Card({ s, index, active, radius, cardW, cardH }: CardProps) {
  const { x, z, rotateY, scale, opacity, zIndex, depth } = cardTransform(index, active, N, radius);
  const isFront = depth > 0.85;
  const fontSize = Math.max(14, Math.round(cardW * 0.075));

  /* subtle float */
  const ySpring = useSpring(0, { stiffness: 50, damping: 12 });
  const t0 = useRef(index * 0.45);
  useEffect(() => {
    let raf: number;
    const tick = () => {
      t0.current += 0.014;
      ySpring.set(Math.sin(t0.current) * 3);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ySpring]);

  return (
    <motion.div
      style={{
        position: "absolute",
        zIndex,
        x, rotateY, scale, opacity,
        translateZ: z,
        y: ySpring,
      }}
    >
      <div
        style={{
          width: cardW, height: cardH,
          background: "#1e1e20",
          border: `1.5px solid ${isFront ? s.color + "75" : "rgba(255,255,255,0.07)"}`,
          borderRadius: 20,
          boxShadow: isFront
            ? `0 20px 48px rgba(0,0,0,0.45), 0 0 36px ${s.glow}`
            : `0 6px 18px rgba(0,0,0,0.28)`,
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          padding: "20px",
          transition: "border-color 0.3s, box-shadow 0.3s",
        }}
      >
        {/* glow fill */}
        <div style={{
          position: "absolute", inset: 0, borderRadius: 20, pointerEvents: "none",
          background: `radial-gradient(circle at 40% 35%, ${s.glow} 0%, transparent 65%)`,
          opacity: isFront ? 0.85 : 0.3, transition: "opacity 0.3s",
        }} />
        {/* top shimmer */}
        <div style={{
          position: "absolute", top: 0, left: "18%", right: "18%", height: 1,
          background: `linear-gradient(90deg, transparent, ${s.color}, transparent)`,
          opacity: isFront ? 0.65 : 0.15, transition: "opacity 0.3s", pointerEvents: "none",
        }} />
        {/* watermark */}
        <div style={{
          position: "absolute", bottom: 8, right: 8, pointerEvents: "none",
          color: s.color, opacity: isFront ? 0.13 : 0.05, transition: "opacity 0.3s",
        }}>
          <s.Icon size={Math.round(cardW * 0.48)} strokeWidth={0.7} />
        </div>
        {/* badge */}
        <div style={{
          width: 44, height: 44, borderRadius: 14, flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: s.bg, color: s.color, marginBottom: 16, position: "relative", zIndex: 2,
          boxShadow: isFront ? `0 0 18px ${s.color}44` : "none", transition: "box-shadow 0.3s",
        }}>
          <s.Icon size={Math.round(cardW * 0.12)} strokeWidth={2} />
        </div>
        {/* title */}
        <h3 style={{
          color: isFront ? s.color : "rgba(242,239,233,0.8)",
          fontFamily: "var(--app-font-display)",
          fontWeight: 900,
          fontSize,
          lineHeight: 1.2,
          zIndex: 2,
          position: "relative",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          transition: "color 0.3s",
        }}>
          {s.title}
        </h3>
      </div>
    </motion.div>
  );
}

/* ── Carousel ─────────────────────────────────────────────────── */
function Carousel({ items }: { items: typeof SERVICES }) {
  const activeF  = useRef(0);   /* floating point position */
  const targetF  = useRef(0);   /* where we want to go */
  const [render, setRender] = useState(0);
  const rafRef   = useRef(0);
  const autoRef  = useRef<ReturnType<typeof setInterval>>();

  /* drag state */
  const dragging  = useRef(false);
  const pointerX0 = useRef(0);
  const activeF0  = useRef(0);

  /* responsive config */
  const [cfg, setCfg] = useState({ radius: 420, cardW: 220, cardH: 260 });
  useEffect(() => {
    const upd = () => {
      const vw = window.innerWidth;
      if      (vw < 400)  setCfg({ radius: 140, cardW: 140, cardH: 170 });
      else if (vw < 540)  setCfg({ radius: 180, cardW: 165, cardH: 200 });
      else if (vw < 768)  setCfg({ radius: 240, cardW: 185, cardH: 225 });
      else if (vw < 1024) setCfg({ radius: 320, cardW: 200, cardH: 248 });
      else                setCfg({ radius: 420, cardW: 220, cardH: 260 });
    };
    upd();
    window.addEventListener("resize", upd);
    return () => window.removeEventListener("resize", upd);
  }, []);

  /* lerp loop — runs every frame */
  useEffect(() => {
    const tick = () => {
      /* shortest-path difference */
      let d = targetF.current - activeF.current;
      while (d >  N / 2) d -= N;
      while (d < -N / 2) d += N;
      activeF.current += d * 0.1;
      setRender(activeF.current);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  /* auto-advance */
  const resetAuto = useCallback(() => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(() => {
      targetF.current = targetF.current + 1;
    }, 2800);
  }, []);
  useEffect(() => { resetAuto(); return () => clearInterval(autoRef.current); }, [resetAuto]);

  /* pointer handlers — work on both mouse and touch */
  const onDown = useCallback((e: React.PointerEvent) => {
    dragging.current  = true;
    pointerX0.current = e.clientX;
    activeF0.current  = targetF.current;
    clearInterval(autoRef.current);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  }, []);

  const onMove = useCallback((e: React.PointerEvent) => {
    if (!dragging.current) return;
    const px_per_card = cfg.cardW * 0.9;
    const delta = (pointerX0.current - e.clientX) / px_per_card;
    targetF.current = activeF0.current + delta;
  }, [cfg.cardW]);

  const onUp = useCallback(() => {
    if (!dragging.current) return;
    dragging.current = false;
    /* snap to nearest card */
    targetF.current = Math.round(targetF.current);
    resetAuto();
  }, [resetAuto]);

  /* dots */
  const dotIdx = ((Math.round(render) % N) + N) % N;

  return (
    <div style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", userSelect: "none" }}>
      {/* 3-D stage */}
      <div
        style={{
          position: "relative",
          width: "100%",
          height: cfg.cardH + 80,
          perspective: 2000,
          perspectiveOrigin: "50% 50%",
          cursor: "grab",
          touchAction: "none",   /* prevent page scroll during drag */
          overflow: "visible",
        }}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
      >
        <div style={{
          position: "absolute", inset: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          transformStyle: "preserve-3d",
        }}>
          {items.map((s, i) => (
            <Card
              key={i} s={s} index={i}
              active={render}
              radius={cfg.radius}
              cardW={cfg.cardW}
              cardH={cfg.cardH}
            />
          ))}
        </div>
      </div>

      {/* dot indicators */}
      <div style={{ display: "flex", gap: 8, marginTop: 28 }}>
        {items.map((_, i) => (
          <button
            key={i}
            onClick={() => { targetF.current = i; resetAuto(); }}
            style={{
              borderRadius: 999,
              border: "none",
              cursor: "pointer",
              background: i === dotIdx ? "#E8A820" : "rgba(255,255,255,0.2)",
              width:  i === dotIdx ? 24 : 8,
              height: 8,
              transition: "width 0.3s, background 0.3s",
            }}
            aria-label={`Go to ${items[i].title}`}
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
      {/* MagicRings background */}
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ opacity: 0.35 }}>
        <MagicRings
          color="#E8A820" colorTwo="#ffffff"
          ringCount={7} speed={0.6} attenuation={9} lineThickness={1.8}
          baseRadius={0.28} radiusStep={0.11} scaleRate={0.1} opacity={1}
          blur={0} noiseAmount={0.04} rotation={0} ringGap={1.6}
          fadeIn={0.7} fadeOut={0.5} followMouse={false} hoverScale={1}
          parallax={0} clickBurst={false}
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

      <div className="relative z-10 px-2">
        <Carousel items={SERVICES} />
      </div>
    </section>
  );
}

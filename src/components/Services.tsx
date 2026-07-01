import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useSpring } from "framer-motion";
import { Dumbbell, HeartPulse, Flame, Bike, User, Apple } from "lucide-react";
import MagicRings from "@/components/MagicRings";

const SERVICES = [
  { title: "Personal Training",  Icon: User,       color: "#E65100", glow: "rgba(230,81,0,.30)",   bg: "rgba(230,81,0,0.10)"   },
  { title: "Strength Training",  Icon: Dumbbell,   color: "#2E7D32", glow: "rgba(46,125,50,.28)",  bg: "rgba(46,125,50,0.10)"  },
  { title: "Weight Loss",        Icon: HeartPulse, color: "#C62828", glow: "rgba(198,40,40,.28)",  bg: "rgba(198,40,40,0.10)"  },
  { title: "CrossFit",           Icon: Flame,      color: "#F57F17", glow: "rgba(245,127,23,.30)", bg: "rgba(245,127,23,0.10)" },
  { title: "Cycling Sessions",   Icon: Bike,       color: "#1565C0", glow: "rgba(21,101,192,.28)", bg: "rgba(21,101,192,0.10)" },
  { title: "Nutrition Coaching", Icon: Apple,      color: "#6A1B9A", glow: "rgba(106,27,154,.28)", bg: "rgba(106,27,154,0.10)" },
];
const N = SERVICES.length;

/* ─── Shared card face ─────────────────────────────────────── */
function CardFace({
  s, isFront = true, w, h,
}: { s: typeof SERVICES[0]; isFront?: boolean; w: number; h: number }) {
  const fs = Math.max(14, Math.round(w * 0.075));
  return (
    <div style={{
      width: w, height: h, background: "#1e1e20",
      border: `1.5px solid ${isFront ? s.color + "75" : "rgba(255,255,255,0.07)"}`,
      borderRadius: 20, boxShadow: isFront
        ? `0 20px 48px rgba(0,0,0,.45), 0 0 36px ${s.glow}`
        : `0 6px 18px rgba(0,0,0,.28)`,
      position: "relative", overflow: "hidden",
      display: "flex", flexDirection: "column", padding: 20,
      transition: "border-color .3s, box-shadow .3s",
    }}>
      <div style={{ position:"absolute", inset:0, borderRadius:20, pointerEvents:"none",
        background:`radial-gradient(circle at 40% 35%, ${s.glow} 0%, transparent 65%)`,
        opacity: isFront ? 0.85 : 0.3, transition:"opacity .3s" }} />
      <div style={{ position:"absolute", top:0, left:"18%", right:"18%", height:1, pointerEvents:"none",
        background:`linear-gradient(90deg,transparent,${s.color},transparent)`,
        opacity: isFront ? 0.65 : 0.15, transition:"opacity .3s" }} />
      <div style={{ position:"absolute", bottom:8, right:8, pointerEvents:"none",
        color:s.color, opacity: isFront ? 0.13 : 0.05, transition:"opacity .3s" }}>
        <s.Icon size={Math.round(w * 0.48)} strokeWidth={0.7} />
      </div>
      <div style={{ width:44, height:44, borderRadius:14, flexShrink:0,
        display:"flex", alignItems:"center", justifyContent:"center",
        background:s.bg, color:s.color, marginBottom:16, position:"relative", zIndex:2,
        boxShadow: isFront ? `0 0 18px ${s.color}44` : "none", transition:"box-shadow .3s" }}>
        <s.Icon size={Math.round(w * 0.12)} strokeWidth={2} />
      </div>
      <h3 style={{ color: isFront ? s.color : "rgba(242,239,233,.8)",
        fontFamily:"var(--app-font-display)", fontWeight:900, fontSize:fs,
        lineHeight:1.2, zIndex:2, position:"relative",
        display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical",
        overflow:"hidden", transition:"color .3s" }}>
        {s.title}
      </h3>
    </div>
  );
}

/* ─── Desktop 3-D cylinder card ────────────────────────────── */
function CylCard({ s, index, active, radius, cardW, cardH }:
  { s: typeof SERVICES[0]; index:number; active:number; radius:number; cardW:number; cardH:number }) {
  const step   = (2 * Math.PI) / N;
  let offset   = index - active;
  while (offset >  N / 2) offset -= N;
  while (offset < -N / 2) offset += N;
  const angle   = offset * step;
  const x       = radius * Math.sin(angle);
  const z       = radius * (Math.cos(angle) - 1);
  const rotateY = -(angle * 180) / Math.PI;
  const depth   = (Math.cos(angle) + 1) / 2;
  const scale   = 0.68 + depth * 0.32;
  const opacity = 0.55 + depth * 0.45;
  const zIndex  = Math.round(depth * 100);

  const ySpring = useSpring(0, { stiffness: 50, damping: 12 });
  const t0 = useRef(index * 0.45);
  useEffect(() => {
    let raf: number;
    const tick = () => { t0.current += 0.014; ySpring.set(Math.sin(t0.current) * 3); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [ySpring]);

  return (
    <motion.div style={{ position:"absolute", zIndex, x, rotateY, scale, opacity, translateZ: z, y: ySpring }}>
      <CardFace s={s} isFront={depth > 0.85} w={cardW} h={cardH} />
    </motion.div>
  );
}

/* ─── Desktop carousel ─────────────────────────────────────── */
function DesktopCarousel({ items }: { items: typeof SERVICES }) {
  const activeF  = useRef(0);
  const targetF  = useRef(0);
  const [render, setRender] = useState(0);
  const autoRef  = useRef<ReturnType<typeof setInterval>>();
  const dragging = useRef(false);
  const px0      = useRef(0);
  const af0      = useRef(0);

  const [cfg, setCfg] = useState({ radius: 420, cardW: 220, cardH: 260 });
  useEffect(() => {
    const upd = () => {
      const vw = window.innerWidth;
      if (vw < 1024) setCfg({ radius: 320, cardW: 200, cardH: 248 });
      else           setCfg({ radius: 420, cardW: 220, cardH: 260 });
    };
    upd(); window.addEventListener("resize", upd);
    return () => window.removeEventListener("resize", upd);
  }, []);

  useEffect(() => {
    let raf: number;
    const tick = () => {
      let d = targetF.current - activeF.current;
      while (d >  N/2) d -= N;
      while (d < -N/2) d += N;
      activeF.current += d * 0.1;
      setRender(activeF.current);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const resetAuto = useCallback(() => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(() => { targetF.current += 1; }, 2800);
  }, []);
  useEffect(() => { resetAuto(); return () => clearInterval(autoRef.current); }, [resetAuto]);

  const onDown = (e: React.PointerEvent) => {
    dragging.current = true; px0.current = e.clientX; af0.current = targetF.current;
    clearInterval(autoRef.current);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    targetF.current = af0.current + (px0.current - e.clientX) / (cfg.cardW * 0.9);
  };
  const onUp = () => { if (!dragging.current) return; dragging.current = false; targetF.current = Math.round(targetF.current); resetAuto(); };

  const dotIdx = ((Math.round(render) % N) + N) % N;

  return (
    <div style={{ width:"100%", display:"flex", flexDirection:"column", alignItems:"center", userSelect:"none" }}>
      <div style={{ position:"relative", width:"100%", height: cfg.cardH + 80,
        perspective: 2000, perspectiveOrigin:"50% 50%", cursor:"grab", overflow:"visible", touchAction:"none" }}
        onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp}>
        <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", transformStyle:"preserve-3d" }}>
          {items.map((s,i) => <CylCard key={i} s={s} index={i} active={render} radius={cfg.radius} cardW={cfg.cardW} cardH={cfg.cardH} />)}
        </div>
      </div>
      <div style={{ display:"flex", gap:8, marginTop:24 }}>
        {items.map((_,i) => (
          <button key={i} onClick={() => { targetF.current = i; resetAuto(); }}
            style={{ borderRadius:999, border:"none", cursor:"pointer",
              background: i===dotIdx ? "#E8A820" : "rgba(255,255,255,0.2)",
              width: i===dotIdx ? 24 : 8, height:8, transition:"width .3s, background .3s" }}
            aria-label={`${items[i].title}`} />
        ))}
      </div>
    </div>
  );
}

/* ─── Section ──────────────────────────────────────────────── */
export default function Services() {
  return (
    <section id="services" className="py-20 bg-[#1C1C1E] overflow-hidden relative">
      <div className="absolute inset-0 z-0 pointer-events-none" style={{ opacity: 0.35 }}>
        <MagicRings color="#E8A820" colorTwo="#ffffff" ringCount={7} speed={0.6} attenuation={9}
          lineThickness={1.8} baseRadius={0.28} radiusStep={0.11} scaleRate={0.1} opacity={1}
          blur={0} noiseAmount={0.04} rotation={0} ringGap={1.6} fadeIn={0.7} fadeOut={0.5}
          followMouse={false} hoverScale={1} parallax={0} clickBurst={false} />
      </div>

      <motion.div initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
        viewport={{ once:true, margin:"-60px" }} transition={{ duration:0.65, ease:[0.16,1,0.3,1] }}
        className="text-center max-w-xl mx-auto px-5 mb-10 relative z-10">
        <div className="eyebrow justify-center mb-4">What we offer</div>
        <h2 className="font-display font-black text-[#F2EFE9] text-[clamp(2rem,4.5vw,2.9rem)]">
          Arsenal of <span className="text-gold-gradient">disciplines</span>
        </h2>
      </motion.div>

      <div className="relative z-10 px-4">
        <DesktopCarousel items={SERVICES} />
      </div>
    </section>
  );
}

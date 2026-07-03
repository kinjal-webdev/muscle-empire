import { useRef, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dumbbell, HeartPulse, Flame, Bike, User, Apple } from "lucide-react";
import MagicRings from "@/components/MagicRings";

const SERVICES = [
  { title: "Personal Training",  Icon: User,       color: "#E65100", glow: "rgba(230,81,0,.26)",   bg: "rgba(230,81,0,0.10)"   },
  { title: "Strength Training",  Icon: Dumbbell,   color: "#2E7D32", glow: "rgba(46,125,50,.24)",  bg: "rgba(46,125,50,0.10)"  },
  { title: "Weight Loss",        Icon: HeartPulse, color: "#C62828", glow: "rgba(198,40,40,.24)",  bg: "rgba(198,40,40,0.10)"  },
  { title: "CrossFit",           Icon: Flame,      color: "#F57F17", glow: "rgba(245,127,23,.26)", bg: "rgba(245,127,23,0.10)" },
  { title: "Cycling Sessions",   Icon: Bike,       color: "#1565C0", glow: "rgba(21,101,192,.24)", bg: "rgba(21,101,192,0.10)" },
  { title: "Nutrition Coaching", Icon: Apple,      color: "#6A1B9A", glow: "rgba(106,27,154,.24)", bg: "rgba(106,27,154,0.10)" },
];
const N = SERVICES.length;

/* ── Card component ──────────────────────────────────────────── */
function Card({
  s, w, h, isFront,
}: {
  s: typeof SERVICES[0];
  w: number;
  h: number;
  isFront: boolean;
}) {
  const fs = Math.max(13, Math.round(w * 0.075));
  const iconSize = Math.round(w * 0.13);
  const watermarkSize = Math.round(w * 0.46);

  return (
    <div
      style={{
        width: w, height: h, flexShrink: 0,
        background: `radial-gradient(circle at 38% 32%, ${s.glow} 0%, transparent 62%), #1e1e20`,
        border: `1.5px solid ${isFront ? s.color + "70" : s.color + "28"}`,
        borderRadius: 20,
        boxShadow: isFront
          ? `0 20px 56px rgba(0,0,0,.45), 0 0 48px ${s.glow}`
          : `0 6px 18px rgba(0,0,0,.28)`,
        position: "relative", overflow: "hidden",
        display: "flex", flexDirection: "column", padding: 20,
        transition: "border-color .35s, box-shadow .35s",
      }}
    >
      <div style={{ position:"absolute", top:0, left:"18%", right:"18%", height:1, pointerEvents:"none",
        background:`linear-gradient(90deg,transparent,${s.color}88,transparent)`,
        opacity: isFront ? 1 : 0.3 }} />
      <div style={{ position:"absolute", bottom:6, right:6, pointerEvents:"none",
        color: s.color, opacity: isFront ? 0.12 : 0.05 }}>
        <s.Icon size={watermarkSize} strokeWidth={0.7} />
      </div>
      <div style={{ width:44, height:44, borderRadius:14, flexShrink:0,
        display:"flex", alignItems:"center", justifyContent:"center",
        background: s.bg, color: s.color, marginBottom:14, position:"relative", zIndex:2,
        boxShadow: isFront ? `0 0 20px ${s.color}44` : "none" }}>
        <s.Icon size={iconSize} strokeWidth={2} />
      </div>
      <h3 style={{
        color: isFront ? s.color : "rgba(242,239,233,.75)",
        fontFamily:"var(--app-font-display)", fontWeight:900, fontSize:fs,
        lineHeight:1.2, zIndex:2, position:"relative",
        display:"-webkit-box", WebkitLineClamp:2,
        WebkitBoxOrient:"vertical", overflow:"hidden",
        transition:"color .35s",
      }}>
        {s.title}
      </h3>
    </div>
  );
}

/* ── Simple slide carousel — no 3D, no floating ─────────────── */
function Carousel({ items }: { items: typeof SERVICES }) {
  const [active, setActive] = useState(0);
  const [dir, setDir]       = useState(1); /* 1=forward -1=backward */
  const autoRef = useRef<ReturnType<typeof setInterval>>();
  const touchX  = useRef(0);

  /* responsive card size: fill screen width - padding */
  const [cardW, setCardW] = useState(260);
  useEffect(() => {
    const calc = () => {
      const vw = window.innerWidth;
      /* on mobile show 1 card that fits; on desktop 3 visible via cylinder-width */
      if (vw < 480)  setCardW(Math.min(vw - 48, 240));
      else if (vw < 768) setCardW(Math.min(vw - 80, 280));
      else if (vw < 1024) setCardW(260);
      else setCardW(280);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, []);
  const cardH = Math.round(cardW * 1.12);

  const go = useCallback((d: 1 | -1) => {
    setDir(d);
    setActive(a => (a + d + N) % N);
  }, []);

  const resetAuto = useCallback(() => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(() => go(1), 3000);
  }, [go]);

  useEffect(() => { resetAuto(); return () => clearInterval(autoRef.current); }, [resetAuto]);

  const onTouchStart = (e: React.TouchEvent) => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e: React.TouchEvent) => {
    const diff = touchX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) { go(diff > 0 ? 1 : -1); resetAuto(); }
  };

  /* show prev / current / next indices */
  const prev = (active - 1 + N) % N;
  const next = (active + 1) % N;

  return (
    <div style={{ width:"100%", display:"flex", flexDirection:"column", alignItems:"center" }}>

      {/* card stage */}
      <div
        style={{ position:"relative", width:"100%", height: cardH + 40,
          overflow:"hidden", touchAction:"pan-y" }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <AnimatePresence initial={false} custom={dir} mode="popLayout">
          <motion.div
            key={active}
            custom={dir}
            variants={{
              enter:  (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
              center: { x: "0%", opacity: 1 },
              exit:   (d: number) => ({ x: d > 0 ? "-100%" : "100%", opacity: 0 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
            style={{ position:"absolute", inset:0, display:"flex",
              alignItems:"center", justifyContent:"center" }}
          >
            <Card s={items[active]} w={cardW} h={cardH} isFront />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* prev / dots / next */}
      <div style={{ display:"flex", alignItems:"center", gap:16, marginTop:16 }}>
        <button onClick={() => { go(-1); resetAuto(); }}
          style={{ width:36, height:36, borderRadius:12,
            border:"1px solid rgba(255,255,255,.12)", background:"rgba(255,255,255,.05)",
            color:"rgba(242,239,233,.65)", fontSize:20, cursor:"pointer",
            display:"flex", alignItems:"center", justifyContent:"center" }}>‹</button>

        <div style={{ display:"flex", gap:6 }}>
          {items.map((_,i) => (
            <button key={i} onClick={() => { setDir(i > active ? 1 : -1); setActive(i); resetAuto(); }}
              style={{ borderRadius:999, border:"none", cursor:"pointer",
                background: i === active ? items[i].color : "rgba(255,255,255,.2)",
                width: i === active ? 22 : 7, height:7,
                transition:"width .3s, background .3s" }}
              aria-label={items[i].title} />
          ))}
        </div>

        <button onClick={() => { go(1); resetAuto(); }}
          style={{ width:36, height:36, borderRadius:12,
            border:"1px solid rgba(255,255,255,.12)", background:"rgba(255,255,255,.05)",
            color:"rgba(242,239,233,.65)", fontSize:20, cursor:"pointer",
            display:"flex", alignItems:"center", justifyContent:"center" }}>›</button>
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
          color="#E8A820" colorTwo="#ffffff" ringCount={7} speed={0.6}
          attenuation={9} lineThickness={1.8} baseRadius={0.28} radiusStep={0.11}
          scaleRate={0.1} opacity={1} blur={0} noiseAmount={0.04} rotation={0}
          ringGap={1.6} fadeIn={0.7} fadeOut={0.5} followMouse={false}
          hoverScale={1} parallax={0} clickBurst={false}
        />
      </div>

      <motion.div
        initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
        viewport={{ once:true, margin:"-60px" }}
        transition={{ duration:0.65, ease:[0.16,1,0.3,1] }}
        className="text-center max-w-xl mx-auto px-5 mb-10 relative z-10"
      >
        <div className="eyebrow justify-center mb-4">What we offer</div>
        <h2 className="font-display font-black text-[#F2EFE9] text-[clamp(2rem,4.5vw,2.9rem)]">
          Arsenal of <span className="text-gold-gradient">disciplines</span>
        </h2>
      </motion.div>

      <div className="relative z-10 px-4">
        <Carousel items={SERVICES} />
      </div>
    </section>
  );
}

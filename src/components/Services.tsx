import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { Dumbbell, HeartPulse, Flame, Bike, User, Apple } from "lucide-react";

const services = [
  { title: "Personal Training",   desc: "One-on-one coaching tailored to your schedule, goals, and current fitness level.",    Icon: User,       bg: "#FFF3E0", iconColor: "#E65100", border: "#FFCC80" },
  { title: "Strength Training",   desc: "Progressive overload programming designed to build real, lasting muscle and power.",   Icon: Dumbbell,   bg: "#E8F5E9", iconColor: "#2E7D32", border: "#A5D6A7" },
  { title: "Weight Loss",         desc: "High-intensity, science-backed programs that shred body fat while preserving muscle.", Icon: HeartPulse, bg: "#FCE4EC", iconColor: "#C62828", border: "#F48FB1" },
  { title: "CrossFit",            desc: "Constantly varied functional movements performed at high intensity. Every session, different.", Icon: Flame, bg: "#FFF8E1", iconColor: "#F57F17", border: "#FFE082" },
  { title: "Cycling Sessions",    desc: "High-energy indoor cycling classes that torch calories and boost cardio fitness.",     Icon: Bike,       bg: "#E3F2FD", iconColor: "#1565C0", border: "#90CAF9" },
  { title: "Nutrition Coaching",  desc: "Personalised nutrition plans built to fuel your training, recovery, and performance.", Icon: Apple,      bg: "#F3E5F5", iconColor: "#6A1B9A", border: "#CE93D8" },
];

const CARD_W = 300;
const GAP    = 20;

function Card({ s }: { s: typeof services[0] }) {
  return (
    <div
      className="shrink-0 rounded-[22px] flex flex-col p-7 border-2 relative overflow-hidden select-none"
      style={{ background: s.bg, borderColor: s.border, width: CARD_W, minHeight: 320 }}
    >
      {/* Watermark icon — behind everything */}
      <div className="absolute bottom-4 right-4 opacity-[0.13] pointer-events-none" style={{ color: s.iconColor }}>
        <s.Icon size={130} strokeWidth={0.9} />
      </div>

      {/* Badge icon */}
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 shrink-0"
        style={{ background: s.iconColor + "1A", color: s.iconColor }}
      >
        <s.Icon size={24} strokeWidth={2} />
      </div>

      {/* Title */}
      <h3
        className="font-display font-black text-[1.35rem] leading-snug mb-3 z-10 relative"
        style={{ color: s.iconColor }}
      >
        {s.title}
      </h3>

      {/* Desc */}
      <p className="text-[#444] text-[0.86rem] leading-relaxed z-10 relative">{s.desc}</p>
    </div>
  );
}

/* ── Shared auto-scroll + drag strip ──────────────────────────── */
function MarqueeStrip({
  items,
  direction = "left",
  speed = 18,
  bgFrom,
  bgTo,
}: {
  items: typeof services;
  direction?: "left" | "right";
  speed?: number;
  bgFrom: string;
  bgTo: string;
}) {
  const controls  = useAnimationControls();
  const trackRef  = useRef<HTMLDivElement>(null);
  const paused    = useRef(false);
  const dragX     = useRef(0);
  const startX    = useRef(0);
  const scrollX   = useRef(0);
  const isDragging = useRef(false);

  /* total width of one set */
  const setW = items.length * (CARD_W + GAP);

  const startAnim = useCallback(() => {
    if (paused.current) return;
    const from = direction === "left" ? 0 : -setW;
    const to   = direction === "left" ? -setW : 0;
    controls.start({
      x: to,
      transition: { duration: speed, ease: "linear", repeat: Infinity, repeatType: "loop", from },
    });
  }, [controls, direction, setW, speed]);

  useEffect(() => { startAnim(); }, [startAnim]);

  /* pause on hover */
  const pause = () => { paused.current = true; controls.stop(); };
  const resume = () => { paused.current = false; startAnim(); };

  /* drag to scroll */
  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    pause();
    const el = trackRef.current;
    if (el) {
      const style = window.getComputedStyle(el);
      const matrix = new DOMMatrix(style.transform);
      scrollX.current = matrix.m41;
    }
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const delta = e.clientX - startX.current;
    dragX.current = scrollX.current + delta;
    /* clamp so user can't pull too far */
    const clamped = Math.max(-setW * 1.5, Math.min(setW * 0.5, dragX.current));
    controls.set({ x: clamped });
  };

  const onPointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    scrollX.current = dragX.current;
    resume();
  };

  /* triple cards for seamless loop */
  const looped = [...items, ...items, ...items];

  return (
    <div
      className="relative overflow-hidden cursor-grab active:cursor-grabbing"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
    >
      {/* Edge fades */}
      <div className={`absolute inset-y-0 left-0 w-20 z-10 pointer-events-none bg-gradient-to-r ${bgFrom} to-transparent`} />
      <div className={`absolute inset-y-0 right-0 w-20 z-10 pointer-events-none bg-gradient-to-l ${bgTo} to-transparent`} />

      <motion.div
        ref={trackRef}
        animate={controls}
        className="flex py-4 px-8"
        style={{ gap: GAP, width: "max-content" }}
      >
        {looped.map((s, i) => <Card key={i} s={s} />)}
      </motion.div>
    </div>
  );
}

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
        <p className="text-[#666] text-[1rem] leading-relaxed mt-3">
          A complete suite of training modalities designed to build, shred, and optimise every aspect of your physicality.
        </p>
      </motion.div>

      <MarqueeStrip items={services} direction="left" speed={18} bgFrom="from-white" bgTo="from-white" />
    </section>
  );
}

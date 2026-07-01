import { useRef, useCallback, useEffect } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { CheckCircle2, Trophy, Clock, Target, Users2, Activity } from "lucide-react";

const reasons = [
  { Icon: Trophy,       title: "Expert trainers",       desc: "Certified professionals with years of competitive coaching and hands-on training experience.",   bg: "#FFF8E1", iconColor: "#F9A825", border: "#FFE082" },
  { Icon: Target,       title: "Personalised plans",    desc: "No cookie-cutter routines. Every programme is designed around your unique body and goals.",       bg: "#E8F5E9", iconColor: "#2E7D32", border: "#A5D6A7" },
  { Icon: Activity,     title: "Modern equipment",      desc: "Top-tier, biomechanically superior machines and an extensive range of free weights.",             bg: "#E3F2FD", iconColor: "#1565C0", border: "#90CAF9" },
  { Icon: Users2,       title: "Strong community",      desc: "Train alongside driven individuals who share your relentless pursuit of progress and results.",    bg: "#F3E5F5", iconColor: "#6A1B9A", border: "#CE93D8" },
  { Icon: Clock,        title: "Flexible timings",      desc: "Open early morning to late night so your schedule never becomes an excuse to skip a session.",     bg: "#FCE4EC", iconColor: "#C62828", border: "#F48FB1" },
  { Icon: CheckCircle2, title: "Pro assessment",        desc: "Comprehensive body composition and movement analysis before you start, so we know where to begin.",bg: "#E0F2F1", iconColor: "#00695C", border: "#80CBC4" },
];

const CARD_W = 300;
const GAP    = 20;

function Card({ r }: { r: typeof reasons[0] }) {
  return (
    <div
      className="shrink-0 rounded-[22px] flex flex-col p-7 border-2 relative overflow-hidden select-none"
      style={{ background: r.bg, borderColor: r.border, width: CARD_W, minHeight: 320 }}
    >
      <div className="absolute bottom-4 right-4 opacity-[0.13] pointer-events-none" style={{ color: r.iconColor }}>
        <r.Icon size={130} strokeWidth={0.9} />
      </div>
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 shrink-0"
        style={{ background: r.iconColor + "1A", color: r.iconColor }}>
        <r.Icon size={24} strokeWidth={2} />
      </div>
      <h3 className="font-display font-black text-[1.35rem] leading-snug mb-3 z-10 relative" style={{ color: r.iconColor }}>
        {r.title}
      </h3>
      <p className="text-[#444] text-[0.86rem] leading-relaxed z-10 relative">{r.desc}</p>
    </div>
  );
}

export default function WhyChooseUs() {
  const controls   = useAnimationControls();
  const trackRef   = useRef<HTMLDivElement>(null);
  const paused     = useRef(false);
  const dragX      = useRef(0);
  const startX     = useRef(0);
  const scrollX    = useRef(0);
  const isDragging = useRef(false);
  const setW       = reasons.length * (CARD_W + GAP);

  const startAnim = useCallback(() => {
    if (paused.current) return;
    controls.start({
      x: 0,
      transition: { duration: 20, ease: "linear", repeat: Infinity, repeatType: "loop", from: -setW },
    });
  }, [controls, setW]);

  useEffect(() => { startAnim(); }, [startAnim]);

  const pause  = () => { paused.current = true;  controls.stop(); };
  const resume = () => { paused.current = false; startAnim(); };

  const onPointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    startX.current = e.clientX;
    pause();
    const el = trackRef.current;
    if (el) { const m = new DOMMatrix(window.getComputedStyle(el).transform); scrollX.current = m.m41; }
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const delta = e.clientX - startX.current;
    dragX.current = Math.max(-setW * 1.5, Math.min(setW * 0.5, scrollX.current + delta));
    controls.set({ x: dragX.current });
  };
  const onPointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false; scrollX.current = dragX.current; resume();
  };

  const looped = [...reasons, ...reasons, ...reasons];

  return (
    <section id="why-us" className="py-20 bg-[#F7F6F3] overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-xl mx-auto px-5 mb-12"
      >
        <div className="eyebrow justify-center mb-4">The Empire standard</div>
        <h2 className="font-display font-black text-[#1C1C1E] text-[clamp(2rem,4.5vw,2.9rem)]">
          Why train <span className="text-gold-gradient">with us?</span>
        </h2>
        <p className="text-[#666] text-[1rem] leading-relaxed mt-3">
          From our equipment to our culture, every element is engineered for your success.
        </p>
      </motion.div>

      <div
        className="relative overflow-hidden cursor-grab active:cursor-grabbing"
        onMouseEnter={pause}
        onMouseLeave={resume}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <div className="absolute inset-y-0 left-0 w-20 z-10 pointer-events-none bg-gradient-to-r from-[#F7F6F3] to-transparent" />
        <div className="absolute inset-y-0 right-0 w-20 z-10 pointer-events-none bg-gradient-to-l from-[#F7F6F3] to-transparent" />

        <motion.div
          ref={trackRef}
          animate={controls}
          className="flex py-4 px-8"
          style={{ gap: GAP, width: "max-content" }}
        >
          {looped.map((r, i) => <Card key={i} r={r} />)}
        </motion.div>
      </div>
    </section>
  );
}

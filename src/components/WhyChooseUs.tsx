import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Trophy, Clock, Target, Users2, Activity, ChevronLeft, ChevronRight } from "lucide-react";

const reasons = [
  { Icon: Trophy,       title: "Expert trainers",       desc: "Certified professionals with years of competitive coaching and hands-on training experience.",    bg: "#FFF8E1", iconColor: "#F9A825", border: "#FFE082" },
  { Icon: Target,       title: "Personalised plans",    desc: "No cookie-cutter routines. Every programme is designed around your unique body and goals.",        bg: "#E8F5E9", iconColor: "#2E7D32", border: "#A5D6A7" },
  { Icon: Activity,     title: "Modern equipment",      desc: "Top-tier, biomechanically superior machines and an extensive range of free weights.",              bg: "#E3F2FD", iconColor: "#1565C0", border: "#90CAF9" },
  { Icon: Users2,       title: "Strong community",      desc: "Train alongside driven individuals who share your relentless pursuit of progress and results.",     bg: "#F3E5F5", iconColor: "#6A1B9A", border: "#CE93D8" },
  { Icon: Clock,        title: "Flexible timings",      desc: "Open early morning to late night so your schedule never becomes an excuse to skip a session.",      bg: "#FCE4EC", iconColor: "#C62828", border: "#F48FB1" },
  { Icon: CheckCircle2, title: "Pro assessment",        desc: "Comprehensive body and movement analysis before you start, so every plan begins with clarity.",     bg: "#E0F2F1", iconColor: "#00695C", border: "#80CBC4" },
];

function Card({ r }: { r: typeof reasons[0] }) {
  return (
    <div
      className="rounded-[22px] flex flex-col p-7 border-2 relative overflow-hidden h-full"
      style={{ background: r.bg, borderColor: r.border }}
    >
      {/* Watermark */}
      <div className="absolute bottom-4 right-4 opacity-[0.12] pointer-events-none" style={{ color: r.iconColor }}>
        <r.Icon size={120} strokeWidth={0.9} />
      </div>

      {/* Badge */}
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 shrink-0"
        style={{ background: r.iconColor + "1A", color: r.iconColor }}
      >
        <r.Icon size={24} strokeWidth={2} />
      </div>

      {/* Title */}
      <h3
        className="font-display font-black text-[1.25rem] leading-snug mb-3 z-10 relative"
        style={{ color: r.iconColor }}
      >
        {r.title}
      </h3>

      {/* Desc */}
      <p className="text-[#444] text-[0.875rem] leading-relaxed z-10 relative">{r.desc}</p>
    </div>
  );
}

export default function WhyChooseUs() {
  /* Mobile carousel state */
  const [mobileIdx, setMobileIdx] = useState(0);
  const touchStartX = useRef(0);

  const prev = () => setMobileIdx(i => Math.max(0, i - 1));
  const next = () => setMobileIdx(i => Math.min(reasons.length - 1, i + 1));

  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 40) next();
    if (diff < -40) prev();
  };

  return (
    <section id="why-us" className="py-20 bg-[#F7F6F3]">

      {/* Header */}
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

      {/* ── Desktop: static 3×2 grid ────────────────── */}
      <div className="hidden md:grid grid-cols-3 gap-5 max-w-5xl mx-auto px-6">
        {reasons.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ delay: i * 0.08, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <Card r={r} />
          </motion.div>
        ))}
      </div>

      {/* ── Mobile: 1 card at a time with swipe ─────── */}
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
              <div key={i} className="w-full shrink-0 min-h-[300px]">
                <Card r={r} />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Mobile nav */}
        <div className="flex items-center justify-between mt-5 px-1">
          {/* Dots */}
          <div className="flex gap-2">
            {reasons.map((_, i) => (
              <button
                key={i}
                onClick={() => setMobileIdx(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === mobileIdx ? "w-6 h-2 bg-[#E8A820]" : "w-2 h-2 bg-black/20 hover:bg-[#E8A820]/50"
                }`}
                aria-label={`Go to card ${i + 1}`}
              />
            ))}
          </div>

          {/* Arrows */}
          <div className="flex gap-2">
            <button
              onClick={prev}
              disabled={mobileIdx === 0}
              className="w-9 h-9 rounded-xl border border-black/[0.10] flex items-center justify-center text-[#444] disabled:opacity-30 hover:bg-black/[0.05] transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={next}
              disabled={mobileIdx === reasons.length - 1}
              className="w-9 h-9 rounded-xl border border-black/[0.10] flex items-center justify-center text-[#444] disabled:opacity-30 hover:bg-black/[0.05] transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

    </section>
  );
}

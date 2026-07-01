import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Dumbbell, HeartPulse, Flame, Bike, User, Apple } from "lucide-react";

const services = [
  { title: "Personal Training",   desc: "One-on-one coaching built around your schedule and goals.",                          Icon: User,      bg: "#FFF3E0", iconColor: "#E65100", border: "#FFCC80" },
  { title: "Strength Training",   desc: "Progressive overload to build real, lasting muscle and power.",                      Icon: Dumbbell,  bg: "#E8F5E9", iconColor: "#2E7D32", border: "#A5D6A7" },
  { title: "Weight Loss",         desc: "Science-backed programs that shred body fat while preserving muscle.",               Icon: HeartPulse,bg: "#FCE4EC", iconColor: "#C62828", border: "#F48FB1" },
  { title: "CrossFit",            desc: "Constantly varied functional movements at high intensity.",                          Icon: Flame,     bg: "#FFF8E1", iconColor: "#F57F17", border: "#FFE082" },
  { title: "Cycling Sessions",    desc: "High-energy indoor cycling classes that torch calories fast.",                       Icon: Bike,      bg: "#E3F2FD", iconColor: "#1565C0", border: "#90CAF9" },
  { title: "Nutrition Coaching",  desc: "Personalised plans to fuel your training and recovery.",                             Icon: Apple,     bg: "#F3E5F5", iconColor: "#6A1B9A", border: "#CE93D8" },
];

const CARD_W = 210;
const CARD_H = 300;
const GAP    = 28;
const STEP   = CARD_W + GAP;

/* Arc transform for each card based on its offset from centre */
function arcTransform(offset: number) {
  /* offset = -2..2 (how far from centre in card-widths) */
  const maxAngle  = 28;          /* degrees tilt at edges */
  const maxY      = 60;          /* px drop at edges */
  const maxScale  = 0.72;        /* min scale at edges */
  const maxZ      = -160;        /* translateZ at edges */

  const t = Math.max(-2.5, Math.min(2.5, offset));
  const rotateY = t * maxAngle;
  const translateY = (t * t) * (maxY / 6.25);   /* parabola */
  const scale = 1 - Math.abs(t) * ((1 - maxScale) / 2.5);
  const translateZ = -(t * t) * (Math.abs(maxZ) / 6.25);
  const opacity = 1 - Math.abs(t) * 0.22;

  return { rotateY, translateY, scale, translateZ, opacity };
}

export default function Services() {
  const [active, setActive] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const n = services.length;

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setActive(a => (a + 1) % n);
    }, 2600);
  };

  useEffect(() => {
    startTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const handleClick = (i: number) => {
    setActive(i);
    startTimer();
  };

  return (
    <section id="services" className="py-20 bg-white overflow-hidden">
      <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-black/[0.07] to-transparent" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-xl mx-auto px-5 mb-14"
      >
        <div className="eyebrow justify-center mb-4">What we offer</div>
        <h2 className="font-display font-black text-[#1C1C1E] text-[clamp(2rem,4.5vw,2.9rem)]">
          Arsenal of <span className="text-gold-gradient">disciplines</span>
        </h2>
        <p className="text-[#666] text-[1rem] leading-relaxed mt-3">
          A complete suite of training modalities designed to build, shred, and optimise every aspect of your physicality.
        </p>
      </motion.div>

      {/* Arc carousel */}
      <div
        className="relative mx-auto"
        style={{
          height: CARD_H + 100,
          width: "100%",
          perspective: "1000px",
          perspectiveOrigin: "50% 40%",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center" style={{ perspective: "1000px" }}>
          {services.map((svc, i) => {
            /* offset relative to active card */
            let offset = i - active;
            /* wrap so we always pick the shortest path */
            if (offset > n / 2) offset -= n;
            if (offset < -n / 2) offset += n;

            const { rotateY, translateY, scale, translateZ, opacity } = arcTransform(offset);
            const xPos = offset * STEP;
            const isCenter = offset === 0;

            return (
              <motion.div
                key={i}
                onClick={() => handleClick(i)}
                animate={{
                  x: xPos,
                  y: translateY,
                  scale,
                  rotateY,
                  translateZ,
                  opacity,
                }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                className="absolute cursor-pointer"
                style={{
                  width: CARD_W,
                  height: CARD_H,
                  transformStyle: "preserve-3d",
                  zIndex: isCenter ? 10 : 10 - Math.abs(offset),
                }}
              >
                <div
                  className="w-full h-full rounded-[22px] flex flex-col justify-between p-6 border-2 relative overflow-hidden"
                  style={{
                    background: svc.bg,
                    borderColor: isCenter ? svc.iconColor : svc.border,
                    boxShadow: isCenter
                      ? `0 16px 48px ${svc.iconColor}30`
                      : "0 4px 16px rgba(0,0,0,0.07)",
                    transition: "box-shadow 0.3s, border-color 0.3s",
                  }}
                >
                  {/* Title */}
                  <h3
                    className="font-display font-black text-[1.2rem] leading-tight tracking-tight z-10 relative"
                    style={{ color: svc.iconColor }}
                  >
                    {svc.title}
                  </h3>

                  {/* Desc */}
                  <p className="text-[#444] text-[0.76rem] leading-relaxed mt-2 z-10 relative">
                    {svc.desc}
                  </p>

                  {/* Large watermark icon */}
                  <div className="absolute bottom-3 right-3 opacity-[0.15]" style={{ color: svc.iconColor }}>
                    <svc.Icon size={108} strokeWidth={1} />
                  </div>

                  {/* Small solid icon */}
                  <div
                    className="w-11 h-11 rounded-2xl flex items-center justify-center mt-4 shrink-0 z-10 relative"
                    style={{ background: svc.iconColor + "20", color: svc.iconColor }}
                  >
                    <svc.Icon size={22} strokeWidth={2} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom shadow / ground reflection */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            width: STEP * 5,
            height: 40,
            background: "radial-gradient(ellipse, rgba(0,0,0,0.08) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {services.map((_, i) => (
          <button
            key={i}
            onClick={() => handleClick(i)}
            className={`rounded-full transition-all duration-300 ${
              i === active ? "w-6 h-2 bg-[#E8A820]" : "w-2 h-2 bg-black/15 hover:bg-[#E8A820]/50"
            }`}
            aria-label={`Go to ${services[i].title}`}
          />
        ))}
      </div>
    </section>
  );
}

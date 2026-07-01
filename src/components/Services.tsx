import { motion } from "framer-motion";
import { Dumbbell, HeartPulse, Flame, Bike, User, Apple } from "lucide-react";

const services = [
  {
    title: "Personal Training",
    desc: "One-on-one coaching built around your schedule and goals.",
    Icon: User,
    bg: "#FFF3E0",
    iconColor: "#E65100",
    border: "#FFCC80",
  },
  {
    title: "Strength Training",
    desc: "Progressive overload to build real, lasting muscle and power.",
    Icon: Dumbbell,
    bg: "#E8F5E9",
    iconColor: "#2E7D32",
    border: "#A5D6A7",
  },
  {
    title: "Weight Loss",
    desc: "Science-backed programs that shred body fat while preserving muscle.",
    Icon: HeartPulse,
    bg: "#FCE4EC",
    iconColor: "#C62828",
    border: "#F48FB1",
  },
  {
    title: "CrossFit",
    desc: "Constantly varied functional movements at high intensity.",
    Icon: Flame,
    bg: "#FFF8E1",
    iconColor: "#F57F17",
    border: "#FFE082",
  },
  {
    title: "Cycling Sessions",
    desc: "High-energy indoor cycling classes that torch calories.",
    Icon: Bike,
    bg: "#E3F2FD",
    iconColor: "#1565C0",
    border: "#90CAF9",
  },
  {
    title: "Nutrition Coaching",
    desc: "Personalised plans to fuel your training and recovery.",
    Icon: Apple,
    bg: "#F3E5F5",
    iconColor: "#6A1B9A",
    border: "#CE93D8",
  },
];

/* duplicate for seamless loop */
const items = [...services, ...services, ...services];

function Card({ s }: { s: typeof services[0] }) {
  return (
    <div
      className="shrink-0 w-[200px] sm:w-[220px] h-[300px] sm:h-[320px] rounded-[22px] flex flex-col justify-between p-6 border-2 relative overflow-hidden select-none"
      style={{ background: s.bg, borderColor: s.border }}
    >
      {/* Title top-left */}
      <h3
        className="font-display font-black text-[1.35rem] leading-tight tracking-tight"
        style={{ color: s.iconColor }}
      >
        {s.title}
      </h3>

      {/* Description */}
      <p className="text-[0.78rem] text-[#333] leading-relaxed mt-2 flex-1">
        {s.desc}
      </p>

      {/* Large icon — bottom right, faded */}
      <div
        className="absolute bottom-4 right-4 opacity-[0.18]"
        style={{ color: s.iconColor }}
      >
        <s.Icon size={110} strokeWidth={1.2} />
      </div>

      {/* Small icon — bottom left, solid */}
      <div
        className="w-11 h-11 rounded-2xl flex items-center justify-center mt-4 shrink-0"
        style={{ background: s.iconColor + "20", color: s.iconColor }}
      >
        <s.Icon size={22} strokeWidth={2} />
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section id="services" className="py-20 bg-white overflow-hidden">
      <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-black/[0.07] to-transparent" />

      {/* Header */}
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

      {/* Marquee row */}
      <div className="relative">
        {/* Left fade */}
        <div className="absolute inset-y-0 left-0 w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
        {/* Right fade */}
        <div className="absolute inset-y-0 right-0 w-20 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />

        <motion.div
          className="flex gap-5 px-10"
          animate={{ x: ["0%", "-33.33%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear", repeatType: "loop" }}
          style={{ width: "max-content" }}
        >
          {items.map((s, i) => (
            <Card key={i} s={s} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { Dumbbell, HeartPulse, Flame, Bike, User, Apple } from "lucide-react";

const services = [
  { title: "Personal Training",   desc: "One-on-one coaching built around your schedule and goals.",                      Icon: User,       bg: "#FFF3E0", iconColor: "#E65100", border: "#FFCC80" },
  { title: "Strength Training",   desc: "Progressive overload to build real, lasting muscle and power.",                  Icon: Dumbbell,   bg: "#E8F5E9", iconColor: "#2E7D32", border: "#A5D6A7" },
  { title: "Weight Loss",         desc: "Science-backed programs that shred fat while preserving muscle.",                Icon: HeartPulse, bg: "#FCE4EC", iconColor: "#C62828", border: "#F48FB1" },
  { title: "CrossFit",            desc: "Constantly varied functional movements at high intensity.",                      Icon: Flame,      bg: "#FFF8E1", iconColor: "#F57F17", border: "#FFE082" },
  { title: "Cycling Sessions",    desc: "High-energy indoor cycling classes that torch calories fast.",                   Icon: Bike,       bg: "#E3F2FD", iconColor: "#1565C0", border: "#90CAF9" },
  { title: "Nutrition Coaching",  desc: "Personalised plans to fuel your training and recovery.",                         Icon: Apple,      bg: "#F3E5F5", iconColor: "#6A1B9A", border: "#CE93D8" },
];

/* triple for seamless loop */
const items = [...services, ...services, ...services];

function Card({ s }: { s: typeof services[0] }) {
  return (
    <div
      className="shrink-0 w-[200px] h-[290px] rounded-[22px] flex flex-col justify-between p-6 border-2 relative overflow-hidden"
      style={{ background: s.bg, borderColor: s.border }}
    >
      {/* Title */}
      <h3 className="font-display font-black text-[1.25rem] leading-tight z-10 relative" style={{ color: s.iconColor }}>
        {s.title}
      </h3>

      {/* Desc */}
      <p className="text-[#555] text-[0.77rem] leading-relaxed mt-2 z-10 relative flex-1">{s.desc}</p>

      {/* Watermark icon */}
      <div className="absolute bottom-3 right-3 opacity-[0.15]" style={{ color: s.iconColor }}>
        <s.Icon size={110} strokeWidth={1} />
      </div>

      {/* Badge icon */}
      <div
        className="w-11 h-11 rounded-2xl flex items-center justify-center mt-4 shrink-0 z-10 relative"
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

      {/* Infinite scroll row */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
        <div className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />

        <motion.div
          className="flex gap-5 py-4 px-8"
          style={{ width: "max-content" }}
          animate={{ x: ["0%", "-33.333%"] }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear", repeatType: "loop" }}
        >
          {items.map((s, i) => <Card key={i} s={s} />)}
        </motion.div>
      </div>
    </section>
  );
}

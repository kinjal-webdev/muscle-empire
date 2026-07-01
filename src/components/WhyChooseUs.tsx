import { motion } from "framer-motion";
import { CheckCircle2, Trophy, Clock, Target, Users2, Activity } from "lucide-react";

const reasons = [
  { Icon: Trophy,       title: "Expert trainers",         desc: "Certified professionals with years of competitive and coaching experience.",       bg: "#FFF8E1", iconColor: "#F9A825", border: "#FFE082" },
  { Icon: Target,       title: "Personalised plans",      desc: "No cookie-cutter routines. Everything is tailored to your unique goals.",           bg: "#E8F5E9", iconColor: "#2E7D32", border: "#A5D6A7" },
  { Icon: Activity,     title: "Modern equipment",        desc: "Top-tier, biomechanically superior machines and extensive free weights.",           bg: "#E3F2FD", iconColor: "#1565C0", border: "#90CAF9" },
  { Icon: Users2,       title: "Supportive community",    desc: "Train alongside people who share your relentless drive for progress.",              bg: "#F3E5F5", iconColor: "#6A1B9A", border: "#CE93D8" },
  { Icon: Clock,        title: "Flexible timings",        desc: "Open early morning to late night — your schedule shouldn't limit your gains.",      bg: "#FCE4EC", iconColor: "#C62828", border: "#F48FB1" },
  { Icon: CheckCircle2, title: "Pro assessment",          desc: "Comprehensive body composition and movement analysis before you start.",            bg: "#E0F2F1", iconColor: "#00695C", border: "#80CBC4" },
];

const items = [...reasons, ...reasons, ...reasons];

function Card({ r }: { r: typeof reasons[0] }) {
  return (
    <div
      className="shrink-0 w-[200px] h-[290px] rounded-[22px] flex flex-col justify-between p-6 border-2 relative overflow-hidden"
      style={{ background: r.bg, borderColor: r.border }}
    >
      <h3 className="font-display font-black text-[1.25rem] leading-tight z-10 relative" style={{ color: r.iconColor }}>
        {r.title}
      </h3>
      <p className="text-[#555] text-[0.77rem] leading-relaxed mt-2 z-10 relative flex-1">{r.desc}</p>

      {/* Watermark */}
      <div className="absolute bottom-3 right-3 opacity-[0.15]" style={{ color: r.iconColor }}>
        <r.Icon size={110} strokeWidth={1} />
      </div>

      {/* Badge */}
      <div
        className="w-11 h-11 rounded-2xl flex items-center justify-center mt-4 shrink-0 z-10 relative"
        style={{ background: r.iconColor + "20", color: r.iconColor }}
      >
        <r.Icon size={22} strokeWidth={2} />
      </div>
    </div>
  );
}

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="py-20 bg-[#F7F6F3] overflow-hidden">
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

      {/* Infinite scroll row — scrolls right (opposite direction to Services) */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none bg-gradient-to-r from-[#F7F6F3] to-transparent" />
        <div className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none bg-gradient-to-l from-[#F7F6F3] to-transparent" />

        <motion.div
          className="flex gap-5 py-4 px-8"
          style={{ width: "max-content" }}
          animate={{ x: ["-33.333%", "0%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear", repeatType: "loop" }}
        >
          {items.map((r, i) => <Card key={i} r={r} />)}
        </motion.div>
      </div>
    </section>
  );
}

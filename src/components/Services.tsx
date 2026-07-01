import { motion } from "framer-motion";
import { Dumbbell, HeartPulse, Flame, Bike, User, Apple } from "lucide-react";

const services = [
  {
    icon: User,
    title: "Personal training",
    desc: "One-on-one coaching built around your schedule, goals, and current fitness level.",
    accent: "#E8A820",
  },
  {
    icon: Dumbbell,
    title: "Strength training",
    desc: "Progressive overload programming designed to build real, lasting muscle and power.",
    accent: "#FF9500",
  },
  {
    icon: HeartPulse,
    title: "Weight loss",
    desc: "High-intensity, science-backed programs that shred body fat while preserving muscle.",
    accent: "#EF4444",
  },
  {
    icon: Flame,
    title: "CrossFit",
    desc: "Constantly varied functional movements performed at high intensity. Every session, different.",
    accent: "#F97316",
  },
  {
    icon: Bike,
    title: "Cycling sessions",
    desc: "High-energy indoor cycling classes that torch calories and boost cardiovascular fitness.",
    accent: "#06B6D4",
  },
  {
    icon: Apple,
    title: "Nutrition coaching",
    desc: "Personalised nutrition plans built to fuel your training, recovery, and long-term performance.",
    accent: "#22C55E",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-28 bg-[#F7F6F3] relative overflow-hidden">
      {/* Decorative top bar */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-black/[0.08] to-transparent" />

      <div className="max-w-7xl mx-auto px-5 md:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-xl mx-auto mb-16"
        >
          <div className="eyebrow justify-center mb-4">What we offer</div>
          <h2 className="font-display font-black text-[#1C1C1E] text-[clamp(2rem,4.5vw,2.9rem)] mb-4">
            Arsenal of <span className="text-gold-gradient">disciplines</span>
          </h2>
          <p className="text-[#666] text-[1rem] leading-relaxed">
            A complete suite of training modalities designed to build, shred, and optimise every aspect of your physicality.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((svc, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.075, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="card-light group p-7 cursor-default relative overflow-hidden"
            >
              {/* Icon */}
              <div
                className="w-13 h-13 rounded-2xl flex items-center justify-center mb-5 text-white transition-transform duration-300 group-hover:scale-110"
                style={{ width: 52, height: 52, backgroundColor: svc.accent + "18", color: svc.accent }}
              >
                <svc.icon size={24} strokeWidth={2} />
              </div>

              <h3 className="text-[#1C1C1E] font-bold text-[1.05rem] mb-2 capitalize">{svc.title}</h3>
              <p className="text-[#666] text-[0.88rem] leading-relaxed">{svc.desc}</p>

              {/* Accent bottom bar */}
              <div
                className="absolute bottom-0 left-6 right-6 h-[2px] rounded-t-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: svc.accent }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

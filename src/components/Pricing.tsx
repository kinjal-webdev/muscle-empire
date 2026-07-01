import { motion } from "framer-motion";
import { Dumbbell, Users, ArrowRight, Check } from "lucide-react";
import { useLocation } from "wouter";

const gyms = [
  {
    title: "Muscle Empire Gymnasium",
    subtitle: "Unisex",
    Icon: Dumbbell,
    tag: "For everyone",
    tagStyle: "bg-[#E8A820] text-[#1C1C1E]",
    desc: "A complete fitness destination with strength training, cardio, CrossFit, expert trainers, and premium equipment for all fitness levels.",
    price: "Starting from ₹1,500/month",
    features: ["Expert trainers", "Full strength & cardio equipment", "CrossFit sessions", "All fitness levels welcome"],
    href: "/unisex-gym-plans",
    featured: true,
  },
  {
    title: "Muscle Empire Crossfit Studio",
    subtitle: "Female only",
    Icon: Users,
    tag: "Ladies only",
    tagStyle: "bg-pink-500/15 text-pink-400 border border-pink-500/30",
    desc: "A dedicated women's space offering strength training, CrossFit, weight management, and personal coaching in a comfortable environment.",
    price: "Starting from ₹1,500/month",
    features: ["Women-only environment", "Personal coaching", "Weight management", "Crossfit & strength training"],
    href: "/female-gym-plans",
    featured: false,
  },
];

export default function Pricing() {
  const [, navigate] = useLocation();

  return (
    <section id="pricing" className="py-28 bg-[#1C1C1E] relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] rounded-full bg-[#E8A820]/[0.04] blur-[160px] pointer-events-none" />
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.05] to-transparent" />

      <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-xl mx-auto mb-16"
        >
          <div className="eyebrow justify-center mb-4">Membership plans</div>
          <h2 className="font-display font-black text-white text-[clamp(2rem,4.5vw,2.9rem)] mb-4">
            Invest in <span className="text-gold-gradient">yourself</span>
          </h2>
          <p className="text-white/50 text-[1rem] leading-relaxed">
            Two world-class facilities. One goal — your transformation.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {gyms.map((gym, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: i * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className={`relative flex flex-col rounded-[22px] p-8 border transition-all duration-300 hover:-translate-y-2 ${
                gym.featured
                  ? "bg-[#232325] border-[#E8A820]/35 shadow-[0_0_60px_rgba(255,193,7,0.08)]"
                  : "bg-[#141414] border-white/[0.07] hover:border-white/[0.14]"
              }`}
            >
              {/* Tag */}
              <span className={`absolute top-6 right-6 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${gym.tagStyle}`}>
                {gym.tag}
              </span>

              {/* Icon */}
              <div className={`w-[52px] h-[52px] rounded-2xl flex items-center justify-center mb-6 ${
                gym.featured ? "bg-[#E8A820]/14 text-[#E8A820]" : "bg-[#F7F6F3]/[0.05] text-white/50"
              }`}>
                <gym.Icon size={24} />
              </div>

              <h3 className="text-white font-black text-[1.2rem] tracking-tight mb-1 pr-20">{gym.title}</h3>
              <p className={`text-[11px] font-bold uppercase tracking-widest mb-5 ${gym.featured ? "text-[#E8A820]" : "text-pink-400"}`}>
                {gym.subtitle}
              </p>

              <div className={`w-8 h-[1.5px] mb-5 rounded-full ${gym.featured ? "bg-[#E8A820]" : "bg-[#F7F6F3]/15"}`} />

              <p className="text-white/45 text-[0.875rem] leading-relaxed mb-6 flex-1">{gym.desc}</p>

              {/* Features */}
              <ul className="space-y-2 mb-7">
                {gym.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2.5 text-[0.85rem] text-white/60">
                    <Check size={13} className={gym.featured ? "text-[#E8A820]" : "text-white/30"} strokeWidth={3} />
                    {f}
                  </li>
                ))}
              </ul>

              {/* Price */}
              <div className={`mb-5 px-5 py-3.5 rounded-xl border text-white font-black text-[1.05rem] ${
                gym.featured
                  ? "bg-[#E8A820]/[0.07] border-[#E8A820]/20"
                  : "bg-[#F7F6F3]/[0.03] border-white/[0.06]"
              }`}>
                {gym.price}
              </div>

              {/* CTA */}
              <button
                onClick={() => { sessionStorage.setItem("scroll_before_plans", String(window.scrollY)); navigate(gym.href); }}
                className={`w-full flex items-center justify-center gap-2 font-bold text-[13px] h-[52px] rounded-xl transition-all duration-200 ${
                  gym.featured
                    ? "btn-gold"
                    : "bg-[#F7F6F3]/[0.06] text-white border border-white/10 hover:bg-[#F7F6F3]/[0.11] hover:-translate-y-0.5"
                }`}
              >
                View all plans <ArrowRight size={15} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

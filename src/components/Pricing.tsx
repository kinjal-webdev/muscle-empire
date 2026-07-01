import { motion } from "framer-motion";
import { Dumbbell, Users, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";

const gyms = [
  {
    title: "Muscle Empire Gymnasium",
    subtitle: "Unisex",
    icon: Dumbbell,
    tag: "For Everyone",
    tagBg: "bg-[#FFC107] text-black",
    desc: "A complete fitness destination with strength training, cardio, crossfit, expert trainers, and premium equipment for all fitness levels.",
    price: "Starting from ₹1,500/month",
    href: "/unisex-gym-plans",
    featured: true,
  },
  {
    title: "Muscle Empire Crossfit Studio",
    subtitle: "Female Only",
    icon: Users,
    tag: "Ladies Only",
    tagBg: "bg-pink-500 text-white",
    desc: "A dedicated women's space offering strength, crossfit, weight management, personal training in a comfortable and encouraging environment.",
    price: "Starting from ₹1,500/month",
    href: "/female-gym-plans",
    featured: false,
  },
];

export default function Pricing() {
  const [, navigate] = useLocation();

  return (
    <section id="pricing" className="py-28 bg-[#1A1A1A] relative overflow-hidden">
      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#FFC107]/5 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="section-label justify-center mb-3" style={{ color: "#FFC107" }}>
            <span className="w-7 h-0.5 bg-[#FFC107] rounded-full inline-block" />
            Membership Plans
            <span className="w-7 h-0.5 bg-[#FFC107] rounded-full inline-block" />
          </div>
          <h3 className="font-display font-black text-[clamp(2rem,5vw,3rem)] text-white leading-tight tracking-tight mb-4">
            Invest in{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #FFC107, #FF8C00)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Yourself
            </span>
          </h3>
          <p className="text-white/55 text-lg">
            Two world-class facilities. One goal — your transformation.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 max-w-4xl mx-auto">
          {gyms.map((gym, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: idx * 0.15, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              className={`relative flex flex-col bg-[#242424] rounded-[22px] p-8 border transition-all duration-300 hover:-translate-y-2 ${
                gym.featured
                  ? "border-[#FFC107]/40 shadow-[0_0_48px_rgba(255,193,7,0.1)]"
                  : "border-white/[0.08] hover:border-white/20"
              }`}
            >
              {/* Tag */}
              <span className={`absolute top-6 right-6 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${gym.tagBg}`}>
                {gym.tag}
              </span>

              {/* Icon */}
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                gym.featured ? "bg-[#FFC107]/15 text-[#FFC107]" : "bg-white/[0.06] text-white/60"
              }`}>
                <gym.icon size={26} />
              </div>

              {/* Title */}
              <h4 className="text-xl font-black text-white tracking-tight mb-1 pr-16">
                {gym.title}
              </h4>
              <p className={`text-[11px] font-black uppercase tracking-widest mb-5 ${
                gym.featured ? "text-[#FFC107]" : "text-pink-400"
              }`}>
                {gym.subtitle}
              </p>

              {/* Divider */}
              <div className={`w-10 h-0.5 mb-5 rounded-full ${gym.featured ? "bg-[#FFC107]" : "bg-white/20"}`} />

              {/* Description */}
              <p className="text-white/50 text-sm leading-relaxed mb-8 flex-1">{gym.desc}</p>

              {/* Price band */}
              <div className={`mb-6 px-5 py-3.5 rounded-xl border ${
                gym.featured
                  ? "bg-[#FFC107]/[0.08] border-[#FFC107]/20"
                  : "bg-white/[0.04] border-white/[0.07]"
              }`}>
                <span className="text-white font-black text-lg">{gym.price}</span>
              </div>

              {/* CTA */}
              <button
                onClick={() => {
                  sessionStorage.setItem("scroll_before_plans", String(window.scrollY));
                  navigate(gym.href);
                }}
                className={`w-full flex items-center justify-center gap-2 font-black uppercase tracking-wide text-[13px] h-14 rounded-xl transition-all duration-200 ${
                  gym.featured
                    ? "bg-[#FFC107] text-black hover:bg-[#e6ae06] shadow-[0_4px_20px_rgba(255,193,7,0.3)] hover:shadow-[0_6px_28px_rgba(255,193,7,0.45)] hover:-translate-y-0.5"
                    : "bg-white/[0.07] text-white hover:bg-white/[0.13] border border-white/10"
                }`}
              >
                View All Plans <ArrowRight size={16} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

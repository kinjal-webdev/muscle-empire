import { motion } from "framer-motion";
import { Dumbbell, Users } from "lucide-react";
import { useLocation } from "wouter";

const gyms = [
  {
    title: "Muscle Empire Gymnasium",
    subtitle: "Unisex",
    icon: Dumbbell,
    tag: "For Everyone",
    tagColor: "bg-primary text-black",
    desc: "A complete fitness destination with strength training, cardio, crossfit, expert trainers, and access to premium gym equipment for all fitness levels.",
    price: "Starting from ₹1,500/month",
    href: "/unisex-gym-plans",
    popular: true,
  },
  {
    title: "Muscle Empire Crossfit Studio",
    subtitle: "Female Only",
    icon: Users,
    tag: "Ladies Only",
    tagColor: "bg-pink-600 text-white",
    desc: "A dedicated women's fitness space offering strength training, crossfit, weight management programs, personal training, and a comfortable workout environment.",
    price: "Starting from ₹1,500/month",
    href: "/female-gym-plans",
    popular: false,
  },
];

export default function Pricing() {
  const [, navigate] = useLocation();

  return (
    <section id="pricing" className="py-24 bg-secondary relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">

        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-primary font-bold uppercase tracking-[0.2em] mb-4 text-sm flex items-center justify-center gap-2">
            <span className="w-8 h-px bg-primary inline-block" />
            Membership Plans
            <span className="w-8 h-px bg-primary inline-block" />
          </h2>
          <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">
            Invest in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-600">
              Yourself
            </span>
          </h3>
          <p className="text-muted-foreground text-lg">
            Two world-class facilities. One goal — your transformation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {gyms.map((gym, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className={`relative bg-background border flex flex-col p-8 ${
                gym.popular
                  ? "border-primary shadow-[0_0_40px_rgba(255,208,0,0.12)]"
                  : "border-border"
              }`}
            >
              {/* Tag */}
              <span className={`absolute top-4 right-4 text-xs font-black uppercase tracking-widest px-3 py-1 ${gym.tagColor}`}>
                {gym.tag}
              </span>

              {/* Icon */}
              <div className="w-14 h-14 bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-6">
                <gym.icon size={28} />
              </div>

              {/* Title */}
              <h4 className="text-2xl font-black uppercase tracking-tight text-white mb-1">
                {gym.title}
              </h4>
              <p className="text-primary text-xs font-bold uppercase tracking-widest mb-4">
                {gym.subtitle}
              </p>

              {/* Divider */}
              <div className="w-12 h-px bg-primary mb-5" />

              {/* Description */}
              <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-1">
                {gym.desc}
              </p>

              {/* Price */}
              <div className="mb-6 p-4 bg-primary/5 border border-primary/20">
                <span className="text-white font-black text-lg">{gym.price}</span>
              </div>

              {/* CTA */}
              <button
                onClick={() => navigate(gym.href)}
                className="w-full bg-primary hover:bg-primary/90 text-black font-black uppercase tracking-widest h-14 text-sm transition-all shadow-[0_4px_20px_rgba(255,208,0,0.25)] hover:shadow-[0_4px_30px_rgba(255,208,0,0.4)]"
              >
                View All Plans →
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

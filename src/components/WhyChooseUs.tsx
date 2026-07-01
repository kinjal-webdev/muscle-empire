import { motion } from "framer-motion";
import { CheckCircle2, Trophy, Clock, Target, Users2, Activity } from "lucide-react";

const reasons = [
  { icon: Trophy,       title: "Expert trainers",          desc: "Certified professionals with years of competitive and coaching experience." },
  { icon: Target,       title: "Personalised plans",       desc: "No cookie-cutter routines. Everything is tailored to your unique goals." },
  { icon: Activity,     title: "Modern equipment",         desc: "Top-tier, biomechanically superior machines and extensive free weights." },
  { icon: Users2,       title: "Supportive community",     desc: "Train alongside individuals who share your relentless drive for progress." },
  { icon: Clock,        title: "Flexible timings",         desc: "Open early morning to late night. Your schedule shouldn't limit your gains." },
  { icon: CheckCircle2, title: "Professional assessment",  desc: "Comprehensive body and movement analysis before you start training." },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="py-24 bg-[#252528] relative overflow-hidden">
      {/* Subtle warm glow */}
      <div className="absolute inset-0 pointer-events-none opacity-30"
        style={{ backgroundImage: "radial-gradient(circle at 20% 50%, rgba(232,168,32,0.10) 0%, transparent 55%), radial-gradient(circle at 80% 80%, rgba(232,168,32,0.07) 0%, transparent 55%)" }}
      />

      <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-14 items-center">

          {/* Header */}
          <motion.div
            className="lg:w-1/3 w-full"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.16,1,0.3,1] }}
          >
            <div className="eyebrow mb-4">The Empire standard</div>
            <h2 className="font-display font-black text-[#F2EFE9] text-[clamp(2rem,4.5vw,2.9rem)] mb-5">
              Why train <span className="text-gold-gradient">with us?</span>
            </h2>
            <p className="text-[#F2EFE9]/50 text-[0.97rem] leading-relaxed">
              We demand excellence because you deserve results. From our equipment to our culture, every element is engineered for your success.
            </p>
          </motion.div>

          {/* Grid */}
          <div className="lg:w-2/3 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {reasons.map((r, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.55, ease: [0.16,1,0.3,1] }}
                  className="group flex gap-4 items-start p-5 bg-[#F7F6F3]/[0.04] border border-[#F7F6F3]/[0.08] rounded-2xl hover:bg-[#F7F6F3]/[0.07] hover:border-[#E8A820]/20 transition-all duration-250"
                >
                  <div className="w-10 h-10 shrink-0 text-[#E8A820] group-hover:scale-110 transition-transform duration-250">
                    <r.icon size={30} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-[#F2EFE9] font-bold text-[0.95rem] mb-1 capitalize">{r.title}</h4>
                    <p className="text-[#F2EFE9]/45 text-[0.84rem] leading-relaxed">{r.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

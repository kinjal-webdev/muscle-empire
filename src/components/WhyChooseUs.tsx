import { motion } from "framer-motion";
import { CheckCircle2, Trophy, Clock, Target, Users2, Activity } from "lucide-react";

const reasons = [
  { icon: Trophy, title: "Expert Trainers", desc: "Certified professionals with years of competitive and coaching experience." },
  { icon: Target, title: "Personalized Plans", desc: "No cookie-cutter routines. Everything is tailored to your unique physiology." },
  { icon: Activity, title: "Modern Equipment", desc: "Top-tier, biomechanically superior machines and extensive free weights." },
  { icon: Users2, title: "Supportive Community", desc: "Train alongside individuals who share your relentless drive for progress." },
  { icon: Clock, title: "Flexible Timings", desc: "Open early morning to late night. Your schedule shouldn't limit your gains." },
  { icon: CheckCircle2, title: "Professional Assessment", desc: "Comprehensive body composition and movement analysis before you start." },
];

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="py-24 bg-secondary relative overflow-hidden border-t border-b border-border/50">
      {/* Background Mesh */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
           style={{
             backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255, 208, 0, 0.15) 0%, transparent 50%), 
                               radial-gradient(circle at 80% 80%, rgba(255, 208, 0, 0.1) 0%, transparent 50%)`
           }}
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Header Side */}
          <motion.div 
            className="lg:w-1/3"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-primary font-bold uppercase tracking-[0.2em] mb-4 text-sm flex items-center gap-2">
              <span className="w-8 h-px bg-primary inline-block"></span>
              The Empire Standard
            </h2>
            <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-6">
              Why Train <br/> With Us?
            </h3>
            <p className="text-muted-foreground text-lg mb-8">
              We demand excellence because you deserve results. From our equipment to our culture, every element is engineered for your success.
            </p>
            <div className="hidden lg:block w-24 h-2 bg-primary clip-path-slant" />
          </motion.div>

          {/* Grid Side */}
          <div className="lg:w-2/3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reasons.map((reason, idx) => (
                <motion.div 
                  key={idx}
                  className="bg-background/80 backdrop-blur-sm border border-border p-6 flex gap-4 items-start group hover:bg-card transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                >
                  <div className="w-10 h-10 shrink-0 text-primary group-hover:scale-110 transition-transform">
                    <reason.icon size={32} strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold uppercase tracking-wide text-white mb-2">{reason.title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{reason.desc}</p>
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

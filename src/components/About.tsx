import { motion } from "framer-motion";
import { Dumbbell, Users, Target, Sparkles } from "lucide-react";
import aboutImg from "@/assets/images/about-img.png";

const features = [
  { icon: Dumbbell, title: "Modern Equipment", desc: "Top-tier machines for serious lifters." },
  { icon: Users, title: "Expert Trainers", desc: "Coaches who push you past your limits." },
  { icon: Target, title: "Personalized Programs", desc: "Tailored to your specific goals." },
  { icon: Sparkles, title: "Clean Facilities", desc: "Impeccably maintained environment." },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-secondary relative overflow-hidden">
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-4 border border-primary/20 pointer-events-none hidden md:block" />
            <div className="absolute -inset-4 bg-primary/10 translate-x-8 translate-y-8 pointer-events-none hidden md:block" />
            <div className="relative aspect-[4/5] overflow-hidden group">
              <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors duration-500" />
              <img 
                src={aboutImg} 
                alt="Trainer coaching an athlete" 
                className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
              />
            </div>
            {/* Floating Badge */}
            <motion.div 
              className="absolute -bottom-6 -right-6 md:-right-12 bg-background border border-white/10 p-6 shadow-2xl max-w-[200px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="text-4xl font-black text-primary mb-2 font-display">10+</div>
              <div className="text-sm font-bold uppercase tracking-wider text-muted-foreground leading-snug">
                Years of building champions
              </div>
            </motion.div>
          </motion.div>

          {/* Text Side */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-primary font-bold uppercase tracking-[0.2em] mb-4 text-sm flex items-center gap-2">
              <span className="w-8 h-px bg-primary inline-block"></span>
              About The Empire
            </h2>
            <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-6">
              Forged in <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Iron & Sweat</span>
            </h3>
            <p className="text-muted-foreground mb-8 text-lg leading-relaxed">
              Located in the heart of Ghatkopar West, Muscle Empire is more than a gym. It’s a sanctuary for those dedicated to self-mastery. We strip away the corporate polish to deliver an uncompromised training experience.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, idx) => (
                <motion.div 
                  key={idx}
                  className="flex items-start gap-4 p-4 rounded-none bg-background/50 border border-white/5 hover:border-primary/30 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + idx * 0.1, duration: 0.5 }}
                >
                  <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <feature.icon size={24} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white mb-1 uppercase text-sm tracking-wide">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { Dumbbell, HeartPulse, Flame, Bike, User, Apple } from "lucide-react";

const services = [
  { icon: User, title: "Personal Training", desc: "One-on-one coaching to maximize your results." },
  { icon: Dumbbell, title: "Strength Training", desc: "Build muscle, increase power, dominate." },
  { icon: HeartPulse, title: "Weight Loss", desc: "High-intensity programs to shred fat." },
  { icon: Flame, title: "CrossFit", desc: "Constantly varied functional movements." },
  { icon: Bike, title: "Cycling Sessions", desc: "High-energy indoor cycling classes." },
  { icon: Apple, title: "Nutrition Coaching", desc: "Fuel your body for optimal performance." },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

export default function Services() {
  return (
    <section id="services" className="py-24 bg-background relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-primary font-bold uppercase tracking-[0.2em] mb-4 text-sm flex items-center justify-center gap-2">
            <span className="w-8 h-px bg-primary inline-block"></span>
            What We Offer
            <span className="w-8 h-px bg-primary inline-block"></span>
          </h2>
          <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-6">
            Arsenal of <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-600">Disciplines</span>
          </h3>
          <p className="text-muted-foreground text-lg">
            A comprehensive suite of training modalities designed to build, shred, and optimize every aspect of your physicality.
          </p>
        </div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {services.map((service, idx) => (
            <motion.div 
              key={idx}
              variants={itemVariants}
              whileHover={{ 
                y: -10, 
                transition: { duration: 0.2 },
                boxShadow: "0 20px 40px -10px rgba(255,208,0,0.1)"
              }}
              className="bg-card border border-border p-8 relative overflow-hidden group cursor-default"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl group-hover:bg-primary/20 transition-colors duration-500 pointer-events-none" />
              
              <div className="w-14 h-14 bg-background border border-border flex items-center justify-center mb-6 text-white group-hover:text-primary group-hover:border-primary/50 transition-colors">
                <service.icon size={28} />
              </div>
              
              <h4 className="text-xl font-bold uppercase tracking-wide text-white mb-3 group-hover:text-primary transition-colors">{service.title}</h4>
              <p className="text-muted-foreground">{service.desc}</p>
              
              {/* Corner accent */}
              <div className="absolute bottom-0 right-0 w-8 h-8 flex items-end justify-end p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-2 h-2 bg-primary" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

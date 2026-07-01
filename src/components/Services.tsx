import { motion } from "framer-motion";
import { Dumbbell, HeartPulse, Flame, Bike, User, Apple } from "lucide-react";

const services = [
  { icon: User,       title: "Personal Training",  desc: "One-on-one coaching tailored to your goals. Your schedule, your pace." },
  { icon: Dumbbell,   title: "Strength Training",  desc: "Build muscle, increase power, and dominate every rep." },
  { icon: HeartPulse, title: "Weight Loss",         desc: "High-intensity science-backed programs to shred fat efficiently." },
  { icon: Flame,      title: "CrossFit",            desc: "Constantly varied functional movements at high intensity." },
  { icon: Bike,       title: "Cycling Sessions",    desc: "High-energy indoor cycling classes that torch calories." },
  { icon: Apple,      title: "Nutrition Coaching",  desc: "Expert nutrition plans to fuel your performance and recovery." },
];

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.55, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function Services() {
  return (
    <section id="services" className="py-28 bg-white relative overflow-hidden">
      {/* Subtle top pattern */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="section-label justify-center mb-3" style={{ color: "#FFC107" }}>
            <span className="w-7 h-0.5 bg-[#FFC107] rounded-full inline-block" />
            What We Offer
            <span className="w-7 h-0.5 bg-[#FFC107] rounded-full inline-block" />
          </div>
          <h3
            className="font-display font-black text-[clamp(2rem,5vw,3rem)] text-[#111] leading-tight tracking-tight mb-4"
          >
            Arsenal of{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #FFC107, #FF8C00)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Disciplines
            </span>
          </h3>
          <p className="text-[#555] text-lg font-medium">
            A complete suite of training modalities designed to build, shred, and
            optimise every aspect of your physicality.
          </p>
        </div>

        {/* Cards grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
        >
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              variants={cardVariants}
              className="group relative bg-white border border-black/[0.07] rounded-[18px] p-8 cursor-default
                         shadow-[0_2px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_36px_rgba(0,0,0,0.12)]
                         hover:-translate-y-1.5 transition-all duration-300"
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6
                           bg-[#FFC107]/10 text-[#FFC107] group-hover:bg-[#FFC107] group-hover:text-black
                           transition-colors duration-300"
              >
                <service.icon size={26} />
              </div>

              <h4 className="text-lg font-bold text-[#111] mb-2 tracking-tight">
                {service.title}
              </h4>
              <p className="text-[#666] text-sm leading-relaxed">{service.desc}</p>

              {/* Bottom yellow bar on hover */}
              <div className="absolute bottom-0 left-8 right-8 h-0.5 bg-[#FFC107] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

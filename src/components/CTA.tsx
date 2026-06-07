import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function CTA() {
  const scrollToContact = () => {
    const el = document.querySelector("#contact");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToPricing = () => {
    const el = document.querySelector("#pricing");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-32 relative overflow-hidden bg-black flex items-center justify-center">
      {/* Animated Noise & Glow Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-30 mix-blend-overlay" />
        <motion.div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/20 blur-[120px] rounded-full"
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto border border-white/10 bg-background/40 backdrop-blur-md p-12 md:p-20"
        >
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">
            Enough <span className="text-primary">Excuses.</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 font-medium mb-10 max-w-2xl mx-auto">
            The iron is waiting. The community is here. The only thing missing is your commitment.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <Button 
              size="lg"
              onClick={scrollToContact}
              className="w-full sm:w-auto bg-primary text-black hover:bg-primary/90 font-black uppercase tracking-widest text-lg h-16 px-12 clip-path-slant shadow-[0_0_40px_rgba(255,208,0,0.4)]"
            >
              Join The Empire
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={scrollToPricing}
              className="w-full sm:w-auto bg-transparent border-2 border-white text-white hover:bg-white hover:text-black font-black uppercase tracking-widest text-lg h-16 px-12 transition-colors"
            >
              View Pricing
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

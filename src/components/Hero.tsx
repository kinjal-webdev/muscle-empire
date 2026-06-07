import { useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/images/hero-bg.png";

export default function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 800], [1, 0]);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="home" className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-background pt-20">
      {/* Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0"
        style={{ y: y1, opacity }}
      >
        <div className="absolute inset-0 bg-background/60 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent z-10" />
        <img 
          src={heroBg} 
          alt="Dark Gym Interior" 
          className="w-full h-full object-cover object-center opacity-70"
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay z-20 pointer-events-none" />
      </motion.div>

      {/* Decorative Grid Lines */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div className="absolute top-0 bottom-0 left-1/4 w-px bg-white/10" />
        <div className="absolute top-0 bottom-0 left-2/4 w-px bg-white/10" />
        <div className="absolute top-0 bottom-0 left-3/4 w-px bg-white/10" />
      </div>

      <div className="container relative z-30 mx-auto px-4 md:px-6 flex flex-col items-center text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl flex flex-col items-center"
        >
          <motion.div variants={itemVariants} className="mb-4 inline-flex items-center gap-2 px-3 py-1 bg-white/5 backdrop-blur-sm border border-white/10 text-primary uppercase tracking-[0.2em] text-xs font-bold">
            <span className="w-2 h-2 bg-primary animate-pulse" />
            Ghatkopar's Elite Arena
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[0.9] mb-6 drop-shadow-2xl"
          >
            Transform <span className="text-transparent bg-clip-text bg-gradient-to-br from-primary to-yellow-600">Your Body.</span><br/>
            Elevate Your Life.
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 font-medium"
          >
            This isn't a friendly neighborhood gym—it's an arena. Raw power meets precision engineering. Step in, put in the work, and earn your results.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Button 
              size="lg" 
              className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 font-bold uppercase tracking-widest rounded-none clip-path-slant h-14 px-10 text-lg shadow-[0_0_30px_rgba(255,208,0,0.3)] hover:shadow-[0_0_40px_rgba(255,208,0,0.5)] transition-all"
              onClick={() => scrollToSection("#contact")}
            >
              Start Training
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="w-full sm:w-auto border-2 border-white/20 text-white hover:bg-white hover:text-black font-bold uppercase tracking-widest rounded-none h-14 px-10 text-lg transition-colors backdrop-blur-sm bg-black/20"
              onClick={() => scrollToSection("#pricing")}
            >
              View Programs
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

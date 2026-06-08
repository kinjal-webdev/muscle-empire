import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

const testimonials = [
  {
    quote: "Excellent staff and friendly environment. The equipment is top-notch and always well-maintained. Best gym in Ghatkopar hands down.",
    author: "Rohan K.",
    role: "Member since 2021",
    rating: 5
  },
  {
    quote: "Great place to work out! The energy here is infectious. You step in and immediately want to push yourself harder.",
    author: "Priya M.",
    role: "Member since 2023",
    rating: 5
  },
  {
    quote: "Trainers are very helpful and advise people according to their requirements. They don't just count reps, they fix your form.",
    author: "Amit S.",
    role: "Personal Training Client",
    rating: 5
  },
  {
    quote: "I've been to many commercial gyms, but Muscle Empire has a distinct raw vibe that actually makes you want to lift heavy.",
    author: "Karan D.",
    role: "Powerlifter",
    rating: 5
  },
  {
    quote: "The cleanliness and hygiene standards are impressive, especially during peak hours. Worth every penny of the membership.",
    author: "Sneha T.",
    role: "Regular Member",
    rating: 4
  }
];

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    
    // Autoplay
    const autoplay = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);
    
    return () => clearInterval(autoplay);
  }, [emblaApi, onSelect]);

  return (
    <section id="reviews" className="py-24 bg-background relative overflow-hidden border-t border-border/30">
      {/* Decorative large quote mark */}
      <div className="absolute top-10 left-10 text-primary/5 pointer-events-none">
        <Quote size={200} />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-primary font-bold uppercase tracking-[0.2em] mb-4 text-sm flex items-center justify-center gap-2">
            <span className="w-8 h-px bg-primary inline-block"></span>
            Word on the Street
            <span className="w-8 h-px bg-primary inline-block"></span>
          </h2>
          <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
            Built on <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Results</span>
          </h3>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Embla Viewport */}
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex touch-pan-y">
              {testimonials.map((testimonial, idx) => (
                <div key={idx} className="flex-[0_0_100%] min-w-0 px-4 md:px-12">
                  <div className="flex flex-col items-center text-center">
                    <div className="flex gap-1 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={20} 
                          className={i < testimonial.rating ? "text-primary fill-primary" : "text-border"} 
                        />
                      ))}
                    </div>
                    <p className="text-2xl md:text-3xl font-display font-medium leading-tight text-white mb-8">
                      "{testimonial.quote}"
                    </p>
                    <div className="w-12 h-px bg-primary mb-6" />
                    <h4 className="font-bold uppercase tracking-widest text-white">{testimonial.author}</h4>
                    <span className="text-sm text-muted-foreground">{testimonial.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center mt-12 gap-6">
            <button 
              onClick={scrollPrev}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-white hover:border-primary hover:text-primary transition-colors"
            >
              <ChevronLeft size={24} />
            </button>
            
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollTo(idx)}
                  className={`h-2 transition-all duration-300 ${
                    selectedIndex === idx ? "w-8 bg-primary" : "w-2 bg-border hover:bg-white/50"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button 
              onClick={scrollNext}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-white hover:border-primary hover:text-primary transition-colors"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

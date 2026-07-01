import { useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

const reviews = [
  { name: "Atharva Sawant",      rating: 5, text: "Muscle Empire in Ghatkopar is an absolute gem! Well-equipped with top-notch machinery. Big shoutout to trainers Rohit Yadav and Pankaj Nikam — incredibly knowledgeable and supportive." },
  { name: "Pawan Kale",          rating: 5, text: "Fantastic experience! Facilities are clean, staff is friendly. Specially Pankaj and Rohit — knowledgeable trainers with a variety of equipment that caters to all fitness levels." },
  { name: "Ujvala Pokharkar",    rating: 5, text: "Really good place with great trainers. Good rack of weights and equipment. If you are serious about your fitness goals and need guidance, I highly recommend this gym." },
  { name: "Bhagyashree Birmole", rating: 5, text: "Muscle Empire (ladies) is a perfect gym with amazing facilities. Tejal ma'am and Bhavesh sir are very helpful and always encourage everyone to exercise." },
  { name: "Pratik Shetty",       rating: 5, text: "Excellent gym! Great equipment, supportive trainers, and a motivating environment. Highly recommended for anyone serious about fitness." },
  { name: "Ankita Borhde",       rating: 5, text: "Muscle Empire (ladies) is a perfect gym. Tejal ma'am and Bhavesh sir are very helpful and provide proper guidance. Highly recommend!" },
  { name: "Pravin Chavan",       rating: 5, text: "Great place to work out! The trainers ensure discipline — that's the biggest plus point. My age is 41 and I would like to continue this gym for at least the next 10 years." },
  { name: "Aakansha Shinde",     rating: 5, text: "One of the finest gyms I've ever found. Ms. Tejal and Mr. Bhavesh are well-trained with ample knowledge. It has been almost a year working with these amazing trainers." },
  { name: "Aakanksha Bhor",      rating: 5, text: "Excellent place. Clean and great environment. Tejal Mam (Tai) is such a humble and great person — always there to motivate us." },
  { name: "Trupti Vali",         rating: 5, text: "Best gym and trainers. They always give you attention and correct your form. Tejal mam always encourages everyone to exercise." },
  { name: "Ravi Auti",           rating: 5, text: "Perfect gym with multiple facilities — workout training, proper diet plans, yearly membership offers. Trainers are very helpful throughout." },
  { name: "Aniket Joshi",        rating: 5, text: "Gym is good for health. I recommend Muscle Empire as the best gym for body gain. Best gym trainers available." },
  { name: "Krushna Borhade",     rating: 5, text: "I have seen real progress in my body since I joined. It is all thanks to the trainers who are absolutely amazing." },
  { name: "Dipti Karbele",       rating: 5, text: "Amazing gym. Graceful environment, good service with friendly trainers and a clean, comfortable ladies gym." },
  { name: "Bhagyashri More",     rating: 5, text: "Amazing facility! Trainers are super nice and take an interest in you no matter what fitness level you're at." },
  { name: "Ritika Kamble",       rating: 5, text: "The best gym! The knowledgeable trainers (Tai and Bhavesh dada) and quality equipment make every workout a success." },
  { name: "Smit Salunke",        rating: 5, text: "Best gym for hardcore and passionate workout within Bhatwadi, Ghatkopar — with very kind and supportive owner and trainers." },
  { name: "Hrishikesh Lodhi",    rating: 5, text: "Excellent gym. Well maintained. Trainers are very supportive and always ready to help you improve." },
  { name: "Devarsh Kanaskar",    rating: 5, text: "A great place to achieve your fitness goals with professional support! Excellent staff and a friendly environment." },
  { name: "Ashlyn Fernandes",    rating: 5, text: "Well maintained gym, decent and professional trainers. Especially Pankaj — the best personal trainer." },
  { name: "Siddhesh Salunke",    rating: 5, text: "Awesome gym! Supportive trainers who are always there to push you to your limits." },
  { name: "Saurabh Khilari",     rating: 5, text: "Excellent environment, professionalism and well-equipped gym. Really happy with my membership here." },
  { name: "Rahul Rokade",        rating: 5, text: "Excellent staff and friendly environment. Always a pleasure to work out at Muscle Empire." },
  { name: "Haresh Maskar",       rating: 5, text: "Excellent environment, professionalism and well-equipped gym. One of the best gyms in the area." },
  { name: "DP Pictures",         rating: 5, text: "Muscle Empire Gymnasium is a great place for whoever is looking to achieve their fitness goals. Highly recommended!" },
  { name: "Google TV Account",   rating: 4, text: "Decent gym with good facilities. This review is for Bhatwadi gym (men's). Overall a solid place to train." },
];

const palette = ["#B45309","#C2410C","#991B1B","#1D4ED8","#6D28D9","#0F766E","#15803D","#9D174D"];

function Avatar({ name }: { name: string }) {
  const initials = name.split(" ").slice(0,2).map(n => n[0]).join("").toUpperCase();
  const bg = palette[name.charCodeAt(0) % palette.length];
  return (
    <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-black text-sm shrink-0" style={{ background: bg }}>
      {initials}
    </div>
  );
}

function Card({ r }: { r: (typeof reviews)[0] }) {
  return (
    <div className="flex-[0_0_86%] sm:flex-[0_0_43%] lg:flex-[0_0_29%] min-w-0 bg-white border border-black/[0.06] rounded-[18px] p-6 flex flex-col gap-4 shadow-[0_2px_14px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)] transition-shadow duration-300">
      <div className="flex items-center gap-3">
        <Avatar name={r.name} />
        <div className="flex-1 min-w-0">
          <p className="text-[#0d0d0d] font-bold text-sm truncate">{r.name}</p>
          <p className="text-[#999] text-xs">Verified member</p>
        </div>
        <Quote size={18} className="text-[#FFC107]/40 shrink-0" />
      </div>
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }, (_, i) => (
          <Star key={i} size={12} className={i < r.rating ? "fill-[#FFC107] text-[#FFC107]" : "fill-[#E5E7EB] text-[#E5E7EB]"} />
        ))}
      </div>
      <p className="text-[#555] text-[0.85rem] leading-relaxed flex-1 line-clamp-4">"{r.text}"</p>
    </div>
  );
}

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const next = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const t = setInterval(next, 3600);
    return () => clearInterval(t);
  }, [emblaApi, next]);

  return (
    <section id="reviews" className="py-28 bg-[#F6F7F9] relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-black/[0.08] to-transparent" />

      <div className="max-w-7xl mx-auto px-5 md:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-6"
        >
          <div className="eyebrow justify-center mb-4">Word on the street</div>
          <h2 className="font-display font-black text-[#0d0d0d] text-[clamp(2rem,4.5vw,2.9rem)]">
            Real people. <span className="text-gold-gradient">Real results.</span>
          </h2>
        </motion.div>

        {/* Rating summary */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="flex items-center justify-center gap-3 mb-12"
        >
          <div className="flex gap-0.5">
            {Array.from({ length: 5 }, (_, i) => (
              <Star key={i} size={18} className="fill-[#FFC107] text-[#FFC107]" />
            ))}
          </div>
          <span className="text-[#0d0d0d] font-black text-[1.1rem]">5.0</span>
          <span className="text-[#888] text-sm">({reviews.length} reviews)</span>
        </motion.div>

        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4">
            {reviews.map((r, i) => <Card key={i} r={r} />)}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-1.5 mt-7 flex-wrap">
          {reviews.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              className="w-1.5 h-1.5 rounded-full bg-black/15 hover:bg-[#FFC107] transition-colors"
              aria-label={`Go to review ${i + 1}`}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-10">
          <motion.a
            href="https://share.google/JxC3WJxV6YViUdr2n"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            className="btn-gold inline-flex items-center gap-2 text-[13.5px] px-8 py-3.5"
          >
            <Star size={14} className="fill-black text-black" />
            Review us on Google
          </motion.a>
        </div>

      </div>
    </section>
  );
}

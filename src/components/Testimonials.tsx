import { useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

const baseReviews = [
  { name: "Atharva Sawant",       rating: 5, text: "Muscle Empire Gymnasium in Ghatkopar is an absolute gem! Well-equipped with top-notch machinery. Big shoutout to trainers Rohit Yadav and Pankaj Nikam — incredibly knowledgeable and supportive." },
  { name: "Pawan Kale",           rating: 5, text: "Fantastic experience! The facilities are clean, staff is friendly. Specially Pankaj and Rohit — knowledgeable trainers, variety of equipment caters to all fitness levels." },
  { name: "Ujvala Pokharkar",     rating: 5, text: "Really good place with great trainers. Good rack of weights and equipment. If you are serious about your fitness goals and need guidance, I highly recommend this gym." },
  { name: "Bhagyashree Birmole",  rating: 5, text: "Muscle Empire (ladies) is a perfect gym with amazing facilities. Tejal ma'am and Bhavesh sir are very helpful and always encourage everyone to exercise." },
  { name: "Pratik Shetty",        rating: 5, text: "Excellent gym! Great equipment, supportive trainers, and a motivating environment. Highly recommended." },
  { name: "Ankita Borhde",        rating: 5, text: "Muscle Empire (ladies) is a perfect gym. Tejal ma'am and Bhavesh sir are very helpful and provide proper guidance. Highly recommend!" },
  { name: "Pravin Chavan",        rating: 5, text: "Great place to work out! The trainers are like old school teachers who ensure discipline. My age is 41 and I would like to continue this gym for at least the next 10 years!!!" },
  { name: "Aakansha Shinde",      rating: 5, text: "One of the finest gyms ever found. Ms. Tejal and Mr. Bhavesh are well trained with ample knowledge. It has been almost a year working with these amazing trainers." },
  { name: "Aakanksha Bhor",       rating: 5, text: "Excellent place. Clean and good environment. Tejal Mam (Tai) is such a humble and great person — always there to motivate us." },
  { name: "Trupti Vali",          rating: 5, text: "Best gym and trainers. They always give you attention and correct your form. Tejal mam always encourages everyone for exercise." },
  { name: "Ravi Auti",            rating: 5, text: "Perfect gym with multiple facilities — workout training, proper diet plans, yearly membership offers. Trainers are very helpful." },
  { name: "Aniket Joshi",         rating: 5, text: "Gym is good for health. I recommend Muscle Empire as the best gym for health and body gain. Best gym trainers available." },
  { name: "Krushna Borhade",      rating: 5, text: "I have seen progress in my body since I joined. It is all thanks to the trainers who are absolutely amazing." },
  { name: "Dipti Karbele",        rating: 5, text: "Amazing gym. Graceful environment. Good service with friendly trainers and a clean, comfortable ladies gym for girls." },
  { name: "Bhagyashri More",      rating: 5, text: "Amazing facility! Trainers are super nice and take an interest in you no matter what fitness level you're at." },
  { name: "Ritika Kamble",        rating: 5, text: "The best gym! The knowledgeable trainers (Tai and Bhavesh dada) and quality equipment make every workout a success." },
  { name: "Smit Salunke",         rating: 5, text: "Best gym for hardcore and passionate workout within Bhatwadi, Ghatkopar — with very kind and supportive gym owner and trainers." },
  { name: "Hrishikesh Lodhi",     rating: 5, text: "Excellent gym. Well maintained. Trainers are very supportive and always ready to help you improve." },
  { name: "Devarsh Kanaskar",     rating: 5, text: "A great place to achieve your fitness goals with professional support! Excellent staff and friendly environment." },
  { name: "Ashlyn Fernandes",     rating: 5, text: "Well maintained gym, decent and professional trainers. Especially Pankaj — best personal trainer." },
  { name: "Siddhesh Salunke",     rating: 5, text: "Awesome gym! Supportive trainers who are always there to push you to your limits." },
  { name: "Saurabh Khilari",      rating: 5, text: "Excellent environment, professionalism and well equipped gym. Really happy with my membership here." },
  { name: "Rahul Rokade",         rating: 5, text: "Excellent staff and friendly environment of gym. Always a pleasure to work out here." },
  { name: "Haresh Maskar",        rating: 5, text: "Excellent environment, professionalism and well equipped gym. One of the best gyms in the area." },
  { name: "DP Pictures",          rating: 5, text: "Muscle Empire Gymnasium is a great place for whoever is looking for fitness goals. Highly recommended!" },
  { name: "googleTvAccount",      rating: 4, text: "Decent gym with good facilities. This review is for Bhatwadi gym (men's). Overall a solid place to train." },
];

const avatarColors = [
  "#D97706","#EA580C","#B91C1C",
  "#1D4ED8","#7C3AED","#0F766E",
  "#15803D","#BE185D",
];

function Avatar({ name }: { name: string }) {
  const initials = name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
  const color = avatarColors[name.charCodeAt(0) % avatarColors.length];
  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm shrink-0"
      style={{ backgroundColor: color }}
    >
      {initials}
    </div>
  );
}

function ReviewCard({ review }: { review: (typeof baseReviews)[0] }) {
  return (
    <div className="flex-[0_0_88%] sm:flex-[0_0_44%] lg:flex-[0_0_30%] min-w-0 bg-white border border-black/[0.07] rounded-[18px] p-6 flex flex-col gap-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_8px_28px_rgba(0,0,0,0.1)] transition-shadow duration-300">
      <div className="flex items-center gap-3">
        <Avatar name={review.name} />
        <div className="flex-1 min-w-0">
          <p className="text-[#111] font-bold text-sm truncate">{review.name}</p>
          <p className="text-[#888] text-xs truncate">Verified Member</p>
        </div>
      </div>
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={13}
            className={i < review.rating ? "fill-[#FFC107] text-[#FFC107]" : "text-[#DDD] fill-[#DDD]"}
          />
        ))}
      </div>
      <p className="text-[#555] text-sm leading-relaxed flex-1">"{review.text}"</p>
    </div>
  );
}

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start", slidesToScroll: 1 });
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const timer = setInterval(scrollNext, 3500);
    return () => clearInterval(timer);
  }, [emblaApi, scrollNext]);

  return (
    <section id="reviews" className="py-28 bg-[#F2F2F2] relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-6">
          <div className="section-label justify-center mb-3" style={{ color: "#FFC107" }}>
            <span className="w-7 h-0.5 bg-[#FFC107] rounded-full inline-block" />
            Word on the Street
            <span className="w-7 h-0.5 bg-[#FFC107] rounded-full inline-block" />
          </div>
          <h3 className="font-display font-black text-[clamp(2rem,5vw,3rem)] text-[#111] leading-tight tracking-tight">
            Real People.{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #FFC107, #FF8C00)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Real Results.
            </span>
          </h3>
        </div>

        {/* Stars summary */}
        <div className="flex items-center justify-center gap-2 mb-12">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={18} className="fill-[#FFC107] text-[#FFC107]" />
            ))}
          </div>
          <span className="text-[#111] font-black text-lg">5.0</span>
          <span className="text-[#888] text-sm font-medium">({baseReviews.length} reviews)</span>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-5">
            {baseReviews.map((review, idx) => (
              <ReviewCard key={idx} review={review} />
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-1.5 mt-8 flex-wrap">
          {baseReviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => emblaApi?.scrollTo(idx)}
              className="w-1.5 h-1.5 rounded-full bg-black/15 hover:bg-[#FFC107] transition-colors"
              aria-label={`Go to review ${idx + 1}`}
            />
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-10">
          <motion.a
            href="https://share.google/JxC3WJxV6YViUdr2n"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 bg-[#FFC107] text-black font-black uppercase tracking-wide text-sm px-8 py-3.5 rounded-xl shadow-[0_4px_20px_rgba(255,193,7,0.35)] hover:bg-[#e6ae06] hover:shadow-[0_6px_28px_rgba(255,193,7,0.45)] transition-all duration-200"
          >
            <Star size={15} className="fill-black text-black" />
            Review Us on Google
          </motion.a>
        </div>
      </div>
    </section>
  );
}

import { useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

const reviews = [
  {
    name: "Atharva Sawant",
    role: "Local Guide · 13 reviews",
    rating: 5,
    text: "Muscle Empire Gymnasium in Ghatkopar is an absolute gem for fitness enthusiasts! Well-equipped with top-notch machinery maintained impeccably. Big shoutout to trainers Rohit Yadav and Pankaj Nikam — incredibly knowledgeable and supportive.",
  },
  {
    name: "Pawan Kale",
    role: "6 reviews",
    rating: 5,
    text: "Fantastic experience! The facilities are clean, staff is friendly. Specially Pankaj and Rohit — both trainers are knowledgeable, and the variety of equipment caters to all fitness levels. The positive atmosphere makes every workout enjoyable.",
  },
  {
    name: "Ujvala Pokharkar",
    role: "1 review",
    rating: 5,
    text: "Really good place with great trainers. They have a good rack of weights and equipment. If you are serious about your fitness goals and need guidance, I highly recommend this gym.",
  },
  {
    name: "Bhagyashree Birmole",
    role: "3 reviews",
    rating: 5,
    text: "Muscle Empire (ladies) is a perfect gym with amazing facilities. Tejal ma'am and Bhavesh sir are very helpful, provide proper guidance and always encourage everyone to exercise. A great place to achieve your fitness goals.",
  },
  {
    name: "Pratik Shetty",
    role: "1 review",
    rating: 5,
    text: "Excellent gym! I'm glad to be a member of Muscle Empire Gymnasium. Great equipment, supportive trainers, and a motivating environment. Highly recommended.",
  },
  {
    name: "Ankita Borhde",
    role: "1 review",
    rating: 5,
    text: "Muscle Empire (ladies) is a perfect gym with amazing facilities. Tejal ma'am and Bhavesh sir are very helpful and provide proper guidance. Highly recommend!",
  },
  {
    name: "Pravin Chavan",
    role: "3 reviews",
    rating: 5,
    text: "Great place to work out! The trainers are like old school teachers who ensure discipline. My age is 41 and I would like to continue this gym for at least the next 10 years!!!",
  },
  {
    name: "Aakansha Shinde",
    role: "8 reviews",
    rating: 5,
    text: "One of the finest gyms ever found. Ms. Tejal and Mr. Bhavesh are well trained with ample knowledge. It has been almost a year working with these amazing trainers.",
  },
  {
    name: "Aakanksha Bhor",
    role: "1 review",
    rating: 5,
    text: "Excellent place. Clean and good environment. Tejal Mam (Tai) is such a humble and great person — always there to motivate us and gives a lot of information related to exercise form and diet.",
  },
  {
    name: "Trupti Vali",
    role: "5 reviews · 1 photo",
    rating: 5,
    text: "Best gym and trainers. They always give you attention and correct your form. Tejal mam always encourages everyone for exercise and helps improve your strength.",
  },
  {
    name: "Ravi Auti",
    role: "1 review · 9 photos",
    rating: 5,
    text: "Perfect gym with multiple facilities — workout training, proper diet plans, yearly membership offers. Trainers are very helpful and advise people as per their requirements.",
  },
  {
    name: "Aniket Joshi",
    role: "1 review",
    rating: 5,
    text: "Gym is good for health. I recommend Muscle Empire as the best gym for health and body gain. Best gym trainers available for our service.",
  },
  {
    name: "Krushna Borhade",
    role: "1 review",
    rating: 5,
    text: "I have seen progress in my body since I joined this gym. It is all thanks to the trainers who are absolutely amazing — their help is the reason for my transformation.",
  },
  {
    name: "Dipti Karbele",
    role: "2 reviews",
    rating: 5,
    text: "Amazing gym. Graceful environment. Good service with friendly trainers and a clean, comfortable ladies gym for girls.",
  },
  {
    name: "Bhagyashri More",
    role: "1 review",
    rating: 5,
    text: "Amazing facility! Trainers are super nice and take an interest in you no matter what fitness level you're at. I love how they give tips and tricks to get the most out of every workout.",
  },
  {
    name: "Ritika Kamble",
    role: "4 reviews",
    rating: 5,
    text: "The best gym! The knowledgeable trainers (Tai and Bhavesh dada) and quality equipment make every workout a success.",
  },
  {
    name: "Smit Salunke",
    role: "4 reviews",
    rating: 5,
    text: "Best gym for hardcore and passionate workout within the locality of Bhatwadi, Ghatkopar — with very kind and supportive gym owner and trainers.",
  },
  {
    name: "DP Pictures",
    role: "1 review",
    rating: 5,
    text: "Muscle Empire Gymnasium is a great place for whoever is looking for fitness and gymnastics goals. Highly recommended!",
  },
  {
    name: "Hrishikesh Lodhi",
    role: "5 reviews",
    rating: 5,
    text: "Excellent gym. Well maintained. Trainers are very supportive and always ready to help you improve.",
  },
  {
    name: "Devarsh Kanaskar",
    role: "2 reviews",
    rating: 5,
    text: "A great place to achieve your fitness goals with professional support! Excellent staff and friendly environment.",
  },
  {
    name: "Ashlyn Fernandes",
    role: "1 review",
    rating: 5,
    text: "Well maintained gym, decent and professional trainers. Especially Pankaj — best personal trainer.",
  },
  {
    name: "Siddhesh Salunke",
    role: "2 reviews",
    rating: 5,
    text: "Awesome gym! 🔥 Supportive trainers who are always there to push you to your limits.",
  },
  {
    name: "Sid",
    role: "1 review",
    rating: 5,
    text: "Great place to achieve your fitness goals with professional support! The trainers really know their stuff and the equipment is always available.",
  },
  {
    name: "Saurabh Khilari",
    role: "1 review",
    rating: 5,
    text: "Excellent environment, professionalism and well equipped gym. Really happy with my membership here.",
  },
  {
    name: "Rahul Rokade",
    role: "1 review · 1 photo",
    rating: 5,
    text: "Excellent staff and friendly environment of gym. Always a pleasure to work out here.",
  },
  {
    name: "Haresh Maskar",
    role: "2 reviews",
    rating: 5,
    text: "Excellent environment, professionalism and well equipped gym. One of the best gyms in the area.",
  },
  {
    name: "googleTvAccount",
    role: "4 reviews",
    rating: 4,
    text: "Decent gym with good facilities. This review is for Bhatwadi gym (men's). Overall a solid place to train with good equipment.",
  },
];

const avatarColors = [
  "bg-yellow-600", "bg-orange-600", "bg-red-700",
  "bg-blue-700", "bg-purple-700", "bg-teal-700",
  "bg-green-700", "bg-pink-700",
];

function Avatar({ name }: { name: string }) {
  const initials = name.split(" ").map((n) => n[0]).slice(0, 2).join("").toUpperCase();
  const color = avatarColors[name.charCodeAt(0) % avatarColors.length];
  return (
    <div className={`w-10 h-10 rounded-full ${color} flex items-center justify-center text-white font-black text-sm shrink-0`}>
      {initials}
    </div>
  );
}

export default function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });

  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  // Auto-slide every 3.5 seconds
  useEffect(() => {
    if (!emblaApi) return;
    const timer = setInterval(scrollNext, 3500);
    return () => clearInterval(timer);
  }, [emblaApi, scrollNext]);

  return (
    <section id="reviews" className="py-24 bg-background relative overflow-hidden border-t border-border/30">
      {/* Decorative quote */}
      <div className="absolute top-10 left-10 text-primary/5 pointer-events-none">
        <Quote size={160} />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-4">
          <h2 className="text-primary font-bold uppercase tracking-[0.2em] mb-4 text-sm flex items-center justify-center gap-2">
            <span className="w-8 h-px bg-primary inline-block" />
            Word on the Street
            <span className="w-8 h-px bg-primary inline-block" />
          </h2>
          <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">
            Real People.{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-600">
              Real Results.
            </span>
          </h3>
        </div>

        {/* Google rating summary */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={18} className="text-primary fill-primary" />
            ))}
          </div>
          <span className="text-white font-black text-lg">5.0</span>
        </div>

        {/* Carousel */}
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-5">
            {reviews.map((review, idx) => (
              <motion.div
                key={idx}
                className="flex-[0_0_90%] sm:flex-[0_0_45%] lg:flex-[0_0_31%] min-w-0 bg-card border border-border p-6 flex flex-col gap-4 hover:border-primary/40 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.03, duration: 0.4 }}
              >
                {/* Reviewer */}
                <div className="flex items-center gap-3">
                  <Avatar name={review.name} />
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-bold text-sm truncate">{review.name}</p>
                    <p className="text-muted-foreground text-xs truncate">{review.role}</p>
                  </div>
                </div>

                {/* Stars */}
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={13} className={i < review.rating ? "text-primary fill-primary" : "text-border"} />
                  ))}
                </div>

                {/* Text */}
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                  "{review.text}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-1.5 mt-8">
          {reviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => emblaApi?.scrollTo(idx)}
              className="w-1.5 h-1.5 rounded-full bg-border hover:bg-primary transition-colors"
              aria-label={`Go to review ${idx + 1}`}
            />
          ))}
        </div>

        {/* Review Us CTA */}
        <div className="flex justify-center mt-6">
          <a
            href="https://share.google/JxC3WJxV6YViUdr2n"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-black font-black uppercase tracking-widest text-sm px-8 py-3 transition-colors"
          >
            ⭐ Review Us on Google
          </a>
        </div>
      </div>
    </section>
  );
}

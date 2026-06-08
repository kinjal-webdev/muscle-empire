import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Quote, ChevronDown } from "lucide-react";

const reviews = [
  {
    name: "Atharva Sawant",
    role: "Local Guide · 13 reviews",
    rating: 5,
    text: "Muscle Empire Gymnasium in Ghatkopar is an absolute gem for fitness enthusiasts! The gym is well-equipped with top-notch machinery and maintained impeccably. A big shoutout to the trainers, Rohit Yadav and Pankaj Nikam, who are incredibly knowledgeable and supportive.",
  },
  {
    name: "Pawan Kale",
    role: "6 reviews",
    rating: 5,
    text: "I've had a fantastic experience at this gym! The facilities are clean, the staff is friendly. Specially Pankaj and Rohit both the trainers are knowledgeable, and the variety of equipment caters to all fitness levels. The positive atmosphere makes every workout enjoyable.",
  },
  {
    name: "Ujvala Pokharkar",
    role: "1 review",
    rating: 5,
    text: "Really good place, with great trainers. Besides, they have got a good rack of weights and equipment. If you are joining and serious about your fitness goals and need guidance, then I highly recommend this gym.",
  },
  {
    name: "Bhagyashree Birmole",
    role: "3 reviews",
    rating: 5,
    text: "Muscle Empire (ladies) is a perfect gym with amazing facilities. Proper guidance regarding workout is provided, friendly environment. Tejal ma'am and Bhavesh sir are very helpful and they provide proper guidance and they always encourage everyone to exercise. A great place to achieve your fitness goals.",
  },
  {
    name: "googleTvAccount",
    role: "4 reviews",
    rating: 4,
    text: "Decent gym with facilities but has its pros and cons. This review is for Bhatwadi gym (men's) as they have other branches as well. Overall a solid place to train with good equipment.",
  },
  {
    name: "Pratik Shetty",
    role: "1 review",
    rating: 5,
    text: "Excellent gym! I'm glad to be a member of Muscle Empire Gymnasium. I'm sharing my honest review — great equipment, supportive trainers, and a motivating environment. Highly recommended.",
  },
  {
    name: "Ankita Borhde",
    role: "1 review",
    rating: 5,
    text: "Muscle Empire (ladies) is a perfect gym with amazing facilities. Proper guidance regarding workout is provided, friendly environment. Specially Tejal ma'am and Bhavesh sir are very helpful and they provide proper guidance. Highly recommend!",
  },
  {
    name: "Pravin Chavan",
    role: "3 reviews",
    rating: 5,
    text: "Great place to work out! Especially the trainers are like old school teachers, who ensure discipline within you and that is the most important plus point of this gym as these trainers ensure that you reach your goals. My age is 41 years and I would like to continue this gym for at least next 10 years!!!",
  },
  {
    name: "Aakansha Shinde",
    role: "8 reviews",
    rating: 5,
    text: "One of finest gym ever found. The trainers in gym are best. Ms. Tejal and Mr. Bhavesh are well trained and have ample knowledge regarding their field. Would like to appreciate their efforts and work. It has been almost a year working with these amazing trainers.",
  },
  {
    name: "Aakanksha Bhor",
    role: "1 review",
    rating: 5,
    text: "Excellent place. Clean and good environment. Trainers are very cooperative especially Tejal Mam (Tai) — such a humble and great person. She is always there to motivate us and always gives a lot of information related to exercise form and diet.",
  },
  {
    name: "Trupti Vali",
    role: "5 reviews · 1 photo",
    rating: 5,
    text: "Best gym and trainers. Speciality is they always ready to give you attention and correct your form. They never ignore your questions related to exercise. Tejal mam always encourages everyone for exercise and helps to improve your strength.",
  },
  {
    name: "Ravi Auti",
    role: "1 review · 9 photos",
    rating: 5,
    text: "Perfect gym with multiple facilities such as workout training, proper diet plans, yearly membership offers, etc. Trainers are very helpful and also advise people as per their requirements.",
  },
  {
    name: "Aniket Joshi",
    role: "1 review",
    rating: 5,
    text: "Gym is good for health. I recommend Muscle Empire as the best gym for health and body gain. Best gym trainers also available for our service.",
  },
  {
    name: "Krushna Borhade",
    role: "1 review",
    rating: 5,
    text: "I have seen progress in my body since I joined this gym and it is all thanks to the trainers of our gym. They are absolutely amazing and their help is the reason for my transformation.",
  },
  {
    name: "Dipti Karbele",
    role: "2 reviews",
    rating: 5,
    text: "Amazing gym. Graceful environment. Good service with friendly trainer and clean and comfortable ladies gym for girls.",
  },
  {
    name: "Bhagyashri More",
    role: "1 review",
    rating: 5,
    text: "Muscle Empire (ladies) — amazing facility! Trainers are super nice and take an interest in you no matter what fitness level you're at. I really like how they give me tips and tricks to get the most out of every workout.",
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
    text: "Muscle Empire Gymnasium is a great place for whoever is looking for their fitness and gymnastics goals. Highly recommended!",
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
];

const INITIAL_SHOW = 9;

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          size={14}
          className={i < rating ? "text-primary fill-primary" : "text-border"}
        />
      ))}
    </div>
  );
}

function Avatar({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  // Generate a deterministic color from the name
  const colors = [
    "bg-yellow-600", "bg-orange-600", "bg-red-700",
    "bg-blue-700", "bg-purple-700", "bg-teal-700",
    "bg-green-700", "bg-pink-700",
  ];
  const idx = name.charCodeAt(0) % colors.length;
  return (
    <div className={`w-10 h-10 rounded-full ${colors[idx]} flex items-center justify-center text-white font-black text-sm shrink-0`}>
      {initials}
    </div>
  );
}

export default function Testimonials() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? reviews : reviews.slice(0, INITIAL_SHOW);

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
              <Star key={i} size={20} className="text-primary fill-primary" />
            ))}
          </div>
          <span className="text-white font-black text-xl">5.0</span>
          <span className="text-muted-foreground text-sm uppercase tracking-widest">
            · {reviews.length} Google Reviews
          </span>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-7xl mx-auto">
          {visible.map((review, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ delay: (idx % 9) * 0.06, duration: 0.5 }}
              className="bg-card border border-border p-6 flex flex-col gap-4 hover:border-primary/40 transition-colors"
            >
              {/* Reviewer info */}
              <div className="flex items-center gap-3">
                <Avatar name={review.name} />
                <div className="flex-1 min-w-0">
                  <p className="text-white font-bold text-sm truncate">{review.name}</p>
                  <p className="text-muted-foreground text-xs truncate">{review.role}</p>
                </div>
                {/* Google G logo */}
                <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" aria-label="Google">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              </div>

              {/* Stars */}
              <StarRating rating={review.rating} />

              {/* Review text */}
              <p className="text-muted-foreground text-sm leading-relaxed flex-1">
                "{review.text}"
              </p>
            </motion.div>
          ))}
        </div>

        {/* Show more / less */}
        {reviews.length > INITIAL_SHOW && (
          <div className="flex justify-center mt-10">
            <button
              onClick={() => setShowAll((s) => !s)}
              className="flex items-center gap-2 border border-border text-white hover:border-primary hover:text-primary font-bold uppercase tracking-widest text-sm px-8 py-3 transition-colors"
            >
              {showAll ? "Show Less" : `Show All ${reviews.length} Reviews`}
              <ChevronDown
                size={16}
                className={`transition-transform duration-300 ${showAll ? "rotate-180" : ""}`}
              />
            </button>
          </div>
        )}

        {/* Google CTA */}
        <p className="text-center text-xs text-muted-foreground mt-8 uppercase tracking-widest">
          Reviews sourced from{" "}
          <a
            href="https://maps.google.com/?q=Muscle+Empire+Gymnasium+Ghatkopar+West+Mumbai"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline"
          >
            Google Maps
          </a>
        </p>
      </div>
    </section>
  );
}

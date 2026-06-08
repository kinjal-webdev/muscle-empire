import { useEffect, useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, X, CheckCircle2 } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";

const STORAGE_KEY = "me_user_reviews";

const baseReviews = [
  { name: "Atharva Sawant", role: "Member", rating: 5, text: "Muscle Empire Gymnasium in Ghatkopar is an absolute gem! Well-equipped with top-notch machinery. Big shoutout to trainers Rohit Yadav and Pankaj Nikam — incredibly knowledgeable and supportive." },
  { name: "Pawan Kale", role: "Member", rating: 5, text: "Fantastic experience! The facilities are clean, staff is friendly. Specially Pankaj and Rohit — knowledgeable trainers, variety of equipment caters to all fitness levels." },
  { name: "Ujvala Pokharkar", role: "Member", rating: 5, text: "Really good place with great trainers. Good rack of weights and equipment. If you are serious about your fitness goals and need guidance, I highly recommend this gym." },
  { name: "Bhagyashree Birmole", role: "Member", rating: 5, text: "Muscle Empire (ladies) is a perfect gym with amazing facilities. Tejal ma'am and Bhavesh sir are very helpful and always encourage everyone to exercise." },
  { name: "Pratik Shetty", role: "Member", rating: 5, text: "Excellent gym! Great equipment, supportive trainers, and a motivating environment. Highly recommended." },
  { name: "Ankita Borhde", role: "Member", rating: 5, text: "Muscle Empire (ladies) is a perfect gym. Tejal ma'am and Bhavesh sir are very helpful and provide proper guidance. Highly recommend!" },
  { name: "Pravin Chavan", role: "Member", rating: 5, text: "Great place to work out! The trainers are like old school teachers who ensure discipline. My age is 41 and I would like to continue this gym for at least the next 10 years!!!" },
  { name: "Aakansha Shinde", role: "Member", rating: 5, text: "One of the finest gyms ever found. Ms. Tejal and Mr. Bhavesh are well trained with ample knowledge. It has been almost a year working with these amazing trainers." },
  { name: "Aakanksha Bhor", role: "Member", rating: 5, text: "Excellent place. Clean and good environment. Tejal Mam (Tai) is such a humble and great person — always there to motivate us." },
  { name: "Trupti Vali", role: "Member", rating: 5, text: "Best gym and trainers. They always give you attention and correct your form. Tejal mam always encourages everyone for exercise." },
  { name: "Ravi Auti", role: "Member", rating: 5, text: "Perfect gym with multiple facilities — workout training, proper diet plans, yearly membership offers. Trainers are very helpful." },
  { name: "Aniket Joshi", role: "Member", rating: 5, text: "Gym is good for health. I recommend Muscle Empire as the best gym for health and body gain. Best gym trainers available." },
  { name: "Krushna Borhade", role: "Member", rating: 5, text: "I have seen progress in my body since I joined. It is all thanks to the trainers who are absolutely amazing." },
  { name: "Dipti Karbele", role: "Member", rating: 5, text: "Amazing gym. Graceful environment. Good service with friendly trainers and a clean, comfortable ladies gym for girls." },
  { name: "Bhagyashri More", role: "Member", rating: 5, text: "Amazing facility! Trainers are super nice and take an interest in you no matter what fitness level you're at." },
  { name: "Ritika Kamble", role: "Member", rating: 5, text: "The best gym! The knowledgeable trainers (Tai and Bhavesh dada) and quality equipment make every workout a success." },
  { name: "Smit Salunke", role: "Member", rating: 5, text: "Best gym for hardcore and passionate workout within Bhatwadi, Ghatkopar — with very kind and supportive gym owner and trainers." },
  { name: "Hrishikesh Lodhi", role: "Member", rating: 5, text: "Excellent gym. Well maintained. Trainers are very supportive and always ready to help you improve." },
  { name: "Devarsh Kanaskar", role: "Member", rating: 5, text: "A great place to achieve your fitness goals with professional support! Excellent staff and friendly environment." },
  { name: "Ashlyn Fernandes", role: "Member", rating: 5, text: "Well maintained gym, decent and professional trainers. Especially Pankaj — best personal trainer." },
  { name: "Siddhesh Salunke", role: "Member", rating: 5, text: "Awesome gym! 🔥 Supportive trainers who are always there to push you to your limits." },
  { name: "Saurabh Khilari", role: "Member", rating: 5, text: "Excellent environment, professionalism and well equipped gym. Really happy with my membership here." },
  { name: "Rahul Rokade", role: "Member", rating: 5, text: "Excellent staff and friendly environment of gym. Always a pleasure to work out here." },
  { name: "Haresh Maskar", role: "Member", rating: 5, text: "Excellent environment, professionalism and well equipped gym. One of the best gyms in the area." },
  { name: "Pravin Chavan", role: "Member", rating: 5, text: "Great place to work out! Especially the trainers ensure discipline within you — that is the most important plus point of this gym." },
  { name: "DP Pictures", role: "Member", rating: 5, text: "Muscle Empire Gymnasium is a great place for whoever is looking for fitness goals. Highly recommended!" },
  { name: "googleTvAccount", role: "Member", rating: 4, text: "Decent gym with good facilities. This review is for Bhatwadi gym (men's). Overall a solid place to train." },
];

type Review = { name: string; role: string; rating: number; text: string };

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

function ReviewCard({ review }: { review: Review }) {
  return (
    <div className="flex-[0_0_90%] sm:flex-[0_0_45%] lg:flex-[0_0_31%] min-w-0 bg-card border border-border p-6 flex flex-col gap-4 hover:border-primary/40 transition-colors">
      <div className="flex items-center gap-3">
        <Avatar name={review.name} />
        <div className="flex-1 min-w-0">
          <p className="text-white font-bold text-sm truncate">{review.name}</p>
          <p className="text-muted-foreground text-xs truncate">{review.role}</p>
        </div>
      </div>
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={13} className={i < review.rating ? "text-primary fill-primary" : "text-border"} />
        ))}
      </div>
      <p className="text-muted-foreground text-sm leading-relaxed flex-1">"{review.text}"</p>
    </div>
  );
}

// ── Review submission popup ──────────────────────────────────────────────────
function ReviewModal({ onClose, onSubmit }: { onClose: () => void; onSubmit: (r: Review) => void }) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [hovered, setHovered] = useState(0);
  const [text, setText] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (name.trim().length < 2) e.name = "Enter your name (at least 2 characters).";
    if (rating === 0) e.rating = "Please select a star rating.";
    if (text.trim().length < 10) e.text = "Review must be at least 10 characters.";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    onSubmit({ name: name.trim(), role: "Member", rating, text: text.trim() });
    setDone(true);
    setTimeout(onClose, 2500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1000] flex items-end sm:items-center justify-center p-4"
    >
      <motion.div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        className="relative w-full max-w-md bg-[#1a1a1a] border border-white/10 shadow-2xl z-10 overflow-hidden"
        initial={{ y: 60, opacity: 0, scale: 0.97 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 60, opacity: 0, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-primary">
          <span className="text-black font-black uppercase tracking-widest text-sm">Write a Review</span>
          <button onClick={onClose} className="text-black/70 hover:text-black transition-colors"><X size={20} /></button>
        </div>

        <div className="px-6 py-5">
          {done ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-8 text-center"
            >
              <div className="w-16 h-16 bg-primary/20 flex items-center justify-center mb-4 text-primary">
                <CheckCircle2 size={36} />
              </div>
              <h5 className="text-xl font-black uppercase text-white mb-1">Review Added!</h5>
              <p className="text-muted-foreground text-sm mt-1">Your review is now live in the carousel.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>

              {/* Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Your Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-transparent border border-white/10 focus:border-primary focus:outline-none h-11 px-3 text-white placeholder:text-white/25 text-sm transition-colors"
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Star rating picker */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Your Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHovered(star)}
                      onMouseLeave={() => setHovered(0)}
                      onClick={() => setRating(star)}
                      className="transition-transform hover:scale-110"
                      aria-label={`${star} star`}
                    >
                      <Star
                        size={28}
                        className={
                          star <= (hovered || rating)
                            ? "text-primary fill-primary"
                            : "text-border"
                        }
                      />
                    </button>
                  ))}
                </div>
                {errors.rating && <p className="text-red-400 text-xs mt-1">{errors.rating}</p>}
              </div>

              {/* Review text */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Your Review</label>
                <textarea
                  placeholder="Tell us about your experience..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows={4}
                  className="w-full bg-transparent border border-white/10 focus:border-primary focus:outline-none px-3 py-2 text-white placeholder:text-white/25 text-sm transition-colors resize-none"
                />
                {errors.text && <p className="text-red-400 text-xs mt-1">{errors.text}</p>}
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90 text-black font-black uppercase tracking-widest h-12 transition-colors text-sm"
              >
                Submit Review
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function Testimonials() {
  const [userReviews, setUserReviews] = useState<Review[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch { return []; }
  });
  const [modalOpen, setModalOpen] = useState(false);

  const allReviews = [...userReviews, ...baseReviews];

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start", slidesToScroll: 1 });
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const timer = setInterval(scrollNext, 3500);
    return () => clearInterval(timer);
  }, [emblaApi, scrollNext]);

  // Re-init carousel when new reviews added
  useEffect(() => { emblaApi?.reInit(); }, [allReviews.length, emblaApi]);

  const handleNewReview = (review: Review) => {
    const updated = [review, ...userReviews];
    setUserReviews(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  return (
    <section id="reviews" className="py-24 bg-background relative overflow-hidden border-t border-border/30">
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

        {/* Stars summary */}
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
            {allReviews.map((review, idx) => (
              <ReviewCard key={idx} review={review} />
            ))}
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-1.5 mt-8 flex-wrap">
          {allReviews.map((_, idx) => (
            <button
              key={idx}
              onClick={() => emblaApi?.scrollTo(idx)}
              className="w-1.5 h-1.5 rounded-full bg-border hover:bg-primary transition-colors"
              aria-label={`Go to review ${idx + 1}`}
            />
          ))}
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          {/* Write a review on this site */}
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-black font-black uppercase tracking-widest text-sm px-8 py-3 transition-colors"
          >
            <Star size={16} className="fill-black" />
            Write a Review
          </button>

          {/* Review on Google */}
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

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && (
          <ReviewModal
            onClose={() => setModalOpen(false)}
            onSubmit={handleNewReview}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

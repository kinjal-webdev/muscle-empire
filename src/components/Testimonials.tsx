import { Star } from "lucide-react";
import { motion } from "framer-motion";

/* ── All reviews ──────────────────────────────────────────────────── */
const reviews = [
  { name: "Atharva Sawant",      role: "Gym member",               rating: 5, text: "Muscle Empire in Ghatkopar is an absolute gem! Well-equipped with top-notch machinery. Big shoutout to trainers Rohit Yadav and Pankaj Nikam — incredibly knowledgeable and supportive." },
  { name: "Pawan Kale",          role: "Gym member",               rating: 5, text: "Fantastic experience! Facilities are clean, staff is friendly. Specially Pankaj and Rohit — knowledgeable trainers with a variety of equipment for all fitness levels." },
  { name: "Ujvala Pokharkar",    role: "Gym member",               rating: 5, text: "Really good place with great trainers. Good rack of weights and equipment. If you are serious about your fitness goals, I highly recommend this gym." },
  { name: "Bhagyashree Birmole", role: "Ladies gym member",        rating: 5, text: "Muscle Empire ladies gym is perfect — amazing facilities. Tejal ma'am and Bhavesh sir are very helpful and always encourage everyone to stay consistent." },
  { name: "Pratik Shetty",       role: "Gym member",               rating: 5, text: "Excellent gym! Great equipment, supportive trainers, and a motivating environment. Highly recommended for anyone serious about fitness." },
  { name: "Ankita Borhde",       role: "Ladies gym member",        rating: 5, text: "Muscle Empire ladies gym is perfect. Tejal ma'am and Bhavesh sir are very helpful and provide proper guidance. Highly recommend!" },
  { name: "Pravin Chavan",       role: "Gym member, age 41",       rating: 5, text: "Great place to work out! The trainers ensure discipline — that's the biggest plus point. I've been here for years and plan to continue for at least 10 more." },
  { name: "Aakansha Shinde",     role: "Ladies gym member",        rating: 5, text: "One of the finest gyms I've ever found. Ms. Tejal and Mr. Bhavesh are well-trained with ample knowledge. Almost a year in and I'm loving every session." },
  { name: "Aakanksha Bhor",      role: "Ladies gym member",        rating: 5, text: "Excellent place. Clean and great environment. Tejal Mam (Tai) is such a humble person — always there to motivate and push you forward." },
  { name: "Trupti Vali",         role: "Ladies gym member",        rating: 5, text: "Best gym and trainers. They always give you attention, correct your form, and keep you motivated. Tejal mam is genuinely inspiring." },
  { name: "Ravi Auti",           role: "Gym member",               rating: 5, text: "Perfect gym with multiple facilities — workout training, proper diet plans, yearly membership offers. Trainers are very helpful throughout your journey." },
  { name: "Aniket Joshi",        role: "Gym member",               rating: 5, text: "Gym is great for health and body gain. Best gym trainers available in the area. I recommend Muscle Empire to everyone." },
  { name: "Krushna Borhade",     role: "Gym member",               rating: 5, text: "I have seen real progress in my body since I joined. It is all thanks to the trainers who are absolutely amazing and genuinely care." },
  { name: "Dipti Karbele",       role: "Ladies gym member",        rating: 5, text: "Amazing gym. Graceful environment, good service with friendly trainers and a clean, comfortable ladies gym for all girls." },
  { name: "Bhagyashri More",     role: "Gym member",               rating: 5, text: "Amazing facility! Trainers are super nice and take a personal interest in you no matter what fitness level you're at." },
  { name: "Ritika Kamble",       role: "Ladies gym member",        rating: 5, text: "The best gym! The knowledgeable trainers — Tai and Bhavesh dada — combined with quality equipment make every workout a real success." },
  { name: "Smit Salunke",        role: "Gym member",               rating: 5, text: "Best gym for hardcore and passionate workout in Bhatwadi, Ghatkopar — with a very kind, supportive owner and excellent trainers." },
  { name: "Hrishikesh Lodhi",    role: "Gym member",               rating: 5, text: "Excellent gym. Well maintained. Trainers are very supportive and always ready to help you improve and push your limits." },
  { name: "Devarsh Kanaskar",    role: "Gym member",               rating: 5, text: "A great place to achieve your fitness goals with professional support! Excellent staff and a consistently friendly environment." },
  { name: "Ashlyn Fernandes",    role: "Gym member",               rating: 5, text: "Well maintained gym with decent and professional trainers. Especially Pankaj — genuinely the best personal trainer." },
  { name: "Siddhesh Salunke",    role: "Gym member",               rating: 5, text: "Awesome gym! Supportive trainers who are always there to push you to your limits and keep you accountable." },
  { name: "Saurabh Khilari",     role: "Gym member",               rating: 5, text: "Excellent environment, professionalism and well-equipped gym. Really happy with my membership here — worth every rupee." },
  { name: "Rahul Rokade",        role: "Gym member",               rating: 5, text: "Excellent staff and friendly environment. Always a pleasure to work out at Muscle Empire — the vibe is unmatched." },
  { name: "Haresh Maskar",       role: "Gym member",               rating: 5, text: "Excellent environment, professionalism and well-equipped gym. One of the genuinely best gyms in the entire area." },
  { name: "DP Pictures",         role: "Gym member",               rating: 5, text: "Muscle Empire Gymnasium is a great place for whoever is looking to achieve their fitness goals. Highly recommended — no second thoughts." },
  { name: "Google TV Account",   role: "Gym member",               rating: 4, text: "Decent gym with good facilities. This review is for the Bhatwadi gym (men's). Overall a solid, well-maintained place to train." },
];

/* ── Palette for avatars ─────────────────────────────────────────── */
const PALETTE = [
  "#92400E","#B45309","#C2410C","#991B1B",
  "#1E40AF","#6D28D9","#0F766E","#065F46","#831843",
];
function bgColor(name: string) { return PALETTE[name.charCodeAt(0) % PALETTE.length]; }
function initials(name: string) { return name.split(" ").slice(0,2).map(n=>n[0]).join("").toUpperCase(); }

/* ── Single review card ─────────────────────────────────────────── */
function ReviewCard({ r }: { r: typeof reviews[0] }) {
  return (
    <div className="bg-white border border-black/[0.07] rounded-2xl p-5 shadow-[0_2px_16px_rgba(0,0,0,0.06)] w-full mb-4 break-inside-avoid">
      {/* Stars */}
      <div className="flex gap-0.5 mb-3">
        {Array.from({length:5},(_,i)=>(
          <Star key={i} size={12} className={i < r.rating ? "fill-[#FFC107] text-[#FFC107]" : "fill-[#E5E7EB] text-[#E5E7EB]"} />
        ))}
      </div>
      {/* Text */}
      <p className="text-[#333] text-[0.84rem] leading-relaxed mb-4">"{r.text}"</p>
      {/* Author */}
      <div className="flex items-center gap-2.5">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-[11px] shrink-0"
          style={{ background: bgColor(r.name) }}
        >
          {initials(r.name)}
        </div>
        <div>
          <p className="text-[#111] font-bold text-[0.8rem] leading-tight">{r.name}</p>
          <p className="text-[#aaa] text-[0.72rem]">{r.role}</p>
        </div>
      </div>
    </div>
  );
}

/* ── Infinite scroll column ─────────────────────────────────────── */
function MarqueeColumn({
  items,
  duration,
  reverse = false,
}: {
  items: typeof reviews;
  duration: number;
  reverse?: boolean;
}) {
  /* Duplicate for seamless loop */
  const doubled = [...items, ...items];

  return (
    <div className="relative overflow-hidden" style={{ height: "600px" }}>
      {/* Top & bottom fade masks */}
      <div className="absolute inset-x-0 top-0 h-20 z-10 pointer-events-none bg-gradient-to-b from-[#F6F7F9] to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-20 z-10 pointer-events-none bg-gradient-to-t from-[#F6F7F9] to-transparent" />

      <motion.div
        animate={{ y: reverse ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear", repeatType: "loop" }}
        className="flex flex-col"
      >
        {doubled.map((r, i) => (
          <ReviewCard key={`${r.name}-${i}`} r={r} />
        ))}
      </motion.div>
    </div>
  );
}

/* ── Split reviews into columns ─────────────────────────────────── */
function chunkReviews(arr: typeof reviews, cols: number) {
  const result: (typeof reviews)[] = Array.from({ length: cols }, () => []);
  arr.forEach((r, i) => result[i % cols].push(r));
  return result;
}

/* ── Main section ─────────────────────────────────────────────────── */
export default function Testimonials() {
  const cols2 = chunkReviews(reviews, 2);
  const cols3 = chunkReviews(reviews, 3);

  return (
    <section id="reviews" className="relative overflow-hidden bg-[#F6F7F9] py-0">
      {/* Top divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-black/[0.08] to-transparent z-20" />

      {/* ── Scrolling wall (full bleed) ──────────────────── */}
      <div className="relative">

        {/* Desktop: 3 columns */}
        <div className="hidden lg:grid grid-cols-3 gap-4 px-6 xl:px-12 pt-10">
          {cols3.map((col, i) => (
            <MarqueeColumn
              key={i}
              items={col}
              duration={30 + i * 8}
              reverse={i % 2 === 1}
            />
          ))}
        </div>

        {/* Mobile/tablet: 2 columns */}
        <div className="lg:hidden grid grid-cols-2 gap-3 px-4 pt-8">
          {cols2.map((col, i) => (
            <MarqueeColumn
              key={i}
              items={col}
              duration={28 + i * 10}
              reverse={i % 2 === 1}
            />
          ))}
        </div>

        {/* ── Central overlay stat ─────────────────────────── */}
        <div className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0.88 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto text-center px-8 py-10 max-w-sm mx-auto"
          >
            {/* Frosted pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-sm border border-black/[0.08] text-[#FFC107] text-[10.5px] font-bold uppercase tracking-[0.18em] mb-5 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FFC107] animate-pulse" />
              Verified Google reviews
            </div>

            {/* Big number */}
            <h2
              className="font-display font-black text-[#0d0d0d] leading-none mb-2"
              style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)" }}
            >
              Trusted by{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #FFC107 0%, #FF9500 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {reviews.length}+
              </span>{" "}
              members
            </h2>
            <p className="text-[#666] text-[0.9rem] leading-relaxed mb-6">
              Real people, real transformations. See what our community is saying about Muscle Empire.
            </p>

            {/* Stars row */}
            <div className="flex items-center justify-center gap-1.5 mb-6">
              {Array.from({length:5},(_,i)=>(
                <Star key={i} size={20} className="fill-[#FFC107] text-[#FFC107]" />
              ))}
              <span className="ml-1 font-black text-[#0d0d0d] text-lg">5.0</span>
            </div>

            {/* CTA */}
            <motion.a
              href="https://share.google/JxC3WJxV6YViUdr2n"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 bg-[#FFC107] hover:bg-[#e6ac00] text-black font-bold text-[13px] px-7 py-3 rounded-xl shadow-[0_4px_20px_rgba(255,193,7,0.35)] hover:shadow-[0_6px_28px_rgba(255,193,7,0.48)] transition-all duration-200"
            >
              <Star size={13} className="fill-black text-black" />
              Review us on Google
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

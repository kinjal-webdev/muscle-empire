import { Star } from "lucide-react";
import { motion } from "framer-motion";

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
  { name: "Ravi Auti",           role: "Gym member",               rating: 5, text: "Perfect gym with multiple facilities — workout training, proper diet plans, yearly membership offers. Trainers are very helpful throughout." },
  { name: "Aniket Joshi",        role: "Gym member",               rating: 5, text: "Gym is great for health and body gain. Best gym trainers available in the area. I recommend Muscle Empire to everyone." },
  { name: "Krushna Borhade",     role: "Gym member",               rating: 5, text: "I have seen real progress in my body since I joined. It is all thanks to the trainers who are absolutely amazing and genuinely care." },
  { name: "Dipti Karbele",       role: "Ladies gym member",        rating: 5, text: "Amazing gym. Graceful environment, good service with friendly trainers and a clean, comfortable ladies gym for all." },
  { name: "Bhagyashri More",     role: "Gym member",               rating: 5, text: "Amazing facility! Trainers are super nice and take a personal interest in you no matter what fitness level you're at." },
  { name: "Ritika Kamble",       role: "Ladies gym member",        rating: 5, text: "The best gym! The knowledgeable trainers — Tai and Bhavesh dada — combined with quality equipment make every workout a success." },
  { name: "Smit Salunke",        role: "Gym member",               rating: 5, text: "Best gym for hardcore and passionate workout in Bhatwadi, Ghatkopar — with a very kind, supportive owner and excellent trainers." },
  { name: "Hrishikesh Lodhi",    role: "Gym member",               rating: 5, text: "Excellent gym. Well maintained. Trainers are very supportive and always ready to help you improve and push your limits." },
  { name: "Devarsh Kanaskar",    role: "Gym member",               rating: 5, text: "A great place to achieve your fitness goals with professional support! Excellent staff and a consistently friendly environment." },
  { name: "Ashlyn Fernandes",    role: "Gym member",               rating: 5, text: "Well maintained gym with decent and professional trainers. Especially Pankaj — genuinely the best personal trainer." },
  { name: "Siddhesh Salunke",    role: "Gym member",               rating: 5, text: "Awesome gym! Supportive trainers who are always there to push you to your limits and keep you accountable." },
  { name: "Saurabh Khilari",     role: "Gym member",               rating: 5, text: "Excellent environment, professionalism and well-equipped gym. Really happy with my membership here — worth every rupee." },
  { name: "Rahul Rokade",        role: "Gym member",               rating: 5, text: "Excellent staff and friendly environment. Always a pleasure to work out at Muscle Empire — the vibe is unmatched." },
  { name: "Haresh Maskar",       role: "Gym member",               rating: 5, text: "Excellent environment, professionalism and well-equipped gym. One of the genuinely best gyms in the entire area." },
  { name: "DP Pictures",         role: "Gym member",               rating: 5, text: "Muscle Empire Gymnasium is a great place for whoever is looking to achieve their fitness goals. Highly recommended!" },
  { name: "Google TV Account",   role: "Gym member",               rating: 4, text: "Decent gym with good facilities. This review is for the Bhatwadi gym (men's). Overall a solid, well-maintained place to train." },
];

const PALETTE = ["#92400E","#B45309","#C2410C","#991B1B","#1E40AF","#6D28D9","#0F766E","#065F46","#831843"];
const bg   = (name: string) => PALETTE[name.charCodeAt(0) % PALETTE.length];
const init = (name: string) => name.split(" ").slice(0,2).map(n=>n[0]).join("").toUpperCase();

/* ── Single card ─────────────────────────────────────────────────── */
function Card({ r }: { r: typeof reviews[0] }) {
  return (
    <div className="bg-white border border-black/[0.07] rounded-2xl p-5 shadow-[0_2px_14px_rgba(0,0,0,0.06)] w-[260px] shrink-0">
      <div className="flex gap-0.5 mb-3">
        {Array.from({length:5},(_,i)=>(
          <Star key={i} size={11} className={i < r.rating ? "fill-[#FFC107] text-[#FFC107]" : "fill-[#E5E7EB] text-[#E5E7EB]"} />
        ))}
      </div>
      <p className="text-[#333] text-[0.8rem] leading-relaxed mb-4 line-clamp-4">"{r.text}"</p>
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-[10px] shrink-0" style={{ background: bg(r.name) }}>
          {init(r.name)}
        </div>
        <div>
          <p className="text-[#111] font-bold text-[0.75rem] leading-tight">{r.name}</p>
          <p className="text-[#aaa] text-[0.68rem]">{r.role}</p>
        </div>
      </div>
    </div>
  );
}

/* ── Horizontal infinite marquee row ────────────────────────────── */
function MarqueeRow({ items, reverse = false, speed = 40 }: { items: typeof reviews; reverse?: boolean; speed?: number }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden w-full">
      <motion.div
        className="flex gap-4"
        animate={{ x: reverse ? ["0%", "50%"] : ["0%", "-50%"] }}
        transition={{ duration: speed, repeat: Infinity, ease: "linear", repeatType: "loop" }}
        style={{ width: "max-content" }}
      >
        {doubled.map((r, i) => <Card key={i} r={r} />)}
      </motion.div>
    </div>
  );
}

/* ── Split reviews into rows ────────────────────────────────────── */
function splitRows(arr: typeof reviews, n: number) {
  const size = Math.ceil(arr.length / n);
  return Array.from({ length: n }, (_, i) => arr.slice(i * size, i * size + size));
}

/* ── Main ──────────────────────────────────────────────────────────── */
export default function Testimonials() {
  const [row1, row2, row3] = splitRows(reviews, 3);

  return (
    <section id="reviews" className="bg-[#F6F7F9] py-20 overflow-hidden">
      <div className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-black/[0.08] to-transparent" />

      {/* ── Center hero stat ───────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 22 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="text-center px-4 mb-12"
      >
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFC107]/10 border border-[#FFC107]/25 text-[#FFC107] text-[10.5px] font-bold uppercase tracking-[0.18em] mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFC107] animate-pulse" />
          Verified Google reviews
        </div>

        {/* Big headline */}
        <h2 className="font-display font-black text-[#0d0d0d] leading-tight mb-3" style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)" }}>
          Trusted by{" "}
          <span style={{ background: "linear-gradient(135deg,#FFC107,#FF9500)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            {reviews.length}+ members
          </span>
        </h2>
        <p className="text-[#777] text-[0.95rem] max-w-md mx-auto leading-relaxed mb-5">
          Real people, real transformations. See what our community is saying about Muscle Empire.
        </p>

        {/* Stars */}
        <div className="flex items-center justify-center gap-1 mb-6">
          {Array.from({length:5},(_,i)=>(
            <Star key={i} size={20} className="fill-[#FFC107] text-[#FFC107]" />
          ))}
          <span className="ml-2 font-black text-[#0d0d0d] text-lg">5.0</span>
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

      {/* ── Scrolling rows ─────────────────────────────── */}
      <div className="flex flex-col gap-4 relative">
        {/* Left-right fade masks */}
        <div className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none bg-gradient-to-r from-[#F6F7F9] to-transparent" />
        <div className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none bg-gradient-to-l from-[#F6F7F9] to-transparent" />

        {/* Row 1 — scrolls left */}
        <MarqueeRow items={row1} reverse={false} speed={38} />
        {/* Row 2 — scrolls right (outward from center) */}
        <MarqueeRow items={row2} reverse={true} speed={44} />
        {/* Row 3 — scrolls left */}
        <MarqueeRow items={row3} reverse={false} speed={35} />
      </div>
    </section>
  );
}

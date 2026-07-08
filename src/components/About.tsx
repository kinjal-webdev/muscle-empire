import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Trophy, Medal, Award, Star } from "lucide-react";
import aboutImg from "@/assets/images/about-img.png";

/* ── Timeline milestones ──────────────────────────────────────── */
const MILESTONES = [
  {
    year: "2011", label: "Junior Debut",
    achievements: [
      { title: "Mumbai Kishor",      result: "Overall Champion", medal: "gold" },
      { title: "Maharashtra Kishor", result: "Gold Medal",       medal: "gold" },
      { title: "Bharat Kishor",      result: "Gold Medal",       medal: "gold" },
    ],
  },
  {
    year: "2012–16", label: "Dominant Era",
    achievements: [
      { title: "Mumbai Kumar",      result: "Overall Champion", medal: "gold" },
      { title: "Maharashtra Kumar", result: "Gold Medal",       medal: "gold" },
      { title: "Bharat Kumar",      result: "Gold Medal",       medal: "gold" },
    ],
  },
  {
    year: "2017", label: "Senior Title",
    achievements: [
      { title: "Mumbai Shree",      result: "Overall Champion", medal: "gold"   },
      { title: "Maharashtra Shree", result: "Gold Medal",       medal: "gold"   },
      { title: "Bharat Shree",      result: "Gold Medal",       medal: "gold"   },
    ],
  },
  {
    year: "MU", label: "Mumbai Univ.",
    achievements: [
      { title: "2012–13", result: "Silver Medal", medal: "silver" },
      { title: "2013–14", result: "Gold Medal",   medal: "gold"   },
      { title: "2015–16", result: "Gold Medal",   medal: "gold"   },
      { title: "2016–17", result: "Silver Medal", medal: "silver" },
    ],
  },
  {
    year: "AIU", label: "All India Univ.",
    achievements: [
      { title: "2013–14", result: "Represented Mumbai University", medal: "blue"   },
      { title: "2015–16", result: "Bronze Medal",                  medal: "bronze" },
    ],
  },
];

const COUNTERS = [
  { icon: Trophy, label: "Nat. & State Titles", value: 10 },
  { icon: Medal,  label: "Gold Medals",          value: 12 },
  { icon: Medal,  label: "Silver Medals",         value: 4  },
  { icon: Award,  label: "Championship Wins",     value: 15 },
];

function medalColor(medal: string) {
  if (medal === "gold")   return "#E8A820";
  if (medal === "silver") return "#94A3B8";
  if (medal === "bronze") return "#D97706";
  return "#60A5FA";
}

/* ── Animated counter ─────────────────────────────────────────── */
function Counter({ value, label, Icon }: { value: number; label: string; Icon: typeof Trophy }) {
  const ref   = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [cur, setCur] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(value / 40);
    const t = setInterval(() => {
      start += step;
      if (start >= value) { setCur(value); clearInterval(t); }
      else setCur(start);
    }, 35);
    return () => clearInterval(t);
  }, [inView, value]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-1 text-center">
      <div className="w-12 h-12 rounded-2xl flex items-center justify-center mb-1"
        style={{ background: "rgba(232,168,32,0.12)", color: "#E8A820" }}>
        <Icon size={22} strokeWidth={1.8} />
      </div>
      <span className="font-display font-black text-[2rem] leading-none text-white">{cur}+</span>
      <span className="text-[#F2EFE9]/45 text-[0.75rem] font-medium uppercase tracking-wide">{label}</span>
    </div>
  );
}

/* ── Achievement card ─────────────────────────────────────────── */
function AchievementCard({ ms }: { ms: typeof MILESTONES[0] }) {
  return (
    <motion.div
      key={ms.year}
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -12, scale: 0.97 }}
      transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-[18px] p-6 overflow-hidden"
      style={{
        background: "#111111",
        border: "1.5px solid rgba(232,168,32,0.30)",
        boxShadow: "0 12px 40px rgba(0,0,0,0.45), 0 0 30px rgba(232,168,32,0.06)",
      }}
    >
      <div className="absolute top-0 left-[15%] right-[15%] h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg, transparent, #E8A820, transparent)" }} />
      <p className="text-[#E8A820] text-[11px] font-black uppercase tracking-widest mb-1">{ms.year}</p>
      <h4 className="text-white font-black text-[1.15rem] mb-4">{ms.label}</h4>
      <div className="space-y-2.5">
        {ms.achievements.map((a, i) => (
          <div key={i} className="flex items-center justify-between gap-4">
            <span className="text-[#F2EFE9]/65 text-[0.87rem]">{a.title}</span>
            <span className="text-[12px] font-black uppercase tracking-wide shrink-0"
              style={{ color: medalColor(a.medal) }}>
              {a.result}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ── Main ─────────────────────────────────────────────────────── */
export default function About() {
  const [active, setActive] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef     = useRef<HTMLDivElement>(null);
  const inView      = useInView(lineRef, { once: true });

  return (
    <section id="about" className="py-24 bg-[#F0EEE9] relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-black/[0.08] to-transparent" />

      <div className="max-w-7xl mx-auto px-5 md:px-10">

        {/* ── Two-column layout ─────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-12 lg:gap-16 items-start">

          {/* LEFT — Champion image ─────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.85, ease: [0.16,1,0.3,1] }}
            className="relative"
          >
            {/* Floating trophy badge */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 z-20 flex items-center gap-2 px-4 py-2.5 rounded-2xl"
              style={{
                background: "#E8A820",
                boxShadow: "0 8px 28px rgba(232,168,32,0.50)",
              }}
            >
              <Trophy size={16} className="text-black" />
              <span className="text-black font-black text-[12px] uppercase tracking-wide whitespace-nowrap">10+ Titles</span>
            </motion.div>

            {/* Image */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5 }}
              className="relative rounded-[20px] overflow-hidden group"
              style={{
                border: "1.5px solid rgba(232,168,32,0.35)",
                boxShadow: "0 24px 80px rgba(0,0,0,0.18), 0 0 0 0 rgba(232,168,32,0)",
              }}
            >
              <motion.div
                className="absolute inset-0 rounded-[20px] pointer-events-none z-10 opacity-0 group-hover:opacity-100"
                transition={{ duration: 0.4 }}
                style={{ boxShadow: "inset 0 0 0 2px rgba(232,168,32,0.50)" }}
              />
              <img
                src={aboutImg}
                alt="Champion athlete — Muscle Empire founder"
                className="w-full object-cover filter grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                style={{ aspectRatio: "3/4" }}
              />
              {/* Bottom overlay */}
              <div className="absolute bottom-0 inset-x-0 z-10 px-6 py-5"
                style={{ background: "linear-gradient(to top, rgba(0,0,0,0.80) 0%, transparent 100%)" }}>
                <p className="text-white font-black text-[1.1rem] leading-tight">Sagar Kharat</p>
                <p className="text-[#E8A820] text-[11px] font-bold uppercase tracking-widest mt-0.5">Professional Bodybuilder · Muscle Empire</p>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT — Content ───────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.85, ease: [0.16,1,0.3,1] }}
          >
            {/* Heading */}
            <div className="eyebrow mb-3">Hall of Fame</div>
            <h2 className="font-display font-black text-[#1C1C1E] text-[clamp(2rem,4.5vw,3rem)] leading-tight mb-3">
              Champion's <span className="text-gold-gradient">journey</span>
            </h2>
            <p className="text-[#555] text-[0.97rem] leading-relaxed mb-10 max-w-lg">
              Years of dedication, discipline, and championship victories that inspire every member of Muscle Empire.
            </p>

            {/* Counters */}
            <div className="grid grid-cols-4 gap-4 mb-12 p-6 rounded-2xl bg-[#1C1C1E]">
              {COUNTERS.map((c, i) => <Counter key={i} value={c.value} label={c.label} Icon={c.icon} />)}
            </div>

            {/* Timeline */}
            <div ref={lineRef} className="relative mb-8">
              {/* Connecting line */}
              <div className="absolute top-[18px] left-0 right-0 h-px bg-[#1C1C1E]/15 z-0" />
              <motion.div
                className="absolute top-[18px] left-0 h-px z-0"
                style={{ background: "linear-gradient(90deg, #E8A820, #FF9500)" }}
                initial={{ width: "0%" }}
                animate={inView ? { width: "100%" } : {}}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
              />

              {/* Milestones — horizontally scrollable on mobile */}
              <div
                ref={timelineRef}
                className="flex gap-6 overflow-x-auto pb-3 scrollbar-hide relative z-10"
                style={{ scrollSnapType: "x mandatory" }}
              >
                {MILESTONES.map((ms, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className="flex flex-col items-center gap-2 shrink-0"
                    style={{ scrollSnapAlign: "start" }}
                  >
                    {/* Dot */}
                    <motion.div
                      animate={{
                        width:  i === active ? 32 : 18,
                        height: i === active ? 32 : 18,
                        boxShadow: i === active ? "0 0 0 6px rgba(232,168,32,0.22), 0 0 20px rgba(232,168,32,0.45)" : "none",
                      }}
                      transition={{ duration: 0.35 }}
                      className="rounded-full flex items-center justify-center transition-colors"
                      style={{ background: i === active ? "#E8A820" : "#1C1C1E" }}
                    >
                      {i === active && <Trophy size={12} className="text-black" strokeWidth={3} />}
                    </motion.div>
                    {/* Label */}
                    <span className={`text-[11px] font-black uppercase tracking-wide whitespace-nowrap transition-colors ${
                      i === active ? "text-[#E8A820]" : "text-[#1C1C1E]/50"
                    }`}>{ms.year}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Achievement card */}
            <AnimatePresence mode="wait">
              <AchievementCard key={active} ms={MILESTONES[active]} />
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

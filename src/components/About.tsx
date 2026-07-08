import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Trophy, Medal, Award } from "lucide-react";
import aboutImg from "@/assets/images/about-img.png";

const MILESTONES = [
  { year: "2011",   label: "Junior Debut",    achievements: [{ title: "Mumbai Kishor",      result: "Overall Champion",             medal: "gold"   }, { title: "Maharashtra Kishor", result: "Gold Medal",  medal: "gold"   }, { title: "Bharat Kishor",      result: "Gold Medal",  medal: "gold"   }] },
  { year: "2012–16",label: "Dominant Era",    achievements: [{ title: "Mumbai Kumar",       result: "Overall Champion",             medal: "gold"   }, { title: "Maharashtra Kumar",  result: "Gold Medal",  medal: "gold"   }, { title: "Bharat Kumar",       result: "Gold Medal",  medal: "gold"   }] },
  { year: "2017",   label: "Senior Title",    achievements: [{ title: "Mumbai Shree",       result: "Overall Champion",             medal: "gold"   }, { title: "Maharashtra Shree",  result: "Gold Medal",  medal: "gold"   }, { title: "Bharat Shree",       result: "Gold Medal",  medal: "gold"   }] },
  { year: "MU",     label: "Mumbai Univ.",    achievements: [{ title: "2012–13",            result: "Silver Medal",                 medal: "silver" }, { title: "2013–14",            result: "Gold Medal",  medal: "gold"   }, { title: "2015–16",            result: "Gold Medal",  medal: "gold"   }, { title: "2016–17", result: "Silver Medal", medal: "silver" }] },
  { year: "AIU",    label: "All India Univ.", achievements: [{ title: "2013–14",            result: "Represented Mumbai University", medal: "blue"   }, { title: "2015–16",            result: "Bronze Medal", medal: "bronze" }] },
];

const COUNTERS = [
  { Icon: Trophy, label: "Titles",      value: 10 },
  { Icon: Medal,  label: "Gold Medals", value: 12 },
  { Icon: Medal,  label: "Silvers",     value: 4  },
  { Icon: Award,  label: "Wins",        value: 15 },
];

function medalColor(m: string) {
  if (m === "gold")   return "#E8A820";
  if (m === "silver") return "#94A3B8";
  if (m === "bronze") return "#D97706";
  return "#60A5FA";
}

function Counter({ value, label, Icon }: { value: number; label: string; Icon: typeof Trophy }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [cur, setCur] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let n = 0;
    const step = Math.ceil(value / 35);
    const t = setInterval(() => {
      n += step;
      if (n >= value) { setCur(value); clearInterval(t); } else setCur(n);
    }, 35);
    return () => clearInterval(t);
  }, [inView, value]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-1 text-center px-1">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-1 shrink-0"
        style={{ background: "rgba(232,168,32,0.12)", color: "#E8A820" }}>
        <Icon size={18} strokeWidth={1.8} />
      </div>
      {/* Responsive number — clamp so it never overflows on mobile */}
      <span className="font-display font-black text-white leading-none"
        style={{ fontSize: "clamp(1.4rem, 5vw, 2rem)" }}>{cur}+</span>
      <span className="text-[#F2EFE9]/45 font-medium uppercase tracking-wide text-center"
        style={{ fontSize: "clamp(0.58rem, 1.8vw, 0.72rem)" }}>{label}</span>
    </div>
  );
}

function AchievementCard({ ms }: { ms: typeof MILESTONES[0] }) {
  return (
    <motion.div
      key={ms.year}
      initial={{ opacity: 0, y: 16, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.97 }}
      transition={{ duration: 0.42, ease: [0.16,1,0.3,1] }}
      className="relative rounded-[18px] p-6 overflow-hidden"
      style={{ background: "#ffffff", border: "1.5px solid rgba(232,168,32,0.25)", boxShadow: "0 8px 32px rgba(0,0,0,0.10)" }}
    >
      <div className="absolute top-0 left-[15%] right-[15%] h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg,transparent,#E8A820,transparent)" }} />
      <p className="text-[#E8A820] text-[10px] font-black uppercase tracking-widest mb-0.5">{ms.year}</p>
      <h4 className="text-[#1C1C1E] font-black text-[1.1rem] mb-4">{ms.label}</h4>
      <div className="space-y-2.5">
        {ms.achievements.map((a, i) => (
          <div key={i} className="flex items-center justify-between gap-3 flex-wrap">
            <span className="text-[#444] text-[0.85rem]">{a.title}</span>
            <span className="text-[11px] font-black uppercase tracking-wide shrink-0"
              style={{ color: medalColor(a.medal) }}>{a.result}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function About() {
  const [active, setActive]   = useState(0);
  const lineRef                = useRef<HTMLDivElement>(null);
  const inView                 = useInView(lineRef, { once: true });
  const autoRef                = useRef<ReturnType<typeof setInterval>>();
  const N                      = MILESTONES.length;

  /* auto-advance every 3s — not too fast */
  const reset = () => {
    clearInterval(autoRef.current);
    autoRef.current = setInterval(() => setActive(a => (a + 1) % N), 3000);
  };
  useEffect(() => { reset(); return () => clearInterval(autoRef.current); }, []);

  return (
    <section id="about" className="py-24 bg-[#F0EEE9] relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-black/[0.08] to-transparent" />

      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-12 lg:gap-16 items-start">

          {/* LEFT — image */}
          <motion.div initial={{ opacity:0, x:-40 }} whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true, margin:"-80px" }} transition={{ duration:0.85, ease:[0.16,1,0.3,1] }}
            className="relative">
            <motion.div animate={{ y:[0,-6,0] }} transition={{ duration:3.5, repeat:Infinity, ease:"easeInOut" }}
              className="absolute -top-4 -right-4 z-20 flex items-center gap-2 px-4 py-2.5 rounded-2xl"
              style={{ background:"#E8A820", boxShadow:"0 8px 28px rgba(232,168,32,0.50)" }}>
              <Trophy size={15} className="text-black" />
              <span className="text-black font-black text-[11px] uppercase tracking-wide whitespace-nowrap">10+ Titles</span>
            </motion.div>

            <motion.div whileHover={{ scale:1.02 }} transition={{ duration:0.5 }}
              className="relative rounded-[20px] overflow-hidden group"
              style={{ border:"1.5px solid rgba(232,168,32,0.35)", boxShadow:"0 24px 80px rgba(0,0,0,0.18)" }}>
              <img src={aboutImg} alt="Champion — Muscle Empire"
                className="w-full object-cover filter grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                style={{ aspectRatio:"3/4" }} />
              <div className="absolute bottom-0 inset-x-0 z-10 px-6 py-5"
                style={{ background:"linear-gradient(to top,rgba(0,0,0,0.80) 0%,transparent 100%)" }}>
                <p className="text-white font-black text-[1.05rem] leading-tight">Sagar Kharat</p>
                <p className="text-[#E8A820] text-[10px] font-bold uppercase tracking-widest mt-0.5">Professional Bodybuilder · Muscle Empire</p>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT */}
          <motion.div initial={{ opacity:0, x:40 }} whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true, margin:"-80px" }} transition={{ duration:0.85, ease:[0.16,1,0.3,1] }}>

            <div className="eyebrow mb-3">Hall of Fame</div>
            <h2 className="font-display font-black text-[#1C1C1E] text-[clamp(1.9rem,4.5vw,3rem)] leading-tight mb-3">
              Champion's <span className="text-gold-gradient">journey</span>
            </h2>
            <p className="text-[#555] text-[0.95rem] leading-relaxed mb-8 max-w-lg">
              Years of dedication, discipline, and championship victories that inspire every member of Muscle Empire.
            </p>

            {/* Counters — 4 cols, responsive font */}
            <div className="grid grid-cols-4 gap-2 mb-10 p-4 md:p-6 rounded-2xl bg-[#1C1C1E]">
              {COUNTERS.map((c,i) => <Counter key={i} value={c.value} label={c.label} Icon={c.Icon} />)}
            </div>

            {/* Timeline */}
            <div ref={lineRef} className="relative mb-6 pt-2">
              {/* Static track */}
              <div className="absolute top-[18px] left-0 right-0 h-[1.5px] bg-black/10 z-0" />
              {/* Animated fill */}
              <motion.div
                className="absolute top-[18px] left-0 h-[1.5px] z-0 rounded-full"
                style={{ background: "linear-gradient(90deg,#E8A820,#FF9500)" }}
                initial={{ width: "0%" }}
                animate={inView ? { width: "100%" } : {}}
                transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
              />

              <div className="flex gap-5 md:gap-7 overflow-x-auto pb-2 relative z-10"
                style={{ scrollSnapType:"x mandatory" }}>
                {MILESTONES.map((ms, i) => (
                  <button key={i} onClick={() => { setActive(i); reset(); }}
                    className="flex flex-col items-center gap-2 shrink-0 focus:outline-none"
                    style={{ scrollSnapAlign:"start" }}>
                    <motion.div
                      animate={{
                        width:  i === active ? 32 : 22,
                        height: i === active ? 32 : 22,
                        background: i === active ? "#E8A820" : "transparent",
                        boxShadow: i === active ? "0 0 0 6px rgba(232,168,32,0.22),0 0 20px rgba(232,168,32,0.45)" : "none",
                        border: i === active ? "none" : "1.5px solid rgba(232,168,32,0.40)",
                      }}
                      transition={{ duration:0.32 }}
                      className="rounded-full flex items-center justify-center"
                    >
                      <Trophy size={i === active ? 12 : 10}
                        className={i === active ? "text-black" : "text-[#E8A820]/60"}
                        strokeWidth={i === active ? 3 : 1.5} />
                    </motion.div>
                    <span className={`text-[10px] md:text-[11px] font-black uppercase tracking-wide whitespace-nowrap transition-colors ${
                      i === active ? "text-[#E8A820]" : "text-[#1C1C1E]/45"
                    }`}>{ms.year}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Scrollable achievement cards */}
            <div className="overflow-y-auto max-h-[260px] pr-1" style={{ scrollbarWidth:"thin" }}>
              <AnimatePresence mode="wait">
                <AchievementCard key={active} ms={MILESTONES[active]} />
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

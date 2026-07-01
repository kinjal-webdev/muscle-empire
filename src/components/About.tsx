import { motion } from "framer-motion";
import { Trophy, Medal, Award } from "lucide-react";
import aboutImg from "@/assets/images/about-img.png";

const achievements = [
  {
    year: "2011",
    level: "Junior",
    icon: Trophy,
    items: [
      { title: "Mumbai Kishor",      result: "Overall Champion" },
      { title: "Maharashtra Kishor", result: "Gold Medal" },
      { title: "Bharat Kishor",      result: "Gold Medal" },
    ],
  },
  {
    year: "2012 – 2016",
    level: "Junior (Multiple Years)",
    icon: Trophy,
    items: [
      { title: "Mumbai Kumar",      result: "Overall Champion" },
      { title: "Maharashtra Kumar", result: "Gold Medal" },
      { title: "Bharat Kumar",      result: "Gold Medal" },
    ],
  },
  {
    year: "2017",
    level: "Senior",
    icon: Trophy,
    items: [
      { title: "Mumbai Shree",      result: "Overall Champion" },
      { title: "Maharashtra Shree", result: "Gold Medal" },
      { title: "Bharat Shree",      result: "Gold Medal" },
    ],
  },
  {
    year: "Mumbai University",
    level: "University Championships",
    icon: Medal,
    items: [
      { title: "2012–13", result: "Silver Medal" },
      { title: "2013–14", result: "Gold Medal" },
      { title: "2015–16", result: "Gold Medal" },
      { title: "2016–17", result: "Silver Medal" },
    ],
  },
  {
    year: "AIU – All India University",
    level: "National University Level",
    icon: Award,
    items: [
      { title: "2013–14", result: "Represented Mumbai University" },
      { title: "2015–16", result: "Bronze Medal" },
    ],
  },
];

function resultColor(result: string) {
  if (result.includes("Overall") || result.includes("Gold"))   return "#F59E0B";
  if (result.includes("Silver"))                               return "#9CA3AF";
  if (result.includes("Bronze"))                               return "#D97706";
  return "#60A5FA";
}

export default function About() {
  return (
    <section id="about" className="py-28 bg-[#F8F9FA] relative overflow-hidden">
      {/* Subtle top divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* ── Image Side ─────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            {/* Card wrapper */}
            <div className="relative rounded-[24px] overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.18)] group">
              {/* Colour overlay that fades on hover */}
              <div className="absolute inset-0 bg-[#FFC107]/15 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-500" />
              <img
                src={aboutImg}
                alt="Champion Athlete – Sagar Kharat"
                className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
              />
              {/* Bottom gradient */}
              <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent z-20" />
            </div>

            {/* Stat badge */}
            <motion.div
              className="absolute -bottom-5 right-6 bg-[#FFC107] text-black rounded-2xl px-6 py-4 shadow-[0_8px_32px_rgba(255,193,7,0.4)] z-30"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45, duration: 0.6 }}
            >
              <div className="text-3xl font-black leading-none">10+</div>
              <div className="text-[11px] font-bold uppercase tracking-wider mt-1 text-black/70 leading-tight">
                National &<br />State Titles
              </div>
            </motion.div>
          </motion.div>

          {/* ── Timeline Side ──────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="pt-4 lg:pt-0"
          >
            <div className="section-label mb-3" style={{ color: "#FFC107" }}>
              <span className="w-7 h-0.5 bg-[#FFC107] rounded-full inline-block" />
              Hall of Fame
            </div>
            <h3 className="font-display font-black text-[clamp(2rem,5vw,2.8rem)] text-[#111] leading-tight tracking-tight mb-10">
              Champion's{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #FFC107, #FF8C00)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Timeline
              </span>
            </h3>

            {/* Timeline */}
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-5 top-2 bottom-2 w-0.5 bg-gradient-to-b from-[#FFC107] via-[#FFC107]/30 to-transparent rounded-full" />

              <div className="space-y-5">
                {achievements.map((block, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="relative pl-14"
                  >
                    {/* Timeline dot */}
                    <div className="absolute left-2.5 top-3 w-5 h-5 bg-[#FFC107] rounded-full flex items-center justify-center shadow-[0_0_14px_rgba(255,193,7,0.6)]">
                      <block.icon size={10} className="text-black" />
                    </div>

                    {/* Card */}
                    <div className="bg-white border border-black/[0.07] rounded-2xl p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_6px_24px_rgba(0,0,0,0.1)] transition-shadow duration-300">
                      {/* Year & level */}
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <span className="pill bg-[#FFC107]/15 text-[#92700A] text-[10px]">
                          {block.year}
                        </span>
                        <span className="text-[11px] text-[#888] font-medium">{block.level}</span>
                      </div>

                      {/* Medals */}
                      <div className="space-y-2">
                        {block.items.map((item, i) => (
                          <div key={i} className="flex items-center justify-between gap-3">
                            <span className="text-sm text-[#555]">{item.title}</span>
                            <span
                              className="text-[11px] font-black uppercase tracking-wide shrink-0"
                              style={{ color: resultColor(item.result) }}
                            >
                              {item.result}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

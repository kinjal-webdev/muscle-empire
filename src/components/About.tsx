import { motion } from "framer-motion";
import { Trophy, Medal, Award } from "lucide-react";
import aboutImg from "@/assets/images/about-img.png";

const achievements = [
  {
    year: "2011",
    level: "Junior",
    Icon: Trophy,
    items: [
      { title: "Mumbai Kishor",      result: "Overall Champion" },
      { title: "Maharashtra Kishor", result: "Gold Medal" },
      { title: "Bharat Kishor",      result: "Gold Medal" },
    ],
  },
  {
    year: "2012 – 2016",
    level: "Junior — multiple years",
    Icon: Trophy,
    items: [
      { title: "Mumbai Kumar",      result: "Overall Champion" },
      { title: "Maharashtra Kumar", result: "Gold Medal" },
      { title: "Bharat Kumar",      result: "Gold Medal" },
    ],
  },
  {
    year: "2017",
    level: "Senior",
    Icon: Trophy,
    items: [
      { title: "Mumbai Shree",      result: "Overall Champion" },
      { title: "Maharashtra Shree", result: "Gold Medal" },
      { title: "Bharat Shree",      result: "Gold Medal" },
    ],
  },
  {
    year: "Mumbai University",
    level: "University championships",
    Icon: Medal,
    items: [
      { title: "2012–13", result: "Silver Medal" },
      { title: "2013–14", result: "Gold Medal" },
      { title: "2015–16", result: "Gold Medal" },
      { title: "2016–17", result: "Silver Medal" },
    ],
  },
  {
    year: "All India University (AIU)",
    level: "National university level",
    Icon: Award,
    items: [
      { title: "2013–14", result: "Represented Mumbai University" },
      { title: "2015–16", result: "Bronze Medal" },
    ],
  },
];

function resultColor(r: string) {
  if (r.includes("Overall") || r.includes("Gold"))  return "#F59E0B";
  if (r.includes("Silver"))                          return "#94A3B8";
  if (r.includes("Bronze"))                          return "#D97706";
  return "#60A5FA";
}

export default function About() {
  return (
    <section id="about" className="py-28 bg-[#F0EEE9] relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-black/[0.08] to-transparent" />

      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

          {/* ── Photo ──────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div className="relative rounded-[22px] overflow-hidden group shadow-[0_24px_80px_rgba(0,0,0,0.16)]">
              <div className="absolute inset-0 bg-[#E8A820]/10 mix-blend-overlay z-10 group-hover:opacity-0 transition-opacity duration-600" />
              <img
                src={aboutImg}
                alt="Sagar Kharat — champion athlete and founder"
                className="w-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 scale-[1.02] group-hover:scale-100"
              />
              <div className="absolute bottom-0 inset-x-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent z-20" />
            </div>

            {/* Floating badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="absolute -bottom-5 right-6 z-30 bg-[#E8A820] text-[#1C1C1E] rounded-2xl px-6 py-4 shadow-[0_12px_36px_rgba(255,193,7,0.45)]"
            >
              <p className="text-3xl font-black leading-none font-display">10+</p>
              <p className="text-[10px] font-bold uppercase tracking-wider mt-0.5 text-[#1C1C1E]/65 leading-snug">
                National &amp;<br />state titles
              </p>
            </motion.div>
          </motion.div>

          {/* ── Timeline ───────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="pt-2 lg:pt-0"
          >
            <div className="eyebrow mb-4">Hall of fame</div>
            <h2 className="font-display font-black text-[#1C1C1E] text-[clamp(2rem,4.5vw,2.8rem)] mb-10">
              Champion's <span className="text-gold-gradient">timeline</span>
            </h2>

            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-[18px] top-3 bottom-3 w-px bg-gradient-to-b from-[#E8A820]/80 via-[#E8A820]/25 to-transparent" />

              <div className="space-y-4">
                {achievements.map((block, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.09, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="relative pl-12"
                  >
                    {/* Dot */}
                    <div className="absolute left-[9px] top-[14px] w-[18px] h-[18px] rounded-full bg-[#E8A820] flex items-center justify-center shadow-[0_0_12px_rgba(255,193,7,0.55)]">
                      <block.Icon size={9} className="text-[#1C1C1E]" strokeWidth={3} />
                    </div>

                    {/* Card */}
                    <div className="card-light p-5 hover:shadow-[0_8px_32px_rgba(0,0,0,0.1)]">
                      <div className="flex items-center gap-2 mb-3 flex-wrap">
                        <span className="pill bg-[#E8A820]/12 text-[#92700A] text-[10px]">{block.year}</span>
                        <span className="text-[11px] text-[#999] font-medium">{block.level}</span>
                      </div>
                      <div className="space-y-2">
                        {block.items.map((item, j) => (
                          <div key={j} className="flex items-center justify-between gap-3">
                            <span className="text-[#555] text-[0.87rem]">{item.title}</span>
                            <span className="text-[11px] font-black uppercase tracking-wide shrink-0" style={{ color: resultColor(item.result) }}>
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

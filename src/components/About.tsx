import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import aboutImg from "@/assets/images/about-img.png";

const achievements = [
  {
    year: "2011",
    level: "Junior",
    items: [
      { title: "Mumbai Kishor", result: "Overall Champion" },
      { title: "Maharashtra Kishor", result: "Gold Medal" },
      { title: "Bharat Kishor", result: "Gold Medal" },
    ],
  },
  {
    year: "2012 – 2016",
    level: "Junior (Multiple Years)",
    items: [
      { title: "Mumbai Kumar", result: "Overall Champion" },
      { title: "Maharashtra Kumar", result: "Gold Medal" },
      { title: "Bharat Kumar", result: "Gold Medal" },
    ],
  },
  {
    year: "2017",
    level: "Senior",
    items: [
      { title: "Mumbai Shree", result: "Overall Champion" },
      { title: "Maharashtra Shree", result: "Gold Medal" },
      { title: "Bharat Shree", result: "Gold Medal" },
    ],
  },
  {
    year: "Mumbai University",
    level: "University Championships",
    items: [
      { title: "2012–13", result: "Silver Medal" },
      { title: "2013–14", result: "Gold Medal" },
      { title: "2015–16", result: "Gold Medal" },
      { title: "2016–17", result: "Silver Medal" },
    ],
  },
  {
    year: "All India University (AIU)",
    level: "National University Level",
    items: [
      { title: "2013–14", result: "Represented Mumbai University" },
      { title: "2015–16", result: "Bronze Medal" },
    ],
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-secondary relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-4 border border-primary/20 pointer-events-none hidden md:block" />
            <div className="absolute -inset-4 bg-primary/10 translate-x-8 translate-y-8 pointer-events-none hidden md:block" />
            <div className="relative aspect-[4/5] overflow-hidden group">
              <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10 group-hover:bg-transparent transition-colors duration-500" />
              <img
                src={aboutImg}
                alt="Champion athlete"
                className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
              />
            </div>
            <motion.div
              className="absolute -bottom-6 -right-6 md:-right-12 bg-background border border-white/10 p-6 shadow-2xl max-w-[200px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <div className="text-4xl font-black text-primary mb-2 font-display">10+</div>
              <div className="text-sm font-bold uppercase tracking-wider text-muted-foreground leading-snug">
                National & State Titles
              </div>
            </motion.div>
          </motion.div>

          {/* Achievements Timeline */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-primary font-bold uppercase tracking-[0.2em] mb-4 text-sm flex items-center gap-2">
              <span className="w-8 h-px bg-primary inline-block" />
              Hall of Fame
            </h2>
            <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-10">
              Champion's{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-600">
                Timeline
              </span>
            </h3>

            {/* Timeline */}
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-5 top-0 bottom-0 w-px bg-primary/20" />

              <div className="space-y-8">
                {achievements.map((block, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    className="relative pl-14"
                  >
                    {/* Dot */}
                    <div className="absolute left-3 top-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center shadow-[0_0_12px_rgba(255,208,0,0.5)]">
                      <Trophy size={10} className="text-black" />
                    </div>

                    {/* Year badge */}
                    <div className="mb-2">
                      <span className="text-xs font-black uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-2 py-1">
                        {block.year}
                      </span>
                      <span className="ml-2 text-xs text-muted-foreground uppercase tracking-wider">
                        {block.level}
                      </span>
                    </div>

                    {/* Medals */}
                    <div className="bg-background/50 border border-white/5 p-4 space-y-2">
                      {block.items.map((item, i) => (
                        <div key={i} className="flex items-center justify-between gap-4">
                          <span className="text-sm text-muted-foreground">{item.title}</span>
                          <span className={`text-xs font-black uppercase tracking-wider shrink-0 ${
                            item.result.includes("Overall") || item.result.includes("Gold")
                              ? "text-primary"
                              : item.result.includes("Silver")
                              ? "text-gray-300"
                              : item.result.includes("Bronze")
                              ? "text-orange-400"
                              : "text-blue-400"
                          }`}>
                            {item.result}
                          </span>
                        </div>
                      ))}
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

import { CheckCircle2, Trophy, Clock, Target, Users2, Activity } from "lucide-react";
import { motion } from "framer-motion";

const STEPS = [
  { Icon: Trophy,       title: "Expert trainers",    desc: "Certified professionals with years of competitive coaching who push you beyond your limits and track every milestone.",       iconColor: "#F9A825", glow: "rgba(249,168,37,.22)", bg: "rgba(249,168,37,.09)"   },
  { Icon: Target,       title: "Personalised plans", desc: "No cookie-cutter routines. Every programme is designed from scratch around your unique body, schedule, and goals.",          iconColor: "#4ADE80", glow: "rgba(74,222,128,.20)",  bg: "rgba(74,222,128,.09)"   },
  { Icon: Activity,     title: "Modern equipment",   desc: "Top-tier biomechanically superior machines and an extensive free-weight range — everything you need, nothing you don't.",    iconColor: "#60A5FA", glow: "rgba(96,165,250,.20)",  bg: "rgba(96,165,250,.09)"   },
  { Icon: Users2,       title: "Strong community",   desc: "Train alongside driven people who share your relentless pursuit of progress. Accountability is built into the culture here.", iconColor: "#C084FC", glow: "rgba(192,132,252,.20)", bg: "rgba(192,132,252,.09)"  },
  { Icon: Clock,        title: "Flexible timings",   desc: "Open early morning to late night — your schedule is never an excuse to skip a session. Six days a week, all year round.",    iconColor: "#F87171", glow: "rgba(248,113,113,.20)", bg: "rgba(248,113,113,.09)"  },
  { Icon: CheckCircle2, title: "Pro assessment",     desc: "Comprehensive body composition and movement analysis before you start, so every plan begins with complete clarity.",          iconColor: "#34D399", glow: "rgba(52,211,153,.20)",  bg: "rgba(52,211,153,.09)"   },
];

/* ── Individual feature card (right side) ────────────────────── */
function FeatureCard({ step }: { step: typeof STEPS[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative rounded-[22px] overflow-hidden p-8"
      style={{
        background: `radial-gradient(circle at 30% 30%, ${step.glow} 0%, transparent 60%), #1e1e20`,
        border: `1.5px solid ${step.iconColor}30`,
        boxShadow: `0 8px 40px rgba(0,0,0,.35)`,
      }}
    >
      {/* top shimmer */}
      <div className="absolute top-0 left-[15%] right-[15%] h-px pointer-events-none"
        style={{ background: `linear-gradient(90deg,transparent,${step.iconColor}80,transparent)` }} />

      {/* badge icon */}
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
        style={{ background: step.bg, color: step.iconColor, boxShadow: `0 0 24px ${step.iconColor}35` }}
      >
        <step.Icon size={28} strokeWidth={1.8} />
      </div>

      {/* title */}
      <h3
        className="font-display font-black text-[1.35rem] leading-snug mb-3"
        style={{ color: step.iconColor }}
      >
        {step.title}
      </h3>

      {/* desc */}
      <p className="text-[#F2EFE9]/55 text-[0.9rem] leading-relaxed">{step.desc}</p>

      {/* watermark */}
      <div className="absolute bottom-4 right-4 pointer-events-none opacity-[0.07]"
        style={{ color: step.iconColor }}>
        <step.Icon size={100} strokeWidth={0.7} />
      </div>
    </motion.div>
  );
}

/* ── Section ─────────────────────────────────────────────────── */
export default function WhyChooseUs() {
  return (
    <section id="why-us" className="bg-[#1C1C1E] relative">
      {/* top divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      <div className="max-w-7xl mx-auto px-5 md:px-10">
        <div className="flex flex-col md:flex-row gap-0 md:gap-16">

          {/* ── LEFT: sticky heading ─────────────────────────── */}
          <div className="md:w-[38%] py-20 md:py-28">
            <div
              className="md:sticky md:top-[96px]"   /* 96px = navbar height */
            >
              <div className="eyebrow mb-4">The Empire standard</div>
              <h2 className="font-display font-black text-[#F2EFE9] text-[clamp(2rem,4vw,3rem)] leading-tight mb-5">
                Why train<br />
                <span className="text-gold-gradient">with us?</span>
              </h2>
              <p className="text-[#F2EFE9]/40 text-[0.97rem] leading-relaxed max-w-xs">
                From our equipment to our culture, every element is engineered for your transformation.
              </p>
            </div>
          </div>

          {/* ── RIGHT: scrolling cards ───────────────────────── */}
          <div className="md:w-[62%] py-14 md:py-28 flex flex-col gap-7">
            {STEPS.map((step, i) => (
              <FeatureCard key={i} step={step} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

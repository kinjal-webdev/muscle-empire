import { motion } from "framer-motion";
import { Check, MapPin, Clock, Star } from "lucide-react";
import { useEffect } from "react";
import { openRazorpay } from "@/lib/razorpay";
import PlanNavbar from "@/components/PlanNavbar";
import Footer from "@/components/Footer";

const address = "J/16, Jay Hanuman Mandir, Barvenagar Colony, Bhatwadi, Ghatkopar (West), Mumbai – 400084";
const timings = "06:00 AM – 11:00 PM";

const crossfitPlans = [
  { label: "Monthly",     price: "₹2,500", amount: 250000,  popular: false },
  { label: "Quarterly",   price: "₹5,500", amount: 550000,  popular: false },
  { label: "Half Yearly", price: "₹8,500", amount: 850000,  popular: false },
  { label: "Yearly",      price: "₹12,500", amount: 1250000, popular: true  },
];
const gymPlans = [
  { label: "Monthly",     price: "₹1,500", amount: 150000,  popular: false },
  { label: "Quarterly",   price: "₹3,500", amount: 350000,  popular: false },
  { label: "Half Yearly", price: "₹5,500", amount: 550000,  popular: false },
  { label: "Yearly",      price: "₹8,500", amount: 850000,  popular: true  },
];
const crossfitFeatures = ["Access to all gym equipment","Crossfit training area access","Trainer assistance","Workout guidance","Clean workout environment"];
const gymFeatures      = ["Access to all gym equipment","Trainer assistance","Strength and cardio training access","Workout guidance","Flexible workout timings"];
const addOns = [
  { title:"Personal Trainer",        subtitle:"12 Sessions", price:"₹5,000", duration:"/month",   amount:500000, features:["12 personal training sessions","Customized workout plan","Form correction","Progress monitoring"] },
  { title:"Personal Trainer",        subtitle:"Daily",       price:"₹8,000", duration:"/month",   amount:800000, features:["Daily trainer support","Personalized workout routine","Progress tracking","Diet and fitness guidance"] },
  { title:"Dietician Consultation",  subtitle:"Per Session", price:"₹800",   duration:"/session", amount:80000,  features:["Personalized diet plan","Weight loss guidance","Weight gain guidance","Nutrition consultation"] },
];

/* ── Plan cell ────────────────────────────────────────────────── */
function PlanCell({ plan, onPay }: { plan: typeof crossfitPlans[0]; onPay: () => void }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.03 }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className="relative gold-border-card rounded-xl overflow-hidden flex flex-col"
      style={{
        background: plan.popular ? "rgba(232,168,32,0.08)" : "#1a1a1c",
        boxShadow: plan.popular ? "0 0 32px rgba(232,168,32,0.15)" : "0 4px 16px rgba(0,0,0,0.3)",
      }}
    >
      {plan.popular && (
        <div className="absolute top-3 right-3 flex items-center gap-1 bg-[#E8A820] text-black text-[9px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full z-10">
          <Star size={8} fill="black" /> Most Popular
        </div>
      )}
      <div className="p-5 flex-1">
        {/* Label pill */}
        <div className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-black uppercase tracking-widest mb-3 ${
          plan.popular ? "bg-[#E8A820]/20 text-[#E8A820]" : "bg-white/[0.08] text-white/60"
        }`}>{plan.label}</div>

        {/* MRP — strikethrough */}
        {plan.mrp && (
          <p className="text-[13px] font-medium text-white/35 mb-0.5"
            style={{ textDecoration:"line-through" }}>{plan.mrp}</p>
        )}

        {/* Actual price */}
        <p className={`font-black leading-none mb-1 ${plan.popular ? "text-[#E8A820]" : "text-white"}`}
          style={{ fontSize: "clamp(1.6rem, 4vw, 2.2rem)" }}>
          {plan.price}
        </p>
        <p className="text-white/30 text-[11px]">per period</p>
      </div>
      <div className="px-5 pb-5">
        <button onClick={onPay}
          className={`w-full font-black uppercase tracking-widest py-2.5 text-xs transition-all rounded-xl ${
            plan.popular
              ? "bg-[#E8A820] hover:bg-[#d49518] text-black shadow-[0_4px_16px_rgba(232,168,32,0.35)]"
              : "bg-white/[0.08] hover:bg-white/[0.14] text-white border border-white/[0.12]"
          }`}>
          Pay Now
        </button>
      </div>
    </motion.div>
  );
}

/* ── Plan table ───────────────────────────────────────────────── */
function PlanTable({ plans, features, title }: { plans: typeof crossfitPlans; features: string[]; title: string }) {
  return (
    <motion.div
      initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true }} transition={{ duration:0.6 }}
      className="gold-border-card bg-card p-6 md:p-8 rounded-2xl"
    >
      <h3 className="text-xl font-black uppercase tracking-tight mb-1"
        style={{ background:"linear-gradient(135deg,#E8A820,#FF9500)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>
        {title}
      </h3>
      <div className="h-px bg-gradient-to-r from-[#E8A820]/40 to-transparent mb-6 mt-2" />

      <div className="grid grid-cols-2 gap-3 mb-8">
        {plans.map((plan, i) => (
          <PlanCell key={i} plan={plan} onPay={() => void openRazorpay(`${title} — ${plan.label}`, plan.amount)} />
        ))}
      </div>

      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-[#E8A820]/70 mb-3">What's Included</p>
        <ul className="space-y-2">
          {features.map((f, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
              <Check size={14} className="text-primary shrink-0" />{f}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

/* ── Add-on card ──────────────────────────────────────────────── */
function AddOnCard({ addon }: { addon: typeof addOns[0] }) {
  return (
    <motion.div
      initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true }} transition={{ duration:0.5 }}
      whileHover={{ y:-6, scale:1.02 }}
      className="gold-border-card bg-card p-6 flex flex-col rounded-2xl"
      style={{ transition:"box-shadow 0.25s" }}
    >
      <p className="text-xs text-primary font-bold uppercase tracking-widest mb-1">{addon.subtitle}</p>
      <h4 className="text-xl font-black uppercase text-white mb-4">{addon.title}</h4>
      <div className="flex items-baseline gap-1 mb-6">
        <span className="text-4xl font-black text-white">{addon.price}</span>
        <span className="text-muted-foreground text-sm">{addon.duration}</span>
      </div>
      <ul className="space-y-2 mb-6 flex-1">
        {addon.features.map((f, i) => (
          <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
            <Check size={14} className="text-primary shrink-0" />{f}
          </li>
        ))}
      </ul>
      <button onClick={() => void openRazorpay(`${addon.title} (${addon.subtitle})`, addon.amount)}
        className="w-full bg-primary hover:bg-primary/90 text-black font-black uppercase tracking-widest py-3 text-sm transition-all rounded-xl">
        Pay Now
      </button>
    </motion.div>
  );
}

export default function UnisexGymPlans() {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PlanNavbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-12">
            <p className="text-primary font-bold uppercase tracking-[0.2em] text-sm mb-3 flex items-center gap-2">
              <span className="w-8 h-px bg-primary inline-block" />Membership Plans
            </p>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4">
              Muscle Empire{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-600">Gymnasium</span>
            </h1>
            <p className="text-muted-foreground uppercase tracking-widest text-sm font-bold">Unisex Facility</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
            {[
              { Icon: MapPin, label: "Address", content: <p className="text-[#F2EFE9] text-[0.95rem] font-semibold leading-relaxed">{address}</p> },
              { Icon: Clock, label: "Timings", content: <><p className="text-[#F2EFE9] text-[0.95rem] font-black">{timings}</p><p className="text-xs text-[#F2EFE9]/50 mt-0.5">Monday to Saturday</p></> },
            ].map(({ Icon, label, content }) => (
              <motion.div key={label} whileHover={{ y:-4, scale:1.02 }} transition={{ duration:0.22 }}
                className="gold-border-card flex items-start gap-3 bg-[#1e1e20] p-5 rounded-2xl"
                style={{ boxShadow:"0 0 24px rgba(232,168,32,0.06)" }}>
                <Icon className="text-[#E8A820] shrink-0 mt-0.5" size={20} />
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#E8A820] mb-1">{label}</p>
                  {content}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-black uppercase tracking-tight text-white mb-2">Membership Plans</h2>
            <p className="text-muted-foreground text-sm mb-8">Choose the plan that fits your commitment.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
            <PlanTable title="Gym & Crossfit" plans={crossfitPlans} features={crossfitFeatures} />
            <PlanTable title="Gym Only"       plans={gymPlans}      features={gymFeatures}      />
          </div>

          <div className="mb-6">
            <h2 className="text-2xl font-black uppercase tracking-tight text-white mb-2">Add-On Services</h2>
            <p className="text-muted-foreground text-sm mb-8">Accelerate your results with expert support.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {addOns.map((a, i) => <AddOnCard key={i} addon={a} />)}
          </div>
          <p className="text-center text-xs text-muted-foreground mt-10 uppercase tracking-widest">
            Secured by Razorpay · UPI · Cards · Net Banking · Wallets
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

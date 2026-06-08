import { motion } from "framer-motion";
import { Check, MapPin, Clock } from "lucide-react";
import { openRazorpay } from "@/lib/razorpay";
import PlanNavbar from "@/components/PlanNavbar";
import Footer from "@/components/Footer";

const address = "J/16, Jay Hanuman Mandir, Barvenagar Colony, Bhatwadi, Ghatkopar (West), Mumbai – 400084";
const timings = "06:00 AM – 11:00 PM";

const crossfitPlans = [
  { label: "Monthly", price: "₹2,500", amount: 250000 },
  { label: "Quarterly", price: "₹5,500", amount: 550000 },
  { label: "Half Yearly", price: "₹8,500", amount: 850000 },
  { label: "Yearly", price: "₹12,500", amount: 1250000 },
];

const gymPlans = [
  { label: "Monthly", price: "₹1,500", amount: 150000 },
  { label: "Quarterly", price: "₹3,500", amount: 350000 },
  { label: "Half Yearly", price: "₹5,500", amount: 550000 },
  { label: "Yearly", price: "₹8,500", amount: 850000 },
];

const crossfitFeatures = [
  "Access to all gym equipment",
  "Crossfit training area access",
  "Trainer assistance",
  "Workout guidance",
  "Clean workout environment",
];

const gymFeatures = [
  "Access to all gym equipment",
  "Trainer assistance",
  "Strength and cardio training access",
  "Workout guidance",
  "Flexible workout timings",
];

const addOns = [
  {
    title: "Personal Trainer",
    subtitle: "12 Sessions",
    price: "₹5,000",
    duration: "/month",
    amount: 500000,
    features: [
      "12 personal training sessions",
      "Customized workout plan",
      "Form correction",
      "Progress monitoring",
    ],
  },
  {
    title: "Personal Trainer",
    subtitle: "Daily",
    price: "₹8,000",
    duration: "/month",
    amount: 800000,
    features: [
      "Daily trainer support",
      "Personalized workout routine",
      "Progress tracking",
      "Diet and fitness guidance",
    ],
  },
  {
    title: "Dietician Consultation",
    subtitle: "Per Session",
    price: "₹800",
    duration: "/session",
    amount: 80000,
    features: [
      "Personalized diet plan",
      "Weight loss guidance",
      "Weight gain guidance",
      "Nutrition consultation",
    ],
  },
];

function PlanTable({
  plans,
  features,
  title,
}: {
  plans: typeof crossfitPlans;
  features: string[];
  title: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="bg-card border border-border p-6 md:p-8"
    >
      <h3 className="text-xl font-black uppercase tracking-tight text-white mb-6 border-b border-border pb-4">
        {title}
      </h3>

      {/* Plan table */}
      <div className="grid grid-cols-2 gap-3 mb-8">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className="bg-background border border-border p-4 flex flex-col gap-3 hover:border-primary/50 transition-colors"
          >
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">{plan.label}</p>
              <p className="text-2xl font-black text-white mt-1">{plan.price}</p>
            </div>
            <button
              onClick={() => void openRazorpay(`${title} — ${plan.label}`, plan.amount)}
              className="w-full bg-primary hover:bg-primary/90 text-black font-black uppercase tracking-widest py-2.5 text-xs transition-all"
            >
              Pay Now
            </button>
          </div>
        ))}
      </div>

      {/* Features */}
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">
          What's Included
        </p>
        <ul className="space-y-2">
          {features.map((f, i) => (
            <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
              <Check size={14} className="text-primary shrink-0" />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

function AddOnCard({ addon }: { addon: (typeof addOns)[0] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-card border border-border p-6 flex flex-col hover:border-primary/40 transition-colors"
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
            <Check size={14} className="text-primary shrink-0" />
            {f}
          </li>
        ))}
      </ul>
      <button
        onClick={() => void openRazorpay(`${addon.title} (${addon.subtitle})`, addon.amount)}
        className="w-full bg-primary hover:bg-primary/90 text-black font-black uppercase tracking-widest py-3 text-sm transition-all"
      >
        Pay Now
      </button>
    </motion.div>
  );
}

export default function UnisexGymPlans() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <PlanNavbar scrollKey="scroll_before_plans" />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 md:px-6">

          {/* Hero header */}
          <div className="mb-12">
            <p className="text-primary font-bold uppercase tracking-[0.2em] text-sm mb-3 flex items-center gap-2">
              <span className="w-8 h-px bg-primary inline-block" />
              Membership Plans
            </p>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4">
              Muscle Empire{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-600">
                Gymnasium
              </span>
            </h1>
            <p className="text-muted-foreground uppercase tracking-widest text-sm font-bold">Unisex Facility</p>
          </div>

          {/* Info bar */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-16">
            <div className="flex items-start gap-3 bg-card border border-border p-5">
              <MapPin className="text-primary shrink-0 mt-0.5" size={20} />
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Address</p>
                <p className="text-white text-sm leading-relaxed">{address}</p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-card border border-border p-5">
              <Clock className="text-primary shrink-0 mt-0.5" size={20} />
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">Timings</p>
                <p className="text-white text-sm font-bold">{timings}</p>
                <p className="text-xs text-muted-foreground mt-0.5">Monday to Saturday</p>
              </div>
            </div>
          </div>

          {/* Membership plans */}
          <div className="mb-6">
            <h2 className="text-2xl font-black uppercase tracking-tight text-white mb-2">Membership Plans</h2>
            <p className="text-muted-foreground text-sm mb-8">Choose the plan that fits your commitment.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
            <PlanTable
              title="Gym & Crossfit Membership"
              plans={crossfitPlans}
              features={crossfitFeatures}
            />
            <PlanTable
              title="Gym Membership"
              plans={gymPlans}
              features={gymFeatures}
            />
          </div>

          {/* Add-ons */}
          <div className="mb-6">
            <h2 className="text-2xl font-black uppercase tracking-tight text-white mb-2">Add-On Services</h2>
            <p className="text-muted-foreground text-sm mb-8">Accelerate your results with expert support.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {addOns.map((addon, idx) => (
              <AddOnCard key={idx} addon={addon} />
            ))}
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

import { motion } from "framer-motion";
import { Check, MapPin, Clock } from "lucide-react";
import { useEffect } from "react";
import { openRazorpay } from "@/lib/razorpay";
import PlanNavbar from "@/components/PlanNavbar";
import Footer from "@/components/Footer";

const address = "1st Floor, Ranveer Apartment, Sanjay Kokate Lane, Bhatwadi, Ghatkopar (West), Mumbai – 400084";
const timings = [
  { label: "Morning", time: "06:00 AM – 12:00 PM" },
  { label: "Evening", time: "04:00 PM – 10:00 PM" },
];

const gymPlans = [
  { label: "Monthly", price: "₹1,500", amount: 150000 },
  { label: "Quarterly", price: "₹3,000", amount: 300000 },
  { label: "Half Yearly", price: "₹5,000", amount: 500000 },
  { label: "Yearly", price: "₹7,500", amount: 750000 },
];

const gymFeatures = [
  "Access to all gym equipment",
  "Female-friendly workout environment",
  "Trainer assistance",
  "Workout guidance",
  "Cardio and strength training access",
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
      "Customized fitness plan",
      "Progress monitoring",
      "Form correction",
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
      "Fitness coaching",
    ],
  },
  {
    title: "Dietician Consultation",
    subtitle: "Per Session",
    price: "₹800",
    duration: "/session",
    amount: 80000,
    features: [
      "Personalized nutrition plan",
      "Weight management guidance",
      "Lifestyle recommendations",
    ],
  },
];

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

export default function FemaleGymPlans() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PlanNavbar />
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
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-primary">
                Crossfit Studio
              </span>
            </h1>
            <p className="text-pink-400 uppercase tracking-widest text-sm font-bold">♀ Female Only Facility</p>
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
                {timings.map((t) => (
                  <p key={t.label} className="text-white text-sm font-bold">
                    {t.label}: <span className="text-muted-foreground font-normal">{t.time}</span>
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Gym Membership */}
          <div className="mb-6">
            <h2 className="text-2xl font-black uppercase tracking-tight text-white mb-2">Gym Membership</h2>
            <p className="text-muted-foreground text-sm mb-8">Choose the plan that fits your commitment.</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-card border border-border p-6 md:p-8 mb-20"
          >
            {/* Plan grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              {gymPlans.map((plan, idx) => (
                <div
                  key={idx}
                  className="bg-background border border-border p-4 flex flex-col gap-3 hover:border-primary/50 transition-colors"
                >
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">{plan.label}</p>
                    <p className="text-2xl font-black text-white mt-1">{plan.price}</p>
                  </div>
                  <button
                    onClick={() => void openRazorpay(`Gym Membership — ${plan.label}`, plan.amount)}
                    className="w-full bg-primary hover:bg-primary/90 text-black font-black uppercase tracking-widest py-2.5 text-xs transition-all"
                  >
                    Pay Now
                  </button>
                </div>
              ))}
            </div>

            {/* Features */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3">What's Included</p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {gymFeatures.map((f, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-300">
                    <Check size={14} className="text-primary shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>

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

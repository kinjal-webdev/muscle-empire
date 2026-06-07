import { motion } from "framer-motion";
import { Check } from "lucide-react";

// Razorpay amounts in paise (₹1 = 100 paise)
const plans = [
  {
    name: "Monthly",
    price: "₹2,500",
    amount: 250000,
    duration: "/month",
    desc: "Perfect for short-term commitment and testing the waters.",
    features: [
      "Access to all gym equipment",
      "Free initial fitness assessment",
      "Locker room access",
      "1 Group class per week",
    ],
    popular: false,
  },
  {
    name: "Quarterly",
    price: "₹6,500",
    amount: 650000,
    duration: "/3 months",
    desc: "The sweet spot. Commit to a 90-day transformation.",
    features: [
      "Everything in Monthly",
      "Personalized workout plan",
      "Nutrition guidelines",
      "Unlimited group classes",
      "1 PT session per month",
    ],
    popular: true,
  },
  {
    name: "Annual",
    price: "₹22,000",
    amount: 2200000,
    duration: "/year",
    desc: "For the dedicated. Make fitness a permanent lifestyle.",
    features: [
      "Everything in Quarterly",
      "Advanced body composition tracking",
      "Priority class booking",
      "Free gym merchandise",
      "Pause membership up to 30 days",
    ],
    popular: false,
  },
];

// NOTE: Replace with your actual Razorpay Key ID from the Razorpay Dashboard.
// Get it from: https://dashboard.razorpay.com → Settings → API Keys
const RAZORPAY_KEY = "rzp_test_SynqIBDguhSpda";

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if ((window as any).Razorpay) { resolve(true); return; }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

async function openRazorpay(plan: (typeof plans)[0]) {
  if (RAZORPAY_KEY === "rzp_test_XXXXXXXXXXXXXXXX") {
    alert(
      "⚠️ Razorpay is not configured yet.\n\n" +
      "To enable payments:\n" +
      "1. Go to dashboard.razorpay.com\n" +
      "2. Settings → API Keys → Generate Key\n" +
      "3. Replace RAZORPAY_KEY in Pricing.tsx with your key"
    );
    return;
  }

  const loaded = await loadRazorpayScript();
  if (!loaded) {
    alert("Could not load payment gateway. Check your internet connection.");
    return;
  }

  const options = {
    key: RAZORPAY_KEY,
    amount: plan.amount,
    currency: "INR",
    name: "Muscle Empire Gymnasium",
    description: `${plan.name} Membership`,
    image: "/favicon.svg",
    prefill: { contact: "", email: "" },
    theme: { color: "#FFD000" },
    handler: function (response: { razorpay_payment_id: string }) {
      alert(
        `✅ Payment successful!\nPayment ID: ${response.razorpay_payment_id}\n\nWelcome to the Empire!`
      );
    },
    modal: {
      ondismiss: function () {
        console.log("Payment modal closed.");
      },
    },
  };

  const rzp = new (window as any).Razorpay(options);
  rzp.on("payment.failed", function (response: any) {
    alert(`❌ Payment failed: ${response.error.description}`);
  });
  rzp.open();
}

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-secondary relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-primary font-bold uppercase tracking-[0.2em] mb-4 text-sm flex items-center justify-center gap-2">
            <span className="w-8 h-px bg-primary inline-block" />
            Join The Empire
            <span className="w-8 h-px bg-primary inline-block" />
          </h2>
          <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-6">
            Invest in{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-600">
              Yourself
            </span>
          </h3>
          <p className="text-muted-foreground text-lg">
            Transparent pricing. No hidden fees. Choose the commitment level
            that matches your ambition.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <motion.div
              key={idx}
              className={`relative bg-background border ${
                plan.popular
                  ? "border-primary shadow-[0_0_30px_rgba(255,208,0,0.1)]"
                  : "border-border"
              } p-8 flex flex-col`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-black font-bold uppercase tracking-widest text-xs py-1 px-4 clip-path-slant">
                  Most Popular
                </div>
              )}

              <div className="mb-8 border-b border-border pb-8">
                <h4 className="text-2xl font-black uppercase tracking-tight text-white mb-2">
                  {plan.name}
                </h4>
                <p className="text-muted-foreground text-sm h-10">{plan.desc}</p>
                <div className="mt-6 flex items-baseline gap-1">
                  <span className="text-5xl font-display font-black text-white">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground font-medium">
                    {plan.duration}
                  </span>
                </div>
              </div>

              <ul className="flex-1 space-y-4 mb-8">
                {plan.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => void openRazorpay(plan)}
                className={`w-full font-bold uppercase tracking-widest rounded-none h-14 text-sm transition-all ${
                  plan.popular
                    ? "bg-primary text-black hover:bg-primary/90"
                    : "bg-white/5 text-white hover:bg-white hover:text-black border border-white/10"
                }`}
              >
                Pay Now — {plan.price}
              </button>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8 uppercase tracking-widest">
          Secured by Razorpay · UPI · Cards · Net Banking · Wallets
        </p>
      </div>
    </section>
  );
}

import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, MapPin, Mail, CheckCircle2 } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { APPS_SCRIPT_URL } from "@/lib/sheets";

const OWNER_PHONE = "919773053632";

const requirements = [
  { value: "full_body",   label: "Full Body Workout" },
  { value: "weight_gain", label: "Weight Gain" },
  { value: "weight_loss", label: "Weight Loss" },
  { value: "muscle_gain", label: "Muscle Gain" },
  { value: "cardio",      label: "Cardio" },
];

const contactLinks = [
  {
    icon: FaWhatsapp,
    title: "WhatsApp Us",
    value: "+91 97730 53632",
    href: `https://wa.me/${OWNER_PHONE}`,
    action: "Chat Now",
    color: "#25D366",
  },
  {
    icon: Phone,
    title: "Call Us",
    value: "+91 97730 53632",
    href: "tel:+919773053632",
    action: "Call Now",
    color: "#FFC107",
  },
  {
    icon: Phone,
    title: "Office",
    value: "+91 97022 68603",
    href: "tel:+919702268603",
    action: "Call Now",
    color: "#FFC107",
  },
  {
    icon: MapPin,
    title: "Unisex Gym — Ghatkopar West",
    value: "J/16, Jay Hanuman Mandir, Barvenagar Colony, Bhatwadi, Ghatkopar (West)",
    href: "https://maps.google.com/?q=Muscle+Empire+Gymnasium+Ghatkopar+West+Mumbai",
    action: "Directions",
    color: "#EF4444",
  },
  {
    icon: MapPin,
    title: "Female Gym — Ghatkopar West",
    value: "1st Floor, Ranveer Apartment, Sanjay Kokate Lane, Bhatwadi, Ghatkopar (West)",
    href: "https://maps.google.com/?q=Ranveer+Apartment+Sanjay+Kokate+Lane+Bhatwadi+Ghatkopar+West+Mumbai",
    action: "Directions",
    color: "#EF4444",
  },
  {
    icon: Mail,
    title: "Email Us",
    value: "musclempire616@gmail.com",
    href: "mailto:musclempire616@gmail.com",
    action: "Send Email",
    color: "#6366F1",
  },
];

const inputClass =
  "w-full bg-white border border-black/[0.12] focus:border-[#FFC107] focus:ring-2 focus:ring-[#FFC107]/20 outline-none rounded-xl h-12 px-4 text-[#111] placeholder:text-[#bbb] text-sm transition-all duration-200 shadow-[0_1px_4px_rgba(0,0,0,0.05)]";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", age: "", requirement: "", phone: "", notes: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim() || form.name.trim().length < 2) e.name = "Name must be at least 2 characters.";
    if (!form.age || isNaN(Number(form.age)) || Number(form.age) < 10 || Number(form.age) > 90) e.age = "Enter a valid age (10–90).";
    if (!form.requirement) e.requirement = "Please select a goal.";
    if (!form.phone.trim() || !/^\+?[0-9]{10,13}$/.test(form.phone.replace(/\s/g, ""))) e.phone = "Enter a valid phone number (10–13 digits).";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});

    const reqLabel = requirements.find((r) => r.value === form.requirement)?.label || form.requirement;
    const today = new Date().toLocaleDateString("en-IN");
    const params = new URLSearchParams({ action: "enquiry", date: today, name: form.name, phone: form.phone, age: form.age, goal: reqLabel, notes: form.notes });
    fetch(`${APPS_SCRIPT_URL}?${params.toString()}`, { redirect: "follow" }).catch(() => null);

    const msg = encodeURIComponent(
      `Hi! I'd like to join Muscle Empire.\n\n*Name:* ${form.name}\n*Age:* ${form.age}\n*Goal:* ${reqLabel}\n*My Phone:* ${form.phone}` +
      (form.notes ? `\n*Notes:* ${form.notes}` : "")
    );
    window.open(`https://wa.me/${OWNER_PHONE}?text=${msg}`, "_blank");
    setSubmitted(true);
    setTimeout(() => { setSubmitted(false); setForm({ name: "", age: "", requirement: "", phone: "", notes: "" }); }, 5000);
  };

  return (
    <section id="contact" className="py-28 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="section-label justify-center mb-3" style={{ color: "#FFC107" }}>
            <span className="w-7 h-0.5 bg-[#FFC107] rounded-full inline-block" />
            Reach Out
            <span className="w-7 h-0.5 bg-[#FFC107] rounded-full inline-block" />
          </div>
          <h3 className="font-display font-black text-[clamp(2rem,5vw,3rem)] text-[#111] leading-tight tracking-tight">
            Step Into The{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #FFC107, #FF8C00)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Arena
            </span>
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">

          {/* ── Info Side ──────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          >
            <h4 className="text-2xl font-black text-[#111] tracking-tight mb-3">Contact Information</h4>
            <p className="text-[#666] mb-6 leading-relaxed">
              Ready to transform? Have questions about our programs? Drop us a line or visit the facility.
            </p>

            {/* Hours */}
            <div className="mb-8 p-5 bg-[#F8F9FA] border border-black/[0.07] rounded-2xl">
              <span className="text-[11px] font-black uppercase tracking-wider text-[#FFC107] block mb-2">Operating Hours</span>
              <p className="text-[#333] text-sm font-semibold">Unisex Gym: Mon–Sat 6:00 AM – 11:00 PM</p>
              <p className="text-[#333] text-sm font-semibold">Female Gym: Mon–Sat 6:00 AM – 12:00 PM &amp; 4:00 PM – 10:00 PM</p>
            </div>

            {/* Contact links */}
            <div className="flex flex-col gap-3">
              {contactLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-[#F8F9FA] border border-black/[0.07] rounded-2xl hover:border-[#FFC107]/50 hover:shadow-[0_4px_16px_rgba(0,0,0,0.08)] group transition-all duration-200"
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-white shrink-0 transition-transform duration-200 group-hover:scale-110"
                    style={{ backgroundColor: link.color }}
                  >
                    <link.icon size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#888] mb-0.5">{link.title}</p>
                    <p className="text-[#111] font-semibold text-sm truncate">{link.value}</p>
                  </div>
                  <span className="text-[11px] font-black text-[#FFC107] uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity shrink-0 hidden sm:block">
                    {link.action} &rarr;
                  </span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* ── Form Side ──────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="bg-[#F8F9FA] border border-black/[0.07] rounded-[24px] p-8 md:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.06)]"
          >
            <h4 className="text-2xl font-black text-[#111] tracking-tight mb-1">Send a Message</h4>
            <p className="text-[#888] text-sm mb-8">
              We'll open WhatsApp with your details pre-filled — straight to our team.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-14 text-center"
              >
                <div className="w-20 h-20 bg-[#FFC107]/15 rounded-full flex items-center justify-center mb-6 text-[#FFC107]">
                  <CheckCircle2 size={40} />
                </div>
                <h5 className="text-2xl font-black text-[#111] mb-2">WhatsApp Opened!</h5>
                <p className="text-[#888]">Your message is ready to send. We'll get back to you shortly.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Name */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-[#888] mb-1.5">Full Name</label>
                  <input type="text" placeholder="John Doe" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                {/* Age */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-[#888] mb-1.5">Age</label>
                  <input type="number" placeholder="25" min={10} max={90} value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })} className={inputClass} />
                  {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
                </div>

                {/* Goal */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-[#888] mb-2">My Goal</label>
                  <div className="grid grid-cols-2 gap-2">
                    {requirements.map((r) => (
                      <label
                        key={r.value}
                        className={`flex items-center gap-2.5 p-3 border rounded-xl cursor-pointer transition-all duration-200 text-sm font-semibold ${
                          form.requirement === r.value
                            ? "border-[#FFC107] bg-[#FFC107]/10 text-[#92700A]"
                            : "border-black/[0.09] bg-white text-[#555] hover:border-[#FFC107]/40"
                        }`}
                      >
                        <input type="radio" name="requirement" value={r.value} checked={form.requirement === r.value} onChange={(e) => setForm({ ...form, requirement: e.target.value })} className="accent-[#FFC107] w-3.5 h-3.5 shrink-0" />
                        {r.label}
                      </label>
                    ))}
                  </div>
                  {errors.requirement && <p className="text-red-500 text-xs mt-1">{errors.requirement}</p>}
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-[#888] mb-1.5">Your Phone</label>
                  <input type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-widest text-[#888] mb-1.5">
                    Additional Notes <span className="normal-case text-[#bbb] font-normal">(optional)</span>
                  </label>
                  <textarea
                    placeholder="Any specific questions, preferred timings, or anything you'd like us to know..."
                    rows={3}
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="w-full bg-white border border-black/[0.12] focus:border-[#FFC107] focus:ring-2 focus:ring-[#FFC107]/20 outline-none rounded-xl px-4 py-3 text-[#111] placeholder:text-[#bbb] text-sm transition-all duration-200 shadow-[0_1px_4px_rgba(0,0,0,0.05)] resize-none"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-black uppercase tracking-wide h-14 rounded-xl transition-all duration-200 text-sm hover:shadow-[0_6px_24px_rgba(37,211,102,0.4)] hover:-translate-y-0.5"
                >
                  <FaWhatsapp size={20} />
                  Send via WhatsApp
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

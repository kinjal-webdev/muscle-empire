import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, MapPin, CheckCircle2 } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const OWNER_PHONE = "919773053632";

const requirements = [
  { value: "full_body", label: "Full Body Workout" },
  { value: "weight_gain", label: "Weight Gain" },
  { value: "weight_loss", label: "Weight Loss" },
  { value: "muscle_gain", label: "Muscle Gain" },
  { value: "cardio", label: "Cardio" },
];

const contactLinks = [
  {
    icon: FaWhatsapp,
    title: "WhatsApp Us",
    value: "+91 97730 53632",
    href: `https://wa.me/${OWNER_PHONE}`,
    action: "Chat Now",
  },
  {
    icon: Phone,
    title: "Call Us",
    value: "+91 97730 53632",
    href: "tel:+919773053632",
    action: "Call Now",
  },
  {
    icon: MapPin,
    title: "Unisex Gym — Ghatkopar West",
    value: "J/16, Jay Hanuman Mandir, Barvenagar Colony, Bhatwadi, Ghatkopar (West)",
    href: "https://maps.google.com/?q=Muscle+Empire+Gymnasium+Ghatkopar+West+Mumbai",
    action: "Get Directions",
  },
  {
    icon: MapPin,
    title: "Female Gym — Ghatkopar West",
    value: "1st Floor, Ranveer Apartment, Sanjay Kokate Lane, Bhatwadi, Ghatkopar (West)",
    href: "https://maps.google.com/?q=Ranveer+Apartment+Sanjay+Kokate+Lane+Bhatwadi+Ghatkopar+West+Mumbai",
    action: "Get Directions",
  },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    age: "",
    requirement: "",
    phone: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim() || form.name.trim().length < 2)
      e.name = "Name must be at least 2 characters.";
    if (!form.age || isNaN(Number(form.age)) || Number(form.age) < 10 || Number(form.age) > 90)
      e.age = "Enter a valid age between 10 and 90.";
    if (!form.requirement) e.requirement = "Please select a requirement.";
    if (!form.phone.trim() || !/^\+?[0-9]{10,13}$/.test(form.phone.replace(/\s/g, "")))
      e.phone = "Enter a valid phone number (10–13 digits).";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});

    const reqLabel =
      requirements.find((r) => r.value === form.requirement)?.label || form.requirement;

    const msg = encodeURIComponent(
      `Hi! I'd like to join Muscle Empire.\n\n` +
        `*Name:* ${form.name}\n` +
        `*Age:* ${form.age}\n` +
        `*Goal:* ${reqLabel}\n` +
        `*My Phone:* ${form.phone}`
    );

    window.open(`https://wa.me/${OWNER_PHONE}?text=${msg}`, "_blank");
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", age: "", requirement: "", phone: "" });
    }, 5000);
  };

  return (
    <section id="contact" className="py-24 bg-secondary relative">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-primary font-bold uppercase tracking-[0.2em] mb-4 text-sm flex items-center justify-center gap-2">
            <span className="w-8 h-px bg-primary inline-block" />
            Reach Out
            <span className="w-8 h-px bg-primary inline-block" />
          </h2>
          <h3 className="text-4xl md:text-5xl font-black uppercase tracking-tight">
            Step Into The{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-600">
              Arena
            </span>
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* Info Side */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-12">
              <h4 className="text-2xl font-black uppercase tracking-wide mb-4">
                Contact Information
              </h4>
              <p className="text-muted-foreground">
                Ready to transform? Have questions about our programs? Drop us a
                line or visit the facility. We're ready when you are.
              </p>
              <div className="mt-6 p-4 bg-background border border-border inline-block">
                <span className="text-primary font-bold uppercase tracking-wider text-sm block mb-1">
                  Operating Hours
                </span>
                <span className="text-white font-medium">
                  Monday to Saturday: 6:00 AM onwards
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {contactLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-6 p-6 bg-background border border-border hover:border-primary/50 group transition-all hover:bg-card"
                >
                  <div className="w-12 h-12 bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-black transition-colors">
                    <link.icon size={24} />
                  </div>
                  <div className="flex-1">
                    <h5 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">
                      {link.title}
                    </h5>
                    <p className="text-white font-medium">{link.value}</p>
                  </div>
                  <span className="text-sm font-bold text-primary uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0 hidden sm:block">
                    {link.action} &rarr;
                  </span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Form Side */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-background border border-border p-8 md:p-10 relative"
          >
            <h4 className="text-2xl font-black uppercase tracking-wide mb-2">
              Send a Message
            </h4>
            <p className="text-muted-foreground text-sm mb-8">
              Fill in your details and we'll open WhatsApp with your info
              pre-filled — straight to our team.
            </p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-12 text-center min-h-[400px]"
              >
                <div className="w-20 h-20 bg-primary/20 flex items-center justify-center mb-6 text-primary">
                  <CheckCircle2 size={40} />
                </div>
                <h5 className="text-2xl font-bold uppercase mb-2">
                  WhatsApp Opened!
                </h5>
                <p className="text-muted-foreground">
                  Your message is ready to send. We'll get back to you shortly.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* Name */}
                <div>
                  <label className="block uppercase text-xs font-bold tracking-widest text-muted-foreground mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-transparent border border-white/10 focus:border-primary focus:outline-none rounded-none h-12 px-4 text-white placeholder:text-white/30 transition-colors"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Age */}
                <div>
                  <label className="block uppercase text-xs font-bold tracking-widest text-muted-foreground mb-2">
                    Age
                  </label>
                  <input
                    type="number"
                    placeholder="25"
                    min={10}
                    max={90}
                    value={form.age}
                    onChange={(e) => setForm({ ...form, age: e.target.value })}
                    className="w-full bg-transparent border border-white/10 focus:border-primary focus:outline-none rounded-none h-12 px-4 text-white placeholder:text-white/30 transition-colors"
                  />
                  {errors.age && (
                    <p className="text-red-500 text-xs mt-1">{errors.age}</p>
                  )}
                </div>

                {/* Requirement Radio */}
                <div>
                  <label className="block uppercase text-xs font-bold tracking-widest text-muted-foreground mb-3">
                    My Goal / Requirement
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {requirements.map((r) => (
                      <label
                        key={r.value}
                        className={`flex items-center gap-3 p-3 border cursor-pointer transition-colors ${
                          form.requirement === r.value
                            ? "border-primary bg-primary/10 text-white"
                            : "border-white/10 text-muted-foreground hover:border-white/30"
                        }`}
                      >
                        <input
                          type="radio"
                          name="requirement"
                          value={r.value}
                          checked={form.requirement === r.value}
                          onChange={(e) =>
                            setForm({ ...form, requirement: e.target.value })
                          }
                          className="accent-primary w-4 h-4 shrink-0"
                        />
                        <span className="text-sm font-medium uppercase tracking-wide">
                          {r.label}
                        </span>
                      </label>
                    ))}
                  </div>
                  {errors.requirement && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.requirement}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="block uppercase text-xs font-bold tracking-widest text-muted-foreground mb-2">
                    Your Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-transparent border border-white/10 focus:border-primary focus:outline-none rounded-none h-12 px-4 text-white placeholder:text-white/30 transition-colors"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-black uppercase tracking-widest h-14 rounded-none transition-colors text-base mt-2"
                >
                  <FaWhatsapp size={22} />
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

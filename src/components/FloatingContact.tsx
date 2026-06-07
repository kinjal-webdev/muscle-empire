import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { Phone, X, CheckCircle2 } from "lucide-react";

const OWNER_PHONE = "919773053632";
const CALL_URL = "tel:+919773053632";

const requirements = [
  { value: "full_body", label: "Full Body Workout" },
  { value: "weight_gain", label: "Weight Gain" },
  { value: "weight_loss", label: "Weight Loss" },
  { value: "muscle_gain", label: "Muscle Gain" },
  { value: "cardio", label: "Cardio" },
];

type FormState = { name: string; age: string; requirement: string; phone: string };

function WhatsAppForm({ onClose }: { onClose: () => void }) {
  const [form, setForm] = useState<FormState>({ name: "", age: "", requirement: "", phone: "" });
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const validate = () => {
    const e: Partial<FormState> = {};
    if (!form.name.trim() || form.name.trim().length < 2) e.name = "At least 2 characters.";
    if (!form.age || isNaN(Number(form.age)) || Number(form.age) < 10 || Number(form.age) > 90)
      e.age = "Enter age between 10–90.";
    if (!form.requirement) e.requirement = "Please select a goal.";
    if (!form.phone.trim() || !/^\+?[0-9]{10,13}$/.test(form.phone.replace(/\s/g, "")))
      e.phone = "Enter a valid phone number.";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});

    const reqLabel = requirements.find((r) => r.value === form.requirement)?.label || form.requirement;

    const plainText =
      `Hi! I'd like to join Muscle Empire.\n\n` +
      `Name: ${form.name}\n` +
      `Age: ${form.age}\n` +
      `Goal: ${reqLabel}\n` +
      `My Phone: ${form.phone}`;

    // Copy to clipboard
    try {
      await navigator.clipboard.writeText(plainText);
      setCopied(true);
    } catch {
      // clipboard blocked — still open WhatsApp with prefilled text
    }

    const waMsg = encodeURIComponent(
      `Hi! I'd like to join Muscle Empire.\n\n` +
      `*Name:* ${form.name}\n` +
      `*Age:* ${form.age}\n` +
      `*Goal:* ${reqLabel}\n` +
      `*My Phone:* ${form.phone}`
    );

    window.open(`https://wa.me/${OWNER_PHONE}?text=${waMsg}`, "_blank");
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setCopied(false);
      setForm({ name: "", age: "", requirement: "", phone: "" });
      onClose();
    }, 4000);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[1000] flex items-end sm:items-center justify-center p-4"
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Modal */}
      <motion.div
        className="relative w-full max-w-md bg-[#1a1a1a] border border-white/10 shadow-2xl z-10 overflow-hidden"
        initial={{ y: 60, opacity: 0, scale: 0.97 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 60, opacity: 0, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#25D366]">
          <div className="flex items-center gap-2">
            <FaWhatsapp size={22} className="text-white" />
            <span className="text-white font-black uppercase tracking-widest text-sm">
              WhatsApp Us
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-6 py-5">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center py-8 text-center"
            >
              <div className="w-16 h-16 bg-[#25D366]/20 flex items-center justify-center mb-4 text-[#25D366]">
                <CheckCircle2 size={36} />
              </div>
              <h5 className="text-xl font-black uppercase text-white mb-1">WhatsApp Opened!</h5>
              {copied && (
                <p className="text-xs text-primary font-bold uppercase tracking-widest mt-1">
                  ✓ Details copied to clipboard
                </p>
              )}
              <p className="text-muted-foreground text-sm mt-2">
                Your details are pre-filled. Just hit send!
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <p className="text-muted-foreground text-xs uppercase tracking-widest mb-4">
                Fill in your details — we'll open WhatsApp &amp; copy them to your clipboard.
              </p>

              {/* Name */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-transparent border border-white/10 focus:border-[#25D366] focus:outline-none h-11 px-3 text-white placeholder:text-white/25 text-sm transition-colors"
                />
                {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
              </div>

              {/* Age */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
                  Age
                </label>
                <input
                  type="number"
                  placeholder="25"
                  min={10}
                  max={90}
                  value={form.age}
                  onChange={(e) => setForm({ ...form, age: e.target.value })}
                  className="w-full bg-transparent border border-white/10 focus:border-[#25D366] focus:outline-none h-11 px-3 text-white placeholder:text-white/25 text-sm transition-colors"
                />
                {errors.age && <p className="text-red-400 text-xs mt-1">{errors.age}</p>}
              </div>

              {/* Goal */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
                  My Goal
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {requirements.map((r) => (
                    <label
                      key={r.value}
                      className={`flex items-center gap-2 p-2.5 border cursor-pointer transition-colors text-xs font-medium uppercase tracking-wide ${
                        form.requirement === r.value
                          ? "border-[#25D366] bg-[#25D366]/10 text-white"
                          : "border-white/10 text-muted-foreground hover:border-white/25"
                      }`}
                    >
                      <input
                        type="radio"
                        name="req-popup"
                        value={r.value}
                        checked={form.requirement === r.value}
                        onChange={(e) => setForm({ ...form, requirement: e.target.value })}
                        className="accent-[#25D366] w-3.5 h-3.5 shrink-0"
                      />
                      {r.label}
                    </label>
                  ))}
                </div>
                {errors.requirement && <p className="text-red-400 text-xs mt-1">{errors.requirement}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
                  Your Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-transparent border border-white/10 focus:border-[#25D366] focus:outline-none h-11 px-3 text-white placeholder:text-white/25 text-sm transition-colors"
                />
                {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-black uppercase tracking-widest h-12 transition-colors text-sm mt-1"
              >
                <FaWhatsapp size={18} />
                Send via WhatsApp
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function FloatingContact() {
  const [popupOpen, setPopupOpen] = useState(false);

  return (
    <>
      <div className="fixed right-5 bottom-20 z-[999] flex flex-col gap-3 items-end">
        {/* WhatsApp — opens popup */}
        <motion.button
          onClick={() => setPopupOpen(true)}
          aria-label="Chat on WhatsApp"
          className="group flex items-center gap-3"
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="hidden sm:block bg-background border border-border text-white text-xs font-bold uppercase tracking-widest px-3 py-2 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 whitespace-nowrap shadow-lg">
            WhatsApp Us
          </span>
          <motion.div
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.95 }}
            className="w-14 h-14 bg-[#25D366] flex items-center justify-center text-white shadow-[0_4px_24px_rgba(37,211,102,0.4)] hover:shadow-[0_4px_32px_rgba(37,211,102,0.6)] transition-shadow"
          >
            <FaWhatsapp size={28} />
          </motion.div>
        </motion.button>

        {/* Call */}
        <motion.a
          href={CALL_URL}
          aria-label="Call us"
          className="group flex items-center gap-3"
          initial={{ x: 80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="hidden sm:block bg-background border border-border text-white text-xs font-bold uppercase tracking-widest px-3 py-2 opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 whitespace-nowrap shadow-lg">
            Call Now
          </span>
          <motion.div
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.95 }}
            className="w-14 h-14 bg-primary flex items-center justify-center text-black shadow-[0_4px_24px_rgba(255,208,0,0.35)] hover:shadow-[0_4px_32px_rgba(255,208,0,0.55)] transition-shadow"
          >
            <Phone size={24} strokeWidth={2.5} />
          </motion.div>
        </motion.a>
      </div>

      {/* Popup */}
      <AnimatePresence>
        {popupOpen && <WhatsAppForm onClose={() => setPopupOpen(false)} />}
      </AnimatePresence>
    </>
  );
}

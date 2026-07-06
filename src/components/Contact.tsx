import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useAnimationFrame } from "framer-motion";
import { Phone, MapPin, Mail, CheckCircle2, Clock } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { APPS_SCRIPT_URL } from "@/lib/sheets";

const OWNER_PHONE = "919773053632";

const goals = [
  { value: "full_body",   label: "Full body workout" },
  { value: "weight_gain", label: "Weight gain" },
  { value: "weight_loss", label: "Weight loss" },
  { value: "muscle_gain", label: "Muscle gain" },
  { value: "cardio",      label: "Cardio" },
];

const contactItems = [
  { Icon: FaWhatsapp, label: "WhatsApp",   value: "+91 97730 53632",  href: `https://wa.me/${OWNER_PHONE}`,  cta: "Chat now",   color: "#25D366" },
  { Icon: Phone,      label: "Call us",    value: "+91 97730 53632",  href: "tel:+919773053632",             cta: "Call now",   color: "#E8A820" },
  { Icon: Phone,      label: "Office",     value: "+91 97022 68603",  href: "tel:+919702268603",             cta: "Call now",   color: "#E8A820" },
  { Icon: MapPin,     label: "Unisex gym", value: "J/16, Jay Hanuman Mandir, Barvenagar Colony, Bhatwadi, Ghatkopar (West), Mumbai – 400084", href: "https://maps.google.com/?q=Muscle+Empire+Gymnasium+Ghatkopar+West+Mumbai", cta: "Directions", color: "#EF4444" },
  { Icon: MapPin,     label: "Female gym", value: "1st Floor, Ranveer Apartment, Sanjay Kokate Lane, Bhatwadi, Ghatkopar (West), Mumbai – 400084", href: "https://maps.google.com/?q=Ranveer+Apartment+Sanjay+Kokate+Lane+Bhatwadi+Ghatkopar+West+Mumbai", cta: "Directions", color: "#EC4899" },
  { Icon: Mail,       label: "Email",      value: "musclempire616@gmail.com", href: "mailto:musclempire616@gmail.com", cta: "Send mail", color: "#6366F1" },
];

/* ── Animated glow dot on cards ─────────────────────────────── */
function CardGlow({ color }: { color: string }) {
  const [p, setP] = useState({ x: 30, y: 40 });
  useAnimationFrame(t => {
    setP({ x: 50 + 38 * Math.sin(t / 4200), y: 50 + 32 * Math.cos(t / 5600) });
  });
  return (
    <div className="absolute inset-0 rounded-2xl pointer-events-none"
      style={{ background: `radial-gradient(circle at ${p.x}% ${p.y}%, ${color}20 0%, transparent 55%)` }} />
  );
}

/* ── Input field ─────────────────────────────────────────────── */
const darkInput = "w-full bg-white/[0.05] border border-white/[0.10] focus:border-[#E8A820] focus:ring-2 focus:ring-[#E8A820]/20 outline-none rounded-2xl h-12 px-4 text-[#F2EFE9] placeholder:text-white/25 text-[0.9rem] transition-all duration-200";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", age: "", requirement: "", phone: "", notes: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => { clearTimeout(timeoutRef.current); }, []);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim() || form.name.trim().length < 2) e.name = "Name must be at least 2 characters.";
    if (!form.age || isNaN(+form.age) || +form.age < 10 || +form.age > 90) e.age = "Valid age required (10–90).";
    if (!form.requirement) e.requirement = "Please select your goal.";
    if (!form.phone.trim() || !/^\+?[0-9]{10,13}$/.test(form.phone.replace(/\s/g, ""))) e.phone = "Valid phone number required.";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    const label = goals.find(g => g.value === form.requirement)?.label || form.requirement;
    const today = new Date().toLocaleDateString("en-IN");
    fetch(`${APPS_SCRIPT_URL}?${new URLSearchParams({ action: "enquiry", date: today, name: form.name, phone: form.phone, age: form.age, goal: label, notes: form.notes })}`, { redirect: "follow" }).catch(() => null);
    const msg = encodeURIComponent(`Hi! I'd like to join Muscle Empire.\n\n*Name:* ${form.name}\n*Age:* ${form.age}\n*Goal:* ${label}\n*Phone:* ${form.phone}${form.notes ? `\n*Notes:* ${form.notes}` : ""}`);
    window.open(`https://wa.me/${OWNER_PHONE}?text=${msg}`, "_blank");
    setSubmitted(true);
    timeoutRef.current = setTimeout(() => { setSubmitted(false); setForm({ name:"", age:"", requirement:"", phone:"", notes:"" }); }, 5000);
  };

  return (
    <section id="contact" className="py-28 bg-[#1C1C1E] relative overflow-hidden">
      {/* Top border */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#E8A820]/30 to-transparent" />

      {/* Ambient glow orbs */}
      <div className="absolute top-1/3 -left-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(232,168,32,0.07) 0%, transparent 70%)" }} />
      <div className="absolute bottom-1/4 -right-40 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(37,211,102,0.05) 0%, transparent 70%)" }} />

      <div className="max-w-7xl mx-auto px-5 md:px-8 relative z-10">

        {/* Header */}
        <motion.div initial={{ opacity:0, y:24 }} whileInView={{ opacity:1, y:0 }}
          viewport={{ once:true, margin:"-60px" }} transition={{ duration:0.65, ease:[0.16,1,0.3,1] }}
          className="text-center max-w-xl mx-auto mb-16">
          <div className="eyebrow justify-center mb-4">Reach out</div>
          <h2 className="font-display font-black text-[#F2EFE9] text-[clamp(2rem,4.5vw,2.9rem)]">
            Step into the <span className="text-gold-gradient">arena</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12">

          {/* ── LEFT: info ──────────────────────────────── */}
          <motion.div initial={{ opacity:0, x:-28 }} whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true }} transition={{ duration:0.7, ease:[0.16,1,0.3,1] }}>

            <h3 className="font-display font-black text-[#F2EFE9] text-xl mb-2">Contact us</h3>
            <p className="text-[#F2EFE9]/45 text-[0.92rem] leading-relaxed mb-7">
              Ready to transform? Drop us a line or walk in — we're ready when you are.
            </p>

            {/* Hours */}
            <div className="mb-6 flex items-start gap-3.5 p-5 rounded-2xl border border-[#E8A820]/20 relative overflow-hidden"
              style={{ background: "rgba(232,168,32,0.06)" }}>
              <div className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{ background: "radial-gradient(circle at 20% 50%, rgba(232,168,32,0.12) 0%, transparent 60%)" }} />
              <Clock size={18} className="text-[#E8A820] shrink-0 mt-0.5 z-10" />
              <div className="z-10">
                <p className="text-[11px] font-black uppercase tracking-wider text-[#E8A820] mb-1">Operating hours</p>
                <p className="text-[#F2EFE9]/70 text-sm font-medium">Unisex Gym: Mon – Sat, 6:00 AM – 11:00 PM</p>
                <p className="text-[#F2EFE9]/70 text-sm font-medium">Female Gym: Mon – Sat, 6:00 AM – 12:00 PM &amp; 4:00 PM – 10:00 PM</p>
              </div>
            </div>

            {/* Contact cards */}
            <div className="flex flex-col gap-2.5">
              {contactItems.map((item, i) => (
                <motion.a key={i} href={item.href} target="_blank" rel="noopener noreferrer"
                  initial={{ opacity:0, x:-16 }}
                  whileInView={{ opacity:1, x:0 }}
                  viewport={{ once:true }}
                  transition={{ delay: i * 0.06, duration:0.4, ease:[0.16,1,0.3,1] }}
                  whileHover={{ y:-3, scale:1.02 }}
                  whileTap={{ scale:0.98 }}
                  className="relative flex items-center gap-4 p-4 rounded-2xl border overflow-hidden group transition-all duration-200"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    borderColor: "rgba(255,255,255,0.08)",
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = item.color + "55"; (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 32px ${item.color}20`; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
                >
                  <CardGlow color={item.color} />

                  {/* top shimmer */}
                  <div className="absolute top-0 left-[20%] right-[20%] h-px pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: `linear-gradient(90deg, transparent, ${item.color}, transparent)` }} />

                  <motion.div whileHover={{ scale:1.15, rotate:[-5,5,0] }} transition={{ duration:0.35 }}
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white shrink-0 z-10"
                    style={{ background: item.color, boxShadow: `0 4px 16px ${item.color}50` }}>
                    <item.Icon size={18} />
                  </motion.div>

                  <div className="flex-1 min-w-0 z-10">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-[#F2EFE9]/35 mb-0.5">{item.label}</p>
                    <p className="text-[#F2EFE9] font-semibold text-[0.95rem] leading-snug">{item.value}</p>
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wide opacity-0 group-hover:opacity-100 transition-opacity z-10 hidden sm:block shrink-0"
                    style={{ color: item.color }}>
                    {item.cta} →
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT: form ─────────────────────────────── */}
          <motion.div initial={{ opacity:0, x:28 }} whileInView={{ opacity:1, x:0 }}
            viewport={{ once:true }} transition={{ delay:0.12, duration:0.7, ease:[0.16,1,0.3,1] }}
            className="relative rounded-[24px] p-8 md:p-10 overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.04)",
              border: "1.5px solid rgba(255,255,255,0.09)",
              boxShadow: "0 24px 80px rgba(0,0,0,0.30)",
            }}
          >
            {/* Top shimmer */}
            <div className="absolute top-0 left-[15%] right-[15%] h-px pointer-events-none"
              style={{ background: "linear-gradient(90deg, transparent, #E8A820, transparent)" }} />
            {/* Inner glow */}
            <div className="absolute inset-0 rounded-[24px] pointer-events-none"
              style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(232,168,32,0.06) 0%, transparent 60%)" }} />

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div key="success"
                  initial={{ opacity:0, scale:0.95 }} animate={{ opacity:1, scale:1 }}
                  exit={{ opacity:0, scale:0.95 }} transition={{ duration:0.4, ease:[0.16,1,0.3,1] }}
                  className="flex flex-col items-center justify-center text-center py-12">
                  <motion.div
                    initial={{ scale:0 }} animate={{ scale:1 }}
                    transition={{ delay:0.2, type:"spring", stiffness:260, damping:20 }}
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                    style={{ background: "rgba(37,211,102,0.12)", border: "1px solid rgba(37,211,102,0.25)", boxShadow: "0 0 40px rgba(37,211,102,0.20)" }}>
                    <CheckCircle2 size={40} className="text-[#25D366]" />
                  </motion.div>
                  <h4 className="font-display font-black text-[#F2EFE9] text-xl mb-3">WhatsApp opened!</h4>
                  <p className="text-[#F2EFE9]/50 text-sm leading-relaxed max-w-xs">
                    Your message is pre-filled. Just hit send and we'll get back to you shortly.
                  </p>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>
                  <h3 className="font-display font-black text-[#F2EFE9] text-xl mb-1">Send a message</h3>
                  <p className="text-[#F2EFE9]/40 text-[0.87rem] mb-8 leading-relaxed">
                    We'll open WhatsApp with your details pre-filled — straight to our team.
                  </p>

                  <form onSubmit={handleSubmit} noValidate className="space-y-5">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-widest text-[#F2EFE9]/40 mb-1.5">Full name</label>
                      <input type="text" placeholder="John Doe" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className={darkInput} />
                      {errors.name && <p className="text-red-400 text-xs mt-1.5">{errors.name}</p>}
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-widest text-[#F2EFE9]/40 mb-1.5">Age</label>
                      <input type="number" placeholder="25" min={10} max={90} value={form.age} onChange={e=>setForm({...form,age:e.target.value})} className={darkInput} />
                      {errors.age && <p className="text-red-400 text-xs mt-1.5">{errors.age}</p>}
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-widest text-[#F2EFE9]/40 mb-2">My goal</label>
                      <div className="grid grid-cols-2 gap-2">
                        {goals.map(g => (
                          <label key={g.value}
                            className={`flex items-center gap-2.5 px-3.5 py-3 border rounded-xl cursor-pointer text-[0.85rem] font-medium capitalize transition-all duration-200 ${
                              form.requirement === g.value
                                ? "border-[#E8A820] bg-[#E8A820]/[0.10] text-[#E8A820]"
                                : "border-white/[0.08] bg-white/[0.03] text-[#F2EFE9]/55 hover:border-[#E8A820]/40"
                            }`}>
                            <input type="radio" name="goal" value={g.value} checked={form.requirement===g.value} onChange={e=>setForm({...form,requirement:e.target.value})} className="accent-[#E8A820] w-3.5 h-3.5 shrink-0" />
                            {g.label}
                          </label>
                        ))}
                      </div>
                      {errors.requirement && <p className="text-red-400 text-xs mt-1.5">{errors.requirement}</p>}
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-widest text-[#F2EFE9]/40 mb-1.5">Phone number</label>
                      <input type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} className={darkInput} />
                      {errors.phone && <p className="text-red-400 text-xs mt-1.5">{errors.phone}</p>}
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-widest text-[#F2EFE9]/40 mb-1.5">
                        Notes <span className="normal-case font-normal text-white/20">(optional)</span>
                      </label>
                      <textarea placeholder="Preferred timings, questions, anything else..." rows={3}
                        value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})}
                        className="w-full bg-white/[0.05] border border-white/[0.10] focus:border-[#E8A820] focus:ring-2 focus:ring-[#E8A820]/20 outline-none rounded-2xl px-4 py-3 text-[#F2EFE9] placeholder:text-white/25 text-[0.9rem] transition-all duration-200 resize-none" />
                    </div>

                    <motion.button type="submit"
                      whileHover={{ y:-2, boxShadow:"0 12px 36px rgba(37,211,102,0.45)" }}
                      whileTap={{ scale:0.97 }}
                      className="w-full flex items-center justify-center gap-2.5 text-white font-bold text-[14px] h-[52px] rounded-[14px] transition-all duration-200 cursor-pointer"
                      style={{ background:"linear-gradient(135deg,#25D366,#1db954)", boxShadow:"0 4px 20px rgba(37,211,102,0.30)" }}>
                      <FaWhatsapp size={19} />
                      Send via WhatsApp
                    </motion.button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

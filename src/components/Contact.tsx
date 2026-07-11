import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

/* Contact info rows — no boxes, just icon + label + value */
const INFO_ROWS = [
  {
    Icon: FaWhatsapp,
    label: "WhatsApp",
    value: "+91 97730 53632",
    href: `https://wa.me/${OWNER_PHONE}`,
  },
  {
    Icon: Phone,
    label: "Call us",
    value: "+91 97730 53632",
    href: "tel:+919773053632",
  },
  {
    Icon: Phone,
    label: "Office",
    value: "+91 97022 68603",
    href: "tel:+919702268603",
  },
  {
    Icon: Clock,
    label: "Operating hours",
    value: "Unisex: Mon–Sat 6 AM – 11 PM\nFemale: Mon–Sat 6–12 PM & 4–10 PM",
    href: null,
  },
  {
    Icon: MapPin,
    label: "Unisex gym",
    value: "J/16, Jay Hanuman Mandir, Barvenagar Colony,\nBhatwadi, Ghatkopar (West), Mumbai – 400084",
    href: "https://maps.google.com/?q=Muscle+Empire+Gymnasium+Ghatkopar+West+Mumbai",
  },
  {
    Icon: MapPin,
    label: "Female gym",
    value: "1st Floor, Ranveer Apartment, Sanjay Kokate Lane,\nBhatwadi, Ghatkopar (West), Mumbai – 400084",
    href: "https://maps.google.com/?q=Ranveer+Apartment+Sanjay+Kokate+Lane+Bhatwadi+Ghatkopar+West+Mumbai",
  },
  {
    Icon: Mail,
    label: "Email",
    value: "musclempire616@gmail.com",
    href: "mailto:musclempire616@gmail.com",
  },
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name:"", age:"", requirement:"", phone:"", notes:"" });
  const [errors, setErrors] = useState<Record<string,string>>({});
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => () => clearTimeout(timeoutRef.current), []);

  const validate = () => {
    const e: Record<string,string> = {};
    if (!form.name.trim() || form.name.trim().length < 2) e.name = "Name must be at least 2 characters.";
    if (!form.age || isNaN(+form.age) || +form.age < 10 || +form.age > 90) e.age = "Valid age required.";
    if (!form.requirement) e.requirement = "Please select your goal.";
    if (!form.phone.trim() || !/^\+?[0-9]{10,13}$/.test(form.phone.replace(/\s/g,""))) e.phone = "Valid phone required.";
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    const label = goals.find(g => g.value === form.requirement)?.label || form.requirement;
    const today = new Date().toLocaleDateString("en-IN");
    fetch(`${APPS_SCRIPT_URL}?${new URLSearchParams({ action:"enquiry", date:today, name:form.name, phone:form.phone, age:form.age, goal:label, notes:form.notes })}`, { redirect:"follow" }).catch(()=>null);
    const msg = encodeURIComponent(`Hi! I'd like to join Muscle Empire.\n\n*Name:* ${form.name}\n*Age:* ${form.age}\n*Goal:* ${label}\n*Phone:* ${form.phone}${form.notes?`\n*Notes:* ${form.notes}`:""}`);
    window.open(`https://wa.me/${OWNER_PHONE}?text=${msg}`, "_blank");
    setSubmitted(true);
    timeoutRef.current = setTimeout(() => { setSubmitted(false); setForm({name:"",age:"",requirement:"",phone:"",notes:""}); }, 5000);
  };

  const inp = "w-full bg-white/[0.06] border border-white/[0.12] focus:border-[#E8A820] focus:ring-2 focus:ring-[#E8A820]/20 outline-none rounded-2xl h-12 px-4 text-[#F2EFE9] placeholder:text-white/25 text-[0.9rem] transition-all duration-200";

  return (
    <section id="contact" className="py-24 bg-[#1C1C1E] relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#E8A820]/25 to-transparent"/>

      {/* Ambient glow */}
      <div className="absolute top-1/3 -left-40 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background:"radial-gradient(circle,rgba(232,168,32,0.06) 0%,transparent 70%)" }}/>

      <div className="max-w-7xl mx-auto px-5 md:px-10 relative z-10">

        {/* Header */}
        <motion.div initial={{ opacity:0,y:20 }} whileInView={{ opacity:1,y:0 }}
          viewport={{ once:true }} transition={{ duration:0.6, ease:[0.16,1,0.3,1] }}
          className="mb-14">
          <p className="text-[#E8A820] text-[11px] font-black uppercase tracking-[0.22em] mb-3">Reach out</p>
          <h2 className="font-display font-black text-[#F2EFE9]"
            style={{ fontSize:"clamp(2rem,4.5vw,3rem)", lineHeight:1.1 }}>
            Step into the <span className="text-gold-gradient">arena</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* ── LEFT: bare info list — no boxes ──────────── */}
          <motion.div initial={{ opacity:0,x:-24 }} whileInView={{ opacity:1,x:0 }}
            viewport={{ once:true }} transition={{ duration:0.65, ease:[0.16,1,0.3,1] }}>
            <div className="flex flex-col">
              {INFO_ROWS.map((row, i) => {
                const el = (
                  <div className="flex items-start gap-5 py-5 group">
                    {/* Divider top */}
                    <div/>
                    {/* Icon */}
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background:"rgba(232,168,32,0.10)", color:"#E8A820" }}>
                      <row.Icon size={16} strokeWidth={2}/>
                    </div>
                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <p className="text-[11px] font-bold uppercase tracking-widest text-[#F2EFE9]/35 mb-0.5">{row.label}</p>
                      <p className="text-[#F2EFE9] font-semibold text-[0.97rem] leading-relaxed whitespace-pre-line
                        group-hover:text-[#E8A820] transition-colors duration-200">
                        {row.value}
                      </p>
                    </div>
                    {row.href && (
                      <span className="text-[#E8A820]/0 group-hover:text-[#E8A820]/80 text-[11px] font-bold uppercase tracking-wide transition-all duration-200 shrink-0 self-center">
                        →
                      </span>
                    )}
                  </div>
                );

                return (
                  <motion.div key={i}
                    initial={{ opacity:0, x:-16 }}
                    whileInView={{ opacity:1, x:0 }}
                    viewport={{ once:true }}
                    transition={{ delay: i*0.05, duration:0.4 }}
                  >
                    {/* top line */}
                    {i === 0 && <div className="h-px bg-white/[0.07]"/>}
                    {row.href ? (
                      <a href={row.href} target="_blank" rel="noopener noreferrer">{el}</a>
                    ) : (
                      <div>{el}</div>
                    )}
                    {/* bottom line */}
                    <div className="h-px bg-white/[0.07]"/>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* ── RIGHT: WhatsApp form ──────────────────────── */}
          <motion.div initial={{ opacity:0,x:24 }} whileInView={{ opacity:1,x:0 }}
            viewport={{ once:true }} transition={{ delay:0.1, duration:0.65, ease:[0.16,1,0.3,1] }}
            className="relative rounded-[22px] p-8 md:p-10 overflow-hidden"
            style={{
              background:"#181818",
              border:"1.5px solid rgba(232,168,32,0.28)",
              boxShadow:"0 0 48px rgba(232,168,32,0.07), 0 20px 60px rgba(0,0,0,0.35)",
            }}>
            <div className="absolute top-0 left-[15%] right-[15%] h-px pointer-events-none"
              style={{ background:"linear-gradient(90deg,transparent,#E8A820,transparent)" }}/>
            <div className="absolute inset-0 pointer-events-none"
              style={{ background:"radial-gradient(ellipse 80% 50% at 50% 0%, rgba(232,168,32,0.05) 0%, transparent 60%)" }}/>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div key="ok"
                  initial={{ opacity:0,scale:0.95 }} animate={{ opacity:1,scale:1 }}
                  exit={{ opacity:0,scale:0.95 }} transition={{ duration:0.4 }}
                  className="flex flex-col items-center justify-center py-16 text-center">
                  <motion.div initial={{ scale:0 }} animate={{ scale:1 }}
                    transition={{ delay:0.2, type:"spring", stiffness:260, damping:20 }}
                    className="w-20 h-20 rounded-full flex items-center justify-center mb-6"
                    style={{ background:"rgba(37,211,102,0.12)", border:"1px solid rgba(37,211,102,0.25)" }}>
                    <CheckCircle2 size={40} className="text-[#25D366]"/>
                  </motion.div>
                  <h4 className="font-display font-black text-[#F2EFE9] text-xl mb-2">WhatsApp opened!</h4>
                  <p className="text-[#F2EFE9]/45 text-sm">Your message is ready — just hit send.</p>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>
                  <h3 className="font-display font-black text-[#F2EFE9] text-xl mb-1 relative z-10">Send a message</h3>
                  <p className="text-[#F2EFE9]/38 text-[0.87rem] mb-7 relative z-10">
                    We'll open WhatsApp with your details pre-filled.
                  </p>
                  <form onSubmit={handleSubmit} noValidate className="space-y-4 relative z-10">
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-widest text-[#F2EFE9]/38 mb-1.5">Full name</label>
                      <input type="text" placeholder="John Doe" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} className={inp}/>
                      {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-widest text-[#F2EFE9]/38 mb-1.5">Age</label>
                      <input type="number" placeholder="25" min={10} max={90} value={form.age} onChange={e=>setForm({...form,age:e.target.value})} className={inp}/>
                      {errors.age && <p className="text-red-400 text-xs mt-1">{errors.age}</p>}
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-widest text-[#F2EFE9]/38 mb-2">My goal</label>
                      <div className="grid grid-cols-2 gap-2">
                        {goals.map(g=>(
                          <label key={g.value} className={`flex items-center gap-2.5 px-3.5 py-2.5 border rounded-xl cursor-pointer text-[0.84rem] font-medium capitalize transition-all duration-200 ${
                            form.requirement===g.value
                              ? "border-[#E8A820] bg-[#E8A820]/[0.10] text-[#E8A820]"
                              : "border-white/[0.09] bg-white/[0.03] text-[#F2EFE9]/50 hover:border-[#E8A820]/40"
                          }`}>
                            <input type="radio" name="goal" value={g.value} checked={form.requirement===g.value} onChange={e=>setForm({...form,requirement:e.target.value})} className="accent-[#E8A820] w-3.5 h-3.5 shrink-0"/>
                            {g.label}
                          </label>
                        ))}
                      </div>
                      {errors.requirement && <p className="text-red-400 text-xs mt-1">{errors.requirement}</p>}
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-widest text-[#F2EFE9]/38 mb-1.5">Phone number</label>
                      <input type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})} className={inp}/>
                      {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold uppercase tracking-widest text-[#F2EFE9]/38 mb-1.5">
                        Notes <span className="normal-case font-normal text-white/20">(optional)</span>
                      </label>
                      <textarea placeholder="Preferred timings, questions..." rows={3}
                        value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})}
                        className="w-full bg-white/[0.06] border border-white/[0.12] focus:border-[#E8A820] focus:ring-2 focus:ring-[#E8A820]/20 outline-none rounded-2xl px-4 py-3 text-[#F2EFE9] placeholder:text-white/25 text-[0.9rem] transition-all duration-200 resize-none"/>
                    </div>
                    <motion.button type="submit"
                      whileHover={{ y:-2, boxShadow:"0 12px 32px rgba(37,211,102,0.42)" }}
                      whileTap={{ scale:0.97 }}
                      className="w-full flex items-center justify-center gap-2.5 text-white font-bold text-[14px] h-[52px] rounded-[14px] transition-all duration-200 cursor-pointer"
                      style={{ background:"linear-gradient(135deg,#25D366,#1db954)", boxShadow:"0 4px 18px rgba(37,211,102,0.28)" }}>
                      <FaWhatsapp size={19}/> Send via WhatsApp
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

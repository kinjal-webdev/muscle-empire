import { useState, useLayoutEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import PlanNavbar from "@/components/PlanNavbar";
import Footer from "@/components/Footer";
import { submitAssessment } from "@/lib/sheets";
import type { AssessmentData } from "@/lib/sheets";

const WA_NUMBER = "919773053632";

type Form = {
  name: string; phone: string; email: string; age: string; gender: string;
  weight: string; height: string;
  wakeTime: string; bedTime: string; sleepDuration: string; workoutTime: string;
  targetWeight: string; weightChange: string;
  foodPref: string;
  collegeTime: string; workTime: string;
  medicalConditions: string; allergies: string; supplements: string;
  goals: string[]; otherGoal: string;
  remarks: string; consent: boolean;
};

const empty: Form = {
  name: "", phone: "", email: "", age: "", gender: "",
  weight: "", height: "",
  wakeTime: "", bedTime: "", sleepDuration: "", workoutTime: "",
  targetWeight: "", weightChange: "",
  foodPref: "",
  collegeTime: "", workTime: "",
  medicalConditions: "", allergies: "", supplements: "",
  goals: [], otherGoal: "",
  remarks: "", consent: false,
};

function bmi(w: string, h: string) {
  const wn = parseFloat(w), hn = parseFloat(h) / 100;
  if (!wn || !hn || hn <= 0) return null;
  return wn / (hn * hn);
}
function bmiCategory(b: number) {
  if (b < 18.5) return { label: "Underweight", color: "text-blue-400 bg-blue-400/10 border-blue-400/30" };
  if (b < 25)   return { label: "Normal Weight", color: "text-green-400 bg-green-400/10 border-green-400/30" };
  if (b < 30)   return { label: "Overweight", color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/30" };
  return { label: "Obese", color: "text-red-400 bg-red-400/10 border-red-400/30" };
}

const inputCls = "w-full bg-transparent border border-white/10 focus:border-primary focus:outline-none h-11 px-3 text-white placeholder:text-white/25 text-sm transition-colors rounded-none";
const labelCls = "block text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1.5";
const sectionCls = "bg-card border border-border p-6 md:p-8 space-y-5";

export default function NutritionAssessment() {
  const [form, setForm] = useState<Form>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  useLayoutEffect(() => { window.scrollTo(0, 0); }, []);

  const bmiVal = bmi(form.weight, form.height);
  const bmiCat = bmiVal ? bmiCategory(bmiVal) : null;

  const set = (k: keyof Form, v: string | boolean | string[]) =>
    setForm(f => ({ ...f, [k]: v }));

  const toggleGoal = (g: string) => {
    const cur = form.goals;
    set("goals", cur.includes(g) ? cur.filter(x => x !== g) : [...cur, g]);
  };

  const validate = () => {
    const e: Partial<Record<keyof Form, string>> = {};
    if (!form.name.trim()) e.name = "Required";
    if (!form.phone.trim() || !/^\+?[0-9]{10,13}$/.test(form.phone.replace(/\s/g, ""))) e.phone = "Enter valid phone";
    if (!form.age || isNaN(Number(form.age))) e.age = "Required";
    if (!form.weight) e.weight = "Required";
    if (!form.height) e.height = "Required";
    if (!form.foodPref) e.foodPref = "Required";
    if (form.goals.length === 0) e.goals = "Select at least one goal";
    if (!form.consent) e.consent = "Please confirm";
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});

    const today = new Date().toLocaleDateString("en-IN");
    const goalsList = [...form.goals, form.otherGoal ? `Other: ${form.otherGoal}` : ""].filter(Boolean).join(", ");

    const payload: AssessmentData = {
      date: today,
      name: form.name,
      phone: form.phone,
      email: form.email,
      age: form.age,
      gender: form.gender,
      weight: form.weight,
      height: form.height,
      bmi: bmiVal ? bmiVal.toFixed(1) : "",
      bmiCategory: bmiCat?.label || "",
      wakeTime: form.wakeTime,
      bedTime: form.bedTime,
      sleepDuration: form.sleepDuration,
      workoutTime: form.workoutTime,
      targetWeight: form.targetWeight,
      weightChange: form.weightChange,
      foodPref: form.foodPref,
      collegeTime: form.collegeTime,
      workTime: form.workTime,
      medicalConditions: form.medicalConditions,
      allergies: form.allergies,
      supplements: form.supplements,
      goals: goalsList,
      remarks: form.remarks,
      status: "New",
    };

    // Save to Sheets (with localStorage fallback)
    await submitAssessment(payload);

    // Build WhatsApp message with all form data
    const waMsg = [
      `🏋️ *Muscle Empire – Nutrition Assessment*`,
      ``,
      `*👤 Personal Details*`,
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      form.email ? `Email: ${form.email}` : null,
      `Age: ${form.age}`,
      form.gender ? `Gender: ${form.gender}` : null,
      ``,
      `*📏 Body Measurements*`,
      `Weight: ${form.weight} kg`,
      `Height: ${form.height} cm`,
      bmiVal ? `BMI: ${bmiVal.toFixed(1)} (${bmiCat?.label})` : null,
      form.targetWeight ? `Target Weight: ${form.targetWeight} kg` : null,
      form.weightChange ? `Weight to Change: ${form.weightChange} kg` : null,
      ``,
      `*🌙 Lifestyle*`,
      form.wakeTime ? `Wake-up Time: ${form.wakeTime}` : null,
      form.bedTime ? `Bed Time: ${form.bedTime}` : null,
      form.sleepDuration ? `Sleep: ${form.sleepDuration} hrs` : null,
      form.workoutTime ? `Workout Time: ${form.workoutTime}` : null,
      ``,
      `*🥗 Food Preference*`,
      `Food Pref: ${form.foodPref}`,
      form.collegeTime ? `College Timing: ${form.collegeTime}` : null,
      form.workTime ? `Work Timing: ${form.workTime}` : null,
      ``,
      `*🎯 Goals*`,
      `Goals: ${goalsList}`,
      ``,
      form.medicalConditions ? `*⚕️ Medical Conditions:*\n${form.medicalConditions}` : null,
      form.allergies ? `*⚠️ Allergies:*\n${form.allergies}` : null,
      form.supplements ? `*💊 Supplements/Medicines:*\n${form.supplements}` : null,
      form.remarks ? `*📝 Remarks:*\n${form.remarks}` : null,
      ``,
      `_Submitted on ${today}_`,
    ]
      .filter(Boolean)
      .join("\n");

    const waUrl = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(waMsg)}`;
    window.open(waUrl, "_blank");

    setSubmitted(true);
    window.scrollTo(0, 0);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <PlanNavbar />
        <main className="pt-24 pb-20 flex items-center justify-center min-h-screen">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center max-w-md mx-auto px-6"
          >
            <div className="w-20 h-20 bg-green-500/20 flex items-center justify-center mx-auto mb-6 text-green-400 rounded-full">
              <CheckCircle2 size={44} />
            </div>
            <h2 className="text-3xl font-black uppercase text-white mb-4">Thank You!</h2>
            <p className="text-muted-foreground text-base leading-relaxed">
              Thank you for submitting your assessment. Our nutritionist will review your information and contact you shortly with your personalized diet plan.
            </p>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <PlanNavbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">

          {/* Header */}
          <div className="mb-10 text-center">
            <p className="text-primary font-bold uppercase tracking-[0.2em] text-xs mb-3 flex items-center justify-center gap-2">
              <span className="w-8 h-px bg-primary inline-block" />
              Personalized Plan
              <span className="w-8 h-px bg-primary inline-block" />
            </p>
            <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tight mb-3">
              Nutrition{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-yellow-600">
                Assessment
              </span>
            </h1>
            <p className="text-muted-foreground text-sm max-w-lg mx-auto">
              Fill in your details below and our certified dietician will prepare a personalized nutrition plan just for you.
            </p>
          </div>

          <form onSubmit={handleSubmit} noValidate className="space-y-6">

            {/* ── 1. Personal Information ── */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={sectionCls}>
              <h2 className="text-white font-black uppercase tracking-wider text-base border-b border-border pb-3 flex items-center gap-2">
                <span className="w-6 h-6 bg-primary text-black text-xs font-black flex items-center justify-center shrink-0">1</span>
                Personal Information
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Full Name <span className="text-red-400">*</span></label>
                  <input type="text" placeholder="Your name" value={form.name} onChange={e => set("name", e.target.value)} className={inputCls} />
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className={labelCls}>Mobile Number <span className="text-red-400">*</span></label>
                  <input type="tel" placeholder="+91 98765 43210" value={form.phone} onChange={e => set("phone", e.target.value)} className={inputCls} />
                  {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone}</p>}
                </div>
                <div>
                  <label className={labelCls}>Email Address</label>
                  <input type="email" placeholder="you@email.com" value={form.email} onChange={e => set("email", e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Age <span className="text-red-400">*</span></label>
                  <input type="number" placeholder="25" min={10} max={90} value={form.age} onChange={e => set("age", e.target.value)} className={inputCls} />
                  {errors.age && <p className="text-red-400 text-xs mt-1">{errors.age}</p>}
                </div>
              </div>

              <div>
                <label className={labelCls}>Gender</label>
                <div className="flex flex-wrap gap-3">
                  {["Male", "Female", "Other"].map(g => (
                    <label key={g} className={`flex items-center gap-2 px-4 py-2 border cursor-pointer transition-colors text-sm font-medium ${form.gender === g ? "border-primary bg-primary/10 text-white" : "border-white/10 text-muted-foreground hover:border-white/30"}`}>
                      <input type="radio" name="gender" value={g} checked={form.gender === g} onChange={e => set("gender", e.target.value)} className="accent-primary" />
                      {g}
                    </label>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* ── 2. Body Measurements ── */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={sectionCls}>
              <h2 className="text-white font-black uppercase tracking-wider text-base border-b border-border pb-3 flex items-center gap-2">
                <span className="w-6 h-6 bg-primary text-black text-xs font-black flex items-center justify-center shrink-0">2</span>
                Body Measurements
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Weight (kg) <span className="text-red-400">*</span></label>
                  <input type="number" placeholder="70" min={20} max={300} value={form.weight} onChange={e => set("weight", e.target.value)} className={inputCls} />
                  {errors.weight && <p className="text-red-400 text-xs mt-1">{errors.weight}</p>}
                </div>
                <div>
                  <label className={labelCls}>Height (cm) <span className="text-red-400">*</span></label>
                  <input type="number" placeholder="175" min={100} max={250} value={form.height} onChange={e => set("height", e.target.value)} className={inputCls} />
                  {errors.height && <p className="text-red-400 text-xs mt-1">{errors.height}</p>}
                </div>
                <div>
                  <label className={labelCls}>Target Weight (kg)</label>
                  <input type="number" placeholder="65" value={form.targetWeight} onChange={e => set("targetWeight", e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Weight to Gain / Lose (kg)</label>
                  <input type="number" placeholder="5" value={form.weightChange} onChange={e => set("weightChange", e.target.value)} className={inputCls} />
                </div>
              </div>

              {/* BMI Display */}
              {bmiVal && bmiCat && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`border rounded-none p-4 flex items-center justify-between ${bmiCat.color}`}>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest opacity-70 mb-0.5">Your BMI</p>
                    <p className="text-3xl font-black">{bmiVal.toFixed(1)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold uppercase tracking-widest opacity-70 mb-0.5">Category</p>
                    <p className="text-xl font-black">{bmiCat.label}</p>
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* ── 3. Lifestyle ── */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={sectionCls}>
              <h2 className="text-white font-black uppercase tracking-wider text-base border-b border-border pb-3 flex items-center gap-2">
                <span className="w-6 h-6 bg-primary text-black text-xs font-black flex items-center justify-center shrink-0">3</span>
                Lifestyle Information
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Wake-up Time</label>
                  <input type="time" value={form.wakeTime} onChange={e => set("wakeTime", e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Bed Time</label>
                  <input type="time" value={form.bedTime} onChange={e => set("bedTime", e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Sleep Duration (hours)</label>
                  <input type="number" placeholder="7" min={1} max={14} value={form.sleepDuration} onChange={e => set("sleepDuration", e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Workout Time</label>
                  <input type="time" value={form.workoutTime} onChange={e => set("workoutTime", e.target.value)} className={inputCls} />
                </div>
              </div>
            </motion.div>

            {/* ── 4. Food Preference & Schedule ── */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={sectionCls}>
              <h2 className="text-white font-black uppercase tracking-wider text-base border-b border-border pb-3 flex items-center gap-2">
                <span className="w-6 h-6 bg-primary text-black text-xs font-black flex items-center justify-center shrink-0">4</span>
                Food Preference & College / Work Timing
              </h2>

              <div>
                <label className={labelCls}>Food Preference <span className="text-red-400">*</span></label>
                <div className="flex flex-wrap gap-3">
                  {["Vegetarian", "Non-Vegetarian", "Eggitarian"].map(f => (
                    <label key={f} className={`flex items-center gap-2 px-4 py-2 border cursor-pointer transition-colors text-sm font-medium ${form.foodPref === f ? "border-primary bg-primary/10 text-white" : "border-white/10 text-muted-foreground hover:border-white/30"}`}>
                      <input type="radio" name="food" value={f} checked={form.foodPref === f} onChange={e => set("foodPref", e.target.value)} className="accent-primary" />
                      {f}
                    </label>
                  ))}
                </div>
                {errors.foodPref && <p className="text-red-400 text-xs mt-1">{errors.foodPref}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>College Timing</label>
                  <input type="text" placeholder="e.g. 9 AM – 4 PM" value={form.collegeTime} onChange={e => set("collegeTime", e.target.value)} className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Work Timing</label>
                  <input type="text" placeholder="e.g. 10 AM – 6 PM" value={form.workTime} onChange={e => set("workTime", e.target.value)} className={inputCls} />
                </div>
              </div>
            </motion.div>

            {/* ── 5. Health Information ── */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={sectionCls}>
              <h2 className="text-white font-black uppercase tracking-wider text-base border-b border-border pb-3 flex items-center gap-2">
                <span className="w-6 h-6 bg-primary text-black text-xs font-black flex items-center justify-center shrink-0">5</span>
                Health Information
              </h2>
              <div className="space-y-4">
                {(["medicalConditions", "allergies", "supplements"] as const).map((key, i) => (
                  <div key={key}>
                    <label className={labelCls}>{["Medical Conditions", "Allergies", "Current Supplements / Medicines"][i]}</label>
                    <textarea
                      placeholder={["Diabetes, BP, PCOS...", "Lactose, Gluten...", "Whey protein, Vitamin D..."][i]}
                      rows={3}
                      value={form[key]}
                      onChange={e => set(key, e.target.value)}
                      className="w-full bg-transparent border border-white/10 focus:border-primary focus:outline-none px-3 py-2 text-white placeholder:text-white/25 text-sm transition-colors resize-none"
                    />
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ── 6. Goals ── */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={sectionCls}>
              <h2 className="text-white font-black uppercase tracking-wider text-base border-b border-border pb-3 flex items-center gap-2">
                <span className="w-6 h-6 bg-primary text-black text-xs font-black flex items-center justify-center shrink-0">6</span>
                Goals <span className="text-red-400 text-xs font-normal">*</span>
              </h2>
              <div className="flex flex-wrap gap-3">
                {["Weight Loss", "Fat Loss", "Muscle Gain", "Weight Gain", "Maintenance", "Other"].map(g => (
                  <label key={g} className={`flex items-center gap-2 px-4 py-2 border cursor-pointer transition-colors text-sm font-medium ${form.goals.includes(g) ? "border-primary bg-primary/10 text-white" : "border-white/10 text-muted-foreground hover:border-white/30"}`}>
                    <input type="checkbox" checked={form.goals.includes(g)} onChange={() => toggleGoal(g)} className="accent-primary" />
                    {g}
                  </label>
                ))}
              </div>
              {form.goals.includes("Other") && (
                <input type="text" placeholder="Specify your goal..." value={form.otherGoal} onChange={e => set("otherGoal", e.target.value)} className={inputCls} />
              )}
              {errors.goals && <p className="text-red-400 text-xs mt-1">{errors.goals}</p>}
            </motion.div>

            {/* ── 7. Remarks ── */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className={sectionCls}>
              <h2 className="text-white font-black uppercase tracking-wider text-base border-b border-border pb-3 flex items-center gap-2">
                <span className="w-6 h-6 bg-primary text-black text-xs font-black flex items-center justify-center shrink-0">7</span>
                Remarks & Additional Notes
              </h2>
              <textarea
                placeholder="Eating habits, food you like/dislike, meal timings, special instructions, previous diet plans tried..."
                rows={5}
                value={form.remarks}
                onChange={e => set("remarks", e.target.value)}
                className="w-full bg-transparent border border-white/10 focus:border-primary focus:outline-none px-3 py-2 text-white placeholder:text-white/25 text-sm transition-colors resize-none"
              />
            </motion.div>

            {/* ── Consent & Submit ── */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="space-y-5">
              <label className={`flex items-start gap-3 p-4 border cursor-pointer transition-colors ${form.consent ? "border-primary bg-primary/5" : "border-white/10"}`}>
                <input
                  type="checkbox"
                  checked={form.consent}
                  onChange={e => set("consent", e.target.checked)}
                  className="accent-primary mt-0.5 shrink-0 w-4 h-4"
                />
                <span className="text-sm text-muted-foreground leading-relaxed">
                  I confirm that the information provided is accurate and can be used to prepare my personalized nutrition plan.
                </span>
              </label>
              {errors.consent && <p className="text-red-400 text-xs -mt-3">{errors.consent}</p>}

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-black uppercase tracking-widest h-16 transition-colors text-base shadow-[0_4px_30px_rgba(37,211,102,0.3)]"
              >
                <FaWhatsapp size={24} />
                Submit &amp; Send on WhatsApp
              </button>

              <p className="text-center text-xs text-muted-foreground">
                Your details will be sent directly to our certified dietician via WhatsApp.
              </p>
            </motion.div>

          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
}

import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { fetchFresh, updateRecord, type AssessmentData } from "@/lib/sheets";
import { ArrowLeft, Download, MessageCircle, CheckCircle2, Save, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import AdminGuard from "@/components/AdminGuard";
import { logout } from "@/lib/adminAuth";

const MEAL_FIELDS = [
  { key: "earlyMorning", label: "Early Morning", timeKey: "earlyMorningTime" },
  { key: "breakfast", label: "Breakfast", timeKey: "breakfastTime" },
  { key: "midMorning", label: "Mid-Morning", timeKey: "midMorningTime" },
  { key: "lunch", label: "Lunch", timeKey: "lunchTime" },
  { key: "eveningSnack", label: "Evening Snack", timeKey: "eveningSnackTime" },
  { key: "preWorkout", label: "Pre-Workout", timeKey: "preWorkoutTime" },
  { key: "postWorkout", label: "Post-Workout", timeKey: "postWorkoutTime" },
  { key: "dinner", label: "Dinner", timeKey: "dinnerTime" },
  { key: "beforeBed", label: "Before Bed", timeKey: "beforeBedTime" },
  { key: "supplementsPlan", label: "Supplements", timeKey: "supplementsTime" },
  { key: "notes", label: "Notes", timeKey: "notesTime" },
] as const;

function clean(val: string | undefined | null): string {
  const s = String(val ?? "").trim();
  if (!s || s === "0" || s === "undefined" || s === "null") return "--";
  if (s.includes("1899") || s.startsWith("Sat Dec") || s.startsWith("Sun Dec")) {
    try {
      const d = new Date(s);
      if (!isNaN(d.getTime())) return d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
    } catch {}
  }
  return s;
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex gap-4 py-2 border-b border-white/5">
      <span className="text-white/40 text-xs uppercase tracking-widest font-bold w-40 shrink-0">{label}</span>
      <span className="text-white text-sm break-all min-w-0">{clean(value)}</span>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#161b22] border border-white/10 rounded-xl p-5 mb-4">
      <h3 className="text-green-400 font-black uppercase tracking-widest text-xs mb-4 pb-2 border-b border-white/10">{title}</h3>
      {children}
    </div>
  );
}

export default function AdminCustomer({ params }: { params: { id: string } }) {
  const [, navigate] = useLocation();
  const [customer, setCustomer] = useState<AssessmentData | null>(null);
  const [plan, setPlan] = useState<Record<string, string>>({});
  const [rowIdx, setRowIdx] = useState<number>(0);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchFresh().then(async (data) => {
      const paramId = params.id;
      let idx = data.findIndex(d => String(d.id) === paramId);
      let found = idx >= 0 ? data[idx] : undefined;
      if (!found) {
        const ni = parseInt(paramId);
        if (!isNaN(ni) && data[ni]) { idx = ni; found = data[ni]; }
      }
      if (!found || idx < 0) return;
      setRowIdx(idx);
      if (found.status === "New") {
        await updateRecord(idx, { status: "In Progress" });
        found = { ...found, status: "In Progress" };
      }
      setCustomer(found);
      const p: Record<string, string> = {};
      MEAL_FIELDS.forEach(f => {
        p[f.key] = (found as Record<string, unknown>)[f.key] as string || "";
        p[f.timeKey] = (found as Record<string, unknown>)[f.timeKey] as string || "";
      });
      setPlan(p);
    });
  }, [params.id]);

  const handleSave = async () => {
    if (!customer) return;
    setSaving(true);
    const sheetsIdx = customer._rowIndex ?? rowIdx;
    await updateRecord(sheetsIdx, { ...plan, status: "In Progress" });
    setCustomer(c => c ? { ...c, status: "In Progress" } : c);
    setSaved(true);
    setSaving(false);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleMarkComplete = async () => {
    if (!customer) return;
    const sheetsIdx = customer._rowIndex ?? rowIdx;
    await updateRecord(sheetsIdx, { status: "Completed" });
    setCustomer(c => c ? { ...c, status: "Completed" } : c);
  };

  const sendPDF = async () => {
    if (!customer) return;
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const W = 210;
    const margin = 12;
    const usableW = W - margin * 2;
    let y = 10;

    // Yellow header
    doc.setFillColor(255, 208, 0);
    doc.rect(margin, y, usableW, 12, "F");
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(50, 30, 5);
    doc.text("MUSCLE EMPIRE NUTRITION", W / 2, y + 8.5, { align: "center" });
    y += 14;

    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(80, 80, 80);
    doc.text("Office : 9702268603  |  Contact : 9773053632", W / 2, y, { align: "center" });
    y += 5;
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, y, W - margin, y);
    y += 5;

    // Patient info
    doc.setFontSize(8.5);
    doc.setTextColor(0, 0, 0);
    const lbl = (text: string, val: string, x: number, yy: number, lw: number) => {
      doc.setFont("helvetica", "bold");
      doc.text(text, x, yy);
      doc.setFont("helvetica", "normal");
      doc.text(String(val || "--"), x + lw, yy);
    };

    lbl("Name :", customer.name, margin, y, 13);
    lbl("Date :", customer.date, 105, y, 10);
    lbl("Age :", (customer.age || "--") + " yrs", 160, y, 8);
    y += 6;
    lbl("Gender :", customer.gender || "--", margin, y, 15);
    lbl("Weight :", (customer.weight || "--") + " kg", 60, y, 14);
    lbl("Height :", (customer.height || "--") + " cm", 110, y, 14);
    y += 6;
    lbl("BMI :", (customer.bmi || "--") + " (" + (customer.bmiCategory || "--") + ")", margin, y, 8);
    y += 6;
    lbl("Wake-up :", clean(customer.wakeTime), margin, y, 17);
    lbl("Bed Time :", clean(customer.bedTime), 75, y, 18);
    lbl("Food Pref :", customer.foodPref || "--", 145, y, 19);
    y += 6;
    lbl("College :", customer.collegeTime || "--", margin, y, 16);
    lbl("Workout :", clean(customer.workoutTime), 75, y, 17);
    lbl("Target :", (customer.targetWeight || "--") + " kg", 145, y, 13);
    y += 6;
    lbl("Remark :", customer.remarks || customer.goals || "--", margin, y, 16);
    y += 6;

    doc.line(margin, y, W - margin, y);
    y += 5;

    // Diet table - 2 columns: Time | Suggestion
    const timeColW = 38;
    const suggColW = usableW - timeColW;

    doc.setFillColor(50, 30, 5);
    doc.rect(margin, y, usableW, 7, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("Time / Meal", margin + 2, y + 5);
    doc.text("Food Suggestion", margin + timeColW + 2, y + 5);
    y += 7;

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(8);
    doc.setDrawColor(180, 180, 180);

    let altRow = false;
    MEAL_FIELDS.filter(f => plan[f.key]).forEach((f) => {
      const timeVal = plan[f.timeKey] || f.label;
      const lines = doc.splitTextToSize(plan[f.key], suggColW - 4) as string[];
      const rowH = Math.max(8, lines.length * 5 + 3);

      if (y + rowH > 278) { doc.addPage(); y = 15; }

      if (altRow) {
        doc.setFillColor(255, 252, 220);
        doc.rect(margin, y, usableW, rowH, "F");
      }
      altRow = !altRow;

      doc.rect(margin, y, timeColW, rowH);
      doc.rect(margin + timeColW, y, suggColW, rowH);

      doc.setFont("helvetica", "bold");
      doc.text(timeVal, margin + 2, y + 5);
      doc.setFont("helvetica", "normal");
      lines.forEach((line, i) => doc.text(line, margin + timeColW + 2, y + 5 + i * 5));
      y += rowH;
    });

    // 3 empty rows
    for (let i = 0; i < 3; i++) {
      if (y + 7 > 278) { doc.addPage(); y = 15; }
      doc.rect(margin, y, timeColW, 7);
      doc.rect(margin + timeColW, y, suggColW, 7);
      y += 7;
    }

    doc.save("Diet_Sheet_" + customer.name.replace(/\s+/g, "_") + ".pdf");

    setTimeout(() => {
      const phone = String(customer.phone).replace(/\D/g, "");
      const waPhone = phone.startsWith("91") ? phone : "91" + phone;
      const msg = encodeURIComponent("Hello " + customer.name + ",\n\nYour personalized diet plan has been prepared. Please find the attached PDF.\n\nThank you,\nMuscle Empire Nutrition Team");
      window.open("https://wa.me/" + waPhone + "?text=" + msg, "_blank");
    }, 1200);
  };

  const sendWhatsApp = () => {
    if (!customer) return;
    const mealText = MEAL_FIELDS.filter(f => plan[f.key])
      .map(f => "*" + f.label + ":*\n" + plan[f.key]).join("\n\n");
    const msg = "Hello " + customer.name + ",\n\nYour personalized diet plan:\n\n" + mealText + "\n\nThank you,\nMuscle Empire Nutrition Team";
    const phone = String(customer.phone).replace(/\D/g, "");
    const waPhone = phone.startsWith("91") ? phone : "91" + phone;
    window.open("https://wa.me/" + waPhone + "?text=" + encodeURIComponent(msg), "_blank");
    try { navigator.clipboard.writeText(msg); } catch {}
  };

  if (!customer) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center text-white/40">
        Loading assessment...
      </div>
    );
  }

  return (
    <AdminGuard>
      <div className="min-h-screen bg-[#0d1117] text-white">
        <div className="bg-[#161b22] border-b border-white/10 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
          <button onClick={() => navigate("/pronectar-admin-2026/dashboard")}
            className="flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors">
            <ArrowLeft size={16} /> Dashboard
          </button>
          <div className="flex items-center gap-4">
            <span className={"px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full border " + (
              customer.status === "Completed" ? "bg-green-400/15 text-green-400 border-green-400/30" :
              customer.status === "In Progress" ? "bg-blue-400/15 text-blue-400 border-blue-400/30" :
              "bg-yellow-400/15 text-yellow-400 border-yellow-400/30"
            )}>{customer.status || "New"}</span>
            <button onClick={() => { logout(); navigate("/pronectar-admin-2026"); }}
              className="flex items-center gap-1.5 text-red-400/60 hover:text-red-400 text-xs transition-colors">
              <LogOut size={13} /> Logout
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 md:px-6 py-8">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-2xl font-black text-white mb-1">{customer.name}</h1>
            <p className="text-white/40 text-sm mb-8">{customer.phone} &middot; Submitted {customer.date}</p>
          </motion.div>

          <Section title="Personal Information">
            <InfoRow label="Full Name" value={customer.name} />
            <InfoRow label="Phone" value={customer.phone} />
            <InfoRow label="Email" value={customer.email} />
            <InfoRow label="Age" value={customer.age} />
            <InfoRow label="Gender" value={customer.gender} />
          </Section>

          <Section title="Body Measurements">
            <InfoRow label="Weight" value={customer.weight + " kg"} />
            <InfoRow label="Height" value={customer.height + " cm"} />
            <InfoRow label="BMI" value={customer.bmi} />
            <InfoRow label="BMI Category" value={customer.bmiCategory} />
            <InfoRow label="Target Weight" value={customer.targetWeight ? customer.targetWeight + " kg" : "--"} />
            <InfoRow label="Weight Change" value={customer.weightChange ? customer.weightChange + " kg" : "--"} />
          </Section>

          <Section title="Lifestyle">
            <InfoRow label="Wake-up Time" value={customer.wakeTime} />
            <InfoRow label="Bed Time" value={customer.bedTime} />
            <InfoRow label="Sleep Duration" value={customer.sleepDuration ? customer.sleepDuration + " hrs" : "--"} />
            <InfoRow label="Workout Time" value={customer.workoutTime} />
            <InfoRow label="Food Preference" value={customer.foodPref} />
            <InfoRow label="College Timing" value={customer.collegeTime} />
            <InfoRow label="Work Timing" value={customer.workTime} />
          </Section>

          <Section title="Health and Goals">
            <InfoRow label="Goals" value={customer.goals} />
            <InfoRow label="Medical Conditions" value={customer.medicalConditions} />
            <InfoRow label="Allergies" value={customer.allergies} />
            <InfoRow label="Supplements" value={customer.supplements} />
            <InfoRow label="Remarks" value={customer.remarks} />
          </Section>

          {/* Diet Plan Editor */}
          <div className="bg-[#161b22] border border-green-400/20 rounded-xl p-5 mb-6">
            <h3 className="text-green-400 font-black uppercase tracking-widest text-sm mb-6 pb-3 border-b border-white/10 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Diet Plan Editor
            </h3>
            <div className="space-y-5">
              {MEAL_FIELDS.map(f => (
                <div key={f.key} className="bg-[#0d1117] border border-white/5 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-xs font-black uppercase tracking-widest text-green-400">{f.label}</label>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs text-white/40 uppercase tracking-widest mb-1">Time</label>
                      <input
                        type="text"
                        placeholder="e.g. 7:30 AM"
                        value={plan[f.timeKey] || ""}
                        onChange={e => setPlan(p => ({ ...p, [f.timeKey]: e.target.value }))}
                        className="w-full bg-[#161b22] border border-white/10 focus:border-green-400 focus:outline-none px-3 py-2 text-white placeholder:text-white/20 text-sm rounded-lg transition-colors"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs text-white/40 uppercase tracking-widest mb-1">Food Suggestion</label>
                      <textarea
                        rows={2}
                        placeholder={"Enter " + f.label.toLowerCase() + " details..."}
                        value={plan[f.key] || ""}
                        onChange={e => setPlan(p => ({ ...p, [f.key]: e.target.value }))}
                        className="w-full bg-[#161b22] border border-white/10 focus:border-green-400 focus:outline-none px-3 py-2 text-white placeholder:text-white/20 text-sm rounded-lg resize-none transition-colors"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <button onClick={handleSave} disabled={saving}
              className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-black font-black uppercase tracking-wider py-3 rounded-xl text-xs transition-colors disabled:opacity-60">
              <Save size={14} />
              {saving ? "Saving..." : saved ? "Saved" : "Save Draft"}
            </button>
            <button onClick={sendPDF}
              className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-400 text-white font-black uppercase tracking-wider py-3 rounded-xl text-xs transition-colors">
              <Download size={14} />
              Send PDF
            </button>
            <button onClick={sendWhatsApp}
              className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-black uppercase tracking-wider py-3 rounded-xl text-xs transition-colors">
              <MessageCircle size={14} />
              Send WhatsApp
            </button>
            <button onClick={handleMarkComplete} disabled={customer.status === "Completed"}
              className={"flex items-center justify-center gap-2 font-black uppercase tracking-wider py-3 rounded-xl text-xs transition-colors " + (
                customer.status === "Completed"
                  ? "bg-green-500/20 text-green-400 border border-green-400/30 cursor-default"
                  : "bg-white/10 hover:bg-green-500 hover:text-black text-white"
              )}>
              <CheckCircle2 size={14} />
              {customer.status === "Completed" ? "Completed" : "Mark Complete"}
            </button>
          </div>
        </div>
      </div>
    </AdminGuard>
  );
}

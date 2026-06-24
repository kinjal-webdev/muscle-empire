import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { fetchFresh, updateRecord, type AssessmentData } from "@/lib/sheets";
import { ArrowLeft, Download, MessageCircle, CheckCircle2, Save, LogOut } from "lucide-react";
import { motion } from "framer-motion";
import AdminGuard from "@/components/AdminGuard";
import { logout } from "@/lib/adminAuth";

const MEAL_FIELDS = [
  { key: "earlyMorning", label: "Early Morning" },
  { key: "breakfast", label: "Breakfast" },
  { key: "midMorning", label: "Mid-Morning" },
  { key: "lunch", label: "Lunch" },
  { key: "eveningSnack", label: "Evening Snack" },
  { key: "preWorkout", label: "Pre-Workout" },
  { key: "postWorkout", label: "Post-Workout" },
  { key: "dinner", label: "Dinner" },
  { key: "beforeBed", label: "Before Bed" },
  { key: "supplementsPlan", label: "Supplements" },
  { key: "notes", label: "Notes" },
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
      MEAL_FIELDS.forEach(f => { p[f.key] = (found as Record<string, unknown>)[f.key] as string || ""; });
      setPlan(p);
    });
  }, [params.id]);

  const handleSave = async () => {
    if (!customer) return;
    setSaving(true);
    const sheetsIdx = customer._rowIndex ?? rowIdx;
    await updateRecord(sheetsIdx, { ...plan, status: "In Progress" });
    setCustomer(c => c ? { ...c, status: "In Progress", ...plan } : c);
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
    const margin = 10;
    let y = 10;

    // ── HEADER ──────────────────────────────────────────────────────
    // Yellow background header bar
    doc.setFillColor(255, 208, 0);
    doc.rect(margin, y, W - margin * 2, 14, "F");
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(50, 30, 5);
    doc.text("MUSCLE EMPIRE NUTRITION", W / 2, y + 10, { align: "center" });

    y += 16;
    doc.setFontSize(8);
    doc.setTextColor(60, 60, 60);
    doc.text("Office : 9702268603  |  Sagar Kharat : 9773053632  |  8779682084", W / 2, y, { align: "center" });

    y += 4;
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, y, W - margin, y);
    y += 4;

    // ── PATIENT INFO TABLE ───────────────────────────────────────────
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);

    const infoRows = [
      [
        { label: "Name :", value: customer.name },
        { label: "MF No. :", value: "--" },
        { label: "Contacts No. :", value: customer.phone },
        { label: "Date :", value: customer.date },
        { label: "Age :", value: customer.age + " yrs" },
      ],
      [
        { label: "Gender :", value: customer.gender || "--" },
        { label: "Weight (Kg) :", value: customer.weight || "--" },
        { label: "Height (cms) :", value: customer.height || "--" },
        { label: "BMI :", value: customer.bmi + " (" + customer.bmiCategory + ")" },
      ],
      [
        { label: "Wake-up Time :", value: customer.wakeTime || "--" },
        { label: "Bed Time :", value: customer.bedTime || "--" },
        { label: "Rest Time :", value: customer.sleepDuration ? customer.sleepDuration + " hrs" : "--" },
        { label: "Foods Preference :", value: customer.foodPref || "--" },
      ],
      [
        { label: "College Time :", value: customer.collegeTime || "--" },
        { label: "Workout Time :", value: customer.workoutTime || "--" },
        { label: "Target :", value: customer.targetWeight ? customer.targetWeight + " kg" : "--" },
        { label: "Require to lose :", value: customer.weightChange ? customer.weightChange + " kg" : "--" },
      ],
    ];

    infoRows.forEach((row) => {
      let x = margin;
      const colW = (W - margin * 2) / row.length;
      row.forEach((cell) => {
        doc.setFont("helvetica", "bold");
        doc.text(cell.label, x, y);
        const labelW = doc.getTextWidth(cell.label) + 2;
        doc.setFont("helvetica", "normal");
        doc.text(cell.value, x + labelW, y);
        x += colW;
      });
      y += 6;
    });

    // Remarks
    doc.setFont("helvetica", "bold");
    doc.text("Remark :", margin, y);
    doc.setFont("helvetica", "normal");
    doc.text(customer.remarks || customer.goals || "--", margin + 22, y);
    y += 6;

    doc.line(margin, y, W - margin, y);
    y += 5;

    // ── DIET PLAN TABLE ──────────────────────────────────────────────
    const timeW = 25;
    const foodsW = 55;
    const timeW2 = 25;
    const suggW = W - margin * 2 - timeW - foodsW - timeW2;

    // Table header
    doc.setFillColor(50, 30, 5);
    doc.rect(margin, y, W - margin * 2, 7, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.text("Time", margin + 2, y + 5);
    doc.text("Foods Items / History", margin + timeW + 2, y + 5);
    doc.text("Time", margin + timeW + foodsW + 2, y + 5);
    doc.text("Suggestion", margin + timeW + foodsW + timeW2 + 2, y + 5);
    y += 7;

    // Meal rows
    const mealData: { meal: string; content: string }[] = MEAL_FIELDS
      .filter(f => plan[f.key])
      .map(f => ({ meal: f.label, content: plan[f.key] }));

    doc.setTextColor(0, 0, 0);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setDrawColor(180, 180, 180);

    let rowBg = false;
    mealData.forEach((row) => {
      const lines = doc.splitTextToSize(row.content, suggW - 4) as string[];
      const rowH = Math.max(7, lines.length * 5 + 2);

      if (rowBg) {
        doc.setFillColor(255, 252, 230);
        doc.rect(margin, y, W - margin * 2, rowH, "F");
      }
      rowBg = !rowBg;

      // Draw cell borders
      doc.rect(margin, y, timeW, rowH);
      doc.rect(margin + timeW, y, foodsW, rowH);
      doc.rect(margin + timeW + foodsW, y, timeW2, rowH);
      doc.rect(margin + timeW + foodsW + timeW2, y, suggW, rowH);

      // Meal name in first column
      doc.setFont("helvetica", "bold");
      doc.text(row.meal, margin + 2, y + 5);

      // Content in suggestion column
      doc.setFont("helvetica", "normal");
      lines.forEach((line, i) => {
        doc.text(line, margin + timeW + foodsW + timeW2 + 2, y + 5 + i * 5);
      });

      if (y + rowH > 260) { doc.addPage(); y = 15; }
      y += rowH;
    });

    // Empty rows
    for (let i = 0; i < 3; i++) {
      doc.rect(margin, y, timeW, 7);
      doc.rect(margin + timeW, y, foodsW, 7);
      doc.rect(margin + timeW + foodsW, y, timeW2, 7);
      doc.rect(margin + timeW + foodsW + timeW2, y, suggW, 7);
      y += 7;
    }

    y += 4;

    // ── NOTES ────────────────────────────────────────────────────────
    if (plan["notes"] || customer.supplements || customer.medicalConditions) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.text("Notes :", margin, y);
      doc.setFont("helvetica", "normal");
      const notesText = plan["notes"] || customer.supplements || customer.medicalConditions || "";
      const noteLines = doc.splitTextToSize(notesText, W - margin * 2 - 20) as string[];
      noteLines.forEach((line, i) => doc.text(line, margin + 18, y + i * 5));
      y += noteLines.length * 5 + 4;
    }

    y += 8;
    doc.line(margin, y, 100, y);
    doc.line(130, y, W - margin, y);
    doc.setFontSize(8);
    doc.setTextColor(100, 100, 100);
    doc.text("Customer Signature", margin, y + 4);
    doc.text("Nutritionist Signature", 130, y + 4);

    // Save
    const filename = "Diet_Sheet_" + customer.name.replace(/\s+/g, "_") + ".pdf";
    doc.save(filename);

    // Open WhatsApp after save
    setTimeout(() => {
      const phone = String(customer.phone).replace(/\D/g, "");
      const waPhone = phone.startsWith("91") ? phone : "91" + phone;
      const msg = encodeURIComponent("Hello " + customer.name + ",\n\nYour personalized diet plan has been prepared. The PDF has been saved to your device. Please find it attached.\n\nThank you,\nMuscle Empire Nutrition Team");
      window.open("https://wa.me/" + waPhone + "?text=" + msg, "_blank");
    }, 1200);
  };

  const sendWhatsApp = () => {
    if (!customer) return;
    const mealText = MEAL_FIELDS.filter(f => plan[f.key]).map(f => "*" + f.label + ":*\n" + plan[f.key]).join("\n\n");
    const msg = "Hello " + customer.name + ",\n\nYour personalized diet plan has been prepared by Muscle Empire Gymnasium.\n\n" + mealText + "\n\nThank you,\nMuscle Empire Nutrition Team";
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

          <div className="bg-[#161b22] border border-green-400/20 rounded-xl p-5 mb-6">
            <h3 className="text-green-400 font-black uppercase tracking-widest text-sm mb-6 pb-3 border-b border-white/10 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Diet Plan Editor
            </h3>
            <div className="space-y-4">
              {MEAL_FIELDS.map(f => (
                <div key={f.key}>
                  <label className="block text-xs font-bold uppercase tracking-widest text-green-400/70 mb-1.5">{f.label}</label>
                  <textarea rows={3} value={plan[f.key] || ""}
                    onChange={e => setPlan(p => ({ ...p, [f.key]: e.target.value }))}
                    placeholder={"Enter " + f.label.toLowerCase() + " details..."}
                    className="w-full bg-[#0d1117] border border-white/10 focus:border-green-400 focus:outline-none px-3 py-2 text-white placeholder:text-white/20 text-sm rounded-lg resize-none transition-colors"
                  />
                </div>
              ))}
            </div>
          </div>

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

import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { fetchSubmissions, updateRecord, type AssessmentData } from "@/lib/sheets";
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

function InfoRow({ label, value }: { label: string; value: string }) {
  // Fix Google Sheets time format (1899-12-30T16:38:50.000Z → 4:38 PM)
  let display = value || "—";
  if (display.startsWith("1899-12-30T")) {
    try {
      const d = new Date(display);
      display = d.toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });
    } catch { /* keep original */ }
  }
  return (
    <div className="flex gap-4 py-2 border-b border-white/5">
      <span className="text-white/40 text-xs uppercase tracking-widest font-bold w-40 shrink-0">{label}</span>
      <span className="text-white text-sm">{display}</span>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-[#161b22] border border-white/10 rounded-xl p-5 mb-4">
      <h3 className="text-green-400 font-black uppercase tracking-widest text-xs mb-4 pb-2 border-b border-white/10">
        {title}
      </h3>
      {children}
    </div>
  );
}

export default function AdminCustomer({ params }: { params: { id: string } }) {
  const [, navigate] = useLocation();
  const [customer, setCustomer] = useState<AssessmentData | null>(null);
  const [plan, setPlan] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetchSubmissions().then((data) => {
      const idx = parseInt(params.id);
      const found =
        data.find((d, i) => (d._rowIndex ?? i) === idx) || data[idx];
      if (found) {
        setCustomer(found);
        const p: Record<string, string> = {};
        MEAL_FIELDS.forEach((f) => {
          p[f.key] = (found as Record<string, unknown>)[f.key] as string || "";
        });
        setPlan(p);
      }
    });
  }, [params.id]);

  const handleSave = async () => {
    if (!customer) return;
    setSaving(true);
    const idx = customer._rowIndex ?? parseInt(params.id);
    await updateRecord(idx, { ...plan, status: "In Progress" });
    setCustomer((c) => (c ? { ...c, status: "In Progress" } : c));
    setSaved(true);
    setSaving(false);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleMarkComplete = async () => {
    if (!customer) return;
    const idx = customer._rowIndex ?? parseInt(params.id);
    await updateRecord(idx, { status: "Completed" });
    setCustomer((c) => (c ? { ...c, status: "Completed" } : c));
  };

  const generatePDF = async () => {
    if (!customer) return;
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF();
    const lineH = 7;
    let y = 20;

    const addLine = (text: string, bold = false) => {
      if (bold) doc.setFont("helvetica", "bold");
      else doc.setFont("helvetica", "normal");
      doc.text(text, 15, y);
      y += lineH;
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
    };

    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("MUSCLE EMPIRE GYMNASIUM", 105, y, { align: "center" });
    y += 8;
    doc.setFontSize(13);
    doc.text("Personalized Diet Sheet", 105, y, { align: "center" });
    y += 12;

    doc.setFontSize(10);
    addLine("CUSTOMER INFORMATION", true);
    y += 2;
    addLine(`Date: ${customer.date}`);
    addLine(`Name: ${customer.name}`);
    addLine(`Phone: ${customer.phone}`);
    addLine(`Age: ${customer.age}  |  Gender: ${customer.gender}`);
    addLine(`Weight: ${customer.weight} kg  |  Height: ${customer.height} cm`);
    addLine(`BMI: ${customer.bmi} (${customer.bmiCategory})`);
    addLine(`Goal: ${customer.goals}`);
    addLine(`Food Preference: ${customer.foodPref}`);
    y += 4;
    addLine("DIET PLAN", true);
    y += 2;

    MEAL_FIELDS.forEach((f) => {
      if (plan[f.key]) {
        addLine(f.label + ":", true);
        const lines = doc.splitTextToSize(plan[f.key], 180);
        (lines as string[]).forEach((l: string) => addLine("  " + l));
        y += 2;
      }
    });

    doc.save(`Diet_Sheet_${customer.name.replace(/\s+/g, "_")}.pdf`);
  };

  const copyWhatsApp = () => {
    if (!customer) return;
    const mealText = MEAL_FIELDS.filter((f) => plan[f.key])
      .map((f) => `*${f.label}:*\n${plan[f.key]}`)
      .join("\n\n");

    const msg = `Hello ${customer.name},\n\nYour personalized diet plan has been prepared by Muscle Empire Gymnasium.\n\n${mealText}\n\nThank you,\nMuscle Empire Nutrition Team`;

    // Open WhatsApp directly with customer's phone number
    const phone = String(customer.phone).replace(/\D/g, "");
    const waPhone = phone.startsWith("91") ? phone : `91${phone}`;
    const waUrl = `https://wa.me/${waPhone}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, "_blank");

    // Try clipboard in background (non-blocking)
    try { navigator.clipboard.writeText(msg); } catch { /* ignore */ }
  };

  const handleMarkCompleteClick = async () => {
    if (!customer) return;
    const idx = customer._rowIndex ?? parseInt(params.id);
    await updateRecord(idx, { status: "Completed" });
    setCustomer((c) => (c ? { ...c, status: "Completed" } : c));
  };

  if (!customer) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center text-white/40">
        Loading...
      </div>
    );
  }

  return (
    <AdminGuard>
    <div className="min-h-screen bg-[#0d1117] text-white">
      {/* Sticky Header */}
      <div className="bg-[#161b22] border-b border-white/10 px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <button
          onClick={() => navigate("/pronectar-admin-2026/dashboard")}
          className="flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors"
        >
          <ArrowLeft size={16} /> Dashboard
        </button>
        <div className="flex items-center gap-4">
          <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-full border ${
            customer.status === "Completed" ? "bg-green-400/15 text-green-400 border-green-400/30" :
            customer.status === "In Progress" ? "bg-blue-400/15 text-blue-400 border-blue-400/30" :
            "bg-yellow-400/15 text-yellow-400 border-yellow-400/30"
          }`}>{customer.status}</span>
          <button onClick={() => { logout(); navigate("/pronectar-admin-2026"); }}
            className="flex items-center gap-1.5 text-red-400/60 hover:text-red-400 text-xs transition-colors">
            <LogOut size={13} /> Logout
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-2xl font-black text-white mb-1">
            {customer.name}
          </h1>
          <p className="text-white/40 text-sm mb-8">
            {customer.phone} · Submitted {customer.date}
          </p>
        </motion.div>

        {/* Customer Info — Read Only */}
        <Section title="Personal Information">
          <InfoRow label="Full Name" value={customer.name} />
          <InfoRow label="Phone" value={customer.phone} />
          <InfoRow label="Email" value={customer.email} />
          <InfoRow label="Age" value={customer.age} />
          <InfoRow label="Gender" value={customer.gender} />
        </Section>

        <Section title="Body Measurements">
          <InfoRow label="Weight" value={`${customer.weight} kg`} />
          <InfoRow label="Height" value={`${customer.height} cm`} />
          <InfoRow label="BMI" value={customer.bmi} />
          <InfoRow label="BMI Category" value={customer.bmiCategory} />
          <InfoRow
            label="Target Weight"
            value={customer.targetWeight ? `${customer.targetWeight} kg` : "—"}
          />
          <InfoRow
            label="Weight Change"
            value={customer.weightChange ? `${customer.weightChange} kg` : "—"}
          />
        </Section>

        <Section title="Lifestyle">
          <InfoRow label="Wake-up Time" value={customer.wakeTime} />
          <InfoRow label="Bed Time" value={customer.bedTime} />
          <InfoRow
            label="Sleep Duration"
            value={customer.sleepDuration ? `${customer.sleepDuration} hrs` : "—"}
          />
          <InfoRow label="Workout Time" value={customer.workoutTime} />
          <InfoRow label="Food Preference" value={customer.foodPref} />
          <InfoRow label="College Timing" value={customer.collegeTime} />
          <InfoRow label="Work Timing" value={customer.workTime} />
        </Section>

        <Section title="Health & Goals">
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
          <div className="space-y-4">
            {MEAL_FIELDS.map((f) => (
              <div key={f.key}>
                <label className="block text-xs font-bold uppercase tracking-widest text-green-400/70 mb-1.5">
                  {f.label}
                </label>
                <textarea
                  rows={3}
                  value={plan[f.key] || ""}
                  onChange={(e) =>
                    setPlan((p) => ({ ...p, [f.key]: e.target.value }))
                  }
                  placeholder={`Enter ${f.label.toLowerCase()} details...`}
                  className="w-full bg-[#0d1117] border border-white/10 focus:border-green-400 focus:outline-none px-3 py-2 text-white placeholder:text-white/20 text-sm rounded-lg resize-none transition-colors"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-400 text-black font-black uppercase tracking-wider py-3 rounded-xl text-xs transition-colors disabled:opacity-60"
          >
            <Save size={14} />
            {saving ? "Saving..." : saved ? "Saved ✓" : "Save Draft"}
          </button>
          <button
            onClick={generatePDF}
            className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-400 text-white font-black uppercase tracking-wider py-3 rounded-xl text-xs transition-colors"
          >
            <Download size={14} />
            Download PDF
          </button>
          <button
            onClick={copyWhatsApp}
            className="flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1ebe5d] text-white font-black uppercase tracking-wider py-3 rounded-xl text-xs transition-colors"
          >
            <MessageCircle size={14} />
            Send WhatsApp
          </button>
          <button
            onClick={handleMarkCompleteClick}
            disabled={customer.status === "Completed"}
            className={`flex items-center justify-center gap-2 font-black uppercase tracking-wider py-3 rounded-xl text-xs transition-colors ${
              customer.status === "Completed"
                ? "bg-green-500/20 text-green-400 border border-green-400/30 cursor-default"
                : "bg-white/10 hover:bg-green-500 hover:text-black text-white"
            }`}
          >
            <CheckCircle2 size={14} />
            {customer.status === "Completed" ? "Completed ✓" : "Mark Complete"}
          </button>
        </div>
      </div>
    </div>
    </AdminGuard>
  );
}

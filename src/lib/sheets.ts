export const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbybukjlziG4x3CzM355F6wTeUI6Lgh4iA7reI1RiCuom3Fyqv9f3MX-waqM0Y8az9YkcQ/exec";

export type AssessmentData = {
  id?: string;
  _rowIndex?: number;
  date: string; name: string; phone: string; email: string;
  age: string; gender: string; weight: string; height: string;
  bmi: string; bmiCategory: string; wakeTime: string; bedTime: string;
  sleepDuration: string; workoutTime: string; targetWeight: string;
  weightChange: string; foodPref: string; collegeTime: string; workTime: string;
  medicalConditions: string; allergies: string; supplements: string;
  goals: string; remarks: string; status: string;
  earlyMorning?: string; breakfast?: string; midMorning?: string;
  lunch?: string; eveningSnack?: string; preWorkout?: string;
  postWorkout?: string; dinner?: string; beforeBed?: string;
  supplementsPlan?: string; notes?: string;
};

const LOCAL_KEY = "me_assessments";
const CONFIGURED = true; // URL is set

function getLocal(): AssessmentData[] {
  try { return JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]"); }
  catch { return []; }
}
function saveLocal(data: AssessmentData[]) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
}

// Apps Script only works with GET requests from browser (CORS bypass)
function scriptGet(params: Record<string, string>): Promise<unknown> {
  const qs = new URLSearchParams(params).toString();
  return fetch(`${APPS_SCRIPT_URL}?${qs}`, {
    method: "GET",
    redirect: "follow",
  }).then(r => r.json()).catch(() => null);
}

export async function submitAssessment(data: AssessmentData): Promise<void> {
  const id = Date.now().toString();
  const payload = { ...data, id };

  // Save locally (deduplicate by id)
  const existing = getLocal();
  if (!existing.some(e => e.id === id)) {
    existing.unshift({ ...payload, _rowIndex: existing.length });
    saveLocal(existing);
  }

  // Submit to Sheets — single request, no duplicates
  if (CONFIGURED) {
    const params: Record<string, string> = { action: "submit" };
    Object.entries(payload).forEach(([k, v]) => {
      if (k !== "action") params[k] = String(v ?? "");
    });
    await scriptGet(params);
  }
}

export async function fetchSubmissions(): Promise<AssessmentData[]> {
  if (CONFIGURED) {
    try {
      const res = await fetch(`${APPS_SCRIPT_URL}?action=list`, { redirect: "follow" });
      const json = await res.json();
      if (json?.data?.length) return json.data;
    } catch { /* fallback */ }
  }
  return getLocal();
}

export async function updateRecord(rowIndex: number, updates: Partial<AssessmentData>): Promise<void> {
  // Update local first
  const existing = getLocal();
  if (existing[rowIndex]) {
    existing[rowIndex] = { ...existing[rowIndex], ...updates };
    saveLocal(existing);
  }

  // Sync to Sheets
  if (CONFIGURED) {
    const params: Record<string, string> = { action: "update", rowIndex: String(rowIndex) };
    Object.entries(updates).forEach(([k, v]) => { params[k] = String(v ?? ""); });
    await scriptGet(params);
  }
}

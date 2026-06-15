export const APPS_SCRIPT_URL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";

export type AssessmentData = {
  id?: string;
  _rowIndex?: number;
  date: string;
  name: string;
  phone: string;
  email: string;
  age: string;
  gender: string;
  weight: string;
  height: string;
  bmi: string;
  bmiCategory: string;
  wakeTime: string;
  bedTime: string;
  sleepDuration: string;
  workoutTime: string;
  targetWeight: string;
  weightChange: string;
  foodPref: string;
  collegeTime: string;
  workTime: string;
  medicalConditions: string;
  allergies: string;
  supplements: string;
  goals: string;
  remarks: string;
  status: string;
  // Diet plan fields
  earlyMorning?: string;
  breakfast?: string;
  midMorning?: string;
  lunch?: string;
  eveningSnack?: string;
  preWorkout?: string;
  postWorkout?: string;
  dinner?: string;
  beforeBed?: string;
  supplementsPlan?: string;
  notes?: string;
};

const LOCAL_KEY = "me_assessments";

function getLocal(): AssessmentData[] {
  try {
    return JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]");
  } catch {
    return [];
  }
}

function saveLocal(data: AssessmentData[]) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
}

export function isConfigured() {
  return APPS_SCRIPT_URL !== "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";
}

export async function submitAssessment(data: AssessmentData): Promise<void> {
  const id = Date.now().toString();
  const payload = { ...data, id };
  if (isConfigured()) {
    try {
      const body = new FormData();
      body.append("action", "submit");
      Object.entries(payload).forEach(([k, v]) => body.append(k, String(v ?? "")));
      await fetch(APPS_SCRIPT_URL, { method: "POST", body });
    } catch {
      /* fallback to local */
    }
  }
  const existing = getLocal();
  existing.unshift({ ...payload, _rowIndex: existing.length });
  saveLocal(existing);
}

export async function fetchSubmissions(): Promise<AssessmentData[]> {
  if (isConfigured()) {
    try {
      const res = await fetch(`${APPS_SCRIPT_URL}?action=list`);
      const json = await res.json();
      if (json.data) return json.data;
    } catch {
      /* fallback */
    }
  }
  return getLocal();
}

export async function updateRecord(
  rowIndex: number,
  updates: Partial<AssessmentData>
): Promise<void> {
  if (isConfigured()) {
    try {
      const body = new FormData();
      body.append("action", "update");
      body.append("rowIndex", String(rowIndex));
      Object.entries(updates).forEach(([k, v]) => body.append(k, String(v ?? "")));
      await fetch(APPS_SCRIPT_URL, { method: "POST", body });
    } catch {
      /* fallback */
    }
  }
  const existing = getLocal();
  if (existing[rowIndex]) {
    existing[rowIndex] = { ...existing[rowIndex], ...updates };
    saveLocal(existing);
  }
}

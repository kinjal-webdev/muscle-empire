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
const CACHE_TS_KEY = "me_assessments_ts";
const CACHE_TTL = 60_000; // 60 seconds — only re-fetch from Sheets if older than this

function getLocal(): AssessmentData[] {
  try { return JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]"); }
  catch { return []; }
}
function saveLocal(data: AssessmentData[]) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(data));
  localStorage.setItem(CACHE_TS_KEY, String(Date.now()));
}
function isCacheStale(): boolean {
  const ts = parseInt(localStorage.getItem(CACHE_TS_KEY) || "0", 10);
  return Date.now() - ts > CACHE_TTL;
}

function scriptGet(params: Record<string, string>): Promise<unknown> {
  const qs = new URLSearchParams(params).toString();
  return fetch(`${APPS_SCRIPT_URL}?${qs}`, { method: "GET", redirect: "follow" })
    .then(r => r.json()).catch(() => null);
}

export async function submitAssessment(data: AssessmentData): Promise<void> {
  const id = Date.now().toString();
  const payload = { ...data, id };

  const existing = getLocal();
  if (!existing.some(e => e.id === id)) {
    existing.unshift({ ...payload, _rowIndex: existing.length });
    saveLocal(existing);
  }

  // Fire-and-forget — don't await so UI doesn't block
  const params: Record<string, string> = { action: "submit" };
  Object.entries(payload).forEach(([k, v]) => { if (k !== "action") params[k] = String(v ?? ""); });
  scriptGet(params);
}

// Fast: returns localStorage immediately, syncs from Sheets in background if cache is stale
export async function fetchSubmissions(forceRefresh = false): Promise<AssessmentData[]> {
  const local = getLocal();

  // Return local immediately if cache is fresh
  if (!forceRefresh && !isCacheStale() && local.length > 0) {
    return local;
  }

  // Try fetching from Sheets
  try {
    const res = await fetch(`${APPS_SCRIPT_URL}?action=list&_t=${Date.now()}`, { redirect: "follow" });
    const json = await res.json();
    if (json?.data) {
      saveLocal(json.data);
      return json.data;
    }
  } catch { /* fallback */ }

  return local;
}

// Always force fresh from Sheets (for Track Record)
export async function fetchFresh(): Promise<AssessmentData[]> {
  return fetchSubmissions(true);
}

export async function updateRecord(rowIndex: number, updates: Partial<AssessmentData>): Promise<void> {
  const existing = getLocal();
  if (existing[rowIndex]) {
    existing[rowIndex] = { ...existing[rowIndex], ...updates };
    saveLocal(existing);
  }
  // Fire-and-forget
  const params: Record<string, string> = { action: "update", rowIndex: String(rowIndex) };
  Object.entries(updates).forEach(([k, v]) => { params[k] = String(v ?? ""); });
  scriptGet(params);
}

export async function deleteRecord(rowIndex: number): Promise<void> {
  const existing = getLocal();
  existing.splice(rowIndex, 1);
  existing.forEach((item, i) => { item._rowIndex = i; });
  saveLocal(existing);
  // Fire-and-forget
  scriptGet({ action: "deleteRow", rowIndex: String(rowIndex) });
}

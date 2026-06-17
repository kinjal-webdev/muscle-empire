# Google Apps Script Setup

## IMPORTANT — Replace your existing script with this updated version

The browser cannot send POST requests to Apps Script due to CORS.
All requests now use GET parameters instead.

## Steps

1. Open your Google Sheet → **Extensions** → **Apps Script**
2. Delete ALL existing code
3. Paste the code below
4. Click **Save** (Ctrl+S)
5. Click **Deploy** → **New Deployment** (or edit existing)
   - Type: **Web App**
   - Execute as: **Me**
   - Who has access: **Anyone**
6. Click **Deploy** → Authorize if prompted → Copy Web App URL
7. Paste URL into `src/lib/sheets.ts` → `APPS_SCRIPT_URL`

---

## Apps Script Code (PASTE THIS)

```javascript
const SHEET_NAME = "Assessments";

const HEADERS = [
  "ID","Date","Name","Phone","Email","Age","Gender","Weight","Height",
  "BMI","BMI Category","Wake Time","Bed Time","Sleep Duration","Workout Time",
  "Target Weight","Weight Change","Food Pref","College Time","Work Time",
  "Medical Conditions","Allergies","Supplements","Goals","Remarks","Status",
  "Early Morning","Breakfast","Mid Morning","Lunch","Evening Snack",
  "Pre Workout","Post Workout","Dinner","Before Bed","Supplements Plan","Notes"
];

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold").setBackground("#FFD000");
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold").setBackground("#FFD000");
  }
  return sheet;
}

function doGet(e) {
  const p = e.parameter;
  const action = p.action;

  if (action === "submit") {
    const sheet = getSheet();
    sheet.appendRow([
      p.id || Date.now().toString(),
      p.date, p.name, p.phone, p.email, p.age, p.gender,
      p.weight, p.height, p.bmi, p.bmiCategory,
      p.wakeTime, p.bedTime, p.sleepDuration, p.workoutTime,
      p.targetWeight, p.weightChange, p.foodPref,
      p.collegeTime, p.workTime, p.medicalConditions,
      p.allergies, p.supplements, p.goals, p.remarks,
      p.status || "New",
      p.earlyMorning || "", p.breakfast || "", p.midMorning || "",
      p.lunch || "", p.eveningSnack || "", p.preWorkout || "",
      p.postWorkout || "", p.dinner || "", p.beforeBed || "",
      p.supplementsPlan || "", p.notes || ""
    ]);
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  if (action === "list") {
    const sheet = getSheet();
    const lastRow = sheet.getLastRow();
    if (lastRow <= 1) {
      return ContentService
        .createTextOutput(JSON.stringify({ data: [] }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    const rows = sheet.getRange(2, 1, lastRow - 1, HEADERS.length).getValues();
    const data = rows.map((row, i) => ({
      _rowIndex: i,
      id: row[0], date: row[1], name: row[2], phone: row[3],
      email: row[4], age: row[5], gender: row[6], weight: row[7],
      height: row[8], bmi: row[9], bmiCategory: row[10],
      wakeTime: row[11], bedTime: row[12], sleepDuration: row[13],
      workoutTime: row[14], targetWeight: row[15], weightChange: row[16],
      foodPref: row[17], collegeTime: row[18], workTime: row[19],
      medicalConditions: row[20], allergies: row[21], supplements: row[22],
      goals: row[23], remarks: row[24], status: row[25],
      earlyMorning: row[26], breakfast: row[27], midMorning: row[28],
      lunch: row[29], eveningSnack: row[30], preWorkout: row[31],
      postWorkout: row[32], dinner: row[33], beforeBed: row[34],
      supplementsPlan: row[35], notes: row[36]
    }));
    return ContentService
      .createTextOutput(JSON.stringify({ data }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  if (action === "update") {
    const sheet = getSheet();
    const rowNum = parseInt(p.rowIndex) + 2; // +2: header row + 1-indexed
    const updates = {
      status: p.status,
      earlyMorning: p.earlyMorning, breakfast: p.breakfast,
      midMorning: p.midMorning, lunch: p.lunch,
      eveningSnack: p.eveningSnack, preWorkout: p.preWorkout,
      postWorkout: p.postWorkout, dinner: p.dinner,
      beforeBed: p.beforeBed, supplementsPlan: p.supplementsPlan,
      notes: p.notes
    };
    const colMap = {
      status: 26, earlyMorning: 27, breakfast: 28, midMorning: 29,
      lunch: 30, eveningSnack: 31, preWorkout: 32, postWorkout: 33,
      dinner: 34, beforeBed: 35, supplementsPlan: 36, notes: 37
    };
    Object.entries(updates).forEach(([key, val]) => {
      if (val !== undefined && val !== null) {
        sheet.getRange(rowNum, colMap[key]).setValue(val);
      }
    });
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService
    .createTextOutput(JSON.stringify({ error: "Unknown action" }))
    .setMimeType(ContentService.MimeType.JSON);
}

// Keep doPost as alias for compatibility
function doPost(e) {
  return doGet(e);
}
```

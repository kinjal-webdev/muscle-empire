# Google Apps Script — Full Updated Code

## Steps
1. Open your Google Sheet → **Extensions** → **Apps Script**
2. Delete ALL existing code
3. Paste the full code below
4. Save → **Deploy** → **New Deployment** (Web App, Execute as Me, Anyone)
5. Copy URL → paste into `src/lib/sheets.ts` → `APPS_SCRIPT_URL`

---

## Full Script (paste this)

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
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
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

function getConfig() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Config");
  if (!sheet) {
    sheet = ss.insertSheet("Config");
    sheet.appendRow(["adminPassword", "MuscleEmpire@2026"]);
  }
  return sheet;
}

var ADMIN_TOKEN = "ME9773GYM"; // secret token — must match adminAuth.ts

function doGet(e) {
  var p = e.parameter;
  var action = p.action;

  if (action === "getPassword" || action === "setPassword") {
    if (p.token !== ADMIN_TOKEN) {
      return ContentService
        .createTextOutput(JSON.stringify({ error: "Unauthorized" }))
        .setMimeType(ContentService.MimeType.JSON);
    }
  }

  if (action === "getPassword") {
    var cfg = getConfig();
    var val = cfg.getRange(1, 2).getValue();
    return ContentService
      .createTextOutput(JSON.stringify({ password: String(val) }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  if (action === "setPassword") {
    var cfg = getConfig();
    cfg.getRange(1, 2).setValue(p.password);
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  if (action === "enquiry") {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var eSheet = ss.getSheetByName("Enquiries");
    if (!eSheet) {
      eSheet = ss.insertSheet("Enquiries");
      eSheet.appendRow(["Date", "Name", "Phone", "Age", "Goal", "Notes"]);
      eSheet.getRange(1, 1, 1, 6).setFontWeight("bold").setBackground("#FFD000");
    }
    eSheet.appendRow([p.date, p.name, p.phone, p.age, p.goal, p.notes || ""]);
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  if (action === "submit") {
    var sheet = getSheet();
    // Auto-increment ID: count existing data rows + 1
    var nextId = sheet.getLastRow(); // header is row 1, so lastRow - 1 = data rows, +1 = next id
    sheet.appendRow([
      nextId,
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
    var sheet = getSheet();
    var lastRow = sheet.getLastRow();
    if (lastRow <= 1) {
      return ContentService
        .createTextOutput(JSON.stringify({ data: [] }))
        .setMimeType(ContentService.MimeType.JSON);
    }
    var rows = sheet.getRange(2, 1, lastRow - 1, HEADERS.length).getValues();
    // Get display values for time columns to avoid 1899 date conversion
    var displayRows = sheet.getRange(2, 1, lastRow - 1, HEADERS.length).getDisplayValues();
    var data = rows.map(function(row, i) {
      var d = displayRows[i];
      return {
        _rowIndex: i,
        id: String(row[0]), date: String(row[1]), name: String(row[2]),
        phone: String(row[3]), email: String(row[4]), age: String(row[5]),
        gender: String(row[6]), weight: String(row[7]), height: String(row[8]),
        bmi: String(row[9]), bmiCategory: String(row[10]),
        wakeTime: String(d[11]), bedTime: String(d[12]),
        sleepDuration: String(row[13]), workoutTime: String(d[14]),
        targetWeight: String(row[15]), weightChange: String(row[16]),
        foodPref: String(row[17]), collegeTime: String(row[18]),
        workTime: String(row[19]), medicalConditions: String(row[20]),
        allergies: String(row[21]), supplements: String(row[22]),
        goals: String(row[23]), remarks: String(row[24]),
        status: String(row[25]),
        earlyMorning: String(row[26]), breakfast: String(row[27]),
        midMorning: String(row[28]), lunch: String(row[29]),
        eveningSnack: String(row[30]), preWorkout: String(row[31]),
        postWorkout: String(row[32]), dinner: String(row[33]),
        beforeBed: String(row[34]), supplementsPlan: String(row[35]),
        notes: String(row[36])
      };
    });
    return ContentService
      .createTextOutput(JSON.stringify({ data: data }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  if (action === "update") {
    var sheet = getSheet();
    var rowNum = parseInt(p.rowIndex) + 2;
    var colMap = {
      status: 26, earlyMorning: 27, breakfast: 28, midMorning: 29,
      lunch: 30, eveningSnack: 31, preWorkout: 32, postWorkout: 33,
      dinner: 34, beforeBed: 35, supplementsPlan: 36, notes: 37
    };
    Object.keys(colMap).forEach(function(key) {
      if (p[key] !== undefined && p[key] !== null) {
        sheet.getRange(rowNum, colMap[key]).setValue(p[key]);
      }
    });
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  if (action === "deleteRow") {
    var sheet = getSheet();
    var rowNum = parseInt(p.rowIndex) + 2;
    if (rowNum >= 2 && rowNum <= sheet.getLastRow()) {
      sheet.deleteRow(rowNum);
    }
    return ContentService
      .createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService
    .createTextOutput(JSON.stringify({ error: "Unknown action" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  return doGet(e);
}
```

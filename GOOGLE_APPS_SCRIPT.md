# Google Apps Script Setup

## Steps

1. Go to https://script.google.com → New Project
2. Replace the default code with the script below
3. Save → Deploy → New Deployment → Web App
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click Deploy → Copy the Web App URL
5. Paste the URL into `src/lib/sheets.ts` → `APPS_SCRIPT_URL`

## Apps Script Code

```javascript
const SHEET_NAME = "Assessments";

function doPost(e) {
  const params = e.parameter;
  const action = params.action;
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME)
    || SpreadsheetApp.getActiveSpreadsheet().insertSheet(SHEET_NAME);

  if (action === "submit") {
    // Add header row if empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Date","Name","Phone","Email","Age","Gender","Weight","Height",
        "BMI","BMI Category","Wake Time","Bed Time","Sleep Duration",
        "Workout Time","Target Weight","Weight Change","Food Pref",
        "College Time","Work Time","Medical Conditions","Allergies",
        "Supplements","Goals","Remarks","Status"
      ]);
    }
    sheet.appendRow([
      params.date, params.name, params.phone, params.email, params.age,
      params.gender, params.weight, params.height, params.bmi, params.bmiCategory,
      params.wakeTime, params.bedTime, params.sleepDuration, params.workoutTime,
      params.targetWeight, params.weightChange, params.foodPref,
      params.collegeTime, params.workTime, params.medicalConditions,
      params.allergies, params.supplements, params.goals, params.remarks,
      "New"
    ]);
    return ContentService.createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  if (action === "updateStatus") {
    const row = parseInt(params.rowIndex) + 2; // +2 for header + 1-indexed
    sheet.getRange(row, 25).setValue(params.status);
    return ContentService.createTextOutput(JSON.stringify({ success: true }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService.createTextOutput(JSON.stringify({ error: "Unknown action" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doGet(e) {
  const action = e.parameter.action;
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  if (!sheet) return ContentService.createTextOutput(JSON.stringify({ data: [] }))
    .setMimeType(ContentService.MimeType.JSON);

  if (action === "list") {
    const rows = sheet.getDataRange().getValues();
    const headers = rows[0];
    const data = rows.slice(1).map((row, i) => {
      const obj = { _rowIndex: i };
      headers.forEach((h, j) => { obj[h.toLowerCase().replace(/\s+/g, "")] = row[j]; });
      return obj;
    });
    return ContentService.createTextOutput(JSON.stringify({ data }))
      .setMimeType(ContentService.MimeType.JSON);
  }

  return ContentService.createTextOutput(JSON.stringify({ error: "Unknown action" }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

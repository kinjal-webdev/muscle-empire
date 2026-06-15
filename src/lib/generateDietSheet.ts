import {
  Document, Packer, Paragraph, Table, TableRow, TableCell,
  TextRun, WidthType, BorderStyle, AlignmentType, HeadingLevel,
  ShadingType,
} from "docx";
import { saveAs } from "file-saver";
import type { AssessmentData } from "./sheets";

type DietPlan = {
  earlyMorning: string;
  breakfast: string;
  midMorning: string;
  lunch: string;
  eveningSnack: string;
  preWorkout: string;
  postWorkout: string;
  dinner: string;
  beforeBed: string;
  supplements: string;
  notes: string;
};

const EMPTY_PLAN: DietPlan = {
  earlyMorning: "", breakfast: "", midMorning: "", lunch: "",
  eveningSnack: "", preWorkout: "", postWorkout: "", dinner: "",
  beforeBed: "", supplements: "", notes: "",
};

function cell(text: string, bold = false, shade = false, colSpan?: number) {
  return new TableCell({
    columnSpan: colSpan,
    shading: shade ? { type: ShadingType.SOLID, color: "FFD000", fill: "FFD000" } : undefined,
    children: [new Paragraph({
      children: [new TextRun({ text, bold, color: shade ? "000000" : "FFFFFF", size: 20 })],
    })],
    margins: { top: 60, bottom: 60, left: 100, right: 100 },
  });
}

function infoRow(label: string, value: string) {
  return new TableRow({
    children: [
      cell(label, true, true),
      cell(value || "—", false, false),
    ],
  });
}

function mealRow(label: string, value: string) {
  return new TableRow({
    children: [
      cell(label, true, true),
      cell(value || "", false, false),
    ],
  });
}

export async function generateDietSheet(
  data: AssessmentData,
  plan: DietPlan = EMPTY_PLAN,
  filename?: string
) {
  const doc = new Document({
    sections: [{
      properties: {},
      children: [
        // Title
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: "MUSCLE EMPIRE GYMNASIUM",
              bold: true, size: 36, color: "3D2008",
            }),
          ],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Personalized Diet Sheet", bold: true, size: 28, color: "FFD000" })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new TextRun({ text: "Ghatkopar West, Mumbai | +91 97730 53632 | musclempire616@gmail.com", size: 18, color: "999999" })],
        }),
        new Paragraph({ text: "" }),

        // ── Customer Information ──
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun({ text: "CUSTOMER INFORMATION", bold: true, size: 24, color: "FFD000" })],
        }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            infoRow("Date", data.date),
            infoRow("Full Name", data.name),
            infoRow("Mobile Number", data.phone),
            infoRow("Email", data.email),
            infoRow("Age", data.age),
            infoRow("Gender", data.gender),
          ],
        }),
        new Paragraph({ text: "" }),

        // ── Body Measurements ──
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun({ text: "BODY MEASUREMENTS", bold: true, size: 24, color: "FFD000" })],
        }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            infoRow("Weight", `${data.weight} kg`),
            infoRow("Height", `${data.height} cm`),
            infoRow("BMI", data.bmi),
            infoRow("BMI Category", data.bmiCategory),
            infoRow("Target Weight", data.targetWeight ? `${data.targetWeight} kg` : "—"),
            infoRow("Weight to Gain / Lose", data.weightChange ? `${data.weightChange} kg` : "—"),
          ],
        }),
        new Paragraph({ text: "" }),

        // ── Lifestyle ──
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun({ text: "LIFESTYLE", bold: true, size: 24, color: "FFD000" })],
        }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            infoRow("Wake-up Time", data.wakeTime),
            infoRow("Bed Time", data.bedTime),
            infoRow("Sleep Duration", data.sleepDuration ? `${data.sleepDuration} hrs` : "—"),
            infoRow("Workout Time", data.workoutTime),
            infoRow("Food Preference", data.foodPref),
            infoRow("College Timing", data.collegeTime),
            infoRow("Work Timing", data.workTime),
          ],
        }),
        new Paragraph({ text: "" }),

        // ── Health & Goals ──
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun({ text: "HEALTH & GOALS", bold: true, size: 24, color: "FFD000" })],
        }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            infoRow("Goal", data.goals),
            infoRow("Medical Conditions", data.medicalConditions || "None"),
            infoRow("Allergies", data.allergies || "None"),
            infoRow("Supplements / Medicines", data.supplements || "None"),
            infoRow("Remarks", data.remarks || "None"),
          ],
        }),
        new Paragraph({ text: "" }),
        new Paragraph({ text: "" }),

        // ── Diet Plan ──
        new Paragraph({
          heading: HeadingLevel.HEADING_2,
          children: [new TextRun({ text: "PERSONALIZED DIET PLAN", bold: true, size: 24, color: "FFD000" })],
        }),
        new Table({
          width: { size: 100, type: WidthType.PERCENTAGE },
          rows: [
            mealRow("Early Morning", plan.earlyMorning),
            mealRow("Breakfast", plan.breakfast),
            mealRow("Mid-Morning", plan.midMorning),
            mealRow("Lunch", plan.lunch),
            mealRow("Evening Snack", plan.eveningSnack),
            mealRow("Pre-Workout", plan.preWorkout),
            mealRow("Post-Workout", plan.postWorkout),
            mealRow("Dinner", plan.dinner),
            mealRow("Before Bed", plan.beforeBed),
            mealRow("Supplements", plan.supplements),
            mealRow("Notes", plan.notes),
          ],
        }),
        new Paragraph({ text: "" }),

        // Footer
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({
              text: "This diet plan has been prepared exclusively for the above-mentioned individual. Please follow the plan as advised by our certified nutritionist.",
              italics: true, size: 16, color: "999999",
            }),
          ],
        }),
      ],
    }],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, filename || `Diet_Sheet_${data.name.replace(/\s+/g, "_")}.docx`);
}

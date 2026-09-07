import type { KoosSubscale } from "./koos";

export type Risk = "low" | "medium" | "high";

export type QuestionnaireRiskInput = {
  subscales: Record<KoosSubscale, number>;
  koosTotal: number;
  age: number;
  bmi: number;
};

/** 0 = no risk, 100 = highest risk. */
export function questionnaireRisk({ subscales, koosTotal, age, bmi }: QuestionnaireRiskInput) {
  const symptomBurden = 100 - koosTotal;
  const painWeight = (100 - (subscales.pain ?? 100)) * 0.35;
  const stiffness = (100 - (subscales.symptoms ?? 100)) * 0.15;
  const functionLoss = (100 - (subscales.adl ?? 100)) * 0.2;
  const base = symptomBurden * 0.3 + painWeight + stiffness + functionLoss;

  let modifier = 0;
  if (age >= 65) modifier += 12;
  else if (age >= 50) modifier += 8;
  else if (age >= 40) modifier += 4;

  if (bmi >= 30) modifier += 12;
  else if (bmi >= 25) modifier += 6;

  return clamp(Math.round(base + modifier));
}

export type GaitResults = {
  walkingSymmetry: number;
  jointStability: number;
  cadence: number;
  strideLengthCm: number;
  kneeFlexionRange: number;
  indicators: string[];
};

/** Deterministic simulated gait analysis for the prototype pipeline. */
export function simulateGait(seed: string, questionnaireRiskScore: number): GaitResults {
  const rnd = seeded(seed);
  const severity = questionnaireRiskScore / 100;
  const walkingSymmetry = clamp(Math.round(96 - severity * 30 - rnd() * 6), 40, 99);
  const jointStability = clamp(Math.round(94 - severity * 34 - rnd() * 7), 35, 99);
  const cadence = Math.round(112 - severity * 22 + rnd() * 6);
  const strideLengthCm = Math.round(138 - severity * 32 + rnd() * 8);
  const kneeFlexionRange = Math.round(132 - severity * 38 + rnd() * 6);

  const indicators: string[] = [];
  if (walkingSymmetry < 85) indicators.push("Asymmetric loading between left and right limb");
  if (jointStability < 80) indicators.push("Reduced medio-lateral knee stability in stance phase");
  if (kneeFlexionRange < 110) indicators.push("Restricted knee flexion range during swing phase");
  if (cadence < 100) indicators.push("Slower than expected cadence for age group");
  if (!indicators.length) indicators.push("No significant gait abnormality detected");

  return { walkingSymmetry, jointStability, cadence, strideLengthCm, kneeFlexionRange, indicators };
}

export function gaitRisk(g: GaitResults) {
  const symmetryRisk = 100 - g.walkingSymmetry;
  const stabilityRisk = 100 - g.jointStability;
  const romRisk = clamp(Math.round(((135 - g.kneeFlexionRange) / 60) * 100));
  return clamp(Math.round(symmetryRisk * 0.4 + stabilityRisk * 0.4 + romRisk * 0.2));
}

export function combineScores(qRisk: number, gRisk: number | null) {
  const combined = gRisk === null ? qRisk : Math.round(qRisk * 0.6 + gRisk * 0.4);
  const risk: Risk = combined >= 60 ? "high" : combined >= 35 ? "medium" : "low";
  const confidence = clamp(Math.round(gRisk === null ? 72 + combined / 8 : 82 + combined / 10), 60, 97);
  return { combined, risk, confidence };
}

export type XrayResult = {
  grade: number;
  gradeLabel: string;
  jointSpaceNarrowing: string;
  osteophytes: string;
  sclerosis: string;
  confidence: number;
  findings: string[];
};

const KL_LABELS = ["None (KL 0)", "Doubtful (KL 1)", "Minimal (KL 2)", "Moderate (KL 3)", "Severe (KL 4)"];

/** Deterministic simulated X-ray grading for the prototype pipeline. */
export function simulateXray(seed: string, combinedRisk: number): XrayResult {
  const rnd = seeded(seed);
  const raw = combinedRisk / 100 + (rnd() - 0.5) * 0.15;
  const grade = clamp(Math.round(raw * 4), 0, 4);
  const narrowMm = Math.round((5.2 - grade * 0.9 + rnd() * 0.3) * 10) / 10;
  const findings: string[] = [];
  if (grade >= 1) findings.push("Possible osteophytic lipping at the medial tibial plateau");
  if (grade >= 2) findings.push("Definite joint space narrowing in the medial compartment");
  if (grade >= 3) findings.push("Subchondral sclerosis with multiple osteophytes");
  if (grade >= 4) findings.push("Marked joint space loss and bone contour deformity");
  if (!findings.length) findings.push("No radiographic features of osteoarthritis identified");

  return {
    grade,
    gradeLabel: KL_LABELS[grade] ?? KL_LABELS[0]!,
    jointSpaceNarrowing: `${narrowMm} mm medial joint space (${grade >= 2 ? "reduced" : "within normal range"})`,
    osteophytes: grade >= 1 ? `${grade} region(s) with osteophyte formation` : "None detected",
    sclerosis: grade >= 3 ? "Present" : "Not present",
    confidence: clamp(Math.round(80 + rnd() * 15), 60, 97),
    findings,
  };
}

export function recommendationsFor(risk: Risk, grade: number | null) {
  if (risk === "low") {
    return [
      "Maintain a low-impact exercise routine (walking, cycling, swimming) 30 minutes a day.",
      "Strengthen quadriceps and hamstrings twice a week.",
      "Keep BMI within a healthy range to reduce knee loading.",
      "Re-screen in 6 months or sooner if pain increases.",
    ];
  }
  if (risk === "medium") {
    return [
      "Book a consultation at your nearest health centre within 4 weeks.",
      "Begin a supervised physiotherapy programme for knee stability.",
      "Use wearable sensor monitoring to track symptom progression.",
      "Avoid deep squats, kneeling and high-impact sport until reviewed.",
    ];
  }
  return [
    "Upload a knee X-ray for AI radiographic grading.",
    grade !== null && grade >= 3
      ? "Orthopaedic specialist referral recommended for moderate-to-severe radiographic OA."
      : "Healthcare worker review recommended within 1 week.",
    "Start a pain management and joint protection plan.",
    "Discuss weight management and assistive devices with your clinician.",
  ];
}

function clamp(n: number, min = 0, max = 100) {
  return Math.max(min, Math.min(max, n));
}

function seeded(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return () => {
    h += 0x6d2b79f5;
    let t = h;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type KoosOptionSet = "never" | "none" | "always" | "notatall" | "notatallEx";

export const OPTION_SETS: Record<KoosOptionSet, string[]> = {
  never: ["Never", "Rarely", "Sometimes", "Often", "Always"],
  none: ["None", "Mild", "Moderate", "Severe", "Extreme"],
  always: ["Always", "Often", "Sometimes", "Rarely", "Never"],
  notatall: ["Not at all", "Mildly", "Moderately", "Severely", "Totally"],
  notatallEx: ["Not at all", "Mildly", "Moderately", "Severely", "Extremely"],
};

export type KoosItem = { id: string; text: string; options: KoosOptionSet };
export type KoosSection = {
  key: KoosSubscale;
  title: string;
  intro: string;
  items: KoosItem[];
};

export type KoosSubscale = "symptoms" | "pain" | "adl" | "sport" | "qol";

export const KOOS_SECTIONS: KoosSection[] = [
  {
    key: "symptoms",
    title: "Symptoms & Stiffness",
    intro: "Think about your knee symptoms during the last week.",
    items: [
      { id: "S1", text: "Do you have swelling in your knee?", options: "never" },
      {
        id: "S2",
        text: "Do you feel grinding, hear clicking or any other type of noise when your knee moves?",
        options: "never",
      },
      { id: "S3", text: "Does your knee catch or hang up when moving?", options: "never" },
      { id: "S4", text: "Can you straighten your knee fully?", options: "always" },
      { id: "S5", text: "Can you bend your knee fully?", options: "always" },
      {
        id: "S6",
        text: "How severe is your knee joint stiffness after first waking in the morning?",
        options: "none",
      },
      {
        id: "S7",
        text: "How severe is your knee stiffness after sitting, lying or resting later in the day?",
        options: "none",
      },
    ],
  },
  {
    key: "pain",
    title: "Pain",
    intro: "What amount of knee pain have you experienced the last week during the following activities?",
    items: [
      { id: "P1", text: "How often do you experience knee pain?", options: "never" },
      { id: "P2", text: "Twisting / pivoting on your knee", options: "none" },
      { id: "P3", text: "Straightening knee fully", options: "none" },
      { id: "P4", text: "Bending knee fully", options: "none" },
      { id: "P5", text: "Walking on flat surface", options: "none" },
      { id: "P6", text: "Going up or down stairs", options: "none" },
      { id: "P7", text: "At night while in bed", options: "none" },
      { id: "P8", text: "Sitting or lying", options: "none" },
      { id: "P9", text: "Standing upright", options: "none" },
    ],
  },
  {
    key: "adl",
    title: "Function in Daily Living",
    intro: "What difficulty have you experienced the last week doing the following activities?",
    items: [
      { id: "A1", text: "Descending stairs", options: "none" },
      { id: "A2", text: "Ascending stairs", options: "none" },
      { id: "A3", text: "Rising from sitting", options: "none" },
      { id: "A4", text: "Standing", options: "none" },
      { id: "A5", text: "Bending to floor / picking up an object", options: "none" },
      { id: "A6", text: "Walking on flat surface", options: "none" },
      { id: "A7", text: "Getting in / out of car", options: "none" },
      { id: "A8", text: "Going shopping", options: "none" },
      { id: "A9", text: "Putting on socks / stockings", options: "none" },
      { id: "A10", text: "Rising from bed", options: "none" },
      { id: "A11", text: "Taking off socks / stockings", options: "none" },
      { id: "A12", text: "Lying in bed (turning over, maintaining knee position)", options: "none" },
      { id: "A13", text: "Getting in / out of bath", options: "none" },
      { id: "A14", text: "Sitting", options: "none" },
      { id: "A15", text: "Getting on / off toilet", options: "none" },
      { id: "A16", text: "Heavy domestic duties (moving heavy boxes, scrubbing floors, etc.)", options: "none" },
      { id: "A17", text: "Light domestic duties (cooking, dusting, etc.)", options: "none" },
    ],
  },
  {
    key: "sport",
    title: "Sport & Recreation",
    intro: "What difficulty have you experienced the last week with the following activities?",
    items: [
      { id: "SP1", text: "Squatting", options: "none" },
      { id: "SP2", text: "Running", options: "none" },
      { id: "SP3", text: "Jumping", options: "none" },
      { id: "SP4", text: "Twisting / pivoting on your injured knee", options: "none" },
      { id: "SP5", text: "Kneeling", options: "none" },
    ],
  },
  {
    key: "qol",
    title: "Quality of Life",
    intro: "How has your knee problem affected your life over the last week?",
    items: [
      { id: "Q1", text: "How often are you aware of your knee problem?", options: "never" },
      {
        id: "Q2",
        text: "Have you modified your lifestyle to avoid activities potentially damaging to your knee?",
        options: "notatall",
      },
      { id: "Q3", text: "How much are you troubled with lack of confidence in your knee?", options: "notatallEx" },
      { id: "Q4", text: "In general, how much difficulty do you have with your knee?", options: "none" },
    ],
  },
];

export const SUBSCALE_LABELS: Record<KoosSubscale, string> = {
  symptoms: "Symptoms",
  pain: "Pain",
  adl: "Daily Living (ADL)",
  sport: "Sport & Recreation",
  qol: "Quality of Life",
};

export const TOTAL_ITEMS = KOOS_SECTIONS.reduce((n, s) => n + s.items.length, 0);

export type KoosResponses = Record<string, number>;

/** KOOS subscale score: 100 = no problems, 0 = extreme problems. */
export function scoreSubscales(responses: KoosResponses) {
  const scores = {} as Record<KoosSubscale, number>;
  for (const section of KOOS_SECTIONS) {
    const values = section.items
      .map((i) => responses[i.id])
      .filter((v): v is number => typeof v === "number");
    const mean = values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
    scores[section.key] = Math.round((100 - (mean * 100) / 4) * 10) / 10;
  }
  return scores;
}

export function koosTotal(scores: Record<KoosSubscale, number>) {
  const keys = Object.keys(SUBSCALE_LABELS) as KoosSubscale[];
  return Math.round((keys.reduce((a, k) => a + (scores[k] ?? 0), 0) / keys.length) * 10) / 10;
}

export function calcBmi(heightCm: number, weightKg: number) {
  if (!heightCm || !weightKg) return 0;
  const m = heightCm / 100;
  return Math.round((weightKg / (m * m)) * 10) / 10;
}

export function bmiCategory(bmi: number) {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal";
  if (bmi < 30) return "Overweight";
  return "Obese";
}

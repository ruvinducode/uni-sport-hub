export const SPORTS = [
  "Cricket",
  "Football",
  "Basketball",
  "Volleyball",
  "Badminton",
  "Athletics",
  "Rugby",
  "Swimming",
  "Tennis",
];

export const SESSION_TYPE_OPTIONS = [
  { value: "individual", label: "Individual" },
  { value: "group", label: "Group" },
  { value: "academy", label: "Academy" },
  { value: "school_team", label: "School / Team" },
];

export const GENDER_FILTER_OPTIONS = [
  { value: "", label: "Any" },
  { value: "male", label: "Male coach" },
  { value: "female", label: "Female coach" },
];

export const EXPERIENCE_FILTER_OPTIONS = [
  { value: "", label: "Any experience" },
  { value: "0-2", label: "0–2 years" },
  { value: "3-5", label: "3–5 years" },
  { value: "6-10", label: "6–10 years" },
  { value: "10+", label: "10+ years" },
];

export const PRICE_FILTER_OPTIONS = [
  { value: "", label: "Any price (LKR)" },
  { value: "0-2500", label: "Up to 2,500" },
  { value: "2501-4000", label: "2,501 – 4,000" },
  { value: "4001-6000", label: "4,001 – 6,000" },
  { value: "6001+", label: "6,001+" },
];

export const AVAILABILITY_DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const SKILL_LEVELS = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

export const COACHING_MODE_OPTIONS = [
  { value: "in-person", label: "In-person" },
  { value: "online", label: "Online" },
  { value: "both", label: "Both" },
];

/** Filter coaches by typical audience — maps to coachLevel on merged coach rows. */
export const COACH_LEVEL_OPTIONS = [
  { value: "", label: "School & university" },
  { value: "school", label: "School-level focus" },
  { value: "university", label: "University / campus focus" },
  { value: "both", label: "Both school & campus" },
];

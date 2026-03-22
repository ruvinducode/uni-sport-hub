/** Mock catalog for ticket booking (frontend-only). Replace with API later. */

export const SPORTS = [
  { id: "football", label: "Football" },
  { id: "rugby", label: "Rugby" },
  { id: "cricket", label: "Cricket" },
];

const future = (days, hour = 15) => {
  const d = new Date();
  d.setDate(d.getDate() + days);
  d.setHours(hour, 0, 0, 0);
  return d.toISOString();
};

export const MOCK_MATCHES = [
  {
    id: "m1",
    sport: "football",
    league: "University League",
    homeTeam: "Falcons",
    awayTeam: "Strikers",
    venue: "University Arena",
    city: "North Campus",
    dateISO: future(14, 15),
    priceFrom: 12,
    description:
      "Derby night under the lights. Arrive early for campus activations and fan zones.",
    policies: [
      "Digital tickets only — add to your phone wallet after purchase.",
      "Refunds available up to 7 days before kickoff.",
      "No re-entry after exit during the match.",
    ],
    tiers: [
      { id: "standard", name: "Standard", price: 18 },
      { id: "premium", name: "Premium sideline", price: 42 },
    ],
    seatRows: ["A", "B", "C", "D", "E", "F", "G", "H"],
    seatCols: 12,
    unavailableSeats: ["A-3", "A-4", "B-7", "C-2", "D-11", "E-5", "F-1", "G-8"],
  },
  {
    id: "m2",
    sport: "rugby",
    league: "Campus Derby",
    homeTeam: "Titans",
    awayTeam: "Comets",
    venue: "Riverside Ground",
    city: "East Campus",
    dateISO: future(21, 14),
    priceFrom: 15,
    description: "High-intensity campus derby. Family sections available.",
    policies: [
      "Bag checks at entry — see venue guide for size limits.",
      "Refunds up to 5 days before match day.",
    ],
    tiers: [
      { id: "standard", name: "General", price: 22 },
      { id: "premium", name: "Grandstand", price: 48 },
    ],
    seatRows: ["A", "B", "C", "D", "E", "F", "G", "H"],
    seatCols: 12,
    unavailableSeats: ["B-2", "B-3", "C-9", "D-4", "E-12", "F-6"],
  },
  {
    id: "m3",
    sport: "cricket",
    league: "Selection Week",
    homeTeam: "Raptors",
    awayTeam: "Eagles",
    venue: "Oval Pavilion",
    city: "Sports Complex",
    dateISO: future(28, 11),
    priceFrom: 10,
    description: "Day match with covered seating. Sunset session expected.",
    policies: ["Rain policy: delayed start notifications via email.", "Refunds up to 72h before start."],
    tiers: [
      { id: "standard", name: "Hill", price: 14 },
      { id: "premium", name: "Covered", price: 32 },
    ],
    seatRows: ["A", "B", "C", "D", "E", "F", "G", "H"],
    seatCols: 12,
    unavailableSeats: ["A-1", "A-2", "D-6", "E-3", "G-4", "H-10"],
  },
  {
    id: "m4",
    sport: "football",
    league: "Cup Semi-Final",
    homeTeam: "Lynx",
    awayTeam: "Wolves",
    venue: "University Arena",
    city: "North Campus",
    dateISO: future(35, 18),
    priceFrom: 20,
    description: "Knockout football — extra time and penalties if needed.",
    policies: ["Strict no-transfer policy for cup fixtures.", "Refunds per cup regulations."],
    tiers: [
      { id: "standard", name: "Standard", price: 28 },
      { id: "premium", name: "Premium", price: 55 },
    ],
    seatRows: ["A", "B", "C", "D", "E", "F", "G", "H"],
    seatCols: 12,
    unavailableSeats: ["C-1", "C-2", "C-3", "F-8", "G-2"],
  },
  {
    id: "m5",
    sport: "rugby",
    league: "Sevens Showcase",
    homeTeam: "Barracudas",
    awayTeam: "Sharks",
    venue: "Training Park",
    city: "West Fields",
    dateISO: future(10, 16),
    priceFrom: 8,
    description: "Fast sevens format — shorter halves, festival atmosphere.",
    policies: ["Standing areas may be used during breaks.", "Refunds up to 48h before."],
    tiers: [
      { id: "standard", name: "Grass bank", price: 12 },
      { id: "premium", name: "Pitchside", price: 28 },
    ],
    seatRows: ["A", "B", "C", "D", "E", "F", "G", "H"],
    seatCols: 12,
    unavailableSeats: ["A-6", "B-11", "E-7"],
  },
  {
    id: "m6",
    sport: "cricket",
    league: "T20 Night",
    homeTeam: "Storm",
    awayTeam: "Blaze",
    venue: "Oval Pavilion",
    city: "Sports Complex",
    dateISO: future(7, 19),
    priceFrom: 12,
    description: "Floodlit T20 with music between innings.",
    policies: ["No glass containers.", "Refunds up to 7 days before."],
    tiers: [
      { id: "standard", name: "General", price: 18 },
      { id: "premium", name: "VIP deck", price: 45 },
    ],
    seatRows: ["A", "B", "C", "D", "E", "F", "G", "H"],
    seatCols: 12,
    unavailableSeats: ["D-1", "D-2", "F-4", "G-11"],
  },
];

export function getMatchById(id) {
  return MOCK_MATCHES.find((m) => m.id === id) || null;
}

export function formatMatchDate(iso) {
  try {
    const d = new Date(iso);
    return new Intl.DateTimeFormat(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    }).format(d);
  } catch {
    return iso;
  }
}

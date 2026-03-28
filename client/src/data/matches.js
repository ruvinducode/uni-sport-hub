/** Mock catalog for ticket booking (frontend-only) — Sri Lankan school & university fixtures. */

export const SPORTS = [
  { id: "football", label: "Football" },
  { id: "rugby", label: "Rugby" },
  { id: "cricket", label: "Cricket" },
  { id: "basketball", label: "Basketball" },
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
    sport: "basketball",
    league: "Sri Lanka University Games — Basketball",
    homeTeam: "University of Colombo",
    awayTeam: "University of Sri Jayewardenepura",
    venue: "National Institute of Sports",
    city: "Colombo",
    dateISO: future(14, 15),
    priceFrom: 12,
    description:
      "Campus championship week — student sections and faculty blocks available (demo ticketing).",
    policies: [
      "Digital tickets only — add to your phone wallet after purchase.",
      "Refunds available up to 7 days before tip-off.",
      "No re-entry after exit during the match.",
    ],
    tiers: [
      { id: "standard", name: "Standard", price: 18 },
      { id: "premium", name: "Courtside", price: 42 },
    ],
    seatRows: ["A", "B", "C", "D", "E", "F", "G", "H"],
    seatCols: 12,
    unavailableSeats: ["A-3", "A-4", "B-7", "C-2", "D-11", "E-5", "F-1", "G-8"],
  },
  {
    id: "m2",
    sport: "rugby",
    league: "Inter-University Rugby Championship",
    homeTeam: "University of Kelaniya",
    awayTeam: "University of Moratuwa",
    venue: "University of Kelaniya Ground",
    city: "Kelaniya",
    dateISO: future(21, 14),
    priceFrom: 15,
    description: "Western province campus rugby — semifinal atmosphere (demo).",
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
    league: "Lovers' Quarrel — One Day Encounter",
    homeTeam: "Richmond College",
    awayTeam: "Mahinda College",
    venue: "Galle International Stadium",
    city: "Galle",
    dateISO: future(28, 11),
    priceFrom: 10,
    description: "Southern big match week — coastal breeze and school brass bands (demo).",
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
    sport: "cricket",
    league: "Battle of the Blues",
    homeTeam: "Royal College",
    awayTeam: "S. Thomas' College",
    venue: "Sinhalese Sports Club",
    city: "Colombo",
    dateISO: future(35, 18),
    priceFrom: 20,
    description: "Historic Colombo school cricket — plan travel early for SSC week.",
    policies: ["Strict no-transfer policy for big match week.", "Refunds per tournament regulations."],
    tiers: [
      { id: "standard", name: "Standard", price: 28 },
      { id: "premium", name: "Pavilion", price: 55 },
    ],
    seatRows: ["A", "B", "C", "D", "E", "F", "G", "H"],
    seatCols: 12,
    unavailableSeats: ["C-1", "C-2", "C-3", "F-8", "G-2"],
  },
  {
    id: "m5",
    sport: "rugby",
    league: "Dialog Schools Rugby Knockouts",
    homeTeam: "St. Peter's College",
    awayTeam: "Wesley College",
    venue: "Sugathadasa Stadium",
    city: "Colombo",
    dateISO: future(10, 16),
    priceFrom: 8,
    description: "Schools rugby knockout — student cheer zones and family blocks (demo).",
    policies: ["Standing areas may be used during breaks.", "Refunds up to 48h before."],
    tiers: [
      { id: "standard", name: "Terrace", price: 12 },
      { id: "premium", name: "Sideline", price: 28 },
    ],
    seatRows: ["A", "B", "C", "D", "E", "F", "G", "H"],
    seatCols: 12,
    unavailableSeats: ["A-6", "B-11", "E-7"],
  },
  {
    id: "m6",
    sport: "cricket",
    league: "Kandy Schools Big Match",
    homeTeam: "Trinity College",
    awayTeam: "Dharmaraja College",
    venue: "Pallekele International Cricket Stadium",
    city: "Kandy",
    dateISO: future(7, 19),
    priceFrom: 12,
    description: "Hill-country school cricket — cooler evenings and local rivalry (demo).",
    policies: ["No glass containers.", "Refunds up to 7 days before."],
    tiers: [
      { id: "standard", name: "General", price: 18 },
      { id: "premium", name: "Covered", price: 45 },
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

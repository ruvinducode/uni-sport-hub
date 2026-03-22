/**
 * Mock scoreboard catalog — replace with API responses later.
 * @typedef {'football'|'cricket'|'basketball'} SportType
 * @typedef {'live'|'upcoming'|'completed'|'delayed'} MatchStatus
 */

export function uid(prefix = "id") {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

/** @returns {object[]} Full match objects for initial / reset seed */
export function buildSeedMatches() {
  const now = new Date();
  const iso = (d) => d.toISOString();

  return [
    {
      id: "sb_m_live_football",
      sportType: "football",
      leagueName: "University League — Semi Final",
      venue: "North Campus Arena",
      date: iso(new Date(now.getFullYear(), now.getMonth(), now.getDate())),
      time: "19:00",
      status: "live",
      teamA: {
        name: "Falcons FC",
        shortName: "FAL",
        logo: null,
        score: 2,
      },
      teamB: {
        name: "Strikers United",
        shortName: "STK",
        logo: null,
        score: 1,
      },
      summaryText: "Falcons pressing high after the break with a one-goal cushion.",
      matchStateText: "72'",
      referee: "A. Morgan",
      matchNote: "Second half in progress — Falcons lead by 1 goal.",
      roundStage: "Semi Final",
      weather: "Clear, 16°C",
      attendance: "4,120",
      createdAt: iso(new Date(now.getTime() - 86400000)),
      updatedAt: iso(now),
      favorite: false,
      stats: {
        items: [
          { id: "s1", label: "Possession %", home: 58, away: 42, max: 100 },
          { id: "s2", label: "Shots on target", home: 6, away: 3, max: 15 },
          { id: "s3", label: "Corners", home: 5, away: 2, max: 12 },
          { id: "s4", label: "Fouls", home: 9, away: 11, max: 20 },
        ],
      },
      timeline: [
        {
          id: "e1",
          minuteOrTime: "12'",
          type: "goal",
          title: "Goal — Falcons",
          description: "Header from a corner — J. Cole",
          teamSide: "home",
          player: "J. Cole",
        },
        {
          id: "e2",
          minuteOrTime: "34'",
          type: "card",
          title: "Yellow card",
          description: "Late challenge — Strikers",
          teamSide: "away",
          player: "M. Singh",
        },
        {
          id: "e3",
          minuteOrTime: "41'",
          type: "goal",
          title: "Goal — Strikers",
          description: "Counter attack finish — R. Khan",
          teamSide: "away",
          player: "R. Khan",
        },
        {
          id: "e4",
          minuteOrTime: "58'",
          type: "goal",
          title: "Goal — Falcons",
          description: "Tap-in after rebound — L. Park",
          teamSide: "home",
          player: "L. Park",
        },
      ],
      scoreBreakdown: {
        type: "football",
        halves: [
          { name: "1st half", home: 1, away: 1 },
          { name: "2nd half", home: 1, away: 0 },
        ],
        goals: [
          { minute: "12'", player: "J. Cole", team: "home" },
          { minute: "41'", player: "R. Khan", team: "away" },
          { minute: "58'", player: "L. Park", team: "home" },
        ],
        cards: [{ minute: "34'", player: "M. Singh", team: "away", kind: "yellow" }],
        subs: [
          { minute: "63'", team: "home", off: "S. Ali", on: "T. Reed" },
          { minute: "70'", team: "away", off: "H. Zane", on: "P. Ortiz" },
        ],
      },
      lineups: {
        home: ["GK N. Blake", "DF J. Cole", "DF L. Park", "MF S. Ali", "FW K. Mensah"],
        away: ["GK R. Dias", "DF M. Singh", "MF R. Khan", "FW H. Zane"],
      },
      summary: {
        highlights: [
          { id: "h1", text: "Falcons dominate possession after halftime." },
          { id: "h2", text: "Strikers threaten on counters — two big saves." },
        ],
        recentUpdates: [
          { id: "u1", text: "72' — Falcons corner cleared off the line." },
          { id: "u2", text: "68' — Strikers substitution: Ortiz on." },
        ],
        miniStats: [
          { label: "xG (est.)", value: "1.8 — 0.9" },
          { label: "Big chances", value: "3 — 1" },
        ],
        progression: [
          { label: "Match tempo", value: "High press / transitional" },
          { label: "Key battle", value: "Wide overloads vs compact block" },
        ],
      },
    },
    {
      id: "sb_m_upcoming_cricket",
      sportType: "cricket",
      leagueName: "Campus T20 Cup",
      venue: "Oval Pavilion",
      date: iso(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 3)),
      time: "18:30",
      status: "upcoming",
      teamA: { name: "Raptors XI", shortName: "RAP", logo: null, score: "—" },
      teamB: { name: "Eagles CC", shortName: "EGL", logo: null, score: "—" },
      summaryText: "Night T20 under lights — winner advances to the final.",
      matchStateText: "Starts at 6:30 PM",
      referee: "Umpires: K. Patel & S. Brooks",
      matchNote: "Toss at 6:00 PM — pitch report: good pace and bounce.",
      roundStage: "Qualifier 2",
      weather: "Partly cloudy",
      attendance: "—",
      createdAt: iso(new Date(now.getTime() - 172800000)),
      updatedAt: iso(now),
      favorite: false,
      stats: {
        items: [
          { id: "c1", label: "Team form (last 5)", home: 4, away: 3, max: 5 },
          { id: "c2", label: "Avg runs (season)", home: 162, away: 148, max: 220 },
        ],
      },
      timeline: [
        {
          id: "ce1",
          minuteOrTime: "Pre",
          type: "info",
          title: "Match scheduled",
          description: "Squads to be named 24h before start.",
          teamSide: "neutral",
          player: null,
        },
      ],
      scoreBreakdown: {
        type: "cricket",
        innings: [],
        projected: {
          runRate: "—",
          parScore: "—",
        },
      },
      lineups: { home: ["To be announced"], away: ["To be announced"] },
      summary: {
        highlights: [
          { id: "ch1", text: "Raptors top-order in strong form this month." },
          { id: "ch2", text: "Eagles bowling attack leads the tournament wickets chart." },
        ],
        recentUpdates: [{ id: "cu1", text: "Venue gates open at 5:30 PM." }],
        miniStats: [
          { label: "H2H (T20)", value: "RAP 4 — 3 EGL" },
          { label: "Powerplay RR", value: "8.2 — 7.6" },
        ],
        progression: [{ label: "Conditions", value: "Evening dew expected late" }],
      },
    },
    {
      id: "sb_m_done_basketball",
      sportType: "basketball",
      leagueName: "Uni Hoops — Regular Season",
      venue: "Sports Hall A",
      date: iso(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1)),
      time: "20:00",
      status: "completed",
      teamA: { name: "Titans BC", shortName: "TIT", logo: null, score: 88 },
      teamB: { name: "Comets", shortName: "COM", logo: null, score: 81 },
      summaryText: "Titans close strong in Q4 behind perimeter shooting.",
      matchStateText: "Full Time",
      referee: "Crew: L. Ng / J. Ford",
      matchNote: "Match ended — Titans win by 7.",
      roundStage: "Week 9",
      weather: "Indoor",
      attendance: "1,050",
      createdAt: iso(new Date(now.getTime() - 259200000)),
      updatedAt: iso(new Date(now.getTime() - 3600000)),
      favorite: false,
      stats: {
        items: [
          { id: "b1", label: "Field goal %", home: 48, away: 44, max: 100 },
          { id: "b2", label: "3PT made", home: 12, away: 9, max: 20 },
          { id: "b3", label: "Rebounds", home: 41, away: 38, max: 55 },
          { id: "b4", label: "Turnovers", home: 11, away: 14, max: 22 },
        ],
      },
      timeline: [
        {
          id: "be1",
          minuteOrTime: "Q4 02:10",
          type: "score",
          title: "Three pointer — Titans",
          description: "Corner catch-and-shoot — D. Ellis",
          teamSide: "home",
          player: "D. Ellis",
        },
        {
          id: "be2",
          minuteOrTime: "Q4 00:40",
          type: "timeout",
          title: "Timeout — Comets",
          description: "Full timeout",
          teamSide: "away",
          player: null,
        },
        {
          id: "be3",
          minuteOrTime: "FT",
          type: "end",
          title: "Game over",
          description: "Titans secure the win at the line.",
          teamSide: "neutral",
          player: null,
        },
      ],
      scoreBreakdown: {
        type: "basketball",
        quarters: [
          { name: "Q1", home: 22, away: 18 },
          { name: "Q2", home: 20, away: 23 },
          { name: "Q3", home: 21, away: 22 },
          { name: "Q4", home: 25, away: 18 },
        ],
        topPerformer: { name: "D. Ellis", team: "home", points: 26 },
      },
      lineups: {
        home: ["G D. Ellis", "G M. Rao", "F K. Stone", "F A. Ndiaye", "C J. Pike"],
        away: ["G S. Cruz", "G T. West", "F N. Iyer", "F B. Cole", "C O. Mensah"],
      },
      summary: {
        highlights: [
          { id: "bh1", text: "Titans shoot 41% from three in the second half." },
          { id: "bh2", text: "Comets rally in Q3 but cold start in Q4." },
        ],
        recentUpdates: [{ id: "bu1", text: "Final box score verified." }],
        miniStats: [
          { label: "Bench points", value: "28 — 19" },
          { label: "Paint points", value: "36 — 40" },
        ],
        progression: [{ label: "MVP", value: "D. Ellis (26 PTS, 5 AST)" }],
      },
    },
  ];
}

/**
 * Sri Lankan school & university scoreboard seed — replaces API until backend exists.
 * @typedef {'football'|'cricket'|'basketball'|'rugby'} SportType
 * @typedef {'live'|'upcoming'|'completed'|'delayed'} MatchStatus
 */

import { SCHOOLS_BY_ID } from "./schools";
import { UNIVERSITIES_BY_ID } from "./universities";

export function uid(prefix = "id") {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

/** @returns {object[]} Full match objects for initial / reset seed */
export function buildSeedMatches() {
  const now = new Date();
  const iso = (d) => d.toISOString();

  const sp = SCHOOLS_BY_ID.sch_st_peters;
  const wes = SCHOOLS_BY_ID.sch_wesley;
  const roy = SCHOOLS_BY_ID.sch_royal;
  const stc = SCHOOLS_BY_ID.sch_stc;
  const ric = SCHOOLS_BY_ID.sch_richmond;
  const mah = SCHOOLS_BY_ID.sch_mahinda;
  const isp = SCHOOLS_BY_ID.sch_isipathana;
  const tri = SCHOOLS_BY_ID.sch_trinity;
  const uoc = UNIVERSITIES_BY_ID.uni_colombo;
  const usjp = UNIVERSITIES_BY_ID.uni_japura;
  const uok = UNIVERSITIES_BY_ID.uni_kelaniya;
  const uom = UNIVERSITIES_BY_ID.uni_moratuwa;

  return [
    {
      id: "sb_m_live_football",
      sportType: "football",
      sportLabel: "Rugby",
      category: "school",
      district: "Colombo",
      city: "Colombo",
      rivalryTag: "Dialog Schools Rugby",
      featured: true,
      leagueName: "Dialog Schools Rugby Knockouts — Quarter Final",
      venue: "Sugathadasa Stadium · Colombo",
      date: iso(new Date(now.getFullYear(), now.getMonth(), now.getDate())),
      time: "19:00",
      status: "live",
      teamA: { name: sp.name, shortName: sp.shortName, logo: null, score: 22 },
      teamB: { name: wes.name, shortName: wes.shortName, logo: null, score: 17 },
      summaryText: "St. Peter’s building phases with strong set-piece platform — Wesley defending narrow.",
      matchStateText: "58' · 2nd half",
      referee: "Ref: R. Samarasinghe · ARs: M. Fernando, K. Rasheed",
      matchNote: "Schools rugby — knockout leg (demo score).",
      roundStage: "Quarter Final",
      weather: "Humid, 28°C",
      attendance: "6,800",
      createdAt: iso(new Date(now.getTime() - 86400000)),
      updatedAt: iso(now),
      favorite: false,
      stats: {
        items: [
          { id: "s1", label: "Territory %", home: 56, away: 44, max: 100 },
          { id: "s2", label: "Carries +", home: 112, away: 96, max: 150 },
          { id: "s3", label: "Tackles made", home: 118, away: 124, max: 160 },
          { id: "s4", label: "Penalties", home: 6, away: 8, max: 16 },
        ],
      },
      timeline: [
        {
          id: "e1",
          minuteOrTime: "7'",
          type: "try",
          title: "Try — St. Peter’s",
          description: "Maul pushover — Pasindu Senanayake",
          teamSide: "home",
          player: "Pasindu Senanayake",
        },
        {
          id: "e2",
          minuteOrTime: "19'",
          type: "card",
          title: "Yellow card",
          description: "High tackle — Wesley",
          teamSide: "away",
          player: "Shenal Wijesinghe",
        },
        {
          id: "e3",
          minuteOrTime: "28'",
          type: "try",
          title: "Try — Wesley",
          description: "Wing finish — Tharusha Fernando",
          teamSide: "away",
          player: "Tharusha Fernando",
        },
        {
          id: "e4",
          minuteOrTime: "44'",
          type: "try",
          title: "Try — St. Peter’s",
          description: "Scrum base — Dinuka Perera",
          teamSide: "home",
          player: "Dinuka Perera",
        },
      ],
      scoreBreakdown: {
        type: "football",
        halves: [
          { name: "1st half", home: 12, away: 10 },
          { name: "2nd half", home: 10, away: 7 },
        ],
        goals: [
          { minute: "7'", player: "Pasindu Senanayake", team: "home" },
          { minute: "28'", player: "Tharusha Fernando", team: "away" },
          { minute: "44'", player: "Dinuka Perera", team: "home" },
        ],
        cards: [{ minute: "19'", player: "Shenal Wijesinghe", team: "away", kind: "yellow" }],
        subs: [
          { minute: "51'", team: "home", off: "Janith Bandara", on: "Malith Karunaratne" },
          { minute: "60'", team: "away", off: "Raveen Abeysekara", on: "Keshan Rodrigo" },
        ],
      },
      lineups: {
        home: ["HK Pasindu Senanayake", "PR Dinuka Perera", "LK Kavishka Silva", "FL Nethmina Rajapaksha", "N8 Sithum Jayawardena"],
        away: ["HK Tharusha Fernando", "PR Shenal Wijesinghe", "CE Raveen Abeysekara", "WG Yohan de Silva", "FB Keshan Rodrigo"],
      },
      summary: {
        highlights: [
          { id: "h1", text: "St. Peter’s set-piece dominance in humid Colombo conditions." },
          { id: "h2", text: "Wesley striking from wide channels — game still in balance." },
        ],
        recentUpdates: [
          { id: "u1", text: "58' — Goal-line stand by Wesley near their posts." },
          { id: "u2", text: "54' — St. Peter’s penalty to corner." },
        ],
        miniStats: [
          { label: "Line breaks", value: "7 — 5" },
          { label: "Turnovers won", value: "9 — 8" },
        ],
        progression: [
          { label: "Match tempo", value: "Set-piece heavy / territory" },
          { label: "Key battle", value: "Forward pack vs defensive line speed" },
        ],
      },
    },
    {
      id: "sb_m_live_school_cricket",
      sportType: "cricket",
      sportLabel: "Cricket",
      category: "school",
      district: "Colombo",
      city: "Colombo",
      rivalryTag: "Battle of the Blues",
      featured: true,
      leagueName: "Battle of the Blues — Big Match Season",
      venue: "SSC · Colombo",
      date: iso(new Date(now.getFullYear(), now.getMonth(), now.getDate())),
      time: "09:30",
      status: "live",
      teamA: { name: roy.name, shortName: roy.shortName, logo: null, score: "142/3" },
      teamB: { name: stc.name, shortName: stc.shortName, logo: null, score: "128/5" },
      summaryText: "Royal building a platform after tea — Thomians chasing with wickets in hand.",
      matchStateText: "Day 1 · 64 ov",
      referee: "Umpires: L. Perera & S. Balakrishnan",
      matchNote: "Historic school big match — SSC (demo).",
      roundStage: "2-Day — Day 1",
      weather: "Partly cloudy, 30°C",
      attendance: "9,200",
      createdAt: iso(new Date(now.getTime() - 43200000)),
      updatedAt: iso(now),
      favorite: false,
      stats: {
        items: [
          { id: "c1", label: "Run rate (session)", home: 4.4, away: 3.9, max: 8 },
          { id: "c2", label: "Boundaries", home: 22, away: 18, max: 40 },
        ],
      },
      timeline: [
        {
          id: "ce1",
          minuteOrTime: "Session 2",
          type: "wicket",
          title: "Wicket — Thomians",
          description: "Caught behind — Ishan Maduranga",
          teamSide: "away",
          player: "Ishan Maduranga",
        },
      ],
      scoreBreakdown: {
        type: "cricket",
        innings: [
          {
            team: `${roy.shortName}`,
            runs: 142,
            wickets: 3,
            overs: "64.0",
            batting: [
              { name: "Janith Bandara", r: 56, b: 94 },
              { name: "Malith Karunaratne", r: 41, b: 72 },
            ],
            bowling: [
              { name: "Chamika Dissanayake", fig: "2/38", econ: 3.5 },
            ],
          },
        ],
        projected: { runRate: "4.42", parScore: "—" },
      },
      lineups: {
        home: ["Opener Janith Bandara", "No.3 Malith Karunaratne", "AR Hasitha Kumara"],
        away: ["Opener Vishwa Ranasinghe", "Spinner Chamika Dissanayake", "WK Prabath Peiris"],
      },
      summary: {
        highlights: [
          { id: "ch1", text: "Royal top-order cashing in after a cautious start." },
          { id: "ch2", text: "Thomians probing with spin before the second new ball." },
        ],
        recentUpdates: [{ id: "cu1", text: "Tea taken — Royal 142/3." }],
        miniStats: [
          { label: "Partnerships", value: "2nd wkt 78" },
          { label: "Session", value: "Afternoon" },
        ],
        progression: [{ label: "Venue", value: "SSC — Colombo school cricket showcase" }],
      },
    },
    {
      id: "sb_m_upcoming_cricket",
      sportType: "cricket",
      sportLabel: "Cricket",
      category: "school",
      district: "Galle",
      city: "Galle",
      rivalryTag: "Lovers' Quarrel",
      featured: true,
      leagueName: "Lovers' Quarrel — One Day Encounter",
      venue: "Galle International Stadium",
      date: iso(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 4)),
      time: "09:45",
      status: "upcoming",
      teamA: { name: ric.name, shortName: ric.shortName, logo: null, score: "—" },
      teamB: { name: mah.name, shortName: mah.shortName, logo: null, score: "—" },
      summaryText: "Southern big match week — Richmond vs Mahinda under Galle fort breeze.",
      matchStateText: "Toss 9:15 AM",
      referee: "Match referee: N. Wijesinghe",
      matchNote: "50-over encounter — gates open 8:30 AM (demo).",
      roundStage: "One Day — Big Match Season",
      weather: "Coastal breeze expected",
      attendance: "—",
      createdAt: iso(new Date(now.getTime() - 172800000)),
      updatedAt: iso(now),
      favorite: false,
      stats: {
        items: [
          { id: "c1", label: "H2H (50-over)", home: 11, away: 10, max: 25 },
          { id: "c2", label: "Avg runs (season)", home: 228, away: 221, max: 320 },
        ],
      },
      timeline: [
        {
          id: "ce1",
          minuteOrTime: "Pre",
          type: "info",
          title: "Match week",
          description: "Southern schools spotlight — Mahinda & Richmond build-up.",
          teamSide: "neutral",
          player: null,
        },
      ],
      scoreBreakdown: { type: "cricket", innings: [], projected: { runRate: "—", parScore: "—" } },
      lineups: { home: ["To be named"], away: ["To be named"] },
      summary: {
        highlights: [
          { id: "ch1", text: "Mahinda College training block emphasising powerplay intent." },
          { id: "ch2", text: "Richmond spin stocks strong on Galle surfaces." },
        ],
        recentUpdates: [{ id: "cu1", text: "Fan zones open near Fort area — arrive early." }],
        miniStats: [
          { label: "Spotlight", value: "Southern schools — Galle" },
          { label: "Culture", value: "Lovers' Quarrel week" },
        ],
        progression: [{ label: "Venue", value: "Galle — coastal school cricket" }],
      },
    },
    {
      id: "sb_m_done_basketball",
      sportType: "basketball",
      sportLabel: "Basketball",
      category: "university",
      district: "Colombo",
      city: "Colombo",
      rivalryTag: "Sri Lanka University Games",
      featured: true,
      leagueName: "Sri Lanka University Games — Basketball Final",
      venue: "National Institute of Sports · Colombo",
      date: iso(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 1)),
      time: "18:30",
      status: "completed",
      teamA: { name: uoc.name, shortName: uoc.shortName, logo: null, score: 84 },
      teamB: { name: usjp.name, shortName: usjp.shortName, logo: null, score: 79 },
      summaryText: "Colombo closes late from the free-throw line — SLUG final (demo).",
      matchStateText: "Full Time",
      referee: "Crew: T. Dissanayake / R. Silva",
      matchNote: "University championship week — campus basketball showcase.",
      roundStage: "Final",
      weather: "Indoor",
      attendance: "1,480",
      createdAt: iso(new Date(now.getTime() - 259200000)),
      updatedAt: iso(new Date(now.getTime() - 3600000)),
      favorite: false,
      stats: {
        items: [
          { id: "b1", label: "Field goal %", home: 46, away: 43, max: 100 },
          { id: "b2", label: "3PT made", home: 11, away: 9, max: 20 },
          { id: "b3", label: "Rebounds", home: 39, away: 41, max: 55 },
          { id: "b4", label: "Turnovers", home: 12, away: 13, max: 22 },
        ],
      },
      timeline: [
        {
          id: "be1",
          minuteOrTime: "Q4 01:20",
          type: "score",
          title: "And-one — Colombo",
          description: "Udara Nanayakkara finishes through contact",
          teamSide: "home",
          player: "Udara Nanayakkara",
        },
        {
          id: "be2",
          minuteOrTime: "FT",
          type: "end",
          title: "Final buzzer",
          description: "Colombo wins the SLUG final by 5.",
          teamSide: "neutral",
          player: null,
        },
      ],
      scoreBreakdown: {
        type: "basketball",
        quarters: [
          { name: "Q1", home: 20, away: 19 },
          { name: "Q2", home: 18, away: 22 },
          { name: "Q3", home: 23, away: 18 },
          { name: "Q4", home: 23, away: 20 },
        ],
        topPerformer: { name: "Udara Nanayakkara", team: "home", points: 24 },
      },
      lineups: {
        home: ["G Udara Nanayakkara", "G Akila Gunawardana", "F Hiranya Liyanage", "F Oshada Fernando", "C Praveen Thilakarathne"],
        away: ["G Ravindu Madushanka", "G Nimantha Rajakaruna", "F Lahiru Attanayake", "F Sajith Mendis", "C Thilina Gamage"],
      },
      summary: {
        highlights: [
          { id: "bh1", text: "Jayewardenepura wins the paint battle but Colombo hits clutch threes." },
          { id: "bh2", text: "Free throws seal the title in the final minute." },
        ],
        recentUpdates: [{ id: "bu1", text: "Final score verified — SLUG medal ceremony follows." }],
        miniStats: [
          { label: "Bench points", value: "26 — 21" },
          { label: "Fast break", value: "14 — 11" },
        ],
        progression: [{ label: "MVP", value: "Udara Nanayakkara (24 PTS)" }],
      },
    },
    {
      id: "sb_m_uni_rugby_upcoming",
      sportType: "football",
      sportLabel: "Rugby",
      category: "university",
      district: "Colombo",
      city: "Kelaniya",
      rivalryTag: "Inter-University Rugby",
      featured: true,
      leagueName: "Inter-University Rugby Championship — Semi Final",
      venue: "University of Kelaniya Ground",
      date: iso(new Date(now.getFullYear(), now.getMonth(), now.getDate() + 6)),
      time: "16:00",
      status: "upcoming",
      teamA: { name: uok.name, shortName: uok.shortName, logo: null, score: "—" },
      teamB: { name: uom.name, shortName: uom.shortName, logo: null, score: "—" },
      summaryText: "Campus rugby week — western province derby with semifinal stakes.",
      matchStateText: "Kickoff 4:00 PM",
      referee: "Match officials to be confirmed",
      matchNote: "University rugby — knockout (demo fixture).",
      roundStage: "Semi Final",
      weather: "Evening showers possible",
      attendance: "—",
      createdAt: iso(new Date(now.getTime() - 86400000)),
      updatedAt: iso(now),
      favorite: false,
      stats: {
        items: [
          { id: "u1", label: "Season form", home: 4, away: 3, max: 5 },
          { id: "u2", label: "Avg points scored", home: 24, away: 22, max: 40 },
        ],
      },
      timeline: [
        {
          id: "ue1",
          minuteOrTime: "Pre",
          type: "info",
          title: "Campus build-up",
          description: "Student unions hosting pre-match fan walk.",
          teamSide: "neutral",
          player: null,
        },
      ],
      scoreBreakdown: { type: "football", halves: [], goals: [], cards: [], subs: [] },
      lineups: { home: ["Squad TBA"], away: ["Squad TBA"] },
      summary: {
        highlights: [
          { id: "uh1", text: "Kelaniya’s forward pack leaned on heavily this season." },
          { id: "uh2", text: "Moratuwa’s backs threaten width on dry evenings." },
        ],
        recentUpdates: [{ id: "uu1", text: "Team sheets drop 48h before kickoff." }],
        miniStats: [
          { label: "Conference", value: "Western campus corridor" },
          { label: "Travel", value: "Short hop along Kelani valley" },
        ],
        progression: [{ label: "Stakes", value: "University Games pathway" }],
      },
    },
    {
      id: "sb_m_school_rugby_done",
      sportType: "football",
      sportLabel: "Rugby",
      category: "school",
      district: "Kandy",
      city: "Kandy",
      rivalryTag: "President's Trophy",
      featured: false,
      leagueName: "President's Trophy — Schools Rugby Semi Final",
      venue: "Nittawela Rugby Ground · Kandy",
      date: iso(new Date(now.getFullYear(), now.getMonth(), now.getDate() - 3)),
      time: "16:30",
      status: "completed",
      teamA: { name: isp.name, shortName: isp.shortName, logo: null, score: 26 },
      teamB: { name: tri.name, shortName: tri.shortName, logo: null, score: 21 },
      summaryText: "Isipathana edge Trinity in a Kandy classic — schools rugby semi (demo).",
      matchStateText: "Full Time",
      referee: "Ref: S. Ratwatte",
      matchNote: "President’s Trophy — full time.",
      roundStage: "Semi Final",
      weather: "Cooler hill-country evening",
      attendance: "7,400",
      createdAt: iso(new Date(now.getTime() - 432000000)),
      updatedAt: iso(new Date(now.getTime() - 86400000)),
      favorite: false,
      stats: {
        items: [
          { id: "r1", label: "Gainline wins %", home: 54, away: 46, max: 100 },
          { id: "r2", label: "Turnovers", home: 11, away: 9, max: 20 },
        ],
      },
      timeline: [
        {
          id: "re1",
          minuteOrTime: "FT",
          type: "end",
          title: "Full time — Isipathana",
          description: "Late penalty seals the semi-final win.",
          teamSide: "home",
          player: null,
        },
      ],
      scoreBreakdown: {
        type: "football",
        halves: [
          { name: "1st half", home: 14, away: 12 },
          { name: "2nd half", home: 12, away: 9 },
        ],
        goals: [
          { minute: "11'", player: "Naveen Lakmal", team: "home" },
          { minute: "33'", player: "Dilshan Wijesooriya", team: "away" },
        ],
        cards: [],
        subs: [],
      },
      lineups: {
        home: ["HK Naveen Lakmal", "FL Theekshana Herath", "WG Vishwa Ranasinghe"],
        away: ["HK Rashmika Alahakoon", "SO Dilshan Wijesooriya", "FB Malith Karunaratne"],
      },
      summary: {
        highlights: [
          { id: "rh1", text: "Kandy crowd noise peaks at scrum time on Nittawela." },
          { id: "rh2", text: "Trinity fightback in the second half falls just short." },
        ],
        recentUpdates: [{ id: "ru1", text: "President’s Trophy schedule updated for finals week." }],
        miniStats: [
          { label: "Hill country", value: "Schools rugby showcase" },
          { label: "Rivalry", value: "Colombo vs Kandy schools" },
        ],
        progression: [{ label: "Next", value: "Awaiting final opponent" }],
      },
    },
  ];
}

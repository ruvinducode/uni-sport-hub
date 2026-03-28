/**
 * Rich Match Center payload keyed by scoreboard match id.
 * Merged at runtime with live context scores/status via getMatchForCenter().
 */

export const MATCH_CENTER_BY_ID = {
  sb_m_live_football: {
    scoreSummary: "St. Peter’s lead by 5 — second half",
    phaseText: "58' · 2nd half",
    teamStatsExtended: [
      { id: "x1", label: "Territory %", home: 56, away: 44 },
      { id: "x2", label: "Carries +", home: 112, away: 96 },
      { id: "x3", label: "Tackles", home: 118, away: 124 },
      { id: "x4", label: "Penalties", home: 6, away: 8 },
      { id: "x5", label: "Line breaks", home: 7, away: 5 },
      { id: "x6", label: "Turnovers won", home: 9, away: 8 },
    ],
    teamA: {
      id: "team_st_peters",
      players: [
        { id: "sp_p1", name: "Pasindu Senanayake", number: 2, position: "HK", role: "Hooker", status: "active", avatar: null, stats: { football: { goals: 1, assists: 0, shots: 0, passes: 18, tackles: 12, fouls: 0, yellowCards: 0, redCards: 0, minutesPlayed: 58 } } },
        { id: "sp_p2", name: "Dinuka Perera", number: 8, position: "No.8", role: "Forward", status: "active", avatar: null, stats: { football: { goals: 1, assists: 1, shots: 0, passes: 14, tackles: 9, fouls: 1, yellowCards: 0, redCards: 0, minutesPlayed: 58 } } },
        { id: "sp_p3", name: "Kavishka Silva", number: 12, position: "IC", role: "Centre", status: "active", avatar: null, stats: { football: { goals: 0, assists: 1, shots: 0, passes: 22, tackles: 6, fouls: 0, yellowCards: 0, redCards: 0, minutesPlayed: 58 } } },
        { id: "sp_p4", name: "Janith Bandara", number: 9, position: "SH", role: "Scrum-half", status: "substituted", avatar: null, stats: { football: { goals: 0, assists: 0, shots: 0, passes: 41, tackles: 3, fouls: 0, yellowCards: 0, redCards: 0, minutesPlayed: 51 } } },
        { id: "sp_p5", name: "Malith Karunaratne", number: 14, position: "WG", role: "Wing", status: "active", avatar: null, stats: { football: { goals: 0, assists: 0, shots: 0, passes: 9, tackles: 4, fouls: 0, yellowCards: 0, redCards: 0, minutesPlayed: 58 } } },
      ],
    },
    teamB: {
      id: "team_wesley",
      players: [
        { id: "w_p1", name: "Tharusha Fernando", number: 1, position: "HK", role: "Hooker", status: "active", avatar: null, stats: { football: { goals: 1, assists: 0, shots: 0, passes: 10, tackles: 11, fouls: 1, yellowCards: 0, redCards: 0, minutesPlayed: 58 } } },
        { id: "w_p2", name: "Shenal Wijesinghe", number: 6, position: "FL", role: "Flanker", status: "active", avatar: null, stats: { football: { goals: 0, assists: 0, shots: 0, passes: 8, tackles: 14, fouls: 2, yellowCards: 1, redCards: 0, minutesPlayed: 58 } } },
        { id: "w_p3", name: "Raveen Abeysekara", number: 10, position: "FH", role: "Fly-half", status: "active", avatar: null, stats: { football: { goals: 0, assists: 1, shots: 0, passes: 36, tackles: 3, fouls: 0, yellowCards: 0, redCards: 0, minutesPlayed: 58 } } },
        { id: "w_p4", name: "Yohan de Silva", number: 11, position: "WG", role: "Wing", status: "substituted", avatar: null, stats: { football: { goals: 0, assists: 0, shots: 0, passes: 7, tackles: 2, fouls: 0, yellowCards: 0, redCards: 0, minutesPlayed: 60 } } },
      ],
    },
    lineupDetail: {
      home: {
        coach: "Coach: R. M. Perera",
        starters: [
          { id: "sp_p1", name: "Pasindu Senanayake", number: 2, position: "HK", status: "starting" },
          { id: "sp_p2", name: "Dinuka Perera", number: 8, position: "N8", status: "starting" },
          { id: "sp_p3", name: "Kavishka Silva", number: 12, position: "IC", status: "starting" },
          { id: "sp_p4", name: "Janith Bandara", number: 9, position: "SH", status: "substituted" },
          { id: "sp_p5", name: "Malith Karunaratne", number: 14, position: "WG", status: "starting" },
        ],
        bench: [
          { id: "sp_b1", name: "Nethmina Rajapaksha", number: 16, position: "PR", status: "bench" },
        ],
      },
      away: {
        coach: "Coach: K. S. Fernando",
        starters: [
          { id: "w_p1", name: "Tharusha Fernando", number: 1, position: "HK", status: "starting" },
          { id: "w_p2", name: "Shenal Wijesinghe", number: 6, position: "FL", status: "starting" },
          { id: "w_p3", name: "Raveen Abeysekara", number: 10, position: "FH", status: "starting" },
          { id: "w_p4", name: "Yohan de Silva", number: 11, position: "WG", status: "substituted" },
        ],
        bench: [{ id: "w_b1", name: "Keshan Rodrigo", number: 22, position: "FB", status: "bench" }],
      },
    },
    overview: {
      keyHighlights: [
        { id: "kh1", label: "Tries", value: "Pasindu Senanayake / Tharusha Fernando" },
        { id: "kh2", label: "Territory", value: "St. Peter’s 56%" },
        { id: "kh3", label: "Tackles", value: "Shenal Wijesinghe (14)" },
        { id: "kh4", label: "Match type", value: "Schools rugby — Colombo" },
      ],
    },
  },
  sb_m_live_school_cricket: {
    scoreSummary: "Royal 142/3 — Day 1",
    phaseText: "64 ov · session 3",
    teamStatsExtended: [
      { id: "c1", label: "Run rate", home: 4.4, away: 3.9 },
      { id: "c2", label: "Boundaries", home: 22, away: 18 },
      { id: "c3", label: "Dot %", home: 42, away: 48 },
    ],
    teamA: {
      id: "team_royal",
      players: [
        { id: "ry_p1", name: "Janith Bandara", number: 7, position: "Opener", role: "Batter", status: "active", avatar: null, stats: { cricket: { runs: 56, balls: 94, fours: 7, sixes: 1, wickets: 0, overs: 0, economy: 0 } } },
        { id: "ry_p2", name: "Malith Karunaratne", number: 18, position: "No.3", role: "Batter", status: "active", avatar: null, stats: { cricket: { runs: 41, balls: 72, fours: 5, sixes: 0, wickets: 0, overs: 0, economy: 0 } } },
        { id: "ry_p3", name: "Hasitha Kumara", number: 77, position: "AR", role: "All-rounder", status: "active", avatar: null, stats: { cricket: { runs: 12, balls: 21, fours: 1, sixes: 0, wickets: 0, overs: 6, economy: 4.2 } } },
      ],
    },
    teamB: {
      id: "team_stc",
      players: [
        { id: "st_p1", name: "Vishwa Ranasinghe", number: 21, position: "Opener", role: "Batter", status: "active", avatar: null, stats: { cricket: { runs: 38, balls: 61, fours: 4, sixes: 0, wickets: 0, overs: 0, economy: 0 } } },
        { id: "st_p2", name: "Chamika Dissanayake", number: 9, position: "SLA", role: "Bowler", status: "active", avatar: null, stats: { cricket: { runs: 6, balls: 12, fours: 0, sixes: 0, wickets: 2, overs: 15, economy: 3.5 } } },
        { id: "st_p3", name: "Prabath Peiris", number: 27, position: "WK", role: "Keeper", status: "active", avatar: null, stats: { cricket: { runs: 0, balls: 0, fours: 0, sixes: 0, wickets: 0, overs: 0, economy: 0 } } },
      ],
    },
    lineupDetail: {
      home: {
        coach: "Coach: S. Wijeratne",
        starters: [
          { id: "ry_p1", name: "Janith Bandara", number: 7, position: "Opener", status: "starting" },
          { id: "ry_p2", name: "Malith Karunaratne", number: 18, position: "No.3", status: "starting" },
        ],
        bench: [],
      },
      away: {
        coach: "Coach: D. Gunasekara",
        starters: [
          { id: "st_p1", name: "Vishwa Ranasinghe", number: 21, position: "Opener", status: "starting" },
          { id: "st_p2", name: "Chamika Dissanayake", number: 9, position: "Spinner", status: "starting" },
        ],
        bench: [],
      },
    },
    overview: {
      keyHighlights: [
        { id: "k1", label: "Partnership", value: "2nd wkt 78" },
        { id: "k2", label: "Venue", value: "SSC — Battle of the Blues" },
      ],
    },
  },
  sb_m_upcoming_cricket: {
    scoreSummary: "Lovers' Quarrel — Galle",
    phaseText: "Pre-match",
    teamStatsExtended: [
      { id: "c1", label: "H2H (50-over)", home: 11, away: 10 },
      { id: "c2", label: "Avg runs (season)", home: 228, away: 221 },
      { id: "c3", label: "Spin wickets", home: 42, away: 39 },
    ],
    teamA: {
      id: "team_richmond",
      players: [
        { id: "rc_p1", name: "Sithum Jayawardena", number: 5, position: "Opener", role: "Batter", status: "active", avatar: null, stats: { cricket: { runs: 0, balls: 0, fours: 0, sixes: 0, wickets: 0, overs: 0, economy: 0 } } },
        { id: "rc_p2", name: "Naveen Lakmal", number: 22, position: "AR", role: "All-rounder", status: "active", avatar: null, stats: { cricket: { runs: 0, balls: 0, fours: 0, sixes: 0, wickets: 14, overs: 48, economy: 5.8 } } },
      ],
    },
    teamB: {
      id: "team_mahinda",
      players: [
        { id: "mh_p1", name: "Ishan Maduranga", number: 11, position: "Opener", role: "Batter", status: "active", avatar: null, stats: { cricket: { runs: 0, balls: 0, fours: 0, sixes: 0, wickets: 0, overs: 0, economy: 0 } } },
        { id: "mh_p2", name: "Theekshana Herath", number: 19, position: "SLA", role: "Bowler", status: "active", avatar: null, stats: { cricket: { runs: 0, balls: 0, fours: 0, sixes: 0, wickets: 18, overs: 52, economy: 5.1 } } },
      ],
    },
    lineupDetail: {
      home: {
        coach: "Coach: Richmond XI (TBA)",
        starters: [
          { id: "rc_p1", name: "Sithum Jayawardena", number: 5, position: "Batter", status: "starting" },
          { id: "rc_p2", name: "Naveen Lakmal", number: 22, position: "AR", status: "starting" },
        ],
        bench: [],
      },
      away: {
        coach: "Coach: Mahinda XI (TBA)",
        starters: [
          { id: "mh_p1", name: "Ishan Maduranga", number: 11, position: "Batter", status: "starting" },
          { id: "mh_p2", name: "Theekshana Herath", number: 19, position: "Spinner", status: "starting" },
        ],
        bench: [],
      },
    },
    overview: {
      keyHighlights: [
        { id: "k1", label: "Spotlight", value: "Mahinda College — Galle" },
        { id: "k2", label: "Rivalry", value: "Lovers' Quarrel week" },
      ],
    },
  },
  sb_m_done_basketball: {
    scoreSummary: "University of Colombo wins by 5 — SLUG Final",
    phaseText: "Full time",
    teamStatsExtended: [
      { id: "b1", label: "Field goal %", home: 46, away: 43 },
      { id: "b2", label: "3PT made", home: 11, away: 9 },
      { id: "b3", label: "Rebounds", home: 39, away: 41 },
      { id: "b4", label: "Assists", home: 19, away: 17 },
      { id: "b5", label: "Turnovers", home: 12, away: 13 },
    ],
    teamA: {
      id: "team_uoc",
      players: [
        { id: "uoc_p1", name: "Udara Nanayakkara", number: 7, position: "G", role: "Guard", status: "active", avatar: null, stats: { basketball: { points: 24, rebounds: 5, assists: 4, steals: 2, blocks: 0, fouls: 2, minutesPlayed: 34 } } },
        { id: "uoc_p2", name: "Akila Gunawardana", number: 3, position: "G", role: "Guard", status: "active", avatar: null, stats: { basketball: { points: 16, rebounds: 3, assists: 6, steals: 1, blocks: 0, fouls: 3, minutesPlayed: 32 } } },
        { id: "uoc_p3", name: "Hiranya Liyanage", number: 9, position: "F", role: "Forward", status: "active", avatar: null, stats: { basketball: { points: 18, rebounds: 8, assists: 2, steals: 0, blocks: 1, fouls: 3, minutesPlayed: 30 } } },
        { id: "uoc_p4", name: "Oshada Fernando", number: 12, position: "F", role: "Forward", status: "active", avatar: null, stats: { basketball: { points: 14, rebounds: 7, assists: 1, steals: 1, blocks: 2, fouls: 4, minutesPlayed: 28 } } },
        { id: "uoc_p5", name: "Praveen Thilakarathne", number: 21, position: "C", role: "Center", status: "active", avatar: null, stats: { basketball: { points: 12, rebounds: 10, assists: 0, steals: 0, blocks: 3, fouls: 3, minutesPlayed: 26 } } },
      ],
    },
    teamB: {
      id: "team_usjp",
      players: [
        { id: "jp_p1", name: "Ravindu Madushanka", number: 5, position: "G", role: "Guard", status: "active", avatar: null, stats: { basketball: { points: 22, rebounds: 4, assists: 5, steals: 3, blocks: 0, fouls: 2, minutesPlayed: 35 } } },
        { id: "jp_p2", name: "Nimantha Rajakaruna", number: 0, position: "G", role: "Guard", status: "active", avatar: null, stats: { basketball: { points: 17, rebounds: 3, assists: 4, steals: 1, blocks: 0, fouls: 3, minutesPlayed: 33 } } },
        { id: "jp_p3", name: "Lahiru Attanayake", number: 8, position: "F", role: "Forward", status: "active", avatar: null, stats: { basketball: { points: 15, rebounds: 9, assists: 2, steals: 1, blocks: 1, fouls: 4, minutesPlayed: 31 } } },
        { id: "jp_p4", name: "Sajith Mendis", number: 4, position: "F", role: "Forward", status: "substituted", avatar: null, stats: { basketball: { points: 11, rebounds: 6, assists: 1, steals: 0, blocks: 0, fouls: 2, minutesPlayed: 22 } } },
        { id: "jp_p5", name: "Thilina Gamage", number: 15, position: "C", role: "Center", status: "active", avatar: null, stats: { basketball: { points: 10, rebounds: 11, assists: 0, steals: 0, blocks: 2, fouls: 5, minutesPlayed: 26 } } },
      ],
    },
    lineupDetail: {
      home: {
        coach: "Coach: M. D. Perera",
        starters: [
          { id: "uoc_p1", name: "Udara Nanayakkara", number: 7, position: "PG", status: "starting" },
          { id: "uoc_p2", name: "Akila Gunawardana", number: 3, position: "SG", status: "starting" },
          { id: "uoc_p3", name: "Hiranya Liyanage", number: 9, position: "SF", status: "starting" },
          { id: "uoc_p4", name: "Oshada Fernando", number: 12, position: "PF", status: "starting" },
          { id: "uoc_p5", name: "Praveen Thilakarathne", number: 21, position: "C", status: "starting" },
        ],
        bench: [],
      },
      away: {
        coach: "Coach: W. S. Silva",
        starters: [
          { id: "jp_p1", name: "Ravindu Madushanka", number: 5, position: "PG", status: "starting" },
          { id: "jp_p2", name: "Nimantha Rajakaruna", number: 0, position: "SG", status: "starting" },
          { id: "jp_p3", name: "Lahiru Attanayake", number: 8, position: "SF", status: "starting" },
          { id: "jp_p4", name: "Sajith Mendis", number: 4, position: "PF", status: "substituted" },
          { id: "jp_p5", name: "Thilina Gamage", number: 15, position: "C", status: "starting" },
        ],
        bench: [],
      },
    },
    overview: {
      keyHighlights: [
        { id: "bk1", label: "MVP", value: "Udara Nanayakkara (24 PTS)" },
        { id: "bk2", label: "Rebounds", value: "Thilina Gamage (11)" },
        { id: "bk3", label: "Assists", value: "Akila Gunawardana (6)" },
      ],
    },
  },
  sb_m_uni_rugby_upcoming: {
    scoreSummary: "Inter-university rugby — Kelaniya vs Moratuwa",
    phaseText: "Pre-match",
    teamStatsExtended: [
      { id: "u1", label: "Season form", home: 4, away: 3 },
      { id: "u2", label: "Avg points", home: 24, away: 22 },
    ],
    teamA: {
      id: "team_kelaniya",
      players: [
        { id: "k_p1", name: "Eranga Pushpakumara", number: 9, position: "SH", role: "Scrum-half", status: "active", avatar: null, stats: { football: { goals: 0, assists: 0, shots: 0, passes: 0, tackles: 0, fouls: 0, yellowCards: 0, redCards: 0, minutesPlayed: 0 } } },
      ],
    },
    teamB: {
      id: "team_moratuwa",
      players: [
        { id: "m_p1", name: "Kalhara Weerasinghe", number: 10, position: "FH", role: "Fly-half", status: "active", avatar: null, stats: { football: { goals: 0, assists: 0, shots: 0, passes: 0, tackles: 0, fouls: 0, yellowCards: 0, redCards: 0, minutesPlayed: 0 } } },
      ],
    },
    lineupDetail: {
      home: { coach: "Coach: TBA — Kelaniya", starters: [], bench: [] },
      away: { coach: "Coach: TBA — Moratuwa", starters: [], bench: [] },
    },
    overview: {
      keyHighlights: [
        { id: "uk1", label: "Stage", value: "Inter-University Rugby semi" },
        { id: "uk2", label: "Campus", value: "Western province corridor" },
      ],
    },
  },
  sb_m_school_rugby_done: {
    scoreSummary: "Isipathana win by 5 — President’s Trophy",
    phaseText: "Full time",
    teamStatsExtended: [
      { id: "r1", label: "Gainline wins %", home: 54, away: 46 },
      { id: "r2", label: "Turnovers", home: 11, away: 9 },
    ],
    teamA: {
      id: "team_isipathana",
      players: [
        { id: "is_p1", name: "Naveen Lakmal", number: 7, position: "FL", role: "Flanker", status: "active", avatar: null, stats: { football: { goals: 1, assists: 0, shots: 0, passes: 8, tackles: 13, fouls: 1, yellowCards: 0, redCards: 0, minutesPlayed: 80 } } },
        { id: "is_p2", name: "Theekshana Herath", number: 12, position: "IC", role: "Centre", status: "active", avatar: null, stats: { football: { goals: 0, assists: 1, shots: 0, passes: 18, tackles: 7, fouls: 0, yellowCards: 0, redCards: 0, minutesPlayed: 80 } } },
      ],
    },
    teamB: {
      id: "team_trinity",
      players: [
        { id: "tr_p1", name: "Rashmika Alahakoon", number: 15, position: "FB", role: "Full-back", status: "active", avatar: null, stats: { football: { goals: 0, assists: 0, shots: 0, passes: 22, tackles: 5, fouls: 0, yellowCards: 0, redCards: 0, minutesPlayed: 80 } } },
        { id: "tr_p2", name: "Dilshan Wijesooriya", number: 10, position: "FH", role: "Fly-half", status: "active", avatar: null, stats: { football: { goals: 1, assists: 0, shots: 0, passes: 31, tackles: 4, fouls: 1, yellowCards: 0, redCards: 0, minutesPlayed: 80 } } },
      ],
    },
    lineupDetail: {
      home: {
        coach: "Coach: H. L. Silva",
        starters: [
          { id: "is_p1", name: "Naveen Lakmal", number: 7, position: "FL", status: "starting" },
          { id: "is_p2", name: "Theekshana Herath", number: 12, position: "IC", status: "starting" },
        ],
        bench: [],
      },
      away: {
        coach: "Coach: P. Ratnayake",
        starters: [
          { id: "tr_p1", name: "Rashmika Alahakoon", number: 15, position: "FB", status: "starting" },
          { id: "tr_p2", name: "Dilshan Wijesooriya", number: 10, position: "FH", status: "starting" },
        ],
        bench: [],
      },
    },
    overview: {
      keyHighlights: [
        { id: "rh1", label: "Venue", value: "Nittawela — Kandy" },
        { id: "rh2", label: "Tries", value: "Naveen Lakmal / Dilshan Wijesooriya" },
      ],
    },
  },
};

export function getMatchForCenter(raw) {
  if (!raw) return null;
  const rich = MATCH_CENTER_BY_ID[raw.id];
  const scoreSummary = rich?.scoreSummary || raw.matchNote || raw.summaryText || "";
  const phaseText = rich?.phaseText || raw.matchStateText || "";

  const teamA = {
    id: rich?.teamA?.id || "team_a",
    ...raw.teamA,
    players: rich?.teamA?.players || raw.teamA?.players || [],
  };
  const teamB = {
    id: rich?.teamB?.id || "team_b",
    ...raw.teamB,
    players: rich?.teamB?.players || raw.teamB?.players || [],
  };

  const teamStatsRows = rich?.teamStatsExtended?.length
    ? rich.teamStatsExtended
    : raw.stats?.items || [];

  return {
    ...raw,
    scoreSummary,
    phaseText,
    teamA,
    teamB,
    teamStatsRows,
    lineupDetail: rich?.lineupDetail || null,
    overview: rich?.overview || { keyHighlights: [] },
  };
}

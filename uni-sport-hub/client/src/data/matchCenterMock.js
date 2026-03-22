/**
 * Rich Match Center payload keyed by scoreboard match id.
 * Merged at runtime with live context scores/status via getMatchForCenter().
 */

export const MATCH_CENTER_BY_ID = {
  sb_m_live_football: {
    scoreSummary: "Falcons lead by 1 — second half",
    phaseText: "72' · 2nd half",
    teamStatsExtended: [
      { id: "x1", label: "Possession %", home: 58, away: 42 },
      { id: "x2", label: "Shots", home: 14, away: 9 },
      { id: "x3", label: "Shots on target", home: 6, away: 3 },
      { id: "x4", label: "Corners", home: 5, away: 2 },
      { id: "x5", label: "Fouls", home: 9, away: 11 },
      { id: "x6", label: "Yellow cards", home: 1, away: 2 },
      { id: "x7", label: "Red cards", home: 0, away: 0 },
      { id: "x8", label: "Passes", home: 412, away: 301 },
      { id: "x9", label: "Pass accuracy %", home: 84, away: 78 },
    ],
    teamA: {
      id: "team_falcons",
      players: [
        { id: "f_p1", name: "N. Blake", number: 1, position: "GK", role: "Goalkeeper", status: "active", avatar: null, stats: { football: { goals: 0, assists: 0, shots: 0, passes: 28, tackles: 0, fouls: 0, yellowCards: 0, redCards: 0, minutesPlayed: 72 } } },
        { id: "f_p2", name: "J. Cole", number: 4, position: "DF", role: "Defender", status: "active", avatar: null, stats: { football: { goals: 1, assists: 0, shots: 2, passes: 41, tackles: 5, fouls: 1, yellowCards: 0, redCards: 0, minutesPlayed: 72 } } },
        { id: "f_p3", name: "L. Park", number: 8, position: "MF", role: "Midfielder", status: "active", avatar: null, stats: { football: { goals: 1, assists: 1, shots: 3, passes: 52, tackles: 3, fouls: 2, yellowCards: 1, redCards: 0, minutesPlayed: 72 } } },
        { id: "f_p4", name: "S. Ali", number: 10, position: "MF", role: "Midfielder", status: "substituted", avatar: null, stats: { football: { goals: 0, assists: 0, shots: 1, passes: 33, tackles: 4, fouls: 1, yellowCards: 0, redCards: 0, minutesPlayed: 63 } } },
        { id: "f_p5", name: "K. Mensah", number: 19, position: "FW", role: "Forward", status: "active", avatar: null, stats: { football: { goals: 0, assists: 0, shots: 4, passes: 12, tackles: 1, fouls: 0, yellowCards: 0, redCards: 0, minutesPlayed: 72 } } },
      ],
    },
    teamB: {
      id: "team_strikers",
      players: [
        { id: "s_p1", name: "R. Dias", number: 1, position: "GK", role: "Goalkeeper", status: "active", avatar: null, stats: { football: { goals: 0, assists: 0, shots: 0, passes: 22, tackles: 0, fouls: 0, yellowCards: 0, redCards: 0, minutesPlayed: 72 } } },
        { id: "s_p2", name: "M. Singh", number: 3, position: "DF", role: "Defender", status: "active", avatar: null, stats: { football: { goals: 0, assists: 0, shots: 1, passes: 29, tackles: 6, fouls: 3, yellowCards: 1, redCards: 0, minutesPlayed: 72 } } },
        { id: "s_p3", name: "R. Khan", number: 7, position: "MF", role: "Winger", status: "active", avatar: null, stats: { football: { goals: 1, assists: 0, shots: 3, passes: 24, tackles: 2, fouls: 1, yellowCards: 0, redCards: 0, minutesPlayed: 72 } } },
        { id: "s_p4", name: "H. Zane", number: 11, position: "FW", role: "Forward", status: "substituted", avatar: null, stats: { football: { goals: 0, assists: 0, shots: 2, passes: 9, tackles: 0, fouls: 1, yellowCards: 0, redCards: 0, minutesPlayed: 70 } } },
      ],
    },
    lineupDetail: {
      home: {
        coach: "Coach: E. Wright",
        starters: [
          { id: "f_p1", name: "N. Blake", number: 1, position: "GK", status: "starting" },
          { id: "f_p2", name: "J. Cole", number: 4, position: "CB", status: "starting" },
          { id: "f_p3", name: "L. Park", number: 8, position: "CM", status: "starting" },
          { id: "f_p4", name: "S. Ali", number: 10, position: "CM", status: "substituted" },
          { id: "f_p5", name: "K. Mensah", number: 19, position: "ST", status: "starting" },
        ],
        bench: [
          { id: "f_b1", name: "T. Reed", number: 14, position: "CM", status: "bench" },
          { id: "f_b2", name: "C. Yu", number: 2, position: "DF", status: "bench" },
        ],
      },
      away: {
        coach: "Coach: M. Ortiz",
        starters: [
          { id: "s_p1", name: "R. Dias", number: 1, position: "GK", status: "starting" },
          { id: "s_p2", name: "M. Singh", number: 3, position: "CB", status: "starting" },
          { id: "s_p3", name: "R. Khan", number: 7, position: "RW", status: "starting" },
          { id: "s_p4", name: "H. Zane", number: 11, position: "ST", status: "substituted" },
        ],
        bench: [
          { id: "s_b1", name: "P. Ortiz", number: 17, position: "FW", status: "bench" },
        ],
      },
    },
    overview: {
      keyHighlights: [
        { id: "kh1", label: "Top scorer", value: "J. Cole / R. Khan (1)" },
        { id: "kh2", label: "Possession leader", value: "Falcons 58%" },
        { id: "kh3", label: "Most tackles", value: "M. Singh (6)" },
        { id: "kh4", label: "xG leaders", value: "L. Park · K. Mensah" },
      ],
    },
  },
  sb_m_upcoming_cricket: {
    scoreSummary: "Match starts 6:30 PM",
    phaseText: "Pre-match",
    teamStatsExtended: [
      { id: "c1", label: "Run rate (season)", home: 8.2, away: 7.6 },
      { id: "c2", label: "Wickets / match", home: 6.1, away: 5.4 },
      { id: "c3", label: "Boundaries / inns", home: 14, away: 12 },
    ],
    teamA: {
      id: "team_raptors",
      players: [
        { id: "r_p1", name: "A. Sen", number: 7, position: "Opener", role: "Batter", status: "benched", avatar: null, stats: { cricket: { runs: 0, balls: 0, fours: 0, sixes: 0, wickets: 0, overs: 0, economy: 0 } } },
        { id: "r_p2", name: "V. Iyer", number: 18, position: "No.3", role: "Batter", status: "active", avatar: null, stats: { cricket: { runs: 0, balls: 0, fours: 0, sixes: 0, wickets: 0, overs: 0, economy: 0 } } },
        { id: "r_p3", name: "J. Nair", number: 9, position: "AR", role: "All-rounder", status: "active", avatar: null, stats: { cricket: { runs: 0, balls: 0, fours: 0, sixes: 0, wickets: 2, overs: 3.2, economy: 7.2 } } },
      ],
    },
    teamB: {
      id: "team_eagles",
      players: [
        { id: "e_p1", name: "S. Dsilva", number: 21, position: "Opener", role: "Batter", status: "active", avatar: null, stats: { cricket: { runs: 0, balls: 0, fours: 0, sixes: 0, wickets: 0, overs: 0, economy: 0 } } },
        { id: "e_p2", name: "M. Khan", number: 3, position: "Spinner", role: "Bowler", status: "active", avatar: null, stats: { cricket: { runs: 0, balls: 0, fours: 0, sixes: 0, wickets: 12, overs: 40, economy: 6.1 } } },
      ],
    },
    lineupDetail: {
      home: {
        coach: "Coach: P. Rao",
        starters: [
          { id: "r_p2", name: "V. Iyer", number: 18, position: "Batter", status: "starting" },
          { id: "r_p3", name: "J. Nair", number: 9, position: "AR", status: "starting" },
        ],
        bench: [{ id: "r_p1", name: "A. Sen", number: 7, position: "Batter", status: "bench" }],
      },
      away: {
        coach: "Coach: L. Bose",
        starters: [
          { id: "e_p1", name: "S. Dsilva", number: 21, position: "Batter", status: "starting" },
          { id: "e_p2", name: "M. Khan", number: 3, position: "Bowler", status: "starting" },
        ],
        bench: [],
      },
    },
    overview: {
      keyHighlights: [
        { id: "k1", label: "Wicket leader (season)", value: "M. Khan (Eagles)" },
        { id: "k2", label: "Powerplay focus", value: "Raptors top-order" },
      ],
    },
  },
  sb_m_done_basketball: {
    scoreSummary: "Titans win by 7 — Final",
    phaseText: "Full time",
    teamStatsExtended: [
      { id: "b1", label: "Field goal %", home: 48, away: 44 },
      { id: "b2", label: "3PT made", home: 12, away: 9 },
      { id: "b3", label: "Rebounds", home: 41, away: 38 },
      { id: "b4", label: "Assists", home: 22, away: 19 },
      { id: "b5", label: "Turnovers", home: 11, away: 14 },
      { id: "b6", label: "Steals", home: 8, away: 6 },
      { id: "b7", label: "Blocks", home: 5, away: 4 },
      { id: "b8", label: "Fouls", home: 18, away: 21 },
    ],
    teamA: {
      id: "team_titans",
      players: [
        { id: "t_p1", name: "D. Ellis", number: 5, position: "G", role: "Guard", status: "active", avatar: null, stats: { basketball: { points: 26, rebounds: 4, assists: 5, steals: 2, blocks: 0, fouls: 2, minutesPlayed: 34 } } },
        { id: "t_p2", name: "M. Rao", number: 2, position: "G", role: "Guard", status: "active", avatar: null, stats: { basketball: { points: 14, rebounds: 3, assists: 7, steals: 1, blocks: 0, fouls: 3, minutesPlayed: 32 } } },
        { id: "t_p3", name: "K. Stone", number: 7, position: "F", role: "Forward", status: "active", avatar: null, stats: { basketball: { points: 18, rebounds: 9, assists: 2, steals: 0, blocks: 2, fouls: 4, minutesPlayed: 30 } } },
        { id: "t_p4", name: "A. Ndiaye", number: 12, position: "F", role: "Forward", status: "benched", avatar: null, stats: { basketball: { points: 6, rebounds: 5, assists: 1, steals: 0, blocks: 1, fouls: 1, minutesPlayed: 14 } } },
        { id: "t_p5", name: "J. Pike", number: 33, position: "C", role: "Center", status: "active", avatar: null, stats: { basketball: { points: 12, rebounds: 11, assists: 1, steals: 0, blocks: 3, fouls: 3, minutesPlayed: 28 } } },
      ],
    },
    teamB: {
      id: "team_comets",
      players: [
        { id: "c_p1", name: "S. Cruz", number: 1, position: "G", role: "Guard", status: "active", avatar: null, stats: { basketball: { points: 22, rebounds: 3, assists: 6, steals: 3, blocks: 0, fouls: 2, minutesPlayed: 35 } } },
        { id: "c_p2", name: "T. West", number: 0, position: "G", role: "Guard", status: "active", avatar: null, stats: { basketball: { points: 17, rebounds: 4, assists: 4, steals: 1, blocks: 0, fouls: 3, minutesPlayed: 33 } } },
        { id: "c_p3", name: "N. Iyer", number: 8, position: "F", role: "Forward", status: "active", avatar: null, stats: { basketball: { points: 15, rebounds: 8, assists: 2, steals: 1, blocks: 1, fouls: 4, minutesPlayed: 31 } } },
        { id: "c_p4", name: "B. Cole", number: 4, position: "F", role: "Forward", status: "substituted", avatar: null, stats: { basketball: { points: 9, rebounds: 6, assists: 1, steals: 0, blocks: 0, fouls: 2, minutesPlayed: 22 } } },
        { id: "c_p5", name: "O. Mensah", number: 21, position: "C", role: "Center", status: "active", avatar: null, stats: { basketball: { points: 11, rebounds: 10, assists: 0, steals: 0, blocks: 2, fouls: 5, minutesPlayed: 26 } } },
      ],
    },
    lineupDetail: {
      home: {
        coach: "Coach: R. Lin",
        starters: [
          { id: "t_p1", name: "D. Ellis", number: 5, position: "PG", status: "starting" },
          { id: "t_p2", name: "M. Rao", number: 2, position: "SG", status: "starting" },
          { id: "t_p3", name: "K. Stone", number: 7, position: "SF", status: "starting" },
          { id: "t_p4", name: "A. Ndiaye", number: 12, position: "PF", status: "bench" },
          { id: "t_p5", name: "J. Pike", number: 33, position: "C", status: "starting" },
        ],
        bench: [{ id: "t_p4", name: "A. Ndiaye", number: 12, position: "PF", status: "bench" }],
      },
      away: {
        coach: "Coach: T. Vega",
        starters: [
          { id: "c_p1", name: "S. Cruz", number: 1, position: "PG", status: "starting" },
          { id: "c_p2", name: "T. West", number: 0, position: "SG", status: "starting" },
          { id: "c_p3", name: "N. Iyer", number: 8, position: "SF", status: "starting" },
          { id: "c_p4", name: "B. Cole", number: 4, position: "PF", status: "substituted" },
          { id: "c_p5", name: "O. Mensah", number: 21, position: "C", status: "starting" },
        ],
        bench: [],
      },
    },
    overview: {
      keyHighlights: [
        { id: "bk1", label: "MVP", value: "D. Ellis (26 PTS)" },
        { id: "bk2", label: "Rebounds", value: "J. Pike (11)" },
        { id: "bk3", label: "Assists", value: "M. Rao (7)" },
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

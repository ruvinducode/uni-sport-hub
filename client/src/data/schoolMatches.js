/**
 * School fixture catalog — metadata for scoreboard seed & filters.
 * Full match payloads are assembled in scoreboardSeed.js (same shape as context).
 */

import { SCHOOLS_BY_ID } from "./schools";
import { TOURNAMENTS_BY_ID } from "./tournaments";

/** @type {object[]} */
export const SCHOOL_FIXTURE_INDEX = [
  {
    id: "sb_m_live_football",
    tournamentId: "t_dialog_schools_rugby",
    schoolAId: "sch_st_peters",
    schoolBId: "sch_wesley",
    rivalryTag: "Colombo schools rugby",
    featured: true,
    notes: "Quarter-final — schools rugby under lights.",
  },
  {
    id: "sb_m_live_school_cricket",
    tournamentId: "t_battle_blues",
    schoolAId: "sch_royal",
    schoolBId: "sch_stc",
    rivalryTag: "Battle of the Blues",
    featured: true,
    notes: "Historic big match — SSC.",
  },
  {
    id: "sb_m_upcoming_cricket",
    tournamentId: "t_lovers_quarrel",
    schoolAId: "sch_richmond",
    schoolBId: "sch_mahinda",
    rivalryTag: "Lovers' Quarrel",
    featured: true,
    notes: "Southern big match week — Galle.",
  },
  {
    id: "sb_m_school_rugby_done",
    tournamentId: "t_presidents_trophy",
    schoolAId: "sch_isipathana",
    schoolBId: "sch_trinity",
    rivalryTag: "Kandy vs Colombo schools",
    featured: false,
    notes: "President's Trophy — full time result.",
  },
];

export function describeSchoolFixture(row) {
  const t = TOURNAMENTS_BY_ID[row.tournamentId];
  const a = SCHOOLS_BY_ID[row.schoolAId];
  const b = SCHOOLS_BY_ID[row.schoolBId];
  return { tournament: t, teamA: a, teamB: b };
}

/**
 * University fixture catalog — metadata for scoreboard seed.
 */

import { UNIVERSITIES_BY_ID } from "./universities";
import { TOURNAMENTS_BY_ID } from "./tournaments";

/** @type {object[]} */
export const UNIVERSITY_FIXTURE_INDEX = [
  {
    id: "sb_m_done_basketball",
    tournamentId: "t_uni_basket",
    uniAId: "uni_colombo",
    uniBId: "uni_japura",
    featured: true,
    notes: "Sri Lanka University Games — basketball final (mock).",
  },
  {
    id: "sb_m_uni_rugby_upcoming",
    tournamentId: "t_inter_uni_rugby",
    uniAId: "uni_kelaniya",
    uniBId: "uni_moratuwa",
    featured: true,
    notes: "Inter-university rugby — semifinal slot.",
  },
  {
    id: "sb_m_uni_cricket_completed",
    tournamentId: "t_slug",
    uniAId: "uni_peradeniya",
    uniBId: "uni_colombo",
    featured: false,
    notes: "SLUG cricket — league stage (completed).",
  },
];

export function describeUniversityFixture(row) {
  const t = TOURNAMENTS_BY_ID[row.tournamentId];
  const a = UNIVERSITIES_BY_ID[row.uniAId];
  const b = UNIVERSITIES_BY_ID[row.uniBId];
  return { tournament: t, teamA: a, teamB: b };
}

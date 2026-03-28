/**
 * Sri Lankan school & university tournament / league labels for mock fixtures.
 * @typedef {Object} Tournament
 * @property {string} id
 * @property {string} name
 * @property {string} sport
 * @property {'school'|'university'} level
 * @property {string} type
 * @property {string} season
 * @property {string} [sponsor]
 * @property {string} [locationFocus]
 */

/** @type {Tournament[]} */
export const TOURNAMENTS = [
  {
    id: "t_dialog_schools_rugby",
    name: "Dialog Schools Rugby Knockouts",
    sport: "Rugby",
    level: "school",
    type: "knockout",
    season: "2025",
    sponsor: "Dialog",
    locationFocus: "Island-wide",
  },
  {
    id: "t_presidents_trophy",
    name: "President's Trophy — Schools Rugby",
    sport: "Rugby",
    level: "school",
    type: "knockout",
    season: "2025",
    locationFocus: "Colombo & suburbs",
  },
  {
    id: "t_lovers_quarrel",
    name: "Lovers' Quarrel — Big Match Season",
    sport: "Cricket",
    level: "school",
    type: "big match",
    season: "2025",
    locationFocus: "Galle",
  },
  {
    id: "t_battle_blues",
    name: "Battle of the Blues — Royal–Thomian",
    sport: "Cricket",
    level: "school",
    type: "big match",
    season: "2025",
    locationFocus: "Colombo SSC",
  },
  {
    id: "t_battle_saints",
    name: "Battle of the Saints — Joe–Pete",
    sport: "Cricket",
    level: "school",
    type: "big match",
    season: "2025",
    locationFocus: "Colombo",
  },
  {
    id: "t_kandy_legends",
    name: "Kandy Schools Rugby Clash",
    sport: "Rugby",
    level: "school",
    type: "league",
    season: "2025",
    locationFocus: "Kandy",
  },
  {
    id: "t_slug",
    name: "Sri Lanka University Games",
    sport: "Multi",
    level: "university",
    type: "championship",
    season: "2025",
    locationFocus: "Rotating campus",
  },
  {
    id: "t_inter_uni_rugby",
    name: "Inter-University Rugby Championship",
    sport: "Rugby",
    level: "university",
    type: "knockout",
    season: "2025",
    locationFocus: "Colombo",
  },
  {
    id: "t_uni_basket",
    name: "University Championship — Basketball",
    sport: "Basketball",
    level: "university",
    type: "final",
    season: "2025",
    locationFocus: "Indoor halls",
  },
  {
    id: "t_campus_week",
    name: "Campus Rugby Week",
    sport: "Rugby",
    level: "university",
    type: "league",
    season: "2025",
    locationFocus: "Western Province",
  },
];

export const TOURNAMENTS_BY_ID = Object.fromEntries(TOURNAMENTS.map((t) => [t.id, t]));

export function getTournamentById(id) {
  return TOURNAMENTS_BY_ID[id] || null;
}

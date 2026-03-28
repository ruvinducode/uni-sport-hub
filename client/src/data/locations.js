/**
 * Sri Lankan location hierarchy for coach discovery (province → district → area).
 * Structured for future API replacement: same keys can map to backend IDs later.
 */

export const PROVINCES = [
  "Western",
  "Central",
  "Southern",
  "Northern",
  "Eastern",
  "North Western",
  "North Central",
  "Uva",
  "Sabaragamuwa",
];

/** @type {Record<string, string[]>} */
export const DISTRICTS_BY_PROVINCE = {
  Western: ["Colombo", "Gampaha", "Kalutara"],
  Central: ["Kandy", "Matale", "Nuwara Eliya"],
  Southern: ["Galle", "Matara", "Hambantota"],
  Northern: ["Jaffna", "Kilinochchi", "Mannar", "Mullaitivu", "Vavuniya"],
  Eastern: ["Trincomalee", "Batticaloa", "Ampara"],
  "North Western": ["Kurunegala", "Puttalam"],
  "North Central": ["Anuradhapura", "Polonnaruwa"],
  Uva: ["Badulla", "Monaragala"],
  Sabaragamuwa: ["Ratnapura", "Kegalle"],
};

/**
 * Areas / cities per district (demo subset — not full GN divisions).
 * @type {Record<string, string[]>}
 */
export const AREAS_BY_DISTRICT = {
  Colombo: ["Colombo", "Maharagama", "Nugegoda", "Dehiwala", "Mount Lavinia"],
  Gampaha: ["Gampaha", "Negombo"],
  Kalutara: ["Kalutara"],
  Kandy: ["Kandy", "Peradeniya"],
  Matale: ["Matale"],
  "Nuwara Eliya": ["Nuwara Eliya"],
  Galle: ["Galle"],
  Matara: ["Matara"],
  Hambantota: ["Hambantota"],
  Jaffna: ["Jaffna"],
  Kilinochchi: ["Kilinochchi"],
  Mannar: ["Mannar"],
  Mullaitivu: ["Mullaitivu"],
  Vavuniya: ["Vavuniya"],
  Trincomalee: ["Trincomalee"],
  Batticaloa: ["Batticaloa"],
  Ampara: ["Ampara"],
  Kurunegala: ["Kurunegala"],
  Puttalam: ["Puttalam"],
  Anuradhapura: ["Anuradhapura"],
  Polonnaruwa: ["Polonnaruwa"],
  Badulla: ["Badulla"],
  Monaragala: ["Monaragala"],
  Ratnapura: ["Ratnapura"],
  Kegalle: ["Kegalle"],
};

export function getDistrictsForProvince(province) {
  if (!province) return [];
  return DISTRICTS_BY_PROVINCE[province] || [];
}

export function getAreasForDistrict(district) {
  if (!district) return [];
  return AREAS_BY_DISTRICT[district] || [];
}

/** Common cities used in copy, tickets, and coach venues. */
export const KEY_CITIES = [
  "Colombo",
  "Bambalapitiya",
  "Mount Lavinia",
  "Kandy",
  "Galle",
  "Kurunegala",
  "Panadura",
  "Moratuwa",
  "Jaffna",
  "Trincomalee",
  "Batticaloa",
  "Peradeniya",
  "Nugegoda",
  "Maharagama",
  "Matara",
  "Badulla",
  "Ratnapura",
];

/**
 * Sri Lankan universities metadata.
 * @typedef {Object} University
 * @property {string} id
 * @property {string} name
 * @property {string} shortName
 * @property {string} district
 * @property {string} city
 * @property {string} province
 * @property {string[]} sports
 * @property {string[]} colors
 * @property {string|null} logo
 * @property {'university'} category
 */

/** @type {Record<string, University>} */
export const UNIVERSITIES_BY_ID = {
  uni_colombo: {
    id: "uni_colombo",
    name: "University of Colombo",
    shortName: "UoC",
    district: "Colombo",
    city: "Colombo",
    province: "Western",
    sports: ["Rugby", "Cricket", "Basketball", "Athletics"],
    colors: ["#1e3a8a", "#94a3b8"],
    logo: null,
    category: "university",
  },
  uni_japura: {
    id: "uni_japura",
    name: "University of Sri Jayewardenepura",
    shortName: "USJP",
    district: "Colombo",
    city: "Nugegoda",
    province: "Western",
    sports: ["Rugby", "Cricket", "Volleyball"],
    colors: ["#047857", "#ffffff"],
    logo: null,
    category: "university",
  },
  uni_kelaniya: {
    id: "uni_kelaniya",
    name: "University of Kelaniya",
    shortName: "UoK",
    district: "Gampaha",
    city: "Kelaniya",
    province: "Western",
    sports: ["Rugby", "Cricket", "Basketball"],
    colors: ["#7c3aed", "#ffffff"],
    logo: null,
    category: "university",
  },
  uni_moratuwa: {
    id: "uni_moratuwa",
    name: "University of Moratuwa",
    shortName: "UoM",
    district: "Colombo",
    city: "Moratuwa",
    province: "Western",
    sports: ["Cricket", "Football", "Basketball"],
    colors: ["#0369a1", "#ffffff"],
    logo: null,
    category: "university",
  },
  uni_peradeniya: {
    id: "uni_peradeniya",
    name: "University of Peradeniya",
    shortName: "UoP",
    district: "Kandy",
    city: "Peradeniya",
    province: "Central",
    sports: ["Rugby", "Cricket", "Hockey"],
    colors: ["#b45309", "#fef3c7"],
    logo: null,
    category: "university",
  },
  uni_ruhuna: {
    id: "uni_ruhuna",
    name: "University of Ruhuna",
    shortName: "UoR",
    district: "Matara",
    city: "Matara",
    province: "Southern",
    sports: ["Cricket", "Rugby", "Volleyball"],
    colors: ["#be123c", "#ffffff"],
    logo: null,
    category: "university",
  },
  uni_sabara: {
    id: "uni_sabara",
    name: "Sabaragamuwa University of Sri Lanka",
    shortName: "SUSL",
    district: "Ratnapura",
    city: "Belihuloya",
    province: "Sabaragamuwa",
    sports: ["Cricket", "Basketball", "Athletics"],
    colors: ["#15803d", "#ffffff"],
    logo: null,
    category: "university",
  },
  uni_rajarata: {
    id: "uni_rajarata",
    name: "Rajarata University",
    shortName: "RUSL",
    district: "Anuradhapura",
    city: "Mihintale",
    province: "North Central",
    sports: ["Cricket", "Volleyball", "Football"],
    colors: ["#92400e", "#fde68a"],
    logo: null,
    category: "university",
  },
  uni_jaffna: {
    id: "uni_jaffna",
    name: "University of Jaffna",
    shortName: "UoJ",
    district: "Jaffna",
    city: "Jaffna",
    province: "Northern",
    sports: ["Cricket", "Football", "Athletics"],
    colors: ["#0e7490", "#ffffff"],
    logo: null,
    category: "university",
  },
};

export const UNIVERSITIES = Object.values(UNIVERSITIES_BY_ID);

export function getUniversityById(id) {
  return UNIVERSITIES_BY_ID[id] || null;
}

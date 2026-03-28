/**
 * Pure filter helper — swap mock array for API results later.
 * @param {import('../data/coachTypes').Coach[]} coaches
 * @param {object} filters
 */
export function filterCoaches(coaches, filters) {
  const {
    province,
    district,
    area,
    sport,
    sessionType,
    genderPref,
    experienceLevel,
    priceRange,
    availabilityDays,
    coachLevel,
  } = filters;

  return coaches.filter((c) => {
    if (province && c.province !== province) return false;
    if (district && c.district !== district) return false;
    if (area && c.area !== area) return false;
    if (sport && c.sport !== sport) return false;
    if (sessionType && !c.sessionTypes.includes(sessionType)) return false;
    if (genderPref && c.gender !== genderPref) return false;

    if (coachLevel === "school" && c.coachLevel !== "school" && c.coachLevel !== "both") return false;
    if (coachLevel === "university" && c.coachLevel !== "university" && c.coachLevel !== "both") return false;
    if (coachLevel === "both" && c.coachLevel !== "both") return false;

    if (experienceLevel) {
      const y = c.experienceYears;
      if (experienceLevel === "0-2" && (y < 0 || y > 2)) return false;
      if (experienceLevel === "3-5" && (y < 3 || y > 5)) return false;
      if (experienceLevel === "6-10" && (y < 6 || y > 10)) return false;
      if (experienceLevel === "10+" && y < 11) return false;
    }

    if (priceRange) {
      const p = c.pricePerSession;
      if (priceRange === "0-2500" && p > 2500) return false;
      if (priceRange === "2501-4000" && (p < 2501 || p > 4000)) return false;
      if (priceRange === "4001-6000" && (p < 4001 || p > 6000)) return false;
      if (priceRange === "6001+" && p < 6001) return false;
    }

    if (availabilityDays?.length) {
      const overlap = availabilityDays.some((d) => c.availabilityDays.includes(d));
      if (!overlap) return false;
    }

    return true;
  });
}

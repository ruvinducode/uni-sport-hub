/**
 * Coach audience level + school/uni background (merged onto RAW_COACHES in coaches.js).
 * @typedef {'school'|'university'|'both'} CoachLevel
 */

/** @type {Record<string, { coachLevel: CoachLevel, schoolOrUniversityExperience: string }>} */
export const COACH_META_BY_ID = {
  coach_nishan_perera: {
    coachLevel: "both",
    schoolOrUniversityExperience: "Colombo schools batting camps & university squad training",
  },
  coach_ruwan_silva: {
    coachLevel: "university",
    schoolOrUniversityExperience: "Kandy inter-university football & campus league",
  },
  coach_amaya_wijesinghe: {
    coachLevel: "school",
    schoolOrUniversityExperience: "Southern schools badminton — Galle / Mahinda & Richmond corridor",
  },
  coach_chaminda_fernando: {
    coachLevel: "school",
    schoolOrUniversityExperience: "Western schools basketball — Negombo & Gampaha leagues",
  },
  coach_dilrukshi_jayawardena: {
    coachLevel: "both",
    schoolOrUniversityExperience: "Northern schools sprint programme & Jaffna campus athletics",
  },
  coach_kavindu_ratnayake: {
    coachLevel: "school",
    schoolOrUniversityExperience: "North Western schools volleyball & Kurunegala district tournaments",
  },
  coach_isuru_mendis: {
    coachLevel: "school",
    schoolOrUniversityExperience: "Southern schools rugby — Matara & schools knockout prep",
  },
  coach_tharindu_bandara: {
    coachLevel: "school",
    schoolOrUniversityExperience: "Colombo schools swimming — Mount Lavinia / Dehiwala academies",
  },
  coach_pramod_wickramasinghe: {
    coachLevel: "both",
    schoolOrUniversityExperience: "Central province schools tennis & university recreational tennis",
  },
  coach_sanduni_desilva: {
    coachLevel: "school",
    schoolOrUniversityExperience: "Gampaha schools cricket — spin coaching for youth teams",
  },
  coach_ramesh_navaratnam: {
    coachLevel: "school",
    schoolOrUniversityExperience: "Eastern schools football — Batticaloa district programmes",
  },
  coach_malith_karunaratne: {
    coachLevel: "school",
    schoolOrUniversityExperience: "Colombo schools doubles — Maharagama & suburbs",
  },
  coach_nadee_rajapakse: {
    coachLevel: "university",
    schoolOrUniversityExperience: "Eastern University & Trincomalee campus basketball",
  },
  coach_ashan_dias: {
    coachLevel: "both",
    schoolOrUniversityExperience: "North Central schools volleyball & Rajarata University clinics",
  },
  coach_gayan_pathirana: {
    coachLevel: "both",
    schoolOrUniversityExperience: "Uva schools endurance & University of Ruhuna student-athletes",
  },
};

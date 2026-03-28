/**
 * JSDoc shapes for mock coach data — mirrors a future API response.
 * @typedef {Object} CoachReview
 * @property {string} id
 * @property {string} author
 * @property {number} rating
 * @property {string} text
 * @property {string} date
 */

/**
 * @typedef {Object} SessionPackage
 * @property {string} id
 * @property {string} title
 * @property {number} sessions
 * @property {number} price
 * @property {string} [note]
 */

/**
 * @typedef {Object} TrainingVenue
 * @property {string} name
 * @property {string} address
 * @property {string} type
 */

/**
 * @typedef {Object} Coach
 * @property {string} id
 * @property {string} fullName
 * @property {string} avatar
 * @property {'male'|'female'} gender
 * @property {string} sport
 * @property {string} specialization
 * @property {string} province
 * @property {string} district
 * @property {string} area
 * @property {string[]} languages
 * @property {number} experienceYears
 * @property {number} rating
 * @property {number} reviewCount
 * @property {number} pricePerSession
 * @property {('individual'|'group'|'academy'|'school_team')[]} sessionTypes
 * @property {('in-person'|'online'|'both')[]} coachingModes
 * @property {string[]} availabilityDays
 * @property {boolean} verified
 * @property {boolean} topRated
 * @property {boolean} youthSpecialist
 * @property {string} bio
 * @property {string[]} achievements
 * @property {string[]} certifications
 * @property {TrainingVenue[]} trainingVenues
 * @property {string} contactEmail
 * @property {string} contactPhone
 * @property {string[]} tags
 * @property {CoachReview[]} reviews
 * @property {SessionPackage[]} sessionPackages
 * @property {'school'|'university'|'both'} [coachLevel]
 * @property {string} [schoolOrUniversityExperience]
 */

export {};

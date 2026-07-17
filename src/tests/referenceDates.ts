/**
 * Dates de référence utilisées dans les tests du moteur de conversion.
 * Provenance et justification détaillées dans docs/conversion-method.md.
 */
export const REFERENCE_DATES = {
  j2000: {
    gregorian: { day: 1, month: 1, year: 2000 },
    julianDay: 2451545,
  },
  unixEpoch: {
    gregorian: { day: 1, month: 1, year: 1970 },
    julianDay: 2440588,
  },
  gregorianReform: {
    gregorian: { day: 15, month: 10, year: 1582 },
    julianDay: 2299161,
  },
  dayBeforeGregorianReform: {
    gregorian: { day: 4, month: 10, year: 1582 },
    julianDay: 2299150,
  },
  hijriCivilEpoch: {
    julianDay: 1948440,
    hijri: { day: 1, month: 1, year: 1 },
  },
  planExample: {
    gregorian: { day: 2, month: 9, year: 1740 },
    julianDay: 2356827,
    hijri: { day: 10, month: 6, year: 1153 },
  },
} as const

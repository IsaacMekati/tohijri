import { describe, expect, it } from 'vitest'
import { formatGregorianDate } from '../utils/formatGregorianDate'
import { formatHijriDateAr, formatHijriDateFr } from '../utils/formatHijriDate'
import { REFERENCE_DATES } from './referenceDates'

describe('formatGregorianDate', () => {
  it('formate le 2 septembre 1740', () => {
    expect(formatGregorianDate(REFERENCE_DATES.planExample.gregorian)).toBe(
      '2 septembre 1740',
    )
  })
})

describe('formatHijriDateFr', () => {
  it('formate le 10 Joumada ath-thania 1153 H', () => {
    expect(formatHijriDateFr(REFERENCE_DATES.planExample.hijri)).toBe(
      '10 Joumada ath-thania 1153 H',
    )
  })
})

describe('formatHijriDateAr', () => {
  it('formate la date en chiffres arabes orientaux avec le nom du mois en arabe', () => {
    expect(formatHijriDateAr(REFERENCE_DATES.planExample.hijri)).toBe(
      '١٠ جُمَادَىٰ ٱلْآخِرَة ١١٥٣ هـ',
    )
  })
})

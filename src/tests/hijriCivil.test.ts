import { describe, expect, it } from 'vitest'
import {
  isLeapHijriYear,
  julianDayToHijriCivil,
} from '../domain/calendars/hijriCivil'
import { REFERENCE_DATES } from './referenceDates'

const HIJRI_CIVIL_EPOCH_JULIAN_DAY = REFERENCE_DATES.hijriCivilEpoch.julianDay

/**
 * Implémentation indépendante de la formule inverse (date hégirienne civile
 * vers JDN), utilisée uniquement dans ces tests pour valider par
 * recoupement `julianDayToHijriCivil`, sans dépendre de son propre calcul.
 * Formule standard du calendrier civil tabulaire (cf. docs/conversion-method.md).
 */
function referenceHijriCivilToJulianDay(
  year: number,
  month: number,
  day: number,
): number {
  return (
    day +
    Math.ceil(29.5 * (month - 1)) +
    (year - 1) * 354 +
    Math.floor((3 + 11 * year) / 30) +
    HIJRI_CIVIL_EPOCH_JULIAN_DAY -
    1
  )
}

describe('julianDayToHijriCivil', () => {
  it('l\'époque civile (JDN 1948440) correspond au 1 Mouharram 1 H', () => {
    expect(julianDayToHijriCivil(HIJRI_CIVIL_EPOCH_JULIAN_DAY)).toEqual(
      REFERENCE_DATES.hijriCivilEpoch.hijri,
    )
  })

  it('le dernier jour du mois 1 (30 jours) précède le 1er jour du mois 2', () => {
    expect(julianDayToHijriCivil(HIJRI_CIVIL_EPOCH_JULIAN_DAY + 29)).toEqual({
      day: 30,
      month: 1,
      year: 1,
    })
    expect(julianDayToHijriCivil(HIJRI_CIVIL_EPOCH_JULIAN_DAY + 30)).toEqual({
      day: 1,
      month: 2,
      year: 1,
    })
  })

  it('est l\'inverse de la formule civile tabulaire de référence sur des dates variées', () => {
    const references: { year: number; month: number; day: number }[] = [
      { year: 1, month: 6, day: 15 },
      { year: 2, month: 12, day: 30 },
      { year: 100, month: 1, day: 1 },
      { year: 1445, month: 9, day: 1 },
      { year: 1446, month: 12, day: 1 },
      { year: 1153, month: 6, day: 10 },
    ]

    for (const reference of references) {
      const jdn = referenceHijriCivilToJulianDay(
        reference.year,
        reference.month,
        reference.day,
      )
      expect(julianDayToHijriCivil(jdn)).toEqual(reference)
    }
  })

  it('change d\'année au passage du dernier jour du mois 12', () => {
    const lastDayOfYear1 = referenceHijriCivilToJulianDay(1, 12, 29)
    expect(julianDayToHijriCivil(lastDayOfYear1)).toEqual({
      day: 29,
      month: 12,
      year: 1,
    })
    expect(julianDayToHijriCivil(lastDayOfYear1 + 1)).toEqual({
      day: 1,
      month: 1,
      year: 2,
    })
  })

  it('est stable et déterministe pour un même JDN répété', () => {
    const jdn = HIJRI_CIVIL_EPOCH_JULIAN_DAY + 12345
    expect(julianDayToHijriCivil(jdn)).toEqual(julianDayToHijriCivil(jdn))
  })
})

describe('isLeapHijriYear', () => {
  it('reconnaît les 11 années bissextiles du cycle de 30 ans', () => {
    const leapPositions = [2, 5, 7, 10, 13, 16, 18, 21, 24, 26, 29]
    for (let position = 1; position <= 30; position++) {
      expect(isLeapHijriYear(position)).toBe(leapPositions.includes(position))
    }
  })

  it('une année bissextile a un mois 12 de 30 jours', () => {
    expect(isLeapHijriYear(2)).toBe(true)
    expect(julianDayToHijriCivil(referenceHijriCivilToJulianDay(2, 12, 30))).toEqual({
      day: 30,
      month: 12,
      year: 2,
    })
  })

  it('une année commune a un mois 12 de 29 jours seulement', () => {
    expect(isLeapHijriYear(1)).toBe(false)
    const jdnAfterLastDay = referenceHijriCivilToJulianDay(1, 12, 29) + 1
    expect(julianDayToHijriCivil(jdnAfterLastDay)).toEqual({
      day: 1,
      month: 1,
      year: 2,
    })
  })

  it('se répète identiquement au cycle suivant (positions 31 à 60)', () => {
    for (let position = 1; position <= 30; position++) {
      expect(isLeapHijriYear(position + 30)).toBe(isLeapHijriYear(position))
    }
  })
})

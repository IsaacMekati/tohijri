import { describe, expect, it } from 'vitest'
import { gregorianToJulianDay } from '../domain/calendars/julianDay'
import { REFERENCE_DATES } from './referenceDates'

describe('gregorianToJulianDay', () => {
  it('calcule le JDN du 1er janvier 2000 (référence J2000.0)', () => {
    const { gregorian, julianDay } = REFERENCE_DATES.j2000
    expect(gregorianToJulianDay(gregorian)).toBe(julianDay)
  })

  it('calcule le JDN du 1er janvier 1970 (époque Unix)', () => {
    const { gregorian, julianDay } = REFERENCE_DATES.unixEpoch
    expect(gregorianToJulianDay(gregorian)).toBe(julianDay)
  })

  it('calcule le JDN du 15 octobre 1582 (adoption historique du calendrier grégorien)', () => {
    const { gregorian, julianDay } = REFERENCE_DATES.gregorianReform
    expect(gregorianToJulianDay(gregorian)).toBe(julianDay)
  })

  it('calcule le JDN pour une date proleptique antérieure à 1582 (avant l\'adoption historique)', () => {
    const { gregorian, julianDay } = REFERENCE_DATES.dayBeforeGregorianReform
    expect(gregorianToJulianDay(gregorian)).toBe(julianDay)
  })

  it('calcule le JDN pour une date historique tirée de l\'exemple du projet (1740)', () => {
    const { gregorian, julianDay } = REFERENCE_DATES.planExample
    expect(gregorianToJulianDay(gregorian)).toBe(julianDay)
  })

  it('produit un résultat croissant d\'un jour à l\'autre', () => {
    const day1 = gregorianToJulianDay({ day: 31, month: 12, year: 2023 })
    const day2 = gregorianToJulianDay({ day: 1, month: 1, year: 2024 })
    expect(day2 - day1).toBe(1)
  })

  it('est stable et déterministe pour un même appel répété', () => {
    const date = { day: 17, month: 7, year: 2026 }
    expect(gregorianToJulianDay(date)).toBe(gregorianToJulianDay(date))
  })
})

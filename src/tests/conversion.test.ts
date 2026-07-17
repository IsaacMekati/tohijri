import { describe, expect, it } from 'vitest'
import { convertGregorianToHijri } from '../domain/convertGregorianToHijri'
import { REFERENCE_DATES } from './referenceDates'

describe('convertGregorianToHijri', () => {
  it('convertit le 2 septembre 1740 en 10 Joumada ath-thania 1153 H', () => {
    const result = convertGregorianToHijri(REFERENCE_DATES.planExample.gregorian)
    expect(result).toEqual({
      gregorian: REFERENCE_DATES.planExample.gregorian,
      hijri: REFERENCE_DATES.planExample.hijri,
      method: 'islamic-civil',
    })
  })

  it('rejette une date grégorienne invalide', () => {
    expect(() =>
      convertGregorianToHijri({ day: 31, month: 4, year: 2025 }),
    ).toThrow()
  })

  it('est stable et déterministe pour un même appel répété', () => {
    const date = { day: 17, month: 7, year: 2026 }
    expect(convertGregorianToHijri(date)).toEqual(convertGregorianToHijri(date))
  })

  it('des jours consécutifs produisent des dates hégiriennes consécutives ou un changement de mois cohérent', () => {
    const day1 = convertGregorianToHijri({ day: 31, month: 12, year: 2023 })
    const day2 = convertGregorianToHijri({ day: 1, month: 1, year: 2024 })
    const sameMonth = day1.hijri.month === day2.hijri.month
    const dayIncrement = day2.hijri.day - day1.hijri.day === 1
    const monthChange =
      !sameMonth && day2.hijri.day === 1 && day1.hijri.year <= day2.hijri.year
    expect(sameMonth ? dayIncrement : monthChange).toBe(true)
  })
})

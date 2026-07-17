import { describe, expect, it } from 'vitest'
import {
  daysInGregorianMonth,
  isLeapGregorianYear,
  isValidGregorianDate,
  validateGregorianDate,
} from '../domain/calendars/gregorian'

describe('isLeapGregorianYear', () => {
  it('année divisible par 4 mais pas par 100 est bissextile', () => {
    expect(isLeapGregorianYear(2024)).toBe(true)
  })

  it('année divisible par 100 mais pas par 400 n\'est pas bissextile', () => {
    expect(isLeapGregorianYear(1900)).toBe(false)
  })

  it('année divisible par 400 est bissextile', () => {
    expect(isLeapGregorianYear(2000)).toBe(true)
  })

  it('année non divisible par 4 n\'est pas bissextile', () => {
    expect(isLeapGregorianYear(2025)).toBe(false)
  })
})

describe('daysInGregorianMonth', () => {
  it('février compte 29 jours lors d\'une année bissextile', () => {
    expect(daysInGregorianMonth(2024, 2)).toBe(29)
  })

  it('février compte 28 jours lors d\'une année non bissextile', () => {
    expect(daysInGregorianMonth(2025, 2)).toBe(28)
  })

  it('avril compte 30 jours', () => {
    expect(daysInGregorianMonth(2025, 4)).toBe(30)
  })

  it('décembre compte 31 jours', () => {
    expect(daysInGregorianMonth(1740, 12)).toBe(31)
  })
})

describe('validateGregorianDate / isValidGregorianDate', () => {
  it('accepte le 29 février 2024', () => {
    expect(isValidGregorianDate({ day: 29, month: 2, year: 2024 })).toBe(true)
  })

  it('refuse le 29 février 2025', () => {
    expect(isValidGregorianDate({ day: 29, month: 2, year: 2025 })).toBe(false)
  })

  it('refuse le 31 avril 2025', () => {
    expect(isValidGregorianDate({ day: 31, month: 4, year: 2025 })).toBe(false)
  })

  it('accepte le 31 décembre 1740', () => {
    expect(isValidGregorianDate({ day: 31, month: 12, year: 1740 })).toBe(true)
  })

  it('refuse un mois hors plage', () => {
    const error = validateGregorianDate({ day: 1, month: 13, year: 2025 })
    expect(error?.reason).toBe('invalid-month')
  })

  it('refuse une année hors plage', () => {
    const error = validateGregorianDate({ day: 1, month: 1, year: 10000 })
    expect(error?.reason).toBe('invalid-year')
  })

  it('refuse un jour non entier', () => {
    const error = validateGregorianDate({ day: 1.5, month: 1, year: 2025 })
    expect(error?.reason).toBe('invalid-day')
  })
})

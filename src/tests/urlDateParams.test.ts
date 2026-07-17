import { describe, expect, it } from 'vitest'
import {
  formatDateForUrlParam,
  parseDateFromUrlParam,
} from '../utils/urlDateParams'

describe('parseDateFromUrlParam', () => {
  it('analyse un paramètre bien formé', () => {
    expect(parseDateFromUrlParam('1740-09-02')).toEqual({
      year: 1740,
      month: 9,
      day: 2,
    })
  })

  it('retourne null pour un format invalide', () => {
    expect(parseDateFromUrlParam('02-09-1740')).toBeNull()
    expect(parseDateFromUrlParam('not-a-date')).toBeNull()
    expect(parseDateFromUrlParam('1740-9-2')).toBeNull()
  })
})

describe('formatDateForUrlParam', () => {
  it('formate une date avec des zéros de tête', () => {
    expect(formatDateForUrlParam({ year: 1740, month: 9, day: 2 })).toBe(
      '1740-09-02',
    )
  })

  it('est l\'inverse de parseDateFromUrlParam', () => {
    const date = { year: 5, month: 3, day: 7 }
    expect(parseDateFromUrlParam(formatDateForUrlParam(date))).toEqual({
      year: 5,
      month: 3,
      day: 7,
    })
  })
})

import type { DateValidationError, GregorianDate } from '../../types/calendar'

export const MIN_GREGORIAN_YEAR = 1
export const MAX_GREGORIAN_YEAR = 9999

export function isLeapGregorianYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

export function daysInGregorianMonth(year: number, month: number): number {
  const daysByMonth = [
    31,
    isLeapGregorianYear(year) ? 29 : 28,
    31,
    30,
    31,
    30,
    31,
    31,
    30,
    31,
    30,
    31,
  ]
  return daysByMonth[month - 1]
}

export function validateGregorianDate(
  date: GregorianDate,
): DateValidationError | null {
  const { day, month, year } = date

  if (
    !Number.isInteger(year) ||
    year < MIN_GREGORIAN_YEAR ||
    year > MAX_GREGORIAN_YEAR
  ) {
    return {
      reason: 'invalid-year',
      message: `L'année doit être un entier compris entre ${String(MIN_GREGORIAN_YEAR)} et ${String(MAX_GREGORIAN_YEAR)}.`,
    }
  }

  if (!Number.isInteger(month) || month < 1 || month > 12) {
    return {
      reason: 'invalid-month',
      message: 'Le mois doit être un entier compris entre 1 et 12.',
    }
  }

  if (
    !Number.isInteger(day) ||
    day < 1 ||
    day > daysInGregorianMonth(year, month)
  ) {
    return {
      reason: 'invalid-day',
      message: `Le jour doit être un entier compris entre 1 et ${String(daysInGregorianMonth(year, month))} pour ce mois.`,
    }
  }

  return null
}

export function isValidGregorianDate(date: GregorianDate): boolean {
  return validateGregorianDate(date) === null
}

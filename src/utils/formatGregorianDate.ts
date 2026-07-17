import type { GregorianDate } from '../types/calendar'

export const GREGORIAN_MONTHS_FR = [
  'janvier',
  'février',
  'mars',
  'avril',
  'mai',
  'juin',
  'juillet',
  'août',
  'septembre',
  'octobre',
  'novembre',
  'décembre',
]

export function formatGregorianDate(date: GregorianDate): string {
  const monthName = GREGORIAN_MONTHS_FR[date.month - 1]
  return `${String(date.day)} ${monthName} ${String(date.year)}`
}

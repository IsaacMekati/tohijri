import type { GregorianDate } from '../types/calendar'

const URL_DATE_PARAM_PATTERN = /^(\d{4,})-(\d{2})-(\d{2})$/

/**
 * Analyse un paramètre d'URL au format `YYYY-MM-DD`. Ne valide que le
 * format ; la validité calendaire (jours par mois, années bissextiles...)
 * reste du ressort de `validateGregorianDate`.
 */
export function parseDateFromUrlParam(value: string): GregorianDate | null {
  const match = URL_DATE_PARAM_PATTERN.exec(value)
  if (!match) {
    return null
  }

  const [, yearText, monthText, dayText] = match
  return {
    year: Number(yearText),
    month: Number(monthText),
    day: Number(dayText),
  }
}

export function formatDateForUrlParam(date: GregorianDate): string {
  const year = String(date.year).padStart(4, '0')
  const month = String(date.month).padStart(2, '0')
  const day = String(date.day).padStart(2, '0')
  return `${year}-${month}-${day}`
}

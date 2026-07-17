import { HIJRI_MONTHS } from '../data/hijriMonths'
import type { HijriDate } from '../types/calendar'

const EASTERN_ARABIC_DIGITS = [
  '٠',
  '١',
  '٢',
  '٣',
  '٤',
  '٥',
  '٦',
  '٧',
  '٨',
  '٩',
]

function toEasternArabicNumerals(value: number): string {
  return String(value)
    .split('')
    .map((digit) => EASTERN_ARABIC_DIGITS[Number(digit)] ?? digit)
    .join('')
}

function getHijriMonth(monthNumber: number) {
  const month = HIJRI_MONTHS.find((entry) => entry.number === monthNumber)
  if (!month) {
    throw new Error(`Mois hégirien invalide : ${String(monthNumber)}`)
  }
  return month
}

export function formatHijriDateFr(date: HijriDate): string {
  const month = getHijriMonth(date.month)
  return `${String(date.day)} ${month.fr} ${String(date.year)} H`
}

export function formatHijriDateAr(date: HijriDate): string {
  const month = getHijriMonth(date.month)
  return `${toEasternArabicNumerals(date.day)} ${month.ar} ${toEasternArabicNumerals(date.year)} هـ`
}

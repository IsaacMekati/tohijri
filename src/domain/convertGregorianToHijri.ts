import { validateGregorianDate } from './calendars/gregorian'
import { julianDayToHijriCivil } from './calendars/hijriCivil'
import { gregorianToJulianDay } from './calendars/julianDay'
import type { ConversionResult, GregorianDate } from '../types/calendar'

export function convertGregorianToHijri(
  date: GregorianDate,
): ConversionResult {
  const error = validateGregorianDate(date)
  if (error) {
    throw new Error(error.message)
  }

  const julianDay = gregorianToJulianDay(date)
  const hijri = julianDayToHijriCivil(julianDay)

  return {
    gregorian: date,
    hijri,
    method: 'islamic-civil',
  }
}

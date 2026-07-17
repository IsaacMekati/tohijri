export type GregorianDate = {
  day: number
  month: number
  year: number
}

export type HijriDate = {
  day: number
  month: number
  year: number
}

export type ConversionMethod = 'islamic-civil'

export type ConversionResult = {
  gregorian: GregorianDate
  hijri: HijriDate
  method: ConversionMethod
}

export type DateValidationErrorReason =
  | 'invalid-year'
  | 'invalid-month'
  | 'invalid-day'

export type DateValidationError = {
  reason: DateValidationErrorReason
  message: string
}

export type GregorianDateFormValue = {
  day: string
  month: string
  year: string
}

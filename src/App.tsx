import { useCallback, useEffect, useState } from 'react'
import { GregorianDateForm } from './components/GregorianDateForm'
import { HijriResult } from './components/HijriResult'
import { MethodExplanation } from './components/MethodExplanation'
import { convertGregorianToHijri } from './domain/convertGregorianToHijri'
import { validateGregorianDate } from './domain/calendars/gregorian'
import {
  formatDateForUrlParam,
  parseDateFromUrlParam,
} from './utils/urlDateParams'
import type {
  ConversionResult,
  GregorianDate,
  GregorianDateFormValue,
} from './types/calendar'

const DATE_URL_PARAM = 'date'

const EMPTY_GREGORIAN_DATE_FORM_VALUE: GregorianDateFormValue = {
  day: '',
  month: '',
  year: '',
}

function parseFormValue(
  value: GregorianDateFormValue,
): { date: GregorianDate } | { error: string } {
  if (value.day === '' || value.month === '' || value.year === '') {
    return { error: 'Veuillez remplir les trois champs : jour, mois et année.' }
  }

  const day = Number(value.day)
  const month = Number(value.month)
  const year = Number(value.year)

  if (!Number.isInteger(day) || !Number.isInteger(month) || !Number.isInteger(year)) {
    return { error: 'Le jour, le mois et l\'année doivent être des nombres entiers.' }
  }

  const date: GregorianDate = { day, month, year }
  const validationError = validateGregorianDate(date)
  if (validationError) {
    return { error: validationError.message }
  }

  return { date }
}

function todayAsFormValue(): GregorianDateFormValue {
  const today = new Date()
  return {
    day: String(today.getDate()),
    month: String(today.getMonth() + 1),
    year: String(today.getFullYear()),
  }
}

function dateToFormValue(date: GregorianDate): GregorianDateFormValue {
  return {
    day: String(date.day),
    month: String(date.month),
    year: String(date.year),
  }
}

function updateUrlDateParam(date: GregorianDate | null) {
  const url = new URL(window.location.href)
  if (date) {
    url.searchParams.set(DATE_URL_PARAM, formatDateForUrlParam(date))
  } else {
    url.searchParams.delete(DATE_URL_PARAM)
  }
  window.history.replaceState(null, '', url)
}

function App() {
  const [formValue, setFormValue] = useState<GregorianDateFormValue>(
    EMPTY_GREGORIAN_DATE_FORM_VALUE,
  )
  const [error, setError] = useState<string | null>(null)
  const [result, setResult] = useState<ConversionResult | null>(null)

  const convert = useCallback((value: GregorianDateFormValue) => {
    const parsed = parseFormValue(value)
    if ('error' in parsed) {
      setError(parsed.error)
      setResult(null)
      return
    }
    setError(null)
    setResult(convertGregorianToHijri(parsed.date))
    updateUrlDateParam(parsed.date)
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const dateParam = params.get(DATE_URL_PARAM)
    if (dateParam === null) {
      return
    }

    const parsedDate = parseDateFromUrlParam(dateParam)
    if (!parsedDate) {
      setError(
        `Le paramètre d'URL « ${DATE_URL_PARAM} » est invalide (format attendu : AAAA-MM-JJ).`,
      )
      return
    }

    const value = dateToFormValue(parsedDate)
    setFormValue(value)
    convert(value)
  }, [convert])

  function handleSubmit() {
    convert(formValue)
  }

  function handleToday() {
    const value = todayAsFormValue()
    setFormValue(value)
    convert(value)
  }

  function handleReset() {
    setFormValue(EMPTY_GREGORIAN_DATE_FORM_VALUE)
    setError(null)
    setResult(null)
    updateUrlDateParam(null)
  }

  return (
    <main className="app">
      <p className="brand">TOHIJRI</p>
      <h1>Convertir une date grégorienne en date hégirienne</h1>
      <p>
        Saisissez une date du calendrier grégorien pour obtenir son
        équivalent en date hégirienne, calculé entièrement dans votre
        navigateur selon le calendrier civil tabulaire.
      </p>
      <GregorianDateForm
        value={formValue}
        onValueChange={setFormValue}
        onSubmit={handleSubmit}
        onToday={handleToday}
        onReset={handleReset}
        error={error}
      />
      {result && <HijriResult result={result} />}
      <MethodExplanation />
    </main>
  )
}

export default App

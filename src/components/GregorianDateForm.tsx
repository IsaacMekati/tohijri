import { useId, type SubmitEvent } from 'react'
import { GREGORIAN_MONTHS_FR } from '../utils/formatGregorianDate'
import type { GregorianDateFormValue } from '../types/calendar'

type GregorianDateFormProps = {
  value: GregorianDateFormValue
  onValueChange: (value: GregorianDateFormValue) => void
  onSubmit: () => void
  onToday: () => void
  onReset: () => void
  error: string | null
}

function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1)
}

export function GregorianDateForm({
  value,
  onValueChange,
  onSubmit,
  onToday,
  onReset,
  error,
}: GregorianDateFormProps) {
  const dayId = useId()
  const monthId = useId()
  const yearId = useId()
  const errorId = useId()

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <label htmlFor={dayId}>Jour</label>
        <input
          id={dayId}
          name="day"
          type="number"
          inputMode="numeric"
          min={1}
          max={31}
          value={value.day}
          onChange={(event) => {
            onValueChange({ ...value, day: event.target.value })
          }}
          aria-invalid={error !== null}
          aria-describedby={error !== null ? errorId : undefined}
        />
      </div>

      <div className="form-row">
        <label htmlFor={monthId}>Mois</label>
        <select
          id={monthId}
          name="month"
          value={value.month}
          onChange={(event) => {
            onValueChange({ ...value, month: event.target.value })
          }}
          aria-invalid={error !== null}
          aria-describedby={error !== null ? errorId : undefined}
        >
          <option value="">Choisir un mois</option>
          {GREGORIAN_MONTHS_FR.map((name, index) => (
            <option key={name} value={index + 1}>
              {capitalize(name)}
            </option>
          ))}
        </select>
      </div>

      <div className="form-row">
        <label htmlFor={yearId}>Année</label>
        <input
          id={yearId}
          name="year"
          type="number"
          inputMode="numeric"
          min={1}
          max={9999}
          value={value.year}
          onChange={(event) => {
            onValueChange({ ...value, year: event.target.value })
          }}
          aria-invalid={error !== null}
          aria-describedby={error !== null ? errorId : undefined}
        />
      </div>

      {error !== null && (
        <p id={errorId} role="alert" className="form-error">
          {error}
        </p>
      )}

      <div className="form-actions">
        <button type="submit">Convertir</button>
        <button type="button" onClick={onToday}>
          Aujourd'hui
        </button>
        <button type="button" onClick={onReset}>
          Réinitialiser
        </button>
      </div>
    </form>
  )
}

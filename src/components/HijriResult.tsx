import { CopyButton } from './CopyButton'
import { formatGregorianDate } from '../utils/formatGregorianDate'
import { formatHijriDateAr, formatHijriDateFr } from '../utils/formatHijriDate'
import type { ConversionResult } from '../types/calendar'

type HijriResultProps = {
  result: ConversionResult
}

export function HijriResult({ result }: HijriResultProps) {
  const gregorianText = formatGregorianDate(result.gregorian)
  const hijriText = formatHijriDateFr(result.hijri)
  const hijriArabicText = formatHijriDateAr(result.hijri)
  const shareableText = `${gregorianText} correspond au ${hijriText} selon le calendrier hégirien civil tabulaire.`

  return (
    <section
      className="hijri-result"
      aria-live="polite"
      aria-label="Résultat de la conversion"
    >
      <div className="hijri-result-row">
        <h2>Date grégorienne</h2>
        <p>{gregorianText}</p>
      </div>

      <div className="hijri-result-row">
        <h2>Date hégirienne</h2>
        <p>{hijriText}</p>
      </div>

      <div className="hijri-result-row">
        <h2>Date en arabe</h2>
        <p className="hijri-result-arabic" lang="ar" dir="rtl">
          {hijriArabicText}
        </p>
      </div>

      <CopyButton text={shareableText} />
    </section>
  )
}

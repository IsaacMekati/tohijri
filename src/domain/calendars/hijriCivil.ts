import type { HijriDate } from '../../types/calendar'

/**
 * JDN du 1 Mouharram 1 H selon l'époque civile (dite "vendredi"), utilisée
 * par le calendrier hégirien civil tabulaire (`islamic-civil`). C'est
 * l'époque standard des bibliothèques calendaires (ICU, PHP `cal_from_jd`
 * avec `CAL_ISLAMIC`), à distinguer de l'époque astronomique
 * (`islamic`, "jeudi"), décalée d'un jour.
 */
const HIJRI_CIVIL_EPOCH_JULIAN_DAY = 1948440

/**
 * Position (1 à 30) de `year` dans le cycle tabulaire de 30 ans.
 */
function positionInThirtyYearCycle(year: number): number {
  return (((year - 1) % 30) + 30) % 30
}

/**
 * Une année hégirienne tabulaire est bissextile (dernier mois de 30 jours
 * au lieu de 29) pour 11 des 30 années du cycle : les années en position
 * 2, 5, 7, 10, 13, 16, 18, 21, 24, 26 et 29. Cette règle donne une durée
 * moyenne d'année de (19 × 354 + 11 × 355) / 30 = 354,3667 jours, proche de
 * la durée moyenne réelle de l'année lunaire.
 */
export function isLeapHijriYear(year: number): boolean {
  const position = positionInThirtyYearCycle(year) + 1
  return (11 * position + 14) % 30 < 11
}

/**
 * Convertit un numéro de jour julien en date hégirienne civile tabulaire.
 *
 * Les mois alternent en théorie 30 jours (mois impairs) et 29 jours (mois
 * pairs) ; le douzième mois (Dhou al-Hijja) compte 29 jours les années
 * communes et 30 jours les années bissextiles (voir `isLeapHijriYear`).
 *
 * L'algorithme ci-dessous (variante purement arithmétique du calcul du
 * calendrier civil tabulaire, sans dépendance à `Intl.DateTimeFormat` ni à
 * une bibliothèque de conversion) est équivalent à appliquer ces règles
 * mois par mois depuis l'époque, mais évite une boucle en résolvant
 * directement le cycle de 30 ans (n) et la position dans le cycle (j).
 */
export function julianDayToHijriCivil(julianDay: number): HijriDate {
  let l = julianDay - HIJRI_CIVIL_EPOCH_JULIAN_DAY + 10632
  const n = Math.floor((l - 1) / 10631)
  l = l - 10631 * n + 354

  const j =
    Math.floor((10985 - l) / 5316) * Math.floor((50 * l) / 17719) +
    Math.floor(l / 5670) * Math.floor((43 * l) / 15238)

  l =
    l -
    Math.floor((30 - j) / 15) * Math.floor((17719 * j) / 50) -
    Math.floor(j / 16) * Math.floor((15238 * j) / 43) +
    29

  const month = Math.floor((24 * l) / 709)
  const day = l - Math.floor((709 * month) / 24)
  const year = 30 * n + j - 30

  return { day, month, year }
}

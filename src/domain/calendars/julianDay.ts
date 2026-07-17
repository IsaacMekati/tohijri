import type { GregorianDate } from '../../types/calendar'

/**
 * Convertit une date du calendrier grégorien proleptique en numéro de jour
 * julien (JDN), via la formule de Fliegel & Van Flandern (1968).
 *
 * Convention : le résultat est le JDN entier (jour civil), pas le "Julian
 * Date" astronomique qui commence à midi UTC et comporte un décalage de 0.5.
 * Comme cette application ne manipule que des dates civiles (jour entier,
 * sans heure), l'entier retourné suffit et aucun ajustement de 0.5 n'est
 * nécessaire nulle part dans le moteur de conversion.
 *
 * La formule est purement mathématique : elle s'applique uniformément à
 * toutes les années (y compris avant 1582), ce qui correspond à
 * l'interprétation proleptique demandée pour les dates occidentales
 * antérieures à l'adoption historique du calendrier grégorien.
 *
 * Les divisions entières utilisent la troncature vers zéro (`Math.trunc`),
 * comme dans la formule originale : avec `Math.floor`, le terme
 * `(month - 14) / 12` — toujours négatif — serait arrondi différemment et
 * décalerait le résultat de plusieurs jours.
 */
export function gregorianToJulianDay(date: GregorianDate): number {
  const { day, month, year } = date

  const a = Math.trunc((month - 14) / 12)
  const jdn =
    Math.trunc((1461 * (year + 4800 + a)) / 4) +
    Math.trunc((367 * (month - 2 - 12 * a)) / 12) -
    Math.trunc((3 * Math.trunc((year + 4900 + a) / 100)) / 4) +
    day -
    32075

  return jdn
}

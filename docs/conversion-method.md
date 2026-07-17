# Méthode de conversion

TOHIJRI convertit une date grégorienne en date hégirienne selon le principe :

```
Date grégorienne → numéro de jour julien (JDN) → date hégirienne civile tabulaire
```

Le calcul est entièrement déterministe et ne dépend ni du fuseau horaire local,
ni de `Intl.DateTimeFormat`, ni de l'objet `Date` de JavaScript.

## 1. Grégorien → jour julien

Implémenté dans [`src/domain/calendars/julianDay.ts`](../src/domain/calendars/julianDay.ts),
via la formule de Fliegel & Van Flandern (1968). Cette formule est purement
arithmétique : elle s'applique de façon identique à toutes les années,
y compris avant 1582, ce qui correspond à l'interprétation **proleptique**
du calendrier grégorien demandée pour les dates occidentales anciennes.

Le JDN retourné est un entier représentant le jour civil (pas la « date
julienne » astronomique, qui commence à midi UTC et comporte un décalage
de 0,5). Comme l'application ne manipule que des jours entiers, aucun
ajustement de 0,5 n'intervient nulle part dans le moteur.

Point d'implémentation important : les divisions entières de la formule
utilisent la troncature vers zéro (`Math.trunc`) et non `Math.floor`, car le
terme `(mois − 14) / 12` est toujours négatif ; `Math.floor` y introduirait
un décalage de plusieurs jours sur le résultat final.

## 2. Jour julien → hégirien civil tabulaire

Implémenté dans [`src/domain/calendars/hijriCivil.ts`](../src/domain/calendars/hijriCivil.ts).

- **Époque** : JDN 1948440, correspondant au 1 Mouharram 1 H selon l'époque
  civile (dite « du vendredi »), utilisée par ICU et la plupart des
  bibliothèques calendaires (`islamic-civil`), à distinguer de l'époque
  astronomique (`islamic`, dite « du jeudi »), décalée d'un jour.
- **Cycle tabulaire de 30 ans** : l'algorithme résout directement le numéro
  de cycle de 30 ans et la position dans ce cycle, ce qui équivaut à
  dérouler les règles ci-dessous mois par mois depuis l'époque.
- **Années bissextiles hégiriennes** : 11 années sur 30 sont bissextiles,
  aux positions 2, 5, 7, 10, 13, 16, 18, 21, 24, 26 et 29 du cycle. Cela
  donne une durée moyenne d'année de (19 × 354 + 11 × 355) / 30 ≈ 354,3667
  jours, proche de la durée moyenne réelle de l'année lunaire.
- **Alternance des mois** : en théorie, les mois impairs comptent 30 jours
  et les mois pairs 29 jours.
- **Dernier mois (Dhou al-Hijja)** : 29 jours les années communes, 30 jours
  les années bissextiles (au lieu de suivre l'alternance générale, puisque
  c'est le 12ᵉ mois, pair).

Cette méthode **n'utilise pas** `Intl.DateTimeFormat` ni de bibliothèque de
conversion externe.

## Limites

Le calendrier civil tabulaire est une approximation arithmétique fixe. Il
peut différer d'un jour de la date retenue par l'observation locale du
croissant lunaire ; il ne prétend pas reconstituer avec certitude
l'observation historique.

## Provenance des dates de référence utilisées dans les tests

Les dates de référence sont regroupées dans
[`src/tests/referenceDates.ts`](../src/tests/referenceDates.ts).

| Référence | Valeur | Provenance |
|---|---|---|
| `j2000` | 1er janvier 2000 → JDN 2 451 545 | Époque astronomique J2000.0, valeur de JDN largement documentée en astronomie et en calcul calendaire. |
| `unixEpoch` | 1er janvier 1970 → JDN 2 440 588 | Époque Unix. |
| `gregorianReform` | 15 octobre 1582 → JDN 2 299 161 | Premier jour du calendrier grégorien lors de son adoption historique (le calendrier julien s'arrêtait au 4 octobre 1582). |
| `dayBeforeGregorianReform` | 4 octobre 1582 → JDN 2 299 150 | Même date que ci-dessus, mais interprétée selon le calendrier **grégorien proleptique** (11 jours avant le 15 octobre 1582 en grégorien proleptique, alors qu'historiquement cette date correspondait au calendrier julien) — sert à vérifier l'interprétation proleptique exigée par la spécification. |
| `hijriCivilEpoch` | JDN 1 948 440 → 1 Mouharram 1 H | Époque civile (« du vendredi ») du calendrier hégirien tabulaire, constante standard des bibliothèques calendaires (ICU, `cal_from_jd`/`CAL_ISLAMIC` de PHP, etc.). Vérifiée manuellement par déroulement pas à pas de l'algorithme. |
| `planExample` | 2 septembre 1740 → 10 Joumada ath-thania 1153 H | Exemple donné dans la spécification du projet TOHIJRI (étape « Affichage du résultat »). Recalculé et confirmé par le moteur de conversion complet (JDN 2 356 827). |

Les autres cas de test (changement de mois/année, dates modernes,
stabilité, etc.) utilisent des dates arbitraires choisies pour couvrir ces
scénarios, et sont vérifiés par recoupement avec une formule inverse
indépendante du calendrier hégirien civil tabulaire (voir
`referenceHijriCivilToJulianDay` dans
[`src/tests/hijriCivil.test.ts`](../src/tests/hijriCivil.test.ts)), plutôt
que par des résultats attendus inventés.

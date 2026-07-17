export function MethodExplanation() {
  return (
    <details className="method-explanation">
      <summary>Comment la date est-elle calculée ?</summary>
      <p>Cette conversion utilise le calendrier hégirien civil tabulaire.</p>
      <p>
        Les mois et les années sont calculés à partir de règles
        mathématiques fixes. Le résultat peut différer d'un jour de la date
        retenue selon l'observation locale du croissant lunaire.
      </p>
      <p>
        Les dates occidentales sont interprétées selon le calendrier
        grégorien proleptique, y compris pour les périodes antérieures à son
        adoption historique.
      </p>
    </details>
  )
}

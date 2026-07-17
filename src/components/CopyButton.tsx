import { useState } from 'react'

type CopyButtonProps = {
  text: string
}

type CopyStatus = 'idle' | 'copied' | 'error'

export function CopyButton({ text }: CopyButtonProps) {
  const [status, setStatus] = useState<CopyStatus>('idle')

  function handleClick() {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setStatus('copied')
      })
      .catch(() => {
        setStatus('error')
      })
      .finally(() => {
        setTimeout(() => {
          setStatus('idle')
        }, 2000)
      })
  }

  const label =
    status === 'copied'
      ? 'Copié !'
      : status === 'error'
        ? 'Échec de la copie'
        : 'Copier le résultat'

  return (
    <button type="button" onClick={handleClick} aria-live="polite">
      {label}
    </button>
  )
}

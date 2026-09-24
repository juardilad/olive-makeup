import { useState } from 'react'
import { shadeFinderGuide } from '../data/flagship'
import Icon from './Icon'

// Heurística 6 (Reconocimiento antes que recuerdo): en vez de obligar a la
// usuaria a recordar códigos de tono de otras marcas, le mostramos opciones
// reconocibles ("piel clara con subtono rosado") y traducimos a nuestro tono.
export default function ShadeFinder({ onSuggest }) {
  const [open, setOpen] = useState(false)
  const [picked, setPicked] = useState(null)

  const handlePick = (row) => {
    setPicked(row.skinTone)
    onSuggest(row.suggested)
  }

  return (
    <div className="rounded-2xl border border-olive-200 bg-cream-200/60 p-4">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between touch-target"
      >
        <span className="flex items-center gap-2 font-semibold text-olive-900 text-sm sm:text-base">
          <Icon name="search" className="w-4 h-4 text-olive-500" />
          ¿No sabes tu tono? Usa el Shade Finder
        </span>
        <Icon name="chevronDown" className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="mt-3 space-y-2">
          <p className="text-xs text-olive-500">Elige la descripción que más se parezca a tu piel:</p>
          <div className="flex flex-col gap-1.5">
            {shadeFinderGuide.map((row) => (
              <button
                key={row.skinTone}
                onClick={() => handlePick(row)}
                className={`text-left text-sm px-3 py-2 rounded-lg border transition-colors touch-target ${
                  picked === row.skinTone
                    ? 'border-olive-700 bg-olive-700/10 text-olive-950 font-medium'
                    : 'border-olive-200 hover:border-olive-500 text-olive-900'
                }`}
              >
                {row.skinTone}
              </button>
            ))}
          </div>
          {picked && (
            <p className="text-xs text-olive-700 font-medium flex items-center gap-1.5 pt-1">
              <Icon name="check" className="w-3.5 h-3.5" />
              Tonos resaltados abajo — pruébalos primero.
            </p>
          )}
        </div>
      )}
    </div>
  )
}

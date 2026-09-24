import { useState } from 'react'
import { flagshipProduct } from '../data/flagship'
import Icon from './Icon'

// Heurística "Coincidencia entre el sistema y el mundo real": traducimos
// nombres INCI técnicos a beneficios cotidianos.
// Ley del Cierre: bloques conceptuales delimitados por bordes suaves.
export default function IngredientsAccordion() {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="formula" className="bg-cream-200 border-y border-olive-200 scroll-mt-16">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <p className="text-xs font-semibold tracking-wide uppercase text-olive-500 text-center">Fórmula sin secretos</p>
        <h2 className="font-display text-3xl sm:text-4xl text-olive-950 text-center mt-1">
          Qué te estás aplicando en el rostro
        </h2>
        <p className="text-olive-700 text-center mt-3 max-w-xl mx-auto">
          Traducimos cada ingrediente clave de {flagshipProduct.fullName} a lenguaje cotidiano — sin
          jerga química indescifrable.
        </p>

        <div className="mt-8 space-y-3">
          {flagshipProduct.ingredients.map((ing, i) => {
            const open = openIndex === i
            return (
              <div key={ing.inci} className="rounded-2xl border border-olive-200 bg-cream-100 overflow-hidden">
                <button
                  onClick={() => setOpenIndex(open ? -1 : i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left touch-target"
                >
                  <span className="font-semibold text-olive-950">{ing.inci}</span>
                  <Icon name="chevronDown" className={`w-4 h-4 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
                </button>
                {open && <p className="px-5 pb-4 text-olive-700 text-sm leading-relaxed">{ing.benefit}</p>}
              </div>
            )
          })}
        </div>

        <p className="text-xs text-olive-500 text-center mt-6 italic">
          Lista de ingredientes de referencia — antes de publicar, valida el INCI completo del lote actual con
          el fabricante.
        </p>
      </div>
    </section>
  )
}

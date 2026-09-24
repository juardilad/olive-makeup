import { useState } from 'react'
import Icon from './Icon'

// Heurística "Ayuda y documentación": respuestas concisas y enfocadas en
// tareas concretas, sin necesidad de manual.
const FAQS = [
  {
    q: '¿Qué pasa si el tono de mi base no me queda?',
    a: 'Escríbenos por WhatsApp con tu foto y el tono que recibiste: te lo cambiamos 100% gratis dentro de los primeros días de recibido.',
  },
  {
    q: '¿Cómo hago mi pedido?',
    a: 'Agrega los productos a tu bolsa y presiona "Enviar pedido por WhatsApp". Se abre un chat con el resumen ya redactado para confirmar disponibilidad, pago y envío.',
  },
  {
    q: '¿Cuánto tarda el envío?',
    a: 'Los tiempos de entrega varían según tu ciudad. Te confirmamos el tiempo estimado exacto por WhatsApp antes de despachar.',
  },
  {
    q: '¿Las fotos de los tonos son reales?',
    a: 'Sí. Las tiras de swatches que ves en cada ficha vienen directo del catálogo fotografiado, sin filtros de edición ni retoque de color.',
  },
  {
    q: '¿Puedo cambiar de producto (no solo de tono)?',
    a: 'Sí, dentro de la política de cambios vigente. Cuéntanos tu caso por WhatsApp y te orientamos según el estado del producto.',
  },
]

export default function FAQAccordion() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="max-w-3xl mx-auto px-4 py-16 scroll-mt-16">
      <p className="text-xs font-semibold tracking-wide uppercase text-olive-500 text-center">Ayuda</p>
      <h2 className="font-display text-3xl sm:text-4xl text-olive-950 text-center mt-1 mb-8">Preguntas frecuentes</h2>

      <div className="space-y-3">
        {FAQS.map((f, i) => {
          const isOpen = open === i
          return (
            <div key={f.q} className="rounded-2xl border border-olive-200 bg-cream-100 overflow-hidden">
              <button
                onClick={() => setOpen(isOpen ? -1 : i)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left touch-target"
                aria-expanded={isOpen}
              >
                <span className="font-semibold text-olive-950">{f.q}</span>
                <Icon name="chevronDown" className={`w-4 h-4 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              {isOpen && <p className="px-5 pb-4 text-olive-700 text-sm leading-relaxed">{f.a}</p>}
            </div>
          )
        })}
      </div>
    </section>
  )
}

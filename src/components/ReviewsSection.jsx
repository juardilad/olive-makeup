import { useMemo, useState } from 'react'
import { sampleReviews, SKIN_TYPES, AGE_RANGES, SKIN_TONES } from '../data/reviews'
import Icon from './Icon'

// Heurística "Flexibilidad y eficiencia de uso": filtros avanzados por tipo
// de piel, edad y tono para que cada usuaria encuentre reseñas de pieles
// parecidas a la suya. Ley de Continuidad: carrusel horizontal fluido.
export default function ReviewsSection() {
  const [skinType, setSkinType] = useState('Todos')
  const [ageRange, setAgeRange] = useState('Todos')
  const [skinTone, setSkinTone] = useState('Todos')

  const filtered = useMemo(() => {
    return sampleReviews.filter(
      (r) =>
        (skinType === 'Todos' || r.skinType === skinType) &&
        (ageRange === 'Todos' || r.ageRange === ageRange) &&
        (skinTone === 'Todos' || r.skinTone === skinTone),
    )
  }, [skinType, ageRange, skinTone])

  const avg = (sampleReviews.reduce((s, r) => s + r.rating, 0) / sampleReviews.length).toFixed(1)

  return (
    <section id="resenas" className="max-w-7xl mx-auto px-4 py-16 scroll-mt-16">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <p className="text-xs font-semibold tracking-wide uppercase text-olive-500">Prueba social</p>
          <h2 className="font-display text-3xl sm:text-4xl text-olive-950">Lo que dicen compradoras reales</h2>
          <div className="flex items-center gap-2 mt-2">
            <div className="flex text-gold-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Icon key={i} name="star" filled className="w-4 h-4" />
              ))}
            </div>
            <span className="font-semibold text-olive-950">{avg}/5</span>
            <span className="text-sm text-olive-500">· {sampleReviews.length} reseñas</span>
          </div>
        </div>
        <p className="text-xs text-olive-500 italic max-w-xs">
          * Reseñas de ejemplo para mostrar el diseño — reemplázalas por reseñas reales de tus clientas antes de
          publicar.
        </p>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-4 mb-6 p-4 rounded-2xl bg-cream-200 border border-olive-200">
        <FilterGroup label="Tipo de piel" options={SKIN_TYPES} value={skinType} onChange={setSkinType} />
        <FilterGroup label="Edad" options={AGE_RANGES} value={ageRange} onChange={setAgeRange} />
        <FilterGroup label="Tono de piel" options={SKIN_TONES} value={skinTone} onChange={setSkinTone} />
      </div>

      {filtered.length === 0 ? (
        <p className="text-olive-500 text-center py-10">No hay reseñas con esos filtros todavía.</p>
      ) : (
        <div className="flex gap-4 overflow-x-auto scrollbar-none pb-3 -mx-1 px-1 snap-x">
          {filtered.map((r) => (
            <article
              key={r.id}
              className="snap-start shrink-0 w-[280px] sm:w-[320px] rounded-2xl border border-olive-200 bg-cream-100 p-5 flex flex-col gap-3"
            >
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-full bg-olive-700 text-white flex items-center justify-center font-semibold text-sm shrink-0">
                  {r.initials}
                </span>
                <div>
                  <p className="font-semibold text-olive-950 text-sm">{r.name}</p>
                  <span className="inline-flex items-center gap-1 text-[11px] text-olive-700 bg-olive-200 px-2 py-0.5 rounded-full">
                    <Icon name="check" className="w-3 h-3" />
                    Compra verificada
                  </span>
                </div>
              </div>
              <div className="flex text-gold-500">
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Icon key={i} name="star" filled className="w-3.5 h-3.5" />
                ))}
              </div>
              <p className="text-sm text-olive-700 leading-relaxed">{r.text}</p>
              <div className="mt-auto pt-2 border-t border-olive-200 text-[11px] text-olive-500 flex flex-wrap gap-x-3 gap-y-1">
                <span>{r.product}</span>
                {r.shade !== '—' && <span>· Tono {r.shade}</span>}
                <span>· Piel {r.skinType.toLowerCase()}</span>
                <span>· {r.ageRange} años</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

function FilterGroup({ label, options, value, onChange }) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-xs font-semibold text-olive-500 uppercase tracking-wide">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="touch-target text-sm rounded-full border border-olive-300 bg-cream-100 px-3 text-olive-900 focus:outline-none focus:border-olive-700"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  )
}

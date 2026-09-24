// Heurística "Flexibilidad y eficiencia de uso": salto rápido a cualquier
// categoría sin tener que hacer scroll manual por las 16 secciones.
export default function CategoryNav({ categories }) {
  const scrollTo = (slug) => {
    document.getElementById(slug)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="sticky top-16 z-30 bg-cream-100/95 backdrop-blur border-b border-olive-200">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex gap-2 overflow-x-auto scrollbar-none py-3">
          {categories.map((c) => (
            <button
              key={c.slug}
              onClick={() => scrollTo(c.slug)}
              className="shrink-0 touch-target px-4 rounded-full text-sm font-medium border border-olive-300 text-olive-700 hover:border-olive-700 hover:text-olive-900 transition-colors"
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

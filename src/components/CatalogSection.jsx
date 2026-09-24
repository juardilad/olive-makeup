import { useState } from 'react'
import ProductCard from './ProductCard'
import Lightbox from './Lightbox'
import Icon from './Icon'

function pagePath(n) {
  return `./catalog/page-${String(n).padStart(2, '0')}.jpg`
}

// Cada categoría muestra primero la(s) hoja(s) reales del catálogo (diseño
// original en Canva) como referencia visual fiel a marca, y debajo las
// tarjetas de producto interactivas generadas a partir del mismo texto real.
export default function CatalogSection({ category, products }) {
  const [zoomPage, setZoomPage] = useState(null)

  return (
    <div id={category.slug} className="scroll-mt-28">
      <div className="flex items-baseline justify-between gap-3 mb-4 flex-wrap">
        <h3 className="font-display text-2xl sm:text-3xl text-olive-950">{category.name}</h3>
        <span className="text-sm text-olive-500">{category.count} productos</span>
      </div>

      {category.pages.length > 0 && (
        <div className="flex gap-3 overflow-x-auto scrollbar-none pb-3 mb-5 -mx-1 px-1">
          {category.pages.map((p) => (
            <button
              key={p}
              onClick={() => setZoomPage(p)}
              className="relative shrink-0 w-24 sm:w-28 rounded-xl overflow-hidden border border-olive-200 hover:border-olive-500 transition-colors touch-target"
            >
              <img src={pagePath(p)} alt={`Hoja real del catálogo Olive Makeup — ${category.name}, página ${p}`} className="w-full h-auto" loading="lazy" />
              <span className="absolute bottom-1 right-1 bg-olive-950/80 text-white text-[10px] px-1.5 py-0.5 rounded-full flex items-center gap-1">
                <Icon name="zoom" className="w-2.5 h-2.5" />
              </span>
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      {zoomPage && (
        <Lightbox
          src={pagePath(zoomPage)}
          alt={`Hoja real del catálogo Olive Makeup — ${category.name}, página ${zoomPage}`}
          onClose={() => setZoomPage(null)}
        />
      )}
    </div>
  )
}

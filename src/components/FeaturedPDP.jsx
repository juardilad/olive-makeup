import { useMemo, useState } from 'react'
import { flagshipProduct } from '../data/flagship'
import { useCart, formatCOP } from '../context/CartContext'
import Icon from './Icon'
import ShadeFinder from './ShadeFinder'
import Lightbox from './Lightbox'

const UNDERTONES = [
  { key: 'frio', label: 'Frío', ring: 'ring-sky-400', dot: 'bg-sky-400' },
  { key: 'neutro', label: 'Neutro', ring: 'ring-olive-500', dot: 'bg-olive-500' },
  { key: 'calido', label: 'Cálido', ring: 'ring-amber-500', dot: 'bg-amber-500' },
]

export default function FeaturedPDP() {
  const { addItem } = useCart()
  const [undertone, setUndertone] = useState('todos')
  const [selectedShade, setSelectedShade] = useState(flagshipProduct.shades[0])
  const [highlighted, setHighlighted] = useState(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [added, setAdded] = useState(false)

  const visibleShades = useMemo(() => {
    if (undertone === 'todos') return flagshipProduct.shades
    return flagshipProduct.shades.filter((s) => s.undertone === undertone)
  }, [undertone])

  const handleAdd = () => {
    addItem({
      id: `${flagshipProduct.id}-${selectedShade.code}`,
      name: `${flagshipProduct.name} — Tono ${selectedShade.code} ${selectedShade.name}`,
      brand: flagshipProduct.brand,
      price: flagshipProduct.price,
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <section id="destacado" className="max-w-7xl mx-auto px-4 py-16 scroll-mt-16">
      <div className="flex items-end justify-between mb-6 flex-wrap gap-2">
        <div>
          <p className="text-xs font-semibold tracking-wide uppercase text-olive-500">Ficha de producto</p>
          <h2 className="font-display text-3xl sm:text-4xl text-olive-950">Producto destacado</h2>
        </div>
        <span className="text-xs sm:text-sm text-olive-500">Datos reales del catálogo · página {flagshipProduct.page}</span>
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        {/* ---------- COLUMNA IZQUIERDA: Galería (Proxemia: zoom macro a textura) ---------- */}
        <div>
          <button
            onClick={() => setLightboxOpen(true)}
            className="group relative block w-full rounded-2xl overflow-hidden border border-olive-200 shadow-card"
          >
            <img
              src={flagshipProduct.image}
              alt={`${flagshipProduct.fullName} — foto real sin filtros con tira de 10 swatches de tono`}
              className="w-full h-auto"
            />
            <span className="absolute bottom-3 right-3 bg-olive-950/80 text-white text-xs px-3 py-1.5 rounded-full flex items-center gap-1.5 opacity-90 group-hover:opacity-100">
              <Icon name="zoom" className="w-3.5 h-3.5" />
              Zoom / ver hoja completa del catálogo
            </span>
          </button>
          <p className="text-xs text-olive-500 mt-2 italic">
            * Swatches fotografiados directamente en piel, sin retoque ni filtro de iluminación artificial (Prevención de errores — Nielsen).
          </p>
        </div>

        {/* ---------- COLUMNA DERECHA: Info + selector de tono ---------- */}
        <div>
          <p className="text-sm font-semibold text-olive-500">{flagshipProduct.brand}</p>
          <h3 className="font-display text-2xl sm:text-3xl text-olive-950 mt-1">{flagshipProduct.fullName}</h3>

          <div className="flex items-center gap-2 mt-3">
            <div className="flex text-gold-500">
              {Array.from({ length: 5 }).map((_, i) => (
                <Icon key={i} name="star" filled className="w-4 h-4" />
              ))}
            </div>
            <span className="text-sm font-semibold text-olive-950">{flagshipProduct.rating}/5</span>
            <span className="text-sm text-olive-500">
              basado en +{flagshipProduct.reviewCount.toLocaleString('es-CO')} compras verificadas
            </span>
          </div>

          <p className="mt-4 text-olive-700 leading-relaxed">{flagshipProduct.description}</p>

          {/* Desglose de precio transparente (Prevención de errores) */}
          <div className="mt-5 flex items-baseline gap-3">
            <span className="font-display text-3xl text-olive-950">{formatCOP(flagshipProduct.price)}</span>
            <span className="text-sm text-olive-500">precio final, sin costos ocultos</span>
          </div>

          {/* Estado del sistema: el tono elegido se refleja de inmediato */}
          <div className="mt-7 rounded-2xl border border-olive-200 p-4 sm:p-5 bg-cream-200/50">
            <div className="flex items-center justify-between mb-3">
              <p className="font-semibold text-olive-950">
                Tono seleccionado:{' '}
                <span className="text-olive-700">
                  {selectedShade.code} · {selectedShade.name}
                </span>
              </p>
              <span
                className="w-8 h-8 rounded-full border-2 border-white shadow ring-1 ring-olive-200 shrink-0"
                style={{ backgroundColor: selectedShade.hex }}
                aria-hidden="true"
              />
            </div>

            {/* Ley de Semejanza: filtro por subtono con color identificador */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setUndertone('todos')}
                className={`touch-target px-3 rounded-full text-sm font-medium border transition-colors ${
                  undertone === 'todos' ? 'bg-olive-900 text-white border-olive-900' : 'border-olive-300 text-olive-700'
                }`}
              >
                Todos
              </button>
              {UNDERTONES.map((u) => (
                <button
                  key={u.key}
                  onClick={() => setUndertone(u.key)}
                  className={`touch-target px-3 rounded-full text-sm font-medium border flex items-center gap-1.5 transition-colors ${
                    undertone === u.key ? 'bg-olive-900 text-white border-olive-900' : 'border-olive-300 text-olive-700'
                  }`}
                >
                  <span className={`w-2.5 h-2.5 rounded-full ${u.dot}`} />
                  {u.label}
                </button>
              ))}
            </div>

            {/* Swatches interactivos */}
            <div className="grid grid-cols-5 gap-2.5">
              {visibleShades.map((s) => {
                const isActive = selectedShade.code === s.code
                const isSuggested = highlighted?.includes(s.code)
                const undertoneMeta = UNDERTONES.find((u) => u.key === s.undertone)
                return (
                  <button
                    key={s.code}
                    onClick={() => setSelectedShade(s)}
                    title={`${s.code} ${s.name}`}
                    className={`touch-target relative rounded-xl border-2 flex flex-col items-center justify-center gap-1 py-2 transition-all ${
                      isActive ? 'border-olive-900 scale-105 shadow-md' : 'border-transparent hover:border-olive-300'
                    } ${isSuggested ? `ring-2 ring-offset-1 ${undertoneMeta?.ring}` : ''}`}
                    style={{ backgroundColor: 'transparent' }}
                  >
                    <span className="w-8 h-8 rounded-full border border-black/10" style={{ backgroundColor: s.hex }} />
                    <span className="text-[10px] font-semibold text-olive-900">{s.code}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="mt-4">
            <ShadeFinder onSuggest={setHighlighted} />
          </div>

          {/* Garantía explícita */}
          <div className="mt-5 flex items-start gap-3 rounded-2xl bg-olive-900 text-cream-100 p-4">
            <Icon name="shield" className="w-6 h-6 text-gold-500 shrink-0 mt-0.5" />
            <p className="text-sm">
              <strong className="text-gold-500">Garantía de coincidencia de tono:</strong> si al recibirlo el tono no
              te queda, te lo cambiamos 100% gratis.
            </p>
          </div>

          {/* CTA — dentro de la "zona del pulgar" en móvil */}
          <button
            onClick={handleAdd}
            className="touch-target mt-6 w-full sm:w-auto sm:px-10 bg-olive-700 hover:bg-olive-500 transition-colors text-white font-semibold rounded-full flex items-center justify-center gap-2"
          >
            <Icon name="cart" className="w-5 h-5" />
            {added ? '¡Agregado a la bolsa!' : 'Añadir a la Bolsa'}
          </button>
        </div>
      </div>

      {lightboxOpen && (
        <Lightbox
          src={flagshipProduct.catalogSheet}
          alt="Hoja completa del catálogo Olive Makeup — categoría Bases"
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </section>
  )
}

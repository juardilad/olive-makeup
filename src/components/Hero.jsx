import Icon from './Icon'

// Ley de Figura y Fondo: el titular y CTA contrastan fuertemente contra el
// fondo crema; la foto de producto real (sin retoque) ancla la confianza.
// Ley de Prägnanz: mensaje único, limpio, sin ruido visual adicional.
export default function Hero({ onNavigate }) {
  return (
    <section className="bg-olive-900 text-cream-100">
      <div className="max-w-7xl mx-auto px-4 py-14 sm:py-20 grid lg:grid-cols-2 gap-10 items-center">
        <div>
          <span className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wide uppercase text-gold-500 bg-white/5 border border-gold-500/30 rounded-full px-3 py-1">
            +250 productos · catálogo verificado
          </span>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl leading-[1.05] mt-5">
            Maquillaje elegido con criterio, <span className="text-gold-500">confianza real.</span>
          </h1>
          <p className="mt-5 text-olive-200 text-base sm:text-lg max-w-lg">
            Curamos las mejores marcas de maquillaje en un solo catálogo. Swatches reales sin
            filtros, garantía de cambio de tono y atención directa por WhatsApp — sin sorpresas
            en el precio final.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('destacado')}
              className="touch-target inline-flex items-center gap-2 bg-olive-700 hover:bg-olive-500 transition-colors text-white font-semibold px-6 rounded-full"
            >
              Ver producto destacado
              <Icon name="chevronRight" className="w-4 h-4" />
            </button>
            <button
              onClick={() => onNavigate('catalogo')}
              className="touch-target inline-flex items-center gap-2 border border-cream-100/40 hover:border-gold-500 hover:text-gold-500 transition-colors font-semibold px-6 rounded-full"
            >
              Explorar catálogo completo
            </button>
          </div>
          <dl className="mt-10 grid grid-cols-3 gap-4 max-w-md">
            <div>
              <dt className="sr-only">Calificación</dt>
              <dd className="font-display text-2xl text-gold-500">4.9★</dd>
              <dd className="text-xs text-olive-200 mt-0.5">+1.200 compras verificadas</dd>
            </div>
            <div>
              <dt className="sr-only">Marcas</dt>
              <dd className="font-display text-2xl text-gold-500">25+</dd>
              <dd className="text-xs text-olive-200 mt-0.5">marcas seleccionadas</dd>
            </div>
            <div>
              <dt className="sr-only">Garantía</dt>
              <dd className="font-display text-2xl text-gold-500">100%</dd>
              <dd className="text-xs text-olive-200 mt-0.5">cambio de tono gratis</dd>
            </div>
          </dl>
        </div>

        <div className="relative mx-auto max-w-sm lg:max-w-none">
          <div className="absolute -inset-4 rounded-[2rem] bg-gold-500/10 blur-2xl" aria-hidden="true" />
          <div className="relative rounded-[1.75rem] overflow-hidden border border-olive-500/40 shadow-2xl bg-cream-100">
            <img
              src="./catalog/hero-bloomshell-base.jpg"
              alt="Base 2 en 1 Bloomshell con tira de swatches reales de 10 tonos, foto tomada directamente del catálogo Olive Makeup"
              className="w-full h-auto"
              loading="eager"
            />
          </div>
          <p className="text-center text-olive-300 text-xs mt-3 italic">
            Foto real del catálogo — sin edición de color ni filtros de iluminación.
          </p>
        </div>
      </div>
    </section>
  )
}

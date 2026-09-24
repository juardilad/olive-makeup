import { useState } from 'react'
import { useCart } from '../context/CartContext'
import Icon from './Icon'

// Heurística 4 (Consistencia y estándares — Ley de Jakob): logotipo a la
// izquierda, navegación central, acciones de cuenta/carrito a la derecha,
// tal como el usuario espera en cualquier tienda online.
export default function Header({ onNavigate }) {
  const { itemCount, openCart } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)

  const links = [
    { label: 'Catálogo', target: 'catalogo' },
    { label: 'Producto destacado', target: 'destacado' },
    { label: 'Fórmula', target: 'formula' },
    { label: 'Reseñas', target: 'resenas' },
    { label: 'Preguntas frecuentes', target: 'faq' },
  ]

  const go = (target) => {
    setMenuOpen(false)
    onNavigate(target)
  }

  return (
    <header className="sticky top-0 z-40 bg-cream-100/95 backdrop-blur border-b border-olive-200">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <button
          onClick={() => go('inicio')}
          className="flex items-center gap-2 font-display text-xl sm:text-2xl text-olive-900 touch-target"
        >
          <span className="inline-flex h-9 w-9 rounded-full bg-olive-900 items-center justify-center text-gold-500">
            <Icon name="leaf" className="w-5 h-5" />
          </span>
          Olive <span className="text-olive-500 font-semibold">Makeup</span>
        </button>

        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-olive-900">
          {links.map((l) => (
            <button key={l.target} onClick={() => go(l.target)} className="hover:text-olive-500 transition-colors">
              {l.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            aria-label="Buscar"
            className="touch-target inline-flex items-center justify-center rounded-full hover:bg-olive-200/60 transition-colors"
          >
            <Icon name="search" className="w-5 h-5 text-olive-900" />
          </button>
          <button
            aria-label="Mi cuenta"
            className="hidden sm:inline-flex touch-target items-center justify-center rounded-full hover:bg-olive-200/60 transition-colors"
          >
            <Icon name="user" className="w-5 h-5 text-olive-900" />
          </button>
          <button
            aria-label="Abrir carrito"
            onClick={openCart}
            className="relative touch-target inline-flex items-center justify-center rounded-full hover:bg-olive-200/60 transition-colors"
          >
            <Icon name="cart" className="w-5 h-5 text-olive-900" />
            {itemCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-olive-700 text-white text-[10px] font-bold flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>
          <button
            aria-label="Menú"
            onClick={() => setMenuOpen((v) => !v)}
            className="lg:hidden touch-target inline-flex items-center justify-center rounded-full hover:bg-olive-200/60 transition-colors"
          >
            <Icon name={menuOpen ? 'close' : 'filter'} className="w-5 h-5 text-olive-900" />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav className="lg:hidden border-t border-olive-200 bg-cream-100 px-4 py-3 flex flex-col gap-1">
          {links.map((l) => (
            <button
              key={l.target}
              onClick={() => go(l.target)}
              className="touch-target text-left px-2 rounded-lg hover:bg-olive-200/50 text-olive-900 font-medium"
            >
              {l.label}
            </button>
          ))}
        </nav>
      )}
    </header>
  )
}

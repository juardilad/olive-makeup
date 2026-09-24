import { useCart, formatCOP, FREE_SHIPPING_THRESHOLD } from '../context/CartContext'
import Icon from './Icon'

// Heurística 1 (Visibilidad del estado del sistema): barra persistente que
// informa en todo momento cuánto falta para el envío gratis.
// Ley de Proximidad: sellos de confianza agrupados junto al mensaje de envío.
export default function TopBar() {
  const { subtotal, amountToFreeShipping } = useCart()
  const progress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100)
  const unlocked = amountToFreeShipping === 0

  return (
    <div className="bg-olive-900 text-cream-100 text-xs sm:text-sm">
      <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col sm:flex-row items-center gap-1.5 sm:gap-6">
        <div className="flex items-center gap-2 font-medium w-full sm:w-auto">
          <Icon name="truck" className="w-4 h-4 shrink-0 text-gold-500" />
          <div className="flex-1 sm:flex-none">
            {unlocked ? (
              <span>¡Envío gratis desbloqueado en tu pedido! 🎉</span>
            ) : (
              <span>
                Agrega <strong className="text-gold-500">{formatCOP(amountToFreeShipping)}</strong> más para envío gratis
              </span>
            )}
            {/* Barra de progreso — Visibilidad del estado del sistema (Nielsen) */}
            <div className="h-1 w-full sm:w-40 rounded-full bg-olive-500/40 mt-1 overflow-hidden">
              <div
                className="h-full bg-gold-500 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
        <div className="hidden sm:block h-3 w-px bg-olive-500/60" />
        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-olive-200">
          <span className="flex items-center gap-1.5">
            <Icon name="shield" className="w-3.5 h-3.5 text-gold-500" />
            Dermatológicamente probado*
          </span>
          <span className="flex items-center gap-1.5">
            <Icon name="leaf" className="w-3.5 h-3.5 text-gold-500" />
            Cruelty-Free*
          </span>
          <span className="flex items-center gap-1.5">
            <Icon name="check" className="w-3.5 h-3.5 text-gold-500" />
            Garantía de cambio de tono
          </span>
        </div>
      </div>
    </div>
  )
}

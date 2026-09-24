import { useEffect } from 'react'
import { useCart, formatCOP } from '../context/CartContext'
import Icon from './Icon'

// Heurística "Control y libertad del usuario": carrito deslizante con
// edición instantánea de cantidades y cierre sin recargar la página.
// Ley de Simetría y Orden: resumen a la derecha, estructura en dos bloques
// claros (lista de productos / totales).
export default function CartDrawer() {
  const { items, isOpen, closeCart, updateQty, removeItem, subtotal, shipping, total, clearCart, whatsappCheckoutUrl, amountToFreeShipping } =
    useCart()

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => e.key === 'Escape' && closeCart()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, closeCart])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-olive-950/60" onClick={closeCart} aria-hidden="true" />
      <aside className="relative w-full sm:w-[420px] h-full bg-cream-100 shadow-2xl flex flex-col" role="dialog" aria-modal="true" aria-label="Carrito de compras">
        <header className="flex items-center justify-between px-5 py-4 border-b border-olive-200">
          <h2 className="font-display text-xl text-olive-950 flex items-center gap-2">
            <Icon name="cart" className="w-5 h-5" />
            Tu bolsa {items.length > 0 && `(${items.length})`}
          </h2>
          <button onClick={closeCart} aria-label="Cerrar carrito" className="touch-target rounded-full hover:bg-olive-200/60 flex items-center justify-center">
            <Icon name="close" className="w-5 h-5 text-olive-900" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center gap-3 text-olive-500">
              <Icon name="cart" className="w-10 h-10" />
              <p>Tu bolsa está vacía todavía.</p>
              <button onClick={closeCart} className="touch-target px-5 rounded-full bg-olive-900 text-white font-medium">
                Seguir explorando
              </button>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((item) => (
                <li key={item.id} className="flex gap-3 border-b border-olive-200 pb-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] uppercase tracking-wide text-gold-500 font-semibold">{item.brand}</p>
                    <p className="font-medium text-olive-950 text-sm leading-snug">{item.name}</p>
                    <p className="text-sm text-olive-700 mt-1">{formatCOP(item.price)}</p>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQty(item.id, item.qty - 1)}
                        aria-label="Restar cantidad"
                        className="w-8 h-8 rounded-full border border-olive-300 flex items-center justify-center hover:border-olive-700"
                      >
                        <Icon name="minus" className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-6 text-center text-sm font-semibold">{item.qty}</span>
                      <button
                        onClick={() => updateQty(item.id, item.qty + 1)}
                        aria-label="Sumar cantidad"
                        className="w-8 h-8 rounded-full border border-olive-300 flex items-center justify-center hover:border-olive-700"
                      >
                        <Icon name="plus" className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-auto text-xs text-terracotta-500 hover:underline touch-target"
                      >
                        Quitar
                      </button>
                    </div>
                  </div>
                  <span className="font-display text-sm text-olive-950 shrink-0">{formatCOP(item.price * item.qty)}</span>
                </li>
              ))}
              <button onClick={clearCart} className="text-xs text-olive-500 hover:text-terracotta-500 touch-target">
                Vaciar bolsa
              </button>
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <footer className="border-t border-olive-200 px-5 py-4 space-y-3 bg-cream-200/60">
            {amountToFreeShipping > 0 && (
              <p className="text-xs text-olive-700 bg-gold-500/15 border border-gold-500/30 rounded-lg px-3 py-2">
                Agrega <strong>{formatCOP(amountToFreeShipping)}</strong> más y el envío es gratis.
              </p>
            )}
            {/* Desglose total transparente ANTES de pedir datos — Prevención de errores */}
            <div className="text-sm space-y-1.5">
              <div className="flex justify-between text-olive-700">
                <span>Subtotal</span>
                <span>{formatCOP(subtotal)}</span>
              </div>
              <div className="flex justify-between text-olive-700">
                <span>Envío estimado</span>
                <span>{shipping === 0 ? 'Gratis' : formatCOP(shipping)}</span>
              </div>
              <div className="flex justify-between text-olive-950 font-semibold text-base pt-1.5 border-t border-olive-200">
                <span>Total</span>
                <span>{formatCOP(total)}</span>
              </div>
            </div>

            <a
              href={whatsappCheckoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="touch-target w-full flex items-center justify-center gap-2 bg-[#25D366] hover:brightness-95 text-white font-semibold rounded-full transition-all"
            >
              <Icon name="whatsapp" filled className="w-5 h-5" />
              Enviar pedido por WhatsApp
            </a>
            <p className="text-[11px] text-olive-500 text-center">
              Confirmamos disponibilidad, tono y forma de pago directamente en el chat.
            </p>
          </footer>
        )}
      </aside>
    </div>
  )
}

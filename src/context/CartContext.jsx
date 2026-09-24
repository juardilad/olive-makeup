import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)

const STORAGE_KEY = 'olive-makeup-cart'

// ⚠️ Reglas de negocio de ejemplo — ajústalas a las reales de Olive Makeup.
export const FREE_SHIPPING_THRESHOLD = 150000
export const STANDARD_SHIPPING_COST = 12000
export const WHATSAPP_NUMBER = '573203207930' // 57 = Colombia + número de portada del catálogo

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

const currency = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
})

export function formatCOP(value) {
  return currency.format(value).replace('COP', '$').trim()
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(loadCart)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      /* almacenamiento no disponible (modo privado) — el carrito sigue funcionando en memoria */
    }
  }, [items])

  const addItem = (product, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id)
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + qty } : i))
      }
      return [...prev, { id: product.id, name: product.name, brand: product.brand, price: product.price, qty }]
    })
    setIsOpen(true)
  }

  const removeItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id))

  const updateQty = (id, qty) => {
    if (qty <= 0) return removeItem(id)
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)))
  }

  const clearCart = () => setItems([])

  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.price * i.qty, 0), [items])
  const itemCount = useMemo(() => items.reduce((sum, i) => sum + i.qty, 0), [items])
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_COST
  const total = subtotal + shipping
  const amountToFreeShipping = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0)

  const whatsappCheckoutUrl = useMemo(() => {
    if (items.length === 0) return null
    const lines = [
      'Hola Olive Makeup 🌿, quiero hacer este pedido:',
      '',
      ...items.map((i) => `• ${i.qty}x ${i.name} (${i.brand}) — ${formatCOP(i.price * i.qty)}`),
      '',
      `Subtotal: ${formatCOP(subtotal)}`,
      shipping === 0 ? 'Envío: Gratis' : `Envío estimado: ${formatCOP(shipping)}`,
      `Total: ${formatCOP(total)}`,
      '',
      'Quedo atenta a la confirmación de disponibilidad y tiempos de entrega. ¡Gracias!',
    ]
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`
  }, [items, subtotal, shipping, total])

  const value = {
    items,
    addItem,
    removeItem,
    updateQty,
    clearCart,
    subtotal,
    shipping,
    total,
    itemCount,
    amountToFreeShipping,
    isOpen,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    whatsappCheckoutUrl,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart debe usarse dentro de <CartProvider>')
  return ctx
}

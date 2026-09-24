import { useCart, formatCOP } from '../context/CartContext'
import Icon from './Icon'

// Ley del Cierre: tarjeta delimitada por borde suave oliva (#D0D8C8).
// Heurística "Reconocimiento antes que recuerdo": nombre, marca y precio
// visibles de un vistazo, sin necesidad de abrir el producto para decidir.
export default function ProductCard({ product }) {
  const { addItem } = useCart()

  return (
    <article className="group rounded-2xl border border-olive-200 bg-cream-100 p-4 flex flex-col gap-2 hover:border-olive-500 hover:shadow-card transition-all">
      <div className="flex items-start justify-between gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-wide text-gold-500">{product.brand}</span>
        {product.tones && (
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-olive-200 text-olive-900 font-medium shrink-0">
            Tono {product.tones}
          </span>
        )}
      </div>
      <h4 className="font-semibold text-olive-950 text-sm leading-snug min-h-[2.5rem]">{product.name}</h4>
      <div className="mt-auto flex items-center justify-between pt-2">
        <span className="font-display text-lg text-olive-950">{formatCOP(product.price)}</span>
        <button
          onClick={() => addItem(product)}
          aria-label={`Añadir ${product.name} a la bolsa`}
          className="w-12 h-12 rounded-full bg-olive-900 group-hover:bg-olive-700 text-white flex items-center justify-center transition-colors shrink-0"
        >
          <Icon name="plus" className="w-4 h-4" />
        </button>
      </div>
    </article>
  )
}

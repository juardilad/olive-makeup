import { useMemo } from 'react'
import { categories, products } from '../data/products'
import CategoryNav from './CategoryNav'
import CatalogSection from './CatalogSection'

export default function CatalogBrowser() {
  const grouped = useMemo(() => {
    return categories.map((cat) => ({
      category: cat,
      products: products.filter((p) => p.categorySlug === cat.slug),
    }))
  }, [])

  return (
    <section id="catalogo" className="scroll-mt-16">
      <div className="max-w-7xl mx-auto px-4 pt-14">
        <p className="text-xs font-semibold tracking-wide uppercase text-olive-500 text-center">Catálogo completo</p>
        <h2 className="font-display text-3xl sm:text-4xl text-olive-950 text-center mt-1">
          {products.length}+ productos, {categories.length} categorías
        </h2>
        <p className="text-olive-700 text-center mt-3 max-w-2xl mx-auto">
          Cada tarjeta viene directo del catálogo real de Olive Makeup — toca el ícono de zoom en
          cualquier categoría para ver la hoja original diseñada, con fotos y swatches sin editar.
        </p>
      </div>

      <CategoryNav categories={categories} />

      <div className="max-w-7xl mx-auto px-4 py-10 space-y-14">
        {grouped.map(({ category, products: catProducts }) => (
          <CatalogSection key={category.slug} category={category} products={catProducts} />
        ))}
      </div>
    </section>
  )
}

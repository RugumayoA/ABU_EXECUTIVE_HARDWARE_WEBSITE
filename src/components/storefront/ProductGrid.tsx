import type { Product } from '../../types/product'
import { ProductCard } from './ProductCard'

type ProductGridProps = {
  products: Product[]
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-brand-200 bg-brand-50/50 py-16 text-center">
        <p className="font-semibold text-brand-900">No products match your filters</p>
        <p className="mt-2 text-sm text-brand-700">Try a different search or category.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  )
}

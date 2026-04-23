import type { Product } from '../../types/product'
import { formatUgx } from '../../utils/formatUgx'

type ProductCardProps = {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border border-brand-100 bg-white shadow-sm transition hover:border-brand-200 hover:shadow-md">
      <div className="relative aspect-square overflow-hidden bg-brand-50">
        <img
          src={product.imageUrl}
          alt=""
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
        <span className="absolute left-1.5 top-1.5 rounded-full bg-white/95 px-1.5 py-0.5 text-[10px] font-bold text-brand-800 shadow-sm ring-1 ring-brand-100">
          {product.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-2.5">
        <h3 className="text-xs font-bold leading-snug text-brand-900">{product.name}</h3>
        <p className="mt-1 text-lg font-bold text-brand-800">
          {formatUgx(product.price)}
        </p>
        <p className="mt-1 line-clamp-2 flex-1 text-[11px] leading-relaxed text-brand-800/75">
          {product.description}
        </p>
      </div>
    </article>
  )
}

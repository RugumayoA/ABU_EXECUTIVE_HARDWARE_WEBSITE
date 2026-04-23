import { useMemo, useState } from 'react'
import type { Product } from '../../types/product'
import { formatUgx } from '../../utils/formatUgx'

type ProductTableProps = {
  products: Product[]
  onEdit: (p: Product) => void
  onDelete: (id: string) => void
}

export function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    if (!query) return products

    const tokens = query.split(/\s+/).filter(Boolean)
    return products.filter((p) => {
      const searchable = [
        p.name,
        p.category,
        p.description,
        String(p.price),
        formatUgx(p.price),
      ]
        .join(' ')
        .toLowerCase()

      // Require every typed term to match somewhere in the row.
      return tokens.every((token) => searchable.includes(token))
    })
  }, [products, searchQuery])

  return (
    <div className="rounded-2xl border border-brand-100 bg-white shadow-sm overflow-hidden">
      <div className="border-b border-brand-100 px-4 py-4 sm:px-6">
        <h2 className="text-lg font-bold text-brand-900">Inventory</h2>
        <p className="text-sm text-brand-700">{filteredProducts.length} products</p>
        <div className="mt-3">
          <label htmlFor="inventory-search" className="sr-only">
            Search inventory
          </label>
          <input
            id="inventory-search"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, category, description, or price"
            className="w-full rounded-xl border border-brand-200 px-4 py-2.5 text-sm outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-200"
          />
        </div>
      </div>

      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-brand-50 text-xs font-bold uppercase tracking-wide text-brand-800">
            <tr>
              <th className="px-6 py-3">Image</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Description</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-brand-100">
            {filteredProducts.map((p) => (
              <tr key={p.id} className="bg-white hover:bg-brand-50/50">
                <td className="px-6 py-3">
                  <img
                    src={p.imageUrl}
                    alt=""
                    className="h-12 w-16 rounded-lg object-cover border border-brand-100"
                  />
                </td>
                <td className="px-6 py-3 font-semibold text-brand-900">{p.name}</td>
                <td className="px-6 py-3 text-brand-800">{formatUgx(p.price)}</td>
                <td className="px-6 py-3 text-brand-700">{p.category}</td>
                <td className="max-w-xs truncate px-6 py-3 text-brand-700">
                  {p.description}
                </td>
                <td className="px-6 py-3 text-right">
                  <button
                    type="button"
                    onClick={() => onEdit(p)}
                    className="mr-2 font-semibold text-brand-800 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(p.id)}
                    className="font-semibold text-red-700 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="divide-y divide-brand-100 md:hidden">
        {filteredProducts.map((p) => (
          <li key={p.id} className="p-4">
            <div className="flex gap-3">
              <img
                src={p.imageUrl}
                alt=""
                className="h-20 w-24 shrink-0 rounded-lg object-cover border border-brand-100"
              />
              <div className="min-w-0 flex-1">
                <p className="font-bold text-brand-900">{p.name}</p>
                <p className="text-sm font-semibold text-brand-800">{formatUgx(p.price)}</p>
                <p className="text-xs font-medium text-brand-600">{p.category}</p>
                <p className="mt-1 line-clamp-2 text-xs text-brand-700">{p.description}</p>
                <div className="mt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => onEdit(p)}
                    className="text-sm font-semibold text-brand-800"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(p.id)}
                    className="text-sm font-semibold text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {filteredProducts.length === 0 ? (
        <p className="px-4 py-6 text-sm text-brand-700 sm:px-6">No products match your search.</p>
      ) : null}
    </div>
  )
}

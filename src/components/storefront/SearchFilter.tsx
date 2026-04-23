import { PRODUCT_CATEGORIES } from '../../constants/categories'

type SearchFilterProps = {
  searchQuery: string
  onSearchChange: (q: string) => void
  category: string
  onCategoryChange: (c: string) => void
}

export function SearchFilter({
  searchQuery,
  onSearchChange,
  category,
  onCategoryChange,
}: SearchFilterProps) {
  return (
    <div className="rounded-lg border border-zinc-200 bg-white p-4 shadow-sm sm:p-6">
      <h2 className="text-lg font-bold text-brand-900">Find products</h2>
      <p className="mt-1 text-sm text-brand-700">
        Search by name or description and narrow results by category.
      </p>
      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label htmlFor="filter-search" className="block text-xs font-semibold text-brand-800">
            Search
          </label>
          <input
            id="filter-search"
            type="search"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="mt-1 w-full rounded-xl border border-brand-200 bg-brand-50/30 px-4 py-2.5 text-sm text-brand-900 outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-200"
 placeholder="e.g. hammer, cement, drill…"
          />
        </div>
        <div className="sm:w-56">
          <label htmlFor="filter-cat" className="block text-xs font-semibold text-brand-800">
            Category
          </label>
          <select
            id="filter-cat"
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            className="mt-1 w-full rounded-xl border border-brand-200 bg-white px-4 py-2.5 text-sm font-medium text-brand-900 outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-200"
          >
            {PRODUCT_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

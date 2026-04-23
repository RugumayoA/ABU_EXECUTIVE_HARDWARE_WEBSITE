import { useMemo, useState } from 'react'
import { SiteLayout } from '../components/layout/SiteLayout'
import { Hero } from '../components/storefront/Hero'
import { LandingPulse } from '../components/storefront/LandingPulse'
import { LandingShowcase } from '../components/storefront/LandingShowcase'
import { SearchFilter } from '../components/storefront/SearchFilter'
import { ProductGrid } from '../components/storefront/ProductGrid'
import { useProducts } from '../context/ProductContext'

export function HomePage() {
  const { products, loading, error, isRemote, refetch } = useProducts()
  const [searchQuery, setSearchQuery] = useState('')
  const [category, setCategory] = useState('All')

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    return products
      .filter((p) => {
        const catOk = category === 'All' || p.category === category
        if (!catOk) return false
        if (!q) return true
        return (
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
        )
      })
      .sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }))
  }, [products, searchQuery, category])

  return (
    <SiteLayout searchQuery={searchQuery} onSearchChange={setSearchQuery}>
      <Hero onCategorySelect={setCategory} />
      <LandingPulse />

      <div className="border-y border-zinc-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 text-center">
          <h2 className="font-black uppercase tracking-tight text-brand-900 text-3xl sm:text-4xl md:text-5xl [text-shadow:1px_1px_0_rgba(22,101,52,0.15)]">
            Local hardware shopping
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-zinc-600">
            We serve customers in-store — browse the catalog below, then visit us to buy. No
            nationwide shipping yet.
          </p>
        </div>
      </div>

      <LandingShowcase onPickCategory={setCategory} />

      <div className="mx-auto max-w-7xl space-y-8 px-4 py-10">
        <section id="shop" className="scroll-mt-28">
          <SearchFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            category={category}
            onCategoryChange={setCategory}
          />
        </section>

        <div>
          <h2 className="text-2xl font-bold text-brand-900">Featured products</h2>
          <p className="mt-1 text-sm text-zinc-600">
            Showing {filtered.length} of {products.length} items
          </p>
          {loading && isRemote ? (
            <p className="mt-6 text-center text-sm text-zinc-600">Loading catalog…</p>
          ) : null}
          {error && isRemote ? (
            <div className="mt-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-center text-sm text-red-800">
              <p>{error}</p>
              <button
                type="button"
                onClick={() => void refetch()}
                className="mt-2 font-bold underline"
              >
                Retry
              </button>
            </div>
          ) : null}
          {!(loading && isRemote) && !(error && isRemote) ? (
            <div className="mt-6">
              <ProductGrid products={filtered} />
            </div>
          ) : null}
        </div>
      </div>
    </SiteLayout>
  )
}

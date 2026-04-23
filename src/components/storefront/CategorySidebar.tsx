import { useEffect, useRef, useState } from 'react'
import { SIDEBAR_CATEGORIES } from '../../constants/sidebarCategories'

type CategorySidebarProps = {
  selectedFilter: string
  onSelect: (filter: string) => void
}

export function CategorySidebar({ selectedFilter, onSelect }: CategorySidebarProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLElement>(null)
  const listId = 'category-menu-panel'

  const selectedLabel =
    SIDEBAR_CATEGORIES.find((c) => c.filter === selectedFilter)?.label ?? 'Categories'

  useEffect(() => {
    if (!open) return
    function onDocMouseDown(e: MouseEvent) {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDocMouseDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDocMouseDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  function choose(filter: string) {
    onSelect(filter)
    setOpen(false)
    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <aside ref={rootRef} className="relative z-30 w-full shrink-0 lg:w-64">
      <button
        type="button"
        id="category-menu-button"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-controls={listId}
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-2 rounded-lg border border-zinc-200 bg-brand-700 px-4 py-3 text-left shadow-sm transition hover:bg-brand-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <span className="min-w-0 flex-1">
          <span className="block text-xs font-extrabold uppercase tracking-widest text-white/90">
            Categories
          </span>
          <span className="mt-0.5 block truncate text-sm font-bold text-white sm:text-base">
            {selectedFilter === 'All' ? 'All departments' : selectedLabel}
          </span>
        </span>
        <svg
          className={`h-5 w-5 shrink-0 text-white transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open ? (
        <ul
          id={listId}
          role="menu"
          aria-labelledby="category-menu-button"
          className="absolute left-0 right-0 top-full z-50 mt-1 max-h-[min(70vh,28rem)] overflow-y-auto rounded-lg border border-zinc-200 bg-white py-0 shadow-lg lg:right-auto lg:min-w-full"
        >
          {SIDEBAR_CATEGORIES.map(({ label, filter }) => {
            const active = selectedFilter === filter
            const isViewAll = filter === 'All'
            return (
              <li key={label} role="none" className="border-b border-zinc-100 last:border-b-0">
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => choose(filter)}
                  className={[
                    'flex w-full items-center justify-between gap-2 px-4 py-3 text-left text-sm transition',
                    isViewAll
                      ? active
                        ? 'bg-brand-100 font-semibold text-brand-900'
                        : 'bg-brand-50/90 text-brand-900 hover:bg-brand-100'
                      : active
                        ? 'bg-brand-50 font-semibold text-brand-900'
                        : 'text-zinc-700 hover:bg-zinc-50',
                  ].join(' ')}
                >
                  <span className="leading-snug">{label}</span>
                  <svg
                    className={`h-4 w-4 shrink-0 text-zinc-400 ${active ? 'text-brand-600' : ''}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M9 18l6-6-6-6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </li>
            )
          })}
        </ul>
      ) : null}
    </aside>
  )
}

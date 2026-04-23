import { Link } from 'react-router-dom'
import { useState } from 'react'
import { STORE_PHONE_DISPLAY, STORE_PHONE_TEL } from '../../constants/business'

type MainHeaderProps = {
  searchQuery: string
  onSearchChange: (q: string) => void
}

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-3 shrink-0 group">
      <span className="flex h-12 w-12 items-center justify-center rounded-lg border-2 border-brand-600 bg-white text-brand-700 shadow-sm transition group-hover:border-brand-700">
        <svg className="h-7 w-7" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M3 10.5L12 4l9 6.5V20a1 1 0 01-1 1h-5v-6H9v6H4a1 1 0 01-1-1v-9.5z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <div className="leading-tight text-left">
        <span className="block font-extrabold text-brand-800 text-lg tracking-tight uppercase sm:text-xl">
          ABU Executive
        </span>
        <span className="block text-[11px] font-bold uppercase tracking-[0.2em] text-brand-600 sm:text-xs">
          Hardware
        </span>
      </div>
    </Link>
  )
}

export function MainHeader({ searchQuery, onSearchChange }: MainHeaderProps) {
  const [open, setOpen] = useState(false)

  return (
    <header className="border-b border-zinc-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
          <div className="flex items-center justify-between gap-4 lg:justify-start">
            <Logo />
            <button
              type="button"
              className="rounded-md border border-zinc-200 p-2 text-zinc-800 lg:hidden"
              aria-expanded={open}
              aria-label="Toggle search"
              onClick={() => setOpen((o) => !o)}
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                <path
                  d="M4 6h16M4 12h16M4 18h16"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <div className="hidden min-w-0 flex-1 items-center justify-center px-4 lg:flex">
            <a
              href={`tel:${STORE_PHONE_TEL}`}
              className="flex items-center gap-3 text-zinc-800"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-200 bg-zinc-50">
                <svg className="h-5 w-5 text-brand-700" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.12.9.33 1.77.63 2.6a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.48-1.2a2 2 0 012.11-.45c.83.3 1.7.51 2.6.63A2 2 0 0122 16.92z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <span>
                <span className="block text-xs font-semibold uppercase tracking-wide text-zinc-500">
                  Call us now
                </span>
                <span className="text-lg font-bold text-zinc-900">{STORE_PHONE_DISPLAY}</span>
              </span>
            </a>
          </div>

          <div
            className={`min-w-0 lg:max-w-md lg:flex-1 ${open ? 'block' : 'hidden lg:block'}`}
          >
            <label className="sr-only" htmlFor="site-search">
              Search
            </label>
            <div className="flex overflow-hidden rounded-md border border-zinc-300 bg-white shadow-sm focus-within:border-brand-600 focus-within:ring-2 focus-within:ring-brand-200">
              <input
                id="site-search"
                type="search"
                placeholder="Search our store…"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="min-w-0 flex-1 border-0 px-4 py-3 text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
              />
              <button
                type="button"
                className="border-l border-zinc-200 bg-zinc-50 px-4 text-zinc-600 hover:bg-zinc-100 hover:text-brand-800"
                aria-label="Search"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                  <path d="M20 20l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-3 flex justify-center border-t border-zinc-100 pt-3 lg:hidden">
          <a
            href={`tel:${STORE_PHONE_TEL}`}
            className="flex items-center gap-2 text-sm font-bold text-zinc-900"
          >
            <svg className="h-4 w-4 text-brand-700" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.12.9.33 1.77.63 2.6a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.48-1.2a2 2 0 012.11-.45c.83.3 1.7.51 2.6.63A2 2 0 0122 16.92z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </svg>
            {STORE_PHONE_DISPLAY}
          </a>
        </div>
      </div>
    </header>
  )
}

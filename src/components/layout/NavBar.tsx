import { NavLink } from 'react-router-dom'

const navItems: { to: string; label: string }[] = [
  { to: '/about', label: 'About Us' },
  { to: '/why-us', label: 'Why Buy From Us?' },
  { to: '/privacy', label: 'Privacy Policy' },
]

function CartTab() {
  return (
    <button
      type="button"
      className="flex items-center gap-2 bg-brand-600 px-5 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-md transition hover:bg-brand-700 lg:ml-2 lg:rounded-l-lg"
      aria-label="Shopping cart"
    >
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden>
        <path
          d="M6 6h15l-1.5 9h-12L6 6zm0 0L5 3H2"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="9" cy="20" r="1.5" fill="currentColor" />
        <circle cx="18" cy="20" r="1.5" fill="currentColor" />
      </svg>
      <span className="hidden sm:inline">Cart</span>
    </button>
  )
}

export function NavBar() {
  return (
    <nav className="bg-zinc-900 text-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-stretch justify-between pr-0 pl-0 lg:pl-4">
        <div className="scrollbar-none flex min-w-0 flex-1 items-center gap-0 overflow-x-auto px-2 py-0 sm:px-0">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              [
                'shrink-0 whitespace-nowrap px-3 py-3.5 text-xs font-bold uppercase tracking-wide transition sm:px-4 sm:text-sm',
                isActive
                  ? 'bg-brand-700 text-white'
                  : 'text-zinc-200 hover:bg-zinc-800 hover:text-white',
              ].join(' ')
            }
          >
            Home
          </NavLink>
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                [
                  'shrink-0 whitespace-nowrap px-3 py-3.5 text-xs font-bold uppercase tracking-wide transition sm:px-4 sm:text-sm',
                  isActive
                    ? 'bg-brand-700 text-white'
                    : 'text-zinc-200 hover:bg-zinc-800 hover:text-white',
                ].join(' ')
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
        <div className="flex shrink-0 items-stretch pr-2 sm:pr-4 lg:pr-0">
          <CartTab />
        </div>
      </div>
    </nav>
  )
}

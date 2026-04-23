import { Link } from 'react-router-dom'

export function TopBar() {
  return (
    <div className="bg-zinc-950 text-zinc-300 text-xs sm:text-sm">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-2">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <Link to="/admin" className="font-medium text-brand-400 hover:text-brand-300">
            Admin
          </Link>
        </div>
      </div>
    </div>
  )
}

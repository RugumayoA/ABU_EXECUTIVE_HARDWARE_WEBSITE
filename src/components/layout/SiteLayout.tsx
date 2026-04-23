import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { STORE_PHONE_TEL } from '../../constants/business'
import { TopBar } from './TopBar'
import { MainHeader } from './MainHeader'
import { NavBar } from './NavBar'

type SiteLayoutProps = {
  children: ReactNode
  searchQuery: string
  onSearchChange: (q: string) => void
}

export function SiteLayout({ children, searchQuery, onSearchChange }: SiteLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-zinc-100">
      <TopBar />
      <MainHeader searchQuery={searchQuery} onSearchChange={onSearchChange} />
      <NavBar />
      <main className="flex-1">{children}</main>
      <footer className="border-t border-zinc-200 bg-white py-10 text-center text-sm text-zinc-600">
        <p className="font-semibold text-zinc-900">
          © {new Date().getFullYear()} ABU Executive Hardware
        </p>
        <p className="mt-1">Quality tools for professionals and builders.</p>
        <div className="mt-4 flex flex-wrap justify-center gap-4 text-xs uppercase tracking-wide">
          <Link to="/privacy" className="hover:text-brand-700">
            Privacy
          </Link>
          <Link to="/guarantee" className="hover:text-brand-700">
            Guarantee
          </Link>
          <Link to="/contact" className="hover:text-brand-700">
            Contact
          </Link>
          <a href={`tel:${STORE_PHONE_TEL}`} className="hover:text-brand-700">
            Call
          </a>
        </div>
      </footer>
    </div>
  )
}

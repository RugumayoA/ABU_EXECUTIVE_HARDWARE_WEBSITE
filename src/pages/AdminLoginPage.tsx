import { useEffect, useState, type FormEvent } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { isSupabaseConfigured } from '../lib/supabaseConfig'
import { getSupabase } from '../lib/supabaseClient'
import { SiteLayout } from '../components/layout/SiteLayout'

export function AdminLoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from ?? '/admin'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  if (!isSupabaseConfigured()) {
    return <Navigate to="/admin" replace />
  }

  useEffect(() => {
    getSupabase()
      .auth.getSession()
      .then(({ data }) => {
        if (data.session) navigate(from, { replace: true })
      })
      .catch(() => {})
  }, [from, navigate])

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setMessage(null)
    setBusy(true)
    try {
      const { error } = await getSupabase().auth.signInWithPassword({
        email: email.trim(),
        password,
      })
      if (error) {
        setMessage(error.message)
        return
      }
      navigate(from, { replace: true })
    } catch (err) {
      setMessage(err instanceof Error ? err.message : 'Sign in failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <SiteLayout searchQuery="" onSearchChange={() => {}}>
      <div className="mx-auto max-w-md px-4 py-16">
        <h1 className="text-2xl font-bold text-brand-900">Admin sign in</h1>
        <p className="mt-2 text-sm text-zinc-600">
          Use a staff account from Supabase Auth (create the user in the dashboard, then sign in
          here).
        </p>
        <form onSubmit={onSubmit} className="mt-8 space-y-4">
          <div>
            <label htmlFor="adm-email" className="text-xs font-semibold text-zinc-700">
              Email
            </label>
            <input
              id="adm-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-200"
            />
          </div>
          <div>
            <label htmlFor="adm-pass" className="text-xs font-semibold text-zinc-700">
              Password
            </label>
            <input
              id="adm-pass"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2.5 text-sm outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-200"
            />
          </div>
          {message ? (
            <p className="text-sm text-red-700" role="alert">
              {message}
            </p>
          ) : null}
          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-lg bg-brand-800 py-2.5 text-sm font-bold text-white hover:bg-brand-900 disabled:opacity-60"
          >
            {busy ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
        <p className="mt-6 text-center text-sm">
          <Link to="/" className="font-semibold text-brand-800 hover:underline">
            Back to store
          </Link>
        </p>
      </div>
    </SiteLayout>
  )
}

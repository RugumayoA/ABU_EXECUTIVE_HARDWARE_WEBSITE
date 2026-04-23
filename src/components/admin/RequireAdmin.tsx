import { useEffect, useState, type ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import type { Session } from '@supabase/supabase-js'
import { isSupabaseConfigured } from '../../lib/supabaseConfig'
import { getSupabase } from '../../lib/supabaseClient'

type RequireAdminProps = {
  children: ReactNode
}

export function RequireAdmin({ children }: RequireAdminProps) {
  const location = useLocation()
  const remote = isSupabaseConfigured()
  const [ready, setReady] = useState(!remote)
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    if (!remote) {
      setReady(true)
      return
    }

    let subscription: { unsubscribe: () => void } | null = null
    try {
      const sb = getSupabase()
      sb.auth
        .getSession()
        .then(({ data }) => {
          setSession(data.session)
          setReady(true)
        })
        .catch(() => {
          setSession(null)
          setReady(true)
        })

      const sub = sb.auth.onAuthStateChange((_event, next) => {
        setSession(next)
      })
      subscription = sub.data.subscription
    } catch {
      setSession(null)
      setReady(true)
    }

    return () => subscription?.unsubscribe()
  }, [remote])

  if (!ready) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center bg-zinc-100 text-sm text-zinc-600">
        Checking session…
      </div>
    )
  }

  if (remote && !session) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{ from: location.pathname }}
      />
    )
  }

  return <>{children}</>
}

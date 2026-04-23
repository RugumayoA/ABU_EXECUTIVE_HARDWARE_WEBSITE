import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { SiteLayout } from '../components/layout/SiteLayout'
import { ProductForm } from '../components/admin/ProductForm'
import { ProductTable } from '../components/admin/ProductTable'
import { useProducts } from '../context/ProductContext'
import type { Product, ProductInput } from '../types/product'
import { isSupabaseConfigured } from '../lib/supabaseConfig'
import { getSupabase } from '../lib/supabaseClient'

export function AdminPage() {
  const navigate = useNavigate()
  const remote = isSupabaseConfigured()
  const {
    products,
    loading,
    error,
    isRemote,
    refetch,
    addProduct,
    updateProduct,
    deleteProduct,
  } = useProducts()
  const [editing, setEditing] = useState<Product | null>(null)
  const [actionError, setActionError] = useState<string | null>(null)

  async function handleSubmit(input: ProductInput) {
    setActionError(null)
    try {
      if (editing) {
        await updateProduct(editing.id, input)
        setEditing(null)
      } else {
        await addProduct(input)
      }
    } catch (e) {
      setActionError(e instanceof Error ? e.message : 'Save failed')
    }
  }

  async function handleDelete(id: string) {
    setActionError(null)
    try {
      await deleteProduct(id)
      if (editing?.id === id) setEditing(null)
    } catch (e) {
      setActionError(e instanceof Error ? e.message : 'Delete failed')
    }
  }

  async function signOut() {
    if (remote) {
      await getSupabase().auth.signOut()
      navigate('/admin/login', { replace: true })
    } else {
      navigate('/')
    }
  }

  return (
    <SiteLayout searchQuery="" onSearchChange={() => {}}>
      <div className="border-b border-zinc-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-brand-900">Admin panel</h1>
            <p className="mt-2 max-w-2xl text-sm text-zinc-600">
              {isRemote ? (
                <>
                  Products are stored in <strong>Supabase</strong>. Sign in is required to add or
                  edit items. Set{' '}
                  <code className="rounded border border-zinc-200 bg-zinc-50 px-1 py-0.5 text-xs">
                    VITE_SUPABASE_URL
                  </code>{' '}
                  and{' '}
                  <code className="rounded border border-zinc-200 bg-zinc-50 px-1 py-0.5 text-xs">
                    VITE_SUPABASE_ANON_KEY
                  </code>{' '}
                  in <code className="text-xs">.env.local</code>.
                </>
              ) : (
                <>
                  Local mode: data stays in this browser (
                  <code className="text-xs">localStorage</code>). Add Supabase env vars to sync with
                  a database.
                </>
              )}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {remote ? (
              <button
                type="button"
                onClick={() => void signOut()}
                className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-800 hover:bg-zinc-50"
              >
                Sign out
              </button>
            ) : null}
            <Link
              to="/"
              className="rounded-lg bg-brand-800 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-900"
            >
              View store
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl space-y-8 px-4 py-10">
        {(error || actionError) && (
          <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            <p>{error ?? actionError}</p>
            {isRemote ? (
              <button
                type="button"
                onClick={() => void refetch()}
                className="mt-2 text-sm font-bold underline"
              >
                Retry load
              </button>
            ) : null}
          </div>
        )}

        {loading ? (
          <p className="text-center text-sm text-zinc-600">Loading inventory…</p>
        ) : (
          <>
            <ProductForm
              editing={editing}
              onSubmit={(input) => void handleSubmit(input)}
              onCancelEdit={() => setEditing(null)}
            />
            <ProductTable products={products} onEdit={setEditing} onDelete={(id) => void handleDelete(id)} />
          </>
        )}
      </div>
    </SiteLayout>
  )
}

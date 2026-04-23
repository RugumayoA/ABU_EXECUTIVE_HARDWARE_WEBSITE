import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Product, ProductInput } from '../types/product'
import { SEED_PRODUCTS } from '../data/seedProducts'
import { isSupabaseConfigured } from '../lib/supabaseConfig'
import {
  deleteProductRemote,
  fetchProductsFromSupabase,
  insertProductRemote,
  updateProductRemote,
} from '../lib/productsRepository'

const STORAGE_KEY = 'abu-executive-hardware-products-ugx-v5-plumbing'

type ProductContextValue = {
  products: Product[]
  loading: boolean
  error: string | null
  /** True when VITE_SUPABASE_* is set — data from Supabase, admin needs sign-in. */
  isRemote: boolean
  refetch: () => Promise<void>
  addProduct: (input: ProductInput) => Promise<void>
  updateProduct: (id: string, input: ProductInput) => Promise<void>
  deleteProduct: (id: string) => Promise<void>
}

const ProductContext = createContext<ProductContextValue | null>(null)

function loadFromStorage(): Product[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return SEED_PRODUCTS
    const parsed = JSON.parse(raw) as Product[]
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : SEED_PRODUCTS
  } catch {
    return SEED_PRODUCTS
  }
}

export function ProductProvider({ children }: { children: ReactNode }) {
  const isRemote = useMemo(() => isSupabaseConfigured(), [])
  const [products, setProducts] = useState<Product[]>(() =>
    isRemote ? [] : loadFromStorage(),
  )
  const [loading, setLoading] = useState(isRemote)
  const [error, setError] = useState<string | null>(null)

  const refetch = useCallback(async () => {
    if (!isRemote) return
    setLoading(true)
    setError(null)
    try {
      const rows = await fetchProductsFromSupabase()
      setProducts(rows)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load products')
    } finally {
      setLoading(false)
    }
  }, [isRemote])

  useEffect(() => {
    if (isRemote) void refetch()
  }, [isRemote, refetch])

  useEffect(() => {
    if (isRemote) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products))
  }, [products, isRemote])

  const addProduct = useCallback(
    async (input: ProductInput) => {
      if (isRemote) {
        const p = await insertProductRemote(input)
        setProducts((prev) => [p, ...prev])
        return
      }
      setProducts((prev) => [...prev, { ...input, id: crypto.randomUUID() }])
    },
    [isRemote],
  )

  const updateProduct = useCallback(
    async (id: string, input: ProductInput) => {
      if (isRemote) {
        const p = await updateProductRemote(id, input)
        setProducts((prev) => prev.map((x) => (x.id === id ? p : x)))
        return
      }
      setProducts((prev) => prev.map((p) => (p.id === id ? { ...input, id } : p)))
    },
    [isRemote],
  )

  const deleteProduct = useCallback(
    async (id: string) => {
      if (isRemote) {
        await deleteProductRemote(id)
        setProducts((prev) => prev.filter((p) => p.id !== id))
        return
      }
      setProducts((prev) => prev.filter((p) => p.id !== id))
    },
    [isRemote],
  )

  const value = useMemo(
    () => ({
      products,
      loading,
      error,
      isRemote,
      refetch,
      addProduct,
      updateProduct,
      deleteProduct,
    }),
    [
      products,
      loading,
      error,
      isRemote,
      refetch,
      addProduct,
      updateProduct,
      deleteProduct,
    ],
  )

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  )
}

export function useProducts() {
  const ctx = useContext(ProductContext)
  if (!ctx) throw new Error('useProducts must be used within ProductProvider')
  return ctx
}

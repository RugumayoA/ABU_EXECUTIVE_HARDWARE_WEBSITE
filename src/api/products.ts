import type { Product, ProductInput } from '../types/product'

/**
 * Central place for HTTP calls. When `VITE_API_URL` is set, wire these to your backend.
 * Until then, the app uses `ProductProvider` with localStorage.
 */
function baseUrl(): string | null {
  const raw = import.meta.env.VITE_API_URL?.replace(/\/$/, '')
  return raw || null
}

export async function getProducts(): Promise<Product[]> {
  const root = baseUrl()
  if (!root) throw new Error('API not configured — using local store')
  const res = await fetch(`${root}/products`)
  if (!res.ok) throw new Error('Failed to fetch products')
  return res.json() as Promise<Product[]>
}

export async function createProductRemote(input: ProductInput): Promise<Product> {
  const root = baseUrl()
  if (!root) throw new Error('API not configured')
  const res = await fetch(`${root}/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  if (!res.ok) throw new Error('Failed to create product')
  return res.json() as Promise<Product>
}

export async function updateProductRemote(
  id: string,
  input: ProductInput,
): Promise<Product> {
  const root = baseUrl()
  if (!root) throw new Error('API not configured')
  const res = await fetch(`${root}/products/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input),
  })
  if (!res.ok) throw new Error('Failed to update product')
  return res.json() as Promise<Product>
}

export async function deleteProductRemote(id: string): Promise<void> {
  const root = baseUrl()
  if (!root) throw new Error('API not configured')
  const res = await fetch(`${root}/products/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete product')
}

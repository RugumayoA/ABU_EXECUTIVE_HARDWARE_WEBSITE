import type { Product, ProductInput } from '../types/product'
import { getSupabase } from './supabaseClient'

const BUCKET = 'product-images'

type ProductRow = {
  id: string
  name: string
  price: number
  category: string
  description: string | null
  image_url: string | null
  created_at?: string | null
}

function mapRow(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    price: Number(row.price),
    category: row.category,
    description: row.description ?? '',
    imageUrl: row.image_url ?? '',
  }
}

function toInsertRow(input: ProductInput): Record<string, unknown> {
  return {
    name: input.name.trim(),
    price: Math.round(Number(input.price)),
    category: input.category,
    description: input.description.trim(),
    image_url: input.imageUrl.trim(),
  }
}

export async function fetchProductsFromSupabase(): Promise<Product[]> {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return ((data ?? []) as ProductRow[]).map(mapRow)
}

export async function insertProductRemote(input: ProductInput): Promise<Product> {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('products')
    .insert(toInsertRow(input))
    .select()
    .single()

  if (error) throw error
  return mapRow(data as ProductRow)
}

export async function updateProductRemote(
  id: string,
  input: ProductInput,
): Promise<Product> {
  const supabase = getSupabase()
  const { data, error } = await supabase
    .from('products')
    .update(toInsertRow(input))
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return mapRow(data as ProductRow)
}

export async function deleteProductRemote(id: string): Promise<void> {
  const supabase = getSupabase()
  const { error } = await supabase.from('products').delete().eq('id', id)
  if (error) throw error
}

/** Upload a file to Storage; returns public URL. Caller must be signed in (RLS). */
export async function uploadProductImage(file: File): Promise<string> {
  const supabase = getSupabase()
  const ext =
    file.name.split('.').pop()?.replace(/[^a-zA-Z0-9]/g, '').toLowerCase() || 'jpg'
  const path = `products/${crypto.randomUUID()}.${ext}`

  const { error } = await supabase.storage.from(BUCKET).upload(path, file, {
    cacheControl: '3600',
    upsert: false,
    contentType: file.type || `image/${ext === 'jpg' ? 'jpeg' : ext}`,
  })

  if (error) throw error

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return data.publicUrl
}

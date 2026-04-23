import { useEffect, useState, type FormEvent } from 'react'
import type { Product, ProductInput } from '../../types/product'
import { PRODUCT_CATEGORIES } from '../../constants/categories'
import { isSupabaseConfigured } from '../../lib/supabaseConfig'
import { uploadProductImage } from '../../lib/productsRepository'

const ADMIN_CATEGORIES = PRODUCT_CATEGORIES.filter((c) => c !== 'All')

type ProductFormProps = {
  editing: Product | null
  onSubmit: (input: ProductInput) => void
  onCancelEdit: () => void
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader()
    r.onload = () => resolve(String(r.result))
    r.onerror = () => reject(r.error)
    r.readAsDataURL(file)
  })
}

const empty: ProductInput = {
  name: '',
  price: 0,
  category: ADMIN_CATEGORIES[0] ?? 'Cement',
  description: '',
  imageUrl: '',
}

export function ProductForm({ editing, onSubmit, onCancelEdit }: ProductFormProps) {
  const [form, setForm] = useState<ProductInput>(empty)
  const [imageFileName, setImageFileName] = useState('')

  useEffect(() => {
    if (editing) {
      setForm({
        name: editing.name,
        price: editing.price,
        category: editing.category,
        description: editing.description,
        imageUrl: editing.imageUrl,
      })
      setImageFileName('')
    } else {
      setForm(empty)
      setImageFileName('')
    }
  }, [editing])

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    try {
      if (isSupabaseConfigured()) {
        const url = await uploadProductImage(file)
        setForm((f) => ({ ...f, imageUrl: url }))
      } else {
        const url = await readFileAsDataUrl(file)
        setForm((f) => ({ ...f, imageUrl: url }))
      }
      setImageFileName(file.name)
    } catch (err) {
      window.alert(err instanceof Error ? err.message : 'Image upload failed')
    }
    e.target.value = ''
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!form.name.trim()) return
    onSubmit(form)
    if (!editing) {
      setForm(empty)
      setImageFileName('')
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-brand-100 bg-white p-4 shadow-sm sm:p-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-lg font-bold text-brand-900">
          {editing ? 'Edit product' : 'Add product'}
        </h2>
        {editing && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="text-sm font-semibold text-brand-700 hover:text-brand-900"
          >
            Cancel edit
          </button>
        )}
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="pf-name" className="text-xs font-semibold text-brand-800">
            Product name
          </label>
          <input
            id="pf-name"
            required
            value={form.name}
            onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
            className="mt-1 w-full rounded-xl border border-brand-200 px-4 py-2.5 text-sm outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-200"
          />
        </div>
        <div>
          <label htmlFor="pf-price" className="text-xs font-semibold text-brand-800">
            Price (UGX)
          </label>
          <input
            id="pf-price"
            type="number"
            min={0}
            step={1000}
            required
            value={form.price || ''}
            onChange={(e) =>
              setForm((f) => ({ ...f, price: parseFloat(e.target.value) || 0 }))
            }
            className="mt-1 w-full rounded-xl border border-brand-200 px-4 py-2.5 text-sm outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-200"
          />
        </div>
        <div>
          <label htmlFor="pf-cat" className="text-xs font-semibold text-brand-800">
            Category
          </label>
          <select
            id="pf-cat"
            value={form.category}
            onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
            className="mt-1 w-full rounded-xl border border-brand-200 px-4 py-2.5 text-sm outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-200"
          >
            {ADMIN_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="pf-desc" className="text-xs font-semibold text-brand-800">
            Description
          </label>
          <textarea
            id="pf-desc"
            rows={3}
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            className="mt-1 w-full resize-y rounded-xl border border-brand-200 px-4 py-2.5 text-sm outline-none focus:border-brand-600 focus:ring-2 focus:ring-brand-200"
          />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="pf-img" className="text-xs font-semibold text-brand-800">
            Image
          </label>
          <div className="mt-1 flex flex-wrap items-center gap-3">
            <label
              htmlFor="pf-img"
              className="cursor-pointer rounded-lg bg-brand-800 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-900"
            >
              Choose picture
            </label>
            <span className="text-xs text-brand-700">
              {imageFileName || 'No picture selected'}
            </span>
          </div>
          <input id="pf-img" type="file" accept="image/*" onChange={handleFile} className="sr-only" />
          {form.imageUrl && (
            <div className="mt-3 flex items-start gap-3">
              <img
                src={form.imageUrl}
                alt="Preview"
                className="h-20 w-28 rounded-lg border border-brand-100 object-cover"
              />
              <button
                type="button"
                onClick={() => {
                  setForm((f) => ({ ...f, imageUrl: '' }))
                  setImageFileName('')
                }}
                className="text-xs font-semibold text-red-700 hover:underline"
              >
                Remove image
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="submit"
          className="rounded-xl bg-brand-800 px-6 py-2.5 text-sm font-bold text-white hover:bg-brand-900"
        >
          {editing ? 'Save changes' : 'Add product'}
        </button>
      </div>
    </form>
  )
}

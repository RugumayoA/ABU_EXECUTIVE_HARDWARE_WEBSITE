import type { ReactNode } from 'react'

type ContentPageProps = {
  title: string
  children: ReactNode
}

/** Inner layout for static / legal pages (inside SiteLayout). */
export function ContentPage({ title, children }: ContentPageProps) {
  return (
    <div className="border-b border-zinc-200 bg-white">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:py-16">
        <h1 className="text-3xl font-black uppercase tracking-tight text-brand-900 sm:text-4xl">
          {title}
        </h1>
        <div className="mt-8 space-y-4 text-base leading-relaxed text-zinc-700">{children}</div>
      </div>
    </div>
  )
}

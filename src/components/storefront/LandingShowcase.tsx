import { PRODUCT_CATEGORIES } from '../../constants/categories'

type LandingShowcaseProps = {
  onPickCategory: (category: string) => void
}

const tiles: {
  image: string
  label: string
  blurb: string
  category: string
}[] = [
  {
    image: '/landing/general-hardware.png',
    label: 'General hardware',
    blurb: 'Tools, brushes, ropes & essentials',
    category: 'General hardware',
  },
  {
    image: '/landing/paints.png',
    label: 'Paints',
    blurb: 'Emulsion, gloss & weathercoat',
    category: 'Paints',
  },
  {
    image: '/landing/cement-bags.png',
    label: 'Cement',
    blurb: 'Bags — pozzolanic & Portland',
    category: 'Cement',
  },
  {
    image: '/landing/rebar.png',
    label: 'Steel',
    blurb: 'Rebar, rods & reinforcement',
    category: 'Steel',
  },
  {
    image: '/landing/plumbing-pipes.png',
    label: 'Plumbing',
    blurb: 'Pipes, fittings & water lines',
    category: 'Plumbing',
  },
  {
    image: '/landing/plumbing-tanks.png',
    label: 'Tanks & Drums',
    blurb: 'Water storage & utility drums',
    category: 'Tanks & Drums',
  },
  {
    image: '/landing/bathroom.png',
    label: 'Ceramics',
    blurb: 'Toilets, basins & showers',
    category: 'Ceramics',
  },
  {
    image: '/landing/lighting.png',
    label: 'Electronics',
    blurb: 'Lighting & electrical',
    category: 'Electronics',
  },
  {
    image: '/landing/padlocks.png',
    label: 'Padlocks',
    blurb: 'Branded security display',
    category: 'Padlocks',
  },
  {
    image: '/landing/bathroom.png',
    label: 'Tiles',
    blurb: 'Floor & wall finishes',
    category: 'Tiles',
  },
]

function isValidCategory(c: string): boolean {
  return (PRODUCT_CATEGORIES as readonly string[]).includes(c)
}

export function LandingShowcase({ onPickCategory }: LandingShowcaseProps) {
  return (
    <section className="border-b border-zinc-200 bg-zinc-50 py-10">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-700">
              Shop the floor
            </p>
            <h2 className="mt-1 text-2xl font-black uppercase tracking-tight text-brand-900 sm:text-3xl">
              Browse by aisle
            </h2>
            <p className="mt-1 max-w-xl text-sm text-zinc-600">
              Tap a photo to jump straight to that category in the catalog — same layout as our
              showroom.
            </p>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tiles.map((t) => (
            <button
              key={`${t.category}-${t.label}`}
              type="button"
              onClick={() => {
                if (isValidCategory(t.category)) {
                  onPickCategory(t.category)
                  document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })
                }
              }}
              className="group relative overflow-hidden rounded-xl border border-zinc-200 bg-white text-left shadow-sm transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={t.image}
                  alt=""
                  className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <p className="text-lg font-bold text-white">{t.label}</p>
                  <p className="text-sm text-zinc-200">{t.blurb}</p>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wide text-brand-300">
                    View category
                    <svg className="h-3 w-3 transition group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none">
                      <path
                        d="M5 12h14M13 6l6 6-6 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

/** Hero carousel — images live in `public/landing/`. */
export type LandingSlide = {
  image: string
  title: string
  subtitle: string
  eyebrow: string
  /** Optional: “Shop this aisle” jumps to catalog with this category selected. */
  categoryFilter?: string
}

export const LANDING_SLIDES: LandingSlide[] = [
  {
    image: '/landing/paints.png',
    eyebrow: 'In stock now',
    title: 'Paints & finishes',
    subtitle: 'Quality emulsion, gloss & exterior coatings',
    categoryFilter: 'General hardware',
  },
  {
    image: '/landing/cement-bags.png',
    eyebrow: 'Bags in stock',
    title: 'Cement',
    subtitle: 'Tororo & pozzolanic — for mortar, concrete & plaster',
    categoryFilter: 'Cement',
  },
  {
    image: '/landing/rebar.png',
    eyebrow: 'Structural steel',
    title: 'Steel & reinforcement',
    subtitle: 'Rebar and rods for slabs, columns & beams',
    categoryFilter: 'Steel',
  },
  {
    image: '/landing/plumbing-tanks.png',
    eyebrow: 'Water storage',
    title: 'Plumbing',
    subtitle: 'Tanks, drums & bulk storage — residential & site',
    categoryFilter: 'Plumbing',
  },
  {
    image: '/landing/bathroom.png',
    eyebrow: 'Ceramics',
    title: 'Sanitary ware & showers',
    subtitle: 'Toilets, basins and chrome sets',
    categoryFilter: 'Ceramics',
  },
  {
    image: '/landing/lighting.png',
    eyebrow: 'Electronics',
    title: 'Lighting & fixtures',
    subtitle: 'LED, outdoor and decorative fittings',
    categoryFilter: 'Electronics',
  },
  {
    image: '/landing/padlocks.png',
    eyebrow: 'Security',
    title: 'Padlocks & keys',
    subtitle: 'Wall display — sizes for every gate & door',
    categoryFilter: 'Padlocks',
  },
]

export const AUTOPLAY_MS = 6500

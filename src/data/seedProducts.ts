import type { Product } from '../types/product'

const svg = (label: string) =>
  `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="280" viewBox="0 0 400 280"><rect fill="#f0fdf4" width="400" height="280"/><rect x="24" y="24" width="352" height="232" rx="16" fill="#166534" opacity="0.12"/><text x="200" y="145" text-anchor="middle" fill="#166534" font-family="system-ui,sans-serif" font-size="18" font-weight="600">${label}</text></svg>`,
  )}`

/** Prices are in Ugandan Shillings (UGX). */
export const SEED_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Cordless Impact Driver',
    price: 485_000,
    category: 'Electronics',
    description: 'Compact 18V brushless motor with two speed settings and LED work light.',
    imageUrl: svg('Power Tool'),
  },
  {
    id: '2',
    name: 'Framing Hammer 20oz',
    price: 130_000,
    category: 'General hardware',
    description: 'Forged steel head with shock-absorbing grip for all-day comfort.',
    imageUrl: svg('Hammer'),
  },
  {
    id: '3',
    name: 'Safety Helmet Type 1',
    price: 95_000,
    category: 'General hardware',
    description: 'Rated hard hat with adjustable ratchet suspension.',
    imageUrl: svg('Safety'),
  },
  {
    id: '4',
    name: 'Portland Cement (50 kg)',
    price: 72_000,
    category: 'Cement',
    description: 'Quality cement for mortar, concrete, and plaster work.',
    imageUrl: svg('Cement'),
  },
  {
    id: '5',
    name: 'Reinforcement steel Y12 (12m bar)',
    price: 185_000,
    category: 'Steel',
    description: 'Ribbed bar for slabs, beams and columns — standard length.',
    imageUrl: svg('Steel'),
  },
  {
    id: '6',
    name: 'Plastic water tank 1000 L',
    price: 890_000,
    category: 'Tanks & Drums',
    description:
      'Ribbed storage tank for rooftop or stand — suitable for homes and sites. Brands may vary.',
    imageUrl: '/landing/plumbing-tanks.png',
  },
]

export const PRODUCT_CATEGORIES = [
  'All',
  'Cement',
  'Ceramics',
  'Electronics',
  'General hardware',
  'Padlocks',
  'Paints',
  'Plumbing',
  'Steel',
  'Tanks & Drums',
  'Tiles',
] as const

export type CategoryFilter = (typeof PRODUCT_CATEGORIES)[number]

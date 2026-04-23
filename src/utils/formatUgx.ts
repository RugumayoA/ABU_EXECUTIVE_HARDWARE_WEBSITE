const formatter = new Intl.NumberFormat('en-UG', {
  style: 'currency',
  currency: 'UGX',
  maximumFractionDigits: 0,
})

/** Format a whole-number amount in Ugandan Shillings. */
export function formatUgx(amount: number): string {
  return formatter.format(Math.round(amount))
}

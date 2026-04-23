import { STORE_PHONE_DISPLAY, STORE_PHONE_TEL } from '../../constants/business'

/** Quick trust row — reinforces local + UGX + call. */
export function LandingPulse() {
  return (
    <section className="bg-brand-800 py-4 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-4 px-4 sm:flex-row sm:flex-wrap sm:gap-x-10 sm:gap-y-2">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-300 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-300" />
          </span>
          Open for walk-in customers
        </div>
        <span className="hidden text-brand-400 sm:inline">|</span>
        <p className="text-sm text-brand-100">
          All prices in <strong className="text-white">UGX</strong>
        </p>
        <span className="hidden text-brand-400 sm:inline">|</span>
        <a
          href={`tel:${STORE_PHONE_TEL}`}
          className="text-sm font-bold tracking-wide text-white underline decoration-brand-400 decoration-2 underline-offset-4 hover:text-brand-100"
        >
          {STORE_PHONE_DISPLAY}
        </a>
      </div>
    </section>
  )
}

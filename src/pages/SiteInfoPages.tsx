import { SiteLayout } from '../components/layout/SiteLayout'
import { ContentPage } from '../components/layout/ContentPage'
import { SITE_INFO, type SiteInfoSlug } from '../content/siteInfo'
import { STORE_PHONE_DISPLAY, STORE_PHONE_TEL } from '../constants/business'

function SiteInfoLayout({ slug }: { slug: SiteInfoSlug }) {
  const page = SITE_INFO[slug]

  return (
    <SiteLayout searchQuery="" onSearchChange={() => {}}>
      <ContentPage title={page.title}>
        {page.paragraphs.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        {slug === 'contact' || slug === 'about' ? (
          <p className="pt-2">
            <a
              href={`tel:${STORE_PHONE_TEL}`}
              className="font-bold text-brand-800 underline decoration-brand-300 decoration-2 underline-offset-2 hover:text-brand-950"
            >
              {STORE_PHONE_DISPLAY}
            </a>
          </p>
        ) : null}
        {page.footnote ? (
          <p className="border-t border-zinc-200 pt-6 text-sm italic text-zinc-500">{page.footnote}</p>
        ) : null}
      </ContentPage>
    </SiteLayout>
  )
}

export function AboutPage() {
  return <SiteInfoLayout slug="about" />
}

export function VisitPage() {
  return <SiteInfoLayout slug="visit" />
}

export function WhyBuyPage() {
  return <SiteInfoLayout slug="why-us" />
}

export function GuaranteePage() {
  return <SiteInfoLayout slug="guarantee" />
}

export function ContactPage() {
  return <SiteInfoLayout slug="contact" />
}

export function PrivacyPage() {
  return <SiteInfoLayout slug="privacy" />
}

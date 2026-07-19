import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { HowItWorks } from '@/components/how-it-works'
import { Features } from '@/components/features'
import { Testimonials } from '@/components/testimonials'
import { Faq } from '@/components/faq'
import { TrustPartners } from '@/components/trust-partners'
import { AboutContact } from '@/components/AboutContact'
import { CtaFooter } from '@/components/cta-footer'
import { WhatsAppFloat } from '@/components/whatsapp-float'

export default function HomePage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <Features />
        <Testimonials />
        <Faq />
        <TrustPartners />
        <AboutContact />
        <CtaFooter />
      </main>
      <WhatsAppFloat />
    </div>
  )
}

import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
// باقی سب کو وقتی طور پر بند کر دیا تاکہ ایرر کا پتہ چلے
/*
import { HowItWorks } from '@/components/how-it-works'
import { Features } from '@/components/features'
import { Testimonials } from '@/components/testimonials'
import { Faq } from '@/components/faq'
import { TrustPartners } from '@/components/trust-partners'
import { CtaFooter } from '@/components/cta-footer'
import { WhatsAppFloat } from '@/components/whatsapp-float'
*/

export default function HomePage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
      </main>
    </div>
  )
}

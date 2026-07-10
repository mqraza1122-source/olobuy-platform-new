import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
// یہاں فائل کا نام درست کیا گیا ہے
import { StartSafeDeal } from '@/components/seller/sellerreferral' 
import { HowItWorks } from '@/components/how-it-works'
import { Features } from '@/components/features'
import { Testimonials } from '@/components/testimonials'
import { Faq } from '@/components/faq'
import { TrustPartners } from '@/components/trust-partners'
import { CtaFooter } from '@/components/cta-footer'
import { WhatsAppFloat } from '@/components/whatsapp-float'

export default function HomePage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        
        {/* اب یہ کارڈ یہاں نظر آئے گا */}
        <section className="container mx-auto px-4 py-8">
          <StartSafeDeal />
        </section>

        <HowItWorks />
        <Features />
        <Testimonials />
        <Faq />
        <TrustPartners />
        <CtaFooter />
      </main>
      <WhatsAppFloat />
    </div>
  )
}

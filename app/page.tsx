import { SiteHeader } from '@/components/site-header'
import { Hero } from '@/components/hero'
import { HowItWorks } from '@/components/how-it-works'
import { Features } from '@/components/features'
import { Testimonials } from '@/components/testimonials'
import { Faq } from '@/components/faq'
import { TrustPartners } from '@/components/trust-partners'
import { CtaFooter } from '@/components/cta-footer'
import { WhatsAppFloat } from '@/components/whatsapp-float'
import SchemaMarkup from '@/components/schema-markup'
import Link from 'next/link'
import { ShieldCheck } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="flex min-h-dvh flex-col bg-[#0b132b]">
      <SchemaMarkup />
      <SiteHeader />
      
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <Features />
        <Testimonials />
        <Faq />
        <TrustPartners />

        {/* --- فکسڈ بلاگ سیکشن: صرف ایک صاف ستھرا بٹن جو بلاگ پیج پر لے جائے گا --- */}
        <section className="py-16 px-4 bg-[#0b132b]">
          <div className="max-w-md mx-auto">
            <div className="bg-white rounded-[32px] p-8 shadow-2xl border border-slate-100 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-2xl bg-[#0b132b] flex items-center justify-center text-amber-400">
                  <ShieldCheck className="w-8 h-8" />
                </div>
              </div>
              
              <h2 className="text-2xl font-extrabold text-slate-900 mb-3">
                Fraud Protection Guides
              </h2>
              <p className="text-slate-600 text-sm mb-8">
                Explore our expert guides to protect your online transactions and stay safe from scams.
              </p>

              <Link 
                href="/blog"
                className="w-full flex items-center justify-center gap-2 bg-[#ff9f1c] hover:bg-[#f3930e] text-slate-950 font-bold py-4 px-6 rounded-2xl transition-all shadow-md"
              >
                View All Articles <span>→</span>
              </Link>
            </div>
          </div>
        </section>
        {/* ---------------------------------------------------- */}

      </main>
      
      <CtaFooter />
      <WhatsAppFloat />
    </div>
  )
}

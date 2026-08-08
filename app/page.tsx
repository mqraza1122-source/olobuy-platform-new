import { SiteHeader } from '@/components/site-header';
import { Hero } from '@/components/hero';
import { HowItWorks } from '@/components/how-it-works';
import { Features } from '@/components/features';
import { Testimonials } from '@/components/testimonials';
import { Faq } from '@/components/faq';
import { TrustPartners } from '@/components/trust-partners';
import { CtaFooter } from '@/components/cta-footer';
import { WhatsAppFloat } from '@/components/whatsapp-float';
import SchemaMarkup from '@/components/schema-markup';
import Link from 'next/link';
import { BookOpen } from 'lucide-react';

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

        {/* --- فکسڈ انسائٹس/بلاگ سیکشن: صرف ایک سنگل اوتھنٹک کارڈ اور سنگل بٹن --- */}
        <section className="py-16 px-4 bg-[#0b132b]">
          <div className="max-w-md mx-auto">
            <div className="bg-slate-900 rounded-[32px] p-8 shadow-2xl border border-white/10 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,152,0,0.06)_0%,transparent_70%)] pointer-events-none" />
              
              <div className="flex justify-center mb-6 relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-[#ff9f1c]/10 border border-[#ff9f1c]/20 flex items-center justify-center text-[#ff9f1c]">
                  <BookOpen className="w-8 h-8" />
                </div>
              </div>
              
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#ff9f1c] relative z-10 block mb-1">
                Knowledge & Research Hub
              </span>
              
              <h2 className="text-2xl font-extrabold text-white mb-3 relative z-10">
                OloBuy Insights & Blogs
              </h2>
              
              <p className="text-white/60 text-sm mb-8 relative z-10">
                Explore Research Institute, Entrepreneurship, Business & Trade news to protect and scale your online trade.
              </p>

              <div className="relative z-10">
                <Link 
                  href="/insights"
                  className="w-full flex items-center justify-center gap-2 bg-[#ff9f1c] hover:bg-[#f3930e] text-slate-950 font-bold py-4 px-6 rounded-2xl transition-all shadow-md"
                >
                  Explore Insights Hub <span>→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
        {/* ---------------------------------------------------- */}

      </main>
      
      <CtaFooter />
      <WhatsAppFloat />
    </div>
  );
}

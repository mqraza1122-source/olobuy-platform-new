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
import blogsData from '@/data/blogs.json'
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

        {/* --- پرفیکٹ گلوبل سائز بلاگ کارڈ سیکشن --- */}
        <section className="py-16 px-4 bg-[#0b132b]">
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-end mb-8">
              <h2 className="text-2xl md:text-3xl font-extrabold text-white">Fraud Protection Guides</h2>
              <Link href="/blog" className="text-sm font-semibold text-amber-400 hover:underline">
                View All Blog →
              </Link>
            </div>

            {/* Horizontal Swipe Cards */}
            <div className="flex gap-4 overflow-x-auto pb-6 scrollbar-none">
              {blogsData.map((post) => (
                <div
                  key={post.slug}
                  className="w-[320px] md:w-[360px] bg-white rounded-[32px] p-8 shadow-2xl flex-shrink-0 flex flex-col justify-between border border-slate-100 hover:shadow-3xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div>
                    {/* Shield Icon */}
                    <div className="flex justify-center mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-[#0b132b] flex items-center justify-center shadow-md text-amber-400">
                        <ShieldCheck className="w-7 h-7" />
                      </div>
                    </div>

                    <div className="text-center">
                      <span className="inline-block px-4 py-1 bg-amber-50 text-amber-800 text-xs font-extrabold rounded-full uppercase tracking-wider mb-3">
                        {post.category}
                      </span>
                      <h3 className="text-xl font-extrabold text-slate-900 mb-3 leading-snug line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-slate-600 text-[13px] mb-6 line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>

                  {/* Read More Articles Button - Large & Clear */}
                  <div>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="w-full flex items-center justify-center gap-2 bg-[#ff9f1c] hover:bg-[#f3930e] text-slate-950 font-bold py-4 px-6 rounded-2xl transition-all shadow-xl hover:shadow-2xl text-base"
                    >
                      Read More Articles →
                    </Link>
                  </div>
                </div>
              ))}
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

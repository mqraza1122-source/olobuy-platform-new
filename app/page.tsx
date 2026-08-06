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

export default function HomePage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SchemaMarkup />
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <Features />
        <Testimonials />
        <Faq />
        <TrustPartners />

        {/* ہوم پیج سلائیڈر سیکشن */}
<section className="py-12 bg-white">
  <div className="max-w-5xl mx-auto px-4">
    <div className="flex justify-between items-end mb-8">
      <h2 className="text-2xl font-bold text-slate-900">Fraud Protection Guides</h2>
      <Link href="/blog" className="text-sm font-semibold text-blue-600 hover:underline">View All →</Link>
    </div>
    
    {/* چھوٹا اور اسٹائلش کارڈ سوائپر */}
    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
      {blogsData.map((post) => (
        <div key={post.slug} className="min-w-[240px] max-w-[240px] bg-slate-50 rounded-2xl p-5 border border-slate-100 flex-shrink-0">
          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">{post.category}</span>
          <h3 className="text-sm font-bold text-slate-900 mt-2 mb-3 leading-snug line-clamp-2">{post.title}</h3>
          <Link href={`/blog/${post.slug}`} className="text-xs font-bold text-slate-900 underline">Learn more</Link>
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

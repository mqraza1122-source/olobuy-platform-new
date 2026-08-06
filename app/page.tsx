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

        {/* --- ورلڈ کلاس بلاگ سوائپ سلائیڈر (فوٹر سے ٹھیک اوپر) --- */}
        <section className="py-12 bg-slate-50 border-t border-slate-200">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-slate-900">Fraud Protection Guides</h2>
              <Link href="/blog" className="text-sm font-semibold text-blue-600 hover:underline">
                View All Blog →
              </Link>
            </div>
            
            {/* موبائل پر بائیں دائیں سوائپ (Horizontal Scroll) ہونے والا باکس */}
            <div className="flex gap-6 overflow-x-auto pb-4 pt-1 px-1 scrollbar-none">
              {blogsData.map((post) => (
                <div 
                  key={post.slug} 
                  className="min-w-[280px] md:min-w-[350px] bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex-shrink-0 flex flex-col justify-between"
                >
                  <div>
                    <span className="text-xs font-semibold uppercase text-blue-600">{post.category}</span>
                    <h3 className="text-lg font-bold text-slate-900 mt-2 mb-2 line-clamp-2">{post.title}</h3>
                    <p className="text-slate-600 text-sm line-clamp-3 mb-4">{post.excerpt}</p>
                  </div>
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-semibold text-slate-900 hover:text-blue-600"
                  >
                    Learn more →
                  </Link>
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

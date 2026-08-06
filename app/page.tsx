import blogsData from '@/data/blogs.json'
import Link from 'next/link'
import { ShieldCheck } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { CtaFooter } from '@/components/cta-footer'

export default function HomePage() {
  return (
    <div className="flex min-h-dvh flex-col bg-[#0b132b]">
      <SiteHeader />
      
      <main className="flex-1">
        {/* ہیرو سیکشن یا باقی ہوم پیج کا مواد اگر ہو تو یہاں رہے گا */}

        {/* ایمیزون اسٹائل بلاگ سیکشن */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-end mb-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2">
                  Fraud Protection Guides
                </h2>
                <p className="text-slate-400 text-xs">Latest insights to keep your trades secure.</p>
              </div>
              <Link href="/blog" className="text-amber-400 hover:underline font-bold text-sm">
                View All Blog →
              </Link>
            </div>

            <div className="space-y-4">
              {blogsData.slice(0, 4).map((post) => (
                <div 
                  key={post.slug}
                  className="bg-white rounded-[24px] p-5 shadow-lg flex flex-col md:flex-row items-center gap-6 border border-slate-100 transition-all hover:shadow-xl"
                >
                  <div className="w-full md:w-48 h-32 rounded-2xl bg-slate-900 flex flex-col items-center justify-center p-4 relative overflow-hidden shrink-0 border-2 border-amber-400/20 shadow-inner">
                    <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-[#ff9f1c]/20 rounded-full blur-xl"></div>
                    <ShieldCheck className="w-8 h-8 text-amber-400 mb-2" />
                    <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest text-center">
                      OloBuy Security
                    </span>
                  </div>

                  <div className="flex-1 w-full">
                    <span className="text-[10px] font-extrabold text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full uppercase tracking-wider mb-2 inline-block">
                      {post.category}
                    </span>
                    <h3 className="text-base md:text-lg font-extrabold text-slate-900 mb-2 leading-snug line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-slate-600 text-xs mb-4 line-clamp-1">
                      {post.excerpt}
                    </p>
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-xs font-bold text-slate-950 bg-[#ff9f1c] hover:bg-[#f3930e] px-4 py-2 rounded-xl transition-all shadow-sm"
                    >
                      Learn more <span>→</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <CtaFooter />
    </div>
  )
}

import blogsData from '@/data/blogs.json'
import Link from 'next/link'
import { ShieldCheck } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { CtaFooter } from '@/components/cta-footer'

export default function HomePage() {
  const latestPost = blogsData[0]

  return (
    <div className="flex min-h-dvh flex-col bg-[#0b132b]">
      <SiteHeader />
      
      <main className="flex-1 py-16 px-4">
        <div className="max-w-md mx-auto">
          {/* سیکشن ہیڈنگ - اب یہاں سے View All Blog کا بٹن بالکل ہٹا دیا گیا ہے */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-white">
              Fraud Protection Guides
            </h2>
          </div>

          {/* ہوم پیج کا مین بڑا کارڈ */}
          {latestPost && (
            <div className="bg-white rounded-[32px] p-6 md:p-8 shadow-2xl flex flex-col justify-between border border-slate-100">
              <div>
                <div className="flex justify-center mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#0b132b] flex items-center justify-center shadow-md text-amber-400">
                    <ShieldCheck className="w-7 h-7" />
                  </div>
                </div>
                
                <div className="text-center">
                  <span className="inline-block px-3 py-1 bg-amber-50 text-amber-800 text-[10px] font-extrabold rounded-full uppercase tracking-wider mb-3">
                    {latestPost.category}
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-900 mb-3 leading-snug">
                    {latestPost.title}
                  </h3>
                  <p className="text-slate-600 text-xs mb-8 leading-relaxed line-clamp-3">
                    {latestPost.excerpt}
                  </p>
                </div>
              </div>

              {/* اس بٹن پر کلک کرنے سے یوزر ایمیزون سٹائل والے بلاگ لسٹنگ پیج پر جائے گا */}
              <Link 
                href="/blog"
                className="w-full flex items-center justify-center gap-2 bg-[#ff9f1c] hover:bg-[#f3930e] text-slate-950 font-extrabold py-4 px-6 rounded-2xl transition-all shadow-lg text-sm"
              >
                Read Article <span>→</span>
              </Link>
            </div>
          )}
        </div>
      </main>

      <CtaFooter />
    </div>
  )
}

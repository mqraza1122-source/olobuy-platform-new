import blogsData from '@/data/blogs.json'
import Link from 'next/link'
import { ShieldCheck } from 'lucide-react'
import { SiteHeader } from '@/components/site-header'
import { CtaFooter } from '@/components/cta-footer'
import { WhatsAppFloat } from '@/components/whatsapp-float'

export default function BlogPage() {
  const featuredPost = blogsData[0]
  const remainingPosts = blogsData.slice(1)

  return (
    <div className="flex min-h-dvh flex-col bg-[#0b132b]">
      <SiteHeader />
      
      <main className="flex-1 py-16 px-4">
        <div className="max-w-3xl mx-auto">
          {/* پیج کی ہیڈنگ */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
              Global Security & Fraud Protection Guides
            </h1>
            <p className="text-slate-400 text-xs md:text-sm max-w-lg mx-auto">
              Master-level insights designed to guarantee safe online shopping and transactions in Pakistan.
            </p>
          </div>

          {/* 1. ٹاپ پر پہلا گولڈن بلاگ پورا شو ہوگا */}
          {featuredPost && (
            <div className="bg-white rounded-[32px] p-6 md:p-8 shadow-2xl mb-12 border border-slate-100">
              <div className="w-full h-40 rounded-2xl bg-slate-900 flex flex-col items-center justify-center p-4 relative overflow-hidden mb-6 border-2 border-amber-400/20 shadow-inner">
                <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-[#ff9f1c]/20 rounded-full blur-xl"></div>
                <ShieldCheck className="w-10 h-10 text-amber-400 mb-2" />
                <span className="text-[10px] font-bold text-slate-300 uppercase tracking-widest text-center">
                  OloBuy Master SEO Guide #1
                </span>
              </div>

              <span className="text-[10px] font-extrabold text-amber-800 bg-amber-50 px-3 py-1 rounded-full uppercase tracking-wider mb-3 inline-block">
                {featuredPost.category}
              </span>
              
              <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 mb-3 leading-snug">
                {featuredPost.title}
              </h2>
              
              <p className="text-slate-600 text-xs md:text-sm mb-6 leading-relaxed">
                {featuredPost.excerpt}
              </p>

              <Link 
                href={`/blog/${featuredPost.slug}`}
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-950 bg-[#ff9f1c] hover:bg-[#f3930e] px-5 py-3 rounded-xl transition-all shadow-md"
              >
                Read Full Article <span>→</span>
              </Link>
            </div>
          )}

          {/* 2. نیچے باقی دو بلاگز Amazon اسٹائل ہوریزنٹل لسٹ میں */}
          <div className="space-y-4">
            <h3 className="text-xl font-extrabold text-white mb-6 pt-4 border-t border-slate-800">
              Trending Security Articles
            </h3>

            {remainingPosts.map((post) => (
              <div 
                key={post.slug}
                className="bg-white rounded-[24px] p-4 md:p-5 shadow-lg flex flex-col sm:flex-row items-center gap-5 border border-slate-100 transition-all hover:shadow-xl"
              >
                {/* بائیں طرف چھوٹا سیکیورٹی گرافک کارڈ */}
                <div className="w-full sm:w-36 h-28 rounded-xl bg-slate-900 flex flex-col items-center justify-center p-3 relative overflow-hidden shrink-0 border border-amber-400/20 shadow-inner">
                  <div className="absolute -right-3 -bottom-3 w-12 h-12 bg-[#ff9f1c]/20 rounded-full blur-lg"></div>
                  <ShieldCheck className="w-7 h-7 text-amber-400 mb-1" />
                  <span className="text-[9px] font-bold text-slate-300 uppercase tracking-wider text-center">
                    OloBuy Verified
                  </span>
                </div>

                {/* دائیں طرف ٹائٹل اور بٹن */}
                <div className="flex-1 w-full text-left">
                  <span className="text-[9px] font-extrabold text-amber-800 bg-amber-50 px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-1.5 inline-block">
                    {post.category}
                  </span>
                  <h4 className="text-sm sm:text-base font-extrabold text-slate-900 mb-1.5 leading-snug">
                    {post.title}
                  </h4>
                  <p className="text-slate-600 text-xs mb-3 line-clamp-1">
                    {post.excerpt}
                  </p>
                  <Link 
                    href={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-950 bg-[#ff9f1c] hover:bg-[#f3930e] px-3.5 py-2 rounded-lg transition-all shadow-sm"
                  >
                    Learn more <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>

      <CtaFooter />
      <WhatsAppFloat />
    </div>
  )
}

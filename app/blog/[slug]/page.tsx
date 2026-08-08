import blogsData from '@/data/blogs.json'
import { SiteHeader } from '@/components/site-header'
import { CtaFooter } from '@/components/cta-footer'
import { WhatsAppFloat } from '@/components/whatsapp-float'
import { ShieldCheck, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

interface PageProps {
  params: {
    slug: string
  }
}

// یہ فنکشن Vercel کو بتاتا ہے کہ JSON سے تمام سلگس اٹھا کر ان کے صفحات پہلے ہی بنا لو
export async function generateStaticParams() {
  return blogsData.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = params
  const post = blogsData.find((p) => p.slug === slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="flex min-h-dvh flex-col bg-[#0b132b]">
      <SiteHeader />
      
      <main className="flex-1 py-12 px-4">
        <article className="max-w-3xl mx-auto">
          {/* Back button */}
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blog & Guides
          </Link>

          {/* Main Card */}
          <div className="bg-white rounded-[32px] p-6 md:p-10 shadow-2xl mb-8 border border-slate-200">
            <span className="text-[10px] font-extrabold text-amber-900 bg-amber-100 px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">
              {post.category}
            </span>
            
            <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="w-full h-48 rounded-2xl bg-slate-900 flex flex-col items-center justify-center p-4 relative overflow-hidden mb-8 border-2 border-amber-400/20 shadow-inner">
              <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-[#ff9f1c]/20 rounded-full blur-xl"></div>
              <ShieldCheck className="w-12 h-12 text-amber-400 mb-2" />
              <span className="text-xs font-bold text-slate-200 uppercase tracking-widest text-center">
                OloBuy Verified Security Article
              </span>
            </div>

            {/* Content Area */}
            <div className="text-slate-900 space-y-6 text-sm md:text-base leading-relaxed">
              <p className="text-slate-900 font-medium text-lg">
                {post.excerpt}
              </p>
              
              <div className="border-t border-slate-200 pt-6 mt-6">
                <h2 className="text-xl font-bold text-slate-900 mb-3">OloBuy Escrow & Security Standards</h2>
                <p className="text-slate-700">
                  Protecting your digital transactions and preventing online shopping fraud in Pakistan is our primary mission. Whether you are dealing across cities like Lahore, Karachi, Islamabad, or Pishin, OloBuy ensures complete financial safety through manual verification and secure escrow processing.
                </p>
              </div>
            </div>
          </div>

          {/* WhatsApp Support Box */}
          <div className="bg-[#111827] border border-amber-500/30 rounded-3xl p-6 text-center shadow-xl">
            <h3 className="text-lg font-bold text-white mb-2">Need a Secure Deal Verification?</h3>
            <p className="text-slate-300 text-xs mb-4">Protect your transactions instantly using OloBuy manual escrow.</p>
            <a
              href="https://wa.me/923043031572"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#25d366] text-white font-bold px-6 py-3 rounded-xl text-xs shadow-md hover:bg-[#20ba5a] transition-all"
            >
              <span>Chat with Escrow Expert on WhatsApp</span>
            </a>
          </div>

        </article>
      </main>

      <CtaFooter />
      <WhatsAppFloat />
    </div>
  )
            }

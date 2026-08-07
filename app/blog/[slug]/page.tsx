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

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = blogsData.find((p) => p.slug === slug)

  if (!post) {
    notFound()
  }

  const renderBlogContent = () => {
    switch (slug) {
      case 'safe-online-shopping-in-pakistan-avoiding-scams':
        return (
          <div className="space-y-6 text-slate-700 text-sm md:text-base leading-relaxed">
            <h2 className="text-2xl font-extrabold text-slate-900 mt-6 mb-3">The Rise of E-Commerce and Scams in Pakistan</h2>
            <p>
              Online shopping has revolutionized retail in Pakistan. From buying gadgets on Facebook marketplace to securing clothing deals on Instagram, millions of transactions happen daily. However, this boom has also led to a massive surge in advance payment scams, fake items, and non-delivery frauds.
            </p>
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
              <h3 className="text-lg font-bold text-amber-800 mb-2">Common Risks Faced by Pakistani Shoppers:</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2"><span>•</span> Paying full advance via JazzCash/EasyPaisa and receiving bricks or low-quality clothes.</li>
                <li className="flex items-start gap-2"><span>•</span> Sellers blocking buyers after receiving online transfers.</li>
                <li className="flex items-start gap-2"><span>•</span> No secure mechanism for peer-to-peer (P2P) trading.</li>
              </ul>
            </div>
            <h2 className="text-2xl font-extrabold text-slate-900 mt-6 mb-3">How OloBuy Solves This Problem via Manual Escrow</h2>
            <p>
              To guarantee <strong>safe online shopping in Pakistan</strong>, OloBuy acts as a trusted third-party manual escrow service. Instead of sending money directly to an unknown seller, the buyer transfers funds to OloBuy. We hold the money securely until the buyer receives the package, checks it, and confirms satisfaction. Only then is the payment released to the seller.
            </p>
          </div>
        );

      case 'how-to-avoid-online-shopping-fraud-pakistan':
        return (
          <div className="space-y-6 text-slate-700 text-sm md:text-base leading-relaxed">
            <h2 className="text-2xl font-extrabold text-slate-900 mt-6 mb-3">Ultimate Guide to Spotting Online Scams</h2>
            <p>
              Getting scammed online leaves a bitter experience. Whether you are trading used items on OLX or purchasing from social media pages, protecting your hard-earned cash requires strict security protocols.
            </p>
            <h3 className="text-xl font-bold text-amber-800 mt-4 mb-2">Top 4 Rules to Avoid Fraud:</h3>
            <ol className="list-decimal pl-5 space-y-2">
              <li><strong>Never trust unverified sellers:</strong> Always check reviews and business legitimacy.</li>
              <li><strong>Avoid 100% advance payments:</strong> Never transfer full amounts to random personal bank accounts.</li>
              <li><strong>Use Escrow Services:</strong> Always prefer platforms like OloBuy that hold payments securely.</li>
              <li><strong>Keep Conversation Proof:</strong> Save all chat logs and transaction receipts until the deal is successfully completed.</li>
            </ol>
          </div>
        );

      case 'why-manual-escrow-service-is-future-of-pakistan-ecommerce':
        return (
          <div className="space-y-6 text-slate-700 text-sm md:text-base leading-relaxed">
            <h2 className="text-2xl font-extrabold text-slate-900 mt-6 mb-3">Bridging the Trust Gap in Digital Commerce</h2>
            <p>
              The digital economy in Pakistan relies heavily on trust, but trust is scarce when dealing with anonymous parties online. Traditional payment gateways only process transactions; they do not protect buyers from fraud. This is where a <strong>Manual Escrow Service</strong> becomes a game-changer.
            </p>
            <p>
              By holding funds in a secure neutral pool, manual escrow eliminates the fear of online cheating, empowering small businesses, freelancers, and everyday buyers to execute high-value deals with complete peace of mind.
            </p>
          </div>
        );

      default:
        return (
          <div className="text-slate-700">
            <p>{post.excerpt}</p>
            <p className="mt-4">Detailed content for this article is being updated soon.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-dvh flex-col bg-[#0b132b]">
      <SiteHeader />
      
      <main className="flex-1 py-12 px-4">
        <article className="max-w-3xl mx-auto">
          {/* Back button to Blog page */}
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Blog & Guides
          </Link>

          {/* Main Card with White Background and Dark Text */}
          <div className="bg-white rounded-[32px] p-6 md:p-10 shadow-2xl mb-8 border border-slate-100">
            <span className="text-[10px] font-extrabold text-amber-800 bg-amber-50 px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">
              {post.category}
            </span>
            
            <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 mb-6 leading-tight">
              {post.title}
            </h1>

            <div className="w-full h-48 rounded-2xl bg-slate-900 flex flex-col items-center justify-center p-4 relative overflow-hidden mb-8 border-2 border-amber-400/20 shadow-inner">
              <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-[#ff9f1c]/20 rounded-full blur-xl"></div>
              <ShieldCheck className="w-12 h-12 text-amber-400 mb-2" />
              <span className="text-xs font-bold text-slate-300 uppercase tracking-widest text-center">
                OloBuy Verified Security Article
              </span>
            </div>

            {/* Article Content with clear dark text */}
            <div className="max-w-none">
              {renderBlogContent()}
            </div>
          </div>

          {/* WhatsApp Support Box */}
          <div className="bg-[#111827] border border-amber-500/30 rounded-3xl p-6 text-center shadow-xl">
            <h3 className="text-lg font-bold text-white mb-2">Need a Secure Deal Verification?</h3>
            <p className="text-slate-400 text-xs mb-4">Protect your transactions instantly using OloBuy manual escrow.</p>
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

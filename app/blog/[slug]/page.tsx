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
      case 'how-to-start-safe-trade-freelance-in-pakistan':
      case 'safe-trade-and-freelance-pakistan-without-traveling':
        return (
          <div className="space-y-6 text-slate-900 text-sm md:text-base leading-relaxed">
            <h2 className="text-2xl font-extrabold text-slate-900 mt-6 mb-3">Why Pakistani Freelancers and Traders Struggle with Trust</h2>
            <p className="text-slate-900 font-normal">
              Digital commerce and freelancing are booming across Pakistan. Whether you are delivering a high-value graphic design project in Lahore, buying a used gaming laptop from Karachi, or selling customized products online from Islamabad, one major hurdle remains: <strong>the trust gap</strong>. 
            </p>
            <p className="text-slate-900 font-normal">
              Historically, completing high-value deals or trading items across different cities meant taking massive risks, or worse—spending time and money traveling just to verify a product face-to-face.
            </p>

            <div className="bg-slate-100 p-5 rounded-2xl border border-slate-300 text-slate-900 my-6">
              <h3 className="text-lg font-bold text-amber-900 mb-3">The Hidden Costs of Traditional Inter-City Trading:</h3>
              <ul className="space-y-3 text-slate-900">
                <li className="flex items-start gap-2 text-slate-900">
                  <span className="text-amber-700 font-bold">•</span> 
                  <div><strong className="text-slate-900">Heavy Travel Expenses:</strong> Booking bus or train tickets between cities just to inspect a product or close a deal often drains your profit margin.</div>
                </li>
                <li className="flex items-start gap-2 text-slate-900">
                  <span className="text-amber-700 font-bold">•</span> 
                  <div><strong className="text-slate-900">Massive Time Waste:</strong> Spending hours on the road or coordinating schedules halts your core business productivity.</div>
                </li>
                <li className="flex items-start gap-2 text-slate-900">
                  <span className="text-amber-700 font-bold">•</span> 
                  <div><strong className="text-slate-900">Advance Payment Fear:</strong> Transferring 100% money upfront to strangers on social media carries a high risk of getting scammed or receiving fake goods.</div>
                </li>
              </ul>
            </div>

            <h2 className="text-2xl font-extrabold text-slate-900 mt-6 mb-3">How to Start Safe Trade & Freelancing Without Traveling</h2>
            <p className="text-slate-900 font-normal">
              You no longer need to pack your bags or risk your hard-earned cash to conduct safe business transactions in Pakistan. Platforms like <strong className="text-slate-900 font-bold">OloBuy</strong> have completely transformed digital trade by introducing a secure manual escrow system tailored for local buyers, sellers, and freelancers.
            </p>

            <h3 className="text-xl font-bold text-amber-900 mt-5 mb-2">The OloBuy 3-Step Safe Trading Process:</h3>
            <ol className="list-decimal pl-5 space-y-3 text-slate-900">
              <li className="text-slate-900"><strong className="text-slate-900">Secure Deposit:</strong> The buyer deposits the payment into OloBuy's secure neutral account instead of sending it directly to an unknown seller's personal bank account.</li>
              <li className="text-slate-900"><strong className="text-slate-900">Home Inspection (Chiz Ghar Beth Kay Check Kro):</strong> The product or freelance deliverable is shipped or handed over. You inspect the item thoroughly from the comfort of your home.</li>
              <li className="text-slate-900"><strong className="text-slate-900">Risk-Free Payment Release:</strong> Only when you are 100% satisfied with the quality does OloBuy release the funds to the seller. If there's an issue, your money remains safe.</li>
            </ol>

            <h2 className="text-2xl font-extrabold text-slate-900 mt-6 mb-3">Empowering Pakistan's Digital Economy</h2>
            <p className="text-slate-900 font-normal">
              By eliminating travel requirements, saving valuable hours, and removing the fear of advance payment fraud, <strong className="text-slate-900 font-bold">OloBuy</strong> provides the ultimate infrastructure for safe trade and freelancing in Pakistan. Whether you scale your online business or hire a remote freelancer, security is now just a click away.
            </p>
          </div>
        );

      default:
        return (
          <div className="text-slate-900">
            <p className="text-slate-900">{post.excerpt}</p>
            <p className="mt-4 text-slate-900">Detailed content for this article is being updated soon.</p>
          </div>
        );
    }
  };

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
            <div className="text-slate-900">
              {renderBlogContent()}
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

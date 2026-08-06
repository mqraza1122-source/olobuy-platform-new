import { SiteHeader } from '@/components/site-header'
import { CtaFooter } from '@/components/cta-footer'
import { WhatsAppFloat } from '@/components/whatsapp-float'
import SchemaMarkup from '@/components/schema-markup'
import Link from 'next/link'
import { ShieldCheck } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="flex min-h-dvh flex-col bg-[#0b132b]">
      <SchemaMarkup />
      <SiteHeader />
      <main className="flex-1 py-16 px-4">
        <div className="max-w-md mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-white mb-8">
            Fraud Protection Guides
          </h2>

          <div className="bg-white rounded-[32px] p-6 shadow-2xl border border-slate-100">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-2xl bg-[#0b132b] flex items-center justify-center text-amber-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
            </div>
            
            <span className="inline-block px-3 py-1 bg-amber-50 text-amber-800 text-[10px] font-extrabold rounded-full uppercase tracking-wider mb-2">
              Security Guides
            </span>
            
            <h3 className="text-lg font-extrabold text-slate-900 mb-3">
              Explore All OloBuy Security & Fraud Protection Articles
            </h3>
            
            <p className="text-slate-600 text-xs mb-6">
              Learn how to stay safe from online scams, fake receipts, and secure your transactions.
            </p>

            <Link 
              href="/blog"
              className="w-full flex items-center justify-center gap-2 bg-[#ff9f1c] hover:bg-[#f3930e] text-slate-950 font-bold py-4 px-6 rounded-2xl transition-all shadow-md text-sm"
            >
              View All Blog Articles <span>→</span>
            </Link>
          </div>
        </div>
      </main>
      <CtaFooter />
      <WhatsAppFloat />
    </div>
  )
}

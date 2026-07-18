'use client'
import { ShieldCheck, Eye, MessageCircle, Banknote, Package, Users } from 'lucide-react'

const FEATURES = [
  { icon: ShieldCheck, title: 'No Advance Fraud', desc: 'Providers never receive money upfront. We hold it securely.' },
  { icon: Eye, title: 'Inspect Before Release', desc: 'Buyer inspects the goods/service before payment is released.' },
  { icon: MessageCircle, title: 'Simple WhatsApp Deals', desc: 'Easily manage and initiate all your deals through WhatsApp.' },
  { icon: Banknote, title: 'Secure Escrow Holding', desc: 'Funds are held in a neutral, secure account until deal completion.' },
  { icon: Package, title: 'Versatile Usage', desc: 'Perfect for physical goods, digital products, and services alike.' },
  { icon: Users, title: 'Fair for Both Parties', desc: 'Equal protection and peace of mind for both buyers and sellers.' },
]

export function Features() {
  return (
    <section id="why" className="bg-[#1a237e] py-20 px-4 sm:py-28">
      <div className="mx-auto max-w-5xl flex flex-col items-center">
        
        {/* بہتر ہیڈنگ اسٹائل */}
        <div className="mb-16 bg-[#ff9800] text-[#1a237e] font-black py-4 px-10 rounded-full text-xl md:text-2xl shadow-xl tracking-wider uppercase text-center">
          Why Choose OloBuy?
        </div>

        {/* موبائل کے لیے سنگل کالم (grid-cols-1) اور ڈیسک ٹاپ کے لیے ڈبل کالم (sm:grid-cols-2) */}
        <div className="w-full grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => {
            const Icon = f.icon
            return (
              <div key={f.title} className="bg-[#283593] p-8 rounded-[2.5rem] border border-white/10 shadow-2xl transition-all hover:border-[#ff9800]/30 hover:bg-[#303f9f]">
                <div className="mb-6 inline-flex rounded-3xl bg-[#1a237e] p-4 border border-white/10">
                  <Icon className="h-8 w-8 text-[#ff9800]" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 leading-snug">
                  {f.title}
                </h3>
                <p className="text-blue-100/90 text-base leading-relaxed">
                  {f.desc}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
   }

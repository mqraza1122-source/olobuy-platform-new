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
    <section id="why" className="bg-[#1a237e] py-12 px-4">
      
      {/* 1. WHY CHOOSE SECTION */}
      <div className="mx-auto max-w-5xl flex flex-col items-center mb-12">
        <div className="mb-12 w-full bg-[#ff9800] text-[#1a237e] font-black py-4 px-6 rounded-[2rem] text-xl uppercase text-center shadow-lg">
          Why Choose OloBuy?
        </div>

        <div className="w-full grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => {
            const Icon = f.icon
            return (
              <div key={f.title} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-lg">
                {/* آئیکون اور ہیڈنگ اب ایک لائن میں ہیں */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="rounded-xl bg-[#f0f4f8] p-2 shrink-0">
                    <Icon className="h-5 w-5 text-[#25d366]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1a237e] leading-tight">{f.title}</h3>
                </div>
                {/* تفصیل ہیڈنگ کے نیچے */}
                <p className="text-gray-600 text-sm leading-relaxed pl-1">
                  {f.desc}
                </p>
              </div>
            )
          })}
        </div>
      </div>

      {/* 2. ORIGINAL LIFE, ORIGINAL BUY BUTTON */}
      <div className="mx-auto max-w-5xl mb-6">
        <div className="w-full bg-[#ff9800] text-[#1a237e] font-black py-4 px-2 rounded-[2rem] text-[15px] uppercase text-center shadow-lg whitespace-nowrap">
          Original Life, Original Buy
        </div>
      </div>

      {/* 3. CLEAN STATS SECTION */}
      <div className="mx-auto max-w-5xl text-center">
        <div className="grid grid-cols-3 gap-3">
          {[
            { title: "1000+", subtitle: "SAFE DEALS" },
            { title: "9.5M+", subtitle: "PROTECTED" },
            { title: "4.9/5", subtitle: "RATING" },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-4 rounded-[1.5rem] shadow-lg flex flex-col items-center justify-center">
              <h3 className="text-xl font-black text-[#ff9800]">{stat.title}</h3>
              <p className="text-[10px] text-[#1a237e] font-bold tracking-widest mt-1">{stat.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
        }

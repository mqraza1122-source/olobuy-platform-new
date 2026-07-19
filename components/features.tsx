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
      
      {/* نئی ہیڈنگ اور کارڈ */}
      <div className="mx-auto max-w-5xl flex flex-col items-center mb-16">
        <h1 className="text-white text-3xl font-bold mb-6 text-center">Original Life, Original Data</h1>
        <div className="w-full bg-gradient-to-r from-[#ff9800] to-[#1a237e] p-[2px] rounded-[2rem]">
          <div className="bg-[#1a237e] py-6 px-8 rounded-[2rem] text-center">
            <h2 className="text-[#ff9800] text-2xl font-black uppercase tracking-widest">Why Choose OloBuy?</h2>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="mx-auto max-w-5xl grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mb-16">
        {FEATURES.map((f) => {
          const Icon = f.icon
          return (
            <div key={f.title} className="bg-[#283593] p-6 rounded-[2rem] border border-white/10 shadow-lg hover:border-[#ff9800]/30 transition-all">
              <div className="mb-4 inline-flex rounded-2xl bg-[#1a237e] p-3 border border-white/10">
                <Icon className="h-6 w-6 text-[#ff9800]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{f.title}</h3>
              <p className="text-blue-100/80 text-sm leading-relaxed">{f.desc}</p>
            </div>
          )
        })}
      </div>

      {/* Stats Section */}
      <div className="mx-auto max-w-5xl text-center">
        <div className="grid grid-cols-3 gap-3">
          {[
            { title: "1000+", subtitle: "SAFE DEALS" },
            { title: "9.5M+", subtitle: "PROTECTED (PKR)" },
            { title: "4.9/5", subtitle: "RATING" },
          ].map((stat, i) => (
            <div key={i} className="bg-[#ff9800] p-4 rounded-2xl border border-white/10 shadow-lg">
              <h3 className="text-xl font-black text-[#1a237e]">{stat.title}</h3>
              <p className="text-[9px] text-[#1a237e] font-bold tracking-wider">{stat.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
              }

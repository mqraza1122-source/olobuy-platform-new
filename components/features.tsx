'use client'
import { ShieldCheck, Eye, MessageCircle, Banknote, Package, Users } from 'lucide-react'

const FEATURES = [
  { icon: ShieldCheck, title: 'No Advance Fraud', desc: 'Providers never receive money upfront.' },
  { icon: Eye, title: 'Inspect Before Release', desc: 'Payment is released after inspection.' },
  { icon: MessageCircle, title: 'Simple WhatsApp', desc: 'Manage deals on WhatsApp.' },
  { icon: Banknote, title: 'Secure Money', desc: 'Funds held in neutral escrow.' },
  { icon: Package, title: 'Versatile', desc: 'Goods or digital services.' },
  { icon: Users, title: 'Fair for All', desc: 'Middleman protection.' },
]

export function Features() {
  return (
    <section id="why" className="bg-[#1a237e] py-16 px-4">
      <div className="mx-auto max-w-4xl flex flex-col items-center">
        
        <div className="mb-12 bg-[#ff9800] text-[#1a237e] font-black py-3 px-8 rounded-full text-2xl shadow-lg">
          WHY OLOBUY
        </div>

        <div className="w-full grid gap-6 sm:grid-cols-2">
          {FEATURES.map((f) => (
            <div key={f.title} className="bg-[#283593] p-8 rounded-3xl border border-[#3949ab] shadow-xl">
              <div className="mb-4 text-[#ff9800]">
                <f.icon className="h-10 w-10" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{f.title}</h3>
              <p className="text-blue-100 text-sm">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

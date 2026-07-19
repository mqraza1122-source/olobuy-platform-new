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
        <div className="mb-12 bg-[#ff9800] text-[#1a237e] font-black py-3 px-8 rounded-full text-xl shadow-xl uppercase text-center">
          Why Choose OloBuy?
        </div>

        <div className="w-full grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
      </div>

      {/* 2. TESTIMONIALS SECTION (Directly connected) */}
      <div className="mx-auto max-w-5xl text-center mt-0 pt-0">
        <h2 className="text-orange-500 font-bold uppercase tracking-widest text-xs mb-1">Testimonials</h2>
        <h1 className="text-white text-3xl font-bold mb-8">What Our Users Say</h1>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3 mb-8">
          {[
            { title: "1000+", subtitle: "SAFE DEALS" },
            { title: "PKR 9.5M+", subtitle: "PROTECTED" },
            { title: "4.9/5", subtitle: "RATING" },
          ].map((stat, i) => (
            <div key={i} className="bg-[#283593] p-4 rounded-2xl border border-white/10">
              <h3 className="text-lg font-bold text-white">{stat.title}</h3>
              <p className="text-[9px] text-gray-300 font-semibold">{stat.subtitle}</p>
            </div>
          ))}
        </div>

        {/* Review Card */}
        <div className="bg-[#283593] p-6 rounded-3xl border border-white/10 text-left">
          <span className="text-orange-500 text-4xl leading-none">"</span>
          <div className="flex text-orange-400 mb-2">★★★★★</div>
          <p className="text-white text-sm mb-4">
            Bought branded clothes in bulk from Faisalabad through OloBuy. My money was safe until the parcel reached me.
          </p>
          <div className="border-t border-white/10 pt-4">
            <p className="font-bold text-white text-sm">Luxe Branded fashion</p>
            <p className="text-xs text-gray-400">Buyer, Hyderabad</p>
          </div>
        </div>
      </div>
    </section>
  )
        }

'use client'
import { ShieldCheck, Eye, MessageCircle, Banknote, Package, Users } from 'lucide-react';

const FEATURES = [
  { icon: ShieldCheck, title: 'No Advance Fraud', desc: 'Providers never receive money upfront. We hold it securely.' },
  { icon: Eye, title: 'Inspect Before Release', desc: 'Buyer inspects the goods/service before payment is released.' },
  { icon: MessageCircle, title: 'Simple WhatsApp Deals', desc: 'Easily manage and initiate all your deals through WhatsApp.' },
  { icon: Banknote, title: 'Secure Escrow Holding', desc: 'Funds are held in a neutral, secure account until deal completion.' },
  { icon: Package, title: 'Versatile Usage', desc: 'Perfect for physical goods, digital products, and services alike.' },
  { icon: Users, title: 'Fair for Both Parties', desc: 'Equal protection and peace of mind for both buyers and sellers.' },
];

export function Features() {
  return (
    <section id="why" className="bg-[#0f172a] py-16 px-4">
      <div className="mx-auto max-w-5xl">
        
        {/* Why Choose Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-[#ff9800] text-[#1a237e] font-black px-10 py-4 rounded-[2rem] text-2xl shadow-lg mb-4">
            WHY CHOOSE OLOBY?
          </div>
          <p className="text-white/80 max-w-md mx-auto">
            Trusted by thousands for safe online transactions across Pakistan
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {FEATURES.map((f) => {
            const Icon = f.icon;
            return (
              <div 
                key={f.title} 
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all group"
              >
                <div className="flex items-start gap-5">
                  <div className="mt-1 w-12 h-12 rounded-2xl bg-[#ff9800]/10 flex items-center justify-center group-hover:bg-[#ff9800]/20 transition-colors">
                    <Icon className="h-7 w-7 text-[#ff9800]" />
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
                    <p className="text-white/70 leading-relaxed">
                      {f.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-4 text-center">
          {[
            { number: "1000+", label: "SAFE DEALS" },
            { number: "9.5M+", label: "PROTECTED" },
            { number: "4.9/5", label: "RATING" },
          ].map((stat, i) => (
            <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl py-8">
              <div className="text-4xl font-black text-[#ff9800] mb-1">{stat.number}</div>
              <div className="text-white/70 text-sm font-medium tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
} 

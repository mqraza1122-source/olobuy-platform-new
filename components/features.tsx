'use client';
import { ShieldCheck, Eye, Sparkles, Banknote, Package, Users } from 'lucide-react';

const FEATURES = [
  { icon: ShieldCheck, title: 'No Advance Fraud', desc: 'Providers never receive money upfront. We hold it securely in escrow.' },
  { icon: Eye, title: 'Inspect Before Release', desc: 'Buyer inspects the goods or service before payment is released.' },
  { icon: Sparkles, title: 'Instant Deal Code', desc: 'Easily generate a unique, secure Deal Code via our platform instantly.' },
  { icon: Banknote, title: 'Secure Escrow Holding', desc: 'Funds are held in a neutral, secure account until deal completion.' },
  { icon: Package, title: 'Versatile Usage', desc: 'Perfect for physical goods, digital accounts, and services alike.' },
  { icon: Users, title: 'Fair for Both Parties', desc: 'Equal protection and peace of mind for both buyers and sellers.' },
];

export function Features() {
  return (
    <section id="why" className="bg-[#0f172a] py-16 px-4">
      <div className="mx-auto max-w-5xl">
        
        {/* 1. Why Choose Header Badge */}
        <div className="text-center mb-12">
          <div className="inline-block bg-[#ff9800] text-[#1a237e] font-black px-10 py-4 rounded-[2rem] text-2xl shadow-lg mb-4">
            WHY CHOOSE OLABY?
          </div>
          <p className="text-white/80 max-w-md mx-auto">
            Trusted by thousands for safe online transactions across Pakistan
          </p>
        </div>

        {/* 2. Features Grid */}
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
                    <p className="text-white/70 leading-relaxed text-sm">
                      {f.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3. Binance Style Massive Header - Placed right before Statistics */}
        <div className="text-center mb-10 pt-6 border-t border-white/10">
          <h2 className="text-3xl sm:text-5xl font-black text-[#ff9800] uppercase tracking-tight mb-2 drop-shadow-md">
            USERS TRUST US
          </h2>
          <p className="text-xl sm:text-2xl font-extrabold text-white tracking-wide uppercase">
            The Pakistan's Leading Escrow Trade
          </p>
        </div>

        {/* 4. Stats Section - Restored to Original Old White Cards Style */}
        <div className="grid grid-cols-3 gap-4 text-center">
          {[
            { number: "1000+", label: "SAFE DEALS" },
            { number: "9.5M+", label: "PROTECTED" },
            { number: "4.9/5", label: "RATING" },
          ].map((stat, i) => (
            <div key={i} className="bg-white rounded-[2rem] py-8 px-2 shadow-2xl flex flex-col items-center justify-center transition-all transform hover:scale-105">
              <div className="text-2xl sm:text-4xl font-black text-[#ff9800] mb-1">{stat.number}</div>
              <div className="text-[#1a237e] text-[10px] sm:text-xs font-bold tracking-widest uppercase">{stat.label}</div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
        }

'use client';
import { MessageSquareText, Landmark, Package, ShieldCheck } from 'lucide-react';

const STEPS = [
  { 
    icon: MessageSquareText, 
    title: 'Agree on the Deal', 
    desc: 'Buyer and seller agree on terms and start the deal via our official WhatsApp.' 
  },
  { 
    icon: Landmark, 
    title: 'Secure Payment', 
    desc: 'Buyer sends payment to OloBuy. We hold the money safely in escrow.' 
  },
  { 
    icon: Package, 
    title: 'Delivery & Inspection', 
    desc: 'Seller delivers the item. Buyer inspects and confirms satisfaction.' 
  },
  { 
    icon: ShieldCheck, 
    title: 'Payment Released', 
    desc: 'Once approved, we instantly release payment to the seller. Deal completed safely!' 
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[#0f172a] py-16 px-4">
      <div className="mx-auto max-w-5xl">
        
        <div className="text-center mb-12">
          <div className="inline-block bg-[#ff9800] text-[#1a237e] font-black px-8 py-4 rounded-[2rem] text-2xl mb-4 shadow-lg">
            HOW IT WORKS
          </div>
          <p className="text-white/80 max-w-md mx-auto">
            4 Simple Steps to Complete Your Safe Transaction
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div 
                key={i} 
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all group"
              >
                <div className="flex items-start gap-5">
                  <div className="mt-1 w-12 h-12 rounded-2xl bg-[#ff9800]/10 flex items-center justify-center group-hover:bg-[#ff9800]/20 transition-colors">
                    <Icon className="h-7 w-7 text-[#ff9800]" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-[#ff9800] font-black text-xl">0{i+1}</span>
                      <h3 className="text-xl font-bold text-white">{step.title}</h3>
                    </div>
                    <p className="text-white/70 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

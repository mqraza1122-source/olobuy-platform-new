'use client';
import { MessageSquareText, Landmark, Package, ShieldCheck, MessageCircle } from 'lucide-react';

const STEPS = [
  { 
    icon: MessageSquareText, 
    title: 'Start Deal & Get Code', 
    desc: 'Select your role (Buyer/Seller), enter product details and amount, then click the "Start Secure Deal" button on top to instantly generate a unique Deal Code.' 
  },
  { 
    icon: Landmark, 
    title: 'Secure Escrow Payment', 
    desc: 'The buyer transfers the payment to OloBuy official account. We lock and hold the money safely in escrow.' 
  },
  { 
    icon: Package, 
    title: 'Delivery & Inspection', 
    desc: 'The seller delivers the product or service. The buyer inspects everything and confirms satisfaction on the deal page.' 
  },
  { 
    icon: ShieldCheck, 
    title: 'Payment Released', 
    desc: 'Once approved, we instantly release the funds to the seller. The deal is completed safely and transparently!' 
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
            4 Simple Steps to Complete Your Safe Transaction via OloBuy Deal Code
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-10">
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
                    <p className="text-white/70 leading-relaxed text-sm sm:text-base">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Complex Deal / WhatsApp Support Box */}
        <div className="bg-gradient-to-r from-[#1a237e]/80 to-[#0f172a] border border-[#ff9800]/30 rounded-3xl p-6 sm:p-8 text-center shadow-xl">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#25d366]/20 flex items-center justify-center shrink-0">
              <MessageCircle className="h-7 w-7 text-[#25d366]" />
            </div>
            <div className="text-center sm:text-left">
              <h4 className="text-lg sm:text-xl font-bold text-white mb-1">Have a Complex Deal or Custom Agreement?</h4>
              <p className="text-white/70 text-sm">
                Need manual assistance or special arrangements? Connect directly with our OloBuy team via WhatsApp for personalized handling.
              </p>
            </div>
            <a 
              href="https://wa.me/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-2 sm:mt-0 shrink-0 bg-[#25d366] hover:bg-[#20ba5a] text-white font-bold px-6 py-3 rounded-2xl transition-all shadow-md text-sm flex items-center gap-2"
            >
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}

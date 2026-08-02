'use client';
import { useState } from 'react';
import { MessageSquareText, Landmark, Package, ShieldCheck, MessageCircle, X, ArrowRight } from 'lucide-react';

const STEPS = [
  { 
    icon: MessageSquareText, 
    title: 'Start Deal & Get Code', 
    desc: 'Select your role (Buyer/Seller), enter product details and amount, then click the "Start Secure Deal" button on top to instantly generate a unique Deal Code.',
    details: 'This is the first and most crucial step. Once you input your verified parameters, our manual escrow engine generates a secure tokenized code that tracks your transaction from start to finish with absolute transparency.'
  },
  { 
    icon: Landmark, 
    title: 'Secure Escrow Payment', 
    desc: 'The buyer transfers the payment to OloBuy official account. We lock and hold the money safely in escrow.',
    details: 'Funds are securely retained in our official protected channel. Neither party can access the money prematurely, eliminating online fraud and ensuring complete financial safety for both e-commerce owners and freelancers.'
  },
  { 
    icon: Package, 
    title: 'Delivery & Inspection', 
    desc: 'The seller delivers the product or service. The buyer inspects everything and confirms satisfaction on the deal page.',
    details: 'The seller fulfills the agreed deliverables. The buyer receives time to thoroughly inspect the product, review the service milestones, and validate quality before giving the final green light.'
  },
  { 
    icon: ShieldCheck, 
    title: 'Payment Released', 
    desc: 'Once approved, we instantly release the funds to the seller. The deal is completed safely and transparently!',
    details: 'Upon successful mutual satisfaction and verification, OloBuy instantly disburses the funds directly to the seller. Quick, clean, and completely risk-free transaction completed successfully.'
  },
];

export function HowItWorks() {
  const [selectedStep, setSelectedStep] = useState<typeof STEPS[0] | null>(null);

  return (
    <section id="how-it-works" className="bg-[#0f172a] py-20 px-4 relative overflow-hidden">
      
      {/* Background Glow Accents */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-[#ff9800]/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-[#1a237e]/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="mx-auto max-w-5xl relative z-10">
        
        {/* Section Header with Fade-up */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-block bg-gradient-to-r from-[#ff9800] to-[#f57c00] text-[#0f172a] font-black px-8 py-3 rounded-full text-xl md:text-2xl mb-4 shadow-[0_0_25px_rgba(255,152,0,0.3)] tracking-wider">
            HOW IT WORKS
          </div>
          <p className="text-white/80 max-w-lg mx-auto text-base md:text-lg">
            4 Simple Steps to Complete Your Safe Transaction via OloBuy Deal Code
          </p>
        </div>

        {/* Steps Grid with Staggered Fade-Up Effect */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <div 
                key={i} 
                onClick={() => setSelectedStep(step)}
                className="group bg-white/[0.03] hover:bg-white/[0.07] backdrop-blur-xl border border-white/10 hover:border-[#ff9800]/50 rounded-3xl p-8 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(0,0,0,0.5)] cursor-pointer relative overflow-hidden"
              >
                {/* Subtle top glow line on hover */}
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff9800] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                <div className="flex items-start gap-5">
                  <div className="mt-1 w-14 h-14 rounded-2xl bg-[#ff9800]/10 border border-[#ff9800]/20 flex items-center justify-center group-hover:bg-[#ff9800]/20 group-hover:scale-110 transition-all duration-300 shrink-0">
                    <Icon className="h-7 w-7 text-[#ff9800]" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[#ff9800] font-black text-xl tracking-wider">0{i+1}</span>
                      <span className="text-xs text-white/40 group-hover:text-[#ff9800] transition-colors flex items-center gap-1 font-medium">
                        Tap to view <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#ff9800] transition-colors">
                      {step.title}
                    </h3>
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
        <div className="bg-gradient-to-r from-[#1a237e]/90 via-[#0f172a] to-[#1a237e]/90 border border-[#ff9800]/30 rounded-3xl p-6 sm:p-8 text-center shadow-2xl backdrop-blur-md">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 text-left">
              <div className="w-14 h-14 rounded-2xl bg-[#25d366]/20 border border-[#25d366]/30 flex items-center justify-center shrink-0">
                <MessageCircle className="h-7 w-7 text-[#25d366]" />
              </div>
              <div>
                <h4 className="text-lg sm:text-xl font-bold text-white mb-1">Have a Complex Deal or Custom Agreement?</h4>
                <p className="text-white/70 text-sm max-w-xl">
                  Need manual assistance or special arrangements? Connect directly with our OloBuy team via WhatsApp for personalized handling.
                </p>
              </div>
            </div>
            <a 
              href="https://wa.me/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="shrink-0 bg-[#25d366] hover:bg-[#20ba5a] text-white font-bold px-8 py-4 rounded-2xl transition-all duration-300 shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:scale-105 text-sm flex items-center gap-2"
            >
              <span>Chat on WhatsApp</span>
            </a>
          </div>
        </div>

      </div>

      {/* VIP Pop-Up Modal */}
      {selectedStep && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="bg-[#111827] border border-[#ff9800]/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-[0_20px_50px_rgba(0,0,0,0.8)] transform transition-all scale-100">
            
            {/* Close Button */}
            <button 
              onClick={() => setSelectedStep(null)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-[#ff9800]/20 border border-[#ff9800]/30 flex items-center justify-center shrink-0">
                <selectedStep.icon className="h-7 w-7 text-[#ff9800]" />
              </div>
              <div>
                <span className="text-[#ff9800] text-xs font-bold tracking-widest uppercase">OloBuy Escrow Protocol</span>
                <h3 className="text-2xl font-bold text-white">{selectedStep.title}</h3>
              </div>
            </div>

            {/* Modal Content */}
            <div className="space-y-4 mb-8">
              <div className="bg-white/5 rounded-2xl p-4 border border-white/10">
                <p className="text-white/90 text-base leading-relaxed mb-3">
                  {selectedStep.desc}
                </p>
                <p className="text-white/70 text-sm leading-relaxed border-t border-white/10 pt-3">
                  {selectedStep.details}
                </p>
              </div>
            </div>

            {/* Modal Footer Action */}
            <div className="flex justify-end">
              <button 
                onClick={() => setSelectedStep(null)}
                className="bg-gradient-to-r from-[#ff9800] to-[#f57c00] text-[#0f172a] font-bold px-6 py-3 rounded-xl hover:opacity-90 transition-opacity w-full sm:w-auto shadow-lg"
              >
                Got It, Close
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
    }

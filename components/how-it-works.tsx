'use client'
import { MessageSquareText, Landmark, Package, ShieldCheck } from 'lucide-react'

const STEPS = [
  { icon: MessageSquareText, title: 'Agree on the Deal', desc: 'Buyer and provider agree on the terms and initiate via our official WhatsApp.' },
  { icon: Landmark, title: 'Secure Payment', desc: 'Buyer transfers the agreed amount to OloBuy. We hold funds in our secure escrow.' },
  { icon: Package, title: 'Delivery & Inspection', desc: 'Provider delivers the product/service. Buyer verifies the quality.' },
  { icon: ShieldCheck, title: 'Deal Finalized', desc: 'Upon buyer approval, we release payment to the seller. Deal closed successfully!' },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[#1a237e] py-12 px-4">
      <div className="mx-auto max-w-5xl">
        
        {/* یکساں اسٹائل والا How It Works بٹن */}
        <div className="mb-12 w-full bg-[#ff9800] text-[#1a237e] font-black py-4 px-2 rounded-[2rem] text-[15px] uppercase text-center shadow-lg whitespace-nowrap">
          How It Works
        </div>

        <div className="space-y-6">
          {STEPS.map((step, i) => {
            const Icon = step.icon
            return (
              <div key={i} className="bg-[#283593] p-8 rounded-[2rem] border border-white/10 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[#ff9800] font-black text-sm uppercase tracking-widest">
                    Step {i + 1}
                  </span>
                  <div className={`p-3 rounded-2xl bg-[#1a237e] ${i === 3 ? 'text-[#25d366]' : 'text-[#ff9800]'}`}>
                    <Icon className="h-8 w-8" />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-blue-100/90 text-base leading-relaxed">
                  {step.desc}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
                      }

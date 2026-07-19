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
        
        {/* بٹن کا سائز اور اسٹائل اب Why Choose OloBuy جیسا ہے */}
        <div className="mb-12 w-full bg-[#ff9800] text-[#1a237e] font-black py-4 px-6 rounded-[2rem] text-xl uppercase text-center shadow-lg">
          How It Works
        </div>

        <div className="w-full grid gap-4 sm:grid-cols-2">
          {STEPS.map((step, i) => {
            const Icon = step.icon
            return (
              <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-lg">
                {/* آئیکون اور ہیڈنگ ایک لائن میں */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="rounded-xl bg-[#f0f4f8] p-2 shrink-0">
                    <Icon className="h-5 w-5 text-[#25d366]" />
                  </div>
                  <h3 className="text-lg font-bold text-[#1a237e] leading-tight">
                    {step.title}
                  </h3>
                </div>
                
                {/* سٹیپ اور تفصیل */}
                <div className="pl-1">
                  <span className="text-[#ff9800] font-black text-xs uppercase tracking-widest block mb-1">
                    Step {i + 1}
                  </span>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
          }

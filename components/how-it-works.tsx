'use client'
import { MessageSquareText, Landmark, Package, ShieldCheck, CheckCircle2 } from 'lucide-react'

const STEPS = [
  { icon: MessageSquareText, title: 'Agree on the Deal', desc: 'Buyer and provider agree on the terms and initiate via our official WhatsApp.' },
  { icon: Landmark, title: 'Secure Payment', desc: 'Buyer transfers the agreed amount to OloBuy. We hold funds in our secure escrow.' },
  { icon: Package, title: 'Delivery & Inspection', desc: 'Provider delivers the product/service. Buyer verifies the quality.' },
  { icon: ShieldCheck, title: 'Deal Finalized', desc: 'Upon buyer approval, we release payment to the seller. Deal closed successfully!' },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[#1a237e] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        
        <div className="flex justify-center mb-16">
          <div className="inline-flex rounded-full bg-[#ff9800] px-10 py-4 text-center shadow-[0_0_30px_rgba(255,152,0,0.4)]">
            <h2 className="text-xl md:text-2xl font-black text-[#1a237e] uppercase tracking-widest">
              How It Works
            </h2>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => {
            const Icon = step.icon
            const isLast = i === STEPS.length - 1
            
            return (
              <div
                key={step.title}
                className="relative flex flex-col rounded-[2.5rem] bg-[#283593] p-8 border border-white/10 shadow-2xl transition-all duration-300 hover:border-[#ff9800]/50 hover:-translate-y-2"
              >
                {/* سٹیپ اور نمبر */}
                <div className="flex items-center justify-between mb-8">
                  <div className="text-4xl font-black text-white">0{i + 1}</div>
                  <div className="text-[10px] font-black text-[#ff9800] uppercase tracking-widest bg-[#ff9800]/10 px-3 py-1 rounded-full">
                    STEP {i + 1}
                  </div>
                </div>

                {/* آئیکون */}
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-[#1a237e] border border-white/10">
                    <Icon className="h-7 w-7 text-[#ff9800]" />
                  </div>
                  {/* سٹیپ 4 کے لیے گرین ٹک */}
                  {isLast && <CheckCircle2 className="h-8 w-8 text-[#25d366]" />}
                </div>
                
                <h3 className="text-lg font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-xs font-medium text-gray-300 leading-relaxed">
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

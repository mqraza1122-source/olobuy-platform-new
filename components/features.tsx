'use client'
import { MessageCircle, Banknote, Package, CheckCircle2 } from 'lucide-react'

const STEPS = [
  { step: 'STEP 1', icon: MessageCircle, title: 'Agree on the Deal', desc: 'Buyer and provider agree on the details, price, and terms.' },
  { step: 'STEP 2', icon: Banknote, title: 'Secure Payment', desc: 'Funds are held securely by OloBuy until the deal is completed.' },
  { step: 'STEP 3', icon: Package, title: 'Delivery & Inspection', desc: 'Goods are delivered and inspected by the buyer to ensure quality.' },
  { step: 'STEP 4', icon: CheckCircle2, title: 'Deal Finalized', desc: 'Payment is released to the seller, and the deal is successfully closed.' },
]

export function HowItWorks() {
  return (
    <section id="how" className="bg-[#1a237e] py-20 px-4">
      <div className="mx-auto max-w-lg">
        
        {/* ہیڈنگ */}
        <div className="flex justify-center mb-16">
          <div className="bg-[#ff9800] text-[#1a237e] font-black py-4 px-10 rounded-full text-xl shadow-[0_0_30px_rgba(255,152,0,0.3)] uppercase tracking-widest">
            How It Works
          </div>
        </div>

        {/* سٹیپس لسٹ */}
        <div className="space-y-6">
          {STEPS.map((s, index) => {
            const Icon = s.icon
            return (
              <div key={index} className="relative bg-[#283593] p-8 rounded-[2rem] border border-white/10 shadow-xl">
                <div className="flex items-start gap-6">
                  
                  {/* وائٹ کلر کے نمبرز اور سٹیپ کا نام */}
                  <div className="flex flex-col items-center">
                    <span className="text-white text-3xl font-black mb-1">{`0${index + 1}`}</span>
                    <span className="text-[#ff9800] text-[10px] font-bold uppercase tracking-widest">{s.step}</span>
                  </div>

                  {/* مین کنٹینٹ */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="text-xl font-bold text-white mb-2">{s.title}</h3>
                      {/* سٹیپ 4 کے لیے گرین ٹک */}
                      {index === 3 && <CheckCircle2 className="h-6 w-6 text-[#25d366]" />}
                    </div>
                    <p className="text-blue-100/80 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </div>

                {/* پریمیم آئیکون کارنر میں */}
                <div className="absolute top-4 right-4 bg-[#1a237e] p-2 rounded-2xl border border-white/5">
                  <Icon className={`h-6 w-6 ${index === 3 ? 'text-[#25d366]' : 'text-[#ff9800]'}`} />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
                      }

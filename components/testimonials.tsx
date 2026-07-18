'use client'
import { useState } from 'react'
import { Star, ChevronDown } from 'lucide-react'

const REVIEWS = [
  {
    name: 'Fashion Hub',
    role: 'Cloth Fashion Seller, Faisalabad',
    text: 'I was worried about non serious buyers, but OloBuy verified the buyer first. Smooth payment release after delivery.',
  },
  {
    name: 'Mega Traders',
    role: 'Bulk Buyer, Karachi',
    text: 'Procured 500+ units of branded apparel. The escrow system kept my funds safe until I inspected the entire bulk shipment.',
  },
  {
    name: 'Glow Beauty',
    role: 'Cosmetic Seller, Lahore',
    text: 'Selling premium cosmetic sets is risky, but with OloBuy, the buyer pays upfront to the platform, so I am 100% stress-free.',
  },
  {
    name: 'Tech Haven',
    role: 'Electronics Buyer, Islamabad',
    text: 'Bought a high-end graphic card. The inspection period provided by OloBuy helped me test the hardware before the money was released.',
  }
]

export function Testimonials() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="reviews" className="bg-[#1a237e] py-20 px-4">
      <div className="mx-auto max-w-2xl">
        
        {/* اورینج بٹن ہیڈنگ: اب یہ بالکل باقی سیکشنز کے جیسی ہے */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex rounded-full bg-[#ff9800] px-10 py-4 text-center shadow-[0_0_30px_rgba(255,152,0,0.4)]">
            <h2 className="text-xl md:text-2xl font-black text-[#1a237e] uppercase tracking-widest">
              What Our Users Say
            </h2>
          </div>
        </div>
        
        <div className="space-y-6">
          {REVIEWS.map((review, index) => (
            <div 
              key={index} 
              className="bg-[#283593] p-6 rounded-[2rem] border border-white/10 shadow-xl transition-all duration-300 hover:border-[#ff9800]/50"
            >
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-center text-left"
              >
                <div>
                  <h4 className="font-bold text-white text-lg">{review.name}</h4>
                  <p className="text-[#ff9800] font-semibold text-sm">{review.role}</p>
                </div>
                <ChevronDown className={`text-[#ff9800] transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} />
              </button>

              {/* ریویو والا حصہ - اب کلرز کو بہتر کیا ہے */}
              {openIndex === index && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <div className="flex text-[#ff9800] mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-blue-100 italic font-medium leading-relaxed">
                    "{review.text}"
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
          }

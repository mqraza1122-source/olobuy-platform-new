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
    <section id="reviews" className="bg-[#1a237e] py-16 px-4">
      <div className="mx-auto max-w-lg">
        <h2 className="text-center text-4xl font-extrabold text-white mb-12">What Our Users Say</h2>
        
        <div className="space-y-6">
          {REVIEWS.map((review, index) => (
            <div key={index} className="bg-white p-6 rounded-[2rem] shadow-xl transition-all">
              {/* ہیڈر: نام اور کلک ایبل ایریا */}
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-center text-left"
              >
                <div>
                  <h4 className="font-extrabold text-[#1a237e] text-lg">{review.name}</h4>
                  <p className="text-[#ff9800] font-bold text-sm">{review.role}</p>
                </div>
                <ChevronDown className={`text-[#1a237e] transition-transform ${openIndex === index ? 'rotate-180' : ''}`} />
              </button>

              {/* ریویو والا حصہ */}
              {openIndex === index && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="text-[#ff9800] text-3xl font-serif mb-2">““</div>
                  <div className="flex text-[#ff9800] mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-[#1a237e] text-md font-medium">
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

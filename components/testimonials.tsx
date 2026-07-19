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
    name: 'اتفاق ٹریڈرز',
    role: 'الیکٹرانکس ڈیلر، لاہور',
    text: 'استعمال کرنے کے بعد مجھے فراڈ کا کوئی ڈر نہیں رہا۔ سیلر اور کسٹمر دونوں کے لیے یہ سسٹم 100٪ محفوظ اور بہترین Olobuy',
  },
  {
    name: 'Tech Haven',
    role: 'Electronics Buyer, Islamabad',
    text: 'Bought a high-end graphic card. The inspection period provided by OloBuy helped me test the hardware before the money was released.',
  }
]

export function Testimonials() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="reviews" className="bg-[#1a237e] py-12 px-4">
      <div className="mx-auto max-w-5xl">
        
        {/* بٹن کا رنگ اورینج برقرار ہے */}
        <div className="mb-12 w-full bg-[#ff9800] text-[#1a237e] font-black py-4 px-2 rounded-[2rem] text-[15px] uppercase text-center shadow-lg whitespace-nowrap">
          What Our Users Say
        </div>
        
        <div className="space-y-6">
          {REVIEWS.map((review, index) => (
            <div 
              key={index} 
              // کارڈ اب سفید اور بارڈر گرے
              className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-lg transition-all duration-300"
            >
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-center text-left"
              >
                <div>
                  <h4 className="font-bold text-[#1a237e] text-lg">{review.name}</h4>
                  <p className="text-[#ff9800] font-semibold text-sm">{review.role}</p>
                </div>
                <ChevronDown className={`text-[#1a237e] transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} />
              </button>

              {openIndex === index && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex text-[#ff9800] mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="text-[#1a237e] italic font-medium leading-relaxed">
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

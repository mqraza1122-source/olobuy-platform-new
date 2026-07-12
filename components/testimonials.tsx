'use client';
import { useState } from 'react';
import { Star, Quote, ChevronDown } from 'lucide-react';

const REVIEWS = [
  {
    name: 'Luxe Branded fashion',
    role: 'Buyer, Hyderabad',
    text: 'Bought branded clothes in bulk from Faislabad through OloBuy. My money was safe until the parcel reached me.',
  },
  {
    name: 'Sana Jewelry',
    role: 'Seller, Karachi',
    text: 'As a seller I was always scared of fake buyers. OloBuy held the payment before I shipped, so I finally felt secure.',
  },
  {
    name: 'Bilal Cosmetics',
    role: 'Buyer, Islamabad',
    text: 'Super simple over WhatsApp. Inspected the item first, approved it, and only then the seller got paid.',
  },
];

const STATS = [
  { value: '1000+', label: 'Deals' },
  { value: '9.5M+', label: 'PKR' },
  { value: '4.9/5', label: 'Rating' },
];

export function Testimonials() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-[#1a237e] py-12 sm:py-20">
      <div className="mx-auto max-w-4xl px-4">
        
        {/* اسٹیٹسٹکس: اب یہ 3 چھوٹے بٹن نما باکسز ہیں */}
        <div className="grid grid-cols-3 gap-2 mb-12">
          {STATS.map((stat) => (
            <div key={stat.label} className="bg-white/10 border border-white/20 rounded-xl py-3 px-1 text-center">
              <div className="text-lg sm:text-xl font-black text-[#ff9800]">{stat.value}</div>
              <div className="text-[10px] sm:text-xs font-bold text-white uppercase">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-white leading-tight">
            Real Stories, Real Trust
          </h2>
        </div>

        <div className="space-y-4">
          {REVIEWS.map((review, i) => (
            <div 
              key={i} 
              className={`rounded-2xl border transition-all duration-300 ${
                openIndex === i ? 'border-[#ff9800] bg-white' : 'border-white/10 bg-[#283593]'
              } p-5`}
            >
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between text-left"
              >
                <div>
                  <span className={`text-lg font-bold ${openIndex === i ? 'text-[#1a237e]' : 'text-white'}`}>
                    {review.name}
                  </span>
                  <span className="block text-xs font-bold text-[#ff9800]">{review.role}</span>
                </div>
                <ChevronDown 
                  className={`h-5 w-5 transition-transform duration-300 ${
                    openIndex === i ? 'rotate-180 text-[#ff9800]' : 'text-white'
                  }`} 
                />
              </button>
              
              {openIndex === i && (
                <div className="mt-4 pt-4 border-t border-[#ff9800]/20">
                  <p className="text-sm font-medium text-[#1a237e]/80 italic">
                    "{review.text}"
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
          }

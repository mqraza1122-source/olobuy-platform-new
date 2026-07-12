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
  { value: '1000+', label: 'Safe Deals' },
  { value: 'PKR 9.5M+', label: 'Protected' },
  { value: '4.9/5', label: 'User Rating' },
];

export function Testimonials() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-[#1a237e] py-20 sm:py-32">
      <div className="mx-auto max-w-4xl px-6">
        <div className="flex justify-center mb-16">
          <div className="inline-flex rounded-full bg-[#ff9800] px-8 py-3 text-center shadow-lg">
            <h2 className="text-xl font-black text-[#1a237e] uppercase tracking-widest">
              Reviews
            </h2>
          </div>
        </div>

        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl leading-tight">
            Real Stories, <br /> Real Trust
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {STATS.map((stat) => (
            <div key={stat.label} className="rounded-[2rem] bg-[#283593] p-8 text-center border border-white/10">
              <div className={`font-black text-[#ff9800] mb-2 ${stat.value === '1000+' ? 'text-6xl' : 'text-5xl'}`}>
                {stat.value}
              </div>
              <div className="text-lg font-bold text-gray-300 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          {REVIEWS.map((review, i) => (
            <div 
              key={i} 
              className={`rounded-[2rem] border-2 transition-all duration-300 ${
                openIndex === i ? 'border-[#ff9800] bg-white' : 'border-white/10 bg-[#283593]'
              } p-8`}
            >
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between text-left"
              >
                <div>
                  <span className={`text-xl font-bold ${openIndex === i ? 'text-[#1a237e]' : 'text-white'}`}>
                    {review.name}
                  </span>
                  <span className="block text-sm font-bold text-[#ff9800]">{review.role}</span>
                </div>
                <ChevronDown 
                  className={`h-7 w-7 transition-transform duration-300 ${
                    openIndex === i ? 'rotate-180 text-[#ff9800]' : 'text-white'
                  }`} 
                />
              </button>
              
              {openIndex === i && (
                <div className="mt-6 pt-6 border-t border-[#ff9800]/20">
                  <Quote className="h-8 w-8 text-[#ff9800] mb-4" />
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-[#ff9800] text-[#ff9800]" />
                    ))}
                  </div>
                  <p className="text-base font-medium text-[#1a237e]/80 leading-relaxed italic">
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

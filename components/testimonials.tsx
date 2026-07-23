'use client';
import { useState } from 'react';
import { Star, ChevronDown } from 'lucide-react';

const REVIEWS = [
  {
    name: 'Fashion Hub',
    role: 'Cloth Fashion Seller, Faisalabad',
    text: 'I was worried about non-serious buyers, but OloBuy verified the buyer first. Payment released smoothly after delivery. Highly recommended!',
    rating: 5,
  },
  {
    name: 'اتفاق ٹریڈرز',
    role: 'الیکٹرانکس ڈیلر، لاہور',
    text: '   استعمال کرنے کے بعد اب کوئی ڈر نہیں۔ دونوں پارٹیوں کے لیے بہترین سسٹم ہے۔ Olobuy',
    rating: 5,
  },
  {
    name: 'Tech Haven',
    role: 'Electronics Buyer, Islamabad',
    text: 'Bought a highend graphics card. The inspection period helped me test it properly. Money released only after I was fully satisfied.',
    rating: 5,
  },
  {
    name: 'Farhan Raja',
    role: 'Freelancer Graphic Designer, Karachi',
    text: 'As a freelancer, I was always scared of clients not paying after delivery. OloBuy made it safe and stress-free. Best platform for service providers!',
    rating: 5,
  }
];

export function Testimonials() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="reviews" className="bg-[#0f172a] py-16 px-4">
      <div className="mx-auto max-w-5xl">
        
        <div className="text-center mb-12">
          <div className="inline-block bg-[#ff9800] text-[#1a237e] font-black px-10 py-4 rounded-[2rem] text-2xl shadow-lg mb-4">
            WHAT OUR USERS SAY
          </div>
          <p className="text-white/80">Real stories from real people across Pakistan</p>
        </div>

        <div className="space-y-6">
          {REVIEWS.map((review, index) => (
            <div 
              key={index} 
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 transition-all hover:bg-white/10"
            >
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-start text-left group"
              >
                <div className="flex-1">
                  <h4 className="font-bold text-white text-xl">{review.name}</h4>
                  <p className="text-[#ff9800] text-sm mt-1">{review.role}</p>
                </div>
                <ChevronDown className={`text-white mt-1 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} />
              </button>

              {openIndex === index && (
                <div className="mt-6 pt-6 border-t border-white/10">
                  <div className="flex text-[#ff9800] mb-4">
                    {Array.from({ length: review.rating }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-white/90 italic leading-relaxed text-[17px]">
                    “{review.text}”
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

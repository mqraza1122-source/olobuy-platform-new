'use client';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    q: 'What is OloBuy exactly?',
    a: 'OloBuy is a manual escrow service. We act as a trusted middleman that holds the buyer\'s payment securely until the item is received and approved by both parties, protecting everyone from fraud.',
  },
  {
    q: 'How much does it cost?',
    a: 'Our service fee is very minimal and transparent. You can check our latest rates by messaging us directly on our WhatsApp channel.',
  },
  {
    q: 'Which platforms does it work with?',
    a: 'We work with all major marketplaces in Pakistan, including OLX, Facebook Marketplace, and Instagram sellers. As long as it is a legal transaction, we can secure it.',
  },
];

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-white py-20 sm:py-32">
      <div className="mx-auto max-w-4xl px-6">
        {/* ہیڈنگ کو آپ کی خواہش کے مطابق اورنج پٹی اور نیلے فونٹ میں کر دیا ہے */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex rounded-full bg-[#ff9800] px-8 py-3 text-center shadow-lg">
            <h2 className="text-xl font-black text-[#1a237e] uppercase tracking-widest">
              Frequently Asked Questions
            </h2>
          </div>
        </div>

        <div className="space-y-6">
          {FAQS.map((faq, i) => (
            <div 
              key={i} 
              className={`rounded-[2rem] border-2 transition-all duration-300 ${
                openIndex === i ? 'border-[#ff9800] bg-[#fffaf5]' : 'border-gray-200 bg-gray-50'
              } p-8`}
            >
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between text-left"
              >
                <span className="text-xl font-bold text-[#1a237e]">{faq.q}</span>
                <ChevronDown 
                  className={`h-7 w-7 text-[#ff9800] transition-transform duration-300 ${
                    openIndex === i ? 'rotate-180' : ''
                  }`} 
                />
              </button>
              
              {openIndex === i && (
                <div className="mt-4 pt-4 border-t border-[#ff9800]/20">
                  <p className="text-base font-medium text-[#1a237e]/80 leading-relaxed">
                    {faq.a}
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

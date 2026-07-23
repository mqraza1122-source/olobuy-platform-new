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
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-[#0f172a] py-16 px-4">
      <div className="mx-auto max-w-5xl">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-[#ff9800] text-[#1a237e] font-black px-10 py-4 rounded-[2rem] text-2xl shadow-lg">
            FREQUENTLY ASKED QUESTIONS
          </div>
        </div>

        <div className="space-y-6">
          {FAQS.map((faq, i) => (
            <div 
              key={i} 
              className="bg-white p-6 sm:p-8 rounded-[2rem] shadow-2xl transition-all duration-300"
            >
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between text-left"
              >
                <span className="text-lg md:text-xl font-bold text-[#1a237e]">{faq.q}</span>
                <ChevronDown 
                  className={`h-7 w-7 text-[#ff9800] transition-transform duration-300 ${
                    openIndex === i ? 'rotate-180' : ''
                  }`} 
                />
              </button>
              
              {openIndex === i && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-base font-medium text-gray-600 leading-relaxed">
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

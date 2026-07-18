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
  // پہلا سوال خود بخود اوپن نہ ہو، اس لیے null رکھا ہے
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-[#1a237e] py-20 px-4">
      <div className="mx-auto max-w-4xl">
        
        {/* ہیڈنگ: اورینج بٹن اسٹائل */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex rounded-full bg-[#ff9800] px-10 py-4 text-center shadow-[0_0_30px_rgba(255,152,0,0.4)]">
            <h2 className="text-xl md:text-2xl font-black text-[#1a237e] uppercase tracking-widest">
              Frequently Asked Questions
            </h2>
          </div>
        </div>

        <div className="space-y-6">
          {FAQS.map((faq, i) => (
            <div 
              key={i} 
              className={`rounded-[2rem] border border-white/10 transition-all duration-300 ${
                openIndex === i ? 'bg-[#303f9f]' : 'bg-[#283593]'
              } p-8`}
            >
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between text-left"
              >
                <span className="text-lg md:text-xl font-bold text-white">{faq.q}</span>
                <ChevronDown 
                  className={`h-7 w-7 text-[#ff9800] transition-transform duration-300 ${
                    openIndex === i ? 'rotate-180' : ''
                  }`} 
                />
              </button>
              
              {openIndex === i && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-base font-medium text-blue-100 leading-relaxed">
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

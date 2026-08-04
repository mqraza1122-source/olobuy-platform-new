'use client';
import { useState, useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    q: 'What is OloBuy and how does manual escrow work?',
    a: 'OloBuy is Pakistan’s trusted manual escrow platform. We act as a neutral third-party middleman. The buyer transfers payment to our official secure account, we lock and hold it safely while the seller delivers the item. Once the buyer inspects and approves, we instantly release funds to the seller, eliminating all risks of online fraud.',
  },
  {
    q: 'How do I start a secure deal using OloBuy?',
    a: 'It is simple! Select your role (Buyer or Seller) on our platform, enter the product or service details along with the agreed amount, and click "Start Secure Deal". This instantly generates a unique Deal Code that tracks your transaction transparently from start to finish.',
  },
  {
    q: 'What platforms and types of deals are supported?',
    a: 'We secure transactions across all major Pakistani marketplaces including OLX, Facebook Marketplace, Instagram social sellers, independent e-commerce stores, and freelance agreements for digital services, gaming accounts, and physical parcels.',
  },
  {
    q: 'What happens if a dispute or issue arises during delivery?',
    a: 'If the item does not match the description or the service is unfulfilled, the buyer can flag it on the deal page before approval. Our support team steps in to mediate fairly, and if the deal is cancelled mutually, funds are safely returned to the buyer.',
  },
  {
    q: 'How much does OloBuy charge for escrow protection?',
    a: 'The service fee is transparently structured based on the deal amount to ensure safe trade execution for both parties. You can check the complete fee schedule directly above in the pricing section or contact our support via WhatsApp.',
  },
  {
    q: 'Is my money and personal data safe with OloBuy?',
    a: '100% safe. All funds are held in secure, protected holding channels, and we maintain strict data privacy to ensure your transaction records and identity remain completely secure.',
  },
];

function useFadeUp(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const header = useFadeUp();
  const list = useFadeUp(0.08);

  return (
    <section id="faq" className="bg-[#0f172a] py-16 sm:py-20 px-4 relative overflow-hidden">
      {/* Background Glow Accents */}
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-[#ff9800]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 left-0 w-72 h-72 bg-[#1a237e]/25 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-5xl relative z-10">
        
        {/* Section Header */}
        <div
          ref={header.ref}
          className={`text-center mb-12 sm:mb-14 transition-all duration-700 ease-out ${
            header.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-block bg-gradient-to-r from-[#ff9800] to-[#f57c00] text-[#0f172a] font-black px-7 sm:px-10 py-3 sm:py-4 rounded-full text-lg sm:text-2xl shadow-[0_0_25px_rgba(255,152,0,0.3)] mb-4 tracking-wide">
            FREQUENTLY ASKED QUESTIONS
          </div>
          <p className="text-white/75 text-sm sm:text-base max-w-md mx-auto">
            Everything you need to know about OloBuy&apos;s secure escrow protection
          </p>
        </div>

        {/* FAQs List */}
        <div ref={list.ref} className="space-y-4 sm:space-y-5">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                style={{ transitionDelay: list.visible ? `${index * 80}ms` : '0ms' }}
                className={`bg-white/[0.04] hover:bg-white/[0.07] backdrop-blur-xl border border-white/10 hover:border-[#ff9800]/35 rounded-2xl sm:rounded-3xl transition-all duration-700 ease-out ${
                  list.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between gap-4 text-left p-5 sm:p-6 cursor-pointer"
                >
                  <span className="font-bold text-white text-base sm:text-lg leading-snug">
                    {faq.q}
                  </span>

                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:border-[#ff9800]/35 transition-colors">
                    <ChevronDown
                      className={`h-5 w-5 text-[#ff9800] transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-out ${
                    isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
                    <div className="border-t border-white/10 pt-4">
                      <p className="text-white/80 text-sm sm:text-[15px] leading-relaxed">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
      }

'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Building2 } from 'lucide-react';

const COMPLIANCE = [
  { src: '/logos/sbp.png', name: 'State Bank of Pakistan', note: 'Complaint' },
  { src: '/logos/fbr.jpeg', name: 'Federal Board of Revenue', note: 'Registered' },
  { src: '/logos/secp.jpeg', name: 'Securities & Exchange Commission', note: 'Verified' },
];

const PAYMENTS = [
  { src: '/logos/jazzcash.jpeg', name: 'JazzCash', note: 'Mobile Wallet' },
  { src: '/logos/easypaisa.jpeg', name: 'Easypaisa', note: 'Mobile Wallet' },
  { name: 'Bank Transfer', note: 'All Banks', icon: Building2 },
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

export function TrustPartners() {
  const header = useFadeUp();
  const compliance = useFadeUp(0.1);
  const payHeader = useFadeUp(0.1);
  const payments = useFadeUp(0.1);

  return (
    <section className="bg-[#0f172a] py-16 sm:py-20 px-4 relative overflow-hidden">
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-[#ff9800]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-[#1a237e]/25 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-5xl relative z-10">
        {/* Header */}
        <div
          ref={header.ref}
          className={`text-center mb-12 sm:mb-14 transition-all duration-700 ease-out ${
            header.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-block bg-gradient-to-r from-[#ff9800] to-[#f57c00] text-[#0f172a] font-black px-7 sm:px-10 py-3 sm:py-4 rounded-full text-lg sm:text-2xl shadow-[0_0_25px_rgba(255,152,0,0.3)] mb-4 tracking-wide">
            TRUSTED & COMPLAINT 
          </div>
          <p className="text-white/75 max-w-md mx-auto text-sm sm:text-base leading-relaxed">
            OloBuy follows Pakistan&apos;s financial safety standards for secure online deals.
          </p>
        </div>

        {/* Compliance */}
        <div
          ref={compliance.ref}
          className="grid grid-cols-3 gap-3 sm:gap-5 mb-14 sm:mb-16"
        >
          {COMPLIANCE.map((item, i) => (
            <div
              key={item.name}
              style={{ transitionDelay: compliance.visible ? `${i * 100}ms` : '0ms' }}
              className={`flex flex-col items-center justify-center bg-white rounded-2xl sm:rounded-[2rem] p-4 sm:p-7 shadow-2xl transition-all duration-700 ease-out hover:scale-[1.03] ${
                compliance.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="relative h-12 w-12 sm:h-16 sm:w-16 mb-2 sm:mb-3">
                <Image
                  src={item.src}
                  alt={item.name}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-[#ff9800] font-black text-[10px] sm:text-sm tracking-wider uppercase text-center">
                {item.note}
              </span>
              <span className="text-[#1a237e]/50 text-[9px] sm:text-[11px] font-medium text-center mt-1 leading-tight hidden sm:block">
                {item.name}
              </span>
            </div>
          ))}
        </div>

        {/* Payment header */}
        <div
          ref={payHeader.ref}
          className={`text-center mb-8 sm:mb-10 transition-all duration-700 ease-out ${
            payHeader.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-block bg-gradient-to-r from-[#ff9800] to-[#f57c00] text-[#0f172a] font-black px-7 sm:px-10 py-3 sm:py-4 rounded-full text-lg sm:text-2xl shadow-[0_0_25px_rgba(255,152,0,0.3)] tracking-wide">
            PAYMENT PARTNERS
          </div>
        </div>

        {/* Payments */}
        <div
          ref={payments.ref}
          className="grid grid-cols-3 gap-3 sm:gap-5"
        >
          {PAYMENTS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                style={{ transitionDelay: payments.visible ? `${index * 100}ms` : '0ms' }}
                className={`flex flex-col items-center justify-center bg-white rounded-2xl sm:rounded-[2rem] p-4 sm:p-7 shadow-2xl transition-all duration-700 ease-out hover:scale-[1.03] ${
                  payments.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="h-12 w-12 sm:h-16 sm:w-16 flex items-center justify-center mb-2 sm:mb-3">
                  {Icon ? (
                    <Icon className="h-9 w-9 sm:h-12 sm:w-12 text-[#1a237e]" strokeWidth={1.5} />
                  ) : (
                    <div className="relative h-12 w-12 sm:h-16 sm:w-16">
                      <Image
                        src={item.src || '/placeholder.svg'}
                        alt={item.name || 'Payment partner'}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                </div>
                <span className="text-[#1a237e]/80 font-bold text-[10px] sm:text-xs tracking-wider uppercase text-center">
                  {item.note}
                </span>
                {item.name && (
                  <span className="text-[#1a237e]/45 text-[9px] sm:text-[11px] font-medium text-center mt-1 hidden sm:block">
                    {item.name}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
    }

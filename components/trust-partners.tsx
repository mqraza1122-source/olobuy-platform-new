'use client';
import Image from 'next/image';
import { Building2 } from 'lucide-react';

const COMPLIANCE = [
  { src: '/logos/sbp.png', name: 'State Bank of Pakistan', note: 'Compliant' },
  { src: '/logos/fbr.jpeg', name: 'Federal Board of Revenue', note: 'Registered' },
  { src: '/logos/secp.jpeg', name: 'Securities & Exchange Commission', note: 'Verified' },
];

const PAYMENTS = [
  { src: '/logos/jazzcash.jpeg', name: 'JazzCash', note: 'Mobile Wallet' },
  { src: '/logos/easypaisa.jpeg', name: 'Easypaisa', note: 'Mobile Wallet' },
  { name: 'Bank Transfer', note: 'All Banks', icon: Building2 },
];

export function TrustPartners() {
  return (
    <section className="bg-[#0f172a] py-16 px-4">
      <div className="mx-auto max-w-5xl">
        
        {/* Trusted & Compliant Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-[#ff9800] text-[#1a237e] font-black px-10 py-4 rounded-[2rem] text-2xl shadow-lg mb-4">
            TRUSTED & COMPLIANT
          </div>
          <p className="text-white/80 max-w-md mx-auto">
            OloBuy is legally registered and strictly follows all financial safety regulations of Pakistan.
          </p>
        </div>

        {/* Compliance Cards - Restored to Original White Look & Size */}
        <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-16">
          {COMPLIANCE.map((item) => (
            <div
              key={item.name}
              className="flex flex-col items-center justify-center bg-white rounded-[2rem] p-5 sm:p-7 shadow-2xl transition-all transform hover:scale-105"
            >
              <div className="relative h-14 w-14 sm:h-16 sm:w-16 mb-3">
                <Image
                  src={item.src}
                  alt={item.name}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-[#ff9800] font-black text-xs sm:text-sm tracking-wider uppercase text-center">
                {item.note}
              </span>
            </div>
          ))}
        </div>

        {/* Payment Partners Header */}
        <div className="text-center mb-8">
          <div className="inline-block bg-[#ff9800] text-[#1a237e] font-black px-10 py-4 rounded-[2rem] text-2xl shadow-lg">
            PAYMENT PARTNERS
          </div>
        </div>

        {/* Payment Cards - Restored to Original White Look & Size */}
        <div className="grid grid-cols-3 gap-4 sm:gap-6">
          {PAYMENTS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center justify-center bg-white rounded-[2rem] p-5 sm:p-7 shadow-2xl transition-all transform hover:scale-105"
              >
                <div className="h-14 w-14 sm:h-16 sm:w-16 flex items-center justify-center mb-3">
                  {Icon ? (
                    <Icon className="h-10 w-10 sm:h-12 sm:w-12 text-[#1a237e]" strokeWidth={1.5} />
                  ) : (
                    <div className="relative h-14 w-14 sm:h-16 sm:w-16">
                      <Image
                        src={item.src || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                </div>
                <span className="text-[#1a237e]/80 font-bold text-[11px] sm:text-xs tracking-wider uppercase text-center">
                  {item.note}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

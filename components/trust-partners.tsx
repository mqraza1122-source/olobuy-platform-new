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
        
        {/* Trusted & Compliant */}
        <div className="text-center mb-12">
          <div className="inline-block bg-[#ff9800] text-[#1a237e] font-black px-10 py-4 rounded-[2rem] text-2xl shadow-lg mb-4">
            TRUSTED & COMPLIANT
          </div>
          <p className="text-white/80 max-w-md mx-auto">
            OloBuy is legally registered and strictly follows all financial safety regulations of Pakistan.
          </p>
        </div>

        {/* Compliance Logos */}
        <div className="grid grid-cols-3 gap-6 mb-16">
          {COMPLIANCE.map((item) => (
            <div
              key={item.name}
              className="flex flex-col items-center justify-center bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all"
            >
              <div className="relative h-16 w-16 mb-4">
                <Image
                  src={item.src}
                  alt={item.name}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-[#ff9800] font-bold text-sm tracking-widest uppercase text-center">
                {item.note}
              </span>
            </div>
          ))}
        </div>

        {/* Payment Partners */}
        <div className="text-center mb-8">
          <div className="inline-block bg-[#ff9800] text-[#1a237e] font-black px-10 py-4 rounded-[2rem] text-2xl shadow-lg">
            PAYMENT PARTNERS
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {PAYMENTS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="flex flex-col items-center justify-center bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all"
              >
                <div className="h-16 w-16 flex items-center justify-center mb-4">
                  {Icon ? (
                    <Icon className="h-12 w-12 text-white" strokeWidth={1.5} />
                  ) : (
                    <div className="relative h-16 w-16">
                      <Image
                        src={item.src || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                </div>
                <span className="text-white/80 font-medium text-sm tracking-wider text-center">
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

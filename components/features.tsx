'use client';
import { useState, useEffect, useRef } from 'react';
import {
  ShieldCheck,
  Eye,
  Sparkles,
  Banknote,
  Package,
  Users,
  ChevronDown,
} from 'lucide-react';

const FEATURES = [
  {
    icon: ShieldCheck,
    title: 'No Advance Fraud',
    desc: 'Providers never receive money upfront. We hold it securely in escrow.',
    details:
      'OloBuy keeps the full amount locked until the buyer confirms. Sellers cannot take advance, and buyers stay protected from parcel fraud.',
  },
  {
    icon: Eye,
    title: 'Inspect Before Release',
    desc: 'Buyer inspects the goods or service before payment is released.',
    details:
      'You get time to check quality, test digital accounts, or verify service work. Only after your approval is payment released to the seller.',
  },
  {
    icon: Sparkles,
    title: 'Instant Deal Code',
    desc: 'Generate a unique, secure Deal Code via our platform instantly.',
    details:
      'Every transaction gets its own tracked deal page with status, chat, and timeline — so both sides stay clear and accountable.',
  },
  {
    icon: Banknote,
    title: 'Secure Escrow Holding',
    desc: 'Funds are held in a neutral, secure account until deal completion.',
    details:
      'Money stays with OloBuy as a neutral third party. No one side controls the funds mid-deal — equal safety for buyer and seller.',
  },
  {
    icon: Package,
    title: 'Versatile Usage',
    desc: 'Perfect for physical goods, digital accounts, and services alike.',
    details:
      'From OLX parcels and gaming accounts to freelance work and e-commerce orders — one secure flow for almost any online deal in Pakistan.',
  },
  {
    icon: Users,
    title: 'Fair for Both Parties',
    desc: 'Equal protection and peace of mind for both buyers and sellers.',
    details:
      'Buyers avoid fraud. Sellers avoid fake buyers and payment excuses. Clear steps, transparent status, and human support when needed.',
  },
];

const STATS = [
  { number: '1000+', label: 'SAFE DEALS' },
  { number: '9.5M+', label: 'PKR PROTECTED' },
  { number: '4.9/5', label: 'RATING' },
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

export function Features() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const header = useFadeUp();
  const grid = useFadeUp(0.08);
  const trust = useFadeUp(0.1);
  const stats = useFadeUp(0.1);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section id="why" className="bg-[#0f172a] py-16 sm:py-20 px-4 relative overflow-hidden">
      <div className="absolute top-1/3 right-0 w-64 h-64 bg-[#ff9800]/5 rounded-full blur-3xl pointer-events-none" />
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
            WHY CHOOSE OLOBUY?
          </div>
          <p className="text-white/75 max-w-md mx-auto text-sm sm:text-base">
            Trusted for safe online transactions across Pakistan
          </p>
        </div>

        {/* Features grid */}
        <div ref={grid.ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 mb-14 sm:mb-16">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            const isOpen = openIndex === i;

            return (
              <div
                key={f.title}
                style={{ transitionDelay: grid.visible ? `${i * 90}ms` : '0ms' }}
                className={`bg-white/[0.04] hover:bg-white/[0.07] backdrop-blur-xl border border-white/10 hover:border-[#ff9800]/40 rounded-2xl sm:rounded-3xl p-5 sm:p-6 transition-all duration-700 ease-out hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.4)] ${
                  grid.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  className="w-full text-left"
                >
                  <div className="flex items-start gap-4">
                    <div className="mt-0.5 w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-[#ff9800]/10 border border-[#ff9800]/20 flex items-center justify-center shrink-0">
                      <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-[#ff9800]" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className="text-base sm:text-lg font-bold text-white leading-snug">
                          {f.title}
                        </h3>
                        <ChevronDown
                          className={`h-4 w-4 text-[#ff9800] shrink-0 mt-1 transition-transform duration-300 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                      <p className="text-white/60 text-sm leading-relaxed mt-2">
                        {f.desc}
                      </p>
                    </div>
                  </div>
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-out ${
                    isOpen ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="pl-15 sm:pl-[3.75rem] border-t border-white/10 pt-3">
                    <p className="text-white/50 text-xs sm:text-sm leading-relaxed">
                      {f.details}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust header */}
        <div
          ref={trust.ref}
          className={`text-center mb-8 sm:mb-10 pt-2 transition-all duration-700 ease-out ${
            trust.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="text-2xl sm:text-4xl font-black text-[#ff9800] uppercase tracking-tight mb-2">
            Users Trust Us
          </h2>
          <p className="text-sm sm:text-lg font-bold text-white/90 tracking-wide uppercase">
            Pakistan&apos;s Leading Escrow Trade
          </p>
        </div>

        {/* Stats */}
        <div
          ref={stats.ref}
          className={`grid grid-cols-3 gap-3 sm:gap-4 text-center transition-all duration-700 ease-out ${
            stats.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl sm:rounded-[2rem] py-6 sm:py-8 px-2 shadow-2xl flex flex-col items-center justify-center transition-transform hover:scale-[1.03]"
            >
              <div className="text-xl sm:text-3xl font-black text-[#ff9800] mb-1">
                {stat.number}
              </div>
              <div className="text-[#1a237e] text-[9px] sm:text-xs font-bold tracking-widest uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

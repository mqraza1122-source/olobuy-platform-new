'use client';
import { useState, useEffect, useRef } from 'react';
import {
  MessageSquareText,
  Landmark,
  Package,
  ShieldCheck,
  MessageCircle,
  X,
  ChevronDown,
  BadgePercent,
} from 'lucide-react';

const STEPS = [
  {
    icon: MessageSquareText,
    title: 'Start Deal',
    short: 'Get your unique Deal Code',
    desc: 'Select your role (Buyer/Seller), enter product details and amount, then click Start Secure Deal to generate a unique Deal Code.',
    details:
      'This is the first and most crucial step. Once you input your details, OloBuy generates a secure deal code that tracks your transaction from start to finish with full transparency.',
  },
  {
    icon: Landmark,
    title: 'Secure Payment',
    short: 'Funds held in escrow',
    desc: 'The buyer transfers payment to the OloBuy official account. We lock and hold the money safely in escrow.',
    details:
      'Funds stay in our protected channel. Neither party can access the money early — eliminating advance fraud and protecting both buyers and sellers.',
  },
  {
    icon: Package,
    title: 'Delivery & Check',
    short: 'Inspect before release',
    desc: 'The seller delivers the product or service. The buyer inspects everything and confirms satisfaction on the deal page.',
    details:
      'Buyer gets time to inspect quality, verify the item or service, and only then approve. No pressure, no rush — full control stays with the buyer.',
  },
  {
    icon: ShieldCheck,
    title: 'Funds Released',
    short: 'Deal completed safely',
    desc: 'Once approved, we release the funds to the seller. The deal is completed safely and transparently.',
    details:
      'After buyer approval, OloBuy releases payment to the seller instantly. Clean, fast, and fully protected for both sides.',
  },
];

const FEE_ROWS = [
  { range: 'Up to Rs 2,000', fee: 'Rs 50' },
  { range: 'Rs 2,001 – 5,000', fee: 'Rs 100' },
  { range: 'Rs 5,001 – 15,000', fee: 'Rs 200' },
  { range: 'Rs 15,001 – 50,000', fee: '3%' },
  { range: 'Rs 50,001 – 3,00,000', fee: '2.5%' },
  { range: 'Above Rs 3,00,000', fee: '2%' },
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

export function HowItWorks() {
  const [selectedStep, setSelectedStep] = useState<(typeof STEPS)[0] | null>(null);
  const [showFees, setShowFees] = useState(false);
  const grid = useFadeUp(0.08);
  const fees = useFadeUp(0.1);
  const support = useFadeUp(0.1);

  return (
    <section
      id="how-it-works"
      className="bg-[#0f172a] pt-4 pb-16 sm:pt-6 sm:pb-20 px-4 relative overflow-hidden"
    >
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-[#ff9800]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-[#1a237e]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-5xl relative z-10">
        
        {/* Heading Section Matching "Why Choose OloBuy?" Styling */}
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-r from-[#ff9800] to-[#f57c00] text-[#0f172a] font-black text-lg sm:text-2xl px-8 py-3.5 rounded-full shadow-[0_0_25px_rgba(255,152,0,0.4)] uppercase tracking-wider mb-3">
            HOW IT WORKS
          </div>
          <p className="text-white/60 text-xs sm:text-sm max-w-md mx-auto leading-relaxed">
            A neutral platform holding funds until both buyer and seller confirm satisfaction.
          </p>
        </div>

        {/* Main Card with Balanced Flow Layout */}
        <div className="bg-white/[0.04] backdrop-blur-xl border border-white/10 rounded-3xl p-5 sm:p-8 text-center relative overflow-hidden shadow-2xl mb-6 sm:mb-8">
          
          <div className="grid grid-cols-[1fr,auto,1.1fr,auto,1fr] items-center gap-1.5 sm:gap-4 max-w-xl mx-auto">
            {/* Buyer Node */}
            <div className="flex flex-col items-center bg-white/[0.03] border border-white/10 hover:border-[#25d366]/40 rounded-2xl p-2.5 sm:p-4 shadow-sm transition-all">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#25d366]/10 border border-[#25d366]/20 flex items-center justify-center text-[#25d366] mb-1.5 sm:mb-2">
                <MessageSquareText className="w-4 h-4 sm:w-6 sm:h-6" />
              </div>
              <span className="text-white font-bold text-[11px] sm:text-sm">Buyer</span>
            </div>

            <div className="text-[#ff9800] font-bold text-sm sm:text-xl animate-pulse px-0.5">→</div>

            {/* Central White Logo Node */}
            <div className="flex flex-col items-center bg-white border-2 border-[#ff9800]/60 rounded-2xl p-2.5 sm:p-4 shadow-[0_0_25px_rgba(255,152,0,0.25)]">
              <div className="w-12 h-8 sm:w-16 sm:h-10 flex items-center justify-center">
                <img
                  src="/logo.jpg"
                  alt="OloBuy"
                  className="w-full h-full object-contain filter drop-shadow-sm scale-110"
                />
              </div>
            </div>

            <div className="text-[#ff9800] font-bold text-sm sm:text-xl animate-pulse px-0.5">→</div>

            {/* Seller Node */}
            <div className="flex flex-col items-center bg-white/[0.03] border border-white/10 hover:border-[#ff9800]/40 rounded-2xl p-2.5 sm:p-4 shadow-sm transition-all">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#ff9800]/10 border border-[#ff9800]/20 flex items-center justify-center text-[#ff9800] mb-1.5 sm:mb-2">
                <Package className="w-4 h-4 sm:w-6 sm:h-6" />
              </div>
              <span className="text-white font-bold text-[11px] sm:text-sm text-center leading-tight">Seller / Delivery</span>
            </div>
          </div>

          <p className="text-white/45 text-xs mt-5 sm:mt-6">
            Funds held securely until item is received & inspected.
          </p>
        </div>

        {/* Steps Grid */}
        <div ref={grid.ref} className="grid sm:grid-cols-2 gap-4 sm:gap-5 mb-4 sm:mb-5">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <button
                key={i}
                type="button"
                onClick={() => setSelectedStep(step)}
                style={{ transitionDelay: grid.visible ? `${i * 100}ms` : '0ms' }}
                className={`group w-full text-left bg-white/[0.04] hover:bg-white/[0.07] backdrop-blur-xl border border-white/10 hover:border-[#ff9800]/45 rounded-2xl sm:rounded-3xl p-5 sm:p-6 transition-all duration-700 ease-out hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(0,0,0,0.45)] relative overflow-hidden ${
                  grid.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff9800] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#ff9800]/10 border border-[#ff9800]/20 flex items-center justify-center group-hover:bg-[#ff9800]/20 group-hover:scale-105 transition-all duration-300 shrink-0">
                    <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-[#ff9800]" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <span className="text-[#ff9800] font-black text-[11px] sm:text-xs tracking-[0.15em] block mb-1">
                      STEP 0{i + 1}
                    </span>
                    <h3 className="text-[17px] sm:text-xl font-bold text-white group-hover:text-[#ff9800] transition-colors leading-tight">
                      {step.title}
                    </h3>
                    <p className="text-white/50 text-xs sm:text-sm mt-0.5 leading-snug">
                      {step.short}
                    </p>
                  </div>

                  <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-white/5 group-hover:bg-[#ff9800]/15 border border-white/10 group-hover:border-[#ff9800]/30 transition-all">
                    <ChevronDown className="w-4 h-4 text-[#ff9800]" />
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Service Charges */}
        <div
          ref={fees.ref}
          className={`mb-10 sm:mb-12 transition-all duration-700 ease-out ${
            fees.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <button
            type="button"
            onClick={() => setShowFees(!showFees)}
            className="group w-full text-left bg-white/[0.04] hover:bg-white/[0.07] backdrop-blur-xl border border-white/10 hover:border-[#ff9800]/45 rounded-2xl sm:rounded-3xl p-5 sm:p-6 transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff9800] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#ff9800]/10 border border-[#ff9800]/20 flex items-center justify-center shrink-0">
                <BadgePercent className="h-6 w-6 sm:h-7 sm:w-7 text-[#ff9800]" />
              </div>

              <div className="min-w-0 flex-1">
                <span className="text-[#ff9800] font-black text-[11px] sm:text-xs tracking-[0.15em] block mb-1">
                  PRICING
                </span>
                <h3 className="text-[17px] sm:text-xl font-bold text-white leading-tight">
                  OloBuy Service Charges
                </h3>
                <p className="text-white/50 text-xs sm:text-sm mt-0.5 leading-snug">
                  Transparent fees · No hidden charges
                </p>
              </div>

              <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10">
                <ChevronDown
                  className={`w-4 h-4 text-[#ff9800] transition-transform duration-300 ${
                    showFees ? 'rotate-180' : ''
                  }`}
                />
              </div>
            </div>

            {showFees && (
              <div className="mt-4 pt-4 border-t border-white/10">
                <ul className="space-y-2.5">
                  {FEE_ROWS.map((row) => (
                    <li
                      key={row.range}
                      className="flex justify-between gap-3 text-sm text-white/75"
                    >
                      <span>{row.range}</span>
                      <span className="font-bold text-white shrink-0">{row.fee}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-3 pt-3 border-t border-white/10 text-[11px] sm:text-xs leading-relaxed text-white/45">
                  Pure service fees only. No extra or hidden charges — transparent work in favour of our customers.
                </p>
              </div>
            )}
          </button>
        </div>

        {/* WhatsApp support */}
        <div
          ref={support.ref}
          className={`bg-gradient-to-r from-[#1a237e]/90 via-[#0f172a] to-[#1a237e]/90 border border-[#ff9800]/25 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-2xl backdrop-blur-md transition-all duration-700 ease-out ${
            support.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-5">
            <div className="flex items-start sm:items-center gap-4 text-left w-full sm:w-auto">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#25d366]/15 border border-[#25d366]/30 flex items-center justify-center shrink-0">
                <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7 text-[#25d366]" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-bold text-white mb-1">
                  Complex deal or custom agreement?
                </h4>
                <p className="text-white/60 text-xs sm:text-sm max-w-md leading-relaxed">
                  Need manual help? Message the OloBuy team on WhatsApp for personal support.
                </p>
              </div>
            </div>
            <a
              href="https://wa.me/923043031572"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto shrink-0 bg-[#25d366] hover:bg-[#20ba5a] text-white font-bold px-6 py-3.5 rounded-xl sm:rounded-2xl transition-all duration-300 shadow-[0_4px_20px_rgba(37,211,102,0.35)] hover:scale-[1.02] text-sm flex items-center justify-center gap-2"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedStep && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#111827] border border-[#ff9800]/35 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-[0_20px_50px_rgba(0,0,0,0.75)]">
            <button
              type="button"
              onClick={() => setSelectedStyleNull()}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4 mb-6 pr-10">
              <div className="w-14 h-14 rounded-2xl bg-[#ff9800]/15 border border-[#ff9800]/30 flex items-center justify-center shrink-0">
                <selectedStep.icon className="h-7 w-7 text-[#ff9800]" />
              </div>
              <div>
                <span className="text-[#ff9800] text-[11px] font-bold tracking-[0.15em] uppercase">
                  OloBuy Protocol
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight">
                  {selectedStep.title}
                </h3>
              </div>
            </div>

            <div className="bg-white/5 rounded-2xl p-4 sm:p-5 border border-white/10 mb-6 space-y-3">
              <p className="text-white/90 text-sm sm:text-base leading-relaxed">
                {selectedStep.desc}
              </p>
              <p className="text-white/55 text-sm leading-relaxed border-t border-white/10 pt-3">
                {selectedStep.details}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setSelectedStep(null)}
              className="w-full bg-gradient-to-r from-[#ff9800] to-[#f57c00] text-[#0f172a] font-bold px-6 py-3.5 rounded-xl hover:opacity-95 transition-opacity shadow-lg cursor-pointer"
            >
              Got It, Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
            }

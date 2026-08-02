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
  const header = useFadeUp();
  const grid = useFadeUp(0.08);
  const support = useFadeUp(0.1);

  return (
    <section
      id="how-it-works"
      className="bg-[#0f172a] py-16 sm:py-20 px-4 relative overflow-hidden"
    >
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-[#ff9800]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-72 h-72 bg-[#1a237e]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-5xl relative z-10">
        {/* Header */}
        <div
          ref={header.ref}
          className={`text-center mb-12 sm:mb-16 transition-all duration-700 ease-out ${
            header.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-block bg-gradient-to-r from-[#ff9800] to-[#f57c00] text-[#0f172a] font-black px-7 sm:px-8 py-3 rounded-full text-lg sm:text-2xl mb-4 shadow-[0_0_25px_rgba(255,152,0,0.3)] tracking-wide">
            HOW IT WORKS
          </div>
          <p className="text-white/75 max-w-md mx-auto text-sm sm:text-lg leading-relaxed">
            4 simple steps to complete your safe deal with OloBuy
          </p>
        </div>

        {/* Steps */}
        <div ref={grid.ref} className="grid sm:grid-cols-2 gap-4 sm:gap-5 mb-10 sm:mb-12">
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

                  {/* Arrow Icon matching Why Choose OloBuy style */}
                  <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-white/5 group-hover:bg-[#ff9800]/15 border border-white/10 group-hover:border-[#ff9800]/30 transition-all">
                    <ChevronDown className="w-4 h-4 text-[#ff9800] transition-transform duration-300 group-hover:translate-y-0.5" />
                  </div>
                </div>
              </button>
            );
          })}
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
          <div className="bg-[#111827] border border-[#ff9800]/35 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-[0_20px_50px_rgba(0,0,0,0.75)] animate-in fade-in zoom-in duration-200">
            <button
              type="button"
              onClick={() => setSelectedStep(null)}
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

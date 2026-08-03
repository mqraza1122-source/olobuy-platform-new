'use client';
import { useEffect, useRef, useState } from 'react';
import { User, ShieldCheck, Package } from 'lucide-react';

function useFadeUp() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return { ref, visible };
}

export function EscrowFlow() {
  const { ref, visible } = useFadeUp();

  return (
    <section className="bg-[#0f172a] px-4 py-10 sm:py-14 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,152,0,0.06)_0%,transparent_70%)] pointer-events-none" />

      <div
        ref={ref}
        className={`relative z-10 mx-auto max-w-lg transition-all duration-700 ease-out ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        <div className="rounded-[1.75rem] border border-white/10 bg-[#121a2b]/90 backdrop-blur-xl px-5 py-8 sm:px-8 sm:py-10 shadow-2xl text-center">
          
          <div className="inline-block bg-gradient-to-r from-[#ff9800] to-[#f57c00] text-[#0f172a] font-black px-7 sm:px-8 py-3 rounded-full text-lg sm:text-xl mb-4 shadow-[0_0_25px_rgba(255,152,0,0.3)] tracking-wide">
          HOW IT WORKS
        </div>
          <p className="text-white/55 text-sm leading-relaxed max-w-sm mx-auto mb-8">
            A neutral platform holding funds until both buyer and seller confirm satisfaction.
          </p>

          {/* Flow */}
          <div className="flex items-center justify-between gap-2 sm:gap-4 mb-6">
            {/* Buyer */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/30 flex items-center justify-center">
                <User className="h-7 w-7 sm:h-8 sm:w-8 text-emerald-400" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-white/80">Buyer</span>
            </div>

            {/* Arrow */}
            <div className="text-[#ff9800] font-black text-lg sm:text-xl shrink-0 pb-5">→</div>

            {/* OloBuy Shield */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="w-16 h-16 sm:w-[4.5rem] sm:h-[4.5rem] rounded-2xl bg-gradient-to-br from-[#1a237e] to-[#0f172a] border-2 border-[#ff9800]/60 shadow-[0_0_24px_rgba(255,152,0,0.25)] flex items-center justify-center">
                <ShieldCheck className="h-8 w-8 sm:h-9 sm:w-9 text-[#ff9800]" />
              </div>
              <span className="text-sm sm:text-base font-black">
                <span className="text-[#ff9800]">Olo</span>
                <span className="text-[#3b82f6]">Buy</span>
              </span>
            </div>

            {/* Arrow */}
            <div className="text-[#ff9800] font-black text-lg sm:text-xl shrink-0 pb-5">→</div>

            {/* Seller */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-[#ff9800]/20 to-[#f57c00]/10 border border-[#ff9800]/30 flex items-center justify-center">
                <Package className="h-7 w-7 sm:h-8 sm:w-8 text-[#ff9800]" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-white/80 text-center leading-tight">
                Seller /
                <br className="sm:hidden" /> Delivery
              </span>
            </div>
          </div>

          <p className="text-white/45 text-xs sm:text-sm leading-relaxed">
            Funds held securely until item is received & inspected.
          </p>
        </div>
      </div>
    </section>
  );
              }

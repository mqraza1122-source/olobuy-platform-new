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
  ShoppingBag,
  User,
  HelpCircle,
  ArrowRight,
  ArrowUpRight,
  ArrowDownLeft,
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
  const [showEscrowModal, setShowEscrowModal] = useState(false);
  
  const grid = useFadeUp(0.08);
  const fees = useFadeUp(0.1);
  const support = useFadeUp(0.1);

  return (
    <section
      id="how-it-works"
      className="bg-[#0f172a] pt-6 pb-20 sm:pt-8 sm:pb-24 px-4 relative overflow-hidden"
    >
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-[#ff9800]/[0.07] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-[#1a237e]/25 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-5xl relative z-10">
        <div className="text-center mb-10">
          <div className="inline-block bg-gradient-to-r from-[#ff9800] to-[#f57c00] text-[#0f172a] font-extrabold text-sm sm:text-base tracking-[0.15em] px-8 py-3 rounded-full shadow-[0_0_30px_rgba(255,152,0,0.35)] mb-4 uppercase">
            HOW OLOBUY WORKS
          </div>

          <div className="mb-4">
            <button
              type="button"
              onClick={() => setShowEscrowModal(true)}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-white/[0.06] hover:bg-white/[0.12] border border-[#ff9800]/40 hover:border-[#ff9800] text-[#ff9800] text-xs sm:text-sm font-bold transition-all duration-300 shadow-[0_0_25px_rgba(255,152,0,0.2)] group cursor-pointer"
            >
              <HelpCircle className="w-4 h-4 transition-transform group-hover:scale-110" />
              <span>View Escrow Architecture & Flow Diagram</span>
            </button>
          </div>

          <p className="text-white/60 text-xs sm:text-sm tracking-wide">
            It works in 4 simple steps
          </p>
        </div>

        <div ref={grid.ref} className="grid sm:grid-cols-2 gap-4 sm:gap-5 mb-6">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <button
                key={step.title}
                type="button"
                onClick={() => setSelectedStep(step)}
                style={{ transitionDelay: grid.visible ? `${i * 90}ms` : '0ms' }}
                className={`group w-full text-left bg-white/[0.04] hover:bg-white/[0.07] backdrop-blur-xl border border-white/10 hover:border-[#ff9800]/50 rounded-2xl sm:rounded-3xl p-5 sm:p-6 transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(0,0,0,0.4)] relative overflow-hidden ${
                  grid.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff9800] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#ff9800]/10 border border-[#ff9800]/25 flex items-center justify-center group-hover:bg-[#ff9800]/20 group-hover:scale-105 transition-all duration-300 shrink-0">
                    <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-[#ff9800]" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <span className="text-[#ff9800] font-black text-[11px] sm:text-xs tracking-[0.18em] block mb-1">
                      STEP 0{i + 1}
                    </span>
                    <h3 className="text-[17px] sm:text-xl font-bold text-white group-hover:text-[#ff9800] transition-colors leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-white/55 text-xs sm:text-sm mt-1 leading-snug">
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

        <div
          ref={fees.ref}
          className={`mb-10 sm:mb-12 transition-all duration-700 ease-out ${
            fees.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <button
            type="button"
            onClick={() => setShowFees(!showFees)}
            className="group w-full text-left bg-white/[0.04] hover:bg-white/[0.07] backdrop-blur-xl border border-white/10 hover:border-[#ff9800]/50 rounded-2xl sm:rounded-3xl p-5 sm:p-6 transition-all duration-300 relative overflow-hidden"
          >
            <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ff9800] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#ff9800]/10 border border-[#ff9800]/25 flex items-center justify-center shrink-0">
                <BadgePercent className="h-6 w-6 sm:h-7 sm:w-7 text-[#ff9800]" />
              </div>

              <div className="min-w-0 flex-1">
                <span className="text-[#ff9800] font-black text-[11px] sm:text-xs tracking-[0.18em] block mb-1">
                  PRICING
                </span>
                <h3 className="text-[17px] sm:text-xl font-bold text-white leading-snug">
                  OloBuy Service Charges
                </h3>
                <p className="text-white/55 text-xs sm:text-sm mt-1 leading-snug">
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
              <div className="mt-5 pt-5 border-t border-white/10">
                <ul className="space-y-3">
                  {FEE_ROWS.map((row) => (
                    <li
                      key={row.range}
                      className="flex justify-between gap-4 text-sm text-white/80"
                    >
                      <span>{row.range}</span>
                      <span className="font-bold text-white shrink-0">{row.fee}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 pt-4 border-t border-white/10 text-xs leading-relaxed text-white/45">
                  Pure service fees only. No extra or hidden charges — transparent work in favour of our customers.
                </p>
              </div>
            )}
          </button>
        </div>

        <div
          ref={support.ref}
          className={`bg-gradient-to-r from-[#1a237e]/90 via-[#0f172a] to-[#1a237e]/90 border border-[#ff9800]/30 rounded-2xl sm:rounded-3xl p-5 sm:p-7 shadow-2xl backdrop-blur-md transition-all duration-700 ease-out ${
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

      {/* ===== ESCROW ARCHITECTURE MODAL - Exact Attached Design ===== */}
      {showEscrowModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="bg-[#111827] border border-[#ff9800]/40 rounded-3xl max-w-xl w-full p-6 sm:p-8 relative shadow-[0_25px_60px_rgba(0,0,0,0.8)] max-h-[90vh] overflow-y-auto">
            
            <button
              type="button"
              onClick={() => setShowEscrowModal(false)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-6 pr-6">
              <span className="text-[#ff9800] text-[11px] font-extrabold tracking-[0.2em] uppercase bg-[#ff9800]/10 px-3 py-1 rounded-full border border-[#ff9800]/30">
                VISUAL PROTOCOL FLOW
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-white mt-2">
                OloBuy Escrow Architecture
              </h3>
              <p className="text-white/60 text-xs sm:text-sm mt-1">
                A neutral platform holding funds securely until both buyer and seller confirm satisfaction.
              </p>
            </div>

            {/* Exact Card Layout */}
            <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-4 sm:p-6 backdrop-blur-md relative">
              
              {/* Goods Delivery Badge (Top) */}
              <div className="flex justify-center mb-8">
                <div className="inline-flex items-center gap-1.5 text-[#22c55e] bg-[#22c55e]/10 px-6 py-2.5 rounded-full border border-[#22c55e]/30 text-xs font-extrabold shadow-[0_0_20px_rgba(34,197,94,0.2)]">
                  <span className="text-2xl">📦</span>
                  <span>Goods / Service Delivery</span>
                </div>
              </div>

              {/* Buyer & Seller Nodes */}
              <div className="flex items-center justify-between relative px-6">
                
                {/* Buyer */}
                <div className="flex flex-col items-center z-10">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-b from-[#ff9800]/20 to-[#ff9800]/5 border-2 border-[#ff9800] flex items-center justify-center shadow-lg">
                    <User className="w-7 h-7 sm:w-8 sm:h-8 text-[#ff9800]" />
                  </div>
                  <span className="mt-3 text-white font-extrabold text-sm">Buyer</span>
                  <span className="text-[11px] text-[#ff9800] font-semibold">Sends Funds</span>
                </div>

                {/* Seller */}
                <div className="flex flex-col items-center z-10">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-b from-[#3b82f6]/20 to-[#3b82f6]/5 border-2 border-[#3b82f6] flex items-center justify-center shadow-lg">
                    <ShoppingBag className="w-7 h-7 sm:w-8 sm:h-8 text-[#3b82f6]" />
                  </div>
                  <span className="mt-3 text-white font-extrabold text-sm">Seller</span>
                  <span className="text-[11px] text-[#3b82f6] font-semibold">Fulfills Order</span>
                </div>

              </div>

              {/* Green Goods Arrow (Down) */}
              <div className="flex justify-center mt-4">
                <div className="inline-flex items-center gap-1.5 bg-[#22c55e]/10 px-5 py-2 rounded-full border border-[#22c55e]/30 text-xs font-bold">
                  <ArrowDownLeft className="w-4 h-4 text-[#22c55e]" />
                  <span className="text-[#22c55e]">Goods / Service Delivery</span>
                </div>
              </div>

              {/* Cash Arrows */}
              <div className="flex items-center justify-between px-8 text-xs font-bold mt-8">
                <div className="flex items-center gap-1 text-[#eab308] bg-[#eab308]/10 px-4 py-2 rounded-full border border-[#eab308]/30">
                  <ArrowDownLeft className="w-3.5 h-3.5" />
                  <span>Cash to Escrow</span>
                </div>
                <div className="flex items-center gap-1 text-[#3b82f6] bg-[#3b82f6]/10 px-4 py-2 rounded-full border border-[#3b82f6]/30">
                  <span>Release Cash</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* OloBuy Agent (Center) */}
              <div className="flex flex-col items-center z-10 mt-8">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white border-4 border-[#ff9800] flex items-center justify-center p-2 shadow-xl">
                  <img
                    src="/logo.jpg"
                    alt="OloBuy"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="mt-2 text-white font-black text-xs tracking-wider uppercase bg-white/10 px-4 py-1.5 rounded-full border border-white/10">
                  OLOBUY ESCROW AGENT
                </span>
              </div>

            </div>

            <p className="text-white/45 text-xs text-center mt-5 leading-relaxed">
              Funds held securely in neutral custody until item is received & inspected.
            </p>

            <button
              type="button"
              onClick={() => setShowEscrowModal(false)}
              className="w-full mt-6 bg-gradient-to-r from-[#ff9800] to-[#f57c00] text-[#0f172a] font-bold px-6 py-3.5 rounded-xl hover:opacity-95 transition-opacity shadow-lg cursor-pointer"
            >
              Got It, Close
            </button>
          </div>
        </div>
      )}

      {selectedStep && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#111827] border border-[#ff9800]/40 rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
            <button
              type="button"
              onClick={() => setSelectedStep(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
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

            <div className="bg-white/5 rounded-2xl p-5 border border-white/10 mb-6 space-y-3">
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

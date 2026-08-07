'use client';
import { useState, useEffect, useRef } from 'react';
import { ArrowRight, Lock, MapPin, Mail, Phone, ShieldCheck, ChevronDown } from 'lucide-react';
import { WHATSAPP_URL } from '@/lib/constants';

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

export function CtaFooter() {
  const cta = useFadeUp(0.1);
  const footer = useFadeUp(0.08);
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  return (
    <>
      {/* ===== Final CTA ===== */}
      <section className="relative bg-[#0f172a] py-16 sm:py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,152,0,0.08)_0%,transparent_65%)] pointer-events-none" />

        <div className="mx-auto max-w-4xl relative z-10">
          <div
            ref={cta.ref}
            className={`relative rounded-[2rem] sm:rounded-[2.5rem] bg-white px-6 sm:px-12 py-12 sm:py-16 text-center shadow-[0_25px_60px_rgba(0,0,0,0.35)] transition-all duration-700 ease-out ${
              cta.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-[#1a237e] to-[#0f172a] shadow-lg">
              <Lock className="h-7 w-7 text-white" />
            </div>

            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#ff9800]/10 px-4 py-1.5">
              <ShieldCheck className="h-4 w-4 text-[#ff9800]" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#1a237e]">
                Trusted Escrow · Pakistan
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-[#0f172a] leading-[1.15]">
              Never buy or sell online
              <span className="block text-[#ff9800] mt-1">without OloBuy</span>
            </h2>

            <p className="mx-auto mt-5 max-w-lg text-base sm:text-lg leading-relaxed text-[#0f172a]/70">
              Payment stays protected until you inspect and approve.
              Start your first safe deal in minutes.
            </p>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 sm:mt-10 inline-flex items-center justify-center gap-3 rounded-2xl bg-[#ff9800] px-8 sm:px-10 py-4 sm:py-5 text-base sm:text-lg font-black text-[#0f172a] shadow-[0_12px_30px_rgba(255,152,0,0.35)] transition-all hover:bg-[#ffb347] hover:shadow-[0_16px_40px_rgba(255,152,0,0.45)] active:scale-[0.98]"
            >
              Start a Safe Deal Now
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="bg-[#080c14] border-t border-white/[0.06]">
        <div
          ref={footer.ref}
          className={`mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-16 transition-all duration-700 ease-out ${
            footer.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="grid gap-12 lg:grid-cols-12">
            
            {/* Brand */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-start text-center lg:text-left">
              <div className="mb-5 inline-block bg-white/95 backdrop-blur-md p-3.5 sm:p-4 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.3)] border border-white/20">
                <img
                  src="/logo.jpg"
                  alt="OloBuy"
                  className="h-12 sm:h-14 w-auto object-contain"
                />
              </div>
              <p className="max-w-xs text-sm leading-relaxed text-white/70 font-medium">
                Pakistan&apos;s trusted manual escrow. We hold payment until you
                inspect and approve — safer online deals on OLX, Instagram, Facebook & more.
              </p>
            </div>

            {/* About + Contact */}
            <div className="grid gap-10 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-2">
              {/* Dropdown About Section (Smart & Professional Teaser Fusion) */}
              <div>
                <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#ff9800]">
                  About
                </p>
                <div className="rounded-xl border border-white/10 bg-white/[0.02] overflow-hidden transition-all">
                  <button
                    onClick={() => setIsAboutOpen(!isAboutOpen)}
                    className="w-full flex items-center justify-between p-3.5 text-left text-sm font-semibold text-white/90 hover:text-[#ff9800] transition-colors"
                  >
                    <span>OloBuy Overview</span>
                    <ChevronDown
                      className={`h-4 w-4 text-[#ff9800] transition-transform duration-300 ${
                        isAboutOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  {isAboutOpen && (
                    <div className="px-3.5 pb-4 pt-1 text-xs sm:text-sm leading-relaxed text-white/70 font-medium border-t border-white/5 space-y-2 animate-fadeIn">
                      <p>
                        OloBuy is a neutral third-party escrow dedicated to fraud-free online trade across Pakistan.
                      </p>
                      <p className="text-white/50 pt-1 border-t border-white/[0.04]">
                        <strong className="text-[#ff9800] font-semibold">Next-Gen Roadmap:</strong> Expanding in phases with advanced authentication layers, automated bidding environments, and enterprise retail infrastructure. Stay ahead of the market.
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#ff9800]">
                  Contact
                </p>
                <div className="space-y-3 font-medium">
                  <a
                    href="mailto:support@olobuy.pk"
                    className="flex items-center justify-center lg:justify-start gap-2.5 text-sm text-white/80 transition-colors hover:text-[#ff9800]"
                  >
                    <Mail className="h-4 w-4 shrink-0 text-[#ff9800]" />
                    support@olobuy.pk
                  </a>
                  <a
                    href="tel:03300100010"
                    className="flex items-center justify-center lg:justify-start gap-2.5 text-sm text-white/80 transition-colors hover:text-[#ff9800]"
                  >
                    <Phone className="h-4 w-4 shrink-0 text-[#ff9800]" />
                    0330-010-0-010
                  </a>
                </div>
              </div>
            </div>

            {/* Head Office */}
            <div className="lg:col-span-3 text-center lg:text-left">
              <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-[#ff9800]">
                Head Office
              </p>
              <div className="mb-4 overflow-hidden rounded-2xl border border-white/10 shadow-xl">
                <img
                  src="/image/olobuy-hq.jpg"
                  alt="OloBuy Head Office"
                  className="h-36 w-full object-cover sm:h-40"
                />
              </div>
              <div className="flex items-start justify-center lg:justify-start gap-2.5 text-sm text-white/70 font-medium">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#ff9800]" />
                <p className="leading-relaxed">
                  25 Sea View Rd, Block 4
                  <br />
                  Clifton, Karachi 74400
                </p>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] pt-8 sm:mt-14 sm:flex-row">
            <p className="text-center text-xs text-white/50 sm:text-left font-medium">
              © {new Date().getFullYear()} OloBuy®. All rights reserved. Secure Manual Escrow · Pakistan
            </p>
            <div className="flex items-center gap-5 text-xs text-white/60 font-medium">
              <a href="/terms" className="transition-colors hover:text-white">
                Terms
              </a>
              <span className="text-white/20">·</span>
              <a href="/privacy" className="transition-colors hover:text-white">
                Privacy
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
              }

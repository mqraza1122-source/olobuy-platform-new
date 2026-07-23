import { ArrowRight, Lock, MapPin } from 'lucide-react';
import { WHATSAPP_URL } from '@/lib/constants';

export function CtaFooter() {
  return (
    <>
      {/* Final Strong CTA */}
      <section className="bg-[#0f172a] py-20 px-4">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl bg-white px-8 py-16 text-center shadow-2xl">
            <Lock className="mx-auto h-14 w-14 text-[#1a237e]" />
            
            <h2 className="mt-6 text-4xl sm:text-5xl font-black text-[#1a237e] leading-tight">
              Never buy or sell online<br />without OloBuy in Pakistan
            </h2>
            
            <p className="mx-auto mt-6 max-w-xl text-xl text-[#1a237e]/80">
              OloBuy holds your payment safely until you inspect and approve the item. 
              Start your first secure deal today.
            </p>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 group inline-flex items-center justify-center gap-3 rounded-2xl bg-[#ff9800] px-10 py-5 text-xl font-black text-[#1a237e] shadow-xl hover:bg-[#ffb347] transition-all active:scale-95"
            >
              Start a Safe Deal Now
              <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0f172a] border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            
            {/* Brand */}
            <div>
              <div className="mb-6 flex justify-center sm:justify-start">
                <img 
                  src="/logo.jpg" 
                  alt="OloBuy Logo" 
                  className="h-12 object-contain"
                />
              </div>
              <p className="text-white/70 leading-relaxed text-center sm:text-left max-w-sm mx-auto sm:mx-0">
                Pakistan&apos;s #1 secure manual escrow service. 
                We hold your payment safely until you inspect and approve your item.
              </p>
            </div>

            {/* About & Contact */}
            <div className="space-y-8">
              <div>
                <span className="text-[#ff9800] uppercase font-bold tracking-widest text-sm block mb-3">About Us</span>
                <p className="text-white/70 leading-relaxed">
                  OloBuy is a neutral third-party service dedicated to making online trade in Pakistan safe and fraud-free.
                </p>
              </div>

              <div>
                <span className="text-[#ff9800] uppercase font-bold tracking-widest text-sm block mb-3">Contact</span>
                <a href="mailto:support@olobuy.pk" className="block text-white hover:text-[#ff9800] transition-colors">support@olobuy.pk</a>
                <a href="tel:03043031572" className="block text-white hover:text-[#ff9800] transition-colors mt-1">0304-3031572</a>
              </div>
            </div>

            {/* Head Office */}
            <div>
              <span className="text-[#ff9800] uppercase font-bold tracking-widest text-sm block mb-4">Head Office</span>
              
              <div className="rounded-2xl overflow-hidden mb-6 border border-white/10 shadow-xl">
                <img 
                  src="/image/olobuy-hq.jpg" 
                  alt="OloBuy Head Office" 
                  className="w-full h-52 object-cover"
                />
              </div>

              <div className="flex items-start gap-3 text-white/70 text-sm">
                <MapPin className="h-5 w-5 text-[#ff9800] shrink-0 mt-0.5" />
                <div>
                  25 Sea View Rd, Block 4<br />
                  Clifton, Karachi, 74400<br />
                  Pakistan
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/60">
            <p>© {new Date().getFullYear()} OloBuy. All rights reserved. Secure Manual Escrow Network Pakistan.</p>
            
            <div className="flex items-center gap-6">
              <a href="/terms" className="hover:text-white transition-colors">Terms & Conditions</a>
              <span className="text-white/30">•</span>
              <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
          }

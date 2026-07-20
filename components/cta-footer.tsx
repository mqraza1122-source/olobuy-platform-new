import { ArrowRight, Lock, MapPin } from 'lucide-react'
import { WHATSAPP_URL } from '@/lib/constants'

export function CtaFooter() {
  return (
    <>
      <section className="bg-[#1a237e]">
        <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-24">
          <div className="rounded-3xl bg-white px-6 py-14 text-center sm:px-12 shadow-lg">
            <Lock className="mx-auto h-10 w-10 text-[#1a237e]/80" />
            <h2 className="mt-5 text-balance text-3xl font-extrabold text-[#1a237e] sm:text-4xl">
              Never buy or sell online without OloBuy in Pakistan
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-lg leading-relaxed text-[#1a237e]/90">
              OloBuy holds your payment till your deal is finalized. <br />
              Start your first safe deal on WhatsApp today. <br />
              No advance, no fraud.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center justify-center gap-3 rounded-2xl bg-[#ff9800] px-8 py-4 text-lg font-bold text-[#1a237e] shadow-lg transition-colors hover:bg-[#e68900]"
            >
              Start a Safe Deal
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#1a237e]">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            
            {/* پرفیکٹ برانڈ سائز کارڈ */}
            <div className="max-w-sm">
              <div className="bg-white p-3 rounded-2xl shadow-lg mb-4 w-32 h-32 mx-auto flex items-center justify-center overflow-hidden">
                <img 
                  src="/logo.jpg" 
                  alt="OloBuy Logo" 
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
              <p className="text-sm leading-relaxed text-gray-300 text-center sm:text-left">
                Pakistan&apos;s #1 secure manual escrow service. We hold your payment safely until you inspect and approve your item.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <span className="text-sm font-bold text-[#ff9800] uppercase tracking-wider block mb-3">About Us</span>
                <p className="text-sm text-gray-300 leading-relaxed">
                  OloBuy is a neutral third-party service dedicated to making online trade in Pakistan safe and fraud-free by holding payments securely.
                </p>
              </div>
              <div>
                <span className="text-sm font-bold text-[#ff9800] uppercase tracking-wider block mb-3">Contact</span>
                <p className="text-lg font-bold text-white mt-1">support@olobuy.pk</p>
                <p className="text-lg font-bold text-white mt-1">0304-3031572</p>
              </div>
            </div>

            <div className="space-y-4">
              <span className="text-sm font-bold text-[#ff9800] uppercase tracking-wider">Head Office</span>
              <div className="w-full h-40 rounded-2xl overflow-hidden shadow-lg border border-white/10 bg-gray-800">
                <img 
                  src="/image/olobuy-hq.jpg" 
                  alt="OloBuy Corporate Headquarters" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex items-start gap-2 text-gray-300">
                <MapPin className="h-5 w-5 text-[#ff9800] shrink-0" />
                <p className="text-sm leading-relaxed">
                  25 Sea View Rd, Block 4 <br />
                  Clifton, Karachi, 74400 <br />
                  Pakistan
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12 border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} OloBuy. All rights reserved. Secure Manual Escrow Network Pakistan.</p>
            <div className="flex items-center gap-6 font-medium">
              <a href="/terms" className="hover:text-[#ff9800] transition-colors">Terms & Conditions</a>
              <span className="text-white/20">•</span>
              <a href="/privacy" className="hover:text-[#ff9800] transition-colors">Privacy Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

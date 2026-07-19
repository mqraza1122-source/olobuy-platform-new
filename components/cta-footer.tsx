import { ArrowRight, Lock, MapPin } from 'lucide-react'
import { WHATSAPP_URL } from '@/lib/constants'

export function CtaFooter() {
  return (
    <>
      <section className="bg-[#1a237e]">
        <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-24">
          <div className="rounded-3xl bg-[#ff9800] px-6 py-14 text-center sm:px-12 shadow-lg">
            <Lock className="mx-auto h-10 w-10 text-[#1a237e]/80" />
            <h2 className="mt-5 text-balance text-3xl font-extrabold text-[#1a237e] sm:text-4xl">
              Ready to buy or sell without the fear?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-lg leading-relaxed text-[#1a237e]/90">
              Start your first Safe Deal on WhatsApp today. No advance fear, no parcel fraud.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center justify-center gap-3 rounded-2xl bg-[#1a237e] px-8 py-4 text-lg font-bold text-white shadow-lg transition-colors hover:bg-[#283593]"
            >
              Start a Safe Deal
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 bg-[#1a237e]">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            
            <div className="max-w-sm">
              {/* اپڈیٹ شدہ لوگو باکس */}
              <div className="inline-flex items-center px-4 py-2 rounded-2xl bg-white mb-4 shadow-sm">
                <span className="text-2xl font-black">
                  <span className="text-[#ff9800]">Olo</span>
                  <span className="text-[#1a237e]">Buy</span>
                </span>
              </div>
              <p className="text-sm font-medium text-gray-300">Original Life, Original Buy</p>
              <p className="mt-4 text-sm leading-relaxed text-gray-300">
                Pakistan&apos;s #1 secure manual escrow service. We hold your payment safely until you inspect and approve your item.
              </p>
            </div>

            <nav className="flex flex-col gap-3" aria-label="Footer">
              <span className="text-sm font-bold text-white uppercase tracking-wider">Quick Links</span>
              <a href="#how-it-works" className="text-sm text-gray-300 hover:text-[#ff9800]">How It Works</a>
              <a href="#why" className="text-sm text-gray-300 hover:text-[#ff9800]">Why OloBuy</a>
              <a href="#reviews" className="text-sm text-gray-300 hover:text-[#ff9800]">Reviews</a>
              <a href="#faq" className="text-sm text-gray-300 hover:text-[#ff9800]">FAQ</a>
            </nav>

            <div className="space-y-4">
              <span className="text-sm font-bold text-white uppercase tracking-wider">Head Office</span>
              
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

          <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} OloBuy. All rights reserved. Secure Manual Escrow Network Pakistan.
          </div>
        </div>
      </footer>
    </>
  )
              }

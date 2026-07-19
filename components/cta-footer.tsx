import { ArrowRight, Lock, MapPin } from 'lucide-react'
import { WHATSAPP_URL } from '@/lib/constants'

export function CtaFooter() {
  return (
    <>
      <section className="bg-[#1a237e]">
        <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-24">
          {/* Big Card اب سفید ہے */}
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
            
            <div className="max-w-sm">
              <div className="inline-flex items-center px-4 py-2 rounded-2xl bg-white mb-4 shadow-sm">
                <span className="text-2xl font-black">
                  <span className="text-[#fcc21b]">Olo</span>
                  <span className="text-[#1a237e]">Buy</span>
                </span>
              </div>
              <p className="text-sm font-medium text-gray-300">Original Life, Original Buy</p>
              <p className="mt-4 text-sm leading-relaxed text-gray-300">
                Pakistan&apos;s #1 secure manual escrow service. We hold your payment safely until you inspect and approve your item.
              </p>
            </div>

            <div className="space-y-6">
              <div>
                {/* ہیڈنگ اورینج کر دی گئی ہے */}
                <span className="text-sm font-bold text-[#ff9800] uppercase tracking-wider block mb-3">About Us</span>
                <p className="text-sm text-gray-300 leading-relaxed">
                  OloBuy is a neutral third-party service dedicated to making online trade in Pakistan safe and fraud-free by holding payments securely.
                </p>
              </div>
              <div>
                {/* ہیڈنگ اورینج کر دی گئی ہے */}
                <span className="text-sm font-bold text-[#ff9800] uppercase tracking-wider block mb-3">Contact</span>
                <p className="text-sm text-gray-300">olobuyinfo@gmail.com</p>
                <p className="text-lg font-bold text-white mt-1">0304-3031572</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* ہیڈنگ اورینج کر دی گئی ہے */}
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

          <div className="mt-12 border-t border-white/10 pt-8 text-center text-sm text-gray-400">
            &copy; {new Date().getFullYear()} OloBuy. All rights reserved. Secure Manual Escrow Network Pakistan.
          </div>
        </div>
      </footer>
    </>
  )
                  }

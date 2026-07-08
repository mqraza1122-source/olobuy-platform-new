import { ArrowRight, Lock, Star } from 'lucide-react'
import { WHATSAPP_URL } from '@/lib/constants'

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-[#1a237e]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
        <div className="flex flex-col items-center text-center">
          
          {/* Updated Card: Orange background with Navy Blue text */}
          <div className="inline-flex items-center gap-2 rounded-full bg-[#ff9800] px-5 py-2.5 shadow-lg">
            <Lock className="h-4 w-4 text-[#1a237e]" />
            <span className="text-sm font-bold text-[#1a237e]">
              Pakistan&apos;s first manual escrow platform
            </span>
          </div>

          <h1 dir="rtl" lang="ur" className="mt-8 font-urdu leading-[2.5]">
            <span className="block text-4xl font-bold text-white sm:text-6xl">
              نہ ایڈوانس کا ڈر،
            </span>
            <span className="mt-4 block text-4xl font-bold text-[#ff9800] sm:text-6xl">
              نہ پارسل کا فراڈ!
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-gray-200 sm:text-xl">
            Stop risking money on OLX or Facebook Marketplace.{' '}
            <span className="font-bold text-white">
              OloBuy holds your payment securely
            </span>{' '}
            until you inspect and approve the item.
          </p>

          <div className="mt-10 w-full max-w-xl">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-[#ff9800] px-8 py-5 text-xl font-bold text-[#1a237e] shadow-lg transition-all hover:bg-orange-400"
            >
              Start a Safe Deal (WhatsApp)
              <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <div className="mt-6 flex flex-col items-center gap-2">
            <div className="flex items-center gap-1" aria-label="Rated 5 out of 5 stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-[#ff9800] text-[#ff9800]" />
              ))}
            </div>
            <p className="text-sm font-medium text-gray-300">
              Trusted by thousands of buyers &amp; sellers across Pakistan
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

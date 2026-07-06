import { ArrowRight, Lock, Star } from 'lucide-react'
import { WHATSAPP_URL } from '@/lib/constants'

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden bg-background">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
        <div className="flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/5 px-5 py-2.5">
            <Lock className="h-4 w-4 text-primary" />
            <span className="text-sm font-bold text-primary">
              Pakistan&apos;s #1 Secure Manual Escrow Service
            </span>
          </div>

          <h1 dir="rtl" lang="ur" className="mt-8 font-urdu leading-[1.6]">
            <span className="block text-4xl font-bold text-primary sm:text-6xl">
              نہ ایڈوانس کا ڈر،
            </span>
            <span className="mt-2 block text-4xl font-bold text-brand-orange sm:text-6xl">
              نہ پارسل کا فراڈ!
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Stop risking money on OLX or Facebook Marketplace.{' '}
            <span className="font-bold text-foreground">
              OloBuy holds your payment securely
            </span>{' '}
            until you inspect and approve the item.
          </p>

          <div className="mt-10 w-full max-w-xl">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex w-full items-center justify-center gap-3 rounded-2xl bg-primary px-8 py-5 text-xl font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:bg-primary/90"
            >
              Start a Safe Deal (WhatsApp)
              <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
            </a>
          </div>

          <div className="mt-6 flex flex-col items-center gap-2">
            <div className="flex items-center gap-1" aria-label="Rated 5 out of 5 stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-brand-orange text-brand-orange" />
              ))}
            </div>
            <p className="text-sm font-medium text-muted-foreground">
              Trusted by thousands of buyers &amp; sellers across Pakistan
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

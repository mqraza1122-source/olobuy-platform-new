import { ArrowRight, Lock } from 'lucide-react'
import { WHATSAPP_URL } from '@/lib/constants'

export function CtaFooter() {
  return (
    <>
      <section className="bg-background">
        <div className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 sm:pb-24">
          <div className="rounded-3xl bg-primary px-6 py-14 text-center sm:px-12">
            <Lock className="mx-auto h-10 w-10 text-primary-foreground/80" />
            <h2 className="mt-5 text-balance text-3xl font-extrabold text-primary-foreground sm:text-4xl">
              Ready to buy or sell without the fear?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-pretty text-lg leading-relaxed text-primary-foreground/80">
              Start your first Safe Deal on WhatsApp today. No advance fear, no parcel fraud.
            </p>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex items-center justify-center gap-3 rounded-2xl bg-brand-orange px-8 py-4 text-lg font-bold text-accent-foreground shadow-lg transition-colors hover:bg-brand-orange/90"
            >
              Start a Safe Deal
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-sm">
              <span className="text-2xl font-extrabold tracking-tight">
                <span className="text-primary">Olo</span>
                <span className="text-brand-orange">Buy</span>
              </span>
              <p className="mt-1 text-sm font-medium text-muted-foreground">
                Original Life, Original Buy
              </p>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                Pakistan&apos;s #1 secure manual escrow service. We hold your payment safely
                until you inspect and approve your item.
              </p>
            </div>

            <nav className="flex flex-col gap-3" aria-label="Footer">
              <span className="text-sm font-bold text-foreground">Quick Links</span>
              <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-primary">
                How It Works
              </a>
              <a href="#why" className="text-sm text-muted-foreground hover:text-primary">
                Why OloBuy
              </a>
              <a href="#reviews" className="text-sm text-muted-foreground hover:text-primary">
                Reviews
              </a>
              <a href="#faq" className="text-sm text-muted-foreground hover:text-primary">
                FAQ
              </a>
            </nav>
          </div>

          <div className="mt-10 border-t border-border pt-6 text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} OloBuy. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  )
}

'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const FAQS = [
  {
    q: 'What is OloBuy exactly?',
    a: 'OloBuy is a manual escrow service. We act as a trusted middleman that holds the buyer\u2019s payment securely until the item is received and approved, protecting both buyer and seller from fraud.',
  },
  {
    q: 'How much does it cost?',
    a: 'We charge a small, transparent escrow fee per deal. The exact fee depends on the item value \u2014 message us on WhatsApp and we\u2019ll share the fee before you commit to anything.',
  },
  {
    q: 'Which platforms does it work with?',
    a: 'Any of them. Whether you found the deal on OLX, Facebook Marketplace, Instagram, or WhatsApp groups, OloBuy can secure the transaction.',
  },
  {
    q: 'What happens if the item is not as described?',
    a: 'If the item does not match what was agreed, the buyer can decline it during inspection. In that case the payment is not released to the seller and we help resolve the return.',
  },
  {
    q: 'How do I start a deal?',
    a: 'Just tap any "Start Safe Deal" button to open WhatsApp. Tell us about the item and price, and our team will guide both parties through the process.',
  },
]

export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="bg-background">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-brand-orange">
            FAQ
          </p>
          <h2 className="mt-3 text-balance text-3xl font-extrabold text-foreground sm:text-4xl">
            Frequently asked questions
          </h2>
        </div>

        <div className="mt-10 divide-y divide-border rounded-2xl border border-border bg-card">
          {FAQS.map((faq, i) => {
            const isOpen = openIndex === i
            return (
              <div key={faq.q}>
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-bold text-foreground">{faq.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-primary transition-transform ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="px-6 pb-5 text-pretty leading-relaxed text-muted-foreground">
                    {faq.a}
                  </p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

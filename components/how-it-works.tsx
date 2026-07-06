import { Handshake, Wallet, PackageCheck, BadgeCheck } from 'lucide-react'

const STEPS = [
  {
    icon: Handshake,
    title: 'Agree on the Deal',
    desc: 'Buyer and seller agree on the item and price, then message us on WhatsApp to open a Safe Deal.',
  },
  {
    icon: Wallet,
    title: 'Buyer Pays OloBuy',
    desc: 'The buyer sends payment to OloBuy. We hold the funds securely — the seller never gets an advance.',
  },
  {
    icon: PackageCheck,
    title: 'Seller Ships the Item',
    desc: 'The seller ships with confidence knowing the payment is already secured with OloBuy.',
  },
  {
    icon: BadgeCheck,
    title: 'Inspect & Release',
    desc: 'The buyer inspects the item. Once approved, we release the payment to the seller. Simple and safe.',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-brand-orange">
            How It Works
          </p>
          <h2 className="mt-3 text-balance text-3xl font-extrabold text-foreground sm:text-4xl">
            A safe deal in 4 simple steps
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Manual escrow that keeps both buyer and seller protected from start to finish.
          </p>
        </div>

        <ol className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => {
            const Icon = step.icon
            return (
              <li
                key={step.title}
                className="relative flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm"
              >
                <span className="absolute right-6 top-6 text-5xl font-black text-primary/10">
                  {i + 1}
                </span>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.desc}
                </p>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

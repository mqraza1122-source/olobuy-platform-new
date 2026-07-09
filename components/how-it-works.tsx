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
    <section id="how-it-works" className="bg-[#1a237e]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-[#ff9800]">
            How It Works
          </p>
          <h2 className="mt-3 text-balance text-3xl font-extrabold text-white sm:text-4xl">
            A safe deal in 4 simple steps
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-gray-200">
            Manual escrow that keeps both buyer and seller protected from start to finish.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
          {STEPS.map((step, i) => {
            const Icon = step.icon
            return (
              <div
                key={step.title}
                className="relative flex flex-col h-full rounded-2xl border border-white/10 bg-[#283593] p-6 shadow-sm"
              >
                <span className="absolute right-6 top-6 text-5xl font-black text-[#ff9800]/20">
                  {i + 1}
                </span>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-[#ff9800]/20 text-[#ff9800]">
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold text-white">
                  {step.title}
                </h3>
                <p className="mt-2 flex-grow text-sm leading-relaxed text-gray-300">
                  {step.desc}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

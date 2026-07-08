import { ShieldCheck, Eye, MessageCircle, Banknote, Truck, Users } from 'lucide-react'

const FEATURES = [
  {
    icon: ShieldCheck,
    title: 'No Advance Fraud',
    desc: 'Sellers never receive money upfront. Buyers never lose an advance to a fake listing.',
  },
  {
    icon: Eye,
    title: 'Inspect Before You Pay Out',
    desc: 'Payment is only released after the buyer receives and approves the item.',
  },
  {
    icon: MessageCircle,
    title: 'Simple WhatsApp Process',
    desc: 'No complicated apps or sign-ups. Start and manage your deal entirely on WhatsApp.',
  },
  {
    icon: Banknote,
    title: 'Money Held Securely',
    desc: 'OloBuy holds funds in a neutral, manual escrow until both sides are satisfied.',
  },
  {
    icon: Truck,
    title: 'Safe Nationwide Delivery',
    desc: 'Works with any courier across Pakistan so buyers and sellers stay protected.',
  },
  {
    icon: Users,
    title: 'Fair for Both Sides',
    desc: 'A trusted middleman that protects the buyer and the seller equally.',
  },
]

export function Features() {
  return (
    <section id="why" className="bg-[#1a237e]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-[#ff9800]">
            Why OloBuy
          </p>
          <h2 className="mt-3 text-balance text-3xl font-extrabold text-white sm:text-4xl">
            Built to end online buying &amp; selling fraud
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-gray-200">
            Everything you need to trade safely with strangers online.
          </p>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="flex gap-4 rounded-2xl border border-white/10 bg-[#283593] p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#ff9800]/20 text-[#ff9800]">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-white">{feature.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-gray-300">
                    {feature.desc}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
          }

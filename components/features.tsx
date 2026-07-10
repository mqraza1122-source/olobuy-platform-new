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
    <section id="why" className="bg-[#1a237e] py-20 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex justify-center mb-16">
          <div className="inline-flex rounded-full bg-[#ff9800] px-8 py-3 text-center shadow-lg">
            <h2 className="text-xl font-black text-[#1a237e] uppercase tracking-widest">
              Why OloBuy
            </h2>
          </div>
        </div>

        <div className="mx-auto max-w-2xl text-center mb-14">
          <h2 className="text-balance text-4xl font-extrabold text-white sm:text-5xl">
            Built to end online buying &amp; selling fraud
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-gray-200">
            Everything you need to trade safely with strangers online.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="flex gap-4 rounded-[2rem] border border-white/10 bg-[#283593] p-6 shadow-xl"
              >
                <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#1a237e]/50 text-[#ff9800]">
                  <Icon className="h-6 w-6" />
                </span>
                <div>
                  <h3 className="text-base font-bold text-white">{feature.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-300">
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

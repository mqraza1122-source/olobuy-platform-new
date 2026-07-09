import { ShieldCheck, MessageSquareText, Landmark, Truck } from 'lucide-react'

const STEPS = [
  {
    icon: MessageSquareText,
    title: 'Agree on the Deal',
    desc: 'Buyer and seller agree on the item, then message us on WhatsApp.',
  },
  {
    icon: Landmark,
    title: 'Buyer Pays OloBuy',
    desc: 'Buyer sends payment to OloBuy. We hold funds in manual escrow.',
  },
  {
    icon: Truck,
    title: 'Seller Ships',
    desc: 'Seller ships with confidence knowing payment is already secured.',
  },
  {
    icon: ShieldCheck,
    title: 'Inspect & Release',
    desc: 'Buyer inspects the item. Once approved, we release the payment.',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[#1a237e] py-12 sm:py-24">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center mb-12">
          <div className="inline-block rounded-full bg-[#ff9800] px-6 py-1.5 text-xs font-bold uppercase tracking-widest text-white mb-3">
            How It Works
          </div>
          <h2 className="text-2xl font-extrabold text-white sm:text-4xl">
            A safe deal in 4 simple steps
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => {
            const Icon = step.icon
            return (
              <div
                key={step.title}
                className="relative flex flex-col rounded-2xl border border-white/10 bg-[#283593] p-5 shadow-sm"
              >
                <div className="absolute top-4 right-5 text-3xl font-black text-white/5">
                  0{i + 1}
                </div>
                
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/10">
                  <Icon className="h-5 w-5 text-[#ff9800] stroke-[1.5]" />
                </div>
                
                <h3 className="text-lg font-bold text-white mb-2 leading-tight">
                  {step.title}
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed">
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

import { ShieldCheck, MessageSquareText, Landmark, Truck } from 'lucide-react'

const STEPS = [
  {
    icon: MessageSquareText,
    title: 'Agree on the Deal',
    desc: 'Buyer and seller agree on the item and price, then message us on WhatsApp to open a Safe Deal.',
  },
  {
    icon: Landmark,
    title: 'Buyer Pays OloBuy',
    desc: 'The buyer sends payment to OloBuy. We hold the funds securely in manual escrow.',
  },
  {
    icon: Truck,
    title: 'Seller Ships the Item',
    desc: 'The seller ships with confidence knowing that the payment is already secured with OloBuy.',
  },
  {
    icon: ShieldCheck,
    title: 'Inspect & Release',
    desc: 'The buyer inspects the item. Once approved, we release the payment to the seller. Simple and safe.',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[#1a237e] py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4">
        {/* ہیڈر کا ڈیزائن جو برانڈ کو نمایاں کرے */}
        <div className="mx-auto max-w-2xl text-center mb-16">
          <div className="inline-block rounded-full bg-[#ff9800] px-6 py-2 text-sm font-bold uppercase tracking-widest text-white mb-4">
            How It Works
          </div>
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            A safe deal in 4 simple steps
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 items-stretch">
          {STEPS.map((step, i) => {
            const Icon = step.icon
            return (
              <div
                key={step.title}
                className="flex flex-col h-full rounded-3xl border border-white/10 bg-[#283593] p-8 shadow-lg hover:border-[#ff9800]/50 transition-all duration-300"
              >
                {/* پروفیشنل پتلے لائن آئیکنز */}
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 border border-white/10">
                  <Icon className="h-7 w-7 text-[#ff9800] stroke-[1.5]" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="flex-grow text-sm leading-relaxed text-gray-300">
                  {step.desc}
                </p>
                
                {/* سٹیپ نمبر */}
                <div className="mt-6 text-2xl font-black text-white/10">
                  0{i + 1}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

import { ShieldCheck, MessageSquareText, Landmark, Truck } from 'lucide-react'

const STEPS = [
  {
    icon: MessageSquareText,
    title: 'Agree on the Deal',
    desc: 'Buyer and seller agree on the item details, price, and terms, then initiate the process by messaging us on our official WhatsApp.',
  },
  {
    icon: Landmark,
    title: 'Buyer Pays OloBuy',
    desc: 'The buyer transfers the agreed amount to OloBuy. We safely hold these funds in our secure manual escrow account.',
  },
  {
    icon: Truck,
    title: 'Seller Ships',
    desc: 'Once we verify the payment, we instruct the seller to ship the item. The seller ships with full confidence as funds are secured.',
  },
  {
    icon: ShieldCheck,
    title: 'Inspect & Release',
    desc: 'The buyer receives and inspects the item. Upon their approval, we instantly release the payment to the seller.',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[#1a237e] py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-white sm:text-6xl">
            How It Works
          </h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => {
            const Icon = step.icon
            return (
              <div
                key={step.title}
                className="flex flex-col rounded-[2rem] bg-[#283593] p-8 border border-white/10 shadow-xl"
              >
                {/* نمبر اور آئیکون ایک ہی لائن میں */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-3xl font-black text-[#ff9800]">
                    0{i + 1}
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1a237e]/50 border border-white/10">
                    <Icon className="h-6 w-6 text-[#ff9800]" />
                  </div>
                </div>
                
                {/* ہیڈنگ اور تفصیل نیچے */}
                <h3 className="text-xl font-bold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-sm font-medium text-gray-300 leading-relaxed">
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

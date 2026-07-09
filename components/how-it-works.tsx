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
    <section id="how-it-works" className="bg-white py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-[#1a237e] sm:text-6xl">
            How It Works
          </h2>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => {
            const Icon = step.icon
            return (
              <div
                key={step.title}
                className="group relative flex flex-col rounded-[2rem] bg-[#ff9800] p-8 shadow-2xl transition-transform hover:-translate-y-2"
              >
                <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-[#1a237e]/10 border-2 border-[#1a237e]/20">
                  <Icon className="h-10 w-10 text-[#1a237e]" />
                </div>
                
                <div className="mb-4 text-4xl font-black text-[#1a237e]/30">
                  0{i + 1}
                </div>

                <h3 className="text-2xl font-bold text-[#1a237e] mb-4 leading-tight">
                  {step.title}
                </h3>
                <p className="text-base font-medium text-[#1a237e]/80 leading-relaxed">
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

import { ShieldCheck, MessageSquareText, Landmark, Package } from 'lucide-react'

const STEPS = [
  {
    icon: MessageSquareText,
    title: 'Agree on the Deal',
    desc: 'Buyer and provider agree on the details, price, and terms, then initiate the process by messaging us on our official WhatsApp.',
  },
  {
    icon: Landmark,
    title: 'Buyer Pays OloBuy',
    desc: 'The buyer transfers the agreed amount to OloBuy. We safely hold these funds in our secure manual escrow account.',
  },
  {
    icon: Package,
    title: 'Provider Delivers',
    desc: 'Once we verify the payment, we instruct the provider to ship the item or deliver the digital service. Everything is secured.',
  },
  {
    icon: ShieldCheck,
    title: 'Inspect & Release',
    desc: 'The buyer receives and inspects the item or work. Upon their approval, we instantly release the payment.',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[#1a237e] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex justify-center mb-16">
          <div className="inline-flex rounded-full bg-[#ff9800] px-10 py-4 text-center shadow-[0_0_30px_rgba(255,152,0,0.4)]">
            <h2 className="text-xl md:text-2xl font-black text-[#1a237e] uppercase tracking-widest">
              How It Works
            </h2>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => {
            const Icon = step.icon
            return (
              <div
                key={step.title}
                className="group flex flex-col rounded-[2.5rem] bg-[#283593] p-8 border border-white/10 shadow-2xl transition-all duration-300 hover:bg-[#303f9f] hover:-translate-y-2 hover:border-[#ff9800]/50"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-4xl font-black text-[#ff9800]/30 group-hover:text-[#ff9800] transition-colors">
                    0{i + 1}
                  </div>
                  <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-[#1a237e] border border-white/10 group-hover:border-[#ff9800]/50 transition-colors">
                    <Icon className="h-7 w-7 text-[#ff9800]" />
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-white mb-4">
                  {step.title}
                </h3>
                <p className="text-sm font-medium text-gray-300 leading-relaxed group-hover:text-white transition-colors">
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

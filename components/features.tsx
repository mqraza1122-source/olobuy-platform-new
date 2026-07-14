import { ShieldCheck, Eye, MessageCircle, Banknote, Package, Users } from 'lucide-react'

const FEATURES = [
  { icon: ShieldCheck, title: 'No Advance Fraud', desc: 'Providers never receive money upfront.' },
  { icon: Eye, title: 'Inspect Before Release', desc: 'Payment is released after inspection.' },
  { icon: MessageCircle, title: 'Simple WhatsApp', desc: 'Manage deals on WhatsApp.' },
  { icon: Banknote, title: 'Secure Money', desc: 'Funds held in neutral escrow.' },
  { icon: Package, title: 'Versatile', desc: 'Goods or digital services.' },
  { icon: Users, title: 'Fair for All', desc: 'Middleman protection.' },
]

export function Features() {
  return (
    <section id="why" className="bg-[#1a237e] py-20">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-4xl font-extrabold text-white mb-12">Why OloBuy</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.title} className="bg-[#283593] p-6 rounded-2xl border border-white/10">
              <f.icon className="text-[#ff9800] h-8 w-8 mb-4" />
              <h3 className="font-bold text-white text-lg">{f.title}</h3>
              <p className="text-sm text-gray-300 mt-2">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
                        }

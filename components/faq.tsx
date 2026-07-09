import { ChevronDown } from 'lucide-react'

const FAQS = [
  {
    q: 'What is OloBuy exactly?',
    a: 'OloBuy is a manual escrow service. We act as a trusted middleman that holds the buyer\'s payment securely until the item is received and approved by both parties, protecting everyone from fraud.',
  },
  {
    q: 'How much does it cost?',
    a: 'Our service fee is very minimal and transparent. You can check our latest rates by messaging us directly on our WhatsApp channel.',
  },
  {
    q: 'Which platforms does it work with?',
    a: 'We work with all major marketplaces in Pakistan, including OLX, Facebook Marketplace, and Instagram sellers. As long as it is a legal transaction, we can secure it.',
  },
]

export function Faq() {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-4">
        {/* اورینج کیپسول ہیڈر */}
        <div className="text-center mb-12">
          <div className="inline-block rounded-full bg-[#ff9800] px-8 py-3 text-lg font-bold uppercase tracking-widest text-white mb-6">
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl font-extrabold text-[#1a237e]">
            Need more clarity?
          </h2>
        </div>

        {/* سوالات کا ڈیزائن */}
        <div className="space-y-4">
          {FAQS.map((faq, i) => (
            <div 
              key={i} 
              className="group rounded-2xl border border-gray-100 bg-gray-50 p-6 transition-all hover:border-[#ff9800]/30"
            >
              <button className="flex w-full items-center justify-between text-left">
                <span className="text-lg font-bold text-[#1a237e]">{faq.q}</span>
                <ChevronDown className="h-5 w-5 text-[#ff9800] transition-transform group-hover:rotate-180" />
              </button>
              <p className="mt-4 text-sm leading-relaxed text-gray-600">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

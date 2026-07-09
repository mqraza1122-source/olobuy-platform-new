import { Star, Quote } from 'lucide-react'

const REVIEWS = [
  {
    name: 'Luxe Branded fashion .',
    role: 'Buyer, Hyderabad',
    text: 'Bought branded clothes in bulk from faislabad through OloBuy. My money was safe until the parcel reached me.',
  },
  {
    name: 'Sana jewelery.',
    role: 'Seller, Karachi',
    text: 'As a seller I was always scared of fake buyers. OloBuy held the payment before I shipped, so I finally felt secure.',
  },
  {
    name: 'Bilal Cosmetics.',
    role: 'Buyer, Islamabad',
    text: 'Super simple over WhatsApp. Inspected the item first, approved it, and only then the seller got paid.',
  },
]

const STATS = [
  { value: '1000+', label: 'Safe deals' },
  { value: 'PKR 9.5M+', label: 'Protected' },
  { value: '4.9/5', label: 'Rating' },
]

export function Testimonials() {
  return (
    <section id="reviews" className="bg-[#1a237e]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="mx-auto max-w-2xl text-center mb-10">
          <p className="text-xs font-bold uppercase tracking-wider text-[#ff9800]">
            Reviews
          </p>
          <h2 className="mt-2 text-2xl font-extrabold text-white sm:text-3xl">
            Trusted by users
          </h2>
        </div>

        <dl className="mx-auto grid grid-cols-3 gap-3">
          {STATS.map((stat) => (
            <div key={stat.label} className="rounded-xl border border-white/10 bg-[#283593] p-4 text-center">
              <dt className="text-xl font-extrabold text-[#ff9800]">{stat.value}</dt>
              <dd className="text-[10px] uppercase font-bold text-gray-300">{stat.label}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {REVIEWS.map((review) => (
            <figure
              key={review.name}
              className="flex flex-col rounded-xl border border-white/10 bg-[#283593] p-5 shadow-sm"
            >
              <Quote className="h-5 w-5 text-[#ff9800]/40" />
              <div className="mt-2 flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-[#ff9800] text-[#ff9800]" />
                ))}
              </div>
              <blockquote className="mt-3 text-xs leading-relaxed text-white/90 flex-grow">
                {review.text}
              </blockquote>
              <figcaption className="mt-4 border-t border-white/10 pt-3">
                <span className="block text-sm font-bold text-white">{review.name}</span>
                <span className="block text-[10px] text-gray-400">{review.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
              }

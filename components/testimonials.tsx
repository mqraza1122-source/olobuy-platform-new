import { Star, Quote } from 'lucide-react'

const REVIEWS = [
  {
    name: 'Luxe Branded fashion .',
    role: 'Buyer, Hyderabad',
    text: 'Bought branded clothes in bulk from faislabad through OloBuy. My money was safe until the parcel reached me. No more advance payment tension!',
  },
  {
    name: 'Sana jewelery.',
    role: 'Seller, Karachi',
    text: 'As a seller I was always scared of fake buyers. OloBuy held the payment before I shipped, so I finally felt secure sending my parcel.',
  },
  {
    name: 'Bilal Cosmetics.',
    role: 'Buyer, Islamabad',
    text: 'Super simple over WhatsApp. Inspected the item first, approved it, and only then the seller got paid. Exactly how it should be.',
  },
]

const STATS = [
  { value: '10,00+', label: 'Safe deals completed' },
  { value: 'PKR 25M+', label: 'Payments protected' },
  { value: '4.9/5', label: 'Average rating' },
]

export function Testimonials() {
  return (
    <section id="reviews" className="bg-[#1a237e]">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-[#ff9800]">
            Reviews
          </p>
          <h2 className="mt-3 text-balance text-3xl font-extrabold text-white sm:text-4xl">
            Trusted by buyers &amp; sellers nationwide
          </h2>
        </div>

        <dl className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-[#283593] p-6 text-center shadow-sm"
            >
              <dt className="text-3xl font-extrabold text-[#ff9800]">{stat.value}</dt>
              <dd className="mt-1 text-sm font-medium text-gray-300">{stat.label}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {REVIEWS.map((review) => (
            <figure
              key={review.name}
              className="flex flex-col rounded-2xl border border-white/10 bg-[#283593] p-6 shadow-sm"
            >
              <Quote className="h-8 w-8 text-[#ff9800]/40" aria-hidden />
              <div className="mt-3 flex items-center gap-1" aria-label="Rated 5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-[#ff9800] text-[#ff9800]" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-pretty leading-relaxed text-white/90">
                {review.text}
              </blockquote>
              <figcaption className="mt-5 border-t border-white/10 pt-4">
                <span className="block font-bold text-white">{review.name}</span>
                <span className="block text-sm text-gray-300">{review.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
      }

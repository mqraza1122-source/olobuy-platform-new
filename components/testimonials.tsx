import { Star, Quote } from 'lucide-react'

const REVIEWS = [
  {
    name: 'Ahsan R.',
    role: 'Buyer, Lahore',
    text: 'Bought a used iPhone from OLX through OloBuy. My money was safe until the phone reached me. No more advance-payment tension!',
  },
  {
    name: 'Sana K.',
    role: 'Seller, Karachi',
    text: 'As a seller I was always scared of fake buyers. OloBuy held the payment before I shipped, so I finally felt secure sending my parcel.',
  },
  {
    name: 'Bilal M.',
    role: 'Buyer, Islamabad',
    text: 'Super simple over WhatsApp. Inspected the item first, approved it, and only then the seller got paid. Exactly how it should be.',
  },
]

const STATS = [
  { value: '10,000+', label: 'Safe deals completed' },
  { value: 'PKR 250M+', label: 'Payments protected' },
  { value: '4.9/5', label: 'Average rating' },
]

export function Testimonials() {
  return (
    <section id="reviews" className="border-t border-border bg-secondary/40">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-bold uppercase tracking-wider text-brand-orange">
            Reviews
          </p>
          <h2 className="mt-3 text-balance text-3xl font-extrabold text-foreground sm:text-4xl">
            Trusted by buyers &amp; sellers nationwide
          </h2>
        </div>

        <dl className="mx-auto mt-12 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3">
          {STATS.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-border bg-card p-6 text-center shadow-sm"
            >
              <dt className="text-3xl font-extrabold text-primary">{stat.value}</dt>
              <dd className="mt-1 text-sm font-medium text-muted-foreground">{stat.label}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {REVIEWS.map((review) => (
            <figure
              key={review.name}
              className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <Quote className="h-8 w-8 text-brand-orange/40" aria-hidden />
              <div className="mt-3 flex items-center gap-1" aria-label="Rated 5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-brand-orange text-brand-orange" />
                ))}
              </div>
              <blockquote className="mt-4 flex-1 text-pretty leading-relaxed text-foreground/90">
                {review.text}
              </blockquote>
              <figcaption className="mt-5 border-t border-border pt-4">
                <span className="block font-bold text-foreground">{review.name}</span>
                <span className="block text-sm text-muted-foreground">{review.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

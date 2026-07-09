import { Star, Quote } from 'lucide-react';

const REVIEWS = [
  {
    name: 'Luxe Branded fashion',
    role: 'Buyer, Hyderabad',
    text: 'Bought branded clothes in bulk from Faislabad through OloBuy. My money was safe until the parcel reached me.',
  },
  {
    name: 'Sana Jewelry',
    role: 'Seller, Karachi',
    text: 'As a seller I was always scared of fake buyers. OloBuy held the payment before I shipped, so I finally felt secure.',
  },
  {
    name: 'Bilal Cosmetics',
    role: 'Buyer, Islamabad',
    text: 'Super simple over WhatsApp. Inspected the item first, approved it, and only then the seller got paid.',
  },
];

const STATS = [
  { value: '1000+', label: 'Safe Deals' },
  { value: 'PKR 9.5M+', label: 'Protected' },
  { value: '4.9/5', label: 'User Rating' },
];

export function Testimonials() {
  return (
    <section className="bg-[#1a237e] py-20 sm:py-32">
      <div className="mx-auto max-w-7xl px-6">
        {/* ہیڈر - اب سادہ اور کلین ہے */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl">
            Real Stories, Real Trust
          </h2>
        </div>

        {/* سٹیٹس (Stats) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {STATS.map((stat) => (
            <div key={stat.label} className="rounded-[2rem] bg-[#283593] p-8 text-center border border-white/10">
              <div className="text-5xl font-black text-[#ff9800] mb-2">{stat.value}</div>
              <div className="text-lg font-bold text-gray-300 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* ریویو کارڈز */}
        <div className="grid gap-8 lg:grid-cols-3">
          {REVIEWS.map((review, i) => (
            <div key={i} className="flex flex-col rounded-[2rem] bg-white p-8 shadow-2xl">
              <Quote className="h-10 w-10 text-[#ff9800] mb-6" />
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-[#ff9800] text-[#ff9800]" />
                ))}
              </div>
              <p className="text-base font-medium text-[#1a237e]/80 leading-relaxed flex-grow mb-8 italic">
                "{review.text}"
              </p>
              <div className="border-t border-gray-100 pt-6">
                <span className="block text-xl font-bold text-[#1a237e]">{review.name}</span>
                <span className="block text-sm font-bold text-[#ff9800]">{review.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

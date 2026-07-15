export function Testimonials() {
  return (
    <section id="reviews" className="py-20 bg-[#f8f9fa]">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-3xl font-extrabold text-[#1a237e] mb-12">
          What Our Users Say
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Testimonial 1 */}
          <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-gray-600 italic">"OloBuy is a game changer for online deals in Pakistan. Totally secure!"</p>
            <div className="mt-4 font-bold text-[#1a237e]">- Ahmed Raza</div>
          </div>
          
          {/* Testimonial 2 */}
          <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-gray-600 italic">"I sold my phone safely using OloBuy. No advance payment, no tension."</p>
            <div className="mt-4 font-bold text-[#1a237e]">- Fatima Ali</div>
          </div>
          
          {/* Testimonial 3 */}
          <div className="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-gray-600 italic">"Very professional service. Escrow system works perfectly."</p>
            <div className="mt-4 font-bold text-[#1a237e]">- Kamran Khan</div>
          </div>
        </div>
      </div>
    </section>
  )
}

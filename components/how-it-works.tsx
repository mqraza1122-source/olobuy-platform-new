export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-[#0f172a] py-16 px-4">
      <div className="mx-auto max-w-5xl text-center">
        <div className="inline-block bg-[#ff9800] text-[#1a237e] font-black px-8 py-4 rounded-full text-2xl mb-6 shadow-lg">
          HOW IT WORKS
        </div>
        <p className="text-white/80 max-w-md mx-auto mb-10 text-lg">
          4 Simple Steps to Complete Your Safe Transaction via OloBuy Deal Code
        </p>

        <div className="grid md:grid-cols-2 gap-6 text-left">
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <span className="text-[#ff9800] font-black text-xl">01</span>
            <h3 className="text-xl font-bold text-white mt-2 mb-2">Start Deal & Get Code</h3>
            <p className="text-white/70 text-sm">Select your role, enter details, and generate a secure deal code instantly.</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <span className="text-[#ff9800] font-black text-xl">02</span>
            <h3 className="text-xl font-bold text-white mt-2 mb-2">Secure Escrow Payment</h3>
            <p className="text-white/70 text-sm">Buyer transfers payment to OloBuy official account. We lock and hold it safely.</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <span className="text-[#ff9800] font-black text-xl">03</span>
            <h3 className="text-xl font-bold text-white mt-2 mb-2">Delivery & Inspection</h3>
            <p className="text-white/70 text-sm">Seller delivers the product or service. Buyer inspects and confirms satisfaction.</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-3xl p-6">
            <span className="text-[#ff9800] font-black text-xl">04</span>
            <h3 className="text-xl font-bold text-white mt-2 mb-2">Payment Released</h3>
            <p className="text-white/70 text-sm">Once approved, we instantly release funds to the seller safely and transparently.</p>
          </div>
        </div>
      </div>
    </section>
  );
} 

'use client';
import { useState } from 'react';
import { ChevronDown, MessageCircle, ShieldCheck, Star } from 'lucide-react';

export default function Hero() {
  const [role, setRole] = useState<"Buyer" | "Seller" | "Agent">("Buyer");
  const [product, setProduct] = useState("");
  const [amount, setAmount] = useState("");

  const getWhatsAppLink = () => {
    const message = `Assalamualaikum, I want to start a safe deal on OloBuy.\nRole: ${role}\nProduct: ${product || "Not specified"}\nAmount: Rs ${amount || "Not specified"}`;
    return `https://wa.me/923043031572?text=${encodeURIComponent(message)}`;
  };

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1a237e] to-[#0f172a] overflow-hidden px-4">
      <div className="absolute inset-0 bg-[radial-gradient(at_top,#ff9800_0%,transparent_60%)] opacity-10" />

      <div className="relative z-10 max-w-lg w-full text-center pt-8">
        {/* Trust Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 mb-6">
          <ShieldCheck className="h-5 w-5 text-[#25d366]" />
          <span className="text-sm font-bold tracking-widest text-white">100% SECURE TRANSACTIONS</span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl font-black leading-tight text-white mb-6">
          نہ ایڈوانس کا ڈر،<br />
          <span className="text-[#ff9800]">نہ پارسل کا فراڈ</span>
        </h1>

        <p className="text-white/80 text-lg mb-8">
          OloBuy — Pakistan کا سب سے بھروسہ مند Secure Manual Escrow Service
        </p>

        {/* Rating */}
        <div className="flex justify-center items-center gap-1 mb-10">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-5 w-5 text-[#ffd700] fill-current" />
          ))}
          <span className="ml-2 text-white font-semibold">4.9/5 • 9.5M+ Protected Deals</span>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8">
          <p className="uppercase text-xs tracking-widest font-bold text-gray-500 mb-6">
            Start Your Secure Deal
          </p>

          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-2">I am a</label>
              <div className="grid grid-cols-3 gap-2">
                {["Buyer", "Seller", "Agent"].map((r) => (
                  <button
                    key={r}
                    onClick={() => setRole(r as "Buyer" | "Seller" | "Agent")}
                    className={`py-3 rounded-2xl text-sm font-semibold transition-all ${
                      role === r 
                        ? 'bg-[#1a237e] text-white' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 mb-2">Product / Service</label>
              <input 
                type="text" 
                placeholder="e.g. iPhone 14, Gaming Account, Bike" 
                value={product} 
                onChange={(e) => setProduct(e.target.value)} 
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-[#ff9800] bg-gray-50" 
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 mb-2">Amount (Rs)</label>
              <input 
                type="number" 
                placeholder="5000" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 focus:border-[#ff9800] bg-gray-50" 
              />
            </div>
          </div>

          <a 
            href={getWhatsAppLink()} 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-8 block w-full bg-[#ff9800] hover:bg-[#ffb347] text-[#1a237e] font-black py-5 rounded-2xl text-lg transition-all active:scale-95 shadow-xl flex items-center justify-center gap-3"
          >
            <MessageCircle className="h-6 w-6" />
            Start Deal on WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
                 }

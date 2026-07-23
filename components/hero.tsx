'use client'
import { useState } from 'react'
import { MessageCircle, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'

export function Hero() {
  const [role, setRole] = useState("Buyer")
  const [product, setProduct] = useState("")
  const [amount, setAmount] = useState("")

  const getWhatsAppLink = () => {
    const message = `Assalamualaikum, I want to start a safe deal on OloBuy.\nRole: ${role}\nProduct: ${product || "Not specified"}\nAmount: Rs ${amount || "Not specified"}`
    return `https://wa.me/923043031572?text=${encodeURIComponent(message)}`
  }

  return (
    <section className="relative min-h-[90dvh] flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1a237e] to-[#0f172a] overflow-hidden px-4 pt-4 pb-12">
      <div className="absolute inset-0 bg-[radial-gradient(at_top,#ff9800_0%,transparent_60%)] opacity-10" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 max-w-lg w-full text-center"
      >
        {/* Trust Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 mb-3">
          <ShieldCheck className="h-4 w-4 text-[#25d366]" />
          <span className="text-xs sm:text-sm font-bold tracking-widest text-white">100% SECURE TRANSACTIONS</span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl sm:text-4xl font-black leading-tight text-white mb-5">
          نہ ایڈوانس کا ڈر<br />
          <span className="text-[#ff9800]">نہ پارسل کا فراڈ</span>
        </h1>

        {/* Form Card */}
        <div className="bg-white rounded-[2rem] shadow-2xl p-5 sm:p-7 text-left">
          <p className="uppercase text-center text-xs tracking-widest font-bold text-gray-500 mb-4">
            Start Your Secure Deal
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase">I am a</label>
              <div className="grid grid-cols-3 gap-2">
                {["Buyer", "Seller", "Agent"].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`py-2.5 rounded-2xl text-sm font-bold transition-all ${
                      role === r 
                        ? 'bg-[#1a237e] text-white shadow-md' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Product / Service</label>
              <input 
                type="text" 
                placeholder="e.g. Gaming Account, iPhone" 
                value={product} 
                onChange={(e) => setProduct(e.target.value)} 
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-[#ff9800] bg-gray-50 text-gray-900 font-semibold outline-none text-sm" 
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Amount (Rs)</label>
              <input 
                type="number" 
                placeholder="5000" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-[#ff9800] bg-gray-50 text-gray-900 font-semibold outline-none text-sm" 
              />
            </div>
          </div>

          <a 
            href={getWhatsAppLink()} 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-6 flex items-center justify-center gap-2 w-full bg-[#ff9800] text-[#1a237e] font-black py-3.5 rounded-2xl hover:bg-[#ffb347] transition-all transform hover:scale-[1.02] shadow-lg text-sm sm:text-base"
          >
            <MessageCircle className="h-5 w-5" />
            <span>Start Deal on WhatsApp</span>
          </a>
        </div>
      </motion.div>
    </section>
  )
              }

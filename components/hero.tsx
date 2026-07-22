'use client'
import { useState } from 'react'
import { ChevronDown, MessageCircle, ShieldCheck, Star } from 'lucide-react'

export function Hero() {
  const [role, setRole] = useState("Buyer")
  const [product, setProduct] = useState("")
  const [amount, setAmount] = useState("")

  const getWhatsAppLink = () => {
    const message = `Assalamualaikum, I want to start a safe deal on OloBuy.\nRole: ${role}\nProduct: ${product || "Not specified"}\nAmount: Rs ${amount || "Not specified"}`
    return `https://wa.me/923043031572?text=${encodeURIComponent(message)}`
  }

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1a237e] to-[#0f172a] overflow-hidden px-4 py-8">
      <div className="absolute inset-0 bg-[radial-gradient(at_top,#ff9800_0%,transparent_60%)] opacity-10" />

      <div className="relative z-10 max-w-lg w-full text-center pt-4">
        {/* Trust Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2 mb-4">
          <ShieldCheck className="h-5 w-5 text-[#25d366]" />
          <span className="text-sm font-bold tracking-widest text-white">100% SECURE TRANSACTIONS</span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl font-black leading-tight text-white mb-3">
          نہ ایڈوانس کا ڈر،<br />
          <span className="text-[#ff9800]">نہ پارسل کا فراڈ</span>
        </h1>

        <p className="text-white/80 text-sm sm:text-base mb-4">
          OloBuy — Pakistan کا سب سے بھروسہ مند Secure Manual Escrow Service
        </p>

        {/* Rating */}
        <div className="flex justify-center items-center gap-1 mb-6">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 text-[#ffd700] fill-current" />
          ))}
          <span className="ml-2 text-white text-xs sm:text-sm font-semibold">4.9/5 • Secure Escrow Network</span>
        </div>

        {/* Old Design Card with New Background */}
        <div className="w-full bg-white p-5 sm:p-7 rounded-[2rem] shadow-2xl text-left">
          <p className="text-center text-[#1a237e]/60 font-bold mb-4 text-[10px] uppercase tracking-widest">
            Secure Manual Escrow for Pakistan
          </p>
          
          <div className="space-y-4 mb-5">
            <div>
              <label className="text-[10px] font-bold text-gray-400 ml-1 uppercase">Select Role</label>
              <div className="relative mt-1">
                <select 
                  value={role} 
                  onChange={(e) => setRole(e.target.value)} 
                  className="w-full p-3.5 rounded-2xl border-2 border-[#ff9800] bg-gray-50 text-gray-900 font-bold appearance-none outline-none"
                >
                  <option>Buyer</option>
                  <option>Seller</option>
                  <option>Agent</option>
                </select>
                <ChevronDown className="absolute right-4 top-4 h-5 w-5 text-[#1a237e]" />
              </div>
            </div>
            
            <div>
              <label className="text-[10px] font-bold text-gray-400 ml-1 uppercase">Product Name</label>
              <input 
                type="text" 
                placeholder="e.g. Gaming Account" 
                value={product} 
                onChange={(e) => setProduct(e.target.value)} 
                className="w-full p-3.5 mt-1 rounded-2xl border border-gray-200 bg-gray-50 text-gray-900 font-semibold outline-none focus:border-[#ff9800]" 
              />
            </div>
            
            <div>
              <label className="text-[10px] font-bold text-gray-400 ml-1 uppercase">Amount (Rs)</label>
              <input 
                type="number" 
                placeholder="5000" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
                className="w-full p-3.5 mt-1 rounded-2xl border border-gray-200 bg-gray-50 text-gray-900 font-semibold outline-none focus:border-[#ff9800]" 
              />
            </div>
          </div>
          
          <a 
            href={getWhatsAppLink()} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center justify-center gap-2 w-full bg-[#ff9800] text-[#1a237e] font-black py-4 rounded-2xl hover:bg-[#ffb347] transition-all transform hover:scale-[1.02] shadow-lg text-base sm:text-lg"
          >
            <MessageCircle className="h-6 w-6" /> <span>Start deal on WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  )
              }

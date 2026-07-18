'use client'
import { useState } from 'react'
import { ChevronDown, MessageCircle, ShieldCheck } from 'lucide-react'

export function Hero() {
  const [role, setRole] = useState("Buyer")
  const [product, setProduct] = useState("")
  const [amount, setAmount] = useState("")

  const getWhatsAppLink = () => {
    const message = `Hi, I would like to start a deal. Role: ${role}, Product: ${product}, Amount: ${amount}`
    return `https://wa.me/923043031572?text=${encodeURIComponent(message)}`
  }

  return (
    <section id="top" className="relative overflow-hidden bg-[#1a237e] py-6 sm:py-16">
      <div className="mx-auto max-w-lg px-4">
        <div className="flex flex-col items-center text-center">
          
          {/* اردو ہیڈنگ */}
          <h1 className="mb-6 font-black text-2xl sm:text-4xl text-white">
            نہ ایڈوانس کا ڈر، <span className="text-[#ff9800]">نہ پارسل کا فراڈ</span>
          </h1>

          {/* اپ ڈیٹ شدہ ٹرسٹ بیج: گرین آئیکون اور ٹک */}
          <div className="w-full mb-4 flex items-center justify-center gap-2 bg-white/10 border border-white/20 text-white py-3 rounded-2xl">
            <ShieldCheck className="h-5 w-5 text-[#25d366]" />
            <span className="text-[11px] font-bold uppercase tracking-widest">100% Secure Transactions</span>
          </div>

          {/* کارڈ ڈیزائن */}
          <div className="w-full bg-white p-5 sm:p-6 rounded-[2rem] shadow-2xl text-left">
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
              className="flex items-center justify-center gap-2 w-full bg-[#ff9800] text-[#1a237e] font-black py-4 rounded-2xl hover:bg-[#ffb347] transition-all transform hover:scale-[1.02] shadow-lg"
            >
              <MessageCircle className="h-5 w-5" /> <span>Start deal on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
                  }

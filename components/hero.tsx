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
    <section id="top" className="relative overflow-hidden bg-[#1a237e] pt-4 pb-10 sm:pt-16">
      <div className="mx-auto max-w-5xl px-4">
        <div className="flex flex-col items-center text-center">
          
          <h1 className="mb-8 font-black text-2xl sm:text-5xl leading-tight">
            <span className="block text-white mb-1">نہ ایڈوانس کا ڈر</span>
            <span className="block text-[#ff9800]">نہ پارسل کا فراڈ</span>
          </h1>

          {/* کارڈ ڈیزائن: VIP اور کلین لُک */}
          <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] text-left">
            
            {/* پریمیم گرین ٹرسٹ بیج */}
            <div className="flex items-center justify-center gap-2 bg-[#25d366]/10 text-[#25d366] py-3 rounded-2xl mb-6 border border-[#25d366]/20">
              <ShieldCheck className="h-5 w-5" />
              <span className="text-xs font-black uppercase tracking-widest">100% Secure Transactions</span>
            </div>

            <p className="text-center text-[#1a237e] font-bold mb-6 text-[10px] sm:text-sm tracking-wide uppercase">
              Secure Manual Escrow for Pakistan
            </p>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="text-[10px] font-bold text-gray-400 ml-1 uppercase">Select Role</label>
                <div className="relative mt-1">
                  <select 
                    value={role} 
                    onChange={(e) => setRole(e.target.value)} 
                    className="w-full p-4 rounded-2xl border border-gray-100 bg-gray-50 text-gray-900 font-bold appearance-none focus:ring-2 focus:ring-[#ff9800] outline-none transition-all"
                  >
                    <option>Buyer</option>
                    <option>Seller</option>
                    <option>Agent</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-4 h-5 w-5 text-gray-400" />
                </div>
              </div>
              
              <div>
                <label className="text-[10px] font-bold text-gray-400 ml-1 uppercase">Product Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Gaming Account, Cloth" 
                  value={product} 
                  onChange={(e) => setProduct(e.target.value)} 
                  className="w-full p-4 mt-1 rounded-2xl border border-gray-100 bg-gray-50 text-gray-900 font-semibold focus:ring-2 focus:ring-[#ff9800] outline-none transition-all" 
                />
              </div>
              
              <div>
                <label className="text-[10px] font-bold text-gray-400 ml-1 uppercase">Amount (Rs)</label>
                <input 
                  type="number" 
                  placeholder="5000" 
                  value={amount} 
                  onChange={(e) => setAmount(e.target.value)} 
                  className="w-full p-4 mt-1 rounded-2xl border border-gray-100 bg-gray-50 text-gray-900 font-semibold focus:ring-2 focus:ring-[#ff9800] outline-none transition-all" 
                />
              </div>
            </div>
            
            <a 
              href={getWhatsAppLink()} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center gap-3 w-full bg-[#25d366] text-white font-black py-4 rounded-2xl hover:bg-[#128c7e] transition-all transform hover:scale-[1.02] shadow-[0_10px_20px_rgba(37,211,102,0.3)]"
            >
              <MessageCircle className="h-6 w-6" /> <span className="text-base">Start deal on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
          }

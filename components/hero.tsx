'use client'

import { useState } from 'react'
import { Copy, Check, ChevronDown, MessageCircle } from 'lucide-react'
import { WHATSAPP_URL } from '@/lib/constants'

export function Hero() {
  const [copied, setCopied] = useState(false)
  const [role, setRole] = useState("Buyer")
  const [product, setProduct] = useState("")
  const [amount, setAmount] = useState("")
  const referralLink = "https://olobuy.pk/deal/start"

  const getWhatsAppLink = () => {
    const baseUrl = WHATSAPP_URL.split('?')[0]
    const message = `Hi OloBuy! I'd like to start a Safe Deal (escrow).
    
Role: ${role}
Item: ${product}
Amount: Rs ${amount}`
    
    return `${baseUrl}?text=${encodeURIComponent(message)}`
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="top" className="relative overflow-hidden bg-[#1a237e] py-6 sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-center text-center">
          
          {/* اپڈیٹ شدہ ایک لائن ہیڈنگ اور 0% Fraud Risk */}
          <h1 dir="rtl" lang="ur" className="mb-8 font-urdu">
            <span className="block text-2xl sm:text-5xl font-bold text-white mb-2">
              نہ ایڈوانس کا ڈر، نہ پارسل کا فراڈ
            </span>
            <span className="inline-block bg-[#4caf50] text-white text-sm sm:text-xl font-bold px-4 py-1 rounded-full shadow-lg">
              0% Fraud Risk
            </span>
          </h1>

          <div className="w-full max-w-md bg-white p-5 rounded-3xl shadow-2xl mt-2 text-left">
            <h2 className="text-md font-bold text-[#1a237e] mb-4 text-center">
              Never buy or sell online without OloBuy in Pakistan
            </h2>
            
            <div className="space-y-3 mb-4">
              {/* فارم کے باقی حصے */}
              <div>
                <label className="text-xs font-bold text-gray-500 ml-1">Select Role</label>
                <div className="relative mt-1">
                  <select 
                    value={role} 
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full p-3 rounded-xl border border-gray-300 bg-white text-gray-900 font-bold appearance-none"
                  >
                    <option>Buyer</option>
                    <option>Seller</option>
                    <option>Olo Agent</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-4 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 ml-1">Product Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Mobile, Gaming Account" 
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  className="w-full p-3 mt-1 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 font-medium" 
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 ml-1">Amount</label>
                <div className="flex gap-2 mt-1">
                  <div className="flex items-center justify-center px-4 rounded-xl bg-gray-100 border border-gray-300 font-bold text-gray-600">Rs</div>
                  <input 
                    type="number" 
                    placeholder="50000" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full p-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 font-medium" 
                  />
                </div>
              </div>
            </div>

            {/* نیا گرین بٹن */}
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full bg-[#4caf50] text-white text-center font-bold py-4 rounded-xl hover:bg-green-600 transition-all text-md shadow-lg"
            >
              <MessageCircle className="h-5 w-5" />
              Start safe deal on WhatsApp
            </a>
          </div>

          {/* باقی کوڈ ویسے ہی ہے */}
          <div className="mt-4 w-full max-w-md rounded-2xl border border-white/10 bg-white/5 p-3">
            <p className="text-[9px] text-gray-400 uppercase tracking-widest mb-1 text-center">Quick Share Link</p>
            <div className="flex items-center gap-2">
              <span className="flex-1 text-xs text-white truncate font-mono text-center">{referralLink}</span>
              <button 
                onClick={handleCopy}
                className="flex items-center gap-2 rounded-xl bg-[#ff9800] px-3 py-1.5 text-xs font-bold text-[#1a237e] hover:bg-orange-400 transition-all shrink-0"
              >
                {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
                      }

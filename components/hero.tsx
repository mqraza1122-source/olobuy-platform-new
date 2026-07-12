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
          
          <h1 dir="rtl" lang="ur" className="mb-4 font-urdu leading-[2.0]">
            <span className="block text-3xl font-bold text-white sm:text-6xl">نہ ایڈوانس کا ڈر،</span>
            <span className="mt-1 block text-3xl font-bold text-[#ff9800] sm:text-6xl">نہ پارسل کا فراڈ!</span>
          </h1>

          <div className="w-full max-w-md bg-white p-5 rounded-3xl shadow-2xl mt-2 text-left">
            <h2 className="text-md font-bold text-[#1a237e] mb-4 text-center">
              Never buy or sell online without OloBuy in Pakistan
            </h2>
            
            <div className="space-y-3 mb-4">
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

            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full bg-[#ff9800] text-[#1a237e] font-bold py-4 rounded-xl hover:bg-orange-400 transition-all text-sm shadow-lg"
            >
              <span>Start safe online deal now</span>
              <MessageCircle className="h-5 w-5 shrink-0" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
            }

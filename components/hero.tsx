'use client'
import { useState } from 'react'
import { ChevronDown, MessageCircle } from 'lucide-react'
import { WHATSAPP_URL } from '@/lib/constants'

export function Hero() {
  const [role, setRole] = useState("Buyer")
  const [product, setProduct] = useState("")
  const [amount, setAmount] = useState("")

  return (
    <section id="top" className="relative overflow-hidden bg-[#1a237e] py-6 sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-center text-center">
          <h1 className="mb-8 font-bold leading-[1.6]">
            <span className="block text-3xl text-white sm:text-6xl">No Advance Fear,</span>
            <span className="mt-2 block text-3xl text-[#ff9800] sm:text-6xl">No Parcel Fraud!</span>
          </h1>
          <div className="w-full max-w-md bg-white p-5 rounded-3xl shadow-2xl text-left">
            <div className="space-y-3 mb-4">
              <div>
                <label className="text-xs font-bold text-gray-500 ml-1">Role</label>
                <div className="relative mt-1">
                  <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full p-3 rounded-xl border border-gray-300 bg-white text-gray-900 font-bold appearance-none">
                    <option>Buyer</option>
                    <option>Seller</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-4 h-5 w-5 text-gray-400" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 ml-1">Product</label>
                <input type="text" placeholder="Item Name" value={product} onChange={(e) => setProduct(e.target.value)} className="w-full p-3 mt-1 rounded-xl border border-gray-300 bg-white text-gray-900 font-medium" />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-500 ml-1">Amount</label>
                <input type="number" placeholder="Rs" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full p-3 mt-1 rounded-xl border border-gray-300 bg-white text-gray-900 font-medium" />
              </div>
            </div>
            <a href={`${WHATSAPP_URL}&text=Role: ${role}, Item: ${product}, Amount: ${amount}`} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-3 w-full bg-[#25D366] text-white font-bold py-4 rounded-xl hover:bg-[#20bd5a] transition-all text-sm shadow-lg">
              <MessageCircle className="h-5 w-5" /> <span>Start Deal</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
                    }

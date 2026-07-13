'use client'

import { useState } from 'react'
import { ChevronDown, MessageCircle } from 'lucide-react'

// Constants import ki jagah direct URL use kr rhy hain taake deployment error na ho
const WHATSAPP_URL = "https://wa.me/923000000000" // Yahan apna WhatsApp number likhen

export function Hero() {
  const [role, setRole] = useState("Buyer")
  const [product, setProduct] = useState("")
  const [amount, setAmount] = useState("")

  const getWhatsAppLink = () => {
    const message = `Hi OloBuy! I'd like to start a Safe Deal. Role: ${role}, Item: ${product}, Amount: Rs ${amount}`
    return `${WHATSAPP_URL}?text=${encodeURIComponent(message)}`
  }

  return (
    <section className="bg-[#1a237e] py-10">
      <div className="max-w-md mx-auto px-4 text-center">
        <h1 className="text-3xl font-bold text-white mb-6">
          نہ ایڈوانس کا ڈر، نہ پارسل کا فراڈ!
        </h1>

        <div className="bg-white p-6 rounded-3xl shadow-2xl text-left">
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-3 mb-3 rounded-xl border border-gray-300 font-bold"
          >
            <option>Buyer</option>
            <option>Seller</option>
          </select>

          <input 
            type="text" 
            placeholder="Product Name" 
            onChange={(e) => setProduct(e.target.value)}
            className="w-full p-3 mb-3 rounded-xl border border-gray-300"
          />

          <input 
            type="number" 
            placeholder="Amount" 
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-3 mb-4 rounded-xl border border-gray-300"
          />

          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full bg-[#ff9800] text-[#1a237e] font-bold py-4 rounded-xl"
          >
            Start safe online deal now
            <MessageCircle size={20} />
          </a>
        </div>
      </div>
    </section>
  )
}

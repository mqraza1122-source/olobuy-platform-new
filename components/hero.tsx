'use client'

import { useState } from 'react'
import { Lock, Star, ShieldCheck, Copy, Check, ChevronDown } from 'lucide-react'
import { WHATSAPP_URL } from '@/lib/constants'

export function Hero() {
  const [copied, setCopied] = useState(false)
  const referralLink = "https://olobuy.pk/deal/start"

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="top" className="relative overflow-hidden bg-[#1a237e]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-20">
        <div className="flex flex-col items-center text-center">
          
          <h1 dir="rtl" lang="ur" className="mb-6 font-urdu leading-[2.5]">
            <span className="block text-4xl font-bold text-white sm:text-6xl">نہ ایڈوانس کا ڈر،</span>
            <span className="mt-2 block text-4xl font-bold text-[#ff9800] sm:text-6xl">نہ پارسل کا فراڈ!</span>
          </h1>

          {/* ESCROW STYLE INTEGRATED CARD */}
          <div className="w-full max-w-xl bg-white p-6 rounded-3xl shadow-2xl mt-4">
            <h2 className="text-xl font-bold text-[#1a237e] mb-6">
              Never buy or sell online without OloBuy
            </h2>
            
            <div className="space-y-4 mb-8">
              <div className="relative">
                <select className="w-full p-4 rounded-xl border border-gray-300 bg-gray-50 text-gray-700 font-bold appearance-none">
                  <option>I'm Selling</option>
                  <option>I'm Buying</option>
                </select>
                <ChevronDown className="absolute right-4 top-5 h-5 w-5 text-gray-400" />
              </div>

              <input type="text" placeholder="What are you dealing? (e.g. Mobile, Freelance)" className="w-full p-4 rounded-xl border border-gray-300 bg-gray-50" />

              <div className="flex gap-2">
                <span className="p-4 rounded-xl bg-gray-100 border border-gray-300 font-bold text-gray-500">Rs</span>
                <input type="number" placeholder="Amount" className="flex-1 p-4 rounded-xl border border-gray-300 bg-gray-50" />
              </div>
            </div>

            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-[#ff9800] text-[#1a237e] text-center font-bold py-4 rounded-xl hover:bg-orange-400 transition-all text-lg shadow-lg"
            >
              Get started now
            </a>
          </div>

          {/* Quick Share Link Section */}
          <div className="mt-8 w-full max-w-xl rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-2 text-center">Quick Share Link</p>
            <div className="flex items-center gap-2">
              <span className="flex-1 text-sm text-white truncate font-mono text-center">{referralLink}</span>
              <button 
                onClick={handleCopy}
                className="flex items-center gap-2 rounded-xl bg-[#ff9800] px-4 py-2 text-sm font-bold text-[#1a237e] hover:bg-orange-400 transition-all shrink-0"
              >
                {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                {copied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-center gap-2">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-[#ff9800] text-[#ff9800]" />
              ))}
            </div>
            <p className="text-sm font-medium text-gray-300">Trusted by thousands of buyers, sellers & freelancers</p>
          </div>
        </div>
      </div>
    </section>
  )
}

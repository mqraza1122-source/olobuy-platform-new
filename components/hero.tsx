'use client'

import { useState } from 'react'
import { ArrowRight, Lock, Star, ShieldCheck, Copy, Check } from 'lucide-react'
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
          
          {/* Badge Section */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#ff9800] px-5 py-2 shadow-lg">
              <Lock className="h-4 w-4 text-[#1a237e]" />
              <span className="text-sm font-bold text-[#1a237e]">
                Pakistan&apos;s first manual escrow
              </span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-2 shadow-lg">
              <ShieldCheck className="h-4 w-4 text-green-600" />
              <span className="text-sm font-bold text-green-700">
                0% Fraud Risk
              </span>
            </div>
          </div>

          <h1 dir="rtl" lang="ur" className="mt-2 font-urdu leading-[2.5]">
            <span className="block text-4xl font-bold text-white sm:text-6xl">
              نہ ایڈوانس کا ڈر،
            </span>
            <span className="mt-4 block text-4xl font-bold text-[#ff9800] sm:text-6xl">
              نہ پارسل کا فراڈ!
            </span>
          </h1>

          <p className="mt-8 max-w-2xl text-pretty text-lg leading-relaxed text-gray-200 sm:text-xl">
            Stop risking money on marketplace deals or freelance services. {' '}
            <span className="font-bold text-white">
              OloBuy holds your payment securely
            </span>{' '}
            for physical items, digital products, and freelance work until you approve it.
          </p>

          <div className="mt-10 w-full max-w-xl px-2 flex flex-col items-center">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-16 w-full items-center justify-center gap-3 rounded-2xl bg-[#ff9800] px-8 text-xl font-bold text-[#1a237e] shadow-lg transition-all hover:bg-orange-400 active:scale-95"
            >
              Start a Safe Deal
              <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
            </a>
            <p className="mt-3 mb-6 text-xs font-medium text-gray-400 uppercase tracking-widest">
              No signup required • Instant WhatsApp chat
            </p>

            {/* Quick Copy Link Box */}
            <div className="w-full rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest mb-2 text-left">Quick Share Link</p>
              <div className="flex items-center gap-2">
                <span className="flex-1 text-sm text-white truncate font-mono text-left">{referralLink}</span>
                <button 
                  onClick={handleCopy}
                  className="flex items-center gap-2 rounded-xl bg-[#ff9800] px-4 py-2 text-sm font-bold text-[#1a237e] hover:bg-orange-400 transition-all shrink-0"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center gap-2">
            <div className="flex items-center gap-1" aria-label="Rated 5 out of 5 stars">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-6 w-6 fill-[#ff9800] text-[#ff9800]" />
              ))}
            </div>
            <p className="text-sm font-medium text-gray-300">
              Trusted by thousands of buyers, sellers & freelancers
            </p>
          </div>
        </div>
      </div>
    </section>
  )
      }

'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Why OloBuy', href: '#why' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const WHATSAPP_NUMBER = "923043031572" // Fix: Directly defined here

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        
        <a href="#top" className="flex flex-col group">
          <div className="flex items-center text-3xl font-extrabold tracking-tight">
            <span className="text-[#ff9800]">Olo</span>
            <span className="text-[#1a237e]">Buy</span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400 group-hover:text-[#1a237e] transition-colors">
            Original Life, Original Buy
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-bold text-[#1a237e] transition-colors hover:text-[#ff9800]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-12 items-center rounded-xl bg-[#ff9800] px-6 text-sm font-bold text-white transition-all hover:bg-orange-600 sm:inline-flex"
          >
            Start Safe Deal
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-gray-200 text-[#1a237e] md:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="absolute left-0 w-full border-b border-gray-100 bg-white shadow-xl md:hidden">
          <nav className="flex flex-col px-4 py-6 gap-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex h-14 items-center rounded-xl px-4 text-base font-bold text-[#1a237e] hover:bg-gray-50"
              >
                {link.label}
              </a>
            ))}
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex h-14 w-full items-center justify-center rounded-xl bg-[#ff9800] text-base font-bold text-white"
            >
              Start Safe Deal
            </a>
          </nav>
        </div>
      )}
    </header>
  )
            }

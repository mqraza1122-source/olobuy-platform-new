'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { WHATSAPP_URL } from '@/lib/constants'

const NAV_LINKS = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Why OloBuy', href: '#why' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQ', href: '#faq' },
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#1a237e]/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a href="#top" className="flex items-center gap-2.5 leading-none">
          <Image
            src="/logos/olobuy.png"
            alt="OloBuy logo"
            width={112}
            height={56}
            className="h-10 w-auto"
            priority
          />
          <span className="hidden text-xs font-medium text-gray-300 sm:block">
            Original Life,
            <br />
            Original Buy
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/80 transition-colors hover:text-[#ff9800]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-lg bg-[#ff9800] px-5 py-2.5 text-sm font-bold text-[#1a237e] transition-colors hover:bg-orange-400 sm:inline-flex"
          >
            Start Safe Deal
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 text-white md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-[#1a237e] md:hidden">
          <nav className="mx-auto flex max-w-6xl flex-col px-4 py-2 sm:px-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-3 text-base font-medium text-white/80 hover:bg-[#283593] hover:text-[#ff9800]"
              >
                {link.label}
              </a>
            ))}
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 mb-2 rounded-lg bg-[#ff9800] px-5 py-3 text-center text-base font-bold text-[#1a237e]"
            >
              Start Safe Deal
            </a>
          </nav>
        </div>
      )}
    </header>
  )
      }

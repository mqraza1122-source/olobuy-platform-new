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
  const WHATSAPP_URL = "https://wa.me/923043031572"

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <a href="#top" className="flex flex-col group">
          <div className="flex items-center text-3xl font-extrabold tracking-tight">
            <span className="text-[#ff9800]">Olo</span><span className="text-[#1a237e]">Buy</span>
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400 group-hover:text-[#1a237e] transition-colors">Original Life, Original Buy</span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (<a key={link.href} href={link.href} className="text-sm font-bold text-[#1a237e] hover:text-[#ff9800]">{link.label}</a>))}
        </nav>
        <button onClick={() => setOpen(!open)} className="md:hidden p-3"><Menu className="h-7 w-7" /></button>
      </div>
      {open && (
        <div className="absolute w-full bg-white border-b p-4 md:hidden">
          {NAV_LINKS.map((link) => (<a key={link.href} href={link.href} onClick={() => setOpen(false)} className="block py-3 font-bold text-[#1a237e]">{link.label}</a>))}
        </div>
      )}
    </header>
  )
}

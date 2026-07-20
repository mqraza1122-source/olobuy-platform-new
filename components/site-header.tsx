'use client'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Why OloBuy', href: '#why' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'FAQs', href: '#faq' },
  { label: 'About Us', href: '#about' },
  { label: 'Contact Us', href: '#contact' }
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        
        {/* یہاں ٹیکسٹ ہٹا کر پرفیکٹ لوگو امیج لگا دی گئی ہے */}
        <a href="#" className="flex items-center">
          <img 
            src="/logo.jpg" 
            alt="OloBuy Logo" 
            className="h-10 w-auto object-contain"
          />
        </a>
        
        <button 
          onClick={() => setOpen(!open)} 
          className="p-2 border border-gray-200 rounded-xl"
        >
          {open ? <X className="h-7 w-7 text-[#1a237e]" /> : <Menu className="h-7 w-7 text-[#1a237e]" />}
        </button>
      </div>
      
      {open && (
        <div className="absolute w-full bg-white border-b p-4 shadow-lg animate-in slide-in-from-top-2">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.href} 
              href={link.href} 
              onClick={() => setOpen(false)} 
              className="block py-4 font-bold text-[#1a237e] border-b border-gray-100"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
              }

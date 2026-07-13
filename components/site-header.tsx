'use client'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const WHATSAPP_LINK = "https://wa.me/923043031572"

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <a href="#top" className="flex flex-col">
          <div className="flex items-center text-3xl font-extrabold"><span className="text-[#ff9800]">Olo</span><span className="text-[#1a237e]">Buy</span></div>
        </a>
        <div className="flex items-center gap-4">
          <a href={WHATSAPP_LINK} target="_blank" className="hidden sm:flex bg-[#ff9800] px-6 py-2 rounded-xl text-white font-bold">Start Safe Deal</a>
          <button onClick={() => setOpen(!open)} className="md:hidden"><Menu className="h-7 w-7" /></button>
        </div>
      </div>
    </header>
  )
}

'use client'
import { useState } from 'react'
import { Menu, X, ShieldCheck, MessageCircle, Phone, Info } from 'lucide-react'

const NAV_LINKS = [
  { label: 'How It Works', href: '#how-it-works', type: 'scroll' },
  { label: 'Why OloBuy', href: '#why', type: 'scroll' },
  { label: 'Reviews', href: '#reviews', type: 'scroll' },
  { label: 'FAQs', href: '#faq', type: 'scroll' },
  { label: 'About Us', href: 'about', type: 'modal' },
  { label: 'Contact Us', href: 'contact', type: 'modal' }
]

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const [modalContent, setModalContent] = useState<null | 'about' | 'contact'>(null)

  const handleLinkClick = (link: typeof NAV_LINKS[0]) => {
    setOpen(false)
    if (link.type === 'modal') {
      setModalContent(link.href as 'about' | 'contact')
    }
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex flex-col">
            <div className="flex items-center text-3xl font-extrabold tracking-tight">
              <span className="text-[#fcc21b]">Olo</span>
              <span className="text-[#1a237e]">Buy</span>
            </div>
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">
              Original Life, Original Buy
            </p>
          </div>
          
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
              link.type === 'scroll' ? (
                <a 
                  key={link.href} 
                  href={link.href} 
                  onClick={() => setOpen(false)} 
                  className="block py-4 font-bold text-[#1a237e] border-b border-gray-100"
                >
                  {link.label}
                </a>
              ) : (
                <button
                  key={link.href}
                  onClick={() => handleLinkClick(link)}
                  className="w-full text-left block py-4 font-bold text-[#1a237e] border-b border-gray-100"
                >
                  {link.label}
                </button>
              )
            ))}
          </div>
        )}
      </header>

      {/* Popup Modal for About Us & Contact Us */}
      {modalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white w-full max-w-md rounded-[2rem] p-6 shadow-2xl relative border border-gray-100">
            
            {/* Close Button */}
            <button 
              onClick={() => setModalContent(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>

            {modalContent === 'about' ? (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-[#1a237e]/10 rounded-2xl text-[#1a237e]">
                    <Info className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-black text-[#1a237e]">About OloBuy</h3>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm mb-6">
                  OloBuy.pk is Pakistan's most trusted manual escrow platform designed to eliminate online shopping frauds and advance payment risks. We securely hold funds until the buyer safely receives and inspects their product or service.
                </p>
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-xs text-gray-500 font-medium">
                  Original Life, Original Buy — Secure transactions for everyone across Pakistan.
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-[#ff9800]/20 rounded-2xl text-[#1a237e]">
                    <Phone className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-black text-[#1a237e]">Contact Us</h3>
                </div>
                <p className="text-gray-600 leading-relaxed text-sm mb-4">
                  Have questions or want to initiate a secure deal directly? Reach out to us anytime on WhatsApp:
                </p>
                <a 
                  href="https://wa.me/923043031572" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-[#25d366] text-white font-bold py-3.5 rounded-2xl shadow-lg hover:bg-[#20ba5a] transition-all mb-4 text-sm"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>+92 304 3031572</span>
                </a>
                <div className="text-center text-xs text-gray-400 font-semibold">
                  Available 24/7 for support & safe deals verification.
                </div>
              </div>
            )}

            <button 
              onClick={() => setModalContent(null)}
              className="mt-6 w-full py-3 rounded-2xl bg-gray-100 font-bold text-gray-700 hover:bg-gray-200 transition-colors text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  )
                 }

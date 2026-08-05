'use client';
import { useState, useEffect } from 'react';
import { Menu, X, MessageCircle, Info, Phone } from 'lucide-react';

const NAV_LINKS = [
  { label: 'How It Works', href: '#how-it-works', type: 'scroll' },
  { label: 'Why OloBuy', href: '#why', type: 'scroll' },
  { label: 'Reviews', href: '#reviews', type: 'scroll' },
  { label: 'FAQs', href: '#faq', type: 'scroll' },
  { label: 'About Us', href: 'about', type: 'modal' },
  { label: 'Contact Us', href: 'contact', type: 'modal' },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState<null | 'about' | 'contact'>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (link: (typeof NAV_LINKS)[0]) => {
    setOpen(false);
    if (link.type === 'modal') {
      setModalContent(link.href as 'about' | 'contact');
    }
  };

  return (
    <>

      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? 'bg-white border-b border-gray-200 shadow-[0_4px_20px_rgba(0,0,0,0.06)]'
            : 'bg-white border-b border-gray-100 shadow-sm'
        }`}
      >
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
          
          {/* Perfect Logo – Solid white matching */}
          <a href="#" className="flex items-center shrink-0 group">
            <img
              src="/logo.jpg"
              alt="OloBuy"
              className="h-11 sm:h-12 w-auto object-contain mix-blend-multiply brightness-105 contrast-105 transition-transform duration-200 group-hover:scale-[1.04]"
            />
          </a>

          {/* Desktop & Action Section */}
          <div className="flex items-center gap-3">
            <a
              href="https://wa.me/923043031572"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-2 bg-[#25d366]/10 hover:bg-[#25d366]/20 border border-[#25d366]/30 text-[#128c7e] font-bold px-4 py-2 rounded-xl text-xs transition-all shadow-sm"
            >
              <MessageCircle className="h-4 w-4 text-[#25d366]" />
              <span>Support</span>
            </a>

            {/* Menu Toggle Button */}
            <button
              onClick={() => setOpen(!open)}
              className="p-2.5 bg-gray-100 hover:bg-gray-200/80 border border-gray-200 rounded-2xl text-gray-800 transition-colors cursor-pointer"
              aria-label="Toggle Menu"
            >
              {open ? <X className="h-6 w-6 text-[#ff9800]" /> : <Menu className="h-6 w-6 text-[#1A237E]" />}
            </button>
          </div>
        </div>
        {/* Mobile Dropdown Menu */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-out bg-white/95 backdrop-blur-2xl border-b border-gray-200 shadow-xl ${
            open ? 'max-h-[450px] opacity-100 py-4 px-6' : 'max-h-0 opacity-0 py-0 px-6'
          }`}
        >
          <div className="space-y-2 max-w-xl mx-auto">
            {NAV_LINKS.map((link) =>
              link.type === 'scroll' ? (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block py-3 px-4 rounded-xl font-bold text-gray-700 hover:text-[#1A237E] hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all text-base"
                >
                  {link.label}
                </a>
              ) : (
                <button
                  key={link.href}
                  onClick={() => handleLinkClick(link)}
                  className="w-full text-left block py-3 px-4 rounded-xl font-bold text-gray-700 hover:text-[#1A237E] hover:bg-gray-50 border border-transparent hover:border-gray-200 transition-all text-base cursor-pointer"
                >
                  {link.label}
                </button>
              )
            )}
            
            <div className="pt-2 border-t border-gray-100 flex sm:hidden">
              <a
                href="https://wa.me/923043031572"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-[#25d366] text-white font-bold py-3 rounded-xl text-sm shadow-md"
              >
                <MessageCircle className="h-5 w-5" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Popup Modal for About Us & Contact Us */}
      {modalContent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div className="bg-[#111827] border border-[#ff9800]/35 w-full max-w-md rounded-3xl p-6 sm:p-8 relative shadow-[0_20px_50px_rgba(0,0,0,0.75)]">
            
            <button
              onClick={() => setModalContent(null)}
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            {modalContent === 'about' ? (
              <div>
                <div className="flex items-center gap-3 mb-4 pr-10">
                  <div className="p-3 bg-[#ff9800]/15 border border-[#ff9800]/30 rounded-2xl text-[#ff9800]">
                    <Info className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-black text-white">About OloBuy</h3>
                </div>
                <p className="text-white/80 leading-relaxed text-sm mb-6">
                  OloBuy.pk is Pakistan&apos;s most trusted manual escrow platform designed to eliminate online shopping frauds and advance payment risks. We securely hold funds until the buyer safely receives and inspects their product or service.
                </p>
                <div className="bg-white/5 p-4 rounded-2xl border border-white/10 text-xs text-white/60 font-medium">
                  Original Life, Original Buy — Secure transactions for everyone across Pakistan.
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-3 mb-4 pr-10">
                  <div className="p-3 bg-[#25d366]/15 border border-[#25d366]/30 rounded-2xl text-[#25d366]">
                    <Phone className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-black text-white">Contact Us</h3>
                </div>
                <p className="text-white/80 leading-relaxed text-sm mb-4">
                  Have questions or want to initiate a secure deal directly? Reach out to us anytime on WhatsApp:
                </p>
                <a
                  href="https://wa.me/923043031572"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full bg-[#25d366] text-white font-bold py-3.5 rounded-2xl shadow-[0_4px_20px_rgba(37,211,102,0.35)] hover:bg-[#20ba5a] transition-all mb-4 text-sm"
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>+92 304 3031572</span>
                </a>
                <div className="text-center text-xs text-white/40 font-semibold">
                  Available 24/7 for support & safe deals verification.
                </div>
              </div>
            )}

            <button
              onClick={() => setModalContent(null)}
              className="mt-6 w-full py-3.5 rounded-2xl bg-white/10 hover:bg-white/15 font-bold text-white transition-colors text-sm cursor-pointer border border-white/10"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
                        }

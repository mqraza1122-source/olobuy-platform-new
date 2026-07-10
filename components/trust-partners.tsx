import Image from 'next/image'
import { Building2 } from 'lucide-react'

const COMPLIANCE = [
  { src: '/logos/sbp.png', name: 'State Bank of Pakistan', note: 'Compliant' },
  { src: '/logos/fbr.jpeg', name: 'Federal Board of Revenue', note: 'Registered' },
  { src: '/logos/secp.jpeg', name: 'Securities & Exchange Commission', note: 'Verified' },
]

const PAYMENTS = [
  { src: '/logos/jazzcash.jpeg', name: 'JazzCash', note: 'Mobile Wallet' },
  { src: '/logos/easypaisa.jpeg', name: 'Easypaisa', note: 'Mobile Wallet' },
  { name: 'Bank Transfer', note: 'All Banks', icon: Building2 },
]

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-[#ff9800]">
      {children}
    </p>
  )
}

export function TrustPartners() {
  return (
    <section className="bg-[#1a237e]">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        <SectionHeading>Trusted &amp; Compliant</SectionHeading>
        
        {/* Professional Trust Line */}
        <p className="mt-4 text-center text-[11px] font-medium text-gray-300 opacity-80 leading-relaxed max-w-lg mx-auto">
          OloBuy is legally registered and strictly follows local financial safety regulations to ensure secure transactions.
        </p>

        <div className="mt-8 grid grid-cols-3 gap-4">
          {COMPLIANCE.map((item) => (
            <div
              key={item.name}
              className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white p-4 shadow-sm"
            >
              <div className="relative h-12 w-12 sm:h-16 sm:w-16">
                <Image
                  src={item.src || "/placeholder.svg"}
                  alt={`${item.name} logo`}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="mt-3 text-[10px] font-black uppercase tracking-widest text-[#ff9800]">
                {item.note}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-16">
          <SectionHeading>Payment Partners</SectionHeading>
          <div className="mt-8 grid grid-cols-3 gap-4">
            {PAYMENTS.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.name}
                  className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white p-4 shadow-sm"
                >
                  <div className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center">
                    {Icon ? (
                      <Icon className="h-8 w-8 text-[#1a237e]" strokeWidth={2} />
                    ) : (
                      <div className="relative h-full w-full">
                        <Image
                          src={item.src || "/placeholder.svg"}
                          alt={`${item.name} logo`}
                          fill
                          className="object-contain"
                        />
                      </div>
                    )}
                  </div>
                  <span className="mt-2 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    {item.note}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
                          }

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
    <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-gray-300">
      {children}
    </p>
  )
}

export function TrustPartners() {
  return (
    <section className="bg-[#1a237e]">
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
        <SectionHeading>Trusted &amp; Compliant</SectionHeading>
        <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-5">
          {COMPLIANCE.map((item) => (
            <div
              key={item.name}
              className="flex h-32 flex-col items-center justify-center rounded-2xl border border-white/10 bg-white p-4 text-center shadow-sm"
            >
              <div className="relative h-12 w-full">
                <Image
                  src={item.src || "/placeholder.svg"}
                  alt={`${item.name} logo`}
                  fill
                  sizes="120px"
                  className="object-contain"
                />
              </div>
              <span className="mt-2 text-[10px] font-semibold uppercase tracking-wide text-[#ff9800]">
                {item.note}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-14">
          <SectionHeading>Payment Partners</SectionHeading>
          <div className="mt-6 grid grid-cols-3 gap-3 sm:gap-5">
            {PAYMENTS.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.name}
                  className="flex h-32 flex-col items-center justify-center gap-1.5 rounded-2xl border border-white/10 bg-white p-4 text-center shadow-sm"
                >
                  {Icon ? (
                    <>
                      <Icon className="h-9 w-9 text-[#1a237e]" strokeWidth={1.75} />
                      <span className="text-[10px] font-bold text-[#1a237e]">{item.name}</span>
                    </>
                  ) : (
                    <div className="relative h-12 w-full">
                      <Image
                        src={item.src || "/placeholder.svg"}
                        alt={`${item.name} logo`}
                        fill
                        sizes="120px"
                        className="object-contain"
                      />
                    </div>
                  )}
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-gray-500">
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

import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Noto_Nastaliq_Urdu } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' })
const notoUrdu = Noto_Nastaliq_Urdu({ subsets: ['arabic'], weight: ['400', '700'], variable: '--font-noto-urdu', display: 'swap' })

export const metadata: Metadata = {
  title: "OloBuy | Pakistan's #1 Secure Manual Escrow Service",
  description: "Stop online parcel fraud in Pakistan. OloBuy securely holds your payment until you inspect and approve your items. The safest way to trade on Facebook & OLX.",
  keywords: ["OloBuy", "Olo Research Institute", "Escrow Pakistan", "Safe Online Shopping", "Anti-Fraud Service", "Parcel Security Pakistan"],
  authors: [{ name: "Olo Research Institute" }],
  metadataBase: new URL('https://olobuy.pk'),
  alternates: { canonical: '/' },
  openGraph: {
    title: "OloBuy | Pakistan's #1 Secure Manual Escrow Service",
    description: "No advance payment fear, no parcel fraud. OloBuy provides secure manual escrow for Pakistani buyers and sellers.",
    url: 'https://olobuy.pk',
    siteName: 'OloBuy',
    locale: 'en_PK',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#1a237e',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${notoUrdu.variable} bg-[#1a237e]`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "OloBuy",
              "url": "https://olobuy.pk",
              "description": "Pakistan's premier secure manual escrow platform for safe online transactions.",
              "brand": "Olo Research Institute"
            }),
          }}
        />
      </head>
      <body className="font-sans antialiased text-white">
        {children}
        <Analytics />
      </body>
    </html>
  )
}

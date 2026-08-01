import type { Metadata, Viewport } from 'next'
import { Inter, Noto_Nastaliq_Urdu } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const notoUrdu = Noto_Nastaliq_Urdu({
  subsets: ['arabic'],
  weight: ['400', '700'],
  variable: '--font-noto-urdu',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://olobuy.pk'),
  title: {
    default: "O1OBUY Pakistan's #1 Secure Escrow Service | Safe online escrow",
    template: "%s | OloBuy Pakistan"
  },
  description: "Protect yourself from parcel fraud in Pakistan. OloBuy secure manual escrow protects buyers and sellers with instant verification.",
  keywords: [
    "OloBuy",
    "Olo Research Institute",
    "Escrow Pakistan",
    "Secure Escrow Service Pakistan",
    "Safe Online Shopping Pakistan",
    "OLX Safe Payment",
    "Facebook Marketplace Escrow",
    "Parcel Fraud Protection",
    "Anti Scam Service Pakistan",
    "Secure Manual Escrow",
    "Buy Sell Safely Pakistan",
    "No Advance Payment Scam",
    "OLX Parcel Security",
    "Online Fraud Protection Pakistan",
    "Trusted Escrow Platform PK",
    "Pakistan's #1 Escrow Service",
    "OLX Escrow",
    "Daraz Safe Payment",
    "Safe Transaction Pakistan",
    "Online Scam Protection Pakistan"
  ],
  authors: [{ name: "Olo Research Institute" }],
  alternates: {
    canonical: 'https://olobuy.pk'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: "O1OBUY Pakistan's #1 Secure Escrow Service",
    description: "Stop parcel fraud and online scams. Secure manual escrow service for buyers and sellers across Pakistan.",
    url: 'https://olobuy.pk',
    siteName: 'OloBuy',
    locale: 'en_PK',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${notoUrdu.variable}`}>
      <body className="font-sans bg-[#0b0f19] text-white antialiased">
        {children}
      </body>
    </html>
  )
    }

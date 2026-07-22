import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Inter, Noto_Nastaliq_Urdu } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter', 
  display: 'swap' 
})

const notoUrdu = Noto_Nastaliq_Urdu({ 
  subsets: ['arabic'], 
  weight: ['400', '700'], 
  variable: '--font-noto-urdu', 
  display: 'swap' 
})

export const metadata: Metadata = {
  metadataBase: new URL('https://olobuy.pk'),
  title: {
    default: "OloBuy - Pakistan's #1 Secure Escrow Service | Safe OLX & Facebook Deals",
    template: "%s | OloBuy Pakistan"
  },
  description: "Protect yourself from parcel fraud in Pakistan. OloBuy securely holds your payment until you inspect and approve the item. Safest way to buy and sell on OLX, Facebook Marketplace & Daraz without scams.",
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
    title: "OloBuy - Pakistan's #1 Secure Escrow Service",
    description: "Stop parcel fraud & online scams. Secure manual escrow for safe buying and selling on OLX, Facebook & Daraz in Pakistan.",
    url: 'https://olobuy.pk',
    siteName: 'OloBuy',
    locale: 'en_PK',
    type: 'website',
    images: [
      {
        url: 'https://olobuy.pk/og-image.jpg', // Change this after uploading your image
        width: 1200,
        height: 630,
        alt: 'OloBuy Secure Escrow Pakistan',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "OloBuy - Secure Escrow Pakistan",
    description: "Safe payments for OLX & Facebook deals. No more parcel scams.",
    images: ['https://olobuy.pk/og-image.jpg'],
  },
}

export const viewport: Viewport = {
  themeColor: '#1a237e',
}

export default function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
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
              "logo": "https://olobuy.pk/logo.png",
              "description": "Pakistan's premier secure manual escrow service for safe online transactions on OLX, Facebook Marketplace and Daraz.",
              "brand": "Olo Research Institute",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "PK"
              }
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

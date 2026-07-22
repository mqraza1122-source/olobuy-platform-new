'use client'
import SiteHeader from '@/components/site-header';
import Hero from '@/components/hero';
import TrustPartners from '@/components/trust-partners';
import Features from '@/components/features';
import HowItWorks from '@/components/how-it-works';
import Testimonials from '@/components/testimonials';
import FAQ from '@/components/faq';
import AboutContact from '@/components/aboutcontact';
import CTABanner from '@/components/cta-banner';
import Footer from '@/components/footer';
import WhatsAppFloat from '@/components/whatsapp-float';

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0f172a] overflow-hidden">
      {/* Header */}
      <SiteHeader />

      {/* Main Content */}
      <main className="flex-1">
        <Hero />
        <TrustPartners />
        <Features />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <AboutContact />
        <CTABanner />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp */}
      <WhatsAppFloat />
    </div>
  );
}

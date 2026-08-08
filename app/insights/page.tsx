import Link from 'next/link';
import { SiteHeader } from '@/components/site-header';
import { CtaFooter } from '@/components/cta-footer';
import { WhatsAppFloat } from '@/components/whatsapp-float';
import { ShieldCheck, BookOpen, TrendingUp, Building2, Globe } from 'lucide-react';

export default function OloBuyInsightsMain() {
  const categories = [
    {
      title: "OloBuy Research Institute",
      desc: "ڈیٹا، آن لائن فراڈ سے بچاؤ اور پاکستان میں محفوظ ای کامرس کی ریسرچ رپورٹس۔",
      slug: "research-institute",
      badge: "Research & Security",
      icon: ShieldCheck
    },
    {
      title: "Entrepreneurship News",
      desc: "پاکستان میں نئے اسٹارٹ اپس، ڈیجیٹل بزنس اور گروتھ کے لیے ماسٹر گائیڈز۔",
      slug: "entrepreneurship",
      badge: "Startups & Growth",
      icon: TrendingUp
    },
    {
      title: "Business News",
      desc: "کاروباری دنیا کی تازہ ترین اپڈیٹس، سکیور ٹرانزیکشنز اور ٹریড سٹریٹجیز۔",
      slug: "business",
      badge: "Corporate Business",
      icon: Building2
    },
    {
      title: "Trade News",
      desc: "لوکل اور انٹرسیٹی (Inter-city) بائيئنگ اینڈ سیلنگ کی مارکیٹ رپورٹس۔",
      slug: "trade",
      badge: "Local & Safe Trade",
      icon: Globe
    }
  ];

  return (
    <div className="flex min-h-dvh flex-col bg-[#0b132b]">
      <SiteHeader />
      
      <main className="flex-1 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          {/* SEO Optimized Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#ff9f1c]/10 px-4 py-1.5 mb-4 border border-[#ff9f1c]/20">
              <BookOpen className="h-4 w-4 text-[#ff9f1c]" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#ff9f1c]">
                OloBuy Knowledge & Research Hub
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">
              OloBuy Insights & Security Guides
            </h1>
            <p className="text-slate-300 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              Pakistan's ultimate centralized hub for safe online trading insights, escrow market standards, and entrepreneurial success.
            </p>
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((cat, idx) => {
              const IconComponent = cat.icon;
              return (
                <Link 
                  key={idx} 
                  href={`/blog?category=${cat.slug}`}
                  className="bg-slate-900 border border-slate-800 hover:border-[#ff9f1c]/50 p-6 md:p-8 rounded-[28px] transition-all group flex flex-col justify-between shadow-lg hover:shadow-2xl relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#ff9f1c]/5 rounded-bl-full pointer-events-none transition-all group-hover:bg-[#ff9f1c]/10" />
                  
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold text-[#ff9f1c] bg-[#ff9f1c]/10 px-3 py-1 rounded-full border border-[#ff9f1c]/20">
                        {cat.badge}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-[#ff9f1c] group-hover:scale-110 transition-transform">
                        <IconComponent className="w-5 h-5" />
                      </div>
                    </div>
                    
                    <h2 className="text-xl md:text-2xl font-extrabold text-white mb-2 group-hover:text-[#ff9f1c] transition-colors">
                      {cat.title}
                    </h2>
                    
                    <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                      {cat.desc}
                    </p>
                  </div>
                  
                  <div className="mt-8 flex items-center text-[#ff9f1c] font-bold text-xs md:text-sm">
                    <span>Explore Category Articles</span>
                    <span className="ml-2 group-hover:translate-x-1.5 transition-transform">→</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </main>

      <CtaFooter />
      <WhatsAppFloat />
    </div>
  );
}

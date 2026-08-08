export default function OloBuyInsightsMain() {
  const categories = [
    {
      title: "OloBuy Research Institute",
      desc: "ڈیٹا، سیکیورٹی اور مارکیٹ ریسرچ رپورٹس کے لیے",
      slug: "research-institute",
      badge: "Research"
    },
    {
      title: "Entrepreneurship News",
      desc: "اسٹارٹ اپس اور بزنس کرنے والوں کے لیے",
      slug: "entrepreneurship",
      badge: "Startups"
    },
    {
      title: "Business News",
      desc: "کاروباری دنیا کی تازہ ترین اپڈیٹس",
      slug: "business",
      badge: "Corporate"
    },
    {
      title: "Trade News",
      desc: "لوکل اور امپورٹ/ایکسپورٹ ٹریڈ کی خبریں",
      slug: "trade",
      badge: "Trade"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-white mb-3">OloBuy Insights</h1>
          <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base">
            Your centralized hub for deep market insights, trade metrics, and entrepreneurial growth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat, idx) => (
            <a 
              key={idx} 
              href={`/insights/${cat.slug}`}
              className="bg-slate-900 border border-slate-800 hover:border-orange-500/50 p-6 md:p-8 rounded-2xl transition-all group flex flex-col justify-between shadow-md hover:shadow-2xl"
            >
              <div>
                <span className="text-xs font-semibold text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full">
                  {cat.badge}
                </span>
                <h2 className="text-2xl font-bold text-white mt-4 group-hover:text-orange-400 transition-colors">
                  {cat.title}
                </h2>
                و<p className="text-slate-400 text-sm mt-2">{cat.desc}</p>
              </div>
              <div className="mt-6 flex items-center text-orange-400 font-medium text-sm">
                <span>Browse articles</span>
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

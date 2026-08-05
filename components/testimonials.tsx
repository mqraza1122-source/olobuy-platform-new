'use client';
import { useState, useEffect, useRef } from 'react';
import { Star, ChevronDown } from 'lucide-react';

const REVIEWS = [
  {
    name: 'Fashion Hub',
    role: 'Clothing seller · Faisalabad',
    text: 'Pehle non serious buyers se tang aa chuka tha. OloBuy ne buyer verify kiya, parcel gaya, phir payment release hui. Ab tension nahi hoti. Solid system hai.',
    rating: 5,
  },
  {
    name: 'اتفاق ٹریڈرز',
    role: 'الیکٹرانکس ڈیلر · لاہور',
    text: 'پہلے آن لائن سیل پر ڈر لگتا تھا۔ اب پیسہ محفوظ رہتا ہے جب تک مال چیک نہ ہو۔ خریدار اور بیچنے والے دونوں کے لیے اچھا طریقہ ہے۔ شکریہ OloBuy',
    rating: 5,
  },
  {
    name: 'Tech Haven',
    role: 'Electronics buyer · Islamabad',
    text: 'Graphics card liya tha mehengi wali. Inspection time mila to properly test kar liya. Jab confirm kiya tabhi seller ko payment gayi. Yahi chahiye tha honestly.',
    rating: 5,
  },
  {
    name: 'Farhan Raja',
    role: 'Freelance designer · Karachi',
    text: 'Client ko design de diya aur baad me payment avoid kar dete the. Ab OloBuy se deal hoti hai to dono side clear rehti hai. Freelancers ke liye bohat useful hai.',
    rating: 5,
  },
  {
    name: 'Sana Collections',
    role: 'Online boutique · Multan',
    text: 'Main small business chalati hun. Advance mangne se customers naraaz hote the, bina advance ke risk tha. OloBuy ne beech ka rasta de diya. Ab orders confidently leti hun.',
    rating: 5,
  },
  {
    name: 'Bilal Traders',
    role: 'Mobile accessories · Rawalpindi',
    text: 'OLX pe deal karte hue pehle bohat bar dhoka hua. Ab deal code bana ke chalata hun. Thoda extra step hai lekin neend puri hoti hai. Recommend karta hun.',
    rating: 5,
  },
];

function useFadeUp(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

export function Testimonials() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const header = useFadeUp();
  const list = useFadeUp(0.08);

  return (
    <section id="reviews" className="bg-[#0f172a] py-16 sm:py-24 px-4 relative overflow-hidden">
      {/* Soft background glows */}
      <div className="absolute top-1/4 left-0 w-72 h-72 bg-[#ff9800]/[0.07] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-0 w-80 h-80 bg-[#1a237e]/25 rounded-full blur-3xl pointer-events-none" />

      <div className="mx-auto max-w-5xl relative z-10">
        
        {/* ===== Header ===== */}
        <div
          ref={header.ref}
          className={`text-center mb-12 sm:mb-16 transition-all duration-700 ease-out ${
            header.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-block bg-gradient-to-r from-[#ff9800] to-[#f57c00] text-[#0f172a] font-black px-8 sm:px-12 py-3.5 sm:py-4 rounded-full text-lg sm:text-2xl shadow-[0_0_30px_rgba(255,152,0,0.35)] mb-5 tracking-wide">
            WHAT OUR USERS SAY
          </div>
          <p className="text-white/70 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            Real feedback from buyers & sellers across Pakistan
          </p>
        </div>

        {/* ===== Reviews List ===== */}
        <div ref={list.ref} className="space-y-4 sm:space-y-5">
          {REVIEWS.map((review, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                style={{ transitionDelay: list.visible ? `${index * 70}ms` : '0ms' }}
                className={`bg-white/[0.04] hover:bg-white/[0.07] backdrop-blur-xl border border-white/10 hover:border-[#ff9800]/45 rounded-2xl sm:rounded-3xl transition-all duration-500 ease-out hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(0,0,0,0.35)] ${
                  list.visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-start justify-between gap-4 text-left p-5 sm:p-6 cursor-pointer"
                >
                  <div className="min-w-0 flex-1">
                    <h4 className="font-bold text-white text-base sm:text-lg leading-snug">
                      {review.name}
                    </h4>
                    <p className="text-[#ff9800] text-xs sm:text-sm mt-1.5 font-medium">
                      {review.role}
                    </p>

                    {/* Stars */}
                    <div className="flex text-[#ff9800] mt-2.5 gap-0.5">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-current" />
                      ))}
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-white/5 border border-white/10 mt-0.5">
                    <ChevronDown
                      className={`h-4 w-4 text-[#ff9800] transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </div>
                </button>

                {/* Expandable Review Text */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-out ${
                    isOpen ? 'max-h-56 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6">
                    <div className="border-t border-white/10 pt-4">
                      <p className="text-white/80 text-sm sm:text-[15px] leading-relaxed">
                        {review.text}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

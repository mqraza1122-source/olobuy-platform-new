'use client';
import { useState } from 'react';
import { MessageCircle, ShieldCheck, Sparkles, Lock } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export function Hero() {
  const [role, setRole] = useState("Buyer");
  const [product, setProduct] = useState("");
  const [customProduct, setCustomProduct] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const createDeal = async () => {
    const finalProduct = product === "Other" ? customProduct : product;

    if (!finalProduct || !amount) {
      alert("Please select/enter Product and Amount");
      return;
    }

    setLoading(true);

    try {
      const dealCode = "OLB" + Date.now().toString().slice(-6);

      const { data, error } = await supabase.from("deals").insert({
        deal_code: dealCode,
        product_name: finalProduct,
        amount: Number(amount),
        status: "pending",
        creator_role: role,
        buyer_name: role === "Buyer" ? "Buyer" : "",
        seller_name: role === "Seller" ? "Seller" : "",
        seller_accepted: role === "Seller" ? true : false,
        buyer_paid: false,
      }).select();

      if (error) {
        console.error("Supabase Error:", error);
        alert("Database Error: " + error.message);
        setLoading(false);
        return;
      }

      router.push(`/deal/${dealCode}?role=${role.toLowerCase()}`);
    } catch (err: any) {
      console.error("Catch Error:", err);
      alert("Network Error: " + (err.message || "Something went wrong"));
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-[85dvh] flex items-center justify-center bg-[#0f172a] overflow-hidden px-4 pt-6 pb-14">
      {/* Background Glow Accents */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[400px] sm:w-[500px] h-[400px] sm:h-[500px] bg-[#ff9800]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#1a237e]/40 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-lg w-full text-center">
        
        {/* Trust Badge Pill */}
        <div className="inline-flex items-center gap-2 bg-white/[0.05] border border-white/10 hover:border-[#ff9800]/30 backdrop-blur-xl rounded-full px-4 py-1.5 mb-5 shadow-lg transition-all">
          <Sparkles className="h-4 w-4 text-[#ff9800]" />
          <span className="text-xs sm:text-sm font-bold tracking-wider text-white/90">
            Pakistan&apos;s #1 Manual Escrow Platform
          </span>
        </div>

        {/* Main Title */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white mb-6 tracking-tight">
          نہ ایڈوانس کا ڈر<br />
          <span className="bg-gradient-to-r from-[#ff9800] via-[#ffb74d] to-[#f57c00] bg-clip-text text-transparent">
            نہ پارسل کا فراڈ
          </span>
        </h1>

        {/* Form Card (Dark Glassmorphism) */}
        <div className="bg-[#111827]/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.75)] p-6 sm:p-8 text-left relative">
          
          <div className="absolute -top-3 right-8 bg-[#ff9800] text-[#0f172a] text-[10px] font-black uppercase px-3 py-1 rounded-full tracking-widest shadow-md">
            Live Escrow
          </div>

          <p className="uppercase text-center text-xs tracking-[0.2em] font-bold text-white/40 mb-5">
            Start Your Secure Deal
          </p>

          <div className="space-y-4">
            {/* Role Selection */}
            <div>
              <label className="block text-xs font-bold text-white/60 mb-2 uppercase tracking-wide">I am a</label>
              <div className="grid grid-cols-3 gap-2">
                {["Buyer", "Seller", "Agent"].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`py-2.5 rounded-2xl text-sm font-bold transition-all cursor-pointer border ${
                      role === r 
                        ? 'bg-[#ff9800] text-[#0f172a] border-[#ff9800] shadow-[0_4px_20px_rgba(255,152,0,0.35)] scale-[1.02]' 
                        : 'bg-white/5 hover:bg-white/10 text-white/80 border-white/10'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Selection */}
            <div>
              <label className="block text-xs font-bold text-white/60 mb-2 uppercase tracking-wide">Product / Service</label>
              <select
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                className="w-full px-4 py-3.5 rounded-2xl border border-white/10 focus:border-[#ff9800] bg-white/5 text-white font-semibold outline-none text-sm cursor-pointer transition-all"
              >
                <option value="" disabled className="bg-[#111827] text-white/50">Select Product / Service</option>
                <option value="Social accounts" className="bg-[#111827] text-white">Social accounts</option>
                <option value="Gaming accounts" className="bg-[#111827] text-white">Gaming accounts</option>
                <option value="E-commerce parcel" className="bg-[#111827] text-white">E-commerce parcel</option>
                <option value="Freelancer service" className="bg-[#111827] text-white">Freelancer service</option>
                <option value="Contract work" className="bg-[#111827] text-white">Contract work</option>
                <option value="Other" className="bg-[#111827] text-white">Other (Type Custom Name)</option>
              </select>
            </div>

            {/* Custom Product Input */}
            {product === "Other" && (
              <div className="animate-in fade-in duration-200">
                <label className="block text-xs font-bold text-[#ff9800] mb-2 uppercase tracking-wide">Type Product / Service Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Smart Watch, Logo Design..." 
                  value={customProduct} 
                  onChange={(e) => setCustomProduct(e.target.value)} 
                  className="w-full px-4 py-3.5 rounded-2xl border-2 border-[#ff9800] bg-white/5 text-white font-semibold outline-none text-sm placeholder:text-white/30" 
                />
              </div>
            )}

            {/* Amount Input */}
            <div>
              <label className="block text-xs font-bold text-white/60 mb-2 uppercase tracking-wide">Amount (Rs)</label>
              <input 
                type="number" 
                placeholder="5000" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
                className="w-full px-4 py-3.5 rounded-2xl border border-white/10 focus:border-[#ff9800] bg-white/5 text-white font-semibold outline-none text-sm placeholder:text-white/30 transition-all" 
              />
            </div>
          </div>

          {/* Submit Button */}
          <button 
            type="button"
            onClick={createDeal}
            disabled={loading}
            className="mt-6 flex items-center justify-center gap-2 w-full bg-gradient-to-r from-[#ff9800] to-[#f57c00] text-[#0f172a] font-black py-4 rounded-2xl hover:scale-[1.02] transition-all shadow-[0_10px_30px_rgba(255,152,0,0.35)] text-sm sm:text-base disabled:opacity-70 cursor-pointer"
          >
            <ShieldCheck className="h-5 w-5 text-[#0f172a]" />
            <span>{loading ? "Creating Secure Deal..." : "Start Secure Deal"}</span>
          </button>

          {/* Footer note inside card */}
          <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-white/40 font-medium text-center">
            <Lock className="w-3 h-3 text-[#ff9800]" />
            <span>Funds are securely held in escrow until product inspection.</span>
          </div>

        </div>
      </div>
    </section>
  );
                      }

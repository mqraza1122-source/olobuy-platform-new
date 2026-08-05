'use client';
import { useState } from 'react';
import { MessageCircle, ShieldCheck } from 'lucide-react';
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

      router.push(`/deal/\( {dealCode}?role= \){role.toLowerCase()}`);
    } catch (err: any) {
      console.error("Catch Error:", err);
      alert("Network Error: " + (err.message || "Something went wrong"));
      setLoading(false);
    }
  };

  return (
    <section className="relative min-h-[90dvh] flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1a237e] to-[#0f172a] overflow-hidden px-4 pt-6 pb-14">
      {/* Soft Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(at_top,#ff9800_0%,transparent_65%)] opacity-[0.12]" />

      <div className="relative z-10 max-w-lg w-full text-center">
        
        {/* Secure Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 mb-5 shadow-sm">
          <ShieldCheck className="h-4 w-4 text-[#25d366]" />
          <span className="text-xs sm:text-sm font-bold tracking-widest text-white">
            100% SECURE TRANSACTIONS
          </span>
        </div>

        {/* ===== IMPROVED URDU HEADING ===== */}
        <h1 className="mb-7">
          <span className="block text-[1.85rem] sm:text-[2.15rem] font-black text-white leading-[1.55] tracking-wide">
            نہ ایڈوانس کا ڈر
          </span>
          <span className="block text-[1.85rem] sm:text-[2.15rem] font-black text-[#ff9800] leading-[1.55] tracking-wide mt-1.5">
            نہ پارسل کا فراڈ
          </span>
        </h1>

        {/* White Card */}
        <div className="bg-white rounded-[1.75rem] shadow-2xl p-5 sm:p-7 text-left border border-white/20">
          <p className="uppercase text-center text-[11px] tracking-[0.2em] font-bold text-gray-500 mb-5">
            Start Your Secure Deal
          </p>

          <div className="space-y-5">
            {/* Role Selection */}
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">
                I am a
              </label>
              <div className="grid grid-cols-3 gap-2.5">
                {["Buyer", "Seller", "Agent"].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`py-2.5 rounded-2xl text-sm font-bold transition-all duration-200 cursor-pointer ${
                      role === r
                        ? "bg-[#1a237e] text-white shadow-md scale-[1.02]"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Product Selection */}
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">
                Product / Service
              </label>
              <select
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 focus:border-[#ff9800] focus:ring-2 focus:ring-[#ff9800]/20 bg-gray-50 text-gray-900 font-semibold outline-none text-sm cursor-pointer transition-all"
              >
                <option value="" disabled>
                  Select Product / Service
                </option>
                <option value="Social accounts">Social accounts</option>
                <option value="Gaming accounts">Gaming accounts</option>
                <option value="E-commerce parcel">E-commerce parcel</option>
                <option value="Freelancer service">Freelancer service</option>
                <option value="Contract work">Contract work</option>
                <option value="Other">Other (Type Custom Name)</option>
              </select>
            </div>

            {/* Custom Product */}
            {product === "Other" && (
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">
                  Type Product / Service Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Smart Watch, Logo Design..."
                  value={customProduct}
                  onChange={(e) => setCustomProduct(e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl border-2 border-[#ff9800] bg-gray-50 text-gray-900 font-semibold outline-none text-sm focus:ring-2 focus:ring-[#ff9800]/20 transition-all"
                />
              </div>
            )}

            {/* Amount */}
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">
                Amount (Rs)
              </label>
              <input
                type="number"
                placeholder="5000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full px-4 py-3.5 rounded-2xl border border-gray-200 focus:border-[#ff9800] focus:ring-2 focus:ring-[#ff9800]/20 bg-gray-50 text-gray-900 font-semibold outline-none text-sm transition-all"
              />
            </div>
          </div>

          {/* CTA Button */}
          <button
            type="button"
            onClick={createDeal}
            disabled={loading}
            className="mt-7 flex items-center justify-center gap-2.5 w-full bg-[#ff9800] text-[#1a237e] font-black py-4 rounded-2xl hover:bg-[#ffb347] active:scale-[0.98] transition-all duration-200 shadow-lg shadow-orange-500/25 text-sm sm:text-base disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
          >
            <MessageCircle className="h-5 w-5" />
            <span>{loading ? "Creating Deal..." : "Start Secure Deal"}</span>
          </button>
        </div>
      </div>
    </section>
  );
  }

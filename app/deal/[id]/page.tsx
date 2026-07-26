'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { ShieldCheck, CheckCircle2, Lock, ArrowRight, Clock, UserCheck } from 'lucide-react';

export default function DealPage() {
  const params = useParams();
  const id = params?.id;
  const [deal, setDeal] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) fetchDeal();
  }, [id]);

  const fetchDeal = async () => {
    const { data, error } = await supabase
      .from('deals')
      .select('*')
      .eq('deal_code', id)
      .single();

    if (error) {
      console.error(error);
      setDeal(null);
    } else {
      setDeal(data);
    }
    setLoading(false);
  };

  const releasePayment = async () => {
    const { error } = await supabase
      .from('deals')
      .update({ status: 'completed' })
      .eq('deal_code', id);

    if (!error) {
      setDeal({ ...deal, status: 'completed' });
      alert('Payment Released Successfully!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0e11] flex items-center justify-center text-amber-400 font-bold tracking-wider">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-amber-400 border-t-transparent rounded-full animate-spin"></div>
          LOADING SECURE ESCROW...
        </div>
      </div>
    );
  }

  if (!deal) {
    return (
      <div className="min-h-screen bg-[#0b0e11] flex items-center justify-center text-white font-bold">
        <div className="text-center bg-[#1e2329] p-8 rounded-3xl border border-white/5 shadow-2xl">
          <h2 className="text-xl text-red-400 mb-2">Deal Not Found</h2>
          <p className="text-sm text-white/50">Please check your tracking link or deal code.</p>
        </div>
      </div>
    );
  }

  const isCompleted = deal.status === 'completed';

  return (
    <div className="min-h-screen bg-[#0b0e11] text-white p-4 sm:p-6 flex items-center justify-center font-sans">
      <div className="max-w-md w-full bg-[#1e2329] border border-[#2b313a] rounded-[2rem] p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        
        {/* Top Glow Accent */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-[#2b313a]/60 border border-white/5 rounded-full px-4 py-1.5 mb-4 shadow-inner">
            <ShieldCheck className="h-4 w-4 text-[#f0b90b]" />
            <span className="text-xs font-bold tracking-wide uppercase text-amber-400">OloBuy Secure Escrow</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Deal #{deal.deal_code}
          </h1>
          <p className="text-white/60 text-sm mt-1 font-medium">{deal.product_name || 'Verified Digital Asset'}</p>
        </div>

        {/* Escrow Progress Bar (Binance Style) */}
        <div className="bg-[#181a20] border border-white/5 rounded-2xl p-4 mb-6">
          <div className="flex justify-between items-center text-xs font-semibold text-white/60 mb-3">
            <span>Escrow Status</span>
            <span className="text-amber-400 uppercase tracking-wider">{deal.status}</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className={`h-1.5 rounded-full ${deal.status ? 'bg-amber-400' : 'bg-white/10'}`}></div>
            <div className={`h-1.5 rounded-full ${deal.status === 'paid' || isCompleted ? 'bg-amber-400' : 'bg-white/10'}`}></div>
            <div className={`h-1.5 rounded-full ${isCompleted ? 'bg-green-500' : 'bg-white/10'}`}></div>
          </div>
          <div className="flex justify-between text-[10px] text-white/40 mt-2 font-medium">
            <span>Created</span>
            <span>Secured</span>
            <span>Completed</span>
          </div>
        </div>

        {/* Main Amount & Status Card */}
        <div className="bg-[#181a20] border border-white/5 rounded-2xl p-5 mb-6">
          <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/5">
            <span className="text-white/50 text-sm">Escrow Amount</span>
            <span className="text-2xl font-black text-[#f0b90b]">Rs {Number(deal.amount || 0).toLocaleString()}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-white/50 text-sm">Transaction Status</span>
            <span className={`px-3 py-1 rounded-lg text-xs font-bold tracking-wide uppercase ${
              isCompleted ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
              deal.status === 'paid' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
              'bg-amber-500/10 text-amber-400 border border-amber-500/20'
            }`}>
              {deal.status?.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Parties Involved */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-[#181a20] border border-white/5 rounded-2xl p-3.5 text-center">
            <p className="text-[11px] text-white/40 mb-1 font-medium">Buyer</p>
            <p className="font-bold text-sm truncate text-white/90">{deal.buyer_name || 'Verified Buyer'}</p>
          </div>
          <div className="bg-[#181a20] border border-white/5 rounded-2xl p-3.5 text-center">
            <p className="text-[11px] text-white/40 mb-1 font-medium">Seller</p>
            <p className="font-bold text-sm truncate text-white/90">{deal.seller_name || 'Verified Seller'}</p>
          </div>
        </div>

        {/* Action Buttons */}
        {!isCompleted && (
          <button
            onClick={releasePayment}
            className="w-full bg-[#f0b90b] hover:bg-[#d9a505] text-[#181a20] font-black py-4 rounded-2xl flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-amber-500/10 transition-all active:scale-[0.98]"
          >
            <CheckCircle2 className="h-5 w-5" />
            Release Payment to Seller
          </button>
        )}

        {isCompleted && (
          <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-5 text-center">
            <CheckCircle2 className="h-8 w-8 text-green-400 mx-auto mb-2" />
            <p className="font-extrabold text-green-400 text-sm">Deal Completed Successfully</p>
            <p className="text-xs text-white/40 mt-1">Funds have been securely released to the seller.</p>
          </div>
        )}

        {/* Footer info */}
        <div className="mt-8 pt-4 border-t border-white/5 text-center">
          <p className="text-white/30 text-xs font-medium">
            Encrypted & Powered by <span className="text-white/60 font-bold">OloBuy Financial Engine</span>
          </p>
        </div>

      </div>
    </div>
  );
}

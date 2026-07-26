'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { ShieldCheck, CheckCircle2, Lock, ArrowRight, UserCheck } from 'lucide-react';

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
      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a] flex items-center justify-center text-amber-500 font-bold tracking-wider">
        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10">
          <div className="w-5 h-5 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
          LOADING SECURE ESCROW...
        </div>
      </div>
    );
  }

  if (!deal) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a] flex items-center justify-center text-white p-4">
        <div className="text-center bg-white/10 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/20 shadow-2xl max-w-sm w-full">
          <h2 className="text-xl font-black text-red-400 mb-2">Deal Not Found</h2>
          <p className="text-sm text-white/60">Please check your tracking link or deal code.</p>
        </div>
      </div>
    );
  }

  const isCompleted = deal.status === 'completed';

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-slate-900 p-4 sm:p-6 flex items-center justify-center font-sans">
      
      {/* Main Luxury Container matching Home Page style */}
      <div className="max-w-md w-full bg-white/95 backdrop-blur-2xl border border-white/40 rounded-[2.5rem] p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] relative overflow-hidden">
        
        {/* Top Header Badge */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 mb-3 shadow-sm">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span className="text-xs font-bold tracking-wide uppercase text-emerald-700">OloBuy Secure Escrow</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">
            Deal #{deal.deal_code}
          </h1>
          <p className="text-slate-500 text-sm mt-1 font-semibold">{deal.product_name || 'Verified Digital Transaction'}</p>
        </div>

        {/* Binance/Global Style Progress Bar */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 mb-6 shadow-inner">
          <div className="flex justify-between items-center text-xs font-bold text-slate-500 mb-3">
            <span>Escrow Stage</span>
            <span className="text-amber-600 uppercase tracking-wider">{deal.status}</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className={`h-2 rounded-full transition-all ${deal.status ? 'bg-amber-500 shadow-sm' : 'bg-slate-200'}`}></div>
            <div className={`h-2 rounded-full transition-all ${deal.status === 'paid' || isCompleted ? 'bg-amber-500 shadow-sm' : 'bg-slate-200'}`}></div>
            <div className={`h-2 rounded-full transition-all ${isCompleted ? 'bg-emerald-500 shadow-sm' : 'bg-slate-200'}`}></div>
          </div>
          <div className="flex justify-between text-[11px] text-slate-400 mt-2 font-bold">
            <span>Created</span>
            <span>Secured</span>
            <span>Completed</span>
          </div>
        </div>

        {/* Amount & Status Card */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 mb-6 shadow-sm">
          <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-200/60">
            <span className="text-slate-500 text-sm font-medium">Escrow Amount</span>
            <span className="text-2xl font-black text-amber-600">Rs {Number(deal.amount || 0).toLocaleString()}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-slate-500 text-sm font-medium">Transaction Status</span>
            <span className={`px-3.5 py-1 rounded-xl text-xs font-black tracking-wider uppercase shadow-sm ${
              isCompleted ? 'bg-emerald-500/10 text-emerald-700 border border-emerald-500/30' :
              deal.status === 'paid' ? 'bg-blue-500/10 text-blue-700 border border-blue-500/30' :
              'bg-amber-500/10 text-amber-700 border border-amber-500/30'
            }`}>
              {deal.status?.toUpperCase()}
            </span>
          </div>
        </div>

        {/* Parties Involved Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 text-center shadow-sm">
            <p className="text-[11px] text-slate-400 mb-1 font-bold uppercase tracking-wider">Buyer</p>
            <p className="font-extrabold text-sm truncate text-slate-800">{deal.buyer_name || 'Verified Buyer'}</p>
          </div>
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 text-center shadow-sm">
            <p className="text-[11px] text-slate-400 mb-1 font-bold uppercase tracking-wider">Seller</p>
            <p className="font-extrabold text-sm truncate text-slate-800">{deal.seller_name || 'Verified Seller'}</p>
          </div>
        </div>

        {/* Action Button (Binance/Global Gradient Style) */}
        {!isCompleted && (
          <button
            onClick={releasePayment}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-amber-500/25 transition-all active:scale-[0.98]"
          >
            <CheckCircle2 className="h-5 w-5" />
            Release Payment to Seller
          </button>
        )}

        {isCompleted && (
          <div className="bg-emerald-50 border border-emerald-500/30 rounded-2xl p-5 text-center shadow-sm">
            <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
            <p className="font-black text-emerald-800 text-sm">Deal Completed Successfully</p>
            <p className="text-xs text-emerald-600/80 mt-1 font-medium">Funds have been securely released to the seller.</p>
          </div>
        )}

        {/* Footer info */}
        <div className="mt-8 pt-4 border-t border-slate-100 text-center">
          <p className="text-slate-400 text-xs font-semibold">
            Encrypted & Powered by <span className="text-slate-700 font-bold">OloBuy Financial Engine</span>
          </p>
        </div>

      </div>
    </div>
  );
        }

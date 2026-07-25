'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export default function DealPage() {
  const { id } = useParams();
  const [deal, setDeal] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-white">
        Loading Deal...
      </div>
    );
  }

  if (!deal) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex items-center justify-center text-white">
        Deal not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white p-6">
      <div className="max-w-lg mx-auto">
        
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-1.5 mb-4">
            <ShieldCheck className="h-4 w-4 text-[#25d366]" />
            <span className="text-sm font-bold">OloBuy Secure Deal</span>
          </div>
          <h1 className="text-3xl font-black">Deal #{deal.deal_code}</h1>
          <p className="text-white/60 mt-1">{deal.product_name}</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-white/70">Amount</span>
            <span className="text-2xl font-black text-[#ff9800]">Rs {deal.amount}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-white/70">Status</span>
            <span className={`px-4 py-1 rounded-full text-sm font-bold ${
              deal.status === 'completed' ? 'bg-green-500/20 text-green-400' :
              deal.status === 'paid' ? 'bg-blue-500/20 text-blue-400' :
              'bg-yellow-500/20 text-yellow-400'
            }`}>
              {deal.status?.toUpperCase()}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
            <p className="text-xs text-white/50 mb-1">Buyer</p>
            <p className="font-bold">{deal.buyer_name || '—'}</p>
          </div>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
            <p className="text-xs text-white/50 mb-1">Seller</p>
            <p className="font-bold">{deal.seller_name || '—'}</p>
          </div>
        </div>

        {deal.status !== 'completed' && (
          <button
            onClick={releasePayment}
            className="w-full bg-[#25d366] hover:bg-[#1da851] text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="h-5 w-5" />
            Release Payment to Seller
          </button>
        )}

        {deal.status === 'completed' && (
          <div className="bg-green-500/20 border border-green-500/30 rounded-2xl p-6 text-center">
            <CheckCircle2 className="h-10 w-10 text-green-400 mx-auto mb-2" />
            <p className="font-bold text-green-400">Deal Completed Successfully</p>
          </div>
        )}

        <p className="text-center text-white/40 text-sm mt-8">
          Share this link with the other party
        </p>
      </div>
    </div>
  );
    }

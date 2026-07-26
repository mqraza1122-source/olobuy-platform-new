'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { ShieldCheck, CheckCircle2, Copy, Wallet, KeyRound, MessageSquare, Send } from 'lucide-react';

export default function DealPage() {
  const params = useParams();
  const id = params?.id;
  const [deal, setDeal] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [copied, setCopied] = useState<string | null>(null);
  const [adminPin, setAdminPin] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');

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

  // Verify Admin PIN to Secure Escrow
  const verifyPinAndSecure = async (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPin.trim() === '7860') {
      const { error } = await supabase
        .from('deals')
        .update({ status: 'secured' })
        .eq('deal_code', id);

      if (!error) {
        setDeal({ ...deal, status: 'secured' });
        setPinError('');
        alert('Payment Successfully Secured in OloBuy Escrow!');
      }
    } else {
      setPinError('Invalid PIN! Please get the correct PIN from OloBuy Admin on WhatsApp.');
    }
  };

  // Release Payment to Seller
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

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
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
  const isSecured = deal.status === 'secured' || deal.status === 'paid';
  const isPending = !deal.status || deal.status === 'pending';

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-slate-900 p-4 sm:p-6 flex items-center justify-center font-sans">
      
      <div className="max-w-md w-full bg-white/95 backdrop-blur-2xl border border-white/40 rounded-[2.5rem] p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] relative overflow-hidden my-6">
        
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
            <span className="text-amber-600 uppercase tracking-wider">{deal.status || 'pending'}</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="h-2 rounded-full bg-amber-500 shadow-sm"></div>
            <div className={`h-2 rounded-full transition-all ${isSecured || isCompleted ? 'bg-amber-500 shadow-sm' : 'bg-slate-200'}`}></div>
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
              isSecured ? 'bg-blue-500/10 text-blue-700 border border-blue-500/30' :
              'bg-amber-500/10 text-amber-700 border border-amber-500/30'
            }`}>
              {deal.status || 'PENDING'}
            </span>
          </div>
        </div>

        {/* 1. PENDING STAGE: Show Official Accounts & PIN Input Box */}
        {isPending && (
          <div className="space-y-4 mb-6">
            <div className="bg-amber-500/10 border-2 border-amber-500/30 rounded-2xl p-5 shadow-md">
              <div className="flex items-center gap-2 mb-3">
                <Wallet className="h-5 w-5 text-amber-600" />
                <h3 className="font-black text-slate-900 text-sm">Send Payment to OloBuy Official Account</h3>
              </div>
              <p className="text-xs text-slate-600 mb-4 font-medium leading-relaxed">
                Please transfer <span className="font-bold text-amber-600">Rs {Number(deal.amount || 0).toLocaleString()}</span> to the account below and send screenshot on WhatsApp.
              </p>

              <div className="space-y-2.5">
                <div className="bg-white border border-amber-200 rounded-xl p-3 flex items-center justify-between shadow-xs">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Easypaisa / JazzCash</p>
                    <p className="font-black text-slate-800 text-sm">0300-1234567 <span className="text-xs font-normal text-slate-500">(OloBuy)</span></p>
                  </div>
                  <button 
                    onClick={() => copyToClipboard('03001234567', 'ep')}
                    className="bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <Copy className="h-3.5 w-3.5" />
                    {copied === 'ep' ? 'Copied!' : 'Copy'}
                  </button>
                </div>
              </div>

              <a 
                href={`https://wa.me/923043031574?text=Hello%20OloBuy%20Admin,%20I%20have%20sent%20payment%20for%20Deal%20%23${deal.deal_code}%20amounting%20to%20Rs%20${deal.amount}.%20Here%20is%20my%20screenshot.`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 text-xs shadow-md transition-all"
              >
                <MessageSquare className="h-4 w-4" />
                Send Payment Proof on WhatsApp
              </a>
            </div>

            {/* Admin PIN Verification Form for Buyer */}
            <div className="bg-slate-900 text-white rounded-2xl p-5 shadow-lg border border-slate-800">
              <div className="flex items-center gap-2 mb-2">
                <KeyRound className="h-4 w-4 text-amber-400" />
                <h4 className="font-bold text-xs uppercase tracking-wider text-amber-400">Have you received PIN from Admin?</h4>
              </div>
              <p className="text-[11px] text-slate-400 mb-3">Enter the 4-digit verification PIN provided on WhatsApp after payment approval.</p>
              
              <form onSubmit={verifyPinAndSecure} className="flex gap-2">
                <input 
                  type="password"
                  maxLength={4}
                  placeholder="Enter PIN"
                  value={adminPin}
                  onChange={(e) => setAdminPin(e.target.value)}
                  className="bg-slate-800 border border-slate-700 text-white text-center font-black tracking-widest px-4 py-2.5 rounded-xl w-full text-sm focus:outline-none focus:border-amber-500"
                />
                <button 
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs transition-all flex items-center gap-1 cursor-pointer shrink-0"
                >
                  <Send className="h-4 w-4" />
                  Verify
                </button>
              </form>
              {pinError && <p className="text-red-400 text-[11px] mt-2 font-medium">{pinError}</p>}
            </div>
          </div>
        )}

        {/* 2. SECURED STAGE: Show Success Box & Release Button */}
        {isSecured && !isCompleted && (
          <div className="space-y-4 mb-6">
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-5 text-center shadow-sm">
              <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
              <p className="font-black text-emerald-800 text-sm">You have successfully secured Rs {Number(deal.amount || 0).toLocaleString()} in OloBuy Escrow!</p>
              <p className="text-xs text-emerald-600/80 mt-1 font-medium">Funds are 100% safe with OloBuy until you receive and inspect your product.</p>
            </div>

            <button
              onClick={releasePayment}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-amber-500/25 transition-all active:scale-[0.98]"
            >
              <CheckCircle2 className="h-5 w-5" />
              Release Payment to Seller
            </button>
          </div>
        )}

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

        {/* Completed View */}
        {isCompleted && (
          <div className="bg-emerald-50 border border-emerald-500/30 rounded-2xl p-5 text-center shadow-sm mb-6">
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

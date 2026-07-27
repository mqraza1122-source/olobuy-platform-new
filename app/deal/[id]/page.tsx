'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { ShieldCheck, CheckCircle2, Copy, Wallet, KeyRound, MessageSquare, Send, Truck, UserCheck } from 'lucide-react';

export default function DealPage() {
  const params = useParams();
  const id = params?.id;
  const [deal, setDeal] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [copied, setCopied] = useState<string | null>(null);
  
  // States for Buyer workflow
  const [adminPin, setAdminPin] = useState<string>('');
  const [pinError, setPinError] = useState<string>('');
  const [buyerPhone, setBuyerPhone] = useState<string>('');

  // States for Seller workflow
  const [trackingNumber, setTrackingNumber] = useState<string>('');

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
      if (data?.buyer_phone) setBuyerPhone(data.buyer_phone);
    }
    setLoading(false);
  };

  // Save Buyer Phone & Details
  const saveBuyerDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!buyerPhone || buyerPhone.length < 10) {
      alert('Please enter a valid mobile number');
      return;
    }

    const { error } = await supabase
      .from('deals')
      .update({ buyer_phone: buyerPhone, buyer_name: 'Buyer' })
      .eq('deal_code', id);

    if (!error) {
      setDeal({ ...deal, buyer_phone: buyerPhone, buyer_name: 'Buyer' });
      alert('Buyer details saved successfully!');
    } else {
      alert('Error saving details: ' + error.message);
    }
  };

  // Seller Accepts Deal
  const sellerAcceptDeal = async () => {
    const { error } = await supabase
      .from('deals')
      .update({ seller_accepted: true, status: 'accepted' })
      .eq('deal_code', id);

    if (!error) {
      setDeal({ ...deal, seller_accepted: true, status: 'accepted' });
      alert('Deal accepted successfully! You can now ship the item.');
    }
  };

  // Seller Submits Tracking
  const submitTracking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) {
      alert('Please enter courier/tracking details');
      return;
    }

    const { error } = await supabase
      .from('deals')
      .update({ status: 'shipped' })
      .eq('deal_code', id);

    if (!error) {
      setDeal({ ...deal, status: 'shipped' });
      alert('Tracking submitted successfully! Buyer notified.');
    }
  };

  // Verify Admin PIN to Secure Escrow (Buyer flow)
  const verifyPinAndSecure = async (e: React.FormEvent) => {
    e.preventDefault();
    if (adminPin.trim() === '7860') {
      const { error } = await supabase
        .from('deals')
        .update({ status: 'secured', buyer_paid: true })
        .eq('deal_code', id);

      if (!error) {
        setDeal({ ...deal, status: 'secured', buyer_paid: true });
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
      alert('Payment Released Successfully to Seller!');
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a] flex items-center justify-center text-[#ff9800] font-bold tracking-wider">
        <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md px-6 py-4 rounded-2xl border border-white/10">
          <div className="w-5 h-5 border-2 border-[#ff9800] border-t-transparent rounded-full animate-spin"></div>
          LOADING SECURE ESCROW PORTAL...
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

  const creatorRole = deal.creator_role || 'Buyer';
  const isCompleted = deal.status === 'completed';
  const isSecured = deal.status === 'secured' || deal.status === 'paid';
  const isShipped = deal.status === 'shipped';
  const isAccepted = deal.seller_accepted || deal.status === 'accepted';
  const isPending = !deal.status || deal.status === 'pending';

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-slate-900 p-4 sm:p-6 flex items-center justify-center font-sans">
      <div className="max-w-md w-full bg-white/95 backdrop-blur-2xl border border-white/40 rounded-[2.5rem] p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] relative overflow-hidden my-6">
        
        {/* Top Header Badge */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 mb-3 shadow-sm">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span className="text-xs font-bold tracking-wide uppercase text-emerald-700">OloBuy Secure Escrow ({creatorRole} View)</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">
            Deal #{deal.deal_code}
          </h1>
          <p className="text-slate-500 text-sm mt-1 font-semibold">{deal.product_name || 'Verified Digital Transaction'}</p>
        </div>

        {/* Progress Bar */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 mb-6 shadow-inner">
          <div className="flex justify-between items-center text-xs font-bold text-slate-500 mb-3">
            <span>Escrow Stage</span>
            <span className="text-[#ff9800] uppercase tracking-wider">{deal.status || 'pending'}</span>
          </div>
          <div className="grid grid-cols-4 gap-1.5">
            <div className="h-2 rounded-full bg-[#ff9800] shadow-sm"></div>
            <div className={`h-2 rounded-full transition-all ${isAccepted || isSecured || isCompleted ? 'bg-[#ff9800] shadow-sm' : 'bg-slate-200'}`}></div>
            <div className={`h-2 rounded-full transition-all ${isSecured || isCompleted ? 'bg-[#ff9800] shadow-sm' : 'bg-slate-200'}`}></div>
            <div className={`h-2 rounded-full transition-all ${isCompleted ? 'bg-emerald-500 shadow-sm' : 'bg-slate-200'}`}></div>
          </div>
          <div className="flex justify-between text-[10px] text-slate-400 mt-2 font-bold uppercase">
            <span>Created</span>
            <span>Accepted</span>
            <span>Secured</span>
            <span>Done</span>
          </div>
        </div>

        {/* Amount & Status Card */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 mb-6 shadow-sm">
          <div className="flex justify-between items-center mb-4 pb-4 border-b border-slate-200/60">
            <span className="text-slate-500 text-sm font-medium">Escrow Amount</span>
            <span className="text-2xl font-black text-[#ff9800]">Rs {Number(deal.amount || 0).toLocaleString()}</span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-slate-500 text-sm font-medium">Transaction Status</span>
            <span className={`px-3.5 py-1 rounded-xl text-xs font-black tracking-wider uppercase shadow-sm ${
              isCompleted ? 'bg-emerald-500/10 text-emerald-700 border border-emerald-500/30' :
              isSecured ? 'bg-blue-500/10 text-blue-700 border border-blue-500/30' :
              'bg-[#ff9800]/10 text-[#ff9800] border border-[#ff9800]/30'
            }`}>
              {deal.status || 'PENDING'}
            </span>
          </div>
        </div>

        {/* CONDITION 1: IF CREATOR IS SELLER */}
        {creatorRole === 'Seller' && (
          <div className="space-y-4 mb-6">
            {!isAccepted ? (
              <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-5 text-center shadow-sm">
                <UserCheck className="h-8 w-8 text-[#1a237e] mx-auto mb-2" />
                <h3 className="font-black text-[#1a237e] text-sm mb-1">Seller Action Required</h3>
                <p className="text-xs text-slate-600 mb-4">Review deal terms and click below to accept this order and start escrow protection.</p>
                <button
                  onClick={sellerAcceptDeal}
                  className="w-full bg-[#1a237e] hover:bg-indigo-900 text-white font-black py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
                >
                  Accept Deal & Start Escrow
                </button>
              </div>
            ) : !isShipped && !isCompleted ? (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 shadow-sm">
                <div className="flex items-center gap-2 mb-3">
                  <Truck className="h-5 w-5 text-[#1a237e]" />
                  <h3 className="font-black text-slate-900 text-sm">Submit Shipping / Service Delivery</h3>
                </div>
                <form onSubmit={submitTracking} className="space-y-3">
                  <input 
                    type="text"
                    placeholder="Enter Courier Name / Tracking / Details"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-sm font-semibold text-slate-800 outline-none focus:border-[#ff9800]"
                  />
                  <button 
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-3 rounded-xl text-xs uppercase transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send className="h-4 w-4" />
                    Notify Buyer & Submit
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-emerald-50 border border-emerald-500/30 rounded-2xl p-4 text-center">
                <p className="text-xs font-black text-emerald-800 uppercase">Deal in Progress / Shipped</p>
                <p className="text-[11px] text-emerald-600 mt-1">Waiting for buyer inspection and payment release.</p>
              </div>
            )}

            <a 
              href={`https://wa.me/923043031572?text=Hello%20OloBuy%20Admin,%20I%20am%20the%20Seller%20for%20Deal%20%23${deal.deal_code}.%20I%20need%20support.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#25d366] hover:bg-[#20ba5a] text-white font-bold py-3.5 rounded-2xl flex items-center justify-center gap-2 text-xs shadow-md transition-all"
            >
              <MessageSquare className="h-4 w-4" />
              Contact Admin on WhatsApp (Support)
            </a>
          </div>
        )}

        {/* CONDITION 2: IF CREATOR IS BUYER OR DEFAULT */}
        {creatorRole === 'Buyer' && (
          <div className="space-y-4 mb-6">
            {!deal.buyer_phone && (
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4">
                <h3 className="font-black text-slate-900 text-xs mb-2 uppercase">Step 1: Enter Your Phone Number</h3>
                <form onSubmit={saveBuyerDetails} className="flex gap-2">
                  <input 
                    type="text"
                    placeholder="03001234567"
                    value={buyerPhone}
                    onChange={(e) => setBuyerPhone(e.target.value)}
                    className="bg-white border border-slate-200 text-slate-800 px-3 py-2 rounded-xl text-sm font-semibold w-full outline-none focus:border-[#ff9800]"
                  />
                  <button type="submit" className="bg-[#1a237e] text-white px-4 py-2 rounded-xl text-xs font-bold cursor-pointer shrink-0">
                    Save
                  </button>
                </form>
              </div>
            )}

            {isPending && (
              <div className="bg-amber-500/10 border-2 border-amber-500/30 rounded-2xl p-5 shadow-md">
                <div className="flex items-center gap-2 mb-3">
                  <Wallet className="h-5 w-5 text-[#ff9800]" />
                  <h3 className="font-black text-slate-900 text-sm">Send Payment to OloBuy Official Account</h3>
                </div>
                <p className="text-xs text-slate-600 mb-4 font-medium leading-relaxed">
                  Please transfer <span className="font-bold text-[#ff9800]">Rs {Number(deal.amount || 0).toLocaleString()}</span> to the account below and send screenshot on WhatsApp.
                </p>

                <div className="space-y-2.5">
                  <div className="bg-white border border-amber-200 rounded-xl p-3 flex items-center justify-between shadow-xs">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Easypaisa / JazzCash</p>
                      <p className="font-black text-slate-800 text-sm">0300-1234567 <span className="text-xs font-normal text-slate-500">(OloBuy)</span></p>
                    </div>
                    <button 
                      onClick={() => copyToClipboard('03001234567', 'ep')}
                      className="bg-[#ff9800] hover:bg-orange-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                    >
                      <Copy className="h-3.5 w-3.5" />
                      {copied === 'ep' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>

                <a 
                  href={`https://wa.me/923043031572?text=Hello%20OloBuy%20Admin,%20I%20have%20sent%20payment%20for%20Deal%20%23${deal.deal_code}%20amounting%20to%20Rs%20${deal.amount}.%20Here%20is%20my%20screenshot.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 w-full bg-[#25d366] hover:bg-[#20ba5a] text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 text-xs shadow-md transition-all"
                >
                  <MessageSquare className="h-4 w-4" />
                  Send Payment Proof on WhatsApp
                </a>
              </div>
            )}

            {isPending && (
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
                    className="bg-slate-800 border border-slate-700 text-white text-center font-black tracking-widest px-4 py-2.5 rounded-xl w-full text-sm focus:outline-none focus:border-[#ff9800]"
                  />
                  <button 
                    type="submit"
                    className="bg-[#ff9800] hover:bg-orange-600 text-slate-950 font-black px-4 py-2.5 rounded-xl text-xs transition-all flex items-center gap-1 cursor-pointer shrink-0"
                  >
                    <Send className="h-4 w-4" />
                    Verify
                  </button>
                </form>
                {pinError && <p className="text-red-400 text-[11px] mt-2 font-medium">{pinError}</p>}
              </div>
            )}

            {isSecured && !isCompleted && (
              <div className="space-y-4">
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-5 text-center shadow-sm">
                  <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
                  <p className="font-black text-emerald-800 text-sm">You have successfully secured Rs {Number(deal.amount || 0).toLocaleString()} in OloBuy Escrow!</p>
                  <p className="text-xs text-emerald-600/80 mt-1 font-medium">Funds are 100% safe until you receive and inspect your item.</p>
                </div>

                <button
                  onClick={releasePayment}
                  className="w-full bg-gradient-to-r from-[#ff9800] to-orange-500 hover:from-orange-600 hover:to-orange-700 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 cursor-pointer shadow-xl shadow-orange-500/25 transition-all active:scale-[0.98]"
                >
                  <CheckCircle2 className="h-5 w-5" />
                  Release Payment to Seller
                </button>
              </div>
            )}
          </div>
        )}

        {/* Parties Involved Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 text-center shadow-sm">
            <p className="text-[11px] text-slate-400 mb-1 font-bold uppercase tracking-wider">Creator Role</p>
            <p className="font-extrabold text-sm truncate text-[#1a237e]">{creatorRole}</p>
          </div>
          <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 text-center shadow-sm">
            <p className="text-[11px] text-slate-400 mb-1 font-bold uppercase tracking-wider">Buyer Phone</p>
            <p className="font-extrabold text-sm truncate text-slate-800">{deal.buyer_phone || 'Not Added'}</p>
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

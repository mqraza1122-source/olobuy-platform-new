'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { ShieldCheck, CheckCircle2, Copy, Wallet, MessageSquare, Send, Truck, UserCheck, Clock, AlertTriangle } from 'lucide-react';

// Email Notification Function via Resend API
async function sendAdminNotification(dealCode: string, actionType: string, amount: number) {
  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'OloBuy Escrow <onboarding@resend.dev>',
        to: ['Support@olobuy.pk'],
        subject: `🚨 OloBuy Alert: Deal #${dealCode} - ${actionType}`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; background: #f8fafc; border-radius: 10px;">
            <h2 style="color: #1a237e;">OloBuy Escrow Activity Alert</h2>
            <p><strong>Deal Code:</strong> #${dealCode}</p>
            <p><strong>Action / Status:</strong> <span style="color: #ff9800; font-weight: bold;">${actionType}</span></p>
            <p><strong>Amount:</strong> Rs ${amount.toLocaleString()}</p>
            <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
            <p style="font-size: 12px; color: #64748b;">This is an automated notification from OloBuy Financial Engine.</p>
          </div>
        `,
      }),
    });
  } catch (error) {
    console.error('Email sending failed:', error);
  }
}

export default function DealPage() {
  const params = useParams();
  const id = params?.id;
  const [deal, setDeal] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [copied, setCopied] = useState<string | null>(null);
  
  // States for Buyer workflow
  const [buyerPhone, setBuyerPhone] = useState<string>('');

  // States for Seller workflow
  const [trackingNumber, setTrackingNumber] = useState<string>('');
  const [inspectionDays, setInspectionDays] = useState<number>(2);

  // Countdown Timer State
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

  // P2P Chat States
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');

  useEffect(() => {
    if (id) {
      fetchDeal();
      fetchMessages();

      // Supabase Realtime Subscription for Live P2P Chat
      const channel = supabase
        .channel(`room_${id}`)
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'deal_chats',
            filter: `deal_code=eq.${id}`,
          },
          (payload) => {
            setMessages((prev) => [...prev, payload.new]);
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [id]);

  useEffect(() => {
    if (!deal) return;

    const baseTime = new Date(deal.updated_at || deal.created_at || Date.now()).getTime();
    const daysAllowed = Number(deal.inspection_days || 2);
    const targetTime = baseTime + daysAllowed * 24 * 60 * 60 * 1000;

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [deal]);

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
      if (data?.inspection_days) setInspectionDays(data.inspection_days);
    }
    setLoading(false);
  };

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('deal_chats')
      .select('*')
      .eq('deal_code', id)
      .order('created_at', { ascending: true });

    if (!error && data) {
      setMessages(data);
    }
  };

  const sendChatMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const creatorRole = deal?.creator_role || 'Buyer';
    const { error } = await supabase.from('deal_chats').insert([
      {
        deal_code: id,
        sender_role: creatorRole,
        message: newMessage.trim(),
      },
    ]);

    if (!error) {
      setNewMessage('');
    }
  };

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

  const sellerAcceptDeal = async () => {
    const { error } = await supabase
      .from('deals')
      .update({ 
        seller_accepted: true, 
        status: 'accepted',
        inspection_days: inspectionDays,
        updated_at: new Date().toISOString()
      })
      .eq('deal_code', id);

    if (!error) {
      setDeal({ ...deal, seller_accepted: true, status: 'accepted', inspection_days: inspectionDays });
      await sendAdminNotification(deal.deal_code, `Deal Accepted by Seller (${inspectionDays} Days Timer)`, deal.amount);
      alert('Deal accepted successfully with ' + inspectionDays + ' days inspection timer!');
    }
  };

  const submitTracking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingNumber.trim()) {
      alert('Please enter courier/tracking details');
      return;
    }

    const { error } = await supabase
      .from('deals')
      .update({ status: 'shipped', updated_at: new Date().toISOString() })
      .eq('deal_code', id);

    if (!error) {
      setDeal({ ...deal, status: 'shipped' });
      await sendAdminNotification(deal.deal_code, 'Item Shipped / Tracking Submitted', deal.amount);
      alert('Tracking submitted successfully! Buyer notified.');
    }
  };

  const markAsSecured = async () => {
    const { error } = await supabase
      .from('deals')
      .update({ status: 'secured', buyer_paid: true, updated_at: new Date().toISOString() })
      .eq('deal_code', id);

    if (!error) {
      setDeal({ ...deal, status: 'secured', buyer_paid: true });
      await sendAdminNotification(deal.deal_code, 'Payment Secured by Buyer', deal.amount);
      alert('Payment marked as transferred & secured in OloBuy Escrow!');
    }
  };

  const releasePayment = async () => {
    const { error } = await supabase
      .from('deals')
      .update({ status: 'completed', updated_at: new Date().toISOString() })
      .eq('deal_code', id);

    if (!error) {
      setDeal({ ...deal, status: 'completed' });
      await sendAdminNotification(deal.deal_code, 'Payment Released to Seller (Completed)', deal.amount);
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

        {/* LIVE P2P CHAT BOX (Binance Style) */}
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-6 shadow-sm">
          <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-200">
            <MessageSquare className="h-4 w-4 text-[#ff9800]" />
            <h3 className="font-black text-slate-800 text-xs uppercase">Secure Deal Chat (P2P)</h3>
          </div>

          <div className="h-40 overflow-y-auto space-y-2 mb-3 pr-1 text-xs">
            {messages.length === 0 ? (
              <p className="text-center text-slate-400 py-8 font-medium">No messages yet. Start conversation below.</p>
            ) : (
              messages.map((msg, index) => {
                const isMe = msg.sender_role === creatorRole;
                return (
                  <div key={index} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                    <span className="text-[9px] font-bold text-slate-400 mb-0.5">{msg.sender_role}</span>
                    <div className={`p-2.5 rounded-2xl max-w-[80%] font-medium ${
                      isMe ? 'bg-[#1a237e] text-white rounded-br-none' : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none'
                    }`}>
                      {msg.message}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <form onSubmit={sendChatMessage} className="flex gap-2">
            <input 
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-800 w-full outline-none focus:border-[#ff9800]"
            />
            <button 
              type="submit"
              className="bg-[#ff9800] hover:bg-orange-600 text-white px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer shrink-0 flex items-center justify-center"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>

        {/* CONDITION 1: SELLER VIEW */}
        {creatorRole === 'Seller' && (
          <div className="space-y-4 mb-6">
            {!isAccepted ? (
              <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-5 text-center shadow-sm">
                <UserCheck className="h-8 w-8 text-[#1a237e] mx-auto mb-2" />
                <h3 className="font-black text-[#1a237e] text-sm mb-1">Seller Action Required</h3>
                <p className="text-xs text-slate-600 mb-3">Set inspection/delivery duration (Days) and accept the deal.</p>
                
                <div className="mb-3 text-left">
                  <label className="text-[11px] font-bold text-slate-600 uppercase">Set Delivery / Inspection Days:</label>
                  <input 
                    type="number"
                    min={1}
                    max={30}
                    value={inspectionDays}
                    onChange={(e) => setInspectionDays(Number(e.target.value))}
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-800 mt-1 outline-none focus:border-[#ff9800]"
                  />
                </div>

                <button
                  onClick={sellerAcceptDeal}
                  className="w-full bg-[#1a237e] hover:bg-indigo-900 text-white font-black py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all shadow-md cursor-pointer"
                >
                  Accept Deal & Start Timer
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
                <p className="text-xs font-black text-emerald-800 uppercase">Deal Active & In Progress</p>
                <p className="text-[11px] text-emerald-600 mt-1">Inspection timer is running for the buyer.</p>
              </div>
            )}
          </div>
        )}

        {/* CONDITION 2: BUYER VIEW */}
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
                  Please transfer <span className="font-bold t

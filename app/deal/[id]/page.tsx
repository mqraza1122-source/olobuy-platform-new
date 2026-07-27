'use client';
import { useState, useEffect, Suspense } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { ShieldCheck, CheckCircle2, Wallet, MessageSquare, Send, Truck, UserCheck, Clock, Share2 } from 'lucide-react';

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
          </div>
        `,
      }),
    });
  } catch (error) {
    console.error('Email sending failed:', error);
  }
}

function DealContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params?.id;
  
  const roleQuery = searchParams.get('role');
  const [currentRole, setCurrentRole] = useState<string>(roleQuery ? roleQuery : 'Buyer');

  const [deal, setDeal] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  
  const [buyerPhone, setBuyerPhone] = useState<string>('');
  const [trackingNumber, setTrackingNumber] = useState<string>('');
  const [inspectionDays, setInspectionDays] = useState<number>(2);
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');

  useEffect(() => {
    if (roleQuery) {
      setCurrentRole(roleQuery);
    }
  }, [roleQuery]);

  useEffect(() => {
    if (id) {
      fetchDeal();
      fetchMessages();

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

    const { error } = await supabase.from('deal_chats').insert([
      {
        deal_code: id,
        sender_role: currentRole,
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
      alert('Deal accepted successfully!');
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
      alert('Tracking submitted successfully!');
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
      alert('Payment marked as secured!');
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
      alert('Payment Released Successfully!');
    }
  };

  const handleInvite = (targetRole: 'Buyer' | 'Seller') => {
    const baseUrl = window.location.origin + window.location.pathname;
    const inviteLink = `${baseUrl}?role=${targetRole.toLowerCase()}`;
    
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);

    const message = encodeURIComponent(`AOA! Please join OloBuy Escrow secure deal chat here: ${inviteLink}`);
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a] flex items-center justify-center text-[#ff9800] font-bold">
        Loading Escrow Portal...
      </div>
    );
  }

  if (!deal) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#0f172a] flex items-center justify-center text-white p-4">
        <div className="text-center bg-white/10 p-8 rounded-3xl">
          <h2 className="text-xl font-bold text-red-400">Deal Not Found</h2>
        </div>
      </div>
    );
  }

  const isCompleted = deal.status === 'completed';
  const isSecured = deal.status === 'secured' || deal.status === 'paid';
  const isShipped = deal.status === 'shipped';
  const isAccepted = deal.seller_accepted || deal.status === 'accepted';
  const isPending = !deal.status || deal.status === 'pending';

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-slate-900 p-4 sm:p-6 flex items-center justify-center font-sans">
      <div className="max-w-md w-full bg-white/95 backdrop-blur-2xl border border-white/40 rounded-[2.5rem] p-6 sm:p-8 shadow-2xl relative my-6">
        
        <header className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 mb-3">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span className="text-xs font-bold uppercase text-emerald-700">OloBuy Secure Escrow ({currentRole} View)</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900">Deal #{deal.deal_code}</h1>
          <p className="text-slate-500 text-sm mt-1 font-semibold">{deal.product_name || 'Verified Transaction'}</p>
        </header>

        {/* Escrow Status Bar */}
        <section className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 mb-6">
          <div className="flex justify-between items-center text-xs font-bold text-slate-500 mb-3">
            <span>Escrow Stage</span>
            <span className="text-[#ff9800] uppercase">{deal.status || 'pending'}</span>
          </div>
          <div className="grid grid-cols-4 gap-1.5">
            <div className="h-2 rounded-full bg-[#ff9800]"></div>
            <div className={`h-2 rounded-full ${isAccepted || isSecured || isCompleted ? 'bg-[#ff9800]' : 'bg-slate-200'}`}></div>
            <div className={`h-2 rounded-full ${isSecured || isCompleted ? 'bg-[#ff9800]' : 'bg-slate-200'}`}></div>
            <div className={`h-2 rounded-full ${isCompleted ? 'bg-emerald-500' : 'bg-slate-200'}`}></div>
          </div>
        </section>

        {/* Amount Card */}
        <section className="bg-slate-50 border border-slate-200/80 rounded-2xl p-5 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-slate-500 text-sm font-medium">Escrow Amount</span>
            <span className="text-2xl font-black text-[#ff9800]">Rs {Number(deal.amount || 0).toLocaleString()}</span>
          </div>
        </section>

        {/* Chat & Exact Invite Buttons */}
        <section className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-6">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-200">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-[#ff9800]" />
              <h3 className="font-black text-slate-800 text-xs uppercase">Secure Deal Chat (P2P)</h3>
            </div>
            
            {currentRole === 'Buyer' && (
              <button 
                onClick={() => handleInvite('Seller')}
                className="bg-[#1a237e] hover:bg-indigo-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer"
              >
                <Share2 className="h-3 w-3" />
                Invite seller in chat
              </button>
            )}

            {currentRole === 'Seller' && (
              <button 
                onClick={() => handleInvite('Buyer')}
                className="bg-[#ff9800] hover:bg-orange-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer"
              >
                <Share2 className="h-3 w-3" />
                Invite buyer in escrow chat
              </button>
            )}
          </div>

          {copied && (
            <div className="mb-3 bg-emerald-500/10 text-emerald-700 text-[10px] font-bold p-2 rounded-xl text-center">
              ✓ Invite link copied & WhatsApp opened!
            </div>
          )}

          <div className="h-40 overflow-y-auto space-y-2 mb-3 pr-1 text-xs">
            {messages.length === 0 ? (
              <p className="text-center text-slate-400 py-8">No messages yet.</p>
            ) : (
              messages.map((msg, index) => {
                const isMe = msg.sender_role === currentRole;
                return (
                  <div key={index} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                    <span className="text-[9px] font-bold text-slate-400">{msg.sender_role}</span>
                    <div className={`p-2.5 rounded-2xl max-w-[80%] ${isMe ? 'bg-[#1a237e] text-white' : 'bg-white border text-slate-800'}`}>
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
              className="bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs w-full outline-none focus:border-[#ff9800]"
            />
            <button type="submit" className="bg-[#ff9800] text-white px-4 py-2 rounded-xl cursor-pointer">
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </section>

        {/* Seller Controls */}
        {currentRole === 'Seller' && (
          <section className="space-y-4 mb-6">
            {!isAccepted ? (
              <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-5 text-center">
                <UserCheck className="h-8 w-8 text-[#1a237e] mx-auto mb-2" />
                <h3 className="font-black text-[#1a237e] text-sm mb-2">Seller Action Required</h3>
                <input 
                  type="number"
                  min={1}
                  max={30}
                  value={inspectionDays}
                  onChange={(e) => setInspectionDays(Number(e.target.value))}
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2 text-sm font-bold mb-3"
                />
                <button onClick={sellerAcceptDeal} className="w-full bg-[#1a237e] text-white py-3 rounded-xl text-xs uppercase font-black cursor-pointer">
                  Accept Deal & Start Timer
                </button>
              </div>
            ) : !isShipped && !isCompleted ? (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                <form onSubmit={submitTracking} className="space-y-3">
                  <input 
                    type="text"
                    placeholder="Enter Tracking / Details"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-sm"
                  />
                  <button type="submit" className="w-full bg-emerald-600 text-white py-3 rounded-xl text-xs uppercase font-black cursor-pointer">
                    Submit Tracking
                  </button>
                </form>
              </div>
            ) : null}
          </section>
        )}

        {/* Buyer Controls */}
        {currentRole === 'Buyer' && (
          <section className="space-y-4 mb-6">
            {!deal.buyer_phone && (
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4">
                <h3 className="font-black text-xs mb-2 uppercase">Enter Your Phone</h3>
                <form onSubmit={saveBuyerDetails} className="flex gap-2">
                  <input 
                    type="text"
                    placeholder="03001234567"
                    value={buyerPhone}
                    onChange={(e) => setBuyerPhone(e.target.value)}
                    className="bg-white border px-3 py-2 rounded-xl text-sm w-full"
                  />
                  <button type="submit" className="bg-[#1a237e] text-white px-4 py-2 rounded-xl text-xs font-bold">Save</button>
                </form>
              </div>
            )}

            {isPending && (
              <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5 text-center">
                <Wallet className="h-6 w-6 text-[#ff9800] mx-auto mb-2" />
                <p className="text-xs text-slate-600 mb-3">Transfer Rs {Number(deal.amount || 0).toLocaleString()} to OloBuy account.</p>
                <button onClick={markAsSecured} className="w-full bg-[#ff9800] text-white py-3 rounded-xl text-xs uppercase font-black cursor-pointer">
                  I Have Paid & Secured Amount
                </button>
              </div>
            )}

            {isShipped && timeLeft && (
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 text-center">
                <div className="grid grid-cols-4 gap-2 mb-4 text-xs">
                  <div className="bg-white p-2 rounded-xl"><span className="block font-black">{timeLeft.days}</span>Days</div>
                  <div className="bg-white p-2 rounded-xl"><span className="block font-black">{timeLeft.hours}</span>Hours</div>
                  <div className="bg-white p-2 rounded-xl"><span className="block font-black">{timeLeft.minutes}</span>Mins</div>
                  <div className="bg-white p-2 rounded-xl"><span className="block font-black">{timeLeft.seconds}</span>Secs</div>
                </div>
                <button onClick={releasePayment} className="w-full bg-emerald-600 text-white py-3 rounded-xl text-xs uppercase font-black cursor-pointer">
                  Release Payment
                </button>
              </div>
            )}
          </section>
        )}

      </div>
    </main>
  );
}

// FIX FOR VERCEL DEPLOYMENT BUILD ERROR (Suspense Wrapper)
export default function DealPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0f172a] text-[#ff9800] flex items-center justify-center font-bold">Loading...</div>}>
      <DealContent />
    </Suspense>
  );
         }

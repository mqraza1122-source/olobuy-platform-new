'use client';
import { useState, useEffect, Suspense } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { ShieldCheck, MessageSquare, Send, UserCheck, Share2, Building2, ExternalLink } from 'lucide-react';

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
          <div style="font-family: Arial, sans-serif; padding: 25px; background: #0f172a; color: #ffffff; border-radius: 16px;">
            <h2 style="color: #ff9800; margin-top: 0;">OloBuy Secure Escrow Activity</h2>
            <p style="font-size: 16px;"><strong>Deal Code:</strong> #${dealCode}</p>
            <p style="font-size: 16px;"><strong>Status / Action:</strong> <span style="color: #4ade80; font-weight: bold;">${actionType}</span></p>
            <p style="font-size: 16px;"><strong>Escrow Amount:</strong> Rs ${amount.toLocaleString()}</p>
            <hr style="border-color: #334155; margin: 20px 0;" />
            <p style="font-size: 12px; color: #94a3b8;">This is an automated notification from OloBuy Fintech Infrastructure.</p>
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
  
  const [trackingNumber, setTrackingNumber] = useState<string>('');
  const [inspectionDays, setInspectionDays] = useState<number>(2);
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [paymentDone, setPaymentDone] = useState<boolean>(false);

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

    const baseTime = new Date(deal.created_at || Date.now()).getTime();
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
      if (data?.inspection_days) setInspectionDays(data.inspection_days);
      if (data?.status === 'secured' || data?.status === 'paid') {
        setPaymentDone(true);
      }
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

  const sellerAcceptDeal = async () => {
    const { error } = await supabase
      .from('deals')
      .update({ 
        seller_accepted: true, 
        status: 'accepted',
        inspection_days: inspectionDays
      })
      .eq('deal_code', id);

    if (error) {
      alert('Error: ' + error.message);
      return;
    }

    setDeal({ ...deal, seller_accepted: true, status: 'accepted', inspection_days: inspectionDays });
    await sendAdminNotification(deal.deal_code, `Deal Accepted by Seller (${inspectionDays} Days Timer)`, deal.amount);
    alert('Deal accepted successfully!');
  };

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

    if (error) {
      alert('Error: ' + error.message);
      return;
    }

    setDeal({ ...deal, status: 'shipped' });
    await sendAdminNotification(deal.deal_code, 'Item Shipped / Tracking Submitted', deal.amount);
    alert('Tracking submitted successfully!');
  };

  const markAsSecured = async () => {
    try {
      const { error } = await supabase
        .from('deals')
        .update({ status: 'secured' })
        .eq('deal_code', id);

      if (error) {
        alert('Database Update Failed: ' + error.message);
        return;
      }

      setDeal((prev: any) => ({ ...prev, status: 'secured' }));
      setPaymentDone(true);
      await sendAdminNotification(deal.deal_code, 'Payment Secured by Buyer', deal.amount);
      alert('Payment marked as secured successfully! Admin notified via email.');
    } catch (err: any) {
      alert('Unexpected Error: ' + err.message);
    }
  };

  const releasePayment = async () => {
    const { error } = await supabase
      .from('deals')
      .update({ status: 'completed' })
      .eq('deal_code', id);

    if (error) {
      alert('Error: ' + error.message);
      return;
    }

    setDeal({ ...deal, status: 'completed' });
    await sendAdminNotification(deal.deal_code, 'Payment Released to Seller (Completed)', deal.amount);
    alert('Payment Released Successfully!');
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

  const openWhatsAppForScreenshot = () => {
    const adminNumber = '923001234567'; // اپنا واٹس ایپ نمبر یہاں درج کریں
    const text = encodeURIComponent(`Hello OloBuy Admin, I have paid Rs ${Number(deal.amount || 0).toLocaleString()} for Deal #${deal.deal_code}. Here is my payment screenshot:`);
    window.open(`https://wa.me/${adminNumber}?text=${text}`, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center text-[#ff9800] font-bold text-sm tracking-widest uppercase">
        Loading OloBuy Secure Escrow...
      </div>
    );
  }

  if (!deal) {
    return (
      <div className="min-h-screen bg-[#0b0f19] flex items-center justify-center text-white p-4">
        <div className="text-center bg-slate-900/80 border border-slate-800 p-8 rounded-3xl">
          <h2 className="text-lg font-bold text-red-400">Deal Not Found</h2>
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
    <main className="min-h-screen bg-gradient-to-br from-[#0b0f19] via-[#111827] to-[#0b0f19] text-slate-100 p-4 sm:p-6 flex items-center justify-center font-sans">
      <div className="max-w-md w-full bg-slate-900/90 backdrop-blur-2xl border border-slate-800/80 rounded-[2.5rem] p-6 sm:p-8 shadow-2xl relative my-6">
        
        {/* Header */}
        <header className="text-center mb-6">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 mb-3">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">OloBuy Secure Escrow ({currentRole})</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white">Deal #{deal.deal_code}</h1>
          <p className="text-slate-400 text-xs mt-1 font-medium">{deal.product_name || 'Verified P2P Transaction'}</p>
        </header>

        {/* Progress Stage Bar */}
        <section className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4 mb-6">
          <div className="flex justify-between items-center text-xs font-bold text-slate-400 mb-3">
            <span>Escrow Stage</span>
            <span className="text-[#ff9800] uppercase tracking-wider">{deal.status || 'pending'}</span>
          </div>
          <div className="grid grid-cols-4 gap-1.5">
            <div className="h-2 rounded-full bg-[#ff9800]"></div>
            <div className={`h-2 rounded-full ${isAccepted || isSecured || isCompleted ? 'bg-[#ff9800]' : 'bg-slate-700'}`}></div>
            <div className={`h-2 rounded-full ${isSecured || isCompleted ? 'bg-[#ff9800]' : 'bg-slate-700'}`}></div>
            <div className={`h-2 rounded-full ${isCompleted ? 'bg-emerald-500' : 'bg-slate-700'}`}></div>
          </div>
        </section>

        {/* Amount Card */}
        <section className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5 mb-6">
          <div className="flex justify-between items-center">
            <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">Escrow Amount</span>
            <span className="text-2xl font-black text-[#ff9800]">Rs {Number(deal.amount || 0).toLocaleString()}</span>
          </div>
        </section>

        {/* Buyer Payment Section */}
        {currentRole === 'Buyer' && (
          <section className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5 shadow-lg mb-6">
            <div className="flex items-center gap-2 mb-3">
              <Building2 className="h-5 w-5 text-[#ff9800]" />
              <h3 className="font-bold text-white text-xs uppercase tracking-wider">OloBuy Official Escrow Account</h3>
            </div>
            
            <div className="bg-slate-900/90 border border-amber-500/20 rounded-xl p-3.5 mb-4 text-xs space-y-2">
              <p className="text-slate-400 font-medium">Transfer via JazzCash / EasyPaisa / Bank:</p>
              <p className="font-bold text-slate-200">Account Title: <span className="text-indigo-400">OloBuy Escrow Services</span></p>
              <p className="font-bold text-slate-200">Account / IBAN: <span className="text-emerald-400 select-all">PK03 OLOBUY 0000 12345678</span></p>
              <p className="font-bold text-slate-200">JazzCash / EasyPaisa: <span className="text-[#ff9800] select-all">0300-1234567</span></p>
            </div>

            <p className="text-xs text-slate-300 mb-4 font-medium leading-relaxed">
              Transfer <span className="font-bold text-white">Rs {Number(deal.amount || 0).toLocaleString()}</span> to the account above, then click below to secure.
            </p>

            {!paymentDone ? (
              <button 
                type="button"
                onClick={markAsSecured} 
                className="w-full bg-[#ff9800] hover:bg-orange-600 text-white py-3.5 rounded-xl text-xs uppercase font-black tracking-widest shadow-md cursor-pointer transition-all"
              >
                I Have Paid & Secured Amount
              </button>
            ) : (
              <div className="space-y-3">
                <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold p-3 rounded-xl text-center">
                  ✓ Payment marked as secured & admin notified!
                </div>
                <button 
                  type="button"
                  onClick={openWhatsAppForScreenshot}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-xl text-xs uppercase font-black tracking-widest shadow-md cursor-pointer flex items-center justify-center gap-2 transition-all"
                >
                  <ExternalLink className="h-4 w-4" />
                  Share Payment Screenshot on WhatsApp
                </button>
              </div>
            )}
          </section>
        )}

        {/* Secure Chat & Invite Section */}
        <section className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-4 mb-6">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-700/80">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-[#ff9800]" />
              <h3 className="font-bold text-slate-200 text-xs uppercase tracking-wider">Secure Deal Chat</h3>
            </div>
            
            {currentRole === 'Buyer' && (
              <button 
                onClick={() => handleInvite('Seller')}
                className="bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer transition-all"
              >
                <Share2 className="h-3 w-3" />
                Invite seller
              </button>
            )}

            {currentRole === 'Seller' && (
              <button 
                onClick={() => handleInvite('Buyer')}
                className="bg-[#ff9800] hover:bg-orange-600 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer transition-all"
              >
                <Share2 className="h-3 w-3" />
                Invite buyer
              </button>
            )}
          </div>

          {copied && (
            <div className="mb-3 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold p-2 rounded-xl text-center">
              ✓ Invite link copied & WhatsApp opened!
            </div>
          )}

          <div className="h-40 overflow-y-auto space-y-2 mb-3 pr-1 text-xs">
            {messages.length === 0 ? (
              <p className="text-center text-slate-500 py-8 font-medium">No messages yet.</p>
            ) : (
              messages.map((msg, index) => {
                const isMe = msg.sender_role === currentRole;
                return (
                  <div key={index} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                    <span className="text-[9px] font-bold text-slate-500 mb-0.5">{msg.sender_role}</span>
                    <div className={`p-2.5 rounded-2xl max-w-[80%] ${isMe ? 'bg-indigo-600 text-white font-medium' : 'bg-slate-800 border border-slate-700 text-slate-200'}`}>
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
              placeholder="Type a secure message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs w-full text-slate-100 placeholder-slate-500 outline-none focus:border-[#ff9800]"
            />
            <button type="submit" className="bg-[#ff9800] hover:bg-orange-600 text-white px-4 py-2 rounded-xl cursor-pointer transition-all">
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </section>

        {/* Seller Controls */}
        {currentRole === 'Seller' && (
          <section className="space-y-4 mb-6">
            {!isAccepted ? (
              <div className="bg-slate-800/60 border border-indigo-500/30 rounded-2xl p-5 text-center">
                <UserCheck className="h-8 w-8 text-indigo-400 mx-auto mb-2" />
                <h3 className="font-bold text-white text-xs uppercase tracking-wider mb-2">Seller Action Required</h3>
                <input 
                  type="number"
                  min={1}
                  max={30}
                  value={inspectionDays}
                  onChange={(e) => setInspectionDays(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl px-4 py-2 text-sm font-bold mb-3 text-center"
                />
                <button onClick={sellerAcceptDeal} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl text-xs uppercase font-black tracking-widest cursor-pointer transition-all">
                  Accept Deal & Start Timer
                </button>
              </div>
            ) : !isShipped && !isCompleted ? (
              <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5">
                <form onSubmit={submitTracking} className="space-y-3">
                  <input 
                    type="text"
                    placeholder="Enter Tracking / Courier Details"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-white placeholder-slate-500 rounded-xl px-4 py-2.5 text-xs"
                  />
                  <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl text-xs uppercase font-black tracking-widest cursor-pointer transition-all">
                    Submit Tracking
                  </button>
                </form>
              </div>
            ) : null}
          </section>
        )}

        {/* Buyer Release Controls */}
        {currentRole === 'Buyer' && isShipped && timeLeft && (
          <section className="space-y-4 mb-6">
            <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-5 text-center">
              <div className="grid grid-cols-4 gap-2 mb-4 text-xs">
                <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800"><span className="block font-black text-white text-white text-sm">{timeLeft.days}</span>Days</div>
                <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800"><span className="block font-black text-white text-sm">{timeLeft.hours}</span>Hours</div>
                <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800"><span className="block font-black text-white text-sm">{timeLeft.minutes}</span>Mins</div>
                <div className="bg-slate-900 p-2.5 rounded-xl border border-slate-800"><span className="block font-black text-white text-sm">{timeLeft.seconds}</span>Secs</div>
              </div>
              <button onClick={releasePayment} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-xl text-xs uppercase font-black tracking-widest cursor-pointer transition-all">
                Release Payment to Seller
              </button>
            </div>
          </section>
        )}

      </div>
    </main>
  );
}

export default function DealPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0b0f19] text-[#ff9800] flex items-center justify-center font-bold text-xs uppercase tracking-widest">Loading...</div>}>
      <DealContent />
    </Suspense>
  );
}

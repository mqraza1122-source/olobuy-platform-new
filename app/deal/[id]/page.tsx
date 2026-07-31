'use client';
import { useState, useEffect, Suspense } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { ShieldCheck, MessageSquare, Send, Building2, ExternalLink, Check, AlertCircle, Copy, Key } from 'lucide-react';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function DealContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const rawId = params?.code || params?.id;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;
  
  const roleQuery = searchParams.get('role');
  const [currentRole, setCurrentRole] = useState<string>(roleQuery ? roleQuery : 'Buyer');

  const [deal, setDeal] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  
  const [buyerPhone, setBuyerPhone] = useState<string>('');
  const [verificationPin, setVerificationPin] = useState<string>('');
  const [courierInfo, setCourierInfo] = useState<string>('');
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');

  const adminWhatsApp = '923043031572';
  const oloAccountNum = '03043031572';

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
            if (payload && payload.new) {
              setMessages((prev) => [...prev, payload.new]);
            }
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
    try {
      const { data, error } = await supabase
        .from('deals')
        .select('*')
        .eq('deal_code', id)
        .single();

      if (error) {
        setDeal(null);
      } else {
        setDeal(data);
        if (data?.buyer_phone) setBuyerPhone(data.buyer_phone);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
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

  const saveBuyerPhone = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase
      .from('deals')
      .update({ buyer_phone: buyerPhone })
      .eq('deal_code', id);

    if (error) {
      alert('Error: ' + error.message);
      return;
    }
    setDeal((prev: any) => ({ ...prev, buyer_phone: buyerPhone }));
    alert('Phone number saved successfully!');
  };

  const sendPaymentProofWhatsApp = () => {
    if (!deal) return;
    const text = encodeURIComponent(`Hello OloBuy Admin, here is the payment screenshot/proof for Deal #${deal.deal_code}. Amount: Rs ${deal.amount}. Please verify and secure.`);
    window.open(`https://wa.me/${adminWhatsApp}?text=${text}`, '_blank');
  };

  const verifyPin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verificationPin || verificationPin.length < 4) {
      alert('Please enter a valid 4-digit PIN');
      return;
    }

    if (deal.verification_pin && deal.verification_pin !== verificationPin) {
      alert('Invalid Verification PIN provided by Admin.');
      return;
    }

    const { error } = await supabase
      .from('deals')
      .update({ status: 'secured' })
      .eq('deal_code', id);

    if (error) {
      alert('Error verifying: ' + error.message);
      return;
    }
    setDeal((prev: any) => ({ ...prev, status: 'secured' }));
    alert('Payment secured successfully!');
  };

  const submitShipping = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!courierInfo || !courierInfo.trim()) return;

    const { error } = await supabase
      .from('deals')
      .update({ status: 'shipped', shipping_info: courierInfo })
      .eq('deal_code', id);

    if (error) {
      alert('Error: ' + error.message);
      return;
    }
    setDeal((prev: any) => ({ ...prev, status: 'shipped', shipping_info: courierInfo }));
    alert('Shipping info submitted and buyer notified!');
  };

  const sendChatMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage || !newMessage.trim()) return;

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

  const releasePayment = async () => {
    if (!deal) return;
    const { error } = await supabase
      .from('deals')
      .update({ status: 'completed' })
      .eq('deal_code', id);

    if (error) {
      alert('Error: ' + error.message);
      return;
    }

    setDeal((prev: any) => ({ ...prev, status: 'completed' }));
    
    const text = encodeURIComponent(`Hello OloBuy Team, I have confirmed the product for Deal #${deal.deal_code}. Payment released to seller. Thank you!`);
    window.open(`https://wa.me/${adminWhatsApp}?text=${text}`, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#07090e] flex items-center justify-center text-[#ff9800] font-bold text-xs tracking-widest uppercase">
        Loading OloBuy Secure Escrow...
      </div>
    );
  }

  if (!deal) {
    return (
      <div className="min-h-screen bg-[#07090e] flex items-center justify-center text-white p-4">
        <div className="text-center bg-[#0d1322] border border-slate-800/80 p-8 rounded-3xl shadow-2xl">
          <AlertCircle className="h-10 w-10 text-red-400 mx-auto mb-3" />
          <h2 className="text-sm font-bold text-red-400 uppercase tracking-wider">Deal Not Found</h2>
        </div>
      </div>
    );
  }

  const dealStatus = deal?.status || 'pending';
  const isCompleted = dealStatus === 'completed';
  const isSecured = dealStatus === 'secured' || dealStatus === 'paid';
  const isShipped = dealStatus === 'shipped';

  return (
    <main className="min-h-screen bg-[#07090e] text-slate-100 p-4 sm:p-6 flex items-center justify-center font-sans antialiased">
      <div className="max-w-md w-full bg-[#0d1322]/95 backdrop-blur-xl border border-slate-800/80 rounded-[2.5rem] p-6 sm:p-8 shadow-2xl relative my-6 space-y-6">
        
        <header className="text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 mb-3 shadow-inner">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">OloBuy Secure Escrow ({currentRole})</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white mb-1">Deal #{deal?.deal_code}</h1>
          <p className="text-xs text-slate-400 font-medium capitalize">{deal?.product_name || 'E-commerce parcel'}</p>
        </header>

        <section className="bg-[#121b2f] border border-slate-800 rounded-2xl p-4 shadow-lg space-y-2 text-xs">
          <div className="flex justify-between items-center text-slate-400 font-bold border-b border-slate-800 pb-2">
            <span>SELLER DETAILS</span>
            <span className="text-[#ff9800]">{deal?.seller_name || 'Seller'}</span>
          </div>
          <div className="flex justify-between items-center text-slate-300 pt-1">
            <span>Contact:</span>
            <span className="font-mono">{deal?.seller_contact || 'N/A'}</span>
          </div>
          <div className="flex justify-between items-center text-slate-300">
            <span>Account #:</span>
            <span className="font-mono text-[#ff9800]">{deal?.seller_account || 'N/A'}</span>
          </div>
        </section>

        <section className="bg-[#121b2f] border border-slate-800 rounded-2xl p-4 shadow-lg">
          <div className="flex justify-between items-center text-xs font-bold text-slate-400 mb-3">
            <span>Escrow Stage</span>
            <span className="text-[#ff9800] uppercase tracking-wider">{dealStatus}</span>
          </div>
          <div className="grid grid-cols-4 gap-1.5">
            <div className="h-2 rounded-full bg-[#ff9800] shadow-[0_0_6px_rgba(255,152,0,0.5)]"></div>
            <div className={`h-2 rounded-full ${isSecured || isShipped || isCompleted ? 'bg-[#ff9800] shadow-[0_0_6px_rgba(255,152,0,0.5)]' : 'bg-slate-800'}`}></div>
            <div className={`h-2 rounded-full ${isShipped || isCompleted ? 'bg-[#ff9800] shadow-[0_0_6px_rgba(255,152,0,0.5)]' : 'bg-slate-800'}`}></div>
            <div className={`h-2 rounded-full ${isCompleted ? 'bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.5)]' : 'bg-slate-800'}`}></div>
          </div>
          <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 mt-2 uppercase">
            <span>Created</span>
            <span>Accepted</span>
            <span>Secured</span>
            <span>Done</span>
          </div>
        </section>

        <section className="bg-[#121b2f] border border-slate-800 rounded-2xl p-5 shadow-lg space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">Escrow Amount</span>
            <span className="text-2xl font-black text-[#ff9800] drop-shadow-sm">Rs {Number(deal?.amount || 0).toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-slate-800/80">
            <span className="text-slate-400 text-xs">Transaction Status</span>
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${isCompleted ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : isSecured ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' : 'bg-[#ff9800]/10 text-[#ff9800] border border-[#ff9800]/20'}`}>
              {dealStatus}
            </span>
          </div>
        </section>

        {/* ================= BUYER VIEW ================= */}
        {currentRole === 'Buyer' && !isCompleted && (
          <div className="space-y-4">
            <section className="bg-[#121b2f] border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">Step 1: Enter Your Phone Number</div>
              <form onSubmit={saveBuyerPhone} className="flex gap-2">
                <input 
                  type="text"
                  placeholder="03001234567"
                  value={buyerPhone}
                  onChange={(e) => setBuyerPhone(e.target.value)}
                  className="flex-1 bg-[#0a0f1c] border border-slate-700/80 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-[#ff9800]"
                  required
                />
                <button type="submit" className="bg-[#1a237e] hover:bg-[#283593] text-white px-5 rounded-xl font-bold text-xs uppercase cursor-pointer shadow-md">
                  Save
                </button>
              </form>
            </section>

            {!isSecured && (
              <>
                <section className="bg-gradient-to-br from-[#121b2f] to-[#1a120b] border border-[#ff9800]/30 rounded-2xl p-5 shadow-xl space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-[#ff9800] uppercase tracking-wider">
                    <Building2 className="h-4 w-4" />
                    <span>Send Payment to OloBuy Official Account</span>
                  </div>
                  <p className="text-slate-300 text-xs">
                    Please transfer <strong className="text-[#ff9800]">Rs {Number(deal?.amount || 0).toLocaleString()}</strong> to the account below and send screenshot on WhatsApp.
                  </p>
                  
                  <div className="bg-[#0a0f1c] p-3.5 rounded-xl border border-slate-800 flex items-center justify-between">
                    <div className="text-xs space-y-0.5">
                      <span className="text-[10px] text-slate-400 font-bold uppercase block">Easypaisa / JazzCash</span>
                      <strong className="text-white text-sm select-all">{oloAccountNum}</strong>
                      <span className="text-[10px] text-slate-400 block">(OloBuy Escrow)</span>
                    </div>
                    <button 
                      type="button"
                      onClick={() => { navigator.clipboard.writeText(oloAccountNum); alert('Account number copied!'); }}
                      className="bg-[#ff9800] hover:bg-[#e08600] text-[#0f172a] px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer transition-all shadow-md"
                    >
                      <Copy className="h-3.5 w-3.5" /> Copy
                    </button>
                  </div>

                  <button 
                    type="button"
                    onClick={sendPaymentProofWhatsApp}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-xl text-xs uppercase font-black tracking-wider shadow-lg cursor-pointer flex items-center justify-center gap-2 transition-all"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Send Payment Proof on WhatsApp
                  </button>
                </section>

                <section className="bg-[#121b2f] border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
                    <Key className="h-4 w-4 text-[#ff9800]" />
                    <span>Have you received PIN from Admin?</span>
                  </div>
                  <p className="text-[11px] text-slate-400">Enter the 4-digit verification PIN provided on WhatsApp after payment approval.</p>
                  <form onSubmit={verifyPin} className="flex gap-2">
                    <input 
                      type="text"
                      maxLength={4}
                      placeholder="Enter PIN"
                      value={verificationPin}
                      onChange={(e) => setVerificationPin(e.target.value)}
                      className="flex-1 bg-[#0a0f1c] border border-slate-700/80 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-[#ff9800] tracking-widest text-center font-bold"
                      required
                    />
                    <button type="submit" className="bg-[#ff9800] hover:bg-[#e08600] text-[#0f172a] px-5 rounded-xl font-black text-xs uppercase cursor-pointer shadow-md">
                      Verify
                    </button>
                  </form>
                </section>
              </>
            )}

            {isSecured && (
              <section className="bg-[#121b2f] border border-slate-800 rounded-2xl p-5 shadow-xl text-center space-y-4">
                <div className="flex items-center justify-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider">
                  <Check className="h-4 w-4" />
                  <span>Funds Secured in Escrow</span>
                </div>
                {timeLeft && (
                  <div className="grid grid-cols-4 gap-2 text-xs">
                    <div className="bg-[#0a0f1c] p-2.5 rounded-xl border border-slate-800"><span className="block font-black text-white text-sm">{timeLeft.days}</span>Days</div>
                    <div className="bg-[#0a0f1c] p-2.5 rounded-xl border border-slate-800"><span className="block font-black text-white text-sm">{timeLeft.hours}</span>Hours</div>
                    <div className="bg-[#0a0f1c] p-2.5 rounded-xl border border-slate-800"><span className="block font-black text-white text-sm">{timeLeft.minutes}</span>Mins</div>
                    <div className="bg-[#0a0f1c] p-2.5 rounded-xl border border-slate-800"><span className="block font-black text-white text-sm">{timeLeft.seconds}</span>Secs</div>
                  </div>
                )}
                <button 
                  type="button"
                  onClick={releasePayment} 
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-xl text-xs uppercase font-black tracking-widest shadow-lg cursor-pointer flex items-center justify-center gap-2 transition-all"
                >
                  <ExternalLink className="h-4 w-4" />
                  Release Payment to Seller
                </button>
              </section>
            )}
          </div>
        )}

        {/* ================= SELLER VIEW ================= */}
        {currentRole === 'Seller' && isSecured && !isCompleted && (
          <section className="bg-[#121b2f] border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
            <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">Submit Shipping / Service Delivery</div>
            <form onSubmit={submitShipping} className="space-y-2">
              <input 
                type="text"
                placeholder="Enter Courier Name / Tracking / Details"
                value={courierInfo}
                onChange={(e) => setCourierInfo(e.target.value)}
                className="w-full bg-[#0a0f1c] border border-slate-700/80 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-[#ff9800]"
                required
              />
              <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl font-bold text-xs uppercase cursor-pointer shadow-md">
                Notify Buyer & Submit
              </button>
            </form>
          </section>
        )}

        {isCompleted && (
          <section className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-5 text-center space-y-2">
            <Check className="h-8 w-8 text-emerald-400 mx-auto" />
            <h3 className="text-sm font-bold text-emerald-400 uppercase">Deal Completed Successfully</h3>
            <p className="text-xs text-slate-300">Funds have been securely released to the seller.</p>
          </section>
        )}

        <section className="bg-[#121b2f] border border-slate-800 rounded-2xl p-4 shadow-lg space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
              <MessageSquare className="h-4 w-4 text-[#ff9800]" />
              <span>Secure Deal Chat (P2P)</span>
            </div>
          </div>
          
          <div className="bg-[#0a0f1c] h-40 overflow-y-auto rounded-xl p-3 border border-slate-800/80 space-y-2 text-xs">
            {messages.length === 0 ? (
              <p className="text-slate-500 text-center py-10">No messages yet. Start conversation below!</p>
            ) : (
              messages.map((msg, idx) => (
                <div key={idx} className={`flex flex-col ${msg.sender_role === currentRole ? 'items-end' : 'items-start'}`}>
                  <span className="text-[9px] text-slate-500 mb-0.5">{msg.sender_role}</span>
                  <div className={`p-2.5 rounded-xl max-w-[85%] ${msg.sender_role === currentRole ? 'bg-[#ff9800] text-[#0f172a] font-medium' : 'bg-slate-800 text-slate-200'}`}>
                    {msg.message}
                  </div>
                </div>
              ))
            )}
          </div>

          <form onSubmit={sendChatMessage} className="flex gap-2">
            <input 
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 bg-[#0a0f1c] border border-slate-800 rounded-xl px-3 py-2.5 text-xs text-white outline-none focus:border-[#ff9800]"
            />
            <button type="submit" className="bg-[#ff9800] hover:bg-[#e08600] text-[#0f172a] px-4 rounded-xl font-bold cursor-pointer transition-all shadow-md">
              <Send className="h-4 w-4" />
            </button>
          </form>
        </section>

      </div>
    </main>
  );
}

export default function DealPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#07090e] text-[#ff9800] flex items-center justify-center font-bold text-xs uppercase tracking-widest">Loading...</div>}>
      <DealContent />
    </Suspense>
  );
      }

'use client';
import { useState, useEffect, Suspense } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { ShieldCheck, MessageSquare, Send, Share2, Building2, ExternalLink, ChevronDown, ChevronUp, Edit3, Check, Clock, AlertCircle, Lock } from 'lucide-react';

function DealContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params?.id;
  
  const roleQuery = searchParams.get('role');
  const [currentRole, setCurrentRole] = useState<string>(
    roleQuery ? roleQuery.charAt(0).toUpperCase() + roleQuery.slice(1).toLowerCase() : 'Buyer'
  );

  const [deal, setDeal] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [copied, setCopied] = useState<boolean>(false);
  const [detailsOpen, setDetailsOpen] = useState<boolean>(true);
  const [isEditingSeller, setIsEditingSeller] = useState<boolean>(false);
  
  const [sellerName, setSellerName] = useState<string>('');
  const [sellerContact, setSellerContact] = useState<string>('');
  const [sellerAccount, setSellerAccount] = useState<string>('');
const [inspectionDays, setInspectionDays] = useState<any>('');
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [isCodeVerified, setIsCodeVerified] = useState<boolean>(false);
  const [adminCodeInput, setAdminCodeInput] = useState<string>('');

  const adminWhatsApp = '923043031572';

  useEffect(() => {
    if (roleQuery) {
      const fixed = roleQuery.charAt(0).toUpperCase() + roleQuery.slice(1).toLowerCase();
      setCurrentRole(fixed);
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
    const daysAllowed = Number(deal.inspection_days || 0);
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
      if (data?.seller_name) setSellerName(data.seller_name);
      if (data?.seller_contact) setSellerContact(data.seller_contact);
      if (data?.seller_account) setSellerAccount(data.seller_account);
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

  const saveSellerDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase
      .from('deals')
      .update({
        seller_name: sellerName,
        seller_contact: sellerContact,
        seller_account: sellerAccount,
        inspection_days: inspectionDays,
      })
      .eq('deal_code', id);

    if (error) {
      alert('Error updating details: ' + error.message);
      return;
    }

    setDeal({ ...deal, seller_name: sellerName, seller_contact: sellerContact, seller_account: sellerAccount, inspection_days: inspectionDays });
    setIsEditingSeller(false);
    alert('Details updated successfully!');
  };

  const sendChatMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    await supabase.from('deal_chats').insert([
      {
        deal_code: id,
        sender_role: currentRole,
        message: newMessage.trim(),
      },
    ]);
    setNewMessage('');
  };

  const verifyAdminCode = () => {
    if (adminCodeInput.trim().length > 0) {
      setIsCodeVerified(true);
    } else {
      alert('Please enter a valid verification code.');
    }
  };

  const handlePaidClick = () => {
    const sName = deal?.seller_name || sellerName || 'Not Provided';
    const sContact = deal?.seller_contact || sellerContact || 'Not Provided';
    const sAccount = deal?.seller_account || sellerAccount || 'Not Provided';
    const sTime = deal?.inspection_days || inspectionDays || ;
    const prodName = deal?.product_name || 'Gaming accounts';
    const amt = Number(deal?.amount || 0).toLocaleString();

    const text = encodeURIComponent(
`Hello OloBuy Team, I have paid Rs ${amt} for Deal #${deal?.deal_code}.

📦 Product: ${prodName}
👤 Seller Name: ${sName}
📞 Seller Contact: ${sContact}
🏦 Seller Account #: ${sAccount}
⏳ Inspection Time: ${sTime} Days

Here is my payment screenshot:`
    );
    window.open(`https://wa.me/${adminWhatsApp}?text=${text}`, '_blank');
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
    const text = encodeURIComponent(`Hello OloBuy Team, I have confirmed the product for Deal #${deal?.deal_code}. Please release the payment to seller.`);
    window.open(`https://wa.me/${adminWhatsApp}?text=${text}`, '_blank');
  };

  const handleInvite = (targetRole: 'Buyer' | 'Seller') => {
    const baseUrl = window.location.origin + window.location.pathname;
    const inviteLink = `${baseUrl}?role=${targetRole.toLowerCase()}`;
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
    const message = encodeURIComponent(`AOA! Please join OloBuy secure deal chat here: ${inviteLink}`);
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  if (loading) {
  return (
    <div className="min-h-screen bg-[#07090e] flex flex-col items-center justify-center px-6">
      {/* Spinner */}
      <div className="relative mb-6">
        <div className="h-14 w-14 rounded-full border-[3px] border-white/10 border-t-[#ff9800] animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-6 w-6 rounded-full bg-[#ff9800]/20" />
        </div>
      </div>

      <p className="text-[#ff9800] font-black text-sm tracking-[0.2em] uppercase">
        OloBuy
      </p>
      <p className="mt-2 text-white/50 text-xs font-medium tracking-wide">
        Preparing your secure deal...
      </p>
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

  const isCompleted = deal.status === 'completed';

  return (
    <main className="min-h-screen bg-[#07090e] text-slate-100 p-4 sm:p-6 flex items-center justify-center font-sans antialiased">
      <div className="max-w-md w-full bg-[#0d1322]/95 backdrop-blur-xl border border-slate-800/80 rounded-[2.5rem] p-6 sm:p-8 shadow-2xl relative my-6 space-y-6">
        
        {/* ================= 1. TOP: Deal Code, Product Details, Seller Details & Time Set ================= */}
        <header className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 shadow-inner">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">OloBuy Secure Escrow ({currentRole})</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white">Deal #{deal.deal_code}</h1>
          
          <div className="bg-[#121b2f] border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
            <button
              onClick={() => setDetailsOpen(!detailsOpen)}
              className="w-full px-4 py-3.5 flex items-center justify-between text-left cursor-pointer hover:bg-slate-800/50 transition-all"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff9800]"></span>
                <span className="text-xs font-bold text-white uppercase truncate max-w-[210px]">
                  {deal.product_name || 'Gaming accounts'}
                </span>
              </div>
              {detailsOpen ? <ChevronUp className="h-4 w-4 text-[#ff9800]" /> : <ChevronDown className="h-4 w-4 text-[#ff9800]" />}
            </button>

            {detailsOpen && (
              <div className="px-4 pb-4 pt-2 border-t border-slate-800/80 bg-[#0a0f1c] text-left space-y-3 text-xs">
                <div className="flex justify-between items-center pb-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400 font-medium">Product:</span>
                  <span className="font-bold text-white">{deal.product_name || 'Gaming accounts'}</span>
                </div>

                {!isEditingSeller ? (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 font-medium">Seller Name:</span>
                      <span className="font-bold text-slate-200">{deal.seller_name || 'Not Provided'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 font-medium">Seller Contact:</span>
                      <span className="font-bold text-slate-200 select-all">{deal.seller_contact || 'Not Provided'}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-400 font-medium">Seller Account #:</span>
                      <span className="font-bold text-[#ff9800] select-all">{deal.seller_account || 'Not Provided'}</span>
                    </div>
                    <div className="flex justify-between items-center pb-1">
                      <span className="text-slate-400 font-medium">Inspection Time:</span>
                      <span className="font-bold text-emerald-400">{deal.inspection_days || 2} Days</span>
                    </div>
                    <button
                      onClick={() => setIsEditingSeller(true)}
                      className="w-full mt-1 bg-[#121b2f] hover:bg-slate-800 text-indigo-400 py-2.5 rounded-xl text-[11px] font-bold uppercase flex items-center justify-center gap-1.5 border border-indigo-500/20"
                    >
                      <Edit3 className="h-3.5 w-3.5" /> Edit Details & Time
                    </button>
                  </>
                ) : (
                  <form onSubmit={saveSellerDetails} className="space-y-3 pt-1">
                    <div>
                      <label className="text-[10px] text-slate-400 font-bold uppercase">Seller Name</label>
                      <input 
                        type="text" value={sellerName} onChange={(e) => setSellerName(e.target.value)}
                        className="w-full bg-[#07090e] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white mt-1 outline-none" required
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 font-bold uppercase">Seller Contact</label>
                      <input 
                        type="text" value={sellerContact} onChange={(e) => setSellerContact(e.target.value)}
                        className="w-full bg-[#07090e] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white mt-1 outline-none" required
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 font-bold uppercase">Seller Account #</label>
                      <input 
                        type="text" value={sellerAccount} onChange={(e) => setSellerAccount(e.target.value)}
                        className="w-full bg-[#07090e] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white mt-1 outline-none" required
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 font-bold uppercase">Inspection Time (Days)</label>
                      <input 
                        type="number" min={1} max={30} value={inspectionDays} onChange={(e) => setInspectionDays(Number(e.target.value))}
                        className="w-full bg-[#07090e] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white mt-1 outline-none" required
                      />
                    </div>
                    <div className="flex gap-2 pt-1">
                      <button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl font-bold uppercase text-[10px] flex items-center justify-center gap-1">
                        <Check className="h-3 w-3" /> Save
                      </button>
                      <button type="button" onClick={() => setIsEditingSeller(false)} className="bg-slate-800 text-slate-300 px-4 py-2.5 rounded-xl font-bold uppercase text-[10px]">
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </header>

        {/* ================= VIP GLOBAL LEVEL COUNTDOWN & RELEASE BUTTON (SHOWN AFTER ADMIN CODE VERIFICATION) ================= */}
        {isCodeVerified && currentRole === 'Buyer' && !isCompleted && timeLeft && (
          <section className="bg-gradient-to-br from-[#121b2f] to-[#0a0f1c] border-2 border-emerald-500/50 rounded-3xl p-6 shadow-2xl text-center space-y-5 relative overflow-hidden">
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl"></div>
            
            <div className="flex items-center justify-center gap-2 text-xs font-black text-emerald-400 uppercase tracking-widest">
              <Clock className="h-4 w-4 animate-pulse" />
              <span>Secure Inspection Countdown</span>
            </div>

            <div className="grid grid-cols-4 gap-2.5">
              <div className="bg-[#07090e] p-3 rounded-2xl border border-emerald-500/20 shadow-inner">
                <span className="block font-black text-white text-lg tracking-tight">{timeLeft.days}</span>
                <span className="text-[9px] text-slate-400 uppercase font-bold">Days</span>
              </div>
              <div className="bg-[#07090e] p-3 rounded-2xl border border-emerald-500/20 shadow-inner">
                <span className="block font-black text-white text-lg tracking-tight">{timeLeft.hours}</span>
                <span className="text-[9px] text-slate-400 uppercase font-bold">Hours</span>
              </div>
              <div className="bg-[#07090e] p-3 rounded-2xl border border-emerald-500/20 shadow-inner">
                <span className="block font-black text-white text-lg tracking-tight">{timeLeft.minutes}</span>
                <span className="text-[9px] text-slate-400 uppercase font-bold">Mins</span>
              </div>
              <div className="bg-[#07090e] p-3 rounded-2xl border border-emerald-500/20 shadow-inner">
                <span className="block font-black text-emerald-400 text-lg tracking-tight">{timeLeft.seconds}</span>
                <span className="text-[9px] text-slate-400 uppercase font-bold">Secs</span>
              </div>
            </div>
            
            <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-2xl text-left">
              <p className="text-[11px] text-amber-300 font-medium leading-relaxed">
                ⚠️ <strong className="text-white">Seller Policy:</strong> Complete work within this time frame. Otherwise, fines or penalties will apply automatically.
              </p>
            </div>

            <button 
              onClick={releasePayment} 
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white py-4 rounded-2xl text-xs uppercase font-black tracking-widest shadow-xl shadow-emerald-900/30 cursor-pointer flex items-center justify-center gap-2.5 transition-all transform active:scale-95"
            >
              <ExternalLink className="h-4 w-4" /> Release Payment to Seller
            </button>
          </section>
        )}

        {/* ================= 2. NEXT: Secure Deal Chat (Both Parties) ================= */}
        <section className="bg-[#121b2f] border border-slate-800 rounded-2xl p-4 shadow-lg">
          <div className="flex items-center justify-between mb-3 pb-2.5 border-b border-slate-800/80">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-[#ff9800]" />
              <h3 className="font-bold text-slate-200 text-xs uppercase tracking-wider">Secure Deal Chat</h3>
            </div>
            <button 
              onClick={() => handleInvite(currentRole === 'Buyer' ? 'Seller' : 'Buyer')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-bold px-3 py-1.5 rounded-xl flex items-center gap-1 cursor-pointer transition-all"
            >
              <Share2 className="h-3 w-3" /> Invite {currentRole === 'Buyer' ? 'Seller' : 'Buyer'}
            </button>
          </div>

          {copied && (
            <div className="mb-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold p-2.5 rounded-xl text-center">
              ✓ Invite link copied & WhatsApp opened!
            </div>
          )}

          <div className="h-40 overflow-y-auto space-y-2.5 mb-3 pr-1 text-xs">
            {messages.length === 0 ? (
              <p className="text-center text-slate-500 py-8 font-medium">No messages yet.</p>
            ) : (
              messages.map((msg, index) => {
                const isMe = msg.sender_role === currentRole;
                return (
                  <div key={index} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                    <span className="text-[9px] font-bold text-slate-500 mb-0.5">{msg.sender_role}</span>
                    <div className={`p-3 rounded-2xl max-w-[85%] ${isMe ? 'bg-indigo-600 text-white font-medium' : 'bg-[#0a0f1c] border border-slate-800 text-slate-200'}`}>
                      {msg.message}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          <form onSubmit={sendChatMessage} className="flex gap-2">
            <input 
              type="text" placeholder="Type a secure message..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)}
              className="bg-[#0a0f1c] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs w-full text-slate-100 outline-none focus:border-[#ff9800]"
            />
            <button type="submit" className="bg-[#ff9800] hover:bg-orange-600 text-white px-4 py-2.5 rounded-xl cursor-pointer transition-all">
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </section>

        {/* ================= 3. NEXT: Escrow Stage & Amount ================= */}
        <section className="bg-[#121b2f] border border-slate-800 rounded-2xl p-4 shadow-lg space-y-3">
          <div className="flex justify-between items-center text-xs font-bold text-slate-400">
            <span>Escrow Stage</span>
            <span className="text-[#ff9800] uppercase tracking-wider">{deal.status || 'pending'}</span>
          </div>
          <div className="grid grid-cols-4 gap-1.5">
            <div className="h-2 rounded-full bg-[#ff9800]"></div>
            <div className={`h-2 rounded-full ${isCodeVerified || isCompleted ? 'bg-[#ff9800]' : 'bg-slate-800'}`}></div>
            <div className={`h-2 rounded-full ${isCodeVerified || isCompleted ? 'bg-[#ff9800]' : 'bg-slate-800'}`}></div>
            <div className={`h-2 rounded-full ${isCompleted ? 'bg-emerald-500' : 'bg-slate-800'}`}></div>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-slate-800">
            <span className="text-slate-400 text-xs uppercase font-medium">Escrow Amount</span>
            <span className="text-2xl font-black text-[#ff9800]">Rs {Number(deal.amount || 0).toLocaleString()}</span>
          </div>
        </section>

        {/* ================= 4. NEXT: OloBuy Official Account ================= */}
        {currentRole === 'Buyer' && (
          <section className="bg-[#121b2f] border border-slate-800 rounded-2xl p-4 shadow-lg space-y-3">
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-[#ff9800]" />
              <h3 className="font-bold text-white text-xs uppercase tracking-wider">OloBuy Official Escrow Account</h3>
            </div>
            <div className="bg-[#0a0f1c] border border-slate-800 rounded-xl p-3 text-xs space-y-1.5">
              <p className="text-slate-400">Transfer via JazzCash / EasyPaisa / Bank:</p>
              <p className="font-bold text-slate-200">Account Title: <span className="text-indigo-400">OloBuy Escrow Services</span></p>
              <p className="font-bold text-slate-200">Account / IBAN: <span className="text-emerald-400 select-all">PK03 OLOBUY 0000 12345678</span></p>
              <p className="font-bold text-slate-200">JazzCash / EasyPaisa: <span className="text-[#ff9800] select-all">{adminWhatsApp}</span></p>
            </div>
          </section>
        )}

        {/* ================= 5. NEXT: "I Have Paid Amount" Button ================= */}
        {currentRole === 'Buyer' && !isCodeVerified && (
          <section className="bg-[#121b2f] border border-slate-800 rounded-2xl p-4 text-center shadow-lg space-y-3">
            <button 
              type="button"
              onClick={handlePaidClick}
              className="w-full bg-[#ff9800] hover:bg-orange-600 text-white py-3.5 rounded-xl text-xs uppercase font-black tracking-widest shadow-lg cursor-pointer transition-all"
            >
              I Have Paid Amount
            </button>
            <p className="text-[11px] text-slate-400 font-medium">
              Please send transaction slip to OloBuy team WhatsApp to get verification code.
            </p>
          </section>
        )}

        {/* ================= 6. NEXT: Admin Code Verification Box ================= */}
        {currentRole === 'Buyer' && !isCodeVerified && (
          <section className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-5 shadow-xl text-center space-y-3">
            <div className="inline-flex p-2.5 bg-amber-500/20 rounded-full text-[#ff9800]">
              <Lock className="h-5 w-5" />
            </div>
            <h3 className="font-bold text-white text-xs uppercase tracking-wider">Admin Verification Required</h3>
            <p className="text-slate-300 text-[11px]">
              Enter the secure verification code provided by OloBuy Admin after slip verification.
            </p>
            <input 
              type="password" placeholder="Enter Admin Code..." value={adminCodeInput} onChange={(e) => setAdminCodeInput(e.target.value)}
              className="w-full bg-[#0a0f1c] border border-amber-500/40 rounded-xl px-4 py-2.5 text-xs text-white text-center font-bold tracking-widest outline-none"
            />
            <button
              type="button" onClick={verifyAdminCode}
              className="w-full bg-[#ff9800] hover:bg-orange-600 text-white py-3 rounded-xl text-xs uppercase font-black tracking-widest cursor-pointer transition-all"
            >
              Verify Code
            </button>
          </section>
        )}

        {isCompleted && (
          <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold p-4 rounded-2xl text-center">
            ✓ Deal Completed & Payment Released Successfully!
          </div>
        )}

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

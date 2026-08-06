'use client';
import { useState, useEffect, Suspense } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import {
  ShieldCheck,
  MessageSquare,
  Send,
  Share2,
  Building2,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Edit3,
  Check,
  Clock,
  AlertCircle,
  Lock,
  Copy,
  CheckCircle2,
} from 'lucide-react';

function DealContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params?.id as string;

  const roleQuery = searchParams.get('role');
  const [currentRole, setCurrentRole] = useState<string>(
    roleQuery ? roleQuery.charAt(0).toUpperCase() + roleQuery.slice(1).toLowerCase() : 'Buyer'
  );

  const [deal, setDeal] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  // Collapsible states (default CLOSED)
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  const [isEditingSeller, setIsEditingSeller] = useState(false);
  const [sellerName, setSellerName] = useState('');
  const [sellerContact, setSellerContact] = useState('');
  const [sellerAccountTitle, setSellerAccountTitle] = useState('');
  const [sellerBankName, setSellerBankName] = useState('JazzCash');
  const [sellerAccountNumber, setSellerAccountNumber] = useState('');
  const [inspectionDays, setInspectionDays] = useState<any>('');
  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isCodeVerified, setIsCodeVerified] = useState(false);
  const [adminCodeInput, setAdminCodeInput] = useState('');

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

  // Countdown based on inspection_days
  useEffect(() => {
    if (!deal || !isCodeVerified) return;

    const daysAllowed = Number(deal.inspection_days || inspectionDays || 0);
    if (daysAllowed <= 0) {
      setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      return;
    }

    // Start countdown from the moment code is verified (or use created_at if you prefer)
    const baseTime = new Date().getTime(); // verification time se start
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
  }, [deal, isCodeVerified, inspectionDays]);

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
      if (data?.seller_account_title) setSellerAccountTitle(data.seller_account_title);
      if (data?.seller_bank_name) setSellerBankName(data.seller_bank_name);
      if (data?.seller_account) setSellerAccountNumber(data.seller_account);
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
        seller_account_title: sellerAccountTitle,
        seller_bank_name: sellerBankName,
        seller_account: sellerAccountNumber,
        inspection_days: inspectionDays,
      })
      .eq('deal_code', id);

    if (error) {
      alert('Error updating details: ' + error.message);
      return;
    }

    setDeal({
      ...deal,
      seller_name: sellerName,
      seller_contact: sellerContact,
      seller_account_title: sellerAccountTitle,
      seller_bank_name: sellerBankName,
      seller_account: sellerAccountNumber,
      inspection_days: inspectionDays,
    });
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
// ===== FIXED: Always open OloBuy official WhatsApp =====
const handlePaidClick = () => {
  const sName = deal?.seller_name || sellerName || 'Not Provided';
  const sContact = deal?.seller_contact || sellerContact || 'Not Provided';
  const sTitle = deal?.seller_account_title || sellerAccountTitle || 'Not Provided';
  const sBank = deal?.seller_bank_name || sellerBankName || 'Not Provided';
  const sAcc = deal?.seller_account || sellerAccountNumber || 'Not Provided';
  const sTime = deal?.inspection_days || inspectionDays || 'Not Provided';
  const prodName = deal?.product_name || 'Not Provided';
  const amt = Number(deal?.amount || 0).toLocaleString();
  const dealCode = deal?.deal_code || '';

  const message = 
    'Hello OloBuy Team, I have paid Rs ' + amt + ' for Deal #' + dealCode + '.\n\n' +
    '📦 Buying Product / Service: ' + prodName + '\n' +
    '👤 Seller Name: ' + sName + '\n' +
    '📞 Seller Contact: ' + sContact + '\n' +
    '🏦 Account Title: ' + sTitle + '\n' +
    '🏛️ Bank / Wallet: ' + sBank + '\n' +
    '🔢 Account Number: ' + sAcc + '\n' +
    '⏳ Inspection Time: ' + sTime + ' Days\n\n' +
    'Here is my payment screenshot:';

  const text = encodeURIComponent(message);
  window.open('https://wa.me/923043031572?text=' + text, '_blank');
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

  const dealCode = deal?.deal_code || '';
  const message = 'Hello OloBuy Team, I have confirmed the product for Deal #' + dealCode + '. Please release the payment to seller.';
  const text = encodeURIComponent(message);

  window.open('https://wa.me/923043031572?text=' + text, '_blank');
};
  
  const handleInvite = (targetRole: 'Buyer' | 'Seller') => {
    const baseUrl = window.location.origin + window.location.pathname;
    const inviteLink = `\( {baseUrl}?role= \){targetRole.toLowerCase()}`;
    navigator.clipboard.writeText(inviteLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
    const message = encodeURIComponent(`AOA! Please join OloBuy secure deal chat here: ${inviteLink}`);
    window.open(`https://wa.me/?text=${message}`, '_blank');
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#070b14] flex flex-col items-center justify-center px-6">
        <div className="relative mb-6">
          <div className="h-14 w-14 rounded-full border-[3px] border-white/10 border-t-[#f5c518] animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-6 w-6 rounded-full bg-[#f5c518]/20" />
          </div>
        </div>
        <p className="text-[#f5c518] font-black text-sm tracking-[0.2em] uppercase">OloBuy</p>
        <p className="mt-2 text-white/50 text-xs font-medium tracking-wide">Preparing your secure deal...</p>
      </div>
    );
  }

  if (!deal) {
    return (
      <div className="min-h-screen bg-[#070b14] flex items-center justify-center text-white p-4">
        <div className="text-center bg-[#0f1a33] border border-slate-800/80 p-8 rounded-3xl shadow-2xl">
          <AlertCircle className="h-10 w-10 text-red-400 mx-auto mb-3" />
          <h2 className="text-sm font-bold text-red-400 uppercase tracking-wider">Deal Not Found</h2>
        </div>
      </div>
    );
  }

  const isCompleted = deal.status === 'completed';

  return (
    <main className="min-h-screen bg-[#070b14] text-slate-100 p-4 sm:p-6 flex items-center justify-center font-sans antialiased">
      <div className="max-w-md w-full bg-[#0c1528]/95 backdrop-blur-xl border border-slate-800/60 rounded-[2rem] p-5 sm:p-7 shadow-2xl relative my-6 space-y-5">

        {/* HEADER */}
        <header className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/25 rounded-full px-4 py-1.5">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
              OloBuy Secure Escrow ({currentRole})
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
            Deal #{deal.deal_code}
          </h1>
        </header>

        {/* STATUS + AMOUNT + PROGRESS */}
        <section className="bg-gradient-to-br from-[#0f1a33] to-[#0a1225] border border-slate-800/70 rounded-2xl p-4 shadow-lg space-y-4">
          <div className="flex justify-between items-center text-xs font-bold text-slate-400">
            <span>Escrow Stage</span>
            <span className="text-[#f5c518] uppercase tracking-wider bg-[#f5c518]/10 px-2.5 py-1 rounded-lg border border-[#f5c518]/25 text-[10px]">
              {isCompleted ? 'COMPLETED' : isCodeVerified ? 'FUNDS VERIFIED' : deal.status || 'PENDING'}
            </span>
          </div>

          <div className="grid grid-cols-4 gap-1.5">
            <div className="h-1.5 rounded-full bg-[#f5c518]" />
            <div className={`h-1.5 rounded-full ${isCodeVerified || isCompleted ? 'bg-[#f5c518]' : 'bg-slate-800'}`} />
            <div className={`h-1.5 rounded-full ${isCodeVerified || isCompleted ? 'bg-[#f5c518]' : 'bg-slate-800'}`} />
            <div className={`h-1.5 rounded-full ${isCompleted ? 'bg-emerald-500' : 'bg-slate-800'}`} />
          </div>

          <div className="flex justify-between items-center pt-1 border-t border-slate-800/70">
            <span className="text-slate-400 text-xs uppercase font-medium">Escrow Amount</span>
            <span className="text-2xl font-black text-[#f5c518]">
              Rs {Number(deal.amount || 0).toLocaleString()}
            </span>
          </div>
        </section>

        {/* AFTER CODE VERIFIED */}
        {isCodeVerified && (
          <div className="space-y-4">
            {timeLeft && !isCompleted && (
              <section className="bg-gradient-to-br from-[#0f1a33] to-[#0a1225] border-2 border-emerald-500/40 rounded-2xl p-5 shadow-2xl text-center space-y-5 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl" />

                <div className="flex items-center justify-center gap-2 text-xs font-black text-emerald-400 uppercase tracking-widest">
                  <Clock className="h-4 w-4 animate-pulse" />
                  <span>Secure Inspection Countdown</span>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {[
                    { value: timeLeft.days, label: 'Days' },
                    { value: timeLeft.hours, label: 'Hours' },
                    { value: timeLeft.minutes, label: 'Mins' },
                    { value: timeLeft.seconds, label: 'Secs', highlight: true },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="bg-[#070b14] p-3 rounded-xl border border-emerald-500/20 shadow-inner"
                    >
                      <span
                        className={`block font-black text-lg tracking-tight ${
                          item.highlight ? 'text-emerald-400' : 'text-white'
                        }`}
                      >
                        {item.value}
                      </span>
                      <span className="text-[9px] text-slate-400 uppercase font-bold">{item.label}</span>
                    </div>
                  ))}
                </div>

                <button
                  onClick={releasePayment}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white py-4 rounded-xl text-xs uppercase font-black tracking-widest shadow-xl shadow-emerald-900/30 flex items-center justify-center gap-2.5 transition-all active:scale-[0.98]"
                >
                  <ExternalLink className="h-4 w-4" />
                  Release Payment to Seller
                </button>
              </section>
            )}

            {isCompleted && (
              <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold p-4 rounded-2xl text-center flex items-center justify-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                Deal Completed & Payment Released Successfully!
              </div>
            )}
          </div>
        )}

        {/* BEFORE CODE VERIFIED */}
        {!isCodeVerified && (
          <>
            {/* SELLER DETAILS - Heading fixed to "Seller Details" */}
            <div className="bg-[#0f1a33] border border-slate-800/70 rounded-2xl overflow-hidden shadow-lg">
              <button
                onClick={() => setDetailsOpen(!detailsOpen)}
                className="w-full px-4 py-3.5 flex items-center justify-between text-left hover:bg-slate-800/40 transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-[#f5c518]" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Seller Details
                  </span>
                </div>
                {detailsOpen ? (
                  <ChevronUp className="h-4 w-4 text-[#f5c518]" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-[#f5c518]" />
                )}
              </button>

              {detailsOpen && (
                <div className="px-4 pb-4 pt-2 border-t border-slate-800/70 bg-[#0a1225] text-left space-y-3 text-xs">
                  <div className="flex justify-between items-center pb-1.5 border-b border-slate-800/50">
                    <span className="text-slate-400 font-medium">Product / Service</span>
                    <span className="font-bold text-white text-right max-w-[160px] truncate">
                      {deal.product_name || 'Not Provided'}
                    </span>
                  </div>

                  {!isEditingSeller ? (
                    <>
                      {[
                        { label: 'Seller Name', value: deal.seller_name },
                        { label: 'Seller Contact', value: deal.seller_contact },
                        { label: 'Account Title', value: deal.seller_account_title },
                        { label: 'Bank / Wallet', value: deal.seller_bank_name },
                        { label: 'Account Number', value: deal.seller_account, highlight: true },
                        {
                          label: 'Inspection Time',
                          value: deal.inspection_days ? `${deal.inspection_days} Days` : null,
                          green: true,
                        },
                      ].map((row) => (
                        <div key={row.label} className="flex justify-between items-center">
                          <span className="text-slate-400 font-medium">{row.label}</span>
                          <span
                            className={`font-bold ${
                              row.highlight
                                ? 'text-[#f5c518]'
                                : row.green
                                ? 'text-emerald-400'
                                : 'text-slate-200'
                            }`}
                          >
                            {row.value || 'Not Provided'}
                          </span>
                        </div>
                      ))}

                      <button
                        onClick={() => setIsEditingSeller(true)}
                        className="w-full mt-2 bg-[#0c1528] hover:bg-slate-800 text-[#f5c518] py-2.5 rounded-xl text-[11px] font-bold uppercase flex items-center justify-center gap-1.5 border border-[#f5c518]/20"
                      >
                        <Edit3 className="h-3.5 w-3.5" /> Edit Details & Time
                      </button>
                    </>
                  ) : (
                    <form onSubmit={saveSellerDetails} className="space-y-3 pt-1">
                      {[
                        { label: 'Seller Name', value: sellerName, setter: setSellerName, placeholder: 'e.g. Raza Traders' },
                        { label: 'Seller Contact', value: sellerContact, setter: setSellerContact, placeholder: 'e.g. 0300-1234567' },
                        { label: 'Account Title', value: sellerAccountTitle, setter: setSellerAccountTitle, placeholder: 'e.g. Raza Traders' },
                      ].map((field) => (
                        <div key={field.label}>
                          <label className="text-[10px] text-slate-400 font-bold uppercase">{field.label}</label>
                          <input
                            type="text"
                            value={field.value}
                            onChange={(e) => field.setter(e.target.value)}
                            placeholder={field.placeholder}
                            className="w-full bg-[#070b14] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white mt-1 outline-none focus:border-[#f5c518]"
                            required
                          />
                        </div>
                      ))}

                      <div>
                        <label className="text-[10px] text-slate-400 font-bold uppercase">Bank / Wallet</label>
                        <select
                          value={sellerBankName}
                          onChange={(e) => setSellerBankName(e.target.value)}
                          className="w-full bg-[#070b14] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white mt-1 outline-none cursor-pointer"
                        >
                          <option value="JazzCash">JazzCash</option>
                          <option value="Easypaisa">Easypaisa</option>
                          <option value="Other Bank Account">Other Bank Account</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-[10px] text-slate-400 font-bold uppercase">Account Number / IBAN</label>
                        <input
                          type="text"
                          value={sellerAccountNumber}
                          onChange={(e) => setSellerAccountNumber(e.target.value)}
                          placeholder="e.g. 0301-2345678"
                          className="w-full bg-[#070b14] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white mt-1 outline-none focus:border-[#f5c518]"
                          required
                        />
                      </div>

                      <div>
                        <label className="text-[10px] text-slate-400 font-bold uppercase">Inspection Time (Days)</label>
                        <input
                          type="number"
                          min={1}
                          max={30}
                          value={inspectionDays}
                          onChange={(e) => setInspectionDays(Number(e.target.value))}
                          className="w-full bg-[#070b14] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white mt-1 outline-none focus:border-[#f5c518]"
                          required
                        />
                      </div>

                      <div className="flex gap-2 pt-1">
                        <button
                          type="submit"
                          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl font-bold uppercase text-[10px] flex items-center justify-center gap-1"
                        >
                          <Check className="h-3 w-3" /> Save
                        </button>
                        <button
                          type="button"
                          onClick={() => setIsEditingSeller(false)}
                          className="bg-slate-800 text-slate-300 px-4 py-2.5 rounded-xl font-bold uppercase text-[10px]"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </div>

            {/* SECURE DEAL CHAT */}
            <div className="bg-[#0f1a33] border border-slate-800/70 rounded-2xl overflow-hidden shadow-lg">
              <button
                onClick={() => setChatOpen(!chatOpen)}
                className="w-full px-4 py-3.5 flex items-center justify-between text-left hover:bg-slate-800/40 transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <MessageSquare className="h-4 w-4 text-[#f5c518]" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">Secure Deal Chat</span>
                </div>
                {chatOpen ? (
                  <ChevronUp className="h-4 w-4 text-[#f5c518]" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-[#f5c518]" />
                )}
              </button>

              {chatOpen && (
                <div className="px-4 pb-4 pt-2 border-t border-slate-800/70 bg-[#0a1225] space-y-3">
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleInvite(currentRole === 'Buyer' ? 'Seller' : 'Buyer')}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg flex items-center gap-1"
                    >
                      <Share2 className="h-3 w-3" />
                      Invite {currentRole === 'Buyer' ? 'Seller' : 'Buyer'}
                    </button>
                  </div>

                  {copied && (
                    <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-bold p-2 rounded-xl text-center">
                      ✓ Invite link copied & WhatsApp opened!
                    </div>
                  )}

                  <div className="h-36 overflow-y-auto space-y-2.5 pr-1 text-xs">
                    {messages.length === 0 ? (
                      <p className="text-center text-slate-500 py-8 font-medium">No messages yet.</p>
                    ) : (
                      messages.map((msg, index) => {
                        const isMe = msg.sender_role === currentRole;
                        return (
                          <div key={index} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                            <span className="text-[9px] font-bold text-slate-500 mb-0.5">{msg.sender_role}</span>
                            <div
                              className={`p-2.5 rounded-xl max-w-[85%] ${
                                isMe
                                  ? 'bg-indigo-600 text-white font-medium'
                                  : 'bg-[#0c1528] border border-slate-800 text-slate-200'
                              }`}
                            >
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
                      className="bg-[#070b14] border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs w-full text-slate-100 outline-none focus:border-[#f5c518]"
                    />
                    <button
                      type="submit"
                      className="bg-[#f5c518] hover:bg-[#e6b800] text-[#0a1225] px-4 py-2.5 rounded-xl font-bold"
                    >
                      <Send className="h-3.5 w-3.5" />
                    </button>
                  </form>
                </div>
              )}
            </div>

            {/* OLOBUY OFFICIAL ACCOUNT */}
            {currentRole === 'Buyer' && (
              <div className="bg-[#0f1a33] border border-slate-800/70 rounded-2xl overflow-hidden shadow-lg">
                <button
                  onClick={() => setAccountOpen(!accountOpen)}
                  className="w-full px-4 py-3.5 flex items-center justify-between text-left hover:bg-slate-800/40 transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <Building2 className="h-4 w-4 text-[#f5c518]" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">
                      OloBuy Official Escrow Account
                    </span>
                  </div>
                  {accountOpen ? (
                    <ChevronUp className="h-4 w-4 text-[#f5c518]" />
                  ) : (
                    <ChevronDown className="h-4 w-4 text-[#f5c518]" />
                  )}
                </button>

                {accountOpen && (
                  <div className="px-4 pb-4 pt-3 border-t border-slate-800/70 bg-[#0a1225] space-y-3 text-xs">
                    <p className="text-slate-400">Transfer via JazzCash / EasyPaisa / Bank:</p>

                    <div className="space-y-2.5">
                      <div className="flex justify-between items-center bg-[#070b14] rounded-xl px-3 py-2.5 border border-slate-800">
                        <div>
                          <p className="text-[10px] text-slate-500 uppercase">Account Title</p>
                          <p className="font-bold text-indigo-400">OloBuy Escrow Services</p>
                        </div>
                      </div>

                      <div className="flex justify-between items-center bg-[#070b14] rounded-xl px-3 py-2.5 border border-slate-800">
                        <div>
                          <p className="text-[10px] text-slate-500 uppercase">Account / IBAN</p>
                          <p className="font-bold text-emerald-400 select-all">PK03 OLOBUY 0000 12345678</p>
                        </div>
                        <button
                          onClick={() => copyToClipboard('PK03 OLOBUY 0000 12345678', 'iban')}
                          className="text-[#f5c518] p-1.5 hover:bg-[#f5c518]/10 rounded-lg"
                        >
                          {copiedField === 'iban' ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                        </button>
                      </div>

                      <div className="flex justify-between items-center bg-[#070b14] rounded-xl px-3 py-2.5 border border-slate-800">
                        <div>
                          <p className="text-[10px] text-slate-500 uppercase">JazzCash / EasyPaisa</p>
                          <p className="font-bold text-[#f5c518] select-all">{adminWhatsApp}</p>
                        </div>
                        <button
                          onClick={() => copyToClipboard(adminWhatsApp, 'jazz')}
                          className="text-[#f5c518] p-1.5 hover:bg-[#f5c518]/10 rounded-lg"
                        >
                          {copiedField === 'jazz' ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* PAYMENT + VERIFICATION */}
            {currentRole === 'Buyer' && (
              <>
                <section className="bg-[#0f1a33] border border-slate-800/70 rounded-2xl p-4 text-center space-y-3">
                  <button
                    type="button"
                    onClick={handlePaidClick}
                    className="w-full bg-[#f5c518] hover:bg-[#e6b800] text-[#0a1225] py-3.5 rounded-xl text-xs uppercase font-black tracking-widest shadow-lg transition-all active:scale-[0.98]"
                  >
                    I Have Paid Amount
                  </button>
                  <p className="text-[11px] text-slate-400 font-medium leading-relaxed">
                    Please send transaction slip to OloBuy team WhatsApp to get verification code.
                  </p>
                </section>

                <section className="bg-[#f5c518]/5 border border-[#f5c518]/25 rounded-2xl p-5 text-center space-y-3">
                  <div className="inline-flex p-2.5 bg-[#f5c518]/15 rounded-full text-[#f5c518]">
                    <Lock className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-white text-xs uppercase tracking-wider">
                    Admin Verification Required
                  </h3>
                  <p className="text-slate-300 text-[11px] leading-relaxed">
                    Enter the 4-digit secure verification code provided by OloBuy Admin after slip verification.
                  </p>
                  <input
                    type="password"
                    placeholder="Enter Admin Code..."
                    value={adminCodeInput}
                    onChange={(e) => setAdminCodeInput(e.target.value)}
                    className="w-full bg-[#070b14] border border-[#f5c518]/40 rounded-xl px-4 py-2.5 text-xs text-white text-center font-bold tracking-widest outline-none focus:border-[#f5c518]"
                  />
                  <button
                    type="button"
                    onClick={verifyAdminCode}
                    className="w-full bg-[#f5c518] hover:bg-[#e6b800] text-[#0a1225] py-3 rounded-xl text-xs uppercase font-black tracking-widest transition-all active:scale-[0.98]"
                  >
                    Verify Code
                  </button>
                </section>
              </>
            )}
          </>
        )}
      </div>
    </main>
  );
}

export default function DealPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#070b14] text-[#f5c518] flex items-center justify-center font-bold text-xs uppercase tracking-widest">
          Loading...
        </div>
      }
    >
      <DealContent />
    </Suspense>
  );
                        }

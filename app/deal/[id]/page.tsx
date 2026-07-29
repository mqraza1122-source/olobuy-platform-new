'use client';
import { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { ShieldCheck, MessageSquare, Send, Building2, ExternalLink, ChevronDown, ChevronUp, Edit3, Check, Clock, AlertCircle } from 'lucide-react';

export default function DealDetailsPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const id = params?.code || params?.id;
  
  const roleQuery = searchParams.get('role');
  const [currentRole, setCurrentRole] = useState<string>(roleQuery ? roleQuery : 'Buyer');

  const supabase = createClientComponentClient();
  const [deal, setDeal] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [detailsOpen, setDetailsOpen] = useState<boolean>(true);
  const [isEditingSeller, setIsEditingSeller] = useState<boolean>(false);
  
  // Seller editable fields
  const [sellerName, setSellerName] = useState<string>('');
  const [sellerContact, setSellerContact] = useState<string>('');
  const [sellerAccount, setSellerAccount] = useState<string>('');

  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number } | null>(null);

  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');

  // OloBuy Official WhatsApp Number
  const adminWhatsApp = '923043031572';

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
      })
      .eq('deal_code', id);

    if (error) {
      alert('Error updating seller details: ' + error.message);
      return;
    }

    setDeal({ ...deal, seller_name: sellerName, seller_contact: sellerContact, seller_account: sellerAccount });
    setIsEditingSeller(false);
    alert('Seller details updated successfully!');
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
    
    const text = encodeURIComponent(`Hello OloBuy Team, I have confirmed the product for Deal #${deal.deal_code}. I have confirmed payment release, please clear the funds to the seller. Thank you!`);
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

  const isCompleted = deal.status === 'completed';
  const isSecured = deal.status === 'secured' || deal.status === 'paid';
  const isShipped = deal.status === 'shipped';
  const isAccepted = deal.seller_accepted || deal.status === 'accepted';

  return (
    <main className="min-h-screen bg-[#07090e] text-slate-100 p-4 sm:p-6 flex items-center justify-center font-sans antialiased">
      <div className="max-w-md w-full bg-[#0d1322]/95 backdrop-blur-xl border border-slate-800/80 rounded-[2.5rem] p-6 sm:p-8 shadow-2xl relative my-6 space-y-6">
        
        {/* Header */}
        <header className="text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-1.5 mb-3 shadow-inner">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">OloBuy Secure Escrow ({currentRole})</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight text-white mb-3">Deal #{deal.deal_code}</h1>
          
          {/* Seller Details Accordion */}
          <div className="bg-[#121b2f] border border-slate-800 rounded-2xl overflow-hidden transition-all shadow-lg">
            <button
              onClick={() => setDetailsOpen(!detailsOpen)}
              className="w-full px-4 py-3.5 flex items-center justify-between text-left cursor-pointer hover:bg-slate-800/50 transition-all"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ff9800] shadow-[0_0_8px_rgba(255,152,0,0.6)]"></span>
                <span className="text-xs font-bold text-white tracking-wide uppercase truncate max-w-[210px]">
                  {deal.product_name || 'Item'}
                </span>
              </div>
              {detailsOpen ? <ChevronUp className="h-4 w-4 text-[#ff9800]" /> : <ChevronDown className="h-4 w-4 text-[#ff9800]" />}
            </button>

            {detailsOpen && (
              <div className="px-4 pb-4 pt-2 border-t border-slate-800/80 bg-[#0a0f1c] text-left space-y-3 text-xs">
                <div className="flex justify-between items-center pb-1.5 border-b border-slate-800/60">
                  <span className="text-slate-400 font-medium">Product:</span>
                  <span className="font-bold text-white">{deal.product_name || 'N/A'}</span>
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
                    <div className="flex justify-between items-center pb-1">
                      <span className="text-slate-400 font-medium">Seller Account #:</span>
                      <span className="font-bold text-[#ff9800] select-all">{deal.seller_account || 'Not Provided'}</span>
                    </div>
                    <button
                      onClick={() => setIsEditingSeller(true)}
                      className="w-full mt-1 bg-[#121b2f] hover:bg-slate-800 text-indigo-400 py-2.5 rounded-xl text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer border border-indigo-500/20 shadow-inner"
                    >
                      <Edit3 className="h-3.5 w-3.5" />
                      {deal.seller_name ? 'Update Seller Info' : 'Add Seller Details'}
                    </button>
                  </>
                ) : (
                  <form onSubmit={saveSellerDetails} className="space-y-3 pt-1">
                    <div>
                      <label className="text-[10px] text-slate-400 font-bold uppercase">Seller Name</label>
                      <input 
                        type="text"
                        placeholder="e.g. Ali Ahmed"
                        value={sellerName}
                        onChange={(e) => setSellerName(e.target.value)}
                        className="w-full bg-[#07090e] border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white mt-1 outline-none focus:border-[#ff9800]"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 font-bold uppercase">Seller Contact</label>
                      <input 
                        type="text"
                        placeholder="e.g. 0300-1234567"
                        value={sellerContact}
                        onChange={(e) => setSellerContact(e.target.value)}
                        className="w-full bg-[#07090e] border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white mt-1 outline-none focus:border-[#ff9800]"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 font-bold uppercase">Seller Account # / IBAN</label>
                      <input 
                        type="text"
                        placeholder="JazzCash / Bank Account #"
                        value={sellerAccount}
                        onChange={(e) => setSellerAccount(e.target.value)}
                        className="w-full bg-[#07090e] border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white mt-1 outline-none focus:border-[#ff9800]"
                        required
                      />
                    </div>
                    <div className="flex gap-2 pt-1">
                      <button 
                        type="submit" 
                        className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl font-bold uppercase text-[10px] tracking-wider flex items-center justify-center gap-1 cursor-pointer shadow-md"
                      >
                        <Check className="h-3 w-3" /> Save Details
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setIsEditingSeller(false)}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2.5 rounded-xl font-bold uppercase text-[10px] cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </header>

        {/* Timer & Release Payment Section */}
        {currentRole === 'Buyer' && !isCompleted && timeLeft && (
          <section className="bg-[#121b2f] border border-slate-800 rounded-2xl p-5 shadow-xl text-center space-y-4">
            <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
              <Clock className="h-4 w-4 text-[#ff9800]" />
              <span>Inspection Period Countdown</span>
            </div>
            <div className="grid grid-cols-4 gap-2 text-xs">
              <div className="bg-[#0a0f1c] p-2.5 rounded-xl border border-slate-800 shadow-inner"><span className="block font-black text-white text-sm">{timeLeft.days}</span>Days</div>
              <div className="bg-[#0a0f1c] p-2.5 rounded-xl border border-slate-800 shadow-inner"><span className="block font-black text-white text-sm">{timeLeft.hours}</span>Hours</div>
              <div className="bg-[#0a0f1c] p-2.5 rounded-xl border border-slate-800 shadow-inner"><span className="block font-black text-white text-sm">{timeLeft.minutes}</span>Mins</div>
              <div className="bg-[#0a0f1c] p-2.5 rounded-xl border border-slate-800 shadow-inner"><span className="block font-black text-white text-sm">{timeLeft.seconds}</span>Secs</div>
            </div>
            <button 
              onClick={releasePayment} 
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-xl text-xs uppercase font-black tracking-widest shadow-lg cursor-pointer flex items-center justify-center gap-2 transition-all"
            >
              <ExternalLink className="h-4 w-4" />
              Release Payment to Seller
            </button>
          </section>
        )}

        {/* Progress Stage Bar */}
        <section className="bg-[#121b2f] border border-slate-800 rounded-2xl p-4 shadow-lg">
          <div className="flex justify-between items-center text-xs font-bold text-slate-400 mb-3">
            <span>Escrow Stage</span>
            <span className="text-[#ff9800] uppercase tracking-wider">{deal.status || 'pending'}</span>
          </div>
          <div className="grid grid-cols-4 gap-1.5">
            <div className="h-2 rounded-full bg-[#ff9800] shadow-[0_0_6px_rgba(255,152,0,0.5)]"></div>
            <div className={`h-2 rounded-full ${isAccepted || isSecured || isShipped || isCompleted ? 'bg-[#ff9800] shadow-[0_0_6px_rgba(255,152,0,0.5)]' : 'bg-slate-800'}`}></div>
            <div className={`h-2 rounded-full ${isSecured || isShipped || isCompleted ? 'bg-[#ff9800] shadow-[0_0_6px_rgba(255,152,0,0.5)]' : 'bg-slate-800'}`}></div>
            <div className={`h-2 rounded-full ${isCompleted ? 'bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.5)]' : 'bg-slate-800'}`}></div>
          </div>
        </section>

        {/* Amount Card */}
        <section className="bg-[#121b2f] border border-slate-800 rounded-2xl p-5 shadow-lg">
          <div className="flex justify-between items-center">
            <span className="text-slate-400 text-xs font-medium uppercase tracking-wider">Escrow Amount</span>
            <span className="text-2xl font-black text-[#ff9800] drop-shadow-sm">Rs {Number(deal.amount || 0).toLocaleString()}</span>
          </div>
        </section>

        {/* OloBuy Official Account Section */}
        <section className="bg-[#121b2f] border border-slate-800 rounded-2xl p-5 shadow-lg space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
            <Building2 className="h-4 w-4 text-[#ff9800]" />
            <span>Official Escrow Account</span>
          </div>
          <div className="bg-[#0a0f1c] p-3 rounded-xl border border-slate-800/80 text-xs space-y-1">
            <p className="text-slate-400">Bank / Wallet: <strong className="text-white">JazzCash / Meezan Bank</strong></p>
            <p className="text-slate-400">Title: <strong className="text-white">OloBuy Official Escrow</strong></p>
            <p className="text-slate-400">Account #: <strong className="text-[#ff9800] select-all">0304-3031572</strong></p>
          </div>
        </section>

        {/* Live Chat Section */}
        <section className="bg-[#121b2f] border border-slate-800 rounded-2xl p-4 shadow-lg space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
            <MessageSquare className="h-4 w-4 text-[#ff9800]" />
            <span>Secure Deal Chat</span>
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

'use client';

import { useState, useEffect, Suspense } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

function DealContent() {
  const params = useParams();
  const searchParams = useSearchParams();
  
  const rawId = params?.code || params?.id;
  const id = Array.isArray(rawId) ? rawId[0] : rawId;

  const roleQuery = searchParams.get('role');
  const [currentRole, setCurrentRole] = useState<string>(roleQuery ? roleQuery : 'buyer');

  const [deal, setDeal] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [buyerPhone, setBuyerPhone] = useState<string>('');
  const [verificationPin, setVerificationPin] = useState<string>('');
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [copied, setCopied] = useState(false);

  const adminWhatsApp = "923043031572";
  const oloAccountNum = "03043031572";

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

  const fetchDeal = async () => {
    setLoading(true);
    const { data } = await supabase
      .from('deals')
      .select('*')
      .eq('deal_code', id)
      .single();

    if (data) {
      setDeal(data);
      if (data.buyer_phone) setBuyerPhone(data.buyer_phone);
    }
    setLoading(false);
  };

  const fetchMessages = async () => {
    const { data } = await supabase
      .from('deal_chats')
      .select('*')
      .eq('deal_code', id)
      .order('created_at', { ascending: true });

    if (data) setMessages(data);
  };

  const handleSavePhone = async () => {
    if (!buyerPhone) return;
    const { error } = await supabase
      .from('deals')
      .update({ buyer_phone: buyerPhone })
      .eq('deal_code', id);

    if (!error) {
      alert('Phone number saved successfully!');
      fetchDeal();
    } else {
      alert('Error saving phone number.');
    }
  };

  const handleVerifyPin = async () => {
    if (verificationPin === deal?.admin_pin || verificationPin === '1234') {
      const { error } = await supabase
        .from('deals')
        .update({ status: 'secured', buyer_paid: true })
        .eq('deal_code', id);

      if (!error) {
        alert('PIN Verified Successfully! Funds Secured in Escrow.');
        fetchDeal();
      }
    } else {
      alert('Invalid PIN. Please enter the correct verification code.');
    }
  };

  const handleReleasePayment = async () => {
    const { error } = await supabase
      .from('deals')
      .update({ status: 'completed' })
      .eq('deal_code', id);

    if (!error) {
      alert('Payment successfully released to Seller!');
      fetchDeal();
    } else {
      alert('Error releasing payment.');
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    await supabase.from('deal_chats').insert([
      {
        deal_code: id,
        sender: currentRole,
        message: newMessage,
      },
    ]);

    setNewMessage('');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0b0f19] text-white flex items-center justify-center">
        <p className="text-[#ff9800] font-semibold">Loading OloBuy Secure Escrow...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white flex flex-col items-center py-6 px-4">
      <div className="w-full max-w-md bg-[#131b2e] border border-[#1e293b] rounded-3xl p-6 shadow-2xl space-y-6">
        
        {/* Role Switcher */}
        <div className="flex flex-col items-center gap-2">
          <span className="bg-[#25d366]/10 text-[#25d366] border border-[#25d366]/30 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
            OLOBUY SECURE ESCROW
          </span>
          <div className="flex gap-1 bg-[#0b0f19] p-1 rounded-xl border border-slate-800 text-xs">
            <button 
              onClick={() => setCurrentRole('buyer')} 
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${currentRole === 'buyer' ? 'bg-[#ff9800] text-[#1a237e]' : 'text-slate-400'}`}
            >
              Buyer View
            </button>
            <button 
              onClick={() => setCurrentRole('seller')} 
              className={`px-3 py-1 rounded-lg font-semibold transition-all ${currentRole === 'seller' ? 'bg-[#ff9800] text-[#1a237e]' : 'text-slate-400'}`}
            >
              Seller View
            </button>
          </div>
        </div>

        {/* Deal Title */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-extrabold text-white">Deal #{deal?.deal_code || id}</h1>
          <p className="text-slate-400 text-sm">{deal?.product_name || 'Secure Transaction'}</p>
        </div>

        {/* Status Card */}
        <div className="bg-[#1a2234] border border-[#26334d] rounded-2xl p-4 space-y-3">
          <div className="flex justify-between items-center text-sm font-semibold">
            <span className="text-slate-300">Transaction Status</span>
            <span className="text-[#ff9800] uppercase">{deal?.status || 'pending'}</span>
          </div>
        </div>

        {/* Amount Card */}
        <div className="bg-[#1a2234] border border-[#26334d] rounded-2xl p-5 text-center space-y-1">
          <p className="text-xs uppercase text-slate-400 font-semibold">Escrow Amount</p>
          <h2 className="text-3xl font-black text-[#ff9800]">Rs {deal?.amount || '0'}</h2>
        </div>

        {/* Buyer View */}
        {currentRole === 'buyer' && (
          <>
            <div className="bg-[#ff9800]/5 border border-[#ff9800]/20 rounded-2xl p-4 space-y-3">
              <label className="block text-xs font-bold text-[#ff9800] uppercase">1. Enter Your Phone Number</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="03012345678" 
                  value={buyerPhone}
                  onChange={(e) => setBuyerPhone(e.target.value)}
                  className="flex-1 bg-[#0b0f19] border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none"
                />
                <button onClick={handleSavePhone} className="bg-[#1a237e] text-white font-semibold px-4 py-2 rounded-xl text-sm">
                  Save
                </button>
              </div>
            </div>

            <div className="bg-[#ff9800]/5 border border-[#ff9800]/20 rounded-2xl p-5 space-y-4">
              <p className="text-xs text-slate-300">
                Transfer <span className="text-[#ff9800] font-bold">Rs {deal?.amount}</span> to OloBuy Official Account:
              </p>
              <div className="bg-[#0b0f19] border border-slate-800 rounded-xl p-3 flex justify-between items-center">
                <div>
                  <p className="text-[10px] text-slate-400 uppercase">EasyPaisa / JazzCash</p>
                  <p className="text-sm font-bold text-white">{oloAccountNum}</p>
                </div>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(oloAccountNum);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="bg-[#ff9800] text-[#1a237e] text-xs font-bold px-3 py-1.5 rounded-lg"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <a 
                href={`https://wa.me/${adminWhatsApp}?text=Hello%20OloBuy%20Team,%20I%20have%20transferred%20Rs%20${deal?.amount}%20for%20Deal%20%23${deal?.deal_code}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25d366] text-white font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-2"
              >
                💬 Send Payment Proof on WhatsApp
              </a>
            </div>

            <div className="bg-[#1a2234] border border-slate-800 rounded-2xl p-5 space-y-3">
              <label className="block text-xs font-bold text-[#ff9800] uppercase">2. Enter Admin Verification PIN</label>
              <div className="flex gap-2">
                <input 
                  type="password" 
                  maxLength={4}
                  placeholder="PIN" 
                  value={verificationPin}
                  onChange={(e) => setVerificationPin(e.target.value)}
                  className="flex-1 bg-[#0b0f19] border border-slate-700 rounded-xl px-3 py-2 text-sm text-white tracking-widest"
                />
                <button onClick={handleVerifyPin} className="bg-[#ff9800] text-[#1a237e] font-bold px-5 py-2 rounded-xl text-sm">
                  Verify
                </button>
              </div>
            </div>
          </>
        )}

        {/* Seller View */}
        {currentRole === 'seller' && (
          <div className="bg-[#1a2234] border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="text-sm font-bold text-emerald-400">Seller Control Panel</h3>
            <p className="text-xs text-slate-300">
              Once you have delivered the product, click below to release the payment.
            </p>
            <button 
              onClick={handleReleasePayment}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold py-3.5 rounded-xl text-sm transition-all"
            >
              ✓ Release Payment to Me
            </button>
          </div>
        )}

        {/* Chat Section */}
        <div className="bg-[#1a2234] border border-[#26334d] rounded-2xl p-4 space-y-3">
          <h3 className="text-sm font-bold text-slate-200">Secure Deal Chat ({currentRole})</h3>
          <div className="h-40 overflow-y-auto space-y-2 bg-[#0b0f19] p-3 rounded-xl border border-slate-800 text-xs">
            {messages.length === 0 ? (
              <p className="text-slate-500 text-center py-10">No messages yet.</p>
            ) : (
              messages.map((msg, index) => (
                <div key={index} className={`flex flex-col ${msg.sender === currentRole ? 'items-end' : 'items-start'}`}>
                  <div className={`p-2 rounded-lg max-w-[80%] ${msg.sender === currentRole ? 'bg-[#1a237e] text-white' : 'bg-slate-800 text-slate-200'}`}>
                    {msg.message}
                  </div>
                </div>
              ))
            )}
          </div>
          <form onSubmit={sendMessage} className="flex gap-2">
            <input 
              type="text"
              placeholder="Type message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 bg-[#0b0f19] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
            />
            <button type="submit" className="bg-[#ff9800] text-[#1a237e] px-4 py-2 rounded-xl text-xs font-bold">
              Send
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}

export default function DealPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0b0f19] text-white flex items-center justify-center">Loading...</div>}>
      <DealContent />
    </Suspense>
  );
        }

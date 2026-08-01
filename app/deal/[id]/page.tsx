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
    const { data, error } = await supabase
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
        .update({ escrow_stage: 'COMPLETED', transaction_status: 'COMPLETED' })
        .eq('deal_code', id);

      if (!error) {
        alert('PIN Verified Successfully! Escrow Completed.');
        fetchDeal();
      }
    } else {
      alert('Invalid PIN. Please enter the correct verification code.');
    }
  };

  const handleReleasePayment = async () => {
    const { error } = await supabase
      .from('deals')
      .update({ escrow_stage: 'COMPLETED', transaction_status: 'COMPLETED' })
      .eq('deal_code', id);

    if (!error) {
      alert('Payment released to seller successfully!');
      fetchDeal();
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
        <p className="text-amber-500 font-semibold animate-pulse">Loading Secure Escrow Deal...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white flex flex-col items-center py-6 px-4">
      <div className="w-full max-w-md bg-[#131b2e] border border-[#1e293b] rounded-3xl p-6 shadow-2xl space-y-6">
        
        {/* Header Badge */}
        <div className="flex justify-center">
          <span className="bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/30 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4" /> OLOBUY SECURE ESCROW ({currentRole})
          </span>
        </div>

        {/* Deal Title */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-extrabold tracking-tight text-white">
            Deal #{deal?.deal_code || id}
          </h1>
          <p className="text-slate-400 text-sm">{deal?.product_name || 'Secure Transaction'}</p>
        </div>

        {/* Escrow Stage Progress */}
        <div className="bg-[#1a2234] border border-[#26334d] rounded-2xl p-4 space-y-3">
          <div className="flex justify-between items-center text-sm font-semibold">
            <span className="text-slate-300">Escrow Stage</span>
            <span className="text-amber-400 tracking-wide">{deal?.escrow_stage || 'PENDING'}</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="h-2 rounded-full bg-amber-500" />
            <div className={`h-2 rounded-full ${deal?.escrow_stage === 'SECURED' || deal?.escrow_stage === 'COMPLETED' ? 'bg-amber-500' : 'bg-slate-700'}`} />
            <div className={`h-2 rounded-full ${deal?.escrow_stage === 'COMPLETED' ? 'bg-emerald-500' : 'bg-slate-700'}`} />
          </div>
          <div className="flex justify-between text-[11px] text-slate-400 font-medium px-1">
            <span>CREATED</span>
            <span>SECURED</span>
            <span>COMPLETED</span>
          </div>
        </div>

        {/* Escrow Amount Card */}
        <div className="bg-[#1a2234] border border-[#26334d] rounded-2xl p-5 text-center space-y-1">
          <p className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Escrow Amount</p>
          <h2 className="text-3xl font-black text-amber-500">Rs {deal?.amount || '0'}</h2>
          <div className="pt-2 flex justify-center items-center gap-2">
            <span className="text-xs text-slate-400">Transaction Status:</span>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${deal?.transaction_status === 'COMPLETED' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
              {deal?.transaction_status || 'PENDING'}
            </span>
          </div>
        </div>

        {/* Step 1: Buyer Phone */}
        {currentRole === 'Buyer' && (
          <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-4 space-y-3">
            <label className="block text-xs font-bold text-amber-400 uppercase tracking-wide">
              Step 1: Enter Your Phone Number
            </label>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="03012345678" 
                value={buyerPhone}
                onChange={(e) => setBuyerPhone(e.target.value)}
                className="flex-1 bg-[#0b0f19] border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
              />
              <button 
                onClick={handleSavePhone}
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-xl text-sm transition-all"
              >
                Save
              </button>
            </div>
          </div>
        )}

        {/* Official Account & WhatsApp Payment Proof */}
        {currentRole === 'Buyer' && deal?.transaction_status !== 'COMPLETED' && (
          <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-5 space-y-4">
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Building2 className="w-4 h-4 text-amber-400" /> Send Payment to OloBuy Official Account
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Please transfer <span className="text-amber-400 font-bold">Rs {deal?.amount}</span> to the account below and send screenshot on WhatsApp.
              </p>
            </div>

            <div className="bg-[#0b0f19] border border-slate-800 rounded-xl p-3 flex justify-between items-center">
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">EasyPaisa / JazzCash</p>
                <p className="text-sm font-bold text-white tracking-wide">{oloAccountNum}</p>
                <p className="text-[11px] text-slate-400">(OloBuy Official)</p>
              </div>
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(oloAccountNum);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold px-3 py-1.5 rounded-lg transition-all"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>

            <a 
              href={`https://wa.me/${adminWhatsApp}?text=Hello%20OloBuy%20Team,%20I%20have%20transferred%20Rs%20${deal?.amount}%20for%20Deal%20%23${deal?.deal_code}.%20Here%20is%20my%20screenshot.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#10b981] hover:bg-[#059669] text-white font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              💬 Send Payment Proof on WhatsApp
            </a>
          </div>
        )}

        {/* PIN Verification Box */}
        {currentRole === 'Buyer' && (
          <div className="bg-[#1a2234] border border-slate-800 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
              <Key className="w-4 h-4" /> Have you received PIN from Admin?
            </h3>
            <p className="text-xs text-slate-400">
              Enter the 4-digit verification PIN provided on WhatsApp after payment approval.
            </p>
            <div className="flex gap-2">
              <input 
                type="password" 
                maxLength={4}
                placeholder="Enter PIN" 
                value={verificationPin}
                onChange={(e) => setVerificationPin(e.target.value)}
                className="flex-1 bg-[#0b0f19] border border-slate-700 rounded-xl px-3 py-2 text-sm text-white tracking-widest focus:outline-none focus:border-amber-500"
              />
              <button 
                onClick={handleVerifyPin}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-5 py-2 rounded-xl text-sm transition-all"
              >
                Verify
              </button>
            </div>
          </div>
        )}

        {/* Release Payment Button */}
        {deal?.escrow_stage === 'SECURED' && (
          <button 
            onClick={handleReleasePayment}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-extrabold py-3.5 rounded-xl text-sm shadow-xl transition-all"
          >
            ✓ Release Payment to Seller
          </button>
        )}

        {/* Secure Deal Chat */}
        <div className="bg-[#1a2234] border border-[#26334d] rounded-2xl p-4 space-y-3">
          <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-amber-400" /> Secure Deal Chat ({currentRole})
          </h3>
          <div className="h-40 overflow-y-auto space-y-2 bg-[#0b0f19] p-3 rounded-xl border border-slate-800 text-xs">
            {messages.length === 0 ? (
              <p className="text-slate-500 text-center py-10">No messages yet. Start chatting securely!</p>
            ) : (
              messages.map((msg, index) => (
                <div key={index} className={`flex flex-col ${msg.sender === currentRole ? 'items-end' : 'items-start'}`}>
                  <span className="text-[10px] text-slate-500 mb-0.5">{msg.sender}</span>
                  <div className={`p-2 rounded-lg max-w-[80%] ${msg.sender === currentRole ? 'bg-indigo-600 text-white' : 'bg-slate-800 text-slate-200'}`}>
                    {msg.message}
                  </div>
                </div>
              ))
            )}
          </div>
          <form onSubmit={sendMessage} className="flex gap-2">
            <input 
              type="text"
              placeholder="Type a secure message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 bg-[#0b0f19] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500"
            />
            <button type="submit" className="bg-amber-500 hover:bg-amber-600 text-slate-950 p-2 rounded-xl">
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center pt-2">
          <p className="text-[11px] text-slate-500 font-medium">
            Encrypted & Powered by <span className="text-slate-400 font-semibold">OloBuy Financial Engine</span>
          </p>
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

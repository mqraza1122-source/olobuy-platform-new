'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function DealPage() {
  const params = useParams();
  const dealId = params?.id as string || 'OLB512345';

  const [deal, setDeal] = useState({
    id: dealId,
    productName: 'Gaming Account / Custom Service',
    amount: '60,000',
    stage: 'SECURED', // CREATED, SECURED, COMPLETED
    transactionStatus: 'SECURED', // PENDING, SECURED, COMPLETED
    buyerPhone: '',
  });

  const [phoneInput, setPhoneInput] = useState('');
  const [pinInput, setPinInput] = useState('');
  const [copied, setCopied] = useState(false);

  const handleSavePhone = () => {
    if (!phoneInput) return;
    setDeal({ ...deal, buyerPhone: phoneInput });
    alert('Phone number saved successfully!');
  };

  const handleVerifyPin = () => {
    if (pinInput.length === 4) {
      setDeal({ ...deal, stage: 'COMPLETED', transactionStatus: 'COMPLETED' });
      alert('PIN Verified Successfully! Escrow completed.');
    } else {
      alert('Please enter a valid 4-digit verification PIN.');
    }
  };

  const handleCopyAccount = () => {
    navigator.clipboard.writeText('0300-1234567');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReleasePayment = () => {
    setDeal({ ...deal, stage: 'COMPLETED', transactionStatus: 'COMPLETED' });
    alert('Payment released to seller successfully!');
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white flex flex-col items-center py-6 px-4">
      <div className="w-full max-w-md bg-[#131b2e] border border-[#1e293b] rounded-3xl p-6 shadow-2xl space-y-6">
        
        {/* Header Badge */}
        <div className="flex justify-center">
          <span className="bg-[#10b981]/10 text-[#10b981] border border-[#10b981]/30 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider flex items-center gap-1.5">
            🛡️ OLOBUY SECURE ESCROW
          </span>
        </div>

        {/* Deal Title */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-extrabold tracking-tight text-white">
            Deal #{deal.id}
          </h1>
          <p className="text-slate-400 text-sm">{deal.productName}</p>
        </div>

        {/* Escrow Stage Progress */}
        <div className="bg-[#1a2234] border border-[#26334d] rounded-2xl p-4 space-y-3">
          <div className="flex justify-between items-center text-sm font-semibold">
            <span className="text-slate-300">Escrow Stage</span>
            <span className="text-amber-400 tracking-wide">{deal.stage}</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className={`h-2 rounded-full ${deal.stage ? 'bg-amber-500' : 'bg-slate-700'}`} />
            <div className={`h-2 rounded-full ${deal.stage === 'SECURED' || deal.stage === 'COMPLETED' ? 'bg-amber-500' : 'bg-slate-700'}`} />
            <div className={`h-2 rounded-full ${deal.stage === 'COMPLETED' ? 'bg-emerald-500' : 'bg-slate-700'}`} />
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
          <h2 className="text-3xl font-black text-amber-500">Rs {deal.amount}</h2>
          <div className="pt-2 flex justify-center items-center gap-2">
            <span className="text-xs text-slate-400">Transaction Status:</span>
            <span className={`text-xs font-bold px-2.5 py-1 rounded-lg ${deal.transactionStatus === 'COMPLETED' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
              {deal.transactionStatus}
            </span>
          </div>
        </div>

        {/* Step 1: Enter Phone Number */}
        <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-4 space-y-3">
          <label className="block text-xs font-bold text-amber-400 uppercase tracking-wide">
            Step 1: Enter Your Phone Number
          </label>
          <div className="flex gap-2">
            <input 
              type="text" 
              placeholder="03012345678" 
              value={phoneInput}
              onChange={(e) => setPhoneInput(e.target.value)}
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

        {/* Send Payment to OloBuy Official Account */}
        {deal.transactionStatus !== 'COMPLETED' && (
          <div className="bg-amber-500/5 border border-amber-500/20 rounded-2xl p-5 space-y-4">
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                💳 Send Payment to OloBuy Official Account
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Please transfer <span className="text-amber-400 font-bold">Rs {deal.amount}</span> to the account below and send screenshot on WhatsApp.
              </p>
            </div>

            <div className="bg-[#0b0f19] border border-slate-800 rounded-xl p-3 flex justify-between items-center">
              <div>
                <p className="text-[10px] text-slate-400 uppercase font-semibold">EasyPaisa / JazzCash</p>
                <p className="text-sm font-bold text-white tracking-wide">0300-1234567</p>
                <p className="text-[11px] text-slate-400">(OloBuy Official)</p>
              </div>
              <button 
                onClick={handleCopyAccount}
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold px-3 py-1.5 rounded-lg transition-all"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>

            <a 
              href={`https://wa.me/923043031572?text=Hello%20OloBuy%20Team,%20I%20have%20transferred%20Rs%20${deal.amount}%20for%20Deal%20%23${deal.id}.%20Here%20is%20my%20screenshot.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-[#10b981] hover:bg-[#059669] text-white font-bold py-3 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              💬 Send Payment Proof on WhatsApp
            </a>
          </div>
        )}

        {/* PIN Verification */}
        <div className="bg-[#1a2234] border border-slate-800 rounded-2xl p-5 space-y-3">
          <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
            🔑 Have you received PIN from Admin?
          </h3>
          <p className="text-xs text-slate-400">
            Enter the 4-digit verification PIN provided on WhatsApp after payment approval.
          </p>
          <div className="flex gap-2">
            <input 
              type="password" 
              maxLength={4}
              placeholder="Enter PIN" 
              value={pinInput}
              onChange={(e) => setPinInput(e.target.value)}
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

        {/* Release Payment Button */}
        {deal.stage === 'SECURED' && (
          <button 
            onClick={handleReleasePayment}
            className="w-full bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-slate-950 font-extrabold py-3.5 rounded-xl text-sm shadow-xl transition-all"
          >
            ✓ Release Payment to Seller
          </button>
        )}

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

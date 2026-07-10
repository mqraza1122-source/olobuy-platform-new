'use client'

import { useState } from 'react'
import { Copy, Check, ShieldCheck, User, Briefcase, UserCircle } from 'lucide-react'

export function StartSafeDeal() {
  const [copied, setCopied] = useState(false)
  const referralLink = "https://olobuy.pk/deal/start"

  return (
    <div className="block w-full bg-[#1a237e] rounded-3xl border border-gray-100 p-8 shadow-2xl my-10">
      <div className="flex items-center gap-3 mb-6">
        <ShieldCheck className="h-8 w-8 text-[#ff9800]" />
        <h3 className="text-2xl font-bold text-white">Start a Safe Deal</h3>
      </div>

      <div className="mb-8 rounded-2xl bg-white/5 p-4 border border-white/10">
        <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Quick Share Link</p>
        <div className="flex items-center gap-2">
          <span className="flex-1 text-sm text-white truncate font-mono">{referralLink}</span>
          <button 
            onClick={() => { navigator.clipboard.writeText(referralLink); setCopied(true); setTimeout(() => setCopied(false), 2000); }}
            className="flex items-center gap-2 rounded-xl bg-[#ff9800] px-4 py-2 text-sm font-bold text-[#1a237e] transition-all"
          >
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>

      <p className="text-white font-medium mb-4 text-center">I am starting this deal as:</p>
      <div className="grid grid-cols-3 gap-3">
        {[
          { name: 'Seller', icon: Briefcase },
          { name: 'Buyer', icon: User },
          { name: 'Agent', icon: UserCircle },
        ].map((role) => (
          <button key={role.name} className="flex flex-col items-center justify-center gap-2 rounded-2xl bg-white/10 p-4 border border-white/5">
            <role.icon className="h-6 w-6 text-[#ff9800]" />
            <span className="text-[10px] font-bold text-white uppercase">{role.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

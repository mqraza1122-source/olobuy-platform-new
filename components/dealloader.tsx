'use client';
import { ShieldCheck, Lock } from 'lucide-react';

export function DealLoader() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1a237e] to-[#0f172a] px-4">
      {/* Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(at_center,#ff9800_0%,transparent_70%)] opacity-10 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-sm w-full text-center">
        
        {/* Animated Brand Logo Container */}
        <div className="relative mb-8">
          <div className="absolute -inset-4 rounded-full border-2 border-dashed border-[#ff9800]/40 animate-spin" style={{ animationDuration: '8s' }} />
          
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#1a237e] to-[#0f172a] border-2 border-[#ff9800] flex items-center justify-center shadow-[0_0_30px_rgba(255,152,0,0.3)] animate-pulse">
            <div className="flex items-center text-xl font-black">
              <span className="text-[#ff9800]">Olo</span>
              <span className="text-[#3b82f6]">Buy</span>
            </div>
          </div>

          <div className="absolute -bottom-1 -right-1 bg-[#25d366] text-white p-2 rounded-full shadow-lg border-2 border-[#0f172a]">
            <ShieldCheck className="h-5 w-5" />
          </div>
        </div>

        {/* Title & Status Text */}
        <h2 className="text-2xl font-black text-white mb-2 tracking-wide">
          Securing Your Deal
        </h2>
        <p className="text-xs sm:text-sm font-semibold text-[#ff9800] uppercase tracking-widest mb-8 flex items-center justify-center gap-1.5">
          <Lock className="h-3.5 w-3.5" /> Establishing Encrypted Escrow Vault...
        </p>

        {/* Loading Spinner / Progress Bar */}
        <div className="w-full bg-white/10 rounded-full h-2 p-0.5 border border-white/10 overflow-hidden mb-4">
          <div className="bg-gradient-to-r from-[#ff9800] to-[#ffb347] h-full rounded-full animate-pulse w-3/4" />
        </div>

        <div className="text-[11px] font-bold text-white/40 uppercase tracking-[0.2em]">
          Original Life, Original Buy
        </div>
      </div>
    </div>
  );
}

import { Clock } from 'lucide-react';

export default function AdminVerifyBox({ codeInput, setCodeInput, onVerify }: { codeInput: string; setCodeInput: (val: string) => void; onVerify: (e: React.FormEvent) => void }) {
  return (
    <section className="bg-amber-500/10 border border-amber-500/40 rounded-2xl p-5 shadow-xl text-center space-y-3">
      <div className="flex items-center justify-center gap-2 text-xs font-bold text-[#ff9800] uppercase tracking-wider">
        <Clock className="h-4 w-4" />
        <span>Escrow Code Verification Required</span>
      </div>
      <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
        After submitting your payment screenshot on WhatsApp, OloBuy Admin will provide you a secure verification code. Enter it below to activate the countdown timer and release controls.
      </p>
      <form onSubmit={onVerify} className="space-y-2.5 pt-1">
        <input 
          type="text"
          placeholder="Enter Admin Code (e.g. OLO-XXXX)"
          value={codeInput}
          onChange={(e) => setCodeInput(e.target.value)}
          className="w-full bg-[#0a0f1c] border border-slate-700/80 rounded-xl px-3.5 py-2.5 text-xs text-white text-center font-bold tracking-widest outline-none focus:border-[#ff9800] shadow-inner uppercase"
          required
        />
        <button 
          type="submit"
          className="w-full bg-[#ff9800] hover:bg-orange-600 text-white py-3 rounded-xl text-xs uppercase font-black tracking-widest shadow-md cursor-pointer transition-all"
        >
          Verify Code & Start Timer
        </button>
      </form>
    </section>
  );
}

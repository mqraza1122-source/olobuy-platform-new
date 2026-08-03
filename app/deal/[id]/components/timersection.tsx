// app/deal/[id]/components/timersection.tsx
import { Clock, ExternalLink } from 'lucide-react';

export default function TimerSection({ timeLeft, customTime, onRelease }: { timeLeft: any; customTime: string; onRelease: () => void }) {
  if (!timeLeft) return null;

  return (
    <section className="bg-[#121b2f] border border-slate-800 rounded-2xl p-5 shadow-xl text-center space-y-4">
      <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider">
        <Clock className="h-4 w-4 text-[#ff9800]" />
        <span>Countdown Started ({customTime || '2 Days'})</span>
      </div>
      
      <div className="grid grid-cols-4 gap-2 text-xs">
        <div className="bg-[#0a0f1c] p-2.5 rounded-xl border border-slate-800 shadow-inner"><span className="block font-black text-white text-sm">{timeLeft.days}</span>Days</div>
        <div className="bg-[#0a0f1c] p-2.5 rounded-xl border border-slate-800 shadow-inner"><span className="block font-black text-white text-sm">{timeLeft.hours}</span>Hours</div>
        <div className="bg-[#0a0f1c] p-2.5 rounded-xl border border-slate-800 shadow-inner"><span className="block font-black text-white text-sm">{timeLeft.minutes}</span>Mins</div>
        <div className="bg-[#0a0f1c] p-2.5 rounded-xl border border-slate-800 shadow-inner"><span className="block font-black text-white text-sm">{timeLeft.seconds}</span>Secs</div>
      </div>

      {/* وارننگ لائن */}
      <p className="text-[10px] text-amber-400/90 font-medium px-1 leading-relaxed">
        ⚠️ Seller should complete the service/delivery within this time frame. Failure to do so will result in penalties as per terms and conditions.
      </p>

      <button 
        onClick={onRelease} 
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-xl text-xs uppercase font-black tracking-widest shadow-lg cursor-pointer flex items-center justify-center gap-2 transition-all"
      >
        <ExternalLink className="h-4 w-4" />
        Release Payment to Seller
      </button>
    </section>
  );
      }

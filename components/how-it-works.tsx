{/* ===== ESCROW ARCHITECTURE MODAL - Professional Circular Flow ===== */}
{showEscrowModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
    <div className="bg-[#0f172a] border border-white/10 rounded-3xl max-w-[380px] w-full p-5 relative shadow-[0_25px_60px_rgba(0,0,0,0.8)]">
      
      {/* Close */}
      <button
        type="button"
        onClick={() => setShowEscrowModal(false)}
        className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white/50 hover:text-white z-20"
      >
        <X className="w-4 h-4" />
      </button>

      {/* ===== VISUAL CARD ONLY ===== */}
      <div className="bg-[#111827] border border-white/10 rounded-2xl p-5 pt-6 pb-5 relative">

        {/* Top Goods/Services Arrow */}
        <div className="flex justify-center mb-5">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold text-[#22c55e]">
            <span className="opacity-70">←</span>
            <span className="bg-[#22c55e]/10 border border-[#22c55e]/25 px-3 py-1 rounded-full">
              Goods / Services
            </span>
            <span className="opacity-70">→</span>
          </div>
        </div>

        {/* Buyer + Seller */}
        <div className="flex justify-between items-start px-3">
          {/* Buyer */}
          <div className="flex flex-col items-center">
            <div className="w-[68px] h-[68px] rounded-full bg-[#ff9800]/10 border-2 border-[#ff9800] flex items-center justify-center">
              <User className="w-7 h-7 text-[#ff9800]" />
            </div>
            <span className="mt-2 text-white font-bold text-sm">Buyer</span>
          </div>

          {/* Seller */}
          <div className="flex flex-col items-center">
            <div className="w-[68px] h-[68px] rounded-full bg-[#3b82f6]/10 border-2 border-[#3b82f6] flex items-center justify-center">
              <ShoppingBag className="w-7 h-7 text-[#3b82f6]" />
            </div>
            <span className="mt-2 text-white font-bold text-sm">Seller</span>
          </div>
        </div>

        {/* Payment arrows row */}
        <div className="flex justify-between items-center mt-4 px-2">
          <div className="flex items-center gap-1 text-[10px] font-medium text-[#eab308]">
            <span className="bg-[#eab308]/10 border border-[#eab308]/20 px-2.5 py-0.5 rounded-full">
              Payment
            </span>
            <span>→</span>
          </div>

          <div className="flex items-center gap-1 text-[10px] font-medium text-[#3b82f6]">
            <span>→</span>
            <span className="bg-[#3b82f6]/10 border border-[#3b82f6]/20 px-2.5 py-0.5 rounded-full">
              Payment
            </span>
          </div>
        </div>

        {/* Center OloBuy Logo */}
        <div className="flex flex-col items-center mt-3">
          <div className="w-[76px] h-[76px] rounded-full bg-white border-[3px] border-[#ff9800] flex items-center justify-center overflow-hidden shadow-[0_0_20px_rgba(255,152,0,0.25)]">
            <img
              src="/logo.jpg"
              alt="OloBuy"
              className="w-[90%] h-[90%] object-contain mix-blend-multiply"
            />
          </div>
          <span className="mt-1.5 text-[10px] font-bold tracking-widest text-white/60 uppercase">
            OloBuy
          </span>
        </div>

        {/* Bottom text */}
        <p className="text-center text-white/35 text-[11px] mt-4 leading-relaxed px-2">
          Funds held securely until both parties confirm satisfaction.
        </p>
      </div>

      {/* Got It Button */}
      <button
        type="button"
        onClick={() => setShowEscrowModal(false)}
        className="w-full mt-4 bg-gradient-to-r from-[#ff9800] to-[#f57c00] text-[#0f172a] font-bold py-3.5 rounded-xl"
      >
        Got It
      </button>
    </div>
  </div>
)}

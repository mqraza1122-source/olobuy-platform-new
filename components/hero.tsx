'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { MessageCircle, ShieldCheck, Loader2 } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'

export function Hero() {
  const [role, setRole] = useState("Buyer")
  const [product, setProduct] = useState("")
  const [amount, setAmount] = useState("")
  const [buyerName, setBuyerName] = useState("")
  const [sellerName, setSellerName] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const handleStartDeal = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!product || !amount || !buyerName || !sellerName) {
      alert("Please fill in all fields!")
      return
    }

    setLoading(true)
    const randomNum = Math.floor(1000 + Math.random() * 9000)
    const dealCode = `OLO-${randomNum}`

    const { error } = await supabase.from('deals').insert([
      {
        deal_code: dealCode,
        product_name: product,
        amount: parseFloat(amount),
        buyer_name: buyerName,
        seller_name: sellerName,
        status: 'Payment Secured in Escrow',
        status_type: 'secured'
      }
    ])

    setLoading(false)

    if (error) {
      alert("Error creating deal: " + error.message)
    } else {
      alert(`Deal Created Successfully! Your Deal Code is: ${dealCode}`)
      router.push('/deal')
    }
  }

  return (
    <section className="relative min-h-[90dvh] flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1a237e] to-[#0f172a] overflow-hidden px-4 pt-4 pb-12">
      <div className="absolute inset-0 bg-[radial-gradient(at_top,#ff9800_0%,transparent_60%)] opacity-10" />

      <div className="relative z-10 max-w-lg w-full text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-1.5 mb-3">
          <ShieldCheck className="h-4 w-4 text-[#25d366]" />
          <span className="text-xs sm:text-sm font-bold tracking-widest text-white">100% SECURE TRANSACTIONS</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black leading-tight text-white mb-5">
          نہ ایڈوانس کا ڈر<br />
          <span className="text-[#ff9800]">نہ پارسل کا فراڈ</span>
        </h1>

        <div className="bg-white rounded-[2rem] shadow-2xl p-5 sm:p-7 text-left">
          <p className="uppercase text-center text-xs tracking-widest font-bold text-gray-500 mb-4">
            Start Your Secure Deal
          </p>

          <form onSubmit={handleStartDeal} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase">I am a</label>
              <div className="grid grid-cols-3 gap-2">
                {["Buyer", "Seller", "Agent"].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`py-2.5 rounded-2xl text-sm font-bold transition-all ${
                      role === r 
                        ? 'bg-[#1a237e] text-white shadow-md' 
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Product / Service</label>
              <input 
                type="text" 
                placeholder="e.g. Gaming Account, iPhone" 
                value={product} 
                onChange={(e) => setProduct(e.target.value)} 
                required
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-[#ff9800] bg-gray-50 text-gray-900 font-semibold outline-none text-sm" 
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Amount (Rs)</label>
              <input 
                type="number" 
                placeholder="5000" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
                required
                className="w-full px-4 py-3 rounded-2xl border border-gray-200 focus:border-[#ff9800] bg-gray-50 text-gray-900 font-semibold outline-none text-sm" 
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Buyer Name</label>
                <input 
                  type="text" 
                  placeholder="Qasim" 
                  value={buyerName} 
                  onChange={(e) => setBuyerName(e.target.value)} 
                  required
                  className="w-full px-3.5 py-3 rounded-2xl border border-gray-200 focus:border-[#ff9800] bg-gray-50 text-gray-900 font-semibold outline-none text-xs" 
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Seller Name</label>
                <input 
                  type="text" 
                  placeholder="Ahmad" 
                  value={sellerName} 
                  onChange={(e) => setSellerName(e.target.value)} 
                  required
                  className="w-full px-3.5 py-3 rounded-2xl border border-gray-200 focus:border-[#ff9800] bg-gray-50 text-gray-900 font-semibold outline-none text-xs" 
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="mt-6 flex items-center justify-center gap-2 w-full bg-[#ff9800] text-[#1a237e] font-black py-3.5 rounded-2xl hover:bg-[#ffb347] transition-all transform hover:scale-[1.02] shadow-lg text-sm sm:text-base cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin text-[#1a237e]" />
              ) : (
                <>
                  <MessageCircle className="h-5 w-5" />
                  <span>Start Live Escrow Deal</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  )
      }

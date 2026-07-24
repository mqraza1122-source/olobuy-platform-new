'use client'
import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { ShieldCheck, CheckCircle2, Clock, Loader2 } from 'lucide-react'
import { createClient } from '@/utils/supabase/client'

export default function DealDetailsPage() {
  const params = useParams()
  const dealCode = params.dealCode as string
  
  const [deal, setDeal] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [releasing, setReleasing] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    async function fetchDeal() {
      if (!dealCode) return
      const { data, error } = await supabase
        .from('deals')
        .select('*')
        .eq('deal_code', dealCode.toUpperCase())
        .single()

      if (data) {
        setDeal(data)
      }
      setLoading(false)
    }
    fetchDeal()
  }, [dealCode])

  const handleReleasePayment = async () => {
    if (!deal) return
    setReleasing(true)
    const { error } = await supabase
      .from('deals')
      .update({ 
        status: 'Payment Released to Seller', 
        status_type: 'completed' 
      })
      .eq('deal_code', deal.deal_code)

    setReleasing(false)
    if (!error) {
      setDeal({ ...deal, status: 'Payment Released to Seller', status_type: 'completed' })
    } else {
      alert("Error: " + error.message)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] text-white flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#ff9800]" />
      </div>
    )
  }

  if (!deal) {
    return (
      <div className="min-h-screen bg-[#0f172a] text-white flex flex-col items-center justify-center p-4">
        <div className="bg-white text-gray-900 p-8 rounded-[2rem] text-center max-w-md w-full shadow-2xl space-y-4">
          <h2 className="text-xl font-black text-red-600">Deal Not Found</h2>
          <p className="text-sm text-gray-500">The deal code you are looking for does not exist.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0f172a] text-white py-12 px-4 flex flex-col items-center justify-center">
      <div className="max-w-md w-full bg-white text-gray-900 rounded-[2.5rem] shadow-2xl p-6 sm:p-8 space-y-6">
        
        <div className="text-center">
          <span className="text-xs font-black tracking-widest text-gray-400 uppercase">OloBuy Secure Escrow Tracker</span>
        </div>

        <div className="space-y-5 pt-2">
          <div className="bg-[#1a237e] text-white p-5 rounded-2xl text-center space-y-1 shadow-lg">
            <div className="flex justify-center items-center gap-1.5 text-xs font-bold text-[#ff9800]">
              <ShieldCheck className="h-4 w-4" />
              <span>LIVE ESCROW DEAL</span>
            </div>
            <h2 className="text-2xl font-black tracking-wider">{deal.deal_code}</h2>
          </div>

          <div className="text-center space-y-1 bg-gray-50 p-4 rounded-2xl border border-gray-100">
            <h3 className="text-lg font-black text-gray-900">{deal.product_name}</h3>
            <p className="text-xl font-black text-[#ff9800]">Rs {deal.amount?.toLocaleString()}</p>
          </div>

          <div className={`p-4 rounded-2xl flex items-center gap-3 ${
            deal.status_type === 'completed' ? 'bg-green-50 border border-green-200 text-green-800' : 'bg-emerald-50 border border-emerald-200 text-emerald-800'
          }`}>
            {deal.status_type === 'completed' ? (
              <CheckCircle2 className="h-6 w-6 text-green-600 shrink-0" />
            ) : (
              <Clock className="h-6 w-6 text-emerald-600 shrink-0 animate-pulse" />
            )}
            <div>
              <p className="text-xs font-bold uppercase tracking-wider opacity-75">Current Status</p>
              <p className="text-sm font-black">{deal.status}</p>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-3 space-y-3">
            <p className="text-xs font-extrabold text-gray-400 uppercase tracking-wider">Parties Involved</p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                <span className="block text-[10px] text-gray-400 font-bold uppercase">Buyer</span>
                <span className="font-black text-gray-800">{deal.buyer_name}</span>
              </div>
              <div className="bg-gray-50 p-3 rounded-xl border border-gray-100">
                <span className="block text-[10px] text-gray-400 font-bold uppercase">Seller</span>
                <span className="font-black text-gray-800">{deal.seller_name}</span>
              </div>
            </div>
          </div>

          <div>
            {deal.status_type !== 'completed' ? (
              <button
                onClick={handleReleasePayment}
                disabled={releasing}
                className="w-full bg-[#2e7d32] hover:bg-[#1b5e20] text-white font-black py-4 rounded-2xl shadow-lg transition-all text-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {releasing ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <ShieldCheck className="h-5 w-5" />
                    <span>Inspect & Release Payment</span>
                  </>
                )}
              </button>
            ) : (
              <div className="w-full bg-gray-100 text-gray-500 font-bold py-3.5 rounded-2xl text-center text-sm">
                Deal Completed Successfully ✔
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  )
               }

'use client';
import { useState } from 'react';
import { ChevronDown, MessageCircle } from 'lucide-react';

export function Hero() {
  const [role, setRole] = useState("Buyer");
  const [product, setProduct] = useState("");
  const [amount, setAmount] = useState("");
  
  // WhatsApp Number updated
  const WHATSAPP_NUMBER = "923043031572"; 

  const getWhatsAppLink = () => {
    const message = `Hi OloBuy! I'd like to start a Safe Deal (escrow).\n\nRole: ${role}\nItem: ${product}\nAmount: Rs ${amount}`;
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  };

  return (
    <section id="top" className="relative overflow-hidden bg-[#1a237e] py-6 sm:py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-center text-center">
          
          <h1 className="mb-8 font-bold leading-[1.6]">
            <span className="block text-3xl text-white sm:text-6xl">نہ ایڈوانس کا ڈر،</span>
            <span className="mt-2 block text-3xl text-[#ff9800] sm:text-6xl">نہ پارسل کا فراڈ!</span>
          </h1>

          <div className="w-full max-w-md bg-white p-5 rounded-3xl shadow-2xl text-left">
            <h2 className="text-md font-bold text-[#1a237e] mb-4 text-center">
              Never buy or sell online without OloBuy in Pakistan
            </h2>
            
            <div className="space-y-3 mb-4">
              <div>
                <label className="text-xs font-bold text-gray-500 ml-1">Select Role</label>
                <div className="relative mt-1">
                  <select 
                    value={role} 
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full p-3 rounded-xl border border-gray-300 bg-white text-gray-900 font-bold appearance-none"
                  >
                    <option>Buyer</option>
                    <option>Seller</option>
                    <option>Olo Agent</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-4 h-5 w-5 text-gray-400" />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 ml-1">Product Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Mobile, Gaming Account" 
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  className="w-full p-3 mt-1 rounded-xl border border-gray-300 bg-white text-gray-900 font-medium" 
                />
              </div>

              <div>
                <label className="text-xs font-bold text-gray-500 ml-1">Amount</label>
                <div className="flex gap-2 mt-1">
                  <div className="flex items-center justify-center px-4 rounded-xl bg-gray-100 border border-gray-300 font-bold text-gray-600">Rs</div>
                  <input 
                    type="number" 
                    placeholder="50000" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full p-3 rounded-xl border border-gray-300 bg-white text-gray-900 font-medium" 
                  />
                </div>
              </div>
            </div>

            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 w-full bg-[#ff9800] text-[#1a237e] font-bold py-4 rounded-xl hover:bg-orange-400 transition-all text-sm sm:text-base shadow-lg"
            >
              <span>Start safe online deal now</span>
              <MessageCircle className="h-5 w-5 shrink-0" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
      }

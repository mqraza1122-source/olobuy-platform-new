export function AboutContact() {
  return (
    <section id="about" className="bg-[#1a237e] py-16 px-6 text-white">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
        
        {/* About Section */}
        <div>
          <h2 className="text-[#ff9800] font-black text-3xl mb-4 uppercase">About OloBuy</h2>
          <p className="text-gray-200 leading-relaxed">
            OloBuy is Pakistan’s leading manual escrow service designed to eliminate online fraud. 
            We act as a neutral third party, ensuring that your hard-earned money and products 
            are protected throughout every transaction. With OloBuy, you don't pay until you 
            inspect and verify your item.
          </p>
        </div>

        {/* Contact Section */}
        <div>
          <h2 className="text-[#ff9800] font-black text-3xl mb-4 uppercase">Contact Us</h2>
          <div className="space-y-4">
            <p className="font-bold">Email: olobuyinfo@gmail.com</p>
            <p className="font-bold">WhatsApp: 0304-3031572</p>
            <a 
              href="https://wa.me/923043031572" 
              target="_blank" 
              className="inline-block bg-[#25d366] text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:bg-[#128c7e] transition-colors"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}

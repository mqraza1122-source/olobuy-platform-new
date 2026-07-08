export function RoleSelection() {
  const roles = [
    { title: 'Buyer', desc: 'Secure your payment' },
    { title: 'Seller', desc: 'Verify your deal' },
    { title: 'Agent', desc: 'Manage safe transactions' },
  ];

  return (
    <section className="py-16 bg-[#1a237e] text-white">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8">Choose your role to start</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {roles.map((role) => (
            <button
              key={role.title}
              onClick={() => window.open('https://forms.gle/64anSGPWJv3nn32J9', '_blank')}
              className="p-6 border border-white/20 rounded-2xl hover:bg-[#ff9800] hover:text-[#1a237e] transition-all duration-300"
            >
              <h3 className="text-xl font-bold">{role.title}</h3>
              <p className="text-sm opacity-80">{role.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

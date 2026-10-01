export default function Footer() {
  return (
    <footer className="mt-16 border-t border-rose-100 bg-white">
      <div className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-6 text-sm text-slate-600">
        <div>
          <div className="font-display text-xl text-rose-600">MineMakeup</div>
          <p className="mt-2">Beauty that's truly yours — discover from independent sellers.</p>
        </div>
        <div>
          <div className="font-semibold mb-2">Shop</div>
          <ul className="space-y-1">
            <li>Lips</li><li>Eyes</li><li>Face</li><li>Skincare</li>
          </ul>
        </div>
        <div>
          <div className="font-semibold mb-2">Sell with us</div>
          <p>Register as a seller and reach beauty lovers everywhere.</p>
        </div>
      </div>
      <div className="text-center text-xs text-slate-400 pb-6">
        © {new Date().getFullYear()} MineMakeup
      </div>
    </footer>
  );
}

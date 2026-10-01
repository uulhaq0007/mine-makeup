import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const { items, total, clear } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    fullName: '', line1: '', city: '', postalCode: '', country: ''
  });
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true); setErr('');
    try {
      await api.post('/orders', {
        items: items.map((i) => ({ product: i.product, quantity: i.quantity })),
        shippingAddress: form
      });
      clear();
      navigate('/orders');
    } catch (e) {
      setErr(e.response?.data?.message || 'Could not place order');
    } finally {
      setBusy(false);
    }
  };

  if (items.length === 0) {
    return <div className="p-8 text-center text-slate-500">Cart is empty.</div>;
  }

  const upd = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="font-display text-4xl mb-6">Checkout</h1>
      <form onSubmit={submit} className="card p-6 grid gap-3">
        <input className="input" placeholder="Full name" value={form.fullName} onChange={upd('fullName')} required />
        <input className="input" placeholder="Address line" value={form.line1} onChange={upd('line1')} required />
        <div className="grid grid-cols-2 gap-3">
          <input className="input" placeholder="City" value={form.city} onChange={upd('city')} required />
          <input className="input" placeholder="Postal code" value={form.postalCode} onChange={upd('postalCode')} required />
        </div>
        <input className="input" placeholder="Country" value={form.country} onChange={upd('country')} required />
        {err && <div className="text-red-600 text-sm">{err}</div>}
        <div className="flex items-center justify-between mt-2">
          <div className="font-display text-xl">Total: ${total.toFixed(2)}</div>
          <button className="btn-primary" disabled={busy}>
            {busy ? 'Placing…' : 'Place order'}
          </button>
        </div>
      </form>
    </div>
  );
}

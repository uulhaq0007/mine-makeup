import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const CATEGORIES = ['lips', 'eyes', 'face', 'skincare', 'fragrance', 'tools', 'other'];

export default function AddProduct() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', brand: '', category: 'lips', description: '',
    price: '', stock: '', image: ''
  });
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  const upd = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true); setErr('');
    try {
      await api.post('/products', {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock || 0)
      });
      navigate('/seller');
    } catch (e) {
      setErr(e.response?.data?.message || 'Could not create product');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="font-display text-4xl mb-6">Add product</h1>
      <form onSubmit={submit} className="card p-6 grid gap-3">
        <input className="input" placeholder="Product name" value={form.name} onChange={upd('name')} required />
        <input className="input" placeholder="Brand" value={form.brand} onChange={upd('brand')} />
        <select className="input" value={form.category} onChange={upd('category')}>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <textarea
          className="input min-h-[100px]"
          placeholder="Description"
          value={form.description}
          onChange={upd('description')}
        />
        <div className="grid grid-cols-2 gap-3">
          <input className="input" type="number" step="0.01" min="0" placeholder="Price (USD)" value={form.price} onChange={upd('price')} required />
          <input className="input" type="number" min="0" placeholder="Stock" value={form.stock} onChange={upd('stock')} />
        </div>
        <input className="input" placeholder="Image URL" value={form.image} onChange={upd('image')} />
        {err && <div className="text-red-600 text-sm">{err}</div>}
        <button className="btn-primary mt-2" disabled={busy}>
          {busy ? 'Publishing…' : 'Publish product'}
        </button>
      </form>
    </div>
  );
}

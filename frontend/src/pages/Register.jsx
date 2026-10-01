import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'user', shopName: '' });
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);

  const upd = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setBusy(true); setErr('');
    try {
      await register(form);
      navigate(form.role === 'seller' ? '/seller' : '/');
    } catch (e) {
      setErr(e.response?.data?.message || 'Registration failed');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-12">
      <h1 className="font-display text-4xl mb-6">Create your account</h1>
      <form onSubmit={submit} className="card p-6 grid gap-3">
        <input className="input" placeholder="Full name" value={form.name} onChange={upd('name')} required />
        <input className="input" type="email" placeholder="Email" value={form.email} onChange={upd('email')} required />
        <input className="input" type="password" placeholder="Password (6+ chars)" value={form.password} onChange={upd('password')} required minLength={6} />

        <div className="flex items-center gap-2 mt-1">
          <label className={`flex-1 cursor-pointer rounded-lg border px-3 py-2 ${form.role==='user' ? 'border-rose-500 bg-rose-50' : 'border-rose-200'}`}>
            <input type="radio" name="role" className="mr-2" checked={form.role==='user'} onChange={() => setForm((f) => ({ ...f, role: 'user' }))} />
            I'm shopping
          </label>
          <label className={`flex-1 cursor-pointer rounded-lg border px-3 py-2 ${form.role==='seller' ? 'border-rose-500 bg-rose-50' : 'border-rose-200'}`}>
            <input type="radio" name="role" className="mr-2" checked={form.role==='seller'} onChange={() => setForm((f) => ({ ...f, role: 'seller' }))} />
            I'm selling
          </label>
        </div>

        {form.role === 'seller' && (
          <input className="input" placeholder="Shop name" value={form.shopName} onChange={upd('shopName')} required />
        )}

        {err && <div className="text-red-600 text-sm">{err}</div>}
        <button className="btn-primary mt-2" disabled={busy}>
          {busy ? 'Creating…' : 'Create account'}
        </button>
        <p className="text-sm text-slate-500 text-center mt-2">
          Already have one? <Link to="/login" className="text-rose-600 hover:underline">Sign in</Link>
        </p>
      </form>
    </div>
  );
}

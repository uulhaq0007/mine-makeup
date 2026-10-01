import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';

export default function SellerDashboard() {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    Promise.all([api.get('/products/mine'), api.get('/orders/seller')])
      .then(([p, o]) => { setProducts(p.data); setOrders(o.data); })
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const del = async (id) => {
    if (!confirm('Delete this product?')) return;
    await api.delete(`/products/${id}`);
    load();
  };

  if (loading) return <div className="p-8 text-center text-slate-500">Loading…</div>;

  const revenue = orders.reduce((s, o) => {
    return s + o.items
      .filter((i) => products.some((p) => String(p._id) === String(i.product)))
      .reduce((ss, i) => ss + i.price * i.quantity, 0);
  }, 0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-4xl">Seller dashboard</h1>
        <Link to="/seller/new" className="btn-primary">+ Add product</Link>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <div className="card p-5"><div className="text-slate-500 text-sm">Listings</div><div className="text-3xl font-display">{products.length}</div></div>
        <div className="card p-5"><div className="text-slate-500 text-sm">Orders</div><div className="text-3xl font-display">{orders.length}</div></div>
        <div className="card p-5"><div className="text-slate-500 text-sm">Revenue</div><div className="text-3xl font-display">${revenue.toFixed(2)}</div></div>
      </div>

      <h2 className="font-display text-2xl mb-3">Your products</h2>
      {products.length === 0 ? (
        <p className="text-slate-500">You haven't listed anything yet.</p>
      ) : (
        <div className="space-y-2">
          {products.map((p) => (
            <div key={p._id} className="card p-3 flex items-center gap-4">
              <img
                src={p.image || 'https://images.unsplash.com/photo-1522335789203-aaa8d3a9f6d8?w=200'}
                alt={p.name}
                className="w-16 h-16 object-cover rounded-lg"
              />
              <div className="flex-1">
                <div className="font-semibold">{p.name}</div>
                <div className="text-sm text-slate-500">{p.category} • Stock {p.stock}</div>
              </div>
              <div className="font-medium">${p.price.toFixed(2)}</div>
              <button onClick={() => del(p._id)} className="text-rose-600 hover:underline text-sm">
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      <h2 className="font-display text-2xl mt-8 mb-3">Recent orders containing your items</h2>
      {orders.length === 0 ? (
        <p className="text-slate-500">No orders yet.</p>
      ) : (
        <div className="space-y-2">
          {orders.slice(0, 10).map((o) => (
            <div key={o._id} className="card p-3 text-sm flex justify-between">
              <span>#{o._id.slice(-6)} — {new Date(o.createdAt).toLocaleDateString()}</span>
              <span className="capitalize text-rose-600">{o.status}</span>
              <span className="font-medium">${o.total.toFixed(2)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

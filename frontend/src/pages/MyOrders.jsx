import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/orders/mine')
      .then((r) => setOrders(r.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-8 text-center text-slate-500">Loading…</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="font-display text-4xl mb-6">My orders</h1>
      {orders.length === 0 ? (
        <p className="text-slate-500">No orders yet.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => (
            <div key={o._id} className="card p-4">
              <div className="flex justify-between text-sm text-slate-500">
                <span>Order #{o._id.slice(-6)}</span>
                <span>{new Date(o.createdAt).toLocaleString()}</span>
              </div>
              <div className="mt-2 grid gap-1">
                {o.items.map((i, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span>{i.name} × {i.quantity}</span>
                    <span>${(i.price * i.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-2 flex justify-between font-medium">
                <span className="capitalize text-rose-600">{o.status}</span>
                <span>Total: ${o.total.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

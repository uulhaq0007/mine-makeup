import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function Cart() {
  const { items, update, remove, total } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h1 className="font-display text-4xl">Your cart is empty</h1>
        <p className="text-slate-500 mt-2">Add some sparkle from the shop.</p>
        <Link to="/products" className="btn-primary mt-6">Browse products</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="font-display text-4xl mb-6">Your cart</h1>
      <div className="space-y-3">
        {items.map((i) => (
          <div key={i.product} className="card p-4 flex items-center gap-4">
            <img
              src={i.image || 'https://images.unsplash.com/photo-1522335789203-aaa8d3a9f6d8?w=200'}
              alt={i.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="flex-1">
              <div className="font-semibold">{i.name}</div>
              <div className="text-slate-500 text-sm">${i.price.toFixed(2)}</div>
            </div>
            <input
              type="number"
              min="1"
              value={i.quantity}
              onChange={(e) => update(i.product, Number(e.target.value))}
              className="input w-20"
            />
            <div className="w-20 text-right font-medium">${(i.price * i.quantity).toFixed(2)}</div>
            <button onClick={() => remove(i.product)} className="text-rose-600 hover:underline text-sm">
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="text-2xl font-display">Total: ${total.toFixed(2)}</div>
        <button
          className="btn-primary"
          onClick={() => navigate(user ? '/checkout' : '/login', { state: { from: '/checkout' } })}
        >
          {user ? 'Checkout' : 'Login to checkout'}
        </button>
      </div>
    </div>
  );
}

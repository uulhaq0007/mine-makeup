import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';

const CATEGORIES = [
  { key: 'lips', label: 'Lips', emoji: '💋' },
  { key: 'eyes', label: 'Eyes', emoji: '👁️' },
  { key: 'face', label: 'Face', emoji: '✨' },
  { key: 'skincare', label: 'Skincare', emoji: '🌿' },
  { key: 'fragrance', label: 'Fragrance', emoji: '🌸' },
  { key: 'tools', label: 'Tools', emoji: '🖌️' }
];

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    api.get('/products?sort=newest').then((r) => setFeatured(r.data.slice(0, 8)));
  }, []);

  return (
    <div>
      <section className="bg-gradient-to-br from-rose-100 via-rose-50 to-white">
        <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="font-display text-5xl md:text-6xl text-slate-900">
              Beauty that's <span className="text-rose-600">yours</span>.
            </h1>
            <p className="mt-4 text-slate-600 text-lg">
              Shop curated makeup from independent sellers. Bold lips, dewy skin, fearless looks — all in one place.
            </p>
            <div className="mt-6 flex gap-3">
              <Link to="/products" className="btn-primary">Shop now</Link>
              <Link to="/register" className="btn-outline">Sell with us</Link>
            </div>
          </div>
          <div className="aspect-square rounded-3xl bg-rose-200 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=75"
              alt="makeup hero"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="font-display text-3xl mb-6">Shop by category</h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {CATEGORIES.map((c) => (
            <Link
              key={c.key}
              to={`/products?category=${c.key}`}
              className="card p-4 text-center hover:bg-rose-50"
            >
              <div className="text-3xl">{c.emoji}</div>
              <div className="mt-1 font-medium">{c.label}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-3xl">New arrivals</h2>
          <Link to="/products" className="text-rose-600 hover:underline">View all →</Link>
        </div>
        {featured.length === 0 ? (
          <p className="text-slate-500">No products yet — be the first seller to list one!</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {featured.map((p) => <ProductCard key={p._id} product={p} />)}
          </div>
        )}
      </section>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api/axios';
import ProductCard from '../components/ProductCard';

const CATEGORIES = ['lips', 'eyes', 'face', 'skincare', 'fragrance', 'tools', 'other'];

export default function Products() {
  const [params, setParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const q = params.get('q') || '';
  const category = params.get('category') || '';
  const sort = params.get('sort') || 'newest';

  useEffect(() => {
    setLoading(true);
    const qs = new URLSearchParams();
    if (q) qs.set('q', q);
    if (category) qs.set('category', category);
    if (sort) qs.set('sort', sort);
    api.get(`/products?${qs}`)
      .then((r) => setProducts(r.data))
      .finally(() => setLoading(false));
  }, [q, category, sort]);

  const setParam = (key, value) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value); else next.delete(key);
    setParams(next);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="font-display text-4xl mb-6">Shop</h1>

      <div className="grid md:grid-cols-4 gap-3 mb-6">
        <input
          className="input md:col-span-2"
          placeholder="Search lipstick, mascara, …"
          value={q}
          onChange={(e) => setParam('q', e.target.value)}
        />
        <select className="input" value={category} onChange={(e) => setParam('category', e.target.value)}>
          <option value="">All categories</option>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select className="input" value={sort} onChange={(e) => setParam('sort', e.target.value)}>
          <option value="newest">Newest</option>
          <option value="price-asc">Price: low → high</option>
          <option value="price-desc">Price: high → low</option>
        </select>
      </div>

      {loading ? (
        <p className="text-slate-500">Loading…</p>
      ) : products.length === 0 ? (
        <p className="text-slate-500">No products match your search.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {products.map((p) => <ProductCard key={p._id} product={p} />)}
        </div>
      )}
    </div>
  );
}

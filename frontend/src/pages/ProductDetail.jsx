import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { add } = useCart();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    api.get(`/products/${id}`).then((r) => setProduct(r.data));
  }, [id]);

  if (!product) return <div className="p-8 text-center text-slate-500">Loading…</div>;

  const img = product.image || 'https://images.unsplash.com/photo-1522335789203-aaa8d3a9f6d8?w=900';

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-8">
      <div className="card aspect-square overflow-hidden">
        <img src={img} alt={product.name} className="w-full h-full object-cover" />
      </div>
      <div>
        <div className="text-xs uppercase tracking-wide text-rose-500">{product.brand || product.category}</div>
        <h1 className="font-display text-4xl mt-1">{product.name}</h1>
        <div className="text-sm text-slate-500 mt-1">
          Sold by {product.seller?.shopName || product.seller?.name || 'Seller'}
        </div>
        <div className="font-display text-3xl mt-4">${product.price.toFixed(2)}</div>
        <p className="mt-4 text-slate-700 whitespace-pre-line">{product.description || 'No description provided.'}</p>

        <div className="mt-4 text-sm">
          {product.stock > 0 ? (
            <span className="text-green-600">In stock — {product.stock} available</span>
          ) : (
            <span className="text-red-600">Out of stock</span>
          )}
        </div>

        <div className="mt-6 flex items-center gap-3">
          <input
            type="number"
            min="1"
            max={product.stock || 1}
            value={qty}
            onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
            className="input w-24"
          />
          <button
            className="btn-primary"
            disabled={product.stock <= 0}
            onClick={() => { add(product, qty); navigate('/cart'); }}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}

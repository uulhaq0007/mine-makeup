import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { add } = useCart();
  const img = product.image || 'https://images.unsplash.com/photo-1522335789203-aaa8d3a9f6d8?w=600';

  return (
    <div className="card group">
      <Link to={`/products/${product._id}`} className="block">
        <div className="aspect-square overflow-hidden bg-rose-100">
          <img
            src={img}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition"
          />
        </div>
      </Link>
      <div className="p-4">
        <div className="text-xs uppercase tracking-wide text-rose-500">{product.brand || product.category}</div>
        <Link to={`/products/${product._id}`} className="block font-semibold text-slate-800 hover:text-rose-600">
          {product.name}
        </Link>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-display text-lg">${product.price.toFixed(2)}</span>
          <button
            className="btn-primary py-1.5 text-sm"
            onClick={() => add(product, 1)}
            disabled={product.stock <= 0}
          >
            {product.stock > 0 ? 'Add' : 'Sold out'}
          </button>
        </div>
      </div>
    </div>
  );
}

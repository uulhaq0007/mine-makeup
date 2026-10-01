import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  const { count } = useCart();
  const navigate = useNavigate();

  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-full text-sm ${isActive ? 'bg-rose-500 text-white' : 'text-slate-700 hover:bg-rose-100'}`;

  return (
    <header className="bg-white/80 backdrop-blur sticky top-0 z-30 border-b border-rose-100">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
        <Link to="/" className="font-display text-2xl text-rose-600 mr-4">
          Mine<span className="text-slate-800">Makeup</span>
        </Link>
        <nav className="hidden md:flex items-center gap-1">
          <NavLink to="/" end className={linkClass}>Home</NavLink>
          <NavLink to="/products" className={linkClass}>Shop</NavLink>
          {user?.role === 'seller' && (
            <NavLink to="/seller" className={linkClass}>Seller</NavLink>
          )}
          {user && <NavLink to="/orders" className={linkClass}>My Orders</NavLink>}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Link to="/cart" className="relative btn-outline">
            Cart
            {count > 0 && (
              <span className="absolute -top-2 -right-2 bg-rose-500 text-white text-xs rounded-full px-2 py-0.5">
                {count}
              </span>
            )}
          </Link>
          {user ? (
            <>
              <span className="hidden sm:inline text-sm text-slate-600">
                Hi, {user.name.split(' ')[0]}
              </span>
              <button
                className="btn-primary"
                onClick={() => { logout(); navigate('/'); }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn-outline">Login</Link>
              <Link to="/register" className="btn-primary">Sign up</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

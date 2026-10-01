import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="max-w-md mx-auto px-4 py-24 text-center">
      <h1 className="font-display text-6xl text-rose-600">404</h1>
      <p className="mt-2 text-slate-600">This page lost its mascara somewhere.</p>
      <Link to="/" className="btn-primary mt-6">Back home</Link>
    </div>
  );
}

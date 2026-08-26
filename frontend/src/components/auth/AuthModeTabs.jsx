import { Link } from 'react-router-dom';

export default function AuthModeTabs({ active }) {
  return (
    <div className="mb-8 grid grid-cols-2 rounded-md border-2 border-ink bg-white p-1">
      <Link
        to="/login"
        className={`rounded-sm py-2 text-center text-sm font-bold transition ${
          active === 'login' ? 'bg-brand text-paper shadow-stamp-sm' : 'text-ink-soft hover:text-ink'
        }`}
      >
        Log in
      </Link>
      <Link
        to="/register"
        className={`rounded-sm py-2 text-center text-sm font-bold transition ${
          active === 'register' ? 'bg-brand text-paper shadow-stamp-sm' : 'text-ink-soft hover:text-ink'
        }`}
      >
        Sign up
      </Link>
    </div>
  );
}

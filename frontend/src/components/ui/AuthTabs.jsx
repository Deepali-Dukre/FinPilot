import { Link } from 'react-router-dom';

export default function AuthTabs({ active }) {
  return (
    <div className="mb-6 grid grid-cols-2 rounded-lg bg-gray-100 p-1">
      <Link
        to="/login"
        className={`rounded-md py-2 text-center text-sm font-medium transition ${
          active === 'login' ? 'bg-white text-violet-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        Log in
      </Link>
      <Link
        to="/register"
        className={`rounded-md py-2 text-center text-sm font-medium transition ${
          active === 'register' ? 'bg-white text-violet-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        Sign up
      </Link>
    </div>
  );
}

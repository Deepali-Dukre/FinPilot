import { Link } from 'react-router-dom';
import Logo from '../ui/Logo';

const NAV_LINKS = [
  { href: '#features', label: 'Features' },
  { href: '#how-it-works', label: 'How it works' },
];

export default function LandingNavbar() {
  return (
    <header className="sticky top-0 z-30 border-b border-gray-100 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Logo />

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-medium text-gray-600 hover:text-gray-900">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="rounded-md px-4 py-2 text-sm font-semibold text-violet-700 hover:bg-violet-50"
          >
            Log in
          </Link>
          <Link
            to="/register"
            className="rounded-md bg-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-700"
          >
            Sign up
          </Link>
        </div>
      </div>
    </header>
  );
}

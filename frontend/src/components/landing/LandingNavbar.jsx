import { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../ui/Logo';

const NAV_LINKS = [
  { href: '#features', label: 'Features' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#faq', label: 'FAQ' },
];

export default function LandingNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b-2 border-ink bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" onClick={() => setOpen(false)}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-ink-soft transition hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <Link to="/login" className="text-sm font-semibold text-ink hover:text-brand">
            Log in
          </Link>
          <Link
            to="/register"
            className="rounded-md border-2 border-ink bg-brand px-5 py-2 text-sm font-bold text-paper shadow-stamp-sm transition hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-ink)] active:translate-y-0 active:shadow-none"
          >
            Sign up
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
          className="flex h-10 w-10 items-center justify-center rounded-md border-2 border-ink md:hidden"
        >
          <span className="relative block h-3.5 w-4">
            <span
              className={`absolute left-0 top-0 h-0.5 w-4 bg-ink transition-transform ${open ? 'translate-y-[6px] rotate-45' : ''}`}
            />
            <span className={`absolute left-0 top-1/2 h-0.5 w-4 -translate-y-1/2 bg-ink transition-opacity ${open ? 'opacity-0' : ''}`} />
            <span
              className={`absolute bottom-0 left-0 h-0.5 w-4 bg-ink transition-transform ${open ? '-translate-y-[6px] -rotate-45' : ''}`}
            />
          </span>
        </button>
      </div>

      {open && (
        <div className="border-t-2 border-ink bg-paper px-6 py-5 md:hidden">
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-base font-medium text-ink"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="mt-5 flex flex-col gap-4 border-t border-ink/15 pt-5">
            <Link to="/login" onClick={() => setOpen(false)} className="text-base font-semibold text-ink">
              Log in
            </Link>
            <Link
              to="/register"
              onClick={() => setOpen(false)}
              className="rounded-md border-2 border-ink bg-brand px-5 py-2.5 text-center text-base font-bold text-paper shadow-stamp-sm"
            >
              Sign up
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

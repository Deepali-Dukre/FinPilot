import { Link } from 'react-router-dom';
import Logo from '../ui/Logo';

const COLUMNS = [
  {
    title: 'Product',
    links: [
      { href: '#features', label: 'Features' },
      { href: '#how-it-works', label: 'How it works' },
      { href: '#faq', label: 'FAQ' },
    ],
  },
  {
    title: 'Account',
    links: [
      { href: '/login', label: 'Log in' },
      { href: '/register', label: 'Sign up' },
    ],
  },
];

export default function LandingFooter() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 sm:grid-cols-[1.3fr_1fr_1fr]">
          <div>
            <Logo light />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/60">
              A plainly-worded ledger for people who'd rather glance at a dashboard than open a spreadsheet.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-xs font-bold uppercase tracking-widest text-paper/50">{col.title}</h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    {link.href.startsWith('#') ? (
                      <a href={link.href} className="text-sm text-paper/80 hover:text-accent">
                        {link.label}
                      </a>
                    ) : (
                      <Link to={link.href} className="text-sm text-paper/80 hover:text-accent">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-paper/15 pt-8 sm:flex-row">
          <p className="text-xs text-paper/45">&copy; {new Date().getFullYear()} FinPilot. All rights reserved.</p>
          <p className="text-xs text-paper/45">Track it. Budget it. Fly straight.</p>
        </div>
      </div>
    </footer>
  );
}

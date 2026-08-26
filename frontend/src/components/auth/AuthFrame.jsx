import Logo from '../ui/Logo';
import AuthModeTabs from './AuthModeTabs';
import { ChartIcon, TargetIcon, WalletIcon } from '../ui/icons';

const CONTENT = {
  login: {
    badge: 'Good to have you back',
    headline: 'Pick up right where you left off.',
    highlights: [
      { icon: WalletIcon, title: 'Your dashboard is ready', desc: 'Every transaction since your last visit, already sorted.' },
      { icon: TargetIcon, title: 'Budgets kept running', desc: 'No pause, no re-setup — they tracked while you were away.' },
      { icon: ChartIcon, title: 'One tap back to logging', desc: 'Add today’s spend the moment you’re in.' },
    ],
  },
  register: {
    badge: 'Two minutes, no card required',
    headline: 'Start your first budget today.',
    highlights: [
      { icon: ChartIcon, title: 'See where it’s going', desc: 'Income, spend and savings in one dashboard.' },
      { icon: TargetIcon, title: 'Set a goal, watch it hold', desc: 'Targets that update automatically as you spend.' },
      { icon: WalletIcon, title: 'Log a spend in seconds', desc: 'No spreadsheets, no bank credentials, no busywork.' },
    ],
  },
};

export default function AuthFrame({ mode, children }) {
  const { badge, headline, highlights } = CONTENT[mode];

  return (
    <div className="flex min-h-screen bg-paper">
      <div className="relative hidden w-[46%] flex-col justify-between overflow-hidden bg-ink px-12 py-12 lg:flex">
        <div className="bg-dot-grid pointer-events-none absolute inset-0 text-paper/[0.08]" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -left-20 top-1/3 h-72 w-72 rounded-full bg-brand-light opacity-25 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-accent opacity-15 blur-3xl"
          aria-hidden="true"
        />

        <Logo light className="relative z-10" />

        <div className="relative z-10">
          <span className="inline-flex -rotate-2 items-center gap-2 border-2 border-paper/40 bg-white/5 px-3 py-1 text-xs font-bold uppercase tracking-wide text-paper">
            {badge}
          </span>
          <h1 className="font-display mt-6 max-w-md text-4xl font-semibold leading-[1.15] text-paper">
            {headline}
          </h1>

          <div className="mt-9 space-y-5">
            {highlights.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border-2 border-paper/30 bg-white/5 text-accent">
                  <Icon />
                </div>
                <div>
                  <p className="font-semibold text-paper">{title}</p>
                  <p className="mt-0.5 text-sm text-paper/60">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="relative z-10 text-sm text-paper/40">© {new Date().getFullYear()} FinPilot</p>
      </div>

      <div className="flex w-full flex-col items-center justify-center px-4 py-12 sm:px-6 lg:w-[54%]">
        <div className="w-full max-w-md">
          <div className="mb-8 flex justify-center lg:hidden">
            <Logo />
          </div>

          <div className="rounded-2xl border-2 border-ink bg-white p-8 shadow-stamp sm:p-10">
            <AuthModeTabs active={mode} />

            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

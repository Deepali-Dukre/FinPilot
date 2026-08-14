import { Link } from 'react-router-dom';
import HeroPreview from './HeroPreview';

export default function Hero() {
  return (
    <section className="relative overflow-hidden border-b-2 border-ink bg-paper">
      <div className="bg-dot-grid pointer-events-none absolute inset-x-0 top-0 h-full text-ink/[0.07]" aria-hidden="true" />

      <div className="relative mx-auto grid max-w-6xl gap-14 px-6 py-16 md:grid-cols-[1.05fr_1fr] md:items-center md:py-24">
        <div>
          <span className="inline-flex -rotate-2 items-center gap-2 border-2 border-ink bg-white px-3 py-1 text-xs font-bold uppercase tracking-wide text-ink shadow-stamp-sm">
            Built for real budgets, not spreadsheets
          </span>

          <h1 className="font-display mt-7 text-4xl font-semibold leading-[1.1] text-ink sm:text-5xl md:text-6xl">
            Money, mapped{' '}
            <span className="decoration-accent underline decoration-[0.2em] underline-offset-[0.12em]">
              before you spend it
            </span>
          </h1>

          <p className="mt-7 max-w-md text-lg leading-relaxed text-ink-soft">
            FinPilot logs every rupee, plots your budgets against reality, and tells you — plainly — whether
            you're on course for your goals or drifting off it.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              to="/register"
              className="rounded-md border-2 border-ink bg-brand px-7 py-3.5 text-sm font-bold text-paper shadow-stamp transition hover:-translate-y-0.5 hover:shadow-[9px_9px_0_0_var(--color-ink)] active:translate-y-0 active:shadow-none"
            >
              Start piloting — it's free
            </Link>
            <Link
              to="/login"
              className="rounded-md border-2 border-ink px-7 py-3.5 text-sm font-bold text-ink transition hover:bg-white"
            >
              I already have an account
            </Link>
          </div>
        </div>

        <HeroPreview />
      </div>
    </section>
  );
}

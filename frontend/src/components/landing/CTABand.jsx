import { Link } from 'react-router-dom';

export default function CTABand() {
  return (
    <section className="relative overflow-hidden border-y-2 border-ink bg-accent-soft">
      <div className="bg-dot-grid pointer-events-none absolute inset-0 text-ink/10" aria-hidden="true" />
      <div className="relative mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-16 text-center">
        <h2 className="font-display max-w-xl text-4xl font-semibold text-ink sm:text-5xl">
          Stop guessing where it went.
        </h2>
        <p className="max-w-md text-ink/70">
          Two minutes to set up. No spreadsheets, no bank credentials, no catch.
        </p>
        <Link
          to="/register"
          className="rounded-md border-2 border-ink bg-brand px-8 py-3.5 text-sm font-bold text-paper shadow-stamp-sm transition hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_var(--color-ink)] active:translate-y-0 active:shadow-none"
        >
          Create your free account
        </Link>
      </div>
    </section>
  );
}

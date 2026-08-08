import { Link } from 'react-router-dom';
import HeroPreview from './HeroPreview';
import { SparkleIcon } from '../ui/icons';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-violet-700 via-violet-800 to-indigo-950 text-white">
      <div
        className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-fuchsia-400 opacity-20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-24 top-40 h-96 w-96 rounded-full bg-emerald-400 opacity-10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-6xl gap-16 px-6 py-20 md:grid-cols-2 md:items-center md:py-28">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium">
            <SparkleIcon /> Smart Personal Finance
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl">
            Turn everyday spending into <span className="text-emerald-300">smart savings</span>
          </h1>

          <p className="mt-5 max-w-md text-lg text-violet-100">
            FinPilot helps you track transactions, plan budgets and hit your savings goals — all from one clean
            dashboard.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/register"
              className="rounded-lg bg-white px-6 py-3 text-sm font-semibold text-violet-700 shadow-lg hover:bg-violet-50"
            >
              Get started free
            </Link>
            <Link
              to="/login"
              className="rounded-lg border border-white/30 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Log in
            </Link>
          </div>
        </div>

        <HeroPreview />
      </div>
    </section>
  );
}

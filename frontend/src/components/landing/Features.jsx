import { ChartIcon, SparkleIcon, TargetIcon, WalletIcon } from '../ui/icons';

export default function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-24">
      <div className="max-w-xl">
        <p className="text-xs font-bold uppercase tracking-widest text-brand">What you get</p>
        <h2 className="font-display mt-3 text-4xl font-semibold text-ink">
          Everything money-related, in one honest place
        </h2>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-3 sm:auto-rows-[160px]">
        <div className="group relative overflow-hidden rounded-2xl border-2 border-ink bg-white p-7 transition hover:-translate-y-1 hover:shadow-stamp sm:col-span-2 sm:row-span-2">
          <div className="flex h-11 w-11 items-center justify-center rounded-md border-2 border-ink bg-brand text-paper">
            <ChartIcon />
          </div>
          <h3 className="font-display mt-5 text-2xl font-semibold text-ink">Dashboards that read like a story</h3>
          <p className="mt-3 max-w-sm text-ink-soft">
            Balance, income, expenses and savings — plotted together so you see the shape of your month, not just
            a pile of numbers.
          </p>
          <div className="mt-6 flex h-16 items-end gap-1.5 opacity-80">
            {[30, 55, 40, 70, 50, 85, 60, 75, 45, 65, 90, 55].map((h, i) => (
              <div key={i} className="flex-1 rounded-t-sm bg-brand/30" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>

        <div className="rounded-2xl border-2 border-ink bg-white p-6 transition hover:-translate-y-1 hover:shadow-stamp">
          <div className="flex h-10 w-10 items-center justify-center rounded-md border-2 border-ink bg-accent text-ink">
            <WalletIcon />
          </div>
          <h3 className="mt-4 font-semibold text-ink">Log a spend in seconds</h3>
          <p className="mt-1.5 text-sm text-ink-soft">Search, filter and categorize without the busywork.</p>
        </div>

        <div className="rounded-2xl border-2 border-ink bg-white p-6 transition hover:-translate-y-1 hover:shadow-stamp">
          <div className="flex h-10 w-10 items-center justify-center rounded-md border-2 border-ink bg-brand-light text-paper">
            <TargetIcon />
          </div>
          <h3 className="mt-4 font-semibold text-ink">Budgets that hold you to it</h3>
          <p className="mt-1.5 text-sm text-ink-soft">Set a target once, watch progress update as you spend.</p>
        </div>

        <div className="flex flex-col items-start gap-4 rounded-2xl border-2 border-ink bg-white p-6 transition hover:-translate-y-1 hover:shadow-stamp sm:col-span-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border-2 border-ink bg-ink text-accent">
              <SparkleIcon />
            </div>
            <div>
              <h3 className="font-semibold text-ink">A nudge before you overspend, not a report after</h3>
              <p className="mt-1 text-sm text-ink-soft">
                FinPilot flags unusual spending and near-limit categories while there's still time to act.
              </p>
            </div>
          </div>
          <span className="shrink-0 rounded-full border-2 border-ink px-3 py-1 text-xs font-semibold text-ink">
            Coming to every dashboard
          </span>
        </div>
      </div>
    </section>
  );
}

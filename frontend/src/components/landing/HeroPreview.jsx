export default function HeroPreview() {
  return (
    <div className="relative mx-auto w-full max-w-md pt-8 pr-12">
      <div className="rounded-2xl border-2 border-ink bg-white shadow-stamp-brand">
        <div className="flex items-center justify-between border-b-2 border-ink bg-brand px-5 py-3">
          <span className="text-sm font-bold text-paper">August ledger</span>
          <span className="rounded-full border border-paper/40 bg-white/10 px-2.5 py-0.5 text-xs font-semibold text-paper">
            on track
          </span>
        </div>

        <div className="p-5">
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-ink/15 bg-paper p-3">
              <p className="text-xs font-medium text-ink-soft">Balance</p>
              <p className="font-display mt-1 text-xl font-semibold text-ink">₹45,000</p>
            </div>
            <div className="rounded-lg border border-ink/15 bg-paper p-3">
              <p className="text-xs font-medium text-ink-soft">Saved this month</p>
              <p className="font-display mt-1 text-xl font-semibold text-brand">+₹8,200</p>
            </div>
          </div>

          <div className="mt-4 flex h-24 items-end gap-1.5">
            {[40, 65, 30, 80, 55, 95, 60, 45, 70, 50].map((h, i) => (
              <div
                key={i}
                className={`flex-1 rounded-t-sm ${i === 6 ? 'bg-accent' : 'bg-brand/25'}`}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          <div className="mt-2 flex justify-between text-[11px] font-medium text-ink-soft">
            <span>Aug 1</span>
            <span>Aug 31</span>
          </div>
        </div>
      </div>

      <div className="absolute -left-6 bottom-10 rotate-[-3deg] rounded-lg border-2 border-ink bg-accent px-4 py-2.5 shadow-stamp-sm">
        <p className="text-[11px] font-semibold text-ink/70">Goal · MacBook Pro</p>
        <p className="text-sm font-bold text-ink">60% reached</p>
      </div>

      <div className="absolute -top-4 right-0 rotate-[4deg] rounded-lg border-2 border-ink bg-white px-4 py-2.5 shadow-stamp-sm">
        <p className="text-[11px] font-semibold text-ink-soft">Income</p>
        <p className="text-sm font-bold text-brand">+₹80,000</p>
      </div>
    </div>
  );
}

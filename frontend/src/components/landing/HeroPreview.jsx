export default function HeroPreview() {
  return (
    <div className="relative mx-auto w-full max-w-lg">
      <div className="rounded-2xl border border-white/10 bg-white/10 p-5 shadow-2xl backdrop-blur">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm font-semibold text-white/90">This month</span>
          <span className="rounded-full bg-emerald-400/20 px-2 py-0.5 text-xs font-medium text-emerald-300">
            +18% saved
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-white/10 p-3">
            <p className="text-xs text-white/60">Balance</p>
            <p className="mt-1 text-lg font-bold text-white">₹45,000</p>
          </div>
          <div className="rounded-xl bg-white/10 p-3">
            <p className="text-xs text-white/60">Savings</p>
            <p className="mt-1 text-lg font-bold text-white">₹45,000</p>
          </div>
        </div>

        <div className="mt-4 flex h-24 items-end gap-2">
          {[40, 65, 30, 80, 55, 95, 60].map((h, i) => (
            <div key={i} className="flex-1 rounded-t bg-gradient-to-t from-violet-400 to-emerald-300" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>

      <div className="absolute -left-6 -top-6 rounded-xl border border-white/10 bg-white/90 px-4 py-2.5 shadow-xl">
        <p className="text-xs text-gray-400">Income</p>
        <p className="text-sm font-bold text-emerald-600">+₹80,000</p>
      </div>

      <div className="absolute -bottom-6 -right-4 rounded-xl border border-white/10 bg-white/90 px-4 py-2.5 shadow-xl">
        <p className="text-xs text-gray-400">Goal: MacBook Pro</p>
        <p className="text-sm font-bold text-violet-600">60% reached</p>
      </div>
    </div>
  );
}

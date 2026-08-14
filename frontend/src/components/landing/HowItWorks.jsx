const STEPS = [
  {
    step: '01',
    title: 'Create your account',
    description: 'Sign up in seconds — no credit card, no bank linking required to start.',
  },
  {
    step: '02',
    title: 'Add your transactions',
    description: 'Log income and expenses as they happen, or import a month in one go.',
  },
  {
    step: '03',
    title: 'Track and adjust',
    description: 'Watch budgets and goals update live, and course-correct before the month ends.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="border-y-2 border-ink bg-paper py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-brand">The route</p>
            <h2 className="font-display mt-3 text-4xl font-semibold text-ink">Three steps, then it runs itself</h2>
          </div>
        </div>

        <div className="relative mt-16 grid gap-10 sm:grid-cols-3">
          <svg
            className="pointer-events-none absolute left-0 top-6 hidden w-full text-ink/15 sm:block"
            height="2"
            viewBox="0 0 100 2"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <line x1="0" y1="1" x2="100" y2="1" stroke="currentColor" strokeWidth="2" strokeDasharray="0.5 4" />
          </svg>

          {STEPS.map(({ step, title, description }, i) => (
            <div key={step} className={i % 2 === 1 ? 'sm:mt-10' : ''}>
              <div className="font-display relative z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 border-ink bg-brand text-sm font-bold text-paper">
                {step}
              </div>
              <h3 className="mt-5 text-xl font-semibold text-ink">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

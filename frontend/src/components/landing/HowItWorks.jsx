const STEPS = [
  { step: '01', title: 'Create your account', description: 'Sign up in seconds — no credit card required.' },
  { step: '02', title: 'Add your transactions', description: 'Log income and expenses, or set up your categories.' },
  { step: '03', title: 'Track and grow', description: 'Watch your dashboard, budgets and goals update in real time.' },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-gray-50 py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold text-gray-900">Get started in three steps</h2>
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-3">
          {STEPS.map(({ step, title, description }) => (
            <div key={step} className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-violet-600 text-sm font-bold text-white">
                {step}
              </div>
              <h3 className="mt-4 font-semibold text-gray-900">{title}</h3>
              <p className="mt-2 text-sm text-gray-500">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

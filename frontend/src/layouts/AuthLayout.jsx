import Logo from '../components/ui/Logo';
import FinanceIllustration from '../components/ui/FinanceIllustration';

const FEATURES = [
  'Track income, expenses & transactions',
  'Set budgets and savings goals',
  'Visual analytics and dashboards',
];

export default function AuthLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-gradient-to-br from-violet-600 via-violet-700 to-indigo-900 p-12 text-white lg:flex">
        <div
          className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-fuchsia-400 opacity-20 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -bottom-32 -right-16 h-96 w-96 rounded-full bg-indigo-400 opacity-20 blur-3xl"
          aria-hidden="true"
        />

        <Logo light className="relative z-10" />

        <div className="relative z-10 flex flex-col items-center gap-8 text-center">
          <FinanceIllustration />
          <div>
            <h2 className="text-3xl font-bold leading-tight">Take control of your money</h2>
            <p className="mt-2 max-w-sm text-violet-200">
              One place to plan, track and grow your personal finances.
            </p>
          </div>
        </div>

        <ul className="relative z-10 space-y-3">
          {FEATURES.map((feature) => (
            <li key={feature} className="flex items-center gap-3 text-sm text-violet-100">
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/15 text-xs">
                &#10003;
              </span>
              {feature}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex w-full flex-col items-center justify-center px-4 py-12 lg:w-1/2">
        <div className="w-full max-w-sm">
          <div className="mb-8 flex justify-center lg:hidden">
            <Logo />
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-8 shadow-xl shadow-gray-200/60">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

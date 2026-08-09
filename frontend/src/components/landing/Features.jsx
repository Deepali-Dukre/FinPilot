import { ChartIcon, TargetIcon, WalletIcon } from '../ui/icons';

const FEATURES = [
  {
    icon: ChartIcon,
    title: 'Visual dashboards',
    description: 'See your balance, income, expenses and savings at a glance with live charts.',
  },
  {
    icon: WalletIcon,
    title: 'Effortless transactions',
    description: 'Log income and expenses in seconds, then search, filter and categorize with ease.',
  },
  {
    icon: TargetIcon,
    title: 'Budgets & goals',
    description: 'Set monthly budgets and savings targets, and track progress as you go.',
  },
];

export default function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-20">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold text-gray-900">Everything you need to stay on top of your money</h2>
        <p className="mt-3 text-gray-500">One place to plan, track and grow your personal finances.</p>
      </div>

      <div className="mt-14 grid gap-8 sm:grid-cols-3">
        {FEATURES.map(({ icon: Icon, title, description }) => (
          <div key={title} className="rounded-2xl border border-gray-100 p-6 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-violet-600">
              <Icon />
            </div>
            <h3 className="mt-4 font-semibold text-gray-900">{title}</h3>
            <p className="mt-2 text-sm text-gray-500">{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

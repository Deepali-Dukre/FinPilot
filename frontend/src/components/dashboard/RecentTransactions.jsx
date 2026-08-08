import Card from '../ui/Card';
import EmptyState from '../ui/EmptyState';
import { formatCurrency } from '../../utils/formatCurrency';

export default function RecentTransactions({ transactions }) {
  return (
    <Card>
      <p className="mb-4 text-sm font-semibold text-gray-700">Recent Transactions</p>
      {transactions.length === 0 ? (
        <EmptyState title="No transactions yet" description="Add your first transaction to see it here." />
      ) : (
        <ul className="divide-y divide-gray-100">
          {transactions.map((t) => (
            <li key={t._id} className="flex items-center justify-between py-2 text-sm">
              <div>
                <p className="font-medium text-gray-800">{t.title}</p>
                <p className="text-xs text-gray-400">
                  {t.category?.name} &middot; {new Date(t.date).toLocaleDateString()}
                </p>
              </div>
              <span className={t.type === 'income' ? 'text-green-600' : 'text-red-500'}>
                {t.type === 'income' ? '+' : '-'}
                {formatCurrency(t.amount)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}

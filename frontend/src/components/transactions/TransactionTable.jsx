import Button from '../ui/Button';
import EmptyState from '../ui/EmptyState';
import { formatCurrency } from '../../utils/formatCurrency';

export default function TransactionTable({ transactions, onEdit, onDelete }) {
  if (transactions.length === 0) {
    return <EmptyState title="No transactions found" description="Try adjusting your filters or add a new transaction." />;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-gray-200 text-gray-500">
            <th className="py-2 pr-4">Title</th>
            <th className="py-2 pr-4">Category</th>
            <th className="py-2 pr-4">Date</th>
            <th className="py-2 pr-4">Payment</th>
            <th className="py-2 pr-4">Amount</th>
            <th className="py-2 pr-4"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {transactions.map((t) => (
            <tr key={t._id}>
              <td className="py-2 pr-4 font-medium text-gray-800">{t.title}</td>
              <td className="py-2 pr-4 text-gray-500">{t.category?.name}</td>
              <td className="py-2 pr-4 text-gray-500">{new Date(t.date).toLocaleDateString()}</td>
              <td className="py-2 pr-4 capitalize text-gray-500">{t.paymentMethod?.replace('_', ' ')}</td>
              <td className={`py-2 pr-4 font-semibold ${t.type === 'income' ? 'text-green-600' : 'text-red-500'}`}>
                {t.type === 'income' ? '+' : '-'}
                {formatCurrency(t.amount)}
              </td>
              <td className="py-2 pr-4">
                <div className="flex gap-2">
                  <Button variant="secondary" onClick={() => onEdit(t)}>
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => onDelete(t)}>
                    Delete
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

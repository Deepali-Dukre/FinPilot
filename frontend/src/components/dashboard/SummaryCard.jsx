import Card from '../ui/Card';
import { formatCurrency } from '../../utils/formatCurrency';

export default function SummaryCard({ label, amount, accent = 'text-gray-800' }) {
  return (
    <Card>
      <p className="text-sm text-gray-500">{label}</p>
      <p className={`mt-1 text-2xl font-bold ${accent}`}>{formatCurrency(amount)}</p>
    </Card>
  );
}

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from 'recharts';
import Card from '../ui/Card';

export default function IncomeExpenseChart({ data }) {
  return (
    <Card>
      <p className="mb-4 text-sm font-semibold text-gray-700">Income vs Expense (last 6 months)</p>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="label" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#7c3aed" radius={[4, 4, 0, 0]} />
            <Bar dataKey="expense" fill="#f97316" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

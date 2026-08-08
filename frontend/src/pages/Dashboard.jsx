import { useEffect, useState } from 'react';
import { fetchSummary, fetchTrend, fetchRecentTransactions } from '../api/dashboard.api';
import SummaryCard from '../components/dashboard/SummaryCard';
import IncomeExpenseChart from '../components/dashboard/IncomeExpenseChart';
import RecentTransactions from '../components/dashboard/RecentTransactions';
import { PageSkeleton } from '../components/ui/Skeleton';

export default function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [trend, setTrend] = useState([]);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([fetchSummary(), fetchTrend(), fetchRecentTransactions()])
      .then(([summaryData, trendData, recentData]) => {
        setSummary(summaryData);
        setTrend(trendData);
        setRecent(recentData);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <PageSkeleton />;

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard label="Total Balance" amount={summary.totalBalance} accent="text-violet-600" />
        <SummaryCard label="Income" amount={summary.income} accent="text-green-600" />
        <SummaryCard label="Expense" amount={summary.expense} accent="text-red-500" />
        <SummaryCard label="Savings" amount={summary.savings} accent="text-blue-600" />
      </div>

      <IncomeExpenseChart data={trend} />
      <RecentTransactions transactions={recent} />
    </div>
  );
}

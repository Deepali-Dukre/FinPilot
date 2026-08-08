import { useEffect, useState } from 'react';
import { fetchAdminStats } from '../../api/admin.api';
import Card from '../../components/ui/Card';
import { PageSkeleton } from '../../components/ui/Skeleton';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    fetchAdminStats().then(setStats);
  }, []);

  if (!stats) return <PageSkeleton />;

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-gray-800">Admin Overview</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <p className="text-sm text-gray-500">Total Users</p>
          <p className="mt-1 text-2xl font-bold text-violet-600">{stats.totalUsers}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500">Total Transactions</p>
          <p className="mt-1 text-2xl font-bold text-gray-800">{stats.totalTransactions}</p>
        </Card>
        <Card>
          <p className="text-sm text-gray-500">New Users This Month</p>
          <p className="mt-1 text-2xl font-bold text-green-600">{stats.newUsersThisMonth}</p>
        </Card>
      </div>
    </div>
  );
}

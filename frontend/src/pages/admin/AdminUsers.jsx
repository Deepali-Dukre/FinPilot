import { useEffect, useState, useCallback } from 'react';
import { fetchUsers, updateUserRole, toggleUserActive } from '../../api/admin.api';
import { useAuth } from '../../hooks/useAuth';
import Card from '../../components/ui/Card';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import Pagination from '../../components/ui/Pagination';
import { PageSkeleton } from '../../components/ui/Skeleton';

export default function AdminUsers() {
  const { user: currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [meta, setMeta] = useState({ page: 1, pages: 1 });
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    return fetchUsers({ search, page, limit: 10 })
      .then((res) => {
        setUsers(res.data);
        setMeta(res.meta);
      })
      .finally(() => setLoading(false));
  }, [search, page]);

  useEffect(() => {
    load();
  }, [load]);

  const handleRoleToggle = async (u) => {
    const newRole = u.role === 'admin' ? 'user' : 'admin';
    await updateUserRole(u._id, newRole);
    load();
  };

  const handleActiveToggle = async (u) => {
    await toggleUserActive(u._id);
    load();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-gray-800">Users</h1>

      <Card>
        <Input
          label="Search"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => {
            setPage(1);
            setSearch(e.target.value);
          }}
        />
      </Card>

      <Card>
        {loading ? (
          <PageSkeleton />
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-gray-500">
                    <th className="py-2 pr-4">Name</th>
                    <th className="py-2 pr-4">Email</th>
                    <th className="py-2 pr-4">Role</th>
                    <th className="py-2 pr-4">Status</th>
                    <th className="py-2 pr-4"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {users.map((u) => (
                    <tr key={u._id}>
                      <td className="py-2 pr-4 font-medium text-gray-800">{u.name}</td>
                      <td className="py-2 pr-4 text-gray-500">{u.email}</td>
                      <td className="py-2 pr-4 capitalize text-gray-500">{u.role}</td>
                      <td className="py-2 pr-4">
                        <span className={u.isActive ? 'text-green-600' : 'text-red-500'}>
                          {u.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="py-2 pr-4">
                        {u._id !== currentUser.id && (
                          <div className="flex gap-2">
                            <Button variant="secondary" onClick={() => handleRoleToggle(u)}>
                              Make {u.role === 'admin' ? 'User' : 'Admin'}
                            </Button>
                            <Button variant="danger" onClick={() => handleActiveToggle(u)}>
                              {u.isActive ? 'Deactivate' : 'Activate'}
                            </Button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination page={meta.page} pages={meta.pages} onChange={setPage} />
          </>
        )}
      </Card>
    </div>
  );
}

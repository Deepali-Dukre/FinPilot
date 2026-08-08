import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const navItems = [
  { to: '/admin', label: 'Overview', end: true },
  { to: '/admin/users', label: 'Users' },
];

export default function AdminLayout() {
  const { logout } = useAuth();

  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-56 shrink-0 border-r border-gray-200 bg-white p-4">
        <div className="mb-8 text-xl font-bold text-violet-600">FinPilot Admin</div>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `block rounded-md px-3 py-2 text-sm font-medium ${
                  isActive ? 'bg-violet-100 text-violet-700' : 'text-gray-600 hover:bg-gray-100'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <NavLink
            to="/dashboard"
            className="block rounded-md px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
          >
            Back to app
          </NavLink>
        </nav>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex items-center justify-end border-b border-gray-200 bg-white px-6 py-4">
          <button
            onClick={logout}
            className="rounded-md px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100"
          >
            Logout
          </button>
        </header>
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

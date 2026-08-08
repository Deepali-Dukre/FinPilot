import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import ProtectedRoute from './routes/ProtectedRoute';
import AdminRoute from './routes/AdminRoute';
import DashboardLayout from './layouts/DashboardLayout';
import AdminLayout from './layouts/AdminLayout';
import { PageSkeleton } from './components/ui/Skeleton';

const Landing = lazy(() => import('./pages/Landing'));
const Login = lazy(() => import('./pages/auth/Login'));
const Register = lazy(() => import('./pages/auth/Register'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/auth/ResetPassword'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Transactions = lazy(() => import('./pages/Transactions'));
const Categories = lazy(() => import('./pages/Categories'));
const AdminDashboard = lazy(() => import('./pages/admin/AdminDashboard'));
const AdminUsers = lazy(() => import('./pages/admin/AdminUsers'));
const NotFound = lazy(() => import('./pages/NotFound'));

function App() {
  return (
    <Suspense fallback={<PageSkeleton />}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/categories" element={<Categories />} />
          </Route>
        </Route>

        <Route element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<AdminUsers />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

export default App;

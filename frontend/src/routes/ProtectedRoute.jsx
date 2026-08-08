import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { PageSkeleton } from '../components/ui/Skeleton';

export default function ProtectedRoute() {
  const { user, loading } = useAuth();

  if (loading) return <PageSkeleton />;
  if (!user) return <Navigate to="/login" replace />;

  return <Outlet />;
}

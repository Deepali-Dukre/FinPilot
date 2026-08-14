import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import LandingNavbar from '../components/landing/LandingNavbar';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import HowItWorks from '../components/landing/HowItWorks';
import FAQ from '../components/landing/FAQ';
import CTABand from '../components/landing/CTABand';
import LandingFooter from '../components/landing/LandingFooter';
import { PageSkeleton } from '../components/ui/Skeleton';

export default function Landing() {
  const { user, loading } = useAuth();

  if (loading) return <PageSkeleton />;
  if (user) return <Navigate to="/dashboard" replace />;

  return (
    <div>
      <LandingNavbar />
      <Hero />
      <Features />
      <HowItWorks />
      <FAQ />
      <CTABand />
      <LandingFooter />
    </div>
  );
}

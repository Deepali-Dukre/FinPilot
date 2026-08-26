import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import AuthField from '../../components/auth/AuthField';
import AuthPasswordField from '../../components/auth/AuthPasswordField';
import AuthButton from '../../components/auth/AuthButton';
import AuthFrame from '../../components/auth/AuthFrame';
import { MailIcon } from '../../components/ui/icons';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (values) => {
    setServerError('');
    try {
      await login(values);
      navigate('/dashboard');
    } catch (err) {
      setServerError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <AuthFrame mode="login">
      <h2 className="font-display mt-6 text-2xl font-semibold text-ink">Welcome back</h2>
      <p className="mb-6 mt-1 text-sm text-ink-soft">Log in to keep your budget on course.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <AuthField
          label="Email"
          type="email"
          icon={<MailIcon />}
          error={errors.email?.message}
          {...register('email', { required: 'Email is required' })}
        />
        <AuthPasswordField
          label="Password"
          error={errors.password?.message}
          {...register('password', { required: 'Password is required' })}
        />
        {serverError && <p className="text-sm font-medium text-red-600">{serverError}</p>}
        <AuthButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Logging in...' : 'Log in'}
        </AuthButton>
      </form>

      <p className="mt-5 text-center text-sm text-ink-soft">
        <Link to="/forgot-password" className="font-semibold text-brand hover:underline">
          Forgot password?
        </Link>
      </p>
    </AuthFrame>
  );
}

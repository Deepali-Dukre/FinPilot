import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Input from '../../components/ui/Input';
import PasswordInput from '../../components/ui/PasswordInput';
import Button from '../../components/ui/Button';
import AuthTabs from '../../components/ui/AuthTabs';
import AuthLayout from '../../layouts/AuthLayout';
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
    <AuthLayout>
      <AuthTabs active="login" />

      <h2 className="mb-1 text-xl font-semibold text-gray-900">Welcome back</h2>
      <p className="mb-6 text-sm text-gray-500">Log in to your account</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Email"
          type="email"
          icon={<MailIcon />}
          error={errors.email?.message}
          {...register('email', { required: 'Email is required' })}
        />
        <PasswordInput
          label="Password"
          error={errors.password?.message}
          {...register('password', { required: 'Password is required' })}
        />
        {serverError && <p className="text-sm text-red-500">{serverError}</p>}
        <Button type="submit" className="w-full py-2.5" disabled={isSubmitting}>
          {isSubmitting ? 'Logging in...' : 'Log in'}
        </Button>
      </form>

      <p className="mt-5 text-center text-sm">
        <Link to="/forgot-password" className="text-violet-600 hover:underline">
          Forgot password?
        </Link>
      </p>
    </AuthLayout>
  );
}

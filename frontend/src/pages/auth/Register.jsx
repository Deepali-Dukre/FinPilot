import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Input from '../../components/ui/Input';
import PasswordInput from '../../components/ui/PasswordInput';
import Button from '../../components/ui/Button';
import AuthTabs from '../../components/ui/AuthTabs';
import AuthLayout from '../../layouts/AuthLayout';
import { MailIcon, UserIcon } from '../../components/ui/icons';

export default function Register() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (values) => {
    setServerError('');
    try {
      await registerUser({ ...values, name: values.name.trim(), email: values.email.trim() });
      navigate('/dashboard');
    } catch (err) {
      const status = err.response?.status;
      const message = err.response?.data?.message || 'Registration failed';

      if (status === 409) {
        setError('email', { type: 'manual', message });
      } else {
        setServerError(message);
      }
    }
  };

  return (
    <AuthLayout>
      <AuthTabs active="register" />

      <h2 className="mb-1 text-xl font-semibold text-gray-900">Create your account</h2>
      <p className="mb-6 text-sm text-gray-500">Start tracking your finances in minutes</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Name"
          icon={<UserIcon />}
          error={errors.name?.message}
          {...register('name', {
            required: 'Name is required',
            minLength: { value: 2, message: 'Name must be at least 2 characters' },
            validate: (value) => value.trim().length > 0 || 'Name is required',
          })}
        />
        <Input
          label="Email"
          type="email"
          icon={<MailIcon />}
          error={errors.email?.message}
          {...register('email', {
            required: 'Email is required',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Enter a valid email address',
            },
          })}
        />
        <PasswordInput
          label="Password"
          error={errors.password?.message}
          {...register('password', {
            required: 'Password is required',
            minLength: { value: 6, message: 'Minimum 6 characters' },
          })}
        />
        {serverError && <p className="text-sm text-red-500">{serverError}</p>}
        <Button type="submit" className="w-full py-2.5" disabled={isSubmitting}>
          {isSubmitting ? 'Creating account...' : 'Create account'}
        </Button>
      </form>
    </AuthLayout>
  );
}

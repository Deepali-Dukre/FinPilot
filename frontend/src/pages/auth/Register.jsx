import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import AuthField from '../../components/auth/AuthField';
import AuthPasswordField from '../../components/auth/AuthPasswordField';
import AuthButton from '../../components/auth/AuthButton';
import AuthFrame from '../../components/auth/AuthFrame';
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
    <AuthFrame mode="register">
      <h2 className="font-display mt-6 text-2xl font-semibold text-ink">Create your account</h2>
      <p className="mb-6 mt-1 text-sm text-ink-soft">Start tracking your finances in minutes.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <AuthField
          label="Name"
          icon={<UserIcon />}
          error={errors.name?.message}
          {...register('name', {
            required: 'Name is required',
            minLength: { value: 2, message: 'Name must be at least 2 characters' },
            validate: (value) => value.trim().length > 0 || 'Name is required',
          })}
        />
        <AuthField
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
        <AuthPasswordField
          label="Password"
          error={errors.password?.message}
          {...register('password', {
            required: 'Password is required',
            minLength: { value: 6, message: 'Minimum 6 characters' },
          })}
        />
        {serverError && <p className="text-sm font-medium text-red-600">{serverError}</p>}
        <AuthButton type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Creating account...' : 'Create account'}
        </AuthButton>
      </form>
    </AuthFrame>
  );
}

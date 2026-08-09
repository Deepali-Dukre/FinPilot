import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { forgotPassword } from '../../api/auth.api';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import AuthLayout from '../../layouts/AuthLayout';
import { MailIcon } from '../../components/ui/icons';

export default function ForgotPassword() {
  const [message, setMessage] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (values) => {
    const res = await forgotPassword(values.email);
    setMessage(res.message);
  };

  return (
    <AuthLayout>
      <h2 className="mb-1 text-xl font-semibold text-gray-900">Reset your password</h2>
      <p className="mb-6 text-sm text-gray-500">We&apos;ll send you a link to reset your password</p>

      {message ? (
        <p className="text-sm text-gray-600">{message}</p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Email"
            type="email"
            icon={<MailIcon />}
            error={errors.email?.message}
            {...register('email', { required: 'Email is required' })}
          />
          <Button type="submit" className="w-full py-2.5" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send reset link'}
          </Button>
        </form>
      )}

      <p className="mt-5 text-center text-sm">
        <Link to="/login" className="text-violet-600 hover:underline">
          Back to login
        </Link>
      </p>
    </AuthLayout>
  );
}

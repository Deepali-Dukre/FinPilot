import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { resetPassword } from '../../api/auth.api';
import PasswordInput from '../../components/ui/PasswordInput';
import Button from '../../components/ui/Button';
import AuthLayout from '../../layouts/AuthLayout';

export default function ResetPassword() {
  const { token } = useParams();
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
      await resetPassword(token, values.password);
      navigate('/login');
    } catch (err) {
      setServerError(err.response?.data?.message || 'Reset failed');
    }
  };

  return (
    <AuthLayout>
      <h2 className="mb-1 text-xl font-semibold text-gray-900">Choose a new password</h2>
      <p className="mb-6 text-sm text-gray-500">Enter a new password for your account</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <PasswordInput
          label="New password"
          error={errors.password?.message}
          {...register('password', {
            required: 'Password is required',
            minLength: { value: 6, message: 'Minimum 6 characters' },
          })}
        />
        {serverError && <p className="text-sm text-red-500">{serverError}</p>}
        <Button type="submit" className="w-full py-2.5" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Reset password'}
        </Button>
      </form>

      <p className="mt-5 text-center text-sm">
        <Link to="/login" className="text-violet-600 hover:underline">
          Back to login
        </Link>
      </p>
    </AuthLayout>
  );
}

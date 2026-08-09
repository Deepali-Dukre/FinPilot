import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../ui/Input';
import Button from '../ui/Button';

const PAYMENT_METHODS = ['cash', 'card', 'upi', 'bank_transfer', 'other'];

export default function TransactionForm({ categories, initialValues, onSubmit, onCancel }) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: initialValues || {
      title: '',
      amount: '',
      type: 'expense',
      category: '',
      date: new Date().toISOString().slice(0, 10),
      notes: '',
      paymentMethod: 'cash',
    },
  });

  useEffect(() => {
    if (initialValues) {
      reset({ ...initialValues, date: initialValues.date?.slice(0, 10) });
    }
  }, [initialValues, reset]);

  const type = watch('type');
  const filteredCategories = categories.filter((c) => c.type === type);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input label="Title" error={errors.title?.message} {...register('title', { required: 'Title is required' })} />
      <Input
        label="Amount"
        type="number"
        step="0.01"
        error={errors.amount?.message}
        {...register('amount', { required: 'Amount is required', min: { value: 0.01, message: 'Must be greater than 0' } })}
      />

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-gray-700">Type</span>
        <select className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" {...register('type')}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </label>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-gray-700">Category</span>
        <select
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
          {...register('category', { required: 'Category is required' })}
        >
          <option value="">Select category</option>
          {filteredCategories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
        {errors.category && <span className="mt-1 block text-xs text-red-500">{errors.category.message}</span>}
      </label>

      <Input label="Date" type="date" error={errors.date?.message} {...register('date', { required: 'Date is required' })} />

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-gray-700">Payment Method</span>
        <select className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm" {...register('paymentMethod')}>
          {PAYMENT_METHODS.map((m) => (
            <option key={m} value={m}>
              {m.replace('_', ' ')}
            </option>
          ))}
        </select>
      </label>

      <Input label="Notes" {...register('notes')} />

      <div className="flex justify-end gap-2 pt-2">
        <Button type="button" variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Save'}
        </Button>
      </div>
    </form>
  );
}

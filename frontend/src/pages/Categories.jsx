import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { fetchCategories, createCategory, deleteCategory } from '../api/categories.api';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { PageSkeleton } from '../components/ui/Skeleton';

function CategoryList({ title, categories, onDelete }) {
  return (
    <Card>
      <p className="mb-3 text-sm font-semibold text-gray-700">{title}</p>
      <ul className="space-y-2">
        {categories.map((c) => (
          <li key={c._id} className="flex items-center justify-between text-sm">
            <span className="text-gray-700">{c.name}</span>
            {c.isDefault ? (
              <span className="text-xs text-gray-400">Default</span>
            ) : (
              <button onClick={() => onDelete(c)} className="text-xs text-red-500 hover:underline">
                Remove
              </button>
            )}
          </li>
        ))}
      </ul>
    </Card>
  );
}

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm({ defaultValues: { name: '', type: 'expense' } });

  const load = () => fetchCategories().then(setCategories).finally(() => setLoading(false));

  useEffect(() => {
    load();
  }, []);

  const onSubmit = async (values) => {
    await createCategory(values);
    reset({ name: '', type: values.type });
    load();
  };

  const handleDelete = async (category) => {
    if (!confirm(`Remove category "${category.name}"?`)) return;
    await deleteCategory(category._id);
    load();
  };

  if (loading) return <PageSkeleton />;

  const income = categories.filter((c) => c.type === 'income');
  const expense = categories.filter((c) => c.type === 'expense');

  return (
    <div className="space-y-6">
      <h1 className="text-xl font-bold text-gray-800">Categories</h1>

      <Card>
        <p className="mb-3 text-sm font-semibold text-gray-700">Add custom category</p>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-wrap items-end gap-3">
          <Input label="Name" {...register('name', { required: true })} />
          <label className="block text-sm">
            <span className="mb-1 block font-medium text-gray-700">Type</span>
            <select className="rounded-md border border-gray-300 px-3 py-2 text-sm" {...register('type')}>
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </label>
          <Button type="submit" disabled={isSubmitting}>
            Add
          </Button>
        </form>
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <CategoryList title="Income Categories" categories={income} onDelete={handleDelete} />
        <CategoryList title="Expense Categories" categories={expense} onDelete={handleDelete} />
      </div>
    </div>
  );
}

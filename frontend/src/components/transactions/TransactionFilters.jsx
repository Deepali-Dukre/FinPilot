import Input from '../ui/Input';

export default function TransactionFilters({ filters, categories, onChange }) {
  const set = (patch) => onChange({ ...filters, page: 1, ...patch });

  return (
    <div className="flex flex-wrap items-end gap-3">
      <Input
        label="Search"
        placeholder="Search by title..."
        value={filters.search}
        onChange={(e) => set({ search: e.target.value })}
      />

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-gray-700">Type</span>
        <select
          className="rounded-md border border-gray-300 px-3 py-2 text-sm"
          value={filters.type}
          onChange={(e) => set({ type: e.target.value })}
        >
          <option value="">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
      </label>

      <label className="block text-sm">
        <span className="mb-1 block font-medium text-gray-700">Category</span>
        <select
          className="rounded-md border border-gray-300 px-3 py-2 text-sm"
          value={filters.category}
          onChange={(e) => set({ category: e.target.value })}
        >
          <option value="">All</option>
          {categories.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

import { useEffect, useState, useCallback } from 'react';
import {
  fetchTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from '../api/transactions.api';
import { fetchCategories } from '../api/categories.api';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import Pagination from '../components/ui/Pagination';
import TransactionForm from '../components/transactions/TransactionForm';
import TransactionTable from '../components/transactions/TransactionTable';
import TransactionFilters from '../components/transactions/TransactionFilters';
import { PageSkeleton } from '../components/ui/Skeleton';

const DEFAULT_FILTERS = { search: '', type: '', category: '', page: 1 };

export default function Transactions() {
  const [categories, setCategories] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [meta, setMeta] = useState({ page: 1, pages: 1 });
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const loadTransactions = useCallback(() => {
    return fetchTransactions({ ...filters, limit: 10 })
      .then((res) => {
        setTransactions(res.data);
        setMeta(res.meta);
      })
      .finally(() => setLoading(false));
  }, [filters]);

  useEffect(() => {
    fetchCategories().then(setCategories);
  }, []);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  const openCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };

  const openEdit = (transaction) => {
    setEditing(transaction);
    setModalOpen(true);
  };

  const handleSubmit = async (values) => {
    const payload = { ...values, category: values.category, amount: Number(values.amount) };
    if (editing) {
      await updateTransaction(editing._id, payload);
    } else {
      await createTransaction(payload);
    }
    setModalOpen(false);
    loadTransactions();
  };

  const handleDelete = async (transaction) => {
    if (!confirm(`Delete "${transaction.title}"?`)) return;
    await deleteTransaction(transaction._id);
    loadTransactions();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">Transactions</h1>
        <Button onClick={openCreate}>Add Transaction</Button>
      </div>

      <Card>
        <TransactionFilters filters={filters} categories={categories} onChange={setFilters} />
      </Card>

      <Card>
        {loading ? (
          <PageSkeleton />
        ) : (
          <>
            <TransactionTable transactions={transactions} onEdit={openEdit} onDelete={handleDelete} />
            <Pagination page={meta.page} pages={meta.pages} onChange={(page) => setFilters((f) => ({ ...f, page }))} />
          </>
        )}
      </Card>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Transaction' : 'Add Transaction'}>
        <TransactionForm
          categories={categories}
          initialValues={
            editing ? { ...editing, category: editing.category?._id } : null
          }
          onSubmit={handleSubmit}
          onCancel={() => setModalOpen(false)}
        />
      </Modal>
    </div>
  );
}

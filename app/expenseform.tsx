'use client';

import { useState } from 'react';
import { Expense } from '@/domain/model';

type ExpenseInput = {
  title: string;
  amount: string; 
  date: string;
};

export default function AddExpenseForm({
  onAdd,
}: {
  onAdd: (expense: Expense) => void;
}) {
  const [input, setInput] = useState<ExpenseInput>({
    title: '',
    amount: '',
    date: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!input.title.trim()) {
      setError('Title cannot be empty');
      return;
    }

    const amountNum = Number(input.amount.replace(',', '.'));
    if (isNaN(amountNum) || amountNum <= 0) {
      setError('Amount must be greater than 0');
      return;
    }

    if (!input.date) {
      setError('Date is required');
      return;
    }

    setLoading(true);

    try {
      const sanitizedInput = {
        ...input,
        amount: amountNum,
      };

      const response = await fetch('/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sanitizedInput),
      });

      if (!response.ok) {
        throw new Error('Failed to add expense');
      }

      const data = await response.json();
      onAdd(data); 
      setInput({ title: '', amount: '', date: '' }); // wyczyść pola
    } catch (err: any) {
      setError(err.message ?? 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

    return (
    <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
    >
        <h2 className="text-xl font-bold mb-4 text-center">Add Expense</h2>

        {error && <p className="text-red-600 mb-3">{error}</p>}

        <label className="block mb-2 font-medium">Title</label>
        <input
        type="text"
        value={input.title}
        onChange={e => setInput({ ...input, title: e.target.value })}
        placeholder="Enter title"
        required
        className="w-full p-2 border border-gray-300 rounded mb-4 focus:ring-2 focus:ring-indigo-500"
        />

        <label className="block mb-2 font-medium">Amount (zł)</label>
        <input
        type="text"
        value={input.amount}
        onChange={e => setInput({ ...input, amount: e.target.value })}
        placeholder="0,00"
        required
        className="w-full p-2 border border-gray-300 rounded mb-4 focus:ring-2 focus:ring-indigo-500"
        />

        <label className="block mb-2 font-medium">Date</label>
        <input
        type="date"
        value={input.date}
        onChange={e => setInput({ ...input, date: e.target.value })}
        required
        className="w-full p-2 border border-gray-300 rounded mb-4 focus:ring-2 focus:ring-indigo-500"
        />

        <button
        type="submit"
        disabled={loading}
        className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded transition"
        >
        {loading ? 'Adding…' : 'Add Expense'}
        </button>
    </form>
    );
}

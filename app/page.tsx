'use client';

import { useState } from 'react';
import { Expense } from '@/domain/model';

type ExpenseInput = {
  title: string;
  amount: string;
  date: string;
};

type ValidationResult = { valid: boolean; error?: string };

function validateExpense(input: ExpenseInput): ValidationResult {
  if (!input.title.trim()) {
    return { valid: false, error: 'Tytuł nie może być pusty' };
  }

  const amountNum = Number(input.amount.replace(',', '.'));
  if (isNaN(amountNum) || amountNum <= 0) {
    return { valid: false, error: 'Kwota musi być większa od 0' };
  }

  if (!input.date) {
    return { valid: false, error: 'Data jest wymagana' };
  }

  const dateObj = new Date(input.date);
  if (isNaN(dateObj.getTime())) {
    return { valid: false, error: 'Nieprawidłowy format daty' };
  }

  return { valid: true };
}

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

    const validation = validateExpense(input);
    if (!validation.valid) {
      setError(validation.error ?? 'Nieprawidłowe dane');
      return;
    }

    const amountNum = Number(input.amount.replace(',', '.'));
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
        throw new Error('Nie udało się dodać wydatku');
      }

      const data = await response.json();
      onAdd(data);
      setInput({ title: '', amount: '', date: '' }); 
    } catch (err: any) {
      setError(err.message ?? 'Nieznany błąd');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700"
    >
      <h2 className="text-xl font-bold mb-4 text-center">ADodaj wydatek</h2>

      {error && <p className="text-red-600 mb-3">{error}</p>}

      <label className="block mb-2 font-medium">Tytuł</label>
      <input
        type="text"
        value={input.title}
        onChange={e => setInput({ ...input, title: e.target.value })}
        placeholder="Enter title"
        required
        className="w-full p-2 border border-gray-300 rounded mb-4 focus:ring-2 focus:ring-indigo-500"
      />

      <label className="block mb-2 font-medium">Kwota (zł)</label>
      <input
        type="text"
        value={input.amount}
        onChange={e => setInput({ ...input, amount: e.target.value })}
        placeholder="0,00"
        required
        className="w-full p-2 border border-gray-300 rounded mb-4 focus:ring-2 focus:ring-indigo-500"
      />

      <label className="block mb-2 font-medium">Data</label>
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
        {loading ? 'Dodawanie...' : 'Dodaj wydatek'}
      </button>
    </form>
  );
}

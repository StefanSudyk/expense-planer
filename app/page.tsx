'use client';

import { useState } from 'react';
import { Expense } from '@/domain/model';
import AddExpenseForm from './expenseform';

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  // Funkcja obsługująca dodanie wydatku
  const handleAddExpense = (expense: Expense) => {
    setExpenses(prev => [...prev, expense]);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Moje wydatki</h1>

      {/* Formularz dodawania wydatku */}
      <AddExpenseForm onAdd={handleAddExpense} />

      {/* Lista wydatków */}
      <ul className="mt-6 space-y-2">
        {expenses.map(e => (
          <li key={e.id} className="border p-2 rounded">
            {e.title} – {e.amount} zł – {e.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

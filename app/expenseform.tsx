'use client';

import { Expense } from '@/domain/model';
import { useExpenseForm } from './hooks/useExpensesForm';
import { ExpenseFormView } from './components/expenseformView';

export default function AddExpenseForm({ onAdd }: { onAdd: (expense: Expense) => void }) {
  const logic = useExpenseForm(onAdd);

  return <ExpenseFormView {...logic} />;
}
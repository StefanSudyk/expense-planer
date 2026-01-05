import { useState } from 'react';
import { Expense } from '@/domain/model';
import { validateExpense } from '../utils/validation';
import { submitExpense } from '../services/expenseService';

export function useExpenseForm(onSuccess: (expense: Expense) => void) {
  const [input, setInput] = useState({ title: '', amount: '', date: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'amount') {

      const regex = /^[0-9]*[.,]?[0-9]{0,2}$/;
      
      if (value !== '' && !regex.test(value)) {
        return;
      }
    }
    setInput(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const validationError = validateExpense(input.title, input.amount, input.date);
    if (validationError) {
      setError(validationError);
      return;
    }

    setLoading(true);
    try {
      const amountNum = Number(input.amount.replace(',', '.'));
      const data = await submitExpense({ ...input, amount: amountNum });

      onSuccess(data); 
      setInput({ title: '', amount: '', date: '' }); 
    } catch (err: any) {
      setError(err.message ?? 'Wystąpił nieoczekiwany błąd');
    } finally {
      setLoading(false);
    }
  };

  return { input, handleChange, loading, error, handleSubmit };
}
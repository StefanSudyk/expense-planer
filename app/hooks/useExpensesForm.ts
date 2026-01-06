import { useState } from 'react';
import { Expense } from '@/domain/model';
import { validateExpense } from '../utils/validation';
import { submitExpenseApi } from '../services/expenseService';
import { parseAmount, isValidAmountInput } from '../utils/formatters';

export function useExpenseForm(onSuccess: (expense: Expense) => void) {
  const [input, setInput] = useState({ title: '', amount: '', date: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'amount' && !isValidAmountInput(value)) {
      return;
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
      const amountNum = parseAmount(input.amount);
      
      const data = await submitExpenseApi({ 
        ...input, 
        amount: amountNum 
      });

      onSuccess(data); 
      setInput({ title: '', amount: '', date: '' }); 
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Wystąpił nieoczekiwany błąd');
    } finally {
      setLoading(false);
    }
  };

  return { input, handleChange, loading, error, handleSubmit };
}
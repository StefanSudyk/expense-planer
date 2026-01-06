import { Expense } from '@/domain/model';

export type CreateExpenseInput = Omit<Expense, 'id'>;

export const fetchExpensesApi = async (): Promise<Expense[]> => {
  const res = await fetch('/api');
  if (!res.ok) throw new Error('Nie udało się pobrać wydatków');
  const data = await res.json();
  return data.expenses || [];
};

export const submitExpenseApi = async (payload: CreateExpenseInput): Promise<Expense> => {
  const response = await fetch('/api', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Błąd podczas dodawania wydatku');
  }

  const data = await response.json();
  return data.expense; 
};

export const deleteExpenseApi = async (id: number): Promise<void> => {
  const response = await fetch('/api', { 
    method: 'DELETE', 
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }) 
  });
  
  if (!response.ok) {
    throw new Error('Błąd podczas usuwania wydatku');
  }
};
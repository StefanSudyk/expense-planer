import { Expense } from '@/domain/model';

export async function submitExpense(payload: any): Promise<Expense> {
  const response = await fetch('/api', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Failed to add expense');
  }

  return response.json();
}


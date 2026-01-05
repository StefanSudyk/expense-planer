import { prisma } from '@/infrastructure/db';
import { Expense } from '@/domain/model';

export async function getExpenses(): Promise<Expense[]> {
  const data = await prisma.expense.findMany();
  
  return data.map(item => ({
    ...item,
    date: item.date.toISOString() 
  }));
}

/**
 * Tworzy nowy wydatek. 
 * Przyjmuje dane bez ID, ponieważ baza generuje je automatycznie.
 */
export async function createExpense(data: Omit<Expense, 'id'>): Promise<Expense> {
  const newExpense = await prisma.expense.create({
    data: {
      title: data.title,
      amount: data.amount,
      date: new Date(data.date), 
    },
  });

  return {
    ...newExpense,
    date: newExpense.date.toISOString(),
  };
}

/**
 * Usuwa wydatek na podstawie ID.
 */
export async function deleteExpense(id: number): Promise<void> {
  await prisma.expense.delete({
    where: { id },
  });
}
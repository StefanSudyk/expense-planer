import { Expense } from './model';

export const EMPTY_FILTER = { from: '', to: '' };

export const hasActiveFilter = (filter: typeof EMPTY_FILTER): boolean => {
  return filter.from !== '' && filter.to !== '';
};

export const addExpense = (
  expenses:  Expense[],
  expense: Expense
):  Expense[] => [...expenses, expense];

export const removeExpense = (
  expenses:  Expense[],
  id: number
):  Expense[] => expenses.filter(e => e.id !== id);

export const calculateTotal = (expenses:  Expense[]): number =>
  expenses.reduce((sum, e) => sum + e.amount, 0);

export const filterByDateRange = (
  expenses: Expense[],
  from: string,
  to: string
): Expense[] => {
  const fromDate = new Date(from);
  const toDate = new Date(to);

  return expenses.filter(e => {
    const expenseDate = new Date(e.date); 
    return expenseDate >= fromDate && expenseDate <= toDate;
  });
};

export function paginateExpenses(expenses: Expense[], page: number, itemsPerPage: number): Expense[] {
  const startIndex = (page - 1) * itemsPerPage;
  return expenses.slice(startIndex, startIndex + itemsPerPage);
}

export function totalPages(expenses: Expense[], itemsPerPage: number): number {
  return Math.ceil(expenses.length / itemsPerPage);
}

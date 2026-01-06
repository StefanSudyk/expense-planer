import { useState, useEffect, useMemo } from 'react';
import { Expense } from '@/domain/model';
import { 
  removeExpense, 
  paginateExpenses, 
  totalPages, 
  calculateTotal,
  filterByDateRange,
  EMPTY_FILTER,     
  hasActiveFilter   
} from '@/domain/expenses';

import { fetchExpensesApi, deleteExpenseApi } from '../services/expenseService';

export function useExpenses(itemsPerPage: number = 5) { 
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dateFilter, setDateFilter] = useState(EMPTY_FILTER); 

  useEffect(() => {
    fetchExpensesApi()
      .then(setExpenses)
      .catch(err => console.error("Błąd ładowania:", err));
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [dateFilter]);

  const filteredItems = useMemo(() => {
    return hasActiveFilter(dateFilter) 
      ? filterByDateRange(expenses, dateFilter.from, dateFilter.to)
      : expenses;
  }, [expenses, dateFilter]);

  const totalAll = calculateTotal(expenses);      
  const totalFiltered = calculateTotal(filteredItems); 
  const pagedExpenses = paginateExpenses(filteredItems, currentPage, itemsPerPage);
  const maxPages = totalPages(filteredItems, itemsPerPage);

  const onAdd = (newExp: Expense) => { 
    setExpenses(prev => [newExp, ...prev]); 
  };

  const applyFilter = (from: string, to: string) => setDateFilter({ from, to });
  const clearFilter = () => setDateFilter(EMPTY_FILTER); 

  const onDelete = async (id: number) => {
    const backupExpenses = [...expenses];
    setExpenses(prev => removeExpense(prev, id));

    try {
      await deleteExpenseApi(id);
    } catch (err: unknown) {
      setExpenses(backupExpenses); 
      const message = err instanceof Error ? err.message : "Błąd usuwania";
      alert(message);
    }
  };

  return { 
    expenses: pagedExpenses, 
    total: totalAll,            
    filteredTotal: totalFiltered, 
    isFiltered: hasActiveFilter(dateFilter),
    currentPage, 
    maxPages, 
    applyFilter,
    clearFilter,
    setCurrentPage, 
    addExpense: onAdd, 
    deleteExpense: onDelete 
  };
}
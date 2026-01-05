import { useState, useEffect, useMemo } from 'react';
import { Expense } from '@/domain/model';
import { 
  removeExpense, 
  paginateExpenses, 
  totalPages, 
  calculateTotal,
  filterByDateRange 
} from '@/domain/expenses'; 

export function useExpenses(itemsPerPage: number = 5) { 
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [dateFilter, setDateFilter] = useState({ from: '', to: '' });

  useEffect(() => {
    fetch('/api')
      .then(res => res.json())
      .then(data => setExpenses(data.expenses || []));
  }, []);

  // WAŻNE: Kiedy zmieniasz filtr, wróć na pierwszą stronę.
  // Bez tego, jeśli byłeś na stronie 10, a filtr zostawił tylko 1 stronę, widziałbyś pustą listę.
  useEffect(() => {
    setCurrentPage(1);
  }, [dateFilter]);

  // LOGIKA PRZETWARZANIA
  const filteredItems = useMemo(() => {
    if (dateFilter.from && dateFilter.to) {
      return filterByDateRange(expenses, dateFilter.from, dateFilter.to);
    }
    return expenses;
  }, [expenses, dateFilter]);

  // Obliczenia - wyciągamy oba totale, żebyś mógł zdecydować w UI co pokazać
  const totalAll = calculateTotal(expenses);      // Suma absolutnie wszystkiego
  const totalFiltered = calculateTotal(filteredItems); // Suma tylko z zakresu dat

  const pagedExpenses = paginateExpenses(filteredItems, currentPage, itemsPerPage);
  const maxPages = totalPages(filteredItems, itemsPerPage);

  const onAdd = (newExp: Expense) => { 
    setExpenses(prev => [newExp, ...prev]); 
  };

  const isFiltered = dateFilter.from !== '' && dateFilter.to !== '';

  const applyFilter = (from: string, to: string) => setDateFilter({ from, to });
  const clearFilter = () => setDateFilter({ from: '', to: '' });

  const onDelete = async (id: number) => {
    const backupExpenses = [...expenses];
    setExpenses(prev => removeExpense(prev, id));

    try {
      const response = await fetch('/api', { 
        method: 'DELETE', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }) 
      });
      if (!response.ok) throw new Error(); 
    } catch (err) {
      setExpenses(backupExpenses); 
      alert("Nie udało się usunąć wydatku.");
    }
  };

  return { 
    expenses: pagedExpenses, 
    total: totalAll,            
    filteredTotal: totalFiltered, 
    isFiltered,
    currentPage, 
    maxPages, 
    applyFilter,
    clearFilter,
    setCurrentPage, 
    dateFilter,    
    setDateFilter, 
    addExpense: onAdd, 
    deleteExpense: onDelete 
  };
}
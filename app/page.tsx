'use client';

import { useExpenses } from './hooks/useExpenses';
import { ExpensesView } from './components/ExpensesView';

export default function ExpensesPage() {
  const { 
    expenses, total, filteredTotal, isFiltered,
    currentPage, maxPages, setCurrentPage,
    addExpense, deleteExpense, 
    applyFilter, clearFilter 
  } = useExpenses(5);

  return (
    <ExpensesView 
      expenses={expenses}
      total={total}
      filteredTotal={filteredTotal}
      isFiltered={isFiltered}
      currentPage={currentPage}
      maxPages={maxPages}
      onPageChange={setCurrentPage}
      onAdd={addExpense}
      onDelete={deleteExpense}
      onFilterApply={applyFilter} 
      onFilterClear={clearFilter}  
    />
  );
}
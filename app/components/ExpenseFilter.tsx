'use client';

import { useFilterForm } from '../hooks/useFilter';

interface FilterProps {
  onApplyFilter: (from: string, to: string) => void;
  onClear: () => void;
}

export const ExpenseFilter = ({ onApplyFilter, onClear }: FilterProps) => {
  const {
    localFrom,
    localTo,
    handleChange, 
    handleApply,
    handleReset
  } = useFilterForm(onApplyFilter, onClear);

  return (
    <div className="flex flex-wrap items-end gap-4 p-4 mb-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="flex-1 min-w-[140px]">
        <label className="block text-xs font-bold mb-1 text-gray-500 uppercase">Data od</label>
        <input 
          name="from" 
          type="date" 
          value={localFrom} 
          onChange={handleChange} 
          className="w-full p-2 border rounded-md text-sm dark:bg-gray-700" 
        />
      </div>
      
      <div className="flex-1 min-w-[140px]">
        <label className="block text-xs font-bold mb-1 text-gray-500 uppercase">Data do</label>
        <input 
          name="to" 
          type="date" 
          value={localTo} 
          onChange={handleChange}
          className="w-full p-2 border rounded-md text-sm dark:bg-gray-700" 
        />
      </div>

      <button 
        onClick={handleApply} 
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium transition-colors"
      >
        Filtruj
      </button>
      <button 
        onClick={handleReset} 
        className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 text-sm font-medium transition-colors"
      >
        Wyczyść
      </button>
    </div>
  );
};
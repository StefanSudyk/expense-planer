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
    handleFromChange,
    handleToChange,
    handleApply,
    handleReset
  } = useFilterForm(onApplyFilter, onClear);

  return (
    <div className="flex flex-wrap items-end gap-4 p-4 mb-6 bg-gray-50 dark:bg-gray-800/50 rounded-lg border border-gray-200 dark:border-gray-700">
      <div className="flex-1 min-w-[140px]">
        <label className="block text-xs font-bold mb-1 text-gray-500 uppercase">Data od</label>
        <input 
          type="date" 
          value={localFrom} 
          onChange={handleFromChange} 
          className="w-full p-2 border rounded-md text-sm dark:bg-gray-700" 
        />
      </div>
      
      <div className="flex-1 min-w-[140px]">
        <label className="block text-xs font-bold mb-1 text-gray-500 uppercase">Data do</label>
        <input 
          type="date" 
          value={localTo} 
          onChange={handleToChange} 
          className="w-full p-2 border rounded-md text-sm dark:bg-gray-700" 
        />
      </div>

      <button onClick={handleApply} className="...">Filtruj</button>
      <button onClick={handleReset} className="...">Wyczyść</button>
    </div>
  );
};
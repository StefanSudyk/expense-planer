import { useState, ChangeEvent } from 'react';
import { EMPTY_FILTER } from '@/domain/expenses';

export function useFilterForm(
  onApplyFilter: (from: string, to: string) => void,
  onClear: () => void
) {
  const [localDates, setLocalDates] = useState(EMPTY_FILTER);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalDates(prev => ({ 
      ...prev, 
      [name]: value 
    }));
  };

  const handleApply = () => {
    onApplyFilter(localDates.from, localDates.to);
  };

  const handleReset = () => {
    setLocalDates(EMPTY_FILTER); 
    onClear();
  };

  return {
    localFrom: localDates.from,
    localTo: localDates.to,
    handleChange, 
    handleApply,
    handleReset
  };
}
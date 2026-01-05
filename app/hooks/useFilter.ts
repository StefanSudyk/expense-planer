import { useState, ChangeEvent } from 'react';

export function useFilterForm(
  onApplyFilter: (from: string, to: string) => void,
  onClear: () => void
) {
  const [localFrom, setLocalFrom] = useState('');
  const [localTo, setLocalTo] = useState('');

  const handleFromChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalFrom(e.target.value);
  };

  const handleToChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLocalTo(e.target.value);
  };

  const handleApply = () => {
    onApplyFilter(localFrom, localTo);
  };

  const handleReset = () => {
    setLocalFrom('');
    setLocalTo('');
    onClear();
  };

  return {
    localFrom,
    localTo,
    handleFromChange, 
    handleToChange,   
    handleApply,
    handleReset
  };
}
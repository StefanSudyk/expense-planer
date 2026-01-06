export const parseAmount = (value: string): number => {
  return Number(value.replace(',', '.'));
};

export const isValidAmountInput = (value: string): boolean => {
  if (value === '') return true;
  const regex = /^[0-9]*[.,]?[0-9]{0,2}$/;
  return regex.test(value);
};
export function validateExpense(title: string, amountStr: string, date: string) {
  if (!title.trim()) return 'Title cannot be empty';

  const amountNum = Number(amountStr.replace(',', '.'));
  if (isNaN(amountNum) || amountNum <= 0) {
    return 'Amount must be greater than 0';
  }

  if (!date) return 'Date is required';
  
  const selectedDate = new Date(date);
  const today = new Date();
  today.setHours(23, 59, 59, 999); 

  if (selectedDate > today) {
    return 'Expense date cannot be in the future';
  }

  return null; 
}
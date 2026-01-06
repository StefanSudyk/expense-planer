import { Expense } from '@/domain/model';
import { PAGE_STYLES } from '../styles/formStyles';
import { ExpenseList } from './ExpenseList';
import { ExpenseFilter } from './ExpenseFilter';
import AddExpenseForm from '../expenseform';

interface ExpensesViewProps {
  expenses: Expense[];
  total: number;
  filteredTotal: number;
  currentPage: number;
  maxPages: number;
  isFiltered: boolean;
  onPageChange: (page: number) => void;
  onAdd: (expense: Expense) => void;
  onDelete: (id: number) => void;
  onFilterApply: (from: string, to: string) => void;
  onFilterClear: () => void;
}

export const ExpensesView = ({
  expenses, total, filteredTotal, currentPage, maxPages, isFiltered,
  onPageChange, onAdd, onDelete, onFilterApply, onFilterClear
}: ExpensesViewProps) => (
  <div className={PAGE_STYLES.container}>
    <h1 className={PAGE_STYLES.title}>Moje wydatki</h1>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
      <div className={PAGE_STYLES.summaryBox}>
        <p className="text-xs uppercase opacity-70">Suma całkowita</p>
        <p className="text-xl font-bold">{total.toFixed(2)} zł</p>
      </div>
    {isFiltered && (
        <div className="p-3 bg-indigo-600 text-white rounded-lg shadow-sm">
          <p className="text-xs uppercase opacity-70">W wybranym zakresie</p>
          <p className="text-xl font-bold">{filteredTotal.toFixed(2)} zł</p>
        </div>
    )}
    </div>

    <ExpenseFilter onApplyFilter={onFilterApply} onClear={onFilterClear} />

    <div className="mb-8">
      <AddExpenseForm onAdd={onAdd} />
    </div>

    <div className="bg-white dark:bg-gray-900 p-4 rounded-xl border border-gray-100 dark:border-gray-800">
      <h2 className="text-lg font-semibold mb-4 text-gray-700 dark:text-gray-300">Historia transakcji</h2>
      <ExpenseList expenses={expenses} onDelete={onDelete} />

      {maxPages > 1 && (
        <div className={PAGE_STYLES.paginationContainer}>
          <button 
            onClick={() => onPageChange(currentPage - 1)} 
            disabled={currentPage === 1} 
            className={PAGE_STYLES.pageBtn}
          >
            Poprzednia
          </button>
          <span className="text-sm font-medium">Strona {currentPage} z {maxPages}</span>
          <button 
            onClick={() => onPageChange(currentPage + 1)} 
            disabled={currentPage === maxPages} 
            className={PAGE_STYLES.pageBtn}
          >
            Następna
          </button>
        </div>
      )}
    </div>
  </div>
);
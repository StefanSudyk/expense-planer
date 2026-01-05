import { Expense } from '@/domain/model';
import { PAGE_STYLES } from '../styles/formStyles';

interface ListProps {
  expenses: Expense[];
  onDelete: (id: number) => void;
}

export const ExpenseList = ({ expenses, onDelete }: ListProps) => (
  <ul className={PAGE_STYLES.list}>
    {expenses.map(e => (
      <li key={e.id} className={PAGE_STYLES.listItem}>
        <div>
          <span className="font-medium">{e.title}</span> - {e.amount} zł 
          <span className={PAGE_STYLES.itemDate}>({new Date(e.date).toLocaleDateString('pl-PL')})</span>
        </div>
        <button onClick={() => onDelete(e.id)} className={PAGE_STYLES.deleteBtn}>
          Usuń
        </button>
      </li>
    ))}
  </ul>
);
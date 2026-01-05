import { FORM_STYLES } from '../styles/formStyles';

interface ViewProps {
  input: { title: string; amount: string; date: string };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
  loading: boolean;
  error: string | null;
}

export const ExpenseFormView = ({ input, handleChange, handleSubmit, loading, error }: ViewProps) => (
  <form onSubmit={handleSubmit} className={FORM_STYLES.container}>
    <h2 className={FORM_STYLES.title}>Expense Form</h2>

    {error && <p className={FORM_STYLES.error}>{error}</p>}

    <div className="space-y-4">
      <div>
        <label className={FORM_STYLES.label}>Title</label>
        <input name="title" value={input.title} onChange={handleChange} className={FORM_STYLES.input} required />
      </div>

      <div>
        <label className={FORM_STYLES.label}>Amount (zł)</label>
        <input name="amount" value={input.amount} onChange={handleChange} className={FORM_STYLES.input} required />
      </div>

      <div>
        <label className={FORM_STYLES.label}>Date</label>
        <input name="date" type="date" value={input.date} onChange={handleChange} className={FORM_STYLES.input} required />
      </div>

      <button type="submit" disabled={loading} className={FORM_STYLES.button}>
        {loading ? 'Adding…' : 'Add Expense'}
      </button>
    </div>
  </form>
);
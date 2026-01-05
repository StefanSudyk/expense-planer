import { NextResponse } from 'next/server';
import { calculateTotal } from '@/domain/expenses';
import { 
  getExpenses, 
  createExpense, 
  deleteExpense 
} from '@/infrastructure/expensesRepository';

// Funkcja GET – pobiera listę wydatków za pośrednictwem warstwy repozytorium.
// Wykorzystuje funkcję czystą calculateTotal do obliczenia sumy, oddzielając logikę od danych.
export async function GET() {
  try {
    const expenses = await getExpenses();
    const total = calculateTotal(expenses);
    
    return NextResponse.json({ 
      expenses, 
      summary: { total } 
    });
  } catch (error) {
    return NextResponse.json(
      { expenses: [], summary: { total: 0 } }, 
      { status: 500 }
    );
  }
}

// Funkcja POST – przyjmuje dane o nowym wydatku i przeprowadza wstępną walidację.
// Następnie deleguje proces zapisu do bazy danych do dedykowanej funkcji createExpense.
export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!data.title || !data.amount || !data.date) {
      return NextResponse.json(
        { error: 'Brak wymaganych pól: title, amount lub date' }, 
        { status: 400 }
      );
    }

    const expense = await createExpense(data);
    return NextResponse.json(expense, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Wystąpił błąd podczas tworzenia nowego wydatku' }, 
      { status: 500 }
    );
  }
}

// Funkcja DELETE – odpowiada za usunięcie rekordu o wskazanym identyfikatorze.
// Waliduje poprawność formatu ID i wywołuje funkcję repozytorium usuwającą dane z bazy.
export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    const expenseId = Number(id);
    
    if (isNaN(expenseId)) {
      return NextResponse.json(
        { error: 'Przekazano nieprawidłowy format identyfikatora ID' }, 
        { status: 400 }
      );
    }

    await deleteExpense(expenseId);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Nie udało się usunąć wydatku rekord może nie istnieć' }, 
      { status: 404 }
    );
  }
}
import { NextResponse } from 'next/server';
import { prisma } from '@/infrastructure/db';
import { calculateTotal } from '@/domain/expenses';


// Funkcja GET – pobiera wszystkie wydatki z bazy i zwraca je w formie JSON. 
// Dodatkowo oblicza sumę wszystkich wydatków za pomocą czystej funkcji calculateTotal.
export async function GET() {
  try {
    const expenses = await prisma.expense.findMany();
    const total = calculateTotal(expenses || []);
    return NextResponse.json({ expenses, summary: { total } });
  } catch (error) {
    return NextResponse.json({ expenses: [], summary: { total: 0 } }, { status: 500 });
  }
}

// Funkcja POST – dodaje nowy wydatek do bazy. 
// Sprawdza czy wymagane pola (title, amount, date) zostały przesłane. 
// Jeśli tak, tworzy nowy rekord w tabeli expense i zwraca go w odpowiedzi.

export async function POST(req: Request) {
  try {
    const data = await req.json();

    if (!data.title || !data.amount || !data.date) {
      return NextResponse.json({ error: 'Brak wymaganych pól' }, { status: 400 });
    }

    const expense = await prisma.expense.create({ 
      data: {
        ...data,
        amount: Number(data.amount), 
        id: undefined 
      } 
    });
    return NextResponse.json(expense, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Błąd tworzenia' }, { status: 500 });
  }
}

// Funkcja DELETE – usuwa wydatek o podanym ID. 
// Najpierw sprawdza czy ID jest liczbą, następnie usuwa rekord z bazy. 
// Jeśli ID jest nieprawidłowe lub rekord nie istnieje, zwraca odpowiedni błąd.

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    const expenseId = Number(id);
    
    if (isNaN(expenseId)) {
      return NextResponse.json({ error: 'Nieprawidłowe ID' }, { status: 400 });
    }

    await prisma.expense.delete({ where: { id: expenseId } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Wydatek nie istnieje' }, { status: 404 });
  }
}
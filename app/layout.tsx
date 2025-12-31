import './globals.css';

export const metadata = {
  title: 'Expense Tracker',
  description: 'Aplikacja do zarządzania wydatkami - Projekt Monograficzny',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body>{children}</body>
    </html>
  );
}
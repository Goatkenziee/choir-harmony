import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Choir Harmony — Chore Tracker',
  description: 'A beautiful app for tracking choir chores and celebrating achievements',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white transition-colors">
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}

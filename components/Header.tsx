'use client';

import React from 'react';
import { Music, Sun, Moon } from 'lucide-react';
import { useChoirStore } from '@/store/choirStore';

export function Header() {
  const darkMode = useChoirStore((state) => state.darkMode);
  const toggleDarkMode = useChoirStore((state) => state.toggleDarkMode);

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-primary-600 to-sky-500 dark:from-primary-900 dark:to-sky-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-white dark:bg-slate-800 p-2 rounded-lg">
            <Music className="w-6 h-6 text-primary-600 dark:text-primary-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Choir Harmony</h1>
            <p className="text-primary-100 text-sm">Chore Tracker & Leaderboard</p>
          </div>
        </div>

        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg hover:bg-white/20 transition-colors text-white"
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <Sun className="w-6 h-6" />
          ) : (
            <Moon className="w-6 h-6" />
          )}
        </button>
      </div>
    </header>
  );
}

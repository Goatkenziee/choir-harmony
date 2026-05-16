'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, CheckSquare, Users, Trophy, Settings } from 'lucide-react';

export function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/chores', label: 'Chores', icon: CheckSquare },
    { href: '/members', label: 'Members', icon: Users },
    { href: '/leaderboard', label: 'Leaderboard', icon: Trophy },
    { href: '/settings', label: 'Settings', icon: Settings },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-30 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 shadow-xl md:static md:border-r md:border-t-0 md:w-64 md:h-screen md:flex md:flex-col md:shadow-lg">
      <div className="grid grid-cols-5 gap-1 p-2 md:flex md:flex-col md:gap-0 md:p-4">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center justify-center md:justify-start gap-3 px-3 py-3 rounded-lg font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
              aria-label={label}
            >
              <Icon className="w-5 h-5 md:w-6 md:h-6" />
              <span className="hidden md:inline text-sm">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

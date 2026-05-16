'use client';

import Link from 'next/link';
import { Music, Users, CheckSquare, Calendar } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path
      ? 'text-choir-purple font-bold'
      : 'text-gray-600 hover:text-choir-purple';
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-lg">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex items-center justify-between mb-4">
          <Link href="/" className="flex items-center gap-2 text-2xl font-bold">
            <Music className="w-8 h-8 text-choir-purple animate-bounce" />
            <span className="bg-gradient-to-r from-choir-purple to-choir-pink bg-clip-text text-transparent">
              Choir Harmony
            </span>
          </Link>
        </div>

        <div className="flex gap-6 flex-wrap">
          <Link
            href="/"
            className={`flex items-center gap-2 transition-colors ${isActive('/')}`}
          >
            <CheckSquare className="w-5 h-5" />
            <span className="hidden sm:inline">Dashboard</span>
          </Link>

          <Link
            href="/members"
            className={`flex items-center gap-2 transition-colors ${isActive('/members')}`}
          >
            <Users className="w-5 h-5" />
            <span className="hidden sm:inline">Members</span>
          </Link>

          <Link
            href="/tasks"
            className={`flex items-center gap-2 transition-colors ${isActive('/tasks')}`}
          >
            <CheckSquare className="w-5 h-5" />
            <span className="hidden sm:inline">Tasks</span>
          </Link>

          <Link
            href="/practice"
            className={`flex items-center gap-2 transition-colors ${isActive('/practice')}`}
          >
            <Calendar className="w-5 h-5" />
            <span className="hidden sm:inline">Practice</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}

'use client';

import React, { useEffect, useState } from 'react';
import { Crown, Medal } from 'lucide-react';
import { Header } from '@/components/Header';
import { Navigation } from '@/components/Navigation';
import { MemberCard } from '@/components/MemberCard';
import { useChoirStore } from '@/store/choirStore';

export default function LeaderboardPage() {
  const [mounted, setMounted] = useState(false);
  const loadFromStorage = useChoirStore((state) => state.loadFromStorage);
  const saveToStorage = useChoirStore((state) => state.saveToStorage);
  const getLeaderboard = useChoirStore((state) => state.getLeaderboard);

  useEffect(() => {
    loadFromStorage();
    setMounted(true);
    return () => saveToStorage();
  }, [loadFromStorage, saveToStorage]);

  if (!mounted) return null;

  const leaderboard = getLeaderboard();

  const getMedalEmoji = (rank: number) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return '✨';
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <Navigation />

      <main className="flex-grow p-4 md:p-8 pb-20 md:pb-8 md:ml-64 mt-0">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Page Header */}
          <div className="text-center">
            <h1 className="text-4xl font-bold flex items-center justify-center gap-3 mb-2">
              <Crown className="w-10 h-10 text-accent-500" />
              Leaderboard
              <Crown className="w-10 h-10 text-accent-500" />
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Top performers in our choir community
            </p>
          </div>

          {/* Top 3 Podium */}
          {leaderboard.length > 0 && (
            <div className="mb-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* 2nd Place */}
                {leaderboard.length > 1 && (
                  <div className="card border-4 border-slate-400 h-fit">
                    <div className="text-center">
                      <p className="text-4xl mb-2">🥈</p>
                      <p className="text-2xl font-bold text-slate-400 mb-2">
                        #{leaderboard[1].points}
                      </p>
                      <p className="font-bold text-lg">{leaderboard[1].name}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400 capitalize">
                        {leaderboard[1].role}
                      </p>
                    </div>
                  </div>
                )}

                {/* 1st Place */}
                <div className="card border-4 border-accent-500 transform scale-105 md:order-1">
                  <div className="text-center">
                    <p className="text-5xl mb-3">🥇</p>
                    <p className="text-3xl font-bold text-accent-500 mb-2">
                      {leaderboard[0].points}
                    </p>
                    <p className="font-bold text-xl">{leaderboard[0].name}</p>
                    <p className="text-sm text-slate-600 dark:text-slate-400 capitalize">
                      {leaderboard[0].role}
                    </p>
                  </div>
                </div>

                {/* 3rd Place */}
                {leaderboard.length > 2 && (
                  <div className="card border-4 border-orange-400 h-fit">
                    <div className="text-center">
                      <p className="text-4xl mb-2">🥉</p>
                      <p className="text-2xl font-bold text-orange-400 mb-2">
                        {leaderboard[2].points}
                      </p>
                      <p className="font-bold text-lg">{leaderboard[2].name}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400 capitalize">
                        {leaderboard[2].role}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Full Rankings */}
          {leaderboard.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-6">Full Rankings</h2>
              <div className="space-y-3">
                {leaderboard.map((member, idx) => (
                  <div key={member.id} className="animate-fade-in" style={{ animationDelay: `${idx * 50}ms` }}>
                    <MemberCard
                      member={member}
                      showPoints={true}
                      rank={idx + 1}
                    />
                  </div>
                ))}
              </div>
            </section>
          )}

          {leaderboard.length === 0 && (
            <div className="card text-center py-12">
              <p className="text-slate-500 dark:text-slate-400 mb-4">
                Leaderboard is empty. Add members and assign chores to start climbing the ranks!
              </p>
            </div>
          )}

          {/* Achievements */}
          <section className="card bg-gradient-to-br from-accent-50 to-primary-50 dark:from-accent-900 dark:to-primary-900">
            <h3 className="text-xl font-bold mb-4">🏆 Achievement Milestones</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="font-semibold">Novice 💫</p>
                <p className="text-slate-600 dark:text-slate-400">0-25 points</p>
              </div>
              <div>
                <p className="font-semibold">Rising Star ✨</p>
                <p className="text-slate-600 dark:text-slate-400">25-50 points</p>
              </div>
              <div>
                <p className="font-semibold">Shining Star 🌟</p>
                <p className="text-slate-600 dark:text-slate-400">50-100 points</p>
              </div>
              <div>
                <p className="font-semibold">Superstar ⭐</p>
                <p className="text-slate-600 dark:text-slate-400">100+ points</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

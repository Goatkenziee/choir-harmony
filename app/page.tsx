'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Zap, Users, Target } from 'lucide-react';
import { Header } from '@/components/Header';
import { Navigation } from '@/components/Navigation';
import { ChoreCard } from '@/components/ChoreCard';
import { MemberCard } from '@/components/MemberCard';
import { useChoirStore } from '@/store/choirStore';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const loadFromStorage = useChoirStore((state) => state.loadFromStorage);
  const saveToStorage = useChoirStore((state) => state.saveToStorage);
  const members = useChoirStore((state) => state.members);
  const assignments = useChoirStore((state) => state.assignments);
  const chores = useChoirStore((state) => state.chores);

  useEffect(() => {
    loadFromStorage();
    setMounted(true);

    return () => saveToStorage();
  }, [loadFromStorage, saveToStorage]);

  if (!mounted) return null;

  const activeAssignments = assignments.filter((a) => !a.completed).slice(0, 5);
  const topMembers = [...members].sort((a, b) => b.points - a.points).slice(0, 3);
  const totalPoints = members.reduce((sum, m) => sum + m.points, 0);
  const completedToday = assignments.filter(
    (a) =>
      a.completed &&
      new Date(a.completedDate!).toDateString() === new Date().toDateString()
  ).length;

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <Navigation />

      <main className="flex-grow p-4 md:p-8 pb-20 md:pb-8 md:ml-64 md:mt-0 mt-0">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Hero Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="card bg-gradient-to-br from-primary-500 to-primary-600 text-white">
              <p className="text-sm opacity-90">Total Points</p>
              <p className="text-3xl font-bold">{totalPoints}</p>
            </div>
            <div className="card bg-gradient-to-br from-success-500 to-success-600 text-white">
              <p className="text-sm opacity-90">Members</p>
              <p className="text-3xl font-bold">{members.length}</p>
            </div>
            <div className="card bg-gradient-to-br from-accent-500 to-accent-600 text-white">
              <p className="text-sm opacity-90">Total Chores</p>
              <p className="text-3xl font-bold">{chores.length}</p>
            </div>
            <div className="card bg-gradient-to-br from-sky-500 to-sky-600 text-white">
              <p className="text-sm opacity-90">Completed Today</p>
              <p className="text-3xl font-bold">{completedToday}</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-3 flex-wrap">
            <a
              href="/chores"
              className="btn-primary flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Chore
            </a>
            <a
              href="/members"
              className="btn-primary flex items-center gap-2"
            >
              <Users className="w-5 h-5" />
              Add Member
            </a>
            <a
              href="/leaderboard"
              className="btn-secondary flex items-center gap-2"
            >
              <Zap className="w-5 h-5" />
              View Leaderboard
            </a>
          </div>

          {/* Top Performers */}
          {topMembers.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Target className="w-6 h-6 text-accent-500" />
                Top Performers 🏆
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {topMembers.map((member, idx) => (
                  <div key={member.id} className="card">
                    <MemberCard member={member} showPoints={true} rank={idx + 1} />
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Active Assignments */}
          {activeAssignments.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4">Active Assignments</h2>
              <div className="space-y-3">
                {activeAssignments.map((assignment) => {
                  const chore = chores.find((c) => c.id === assignment.choreId);
                  const member = members.find((m) => m.id === assignment.memberId);
                  if (!chore || !member) return null;

                  return (
                    <ChoreCard
                      key={assignment.id}
                      assignment={assignment}
                      chore={chore}
                      member={member}
                      isCompact={true}
                    />
                  );
                })}
              </div>
              <a href="/chores" className="text-primary-600 dark:text-primary-400 font-semibold mt-4 inline-block hover:underline">
                View all assignments →
              </a>
            </section>
          )}

          {assignments.length === 0 && (
            <div className="card text-center py-12">
              <p className="text-slate-500 dark:text-slate-400 mb-4">
                No assignments yet. Get started by creating chores and assigning them to members!
              </p>
              <a href="/chores" className="btn-primary">
                Create First Assignment
              </a>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

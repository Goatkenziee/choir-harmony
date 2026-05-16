'use client';

import React, { useEffect, useState } from 'react';
import { Plus, Filter, Music, BookOpen, Users, Settings, Grid3x3, ListTodo } from 'lucide-react';
import { Header } from '@/components/Header';
import { Navigation } from '@/components/Navigation';
import { ChoreCard } from '@/components/ChoreCard';
import { useChoirStore } from '@/store/choirStore';
import type { Chore } from '@/types/index';

export default function ChoresPage() {
  const [mounted, setMounted] = useState(false);
  const [showAddChore, setShowAddChore] = useState(false);
  const [showAssignChore, setShowAssignChore] = useState(false);
  const [selectedChore, setSelectedChore] = useState<string | null>(null);
  const [selectedMember, setSelectedMember] = useState<string>('');
  const [dueDate, setDueDate] = useState('');
  const [choreTitle, setChoreTitle] = useState('');
  const [choreDescription, setChoreDescription] = useState('');
  const [chorePoints, setChorePoints] = useState(10);
  const [choreIcon, setChoreIcon] = useState('Music');
  const [choreCategory, setChoreCategory] = useState<'warm-up' | 'music' | 'practice' | 'setup' | 'leadership' | 'other'>('music');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const loadFromStorage = useChoirStore((state) => state.loadFromStorage);
  const saveToStorage = useChoirStore((state) => state.saveToStorage);
  const members = useChoirStore((state) => state.members);
  const chores = useChoirStore((state) => state.chores);
  const assignments = useChoirStore((state) => state.assignments);
  const addChore = useChoirStore((state) => state.addChore);
  const assignChore = useChoirStore((state) => state.assignChore);

  useEffect(() => {
    loadFromStorage();
    setMounted(true);
    return () => saveToStorage();
  }, [loadFromStorage, saveToStorage]);

  if (!mounted) return null;

  const handleAddChore = () => {
    if (!choreTitle.trim()) return;
    addChore({
      title: choreTitle,
      description: choreDescription,
      icon: choreIcon,
      pointsReward: chorePoints,
      category: choreCategory,
    });
    setChoreTitle('');
    setChoreDescription('');
    setChorePoints(10);
    setChoreIcon('Music');
    setChoreCategory('music');
    setShowAddChore(false);
  };

  const handleAssignChore = () => {
    if (!selectedChore || !selectedMember || !dueDate) return;
    assignChore(selectedChore, selectedMember, dueDate);
    setSelectedChore(null);
    setSelectedMember('');
    setDueDate('');
    setShowAssignChore(false);
  };

  const filteredChores = filterCategory === 'all' 
    ? chores 
    : chores.filter((c) => c.category === filterCategory);

  const getChoreAssignments = (choreId: string) =>
    assignments.filter((a) => a.choreId === choreId && !a.completed);

  const categories = ['warm-up', 'music', 'practice', 'setup', 'leadership', 'other'];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <Navigation />

      <main className="flex-grow p-4 md:p-8 pb-20 md:pb-8 md:ml-64 mt-0">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Chores & Assignments</h1>
            <button
              onClick={() => setShowAddChore(!showAddChore)}
              className="btn-primary flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              New Chore
            </button>
          </div>

          {/* Add Chore Form */}
          {showAddChore && (
            <div className="card border-2 border-primary-500 space-y-4">
              <h2 className="text-xl font-bold">Create New Chore</h2>
              <input
                type="text"
                placeholder="Chore Title (e.g., 'Lead Warm-ups')"
                value={choreTitle}
                onChange={(e) => setChoreTitle(e.target.value)}
                className="input-field"
              />
              <textarea
                placeholder="Description"
                value={choreDescription}
                onChange={(e) => setChoreDescription(e.target.value)}
                className="input-field h-20 resize-none"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="Points Reward"
                  value={chorePoints}
                  onChange={(e) => setChorePoints(Math.max(1, parseInt(e.target.value) || 0))}
                  className="input-field"
                />
                <select
                  value={choreCategory}
                  onChange={(e) => setChoreCategory(e.target.value as any)}
                  className="input-field"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <select
                value={choreIcon}
                onChange={(e) => setChoreIcon(e.target.value)}
                className="input-field"
              >
                <option value="Music">🎵 Music</option>
                <option value="BookOpen">📖 Learn</option>
                <option value="Users">👥 Practice</option>
                <option value="Settings">⚙️ Setup</option>
                <option value="Zap">⚡ Leadership</option>
              </select>
              <div className="flex gap-3">
                <button onClick={handleAddChore} className="btn-primary flex-1">
                  Create Chore
                </button>
                <button
                  onClick={() => setShowAddChore(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Filters & View Mode */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="input-field max-w-xs"
              >
                <option value="all">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'btn-secondary'}`}
              >
                <ListTodo className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'btn-secondary'}`}
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Chores List */}
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-4'}>
            {filteredChores.map((chore) => (
              <div key={chore.id} className="card">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-bold">{chore.title}</h3>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{chore.description}</p>
                  </div>
                  <span className="badge-success">{chore.pointsReward} pts</span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {getChoreAssignments(chore.id).length} active
                  </span>
                  <button
                    onClick={() => {
                      setSelectedChore(chore.id);
                      setShowAssignChore(true);
                    }}
                    className="btn-primary text-sm"
                  >
                    Assign
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Assign Chore Modal */}
          {showAssignChore && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
              <div className="card max-w-md w-full space-y-4">
                <h2 className="text-2xl font-bold">Assign Chore</h2>
                <select
                  value={selectedMember}
                  onChange={(e) => setSelectedMember(e.target.value)}
                  className="input-field"
                >
                  <option value="">Select Member...</option>
                  {members.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
                    </option>
                  ))}
                </select>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="input-field"
                />
                <div className="flex gap-3">
                  <button onClick={handleAssignChore} className="btn-primary flex-1">
                    Assign
                  </button>
                  <button
                    onClick={() => setShowAssignChore(false)}
                    className="btn-secondary flex-1"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Assignments */}
          {assignments.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold mb-4">Active Assignments</h2>
              <div className="space-y-3">
                {assignments
                  .filter((a) => !a.completed)
                  .map((assignment) => {
                    const chore = chores.find((c) => c.id === assignment.choreId);
                    const member = members.find((m) => m.id === assignment.memberId);
                    if (!chore || !member) return null;
                    return (
                      <ChoreCard
                        key={assignment.id}
                        assignment={assignment}
                        chore={chore}
                        member={member}
                      />
                    );
                  })}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
}

'use client';

import { create } from 'zustand';
import type { ChoirState, Member, Chore, Assignment } from '@/types/index';

const STORAGE_KEY = 'choir-harmony-store';

const initialMembers: Member[] = [
  {
    id: '1',
    name: 'Alex',
    role: 'soprano',
    color: '#d8b4fe',
    points: 0,
    joinedDate: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Jordan',
    role: 'alto',
    color: '#fcd34d',
    points: 0,
    joinedDate: new Date().toISOString(),
  },
];

const initialChores: Chore[] = [
  {
    id: '1',
    title: 'Warm-up Exercises',
    description: 'Lead the choir warm-up session',
    icon: 'Music',
    pointsReward: 10,
    category: 'warm-up',
  },
  {
    id: '2',
    title: 'Learn New Music',
    description: 'Learn next week\'s piece',
    icon: 'BookOpen',
    pointsReward: 15,
    category: 'music',
  },
  {
    id: '3',
    title: 'Attend Practice',
    description: 'Full attendance at rehearsal',
    icon: 'Users',
    pointsReward: 20,
    category: 'practice',
  },
  {
    id: '4',
    title: 'Setup Stage',
    description: 'Help setup chairs and stands',
    icon: 'Settings',
    pointsReward: 25,
    category: 'setup',
  },
];

export const useChoirStore = create<ChoirState>((set, get) => ({
  members: initialMembers,
  chores: initialChores,
  assignments: [],
  darkMode: false,

  // Member actions
  addMember: (member) =>
    set((state) => ({
      members: [
        ...state.members,
        {
          ...member,
          id: Date.now().toString(),
          points: 0,
        },
      ],
    })),

  removeMember: (memberId) =>
    set((state) => ({
      members: state.members.filter((m) => m.id !== memberId),
      assignments: state.assignments.filter((a) => a.memberId !== memberId),
    })),

  updateMember: (memberId, updates) =>
    set((state) => ({
      members: state.members.map((m) =>
        m.id === memberId ? { ...m, ...updates } : m
      ),
    })),

  // Chore actions
  addChore: (chore) =>
    set((state) => ({
      chores: [
        ...state.chores,
        {
          ...chore,
          id: Date.now().toString(),
        },
      ],
    })),

  removeChore: (choreId) =>
    set((state) => ({
      chores: state.chores.filter((c) => c.id !== choreId),
      assignments: state.assignments.filter((a) => a.choreId !== choreId),
    })),

  updateChore: (choreId, updates) =>
    set((state) => ({
      chores: state.chores.map((c) =>
        c.id === choreId ? { ...c, ...updates } : c
      ),
    })),

  // Assignment actions
  assignChore: (choreId, memberId, dueDate) =>
    set((state) => ({
      assignments: [
        ...state.assignments,
        {
          id: Date.now().toString(),
          choreId,
          memberId,
          dueDate,
          completed: false,
        },
      ],
    })),

  completeAssignment: (assignmentId) =>
    set((state) => {
      const assignment = state.assignments.find((a) => a.id === assignmentId);
      if (!assignment) return state;

      const chore = state.chores.find((c) => c.id === assignment.choreId);
      const pointsToAdd = chore?.pointsReward || 0;

      return {
        assignments: state.assignments.map((a) =>
          a.id === assignmentId
            ? {
                ...a,
                completed: true,
                completedDate: new Date().toISOString(),
              }
            : a
        ),
        members: state.members.map((m) =>
          m.id === assignment.memberId
            ? { ...m, points: m.points + pointsToAdd }
            : m
        ),
      };
    }),

  removeAssignment: (assignmentId) =>
    set((state) => ({
      assignments: state.assignments.filter((a) => a.id !== assignmentId),
    })),

  // Points & leaderboard
  addPoints: (memberId, points) =>
    set((state) => ({
      members: state.members.map((m) =>
        m.id === memberId ? { ...m, points: m.points + points } : m
      ),
    })),

  getLeaderboard: () => {
    const state = get();
    return [...state.members].sort((a, b) => b.points - a.points);
  },

  // Theme
  toggleDarkMode: () =>
    set((state) => {
      const newDarkMode = !state.darkMode;
      if (typeof window !== 'undefined') {
        localStorage.setItem(
          `${STORAGE_KEY}-darkMode`,
          JSON.stringify(newDarkMode)
        );
        if (newDarkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
      return { darkMode: newDarkMode };
    }),

  // Persistence
  loadFromStorage: () => {
    if (typeof window === 'undefined') return;

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      set(parsed);
    }

    // Load dark mode preference
    const darkModePref = localStorage.getItem(`${STORAGE_KEY}-darkMode`);
    if (darkModePref) {
      const isDark = JSON.parse(darkModePref);
      set({ darkMode: isDark });
      if (isDark) {
        document.documentElement.classList.add('dark');
      }
    }
  },

  saveToStorage: () => {
    if (typeof window === 'undefined') return;
    const state = get();
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        members: state.members,
        chores: state.chores,
        assignments: state.assignments,
      })
    );
  },
}));

'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Member, Task, Practice } from './types';

interface ChoirStore {
  members: Member[];
  tasks: Task[];
  practices: Practice[];

  // Member actions
  addMember: (member: Member) => void;
  updateMember: (id: string, updates: Partial<Member>) => void;
  deleteMember: (id: string) => void;

  // Task actions
  addTask: (task: Task) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  completeTask: (taskId: string, memberId: string) => void;

  // Practice actions
  addPractice: (practice: Practice) => void;
  updatePractice: (id: string, updates: Partial<Practice>) => void;
  deletePractice: (id: string) => void;
  markAttendance: (practiceId: string, memberId: string, attended: boolean) => void;
}

const initialMembers: Member[] = [
  {
    id: '1',
    name: 'Emma Johnson',
    avatarColor: '#EC4899',
    section: 'soprano',
    joinDate: '2024-01-15',
    completedTasks: 12,
    totalTasks: 15,
  },
  {
    id: '2',
    name: 'Liam Chen',
    avatarColor: '#3B82F6',
    section: 'alto',
    joinDate: '2024-02-10',
    completedTasks: 10,
    totalTasks: 15,
  },
  {
    id: '3',
    name: 'Sophie Williams',
    avatarColor: '#8B5CF6',
    section: 'soprano',
    joinDate: '2024-03-05',
    completedTasks: 14,
    totalTasks: 15,
  },
];

const initialTasks: Task[] = [
  {
    id: 't1',
    title: 'Weekly Practice',
    description: 'Practice your part for next week\'s performance',
    type: 'practice',
    assignedTo: ['1', '2', '3'],
    dueDate: '2026-05-23',
    status: 'in-progress',
    priority: 'high',
    createdAt: '2026-05-16',
  },
  {
    id: 't2',
    title: 'Learn Solo',
    description: 'Learn your solo for the spring concert',
    type: 'solo',
    assignedTo: ['1'],
    dueDate: '2026-06-01',
    status: 'pending',
    priority: 'high',
    createdAt: '2026-05-16',
  },
  {
    id: 't3',
    title: 'Section Rehearsal',
    description: 'Attend Saturday section rehearsal',
    type: 'section',
    assignedTo: ['1', '3'],
    dueDate: '2026-05-20',
    status: 'pending',
    priority: 'medium',
    createdAt: '2026-05-16',
  },
];

const initialPractices: Practice[] = [
  {
    id: 'p1',
    title: 'Full Choir Practice',
    date: '2026-05-23',
    time: '18:00',
    duration: 90,
    attendees: ['1', '2', '3'],
    focusArea: 'Spring concert preparation',
  },
];

export const useChoirStore = create<ChoirStore>()(
  persist(
    (set) => ({
      members: initialMembers,
      tasks: initialTasks,
      practices: initialPractices,

      addMember: (member) =>
        set((state) => ({
          members: [...state.members, member],
        })),

      updateMember: (id, updates) =>
        set((state) => ({
          members: state.members.map((m) =>
            m.id === id ? { ...m, ...updates } : m
          ),
        })),

      deleteMember: (id) =>
        set((state) => ({
          members: state.members.filter((m) => m.id !== id),
        })),

      addTask: (task) =>
        set((state) => ({
          tasks: [...state.tasks, task],
        })),

      updateTask: (id, updates) =>
        set((state) => ({
          tasks: state.tasks.map((t) =>
            t.id === id ? { ...t, ...updates } : t
          ),
        })),

      deleteTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        })),

      completeTask: (taskId, memberId) =>
        set((state) => {
          const task = state.tasks.find((t) => t.id === taskId);
          const isLastMember =
            task?.assignedTo.length === 1 &&
            task.assignedTo.includes(memberId);

          return {
            tasks: state.tasks.map((t) =>
              t.id === taskId
                ? { ...t, status: isLastMember ? 'completed' : 'in-progress' }
                : t
            ),
            members: state.members.map((m) =>
              m.id === memberId
                ? {
                    ...m,
                    completedTasks: m.completedTasks + 1,
                  }
                : m
            ),
          };
        }),

      addPractice: (practice) =>
        set((state) => ({
          practices: [...state.practices, practice],
        })),

      updatePractice: (id, updates) =>
        set((state) => ({
          practices: state.practices.map((p) =>
            p.id === id ? { ...p, ...updates } : p
          ),
        })),

      deletePractice: (id) =>
        set((state) => ({
          practices: state.practices.filter((p) => p.id !== id),
        })),

      markAttendance: (practiceId, memberId, attended) =>
        set((state) => ({
          practices: state.practices.map((p) =>
            p.id === practiceId
              ? {
                  ...p,
                  attendees: attended
                    ? [...new Set([...p.attendees, memberId])]
                    : p.attendees.filter((id) => id !== memberId),
                }
              : p
          ),
        })),
    }),
    {
      name: 'choir-store',
    }
  )
);

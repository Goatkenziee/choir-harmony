'use client';

import React from 'react';
import { CheckCircle2, Circle, Trash2 } from 'lucide-react';
import * as Icons from 'lucide-react';
import type { Assignment, Chore, Member } from '@/types/index';
import { useChoirStore } from '@/store/choirStore';

interface ChoreCardProps {
  assignment: Assignment;
  chore: Chore;
  member: Member;
  onComplete?: () => void;
  onRemove?: () => void;
  isCompact?: boolean;
}

export function ChoreCard({
  assignment,
  chore,
  member,
  onComplete,
  onRemove,
  isCompact = false,
}: ChoreCardProps) {
  const completeAssignment = useChoirStore((state) => state.completeAssignment);
  const removeAssignment = useChoirStore((state) => state.removeAssignment);

  const handleComplete = () => {
    completeAssignment(assignment.id);
    onComplete?.();
  };

  const handleRemove = () => {
    removeAssignment(assignment.id);
    onRemove?.();
  };

  // Get icon component dynamically
  const IconComponent = (Icons as any)[chore.icon] || Icons.Music;
  const daysUntilDue = Math.ceil(
    (new Date(assignment.dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
  );
  const isOverdue = daysUntilDue < 0 && !assignment.completed;
  const isDueSoon = daysUntilDue <= 2 && daysUntilDue >= 0 && !assignment.completed;

  if (isCompact) {
    return (
      <div className="card flex items-center gap-3">
        <button
          onClick={handleComplete}
          className="flex-shrink-0 hover:scale-110 transition-transform"
        >
          {assignment.completed ? (
            <CheckCircle2 className="w-6 h-6 text-success-500" />
          ) : (
            <Circle className="w-6 h-6 text-slate-300 dark:text-slate-600" />
          )}
        </button>
        <div className="flex-grow">
          <p className="font-semibold text-sm">{chore.title}</p>
          <p className="text-xs text-slate-500 dark:text-slate-400">{member.name}</p>
        </div>
        <button
          onClick={handleRemove}
          className="flex-shrink-0 p-1 hover:bg-red-100 dark:hover:bg-red-900 rounded transition-colors"
        >
          <Trash2 className="w-4 h-4 text-red-500" />
        </button>
      </div>
    );
  }

  return (
    <div
      className={`card ${
        assignment.completed ? 'opacity-75' : ''
      } border-l-4 ${
        isOverdue
          ? 'border-red-500'
          : isDueSoon
          ? 'border-accent-500'
          : 'border-primary-500'
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-grow">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-primary-100 dark:bg-primary-900 p-2 rounded-lg">
              <IconComponent className="w-5 h-5 text-primary-600 dark:text-primary-400" />
            </div>
            <div>
              <h3 className={`font-bold ${assignment.completed ? 'line-through' : ''}`}>
                {chore.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {chore.description}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-3">
            <span
              className="badge-primary text-xs"
              style={{
                backgroundColor: member.color + '20',
                color: member.color,
                border: `1px solid ${member.color}`,
              }}
            >
              {member.name}
            </span>
            <span className="badge-success text-xs">+{chore.pointsReward} pts</span>
            <span className={`text-xs font-semibold ${
              isOverdue
                ? 'text-red-600 dark:text-red-400'
                : isDueSoon
                ? 'text-accent-600 dark:text-accent-400'
                : 'text-slate-600 dark:text-slate-400'
            }`}>
              {assignment.completed
                ? `Completed`
                : daysUntilDue < 0
                ? `${Math.abs(daysUntilDue)}d overdue`
                : daysUntilDue === 0
                ? 'Due today'
                : `Due in ${daysUntilDue}d`}
            </span>
          </div>
        </div>

        <div className="flex gap-2 flex-shrink-0">
          {!assignment.completed && (
            <button
              onClick={handleComplete}
              className="btn-success text-sm px-3 py-1"
            >
              ✓
            </button>
          )}
          <button
            onClick={handleRemove}
            className="btn-secondary text-sm px-3 py-1 hover:bg-red-100 dark:hover:bg-red-900"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

'use client';

import { Task } from '@/lib/types';
import { CheckCircle2, Clock, AlertCircle, Music, Users, Award } from 'lucide-react';

interface TaskCardProps {
  task: Task;
  memberName?: string;
  onComplete?: (taskId: string) => void;
  showComplete?: boolean;
}

const taskTypeIcons: Record<string, React.ComponentType<any>> = {
  practice: Music,
  attendance: Users,
  solo: Award,
  section: Music,
  behavior: AlertCircle,
  chore: Clock,
};

const taskTypeColors: Record<string, string> = {
  practice: 'bg-blue-100 text-blue-700',
  attendance: 'bg-green-100 text-green-700',
  solo: 'bg-yellow-100 text-yellow-700',
  section: 'bg-purple-100 text-purple-700',
  behavior: 'bg-red-100 text-red-700',
  chore: 'bg-indigo-100 text-indigo-700',
};

const priorityColors: Record<string, string> = {
  low: 'border-l-4 border-l-green-500',
  medium: 'border-l-4 border-l-yellow-500',
  high: 'border-l-4 border-l-red-500',
};

export default function TaskCard({
  task,
  memberName,
  onComplete,
  showComplete = true,
}: TaskCardProps) {
  const Icon = taskTypeIcons[task.type] || Clock;
  const dueDate = new Date(task.dueDate);
  const today = new Date();
  const isOverdue = dueDate < today && task.status !== 'completed';

  return (
    <div
      className={`task-card-hover bg-white rounded-lg p-6 shadow-md ${priorityColors[task.priority]}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3 flex-1">
          <Icon className="w-6 h-6 text-choir-purple mt-1 flex-shrink-0" />
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-800">{task.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{task.description}</p>
            {memberName && (
              <p className="text-xs text-gray-500 mt-2">👤 {memberName}</p>
            )}
          </div>
        </div>

        {showComplete && task.status !== 'completed' && (
          <button
            onClick={() => onComplete?.(task.id)}
            className="text-choir-purple hover:text-choir-pink transition-colors flex-shrink-0 ml-2"
            title="Mark as complete"
          >
            <Circle className="w-6 h-6" />
          </button>
        )}
        {task.status === 'completed' && (
          <CheckCircle2 className="w-6 h-6 text-choir-green flex-shrink-0 ml-2" />
        )}
      </div>

      <div className="flex items-center justify-between flex-wrap gap-2">
        <div className="flex gap-2 items-center flex-wrap">
          <span
            className={`text-xs font-semibold px-3 py-1 rounded-full capitalize ${
              taskTypeColors[task.type]
            }`}
          >
            {task.type}
          </span>

          <span
            className={`text-xs px-2 py-1 rounded capitalize ${
              task.status === 'completed'
                ? 'bg-choir-green text-white'
                : task.status === 'in-progress'
                ? 'bg-choir-blue text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {task.status === 'in-progress' ? 'In Progress' : task.status}
          </span>
        </div>

        <div
          className={`text-xs font-medium ${
            isOverdue ? 'text-red-600 font-bold' : 'text-gray-600'
          }`}
        >
          {isOverdue ? '🔴 Overdue: ' : '📅 '}{dueDate.toLocaleDateString()}
        </div>
      </div>
    </div>
  );
}

// Simple circle icon component for uncompleted tasks
function Circle({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <circle cx="12" cy="12" r="10" strokeWidth="2" />
    </svg>
  );
}

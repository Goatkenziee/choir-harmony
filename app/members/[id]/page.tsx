'use client';

import { useChoirStore } from '@/lib/store';
import { useParams } from 'next/navigation';
import TaskCard from '@/components/TaskCard';
import ProgressBar from '@/components/ProgressBar';
import { ArrowLeft, Award, Music } from 'lucide-react';
import Link from 'next/link';

export default function MemberDetailPage() {
  const params = useParams();
  const memberId = params.id as string;
  const { members, tasks, completeTask } = useChoirStore();

  const member = members.find((m) => m.id === memberId);
  const memberTasks = tasks.filter((t) => t.assignedTo.includes(memberId));
  const completedTasks = memberTasks.filter((t) => t.status === 'completed');
  const activeTasks = memberTasks.filter((t) => t.status !== 'completed');

  if (!member) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">Member not found.</p>
        <Link href="/members" className="text-choir-purple hover:underline mt-4 inline-block">
          ← Back to Members
        </Link>
      </div>
    );
  }

  const progressPercentage = Math.round(
    (completedTasks.length / (memberTasks.length || 1)) * 100
  );

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <Link
        href="/members"
        className="inline-flex items-center gap-2 text-choir-purple hover:text-choir-pink transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Members
      </Link>

      {/* Member Header */}
      <div className="bg-white rounded-lg p-8 shadow-md border-l-4 border-l-choir-purple">
        <div className="flex items-start gap-6 flex-wrap">
          <div
            className="avatar-badge text-white text-5xl"
            style={{ backgroundColor: member.avatarColor, width: '120px', height: '120px' }}
          >
            {member.name.charAt(0)}
          </div>
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-gray-800">{member.name}</h1>
            <p className="text-gray-600 text-lg mt-2 capitalize">{member.section}</p>
            <p className="text-gray-500 text-sm mt-2">
              Joined {new Date(member.joinDate).toLocaleDateString()}
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-700">Overall Progress</span>
                  <span className="text-sm font-bold text-choir-purple">
                    {completedTasks.length}/{memberTasks.length}
                  </span>
                </div>
                <ProgressBar
                  completed={completedTasks.length}
                  total={memberTasks.length}
                  showPercentage={false}
                  variant="large"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-6 shadow-md text-center border-t-4 border-t-choir-blue">
          <p className="text-gray-600 text-sm font-medium">Total Tasks</p>
          <p className="text-3xl font-bold text-choir-blue mt-2">{memberTasks.length}</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md text-center border-t-4 border-t-choir-green">
          <p className="text-gray-600 text-sm font-medium">Completed</p>
          <p className="text-3xl font-bold text-choir-green mt-2">{completedTasks.length}</p>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md text-center border-t-4 border-t-choir-purple">
          <p className="text-gray-600 text-sm font-medium">Completion Rate</p>
          <p className="text-3xl font-bold text-choir-purple mt-2">{progressPercentage}%</p>
        </div>
      </div>

      {/* Active Tasks */}
      {activeTasks.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Music className="w-6 h-6 text-choir-purple" />
            Active Tasks ({activeTasks.length})
          </h2>
          <div className="space-y-4">
            {activeTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onComplete={(taskId) => completeTask(taskId, memberId)}
                showComplete={true}
              />
            ))}
          </div>
        </div>
      )}

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Award className="w-6 h-6 text-choir-green" />
            Completed Tasks ({completedTasks.length})
          </h2>
          <div className="space-y-4">
            {completedTasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                showComplete={false}
              />
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {memberTasks.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg">
          <p className="text-gray-500 text-lg">No tasks assigned to this member yet.</p>
        </div>
      )}
    </div>
  );
}

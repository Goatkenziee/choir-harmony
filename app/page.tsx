'use client';

import { useChoirStore } from '@/lib/store';
import MemberCard from '@/components/MemberCard';
import TaskCard from '@/components/TaskCard';
import ProgressBar from '@/components/ProgressBar';
import { Users, CheckSquare, Music, Calendar } from 'lucide-react';

export default function Dashboard() {
  const { members, tasks, practices, completeTask } = useChoirStore();

  const allTasksCompleted = tasks.filter((t) => t.status === 'completed').length;
  const activeTasks = tasks.filter((t) => t.status !== 'completed');
  const upcomingPractices = practices.filter((p) => new Date(p.date) >= new Date());

  const totalMemberProgress = members.reduce(
    (sum, m) => sum + (m.completedTasks / m.totalTasks),
    0
  );
  const avgProgress = Math.round(
    (totalMemberProgress / members.length) * 100
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-choir-purple via-choir-pink to-choir-blue bg-clip-text text-transparent mb-3">
          Choir Harmony Dashboard
        </h1>
        <p className="text-gray-600 text-lg">
          Manage your choir, track progress, and celebrate achievements together
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-l-choir-purple">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Members</p>
              <p className="text-3xl font-bold text-choir-purple mt-2">
                {members.length}
              </p>
            </div>
            <Users className="w-12 h-12 text-choir-purple opacity-20" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-l-choir-pink">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Tasks Completed</p>
              <p className="text-3xl font-bold text-choir-pink mt-2">
                {allTasksCompleted}
              </p>
            </div>
            <CheckSquare className="w-12 h-12 text-choir-pink opacity-20" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-l-choir-blue">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Active Tasks</p>
              <p className="text-3xl font-bold text-choir-blue mt-2">
                {activeTasks.length}
              </p>
            </div>
            <Music className="w-12 h-12 text-choir-blue opacity-20" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-l-choir-green">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Upcoming Practices</p>
              <p className="text-3xl font-bold text-choir-green mt-2">
                {upcomingPractices.length}
              </p>
            </div>
            <Calendar className="w-12 h-12 text-choir-green opacity-20" />
          </div>
        </div>
      </div>

      {/* Choir Progress Overview */}
      <div className="bg-white rounded-lg p-8 shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Choir Progress</h2>
        <ProgressBar
          completed={members.reduce((sum, m) => sum + m.completedTasks, 0)}
          total={members.reduce((sum, m) => sum + m.totalTasks, 0)}
          label="Overall Completion"
          showPercentage={true}
          variant="large"
        />
        <p className="text-gray-600 mt-4 text-sm">
          Average member progress: <span className="font-bold text-choir-purple">{avgProgress}%</span>
        </p>
      </div>

      {/* Featured Members */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Choir Members</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {members.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      </div>

      {/* Active Tasks */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Active Tasks</h2>
        <div className="space-y-4">
          {activeTasks.slice(0, 5).map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onComplete={(taskId) => {
                // In a real app, would need to track per-member completion
                completeTask(taskId, members[0].id);
              }}
              showComplete={false}
            />
          ))}
          {activeTasks.length === 0 && (
            <p className="text-gray-500 text-center py-8">
              🎉 All tasks completed! Great job, choir!
            </p>
          )}
        </div>
      </div>

      {/* Upcoming Practices */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Upcoming Practices</h2>
        <div className="space-y-4">
          {upcomingPractices.map((practice) => (
            <div
              key={practice.id}
              className="bg-white rounded-lg p-6 shadow-md border-l-4 border-l-choir-purple"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{practice.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{practice.focusArea}</p>
                  <div className="flex gap-4 mt-3 flex-wrap text-sm text-gray-600">
                    <span>📅 {new Date(practice.date).toLocaleDateString()}</span>
                    <span>🕐 {practice.time}</span>
                    <span>⏱️ {practice.duration} min</span>
                    <span>👥 {practice.attendees.length} attending</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

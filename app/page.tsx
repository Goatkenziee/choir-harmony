'use client';

import { useChoirStore } from '@/lib/store';
import MemberCard from '@/components/MemberCard';
import TaskCard from '@/components/TaskCard';
import ProgressBar from '@/components/ProgressBar';
import Leaderboard from '@/components/Leaderboard';
import { Users, CheckSquare, Music, Calendar, Zap, Target } from 'lucide-react';

export default function Dashboard() {
  const { members, tasks, practices } = useChoirStore();

  const allTasksCompleted = tasks.filter((t) => t.status === 'completed').length;
  const activeTasks = tasks.filter((t) => t.status !== 'completed');
  const upcomingPractices = practices.filter((p) => new Date(p.date) >= new Date());
  const choreCount = tasks.filter((t) => t.type === 'chore').length;
  const choreCompleted = tasks.filter(
    (t) => t.type === 'chore' && t.status === 'completed'
  ).length;

  const totalMemberProgress = members.reduce(
    (sum, m) => sum + (m.completedTasks / m.totalTasks),
    0
  );
  const avgProgress = members.length > 0 ? Math.round(
    (totalMemberProgress / members.length) * 100
  ) : 0;

  const activeChores = tasks.filter(
    (t) => t.type === 'chore' && t.status !== 'completed'
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-choir-purple via-choir-pink to-choir-blue bg-clip-text text-transparent mb-3">
          Choir Harmony Dashboard
        </h1>
        <p className="text-gray-600 text-lg">
          Manage your choir, track chores, and celebrate achievements together
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-l-choir-purple hover:shadow-lg transition-shadow">
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

        <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-l-choir-pink hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Chores Completed</p>
              <p className="text-3xl font-bold text-choir-pink mt-2">
                {choreCompleted}
              </p>
              <p className="text-xs text-gray-500 mt-1">of {choreCount}</p>
            </div>
            <CheckSquare className="w-12 h-12 text-choir-pink opacity-20" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-l-choir-blue hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Active Tasks</p>
              <p className="text-3xl font-bold text-choir-blue mt-2">
                {activeTasks.length}
              </p>
            </div>
            <Target className="w-12 h-12 text-choir-blue opacity-20" />
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md border-l-4 border-l-choir-green hover:shadow-lg transition-shadow">
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

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Progress */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg p-8 shadow-md">
            <div className="flex items-center gap-3 mb-6">
              <Zap className="w-6 h-6 text-choir-purple" />
              <h2 className="text-2xl font-bold text-gray-800">Choir Progress</h2>
            </div>
            <ProgressBar
              completed={members.reduce((sum, m) => sum + m.completedTasks, 0)}
              total={members.reduce((sum, m) => sum + m.totalTasks, 0)}
              label="Overall Completion"
              showPercentage={true}
              variant="large"
            />
            <p className="text-gray-600 mt-4 text-sm">
              Average member progress:{' '}
              <span className="font-bold text-choir-purple">{avgProgress}%</span>
            </p>

            {/* Chore Progress */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-4">Chore Completion</h3>
              <ProgressBar
                completed={choreCompleted}
                total={choreCount || 1}
                label="Chores This Week"
                showPercentage={true}
                variant="large"
              />
            </div>
          </div>
        </div>

        {/* Right Column - Leaderboard */}
        <div>
          <Leaderboard members={members} />
        </div>
      </div>

      {/* Featured Members */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Choir Members</h2>
        {members.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Users className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No members yet. Add your first choir member!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {members.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        )}
      </div>

      {/* Active Chores Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">🧹 Active Chores</h2>
        <div className="space-y-4">
          {activeChores.length > 0 ? (
            activeChores.slice(0, 5).map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onComplete={() => {}}
                showComplete={false}
              />
            ))
          ) : (
            <p className="text-gray-500 text-center py-8">
              ✨ All chores completed! Great work, team!
            </p>
          )}
        </div>
      </div>

      {/* Upcoming Practices */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Upcoming Practices</h2>
        {upcomingPractices.length > 0 ? (
          <div className="space-y-4">
            {upcomingPractices.map((practice) => (
              <div
                key={practice.id}
                className="bg-white rounded-lg p-6 shadow-md border-l-4 border-l-choir-purple hover:shadow-lg transition-shadow"
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
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <Calendar className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">No upcoming practices scheduled</p>
          </div>
        )}
      </div>
    </div>
  );
}
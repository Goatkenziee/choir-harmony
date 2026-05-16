'use client';

import { Member } from '@/lib/types';
import { Trophy, Star, Award } from 'lucide-react';

interface LeaderboardProps {
  members: Member[];
}

export default function Leaderboard({ members }: LeaderboardProps) {
  const sorted = [...members].sort((a, b) => {
    const aRate = a.completedTasks / a.totalTasks;
    const bRate = b.completedTasks / b.totalTasks;
    return bRate - aRate;
  });

  const getMedalIcon = (position: number) => {
    switch (position) {
      case 0:
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 1:
        return <Award className="w-5 h-5 text-gray-400" />;
      case 2:
        return <Star className="w-5 h-5 text-orange-400" />;
      default:
        return <span className="text-gray-400 font-bold">{position + 1}</span>;
    }
  };

  return (
    <div className="bg-white rounded-lg p-8 shadow-md">
      <div className="flex items-center gap-3 mb-6">
        <Trophy className="w-6 h-6 text-choir-purple" />
        <h2 className="text-2xl font-bold text-gray-800">Top Performers</h2>
      </div>

      <div className="space-y-3">
        {sorted.map((member, index) => {
          const completionRate = Math.round(
            (member.completedTasks / member.totalTasks) * 100
          );
          const isTopThree = index < 3;

          return (
            <div
              key={member.id}
              className={`flex items-center gap-4 p-4 rounded-lg transition-all ${
                isTopThree
                  ? 'bg-gradient-to-r from-choir-purple/10 to-choir-pink/10 border-l-4 border-choir-purple'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center justify-center w-8">
                {getMedalIcon(index)}
              </div>

              <div
                className="avatar-badge w-10 h-10"
                style={{ backgroundColor: member.avatarColor }}
              >
                {member.name.charAt(0)}
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-gray-800 truncate">
                  {member.name}
                </p>
                <p className="text-xs text-gray-500 capitalize">{member.section}</p>
              </div>

              <div className="text-right">
                <p className="font-bold text-choir-purple">{completionRate}%</p>
                <p className="text-xs text-gray-500">
                  {member.completedTasks}/{member.totalTasks} tasks
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
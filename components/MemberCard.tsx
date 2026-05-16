'use client';

import React from 'react';
import { Trash2, Award } from 'lucide-react';
import type { Member } from '@/types/index';

interface MemberCardProps {
  member: Member;
  onRemove?: (memberId: string) => void;
  showPoints?: boolean;
  rank?: number;
}

export function MemberCard({
  member,
  onRemove,
  showPoints = true,
  rank,
}: MemberCardProps) {
  const getBadgeForPoints = (points: number) => {
    if (points >= 100) return '⭐';
    if (points >= 50) return '🌟';
    if (points >= 25) return '✨';
    return '💫';
  };

  return (
    <div className="card flex items-center gap-4 relative overflow-hidden">
      {/* Rank badge (leaderboard only) */}
      {rank && (
        <div className="absolute top-2 right-2 bg-accent-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm">
          #{rank}
        </div>
      )}

      {/* Avatar */}
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-lg flex-shrink-0"
        style={{ backgroundColor: member.color }}
      >
        {member.name.charAt(0).toUpperCase()}
      </div>

      {/* Info */}
      <div className="flex-grow">
        <h3 className="font-bold text-lg">{member.name}</h3>
        <p className="text-sm text-slate-600 dark:text-slate-400 capitalize">
          {member.role} • Joined {new Date(member.joinedDate).toLocaleDateString()}
        </p>
      </div>

      {/* Points & Badge */}
      {showPoints && (
        <div className="flex flex-col items-center gap-2 flex-shrink-0">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              {member.points}
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400">Points</p>
          </div>
          <span className="text-xl">{getBadgeForPoints(member.points)}</span>
        </div>
      )}

      {/* Remove button */}
      {onRemove && (
        <button
          onClick={() => onRemove(member.id)}
          className="p-2 hover:bg-red-100 dark:hover:bg-red-900 rounded-lg transition-colors flex-shrink-0"
          aria-label="Remove member"
        >
          <Trash2 className="w-5 h-5 text-red-500" />
        </button>
      )}
    </div>
  );
}

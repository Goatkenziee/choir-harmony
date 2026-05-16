'use client';

import Link from 'next/link';
import { Member } from '@/lib/types';
import { ChevronRight } from 'lucide-react';

interface MemberCardProps {
  member: Member;
}

export default function MemberCard({ member }: MemberCardProps) {
  const completionPercentage = Math.round(
    (member.completedTasks / member.totalTasks) * 100
  );

  return (
    <Link href={`/members/${member.id}`}>
      <div className="task-card-hover bg-white rounded-lg p-6 border-2 border-transparent hover:border-choir-purple">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            <div
              className="avatar-badge text-white"
              style={{ backgroundColor: member.avatarColor }}
            >
              {member.name.charAt(0)}
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-800">{member.name}</h3>
              <p className="text-sm text-gray-500 capitalize">{member.section}</p>
            </div>
          </div>
          <ChevronRight className="w-5 h-5 text-choir-purple" />
        </div>

        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Tasks</span>
            <span className="text-sm font-bold text-choir-purple">
              {member.completedTasks}/{member.totalTasks}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-choir-purple to-choir-pink h-2 rounded-full progress-fill"
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">{completionPercentage}% complete</p>
        </div>

        <div className="text-xs text-gray-400">
          Joined {new Date(member.joinDate).toLocaleDateString()}
        </div>
      </div>
    </Link>
  );
}

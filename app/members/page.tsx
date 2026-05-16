'use client';

import React, { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import { Header } from '@/components/Header';
import { Navigation } from '@/components/Navigation';
import { MemberCard } from '@/components/MemberCard';
import { useChoirStore } from '@/store/choirStore';
import type { Member } from '@/types/index';

const COLORS = [
  '#d8b4fe', // purple
  '#fcd34d', // yellow
  '#7dd3fc', // sky
  '#fda4af', // rose
  '#86efac', // green
  '#a78bfa', // indigo
];

export default function MembersPage() {
  const [mounted, setMounted] = useState(false);
  const [showAddMember, setShowAddMember] = useState(false);
  const [memberName, setMemberName] = useState('');
  const [memberRole, setMemberRole] = useState<'soprano' | 'alto' | 'tenor' | 'bass'>('soprano');
  const [memberColor, setMemberColor] = useState(COLORS[0]);

  const loadFromStorage = useChoirStore((state) => state.loadFromStorage);
  const saveToStorage = useChoirStore((state) => state.saveToStorage);
  const members = useChoirStore((state) => state.members);
  const addMember = useChoirStore((state) => state.addMember);
  const removeMember = useChoirStore((state) => state.removeMember);

  useEffect(() => {
    loadFromStorage();
    setMounted(true);
    return () => saveToStorage();
  }, [loadFromStorage, saveToStorage]);

  if (!mounted) return null;

  const handleAddMember = () => {
    if (!memberName.trim()) return;
    addMember({
      name: memberName,
      role: memberRole,
      color: memberColor,
      joinedDate: new Date().toISOString(),
    });
    setMemberName('');
    setMemberRole('soprano');
    setMemberColor(COLORS[0]);
    setShowAddMember(false);
  };

  const groupedByRole = {
    soprano: members.filter((m) => m.role === 'soprano'),
    alto: members.filter((m) => m.role === 'alto'),
    tenor: members.filter((m) => m.role === 'tenor'),
    bass: members.filter((m) => m.role === 'bass'),
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <Navigation />

      <main className="flex-grow p-4 md:p-8 pb-20 md:pb-8 md:ml-64 mt-0">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">Choir Members</h1>
            <button
              onClick={() => setShowAddMember(!showAddMember)}
              className="btn-primary flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Member
            </button>
          </div>

          {/* Add Member Form */}
          {showAddMember && (
            <div className="card border-2 border-primary-500 space-y-4">
              <h2 className="text-xl font-bold">Add New Member</h2>
              <input
                type="text"
                placeholder="Member Name"
                value={memberName}
                onChange={(e) => setMemberName(e.target.value)}
                className="input-field"
              />
              <select
                value={memberRole}
                onChange={(e) => setMemberRole(e.target.value as any)}
                className="input-field"
              >
                <option value="soprano">Soprano 🎵</option>
                <option value="alto">Alto 🎶</option>
                <option value="tenor">Tenor 🎼</option>
                <option value="bass">Bass 🎹</option>
              </select>
              <div>
                <label className="text-sm font-semibold mb-2 block">
                  Avatar Color
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {COLORS.map((color) => (
                    <button
                      key={color}
                      onClick={() => setMemberColor(color)}
                      className={`w-12 h-12 rounded-lg border-4 transition-all ${
                        memberColor === color
                          ? 'border-slate-900 dark:border-white scale-110'
                          : 'border-transparent'
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={handleAddMember} className="btn-primary flex-1">
                  Add Member
                </button>
                <button
                  onClick={() => setShowAddMember(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {/* Members by Voice Part */}
          <div className="space-y-8">
            {(Object.entries(groupedByRole) as [string, Member[]][]).map(
              ([role, roleMembers]) =>
                roleMembers.length > 0 && (
                  <section key={role}>
                    <h2 className="text-2xl font-bold mb-4 capitalize">
                      {role === 'soprano'
                        ? '🎵 Sopranos'
                        : role === 'alto'
                        ? '🎶 Altos'
                        : role === 'tenor'
                        ? '🎼 Tenors'
                        : '🎹 Basses'}
                    </h2>
                    <div className="space-y-4">
                      {roleMembers.map((member) => (
                        <MemberCard
                          key={member.id}
                          member={member}
                          onRemove={() => {
                            if (window.confirm(`Remove ${member.name}?`)) {
                              removeMember(member.id);
                            }
                          }}
                        />
                      ))}
                    </div>
                  </section>
                )
            )}
          </div>

          {members.length === 0 && (
            <div className="card text-center py-12">
              <p className="text-slate-500 dark:text-slate-400 mb-4">
                No members yet. Add your first choir member to get started!
              </p>
              <button
                onClick={() => setShowAddMember(true)}
                className="btn-primary"
              >
                Add First Member
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

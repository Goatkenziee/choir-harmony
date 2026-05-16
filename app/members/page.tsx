'use client';

import { useChoirStore } from '@/lib/store';
import MemberCard from '@/components/MemberCard';
import { Plus, Music } from 'lucide-react';
import { useState } from 'react';

export default function MembersPage() {
  const { members, addMember } = useChoirStore();
  const [showForm, setShowForm] = useState(false);
  const [filterSection, setFilterSection] = useState<string | 'all'>('all');

  const sections = ['soprano', 'alto', 'tenor', 'bass', 'unassigned'] as const;
  const filteredMembers =
    filterSection === 'all'
      ? members
      : members.filter((m) => m.section === filterSection);

  const handleAddMember = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const newMember = {
      id: Date.now().toString(),
      name: formData.get('name') as string,
      avatarColor: `hsl(${Math.random() * 360}, 70%, 50%)`,
      section: formData.get('section') as any,
      joinDate: new Date().toISOString().split('T')[0],
      completedTasks: 0,
      totalTasks: 0,
    };

    addMember(newMember);
    setShowForm(false);
    e.currentTarget.reset();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-3">
            <Music className="w-10 h-10 text-choir-purple" />
            Choir Members
          </h1>
          <p className="text-gray-600 mt-2">{filteredMembers.length} singers</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-choir-purple to-choir-pink text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:shadow-lg transition-all"
        >
          <Plus className="w-5 h-5" />
          Add Member
        </button>
      </div>

      {/* Add Member Form */}
      {showForm && (
        <div className="bg-white rounded-lg p-8 shadow-md border-2 border-choir-purple">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Add New Member</h2>
          <form onSubmit={handleAddMember} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-choir-purple focus:border-transparent"
                placeholder="Singer's name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Vocal Section
              </label>
              <select
                name="section"
                defaultValue="unassigned"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-choir-purple focus:border-transparent"
              >
                <option value="unassigned">Unassigned</option>
                <option value="soprano">Soprano</option>
                <option value="alto">Alto</option>
                <option value="tenor">Tenor</option>
                <option value="bass">Bass</option>
              </select>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 bg-choir-purple text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Add Member
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex-1 bg-gray-200 text-gray-800 py-2 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Filter by Section */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setFilterSection('all')}
          className={`px-4 py-2 rounded-full font-semibold transition-all ${
            filterSection === 'all'
              ? 'bg-choir-purple text-white'
              : 'bg-white text-gray-800 border border-gray-300 hover:border-choir-purple'
          }`}
        >
          All ({members.length})
        </button>
        {sections.map((section) => {
          const count = members.filter((m) => m.section === section).length;
          return (
            <button
              key={section}
              onClick={() => setFilterSection(section)}
              className={`px-4 py-2 rounded-full font-semibold transition-all capitalize ${
                filterSection === section
                  ? 'bg-choir-purple text-white'
                  : 'bg-white text-gray-800 border border-gray-300 hover:border-choir-purple'
              }`}
            >
              {section} ({count})
            </button>
          );
        })}
      </div>

      {/* Members Grid */}
      {filteredMembers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMembers.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">No members in this section yet.</p>
        </div>
      )}
    </div>
  );
}

'use client';

import { useChoirStore } from '@/lib/store';
import { Calendar, Plus, Users, Clock } from 'lucide-react';
import { useState } from 'react';

export default function PracticePage() {
  const { practices, members, addPractice, markAttendance } = useChoirStore();
  const [showForm, setShowForm] = useState(false);

  const upcomingPractices = practices.filter(
    (p) => new Date(p.date) >= new Date()
  );
  const pastPractices = practices.filter((p) => new Date(p.date) < new Date());

  const handleAddPractice = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const newPractice = {
      id: Date.now().toString(),
      title: formData.get('title') as string,
      date: formData.get('date') as string,
      time: formData.get('time') as string,
      duration: parseInt(formData.get('duration') as string, 10),
      focusArea: formData.get('focusArea') as string,
      attendees: (formData.getAll('attendees') as string[]) || [],
    };

    addPractice(newPractice);
    setShowForm(false);
    e.currentTarget.reset();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-3">
            <Calendar className="w-10 h-10 text-choir-purple" />
            Practice Schedule
          </h1>
          <p className="text-gray-600 mt-2">{upcomingPractices.length} upcoming practices</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-choir-purple to-choir-pink text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:shadow-lg transition-all"
        >
          <Plus className="w-5 h-5" />
          Schedule Practice
        </button>
      </div>

      {/* Add Practice Form */}
      {showForm && (
        <div className="bg-white rounded-lg p-8 shadow-md border-2 border-choir-purple">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Schedule New Practice</h2>
          <form onSubmit={handleAddPractice} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Practice Title
              </label>
              <input
                type="text"
                name="title"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-choir-purple focus:border-transparent"
                placeholder="e.g., Full Choir Practice"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-choir-purple focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time
                </label>
                <input
                  type="time"
                  name="time"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-choir-purple focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duration (minutes)
              </label>
              <input
                type="number"
                name="duration"
                required
                min="15"
                step="15"
                defaultValue="90"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-choir-purple focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Focus Area
              </label>
              <textarea
                name="focusArea"
                rows={2}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-choir-purple focus:border-transparent"
                placeholder="What will we be focusing on?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Expected Attendees
              </label>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {members.map((member) => (
                  <label key={member.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="attendees"
                      value={member.id}
                      defaultChecked
                      className="w-4 h-4 text-choir-purple rounded focus:ring-2"
                    />
                    <span className="text-gray-700">{member.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 bg-choir-purple text-white py-2 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
              >
                Schedule Practice
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

      {/* Upcoming Practices */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Upcoming Practices</h2>
        {upcomingPractices.length > 0 ? (
          <div className="space-y-4">
            {upcomingPractices.map((practice) => (
              <div
                key={practice.id}
                className="bg-white rounded-lg p-6 shadow-md border-l-4 border-l-choir-purple task-card-hover"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">{practice.title}</h3>
                    <p className="text-gray-600 text-sm mt-1">{practice.focusArea}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-700">
                      <Calendar className="w-5 h-5 text-choir-purple" />
                      <span>{new Date(practice.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-700">
                      <Clock className="w-5 h-5 text-choir-purple" />
                      <span>{practice.time} ({practice.duration} min)</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Users className="w-5 h-5 text-choir-purple" />
                      <span className="font-semibold">{practice.attendees.length} attending</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {practice.attendees.slice(0, 3).map((memberId) => {
                        const member = members.find((m) => m.id === memberId);
                        return (
                          <div
                            key={memberId}
                            className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700"
                            title={member?.name}
                          >
                            {member?.name.split(' ')[0]}
                          </div>
                        );
                      })}
                      {practice.attendees.length > 3 && (
                        <div className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                          +{practice.attendees.length - 3} more
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-500 text-lg">No upcoming practices scheduled.</p>
          </div>
        )}
      </div>

      {/* Past Practices */}
      {pastPractices.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Past Practices</h2>
          <div className="space-y-4">
            {pastPractices.map((practice) => (
              <div
                key={practice.id}
                className="bg-gray-100 rounded-lg p-6 shadow-sm border-l-4 border-l-gray-400 opacity-75"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-700">{practice.title}</h3>
                    <p className="text-gray-600 text-sm">{practice.focusArea}</p>
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(practice.date).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

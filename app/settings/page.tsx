'use client';

import React, { useEffect, useState } from 'react';
import { Trash2, Download, Upload } from 'lucide-react';
import { Header } from '@/components/Header';
import { Navigation } from '@/components/Navigation';
import { useChoirStore } from '@/store/choirStore';

export default function SettingsPage() {
  const [mounted, setMounted] = useState(false);
  const [choirName, setChoirName] = useState('My Choir');
  const [director, setDirector] = useState('');
  const [meetingDays, setMeetingDays] = useState('Monday, Wednesday, Friday');

  const loadFromStorage = useChoirStore((state) => state.loadFromStorage);
  const saveToStorage = useChoirStore((state) => state.saveToStorage);
  const resetStore = useChoirStore((state) => state.resetStore);
  const state = useChoirStore((state) => ({
    members: state.members,
    chores: state.chores,
    assignments: state.assignments,
  }));

  useEffect(() => {
    loadFromStorage();
    setMounted(true);
    return () => saveToStorage();
  }, [loadFromStorage, saveToStorage]);

  if (!mounted) return null;

  const handleSaveSettings = () => {
    localStorage.setItem(
      'choir-settings',
      JSON.stringify({
        choirName,
        director,
        meetingDays,
      })
    );
    alert('Settings saved!');
  };

  const handleExportData = () => {
    const data = {
      choirName,
      director,
      meetingDays,
      members: state.members,
      chores: state.chores,
      assignments: state.assignments,
      exportedAt: new Date().toISOString(),
    };

    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `choir-data-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target?.result as string);
        setChoirName(data.choirName || 'My Choir');
        setDirector(data.director || '');
        setMeetingDays(data.meetingDays || '');
        alert('Data imported successfully!');
      } catch (error) {
        alert('Failed to import data. Please check the file format.');
      }
    };
    reader.readAsText(file);
  };

  const handleResetData = () => {
    if (
      window.confirm(
        'Are you sure? This will delete ALL members, chores, and assignments. This cannot be undone.'
      )
    ) {
      resetStore();
      alert('All data has been reset.');
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      <Navigation />

      <main className="flex-grow p-4 md:p-8 pb-20 md:pb-8 md:ml-64 mt-0">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Page Header */}
          <h1 className="text-3xl font-bold">Settings</h1>

          {/* Choir Information */}
          <section className="card space-y-4">
            <h2 className="text-2xl font-bold">Choir Information</h2>
            <div>
              <label className="block text-sm font-semibold mb-2">Choir Name</label>
              <input
                type="text"
                value={choirName}
                onChange={(e) => setChoirName(e.target.value)}
                placeholder="e.g., St. Mary's Youth Choir"
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Director Name</label>
              <input
                type="text"
                value={director}
                onChange={(e) => setDirector(e.target.value)}
                placeholder="e.g., Ms. Sarah Johnson"
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Meeting Days</label>
              <input
                type="text"
                value={meetingDays}
                onChange={(e) => setMeetingDays(e.target.value)}
                placeholder="e.g., Monday, Wednesday, Friday"
                className="input-field"
              />
            </div>
            <button onClick={handleSaveSettings} className="btn-primary w-full">
              Save Settings
            </button>
          </section>

          {/* Data Management */}
          <section className="card space-y-4">
            <h2 className="text-2xl font-bold">Data Management</h2>

            {/* Statistics */}
            <div className="grid grid-cols-3 gap-4 p-4 bg-slate-100 dark:bg-slate-800 rounded-lg">
              <div className="text-center">
                <p className="text-2xl font-bold">{state.members.length}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">Members</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{state.chores.length}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">Chores</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{state.assignments.length}</p>
                <p className="text-xs text-slate-600 dark:text-slate-400">Assignments</p>
              </div>
            </div>

            {/* Export / Import */}
            <div className="space-y-3">
              <button
                onClick={handleExportData}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Export Data as JSON
              </button>

              <label className="block">
                <input
                  type="file"
                  accept=".json"
                  onChange={handleImportData}
                  className="hidden"
                />
                <span className="btn-secondary w-full flex items-center justify-center gap-2 cursor-pointer">
                  <Upload className="w-5 h-5" />
                  Import Data from JSON
                </span>
              </label>
            </div>
          </section>

          {/* Danger Zone */}
          <section className="card border-4 border-red-500/50 space-y-4">
            <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">Danger Zone</h2>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              These actions are permanent and cannot be undone.
            </p>
            <button
              onClick={handleResetData}
              className="btn-secondary w-full flex items-center justify-center gap-2 hover:bg-red-100 dark:hover:bg-red-900 text-red-600 dark:text-red-400 border-2 border-red-500/50"
            >
              <Trash2 className="w-5 h-5" />
              Reset All Data
            </button>
          </section>

          {/* Help & Info */}
          <section className="card bg-blue-50 dark:bg-blue-900 space-y-4">
            <h2 className="text-2xl font-bold">About Choir Harmony</h2>
            <div className="text-sm space-y-2">
              <p>
                <strong>Version:</strong> 1.0.0
              </p>
              <p>
                <strong>Purpose:</strong> Track choir member chores, assignments, and
                celebrate achievements through a fun leaderboard system.
              </p>
              <p className="text-slate-600 dark:text-slate-400">
                Built with React, Next.js, and Tailwind CSS for a beautiful, responsive
                experience on all devices.
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

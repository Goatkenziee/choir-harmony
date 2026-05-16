'use client';

import { useChoirStore } from '@/lib/store';
import TaskCard from '@/components/TaskCard';
import { CheckSquare, Plus } from 'lucide-react';
import { useState } from 'react';

export default function TasksPage() {
  const { tasks, members, addTask, completeTask } = useChoirStore();
  const [showForm, setShowForm] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string | 'all'>('all');

  const filteredTasks =
    filterStatus === 'all'
      ? tasks
      : tasks.filter((t) => t.status === filterStatus);

  const handleAddTask = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const newTask = {
      id: Date.now().toString(),
      title: formData.get('title') as string,
      description: formData.get('description') as string,
      type: formData.get('type') as any,
      assignedTo: (formData.getAll('assignedTo') as string[]) || [],
      dueDate: formData.get('dueDate') as string,
      status: 'pending' as const,
      priority: formData.get('priority') as any,
      createdAt: new Date().toISOString().split('T')[0],
    };

    addTask(newTask);
    setShowForm(false);
    e.currentTarget.reset();
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-4xl font-bold text-gray-800 flex items-center gap-3">
            <CheckSquare className="w-10 h-10 text-choir-purple" />
            Tasks & Chores
          </h1>
          <p className="text-gray-600 mt-2">{filteredTasks.length} tasks</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-gradient-to-r from-choir-purple to-choir-pink text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:shadow-lg transition-all"
        >
          <Plus className="w-5 h-5" />
          New Task
        </button>
      </div>

      {/* Add Task Form */}
      {showForm && (
        <div className="bg-white rounded-lg p-8 shadow-md border-2 border-choir-purple">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Task</h2>
          <form onSubmit={handleAddTask} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Task Title
              </label>
              <input
                type="text"
                name="title"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-choir-purple focus:border-transparent"
                placeholder="e.g., Learn verse 1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-choir-purple focus:border-transparent"
                placeholder="Details about the task..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Task Type
                </label>
                <select
                  name="type"
                  defaultValue="practice"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-choir-purple focus:border-transparent"
                >
                  <option value="practice">Practice</option>
                  <option value="attendance">Attendance</option>
                  <option value="solo">Solo</option>
                  <option value="section">Section</option>
                  <option value="chore">Chore</option>
                  <option value="behavior">Behavior</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Priority
                </label>
                <select
                  name="priority"
                  defaultValue="medium"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-choir-purple focus:border-transparent"
                >
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Due Date
              </label>
              <input
                type="date"
                name="dueDate"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-choir-purple focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assign to Members
              </label>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {members.map((member) => (
                  <label key={member.id} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="assignedTo"
                      value={member.id}
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
                Create Task
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

      {/* Filter by Status */}
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={() => setFilterStatus('all')}
          className={`px-4 py-2 rounded-full font-semibold transition-all ${
            filterStatus === 'all'
              ? 'bg-choir-purple text-white'
              : 'bg-white text-gray-800 border border-gray-300 hover:border-choir-purple'
          }`}
        >
          All ({tasks.length})
        </button>
        {['pending', 'in-progress', 'completed'].map((status) => {
          const count = tasks.filter((t) => t.status === status).length;
          return (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-2 rounded-full font-semibold transition-all capitalize ${
                filterStatus === status
                  ? 'bg-choir-purple text-white'
                  : 'bg-white text-gray-800 border border-gray-300 hover:border-choir-purple'
              }`}
            >
              {status === 'in-progress' ? 'In Progress' : status} ({count})
            </button>
          );
        })}
      </div>

      {/* Tasks List */}
      {filteredTasks.length > 0 ? (
        <div className="space-y-4">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onComplete={(taskId) => completeTask(taskId, task.assignedTo[0])}
              showComplete={task.status !== 'completed'}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-gray-500 text-lg">
            {filterStatus === 'all'
              ? 'No tasks yet. Create one to get started!'
              : `No ${filterStatus} tasks.`}
          </p>
        </div>
      )}
    </div>
  );
}

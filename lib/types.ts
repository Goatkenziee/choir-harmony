export type TaskStatus = 'pending' | 'in-progress' | 'completed';
export type TaskType = 'practice' | 'attendance' | 'solo' | 'section' | 'behavior' | 'chore';

export interface Member {
  id: string;
  name: string;
  avatarColor: string;
  section: 'soprano' | 'alto' | 'tenor' | 'bass' | 'unassigned';
  joinDate: string;
  completedTasks: number;
  totalTasks: number;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  type: TaskType;
  assignedTo: string[]; // array of member IDs
  dueDate: string;
  status: TaskStatus;
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}

export interface Practice {
  id: string;
  title: string;
  date: string;
  time: string;
  duration: number; // in minutes
  attendees: string[]; // member IDs
  focusArea: string;
}

export interface ChoreAssignment {
  id: string;
  memberId: string;
  taskId: string;
  completedAt?: string;
}

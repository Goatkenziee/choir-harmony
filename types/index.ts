export interface Member {
  id: string;
  name: string;
  role: 'soprano' | 'alto' | 'tenor' | 'bass';
  color: string; // hex color for avatar
  points: number;
  joinedDate: string;
}

export interface Chore {
  id: string;
  title: string;
  description: string;
  icon: string; // lucide icon name
  pointsReward: number;
  category: 'warm-up' | 'music' | 'practice' | 'setup' | 'leadership' | 'other';
}

export interface Assignment {
  id: string;
  choreId: string;
  memberId: string;
  dueDate: string;
  completed: boolean;
  completedDate?: string;
}

export interface ChoirState {
  members: Member[];
  chores: Chore[];
  assignments: Assignment[];
  darkMode: boolean;
  
  // Member actions
  addMember: (member: Omit<Member, 'id' | 'points'>) => void;
  removeMember: (memberId: string) => void;
  updateMember: (memberId: string, updates: Partial<Member>) => void;
  
  // Chore actions
  addChore: (chore: Omit<Chore, 'id'>) => void;
  removeChore: (choreId: string) => void;
  updateChore: (choreId: string, updates: Partial<Chore>) => void;
  
  // Assignment actions
  assignChore: (choreId: string, memberId: string, dueDate: string) => void;
  completeAssignment: (assignmentId: string) => void;
  removeAssignment: (assignmentId: string) => void;
  
  // Points & leaderboard
  addPoints: (memberId: string, points: number) => void;
  getLeaderboard: () => Member[];
  
  // Theme
  toggleDarkMode: () => void;
  
  // Persistence
  loadFromStorage: () => void;
  saveToStorage: () => void;
}

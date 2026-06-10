export type Tab = 'schedule' | 'explore' | 'achievements' | 'profile';

export interface Exercise {
  id: string;
  name: string;
  videoUrl: string;
  coverImage: string;
  duration: number;
  category: 'neck' | 'shoulder' | 'back' | 'knee' | 'ankle' | 'hip';
  phase: 'early' | 'middle' | 'late';
  sets: number;
  reps: number;
  description: string;
  keyPoints: string[];
  commonMistakes: string[];
}

export interface AssessmentReport {
  id: string;
  date: string;
  type: 'weekly' | 'monthly' | 'final';
  overallScore: number;
  rangeOfMotion: {
    hipFlexion: number;
    hipExtension: number;
    hipAbduction: number;
    hipAdduction: number;
  };
  muscleStrength: {
    quadriceps: number;
    glutes: number;
    hamstrings: number;
  };
  balanceScore: number;
  walkingAbility: number;
  painLevel: number;
  remarks: string;
  doctorSignature: string;
}

export interface TrainingDay {
  date: string;
  exercises: {
    exerciseId: string;
    completed: boolean;
  }[];
  completed: boolean;
  painScore?: number;
}

export interface WeeklyData {
  day: string;
  date: string;
  completed: boolean;
  isToday: boolean;
}

export interface RecoveryTrend {
  date: string;
  score: number;
}

export interface UserProfile {
  name: string;
  avatar: string;
  surgeryType: string;
  surgeryDate: string;
  recoveryPhase: 'early' | 'middle' | 'late';
  doctorName: string;
  totalDays: number;
  streakDays: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface BodyFeeling {
  id: string;
  date: string;
  content: string;
  painLevel: number;
}

export interface WeeklyStats {
  day: string;
  minutes: number;
}

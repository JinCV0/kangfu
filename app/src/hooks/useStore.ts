import { useState, useCallback } from 'react';
import type { TrainingDay, BodyFeeling, Tab } from '@/types';

export function useStore() {
  const [activeTab, setActiveTab] = useState<Tab>('schedule');
  const [checkInState, setCheckInState] = useState<Record<string, TrainingDay>>({});
  const [feelings, setFeelings] = useState<BodyFeeling[]>([]);
  const [showCheckInModal, setShowCheckInModal] = useState(false);
  const [showFeelingModal, setShowFeelingModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>('');

  const toggleExercise = useCallback((date: string, exerciseId: string) => {
    setCheckInState(prev => {
      const day = prev[date] || { date, exercises: [], completed: false };
      const exercises = day.exercises.map(e => 
        e.exerciseId === exerciseId ? { ...e, completed: !e.completed } : e
      );
      const allCompleted = exercises.length > 0 && exercises.every(e => e.completed);
      return {
        ...prev,
        [date]: { ...day, exercises, completed: allCompleted },
      };
    });
  }, []);

  const completeDay = useCallback((date: string, trainingDay: TrainingDay) => {
    setCheckInState(prev => ({
      ...prev,
      [date]: { ...trainingDay, completed: true },
    }));
  }, []);

  const addFeeling = useCallback((feeling: BodyFeeling) => {
    setFeelings(prev => [feeling, ...prev]);
  }, []);

  return {
    activeTab,
    setActiveTab,
    checkInState,
    toggleExercise,
    completeDay,
    feelings,
    addFeeling,
    showCheckInModal,
    setShowCheckInModal,
    showFeelingModal,
    setShowFeelingModal,
    selectedDate,
    setSelectedDate,
  };
}

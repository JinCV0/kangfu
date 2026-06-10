import { useState, useCallback, useEffect } from 'react';
import SchedulePage from '@/pages/SchedulePage';
import ExplorePage from '@/pages/ExplorePage';
import AchievementsPage from '@/pages/AchievementsPage';
import ProfilePage from '@/pages/ProfilePage';
import AssessmentPage from '@/pages/AssessmentPage';
import BottomNav from '@/components/BottomNav';
import { getWeeklyData, getTrainingPlan } from '@/data/mockData';
import type { Tab, TrainingDay, BodyFeeling } from '@/types';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('schedule');
  const [currentPage, setCurrentPage] = useState<string>('main');
  const [checkInState, setCheckInState] = useState<Record<string, TrainingDay>>({});

  useEffect(() => {
    const weeklyData = getWeeklyData();
    const initialState: Record<string, TrainingDay> = {};
    weeklyData.forEach(day => {
      initialState[day.date] = getTrainingPlan(day.date);
    });
    setCheckInState(initialState);
  }, []);
  const [feelings, setFeelings] = useState<BodyFeeling[]>([]);
  const [showCheckIn, setShowCheckIn] = useState(false);
  const [showFeelingModal, setShowFeelingModal] = useState(false);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
  };

  const handleBack = () => {
    setCurrentPage('main');
  };

  const toggleExercise = useCallback((date: string, exerciseId: string) => {
    setCheckInState(prev => {
      const day = prev[date] || { date, exercises: [], completed: false };
      const exercises = day.exercises.length > 0
        ? day.exercises.map(e =>
            e.exerciseId === exerciseId ? { ...e, completed: !e.completed } : e
          )
        : [{ exerciseId, completed: true }];
      
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

  const renderPage = () => {
    switch (activeTab) {
      case 'schedule':
        return (
          <SchedulePage
            checkInState={checkInState}
            onToggleExercise={toggleExercise}
            onCompleteDay={completeDay}
            showCheckIn={showCheckIn}
            setShowCheckIn={setShowCheckIn}
          />
        );
      case 'explore':
        return <ExplorePage />;
      case 'achievements':
        return (
          <AchievementsPage
            feelings={feelings}
            onAddFeeling={addFeeling}
            showFeelingModal={showFeelingModal}
            setShowFeelingModal={setShowFeelingModal}
          />
        );
      case 'profile':
        return <ProfilePage onNavigate={handleNavigate} />;
      default:
        return (
          <SchedulePage
            checkInState={checkInState}
            onToggleExercise={toggleExercise}
            onCompleteDay={completeDay}
            showCheckIn={showCheckIn}
            setShowCheckIn={setShowCheckIn}
          />
        );
    }
  };

  if (currentPage === 'assessment') {
    return <AssessmentPage onBack={handleBack} />;
  }

  return (
    <div className="min-h-screen" style={{ background: '#000000' }}>
      {/* Mobile Frame */}
      <div
        className="mx-auto min-h-screen relative"
        style={{
          maxWidth: '430px',
          background: activeTab === 'explore' ? '#000000' : '#F5F5F7',
        }}
      >
        {/* Main Content */}
        <main className="no-scrollbar" style={{ overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
          {renderPage()}
        </main>

        {/* Bottom Navigation */}
        <BottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    </div>
  );
}

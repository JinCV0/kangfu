import { useState, useMemo } from 'react';
import { Bell, TrendingUp, ChevronRight } from 'lucide-react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';
import FloatingCard3D from '@/components/FloatingCard3D';
import CheckInModal from '@/components/CheckInModal';
import { userProfile, getWeeklyData, getTrainingPlan, recoveryTrend, exercises } from '@/data/mockData';
import type { TrainingDay } from '@/types';

interface SchedulePageProps {
  checkInState: Record<string, TrainingDay>;
  onToggleExercise: (date: string, exerciseId: string) => void;
  onCompleteDay: (date: string, day: TrainingDay) => void;
  showCheckIn: boolean;
  setShowCheckIn: (show: boolean) => void;
}

export default function SchedulePage({
  checkInState,
  onToggleExercise,
  onCompleteDay,
  showCheckIn,
  setShowCheckIn,
}: SchedulePageProps) {
  const [selectedDate, setSelectedDate] = useState<string>(() => {
    const today = new Date();
    return `${today.getMonth() + 1}/${today.getDate()}`;
  });
  
  const weeklyData = useMemo(() => getWeeklyData(), []);
  
  const trainingPlan = useMemo(() => {
    const plan = getTrainingPlan(selectedDate);
    const saved = checkInState[selectedDate];
    if (saved) {
      return {
        ...plan,
        exercises: plan.exercises.map(e => ({
          ...e,
          completed: saved.exercises.find(se => se.exerciseId === e.exerciseId)?.completed ?? false,
        })),
        completed: saved.completed,
      };
    }
    return plan;
  }, [selectedDate, checkInState]);
  
  const todayPlan = useMemo(() => getTrainingPlan(selectedDate), [selectedDate]);
  
  const todayExercises = useMemo(() => {
    return todayPlan.exercises.map(e => exercises.find(ex => ex.id === e.exerciseId)).filter(Boolean);
  }, [todayPlan]);
  
  const completionRate = useMemo(() => {
    const planCompleted = weeklyData.filter(d => d.completed).length;
    const checkInCompleted = Object.values(checkInState).filter(d => d.completed).length;
    const completed = Math.max(planCompleted, checkInCompleted);
    return Math.round((completed / weeklyData.length) * 100);
  }, [checkInState, weeklyData]);
  
  return (
    <div className="min-h-screen pb-28" style={{ background: '#F5F5F7' }}>
      {/* Header */}
      <header
        className="sticky top-0 z-40 px-5 pt-4 pb-3 glass-surface-light"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-caption" style={{ color: '#86868B' }}>
              早上好
            </p>
            <h1 className="text-headline mt-0.5" style={{ color: '#1D1D1F' }}>
              {userProfile.name}
            </h1>
          </div>
          <button
            className="w-10 h-10 rounded-full flex items-center justify-center relative"
            style={{ background: 'rgba(0,0,0,0.06)' }}
          >
            <Bell size={20} color="#1D1D1F" />
            <div
              className="absolute top-2 right-2 w-2 h-2 rounded-full"
              style={{ background: '#FF3B30' }}
            />
          </button>
        </div>
      </header>
      
      {/* Hero Training Card with 3D Effect */}
      <section className="px-5 mt-4">
        <div
          className="relative w-full rounded-3xl overflow-hidden"
          style={{ height: '360px', background: '#111111' }}
        >
          <FloatingCard3D imagePath="/images/hero-training.jpg" />
          
          {/* Gradient overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 40%, transparent 70%)',
            }}
          />
          
          {/* Content overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-5 pointer-events-none">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-caption mb-1" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  今日训练计划
                </p>
                <h2 className="text-display" style={{ color: '#FFFFFF', fontSize: '28px' }}>
                  髋关节翻修术后康复训练
                </h2>
                <p className="text-body mt-1" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  {todayExercises.length} 个动作 · 约 {Math.floor(todayExercises.reduce((acc, e) => acc + (e?.duration || 0), 0) / 60)} 分钟
                </p>
              </div>
              <button
                className="pointer-events-auto w-14 h-14 rounded-full flex items-center justify-center animate-pulse-glow"
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
                onClick={() => setShowCheckIn(true)}
              >
                <ChevronRight size={24} color="#FFFFFF" />
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Recovery Trend Chart */}
      <section className="px-5 mt-6">
        <div
          className="rounded-3xl p-5"
          style={{ background: '#FFFFFF' }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <TrendingUp size={18} color="#007AFF" />
              <h3 className="text-body font-semibold" style={{ color: '#1D1D1F' }}>
                恢复趋势
              </h3>
            </div>
            <span
              className="text-caption font-semibold px-2.5 py-1 rounded-full"
              style={{ background: 'rgba(0,122,255,0.08)', color: '#007AFF' }}
            >
              +{completionRate}%
            </span>
          </div>
          <div style={{ height: '140px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={recoveryTrend}>
                <defs>
                  <linearGradient id="recoveryGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#007AFF" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="#007AFF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#007AFF"
                  strokeWidth={2.5}
                  fill="url(#recoveryGrad)"
                  dot={{ fill: '#007AFF', r: 3, strokeWidth: 0 }}
                  activeDot={{ r: 5, fill: '#007AFF' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between mt-2">
            {recoveryTrend.filter((_, i) => i % 2 === 0).map((d) => (
              <span key={d.date} className="text-caption" style={{ color: '#86868B' }}>
                {d.date}
              </span>
            ))}
          </div>
        </div>
      </section>
      
      {/* Weekly Calendar */}
      <section className="px-5 mt-6">
        <h3 className="text-body font-semibold mb-3" style={{ color: '#1D1D1F' }}>
          本周打卡
        </h3>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {weeklyData.map((day) => {
            const isSelected = day.date === selectedDate;
            const savedState = checkInState[day.date];
            const isCompleted = savedState ? savedState.completed : day.completed;
            
            return (
              <button
                key={day.date}
                onClick={() => setSelectedDate(day.date)}
                className="flex flex-col items-center gap-1.5 min-w-[52px] py-3 rounded-2xl transition-all duration-300"
                style={{
                  background: isSelected ? '#111111' : isCompleted ? 'rgba(0,122,255,0.06)' : '#FFFFFF',
                  transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                }}
              >
                <span
                  className="text-caption"
                  style={{
                    color: isSelected ? 'rgba(255,255,255,0.6)' : '#86868B',
                  }}
                >
                  周{day.day}
                </span>
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{
                    background: isCompleted
                      ? isSelected ? '#007AFF' : 'rgba(0,122,255,0.1)'
                      : isSelected ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.04)',
                  }}
                >
                  {isCompleted ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={isSelected ? '#FFFFFF' : '#007AFF'} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    <span
                      className="text-caption font-semibold"
                      style={{ color: isSelected ? '#FFFFFF' : '#1D1D1F' }}
                    >
                      {day.date.split('/')[1]}
                    </span>
                  )}
                </div>
                {day.isToday && (
                  <div
                    className="w-1 h-1 rounded-full"
                    style={{ background: isSelected ? '#007AFF' : '#FF3B30' }}
                  />
                )}
              </button>
            );
          })}
        </div>
        
        {/* Selected Day Training List */}
        <div className="mt-4 space-y-2">
          {trainingPlan.exercises.map((ex) => {
            const exercise = exercises.find(e => e.id === ex.exerciseId);
            if (!exercise) return null;
            
            return (
              <div
                key={ex.exerciseId}
                className="flex items-center gap-3 p-4 rounded-2xl"
                style={{ background: '#FFFFFF' }}
                onClick={() => setShowCheckIn(true)}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: ex.completed ? 'rgba(0,122,255,0.1)' : 'rgba(0,0,0,0.04)' }}
                >
                  {ex.completed ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#007AFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  ) : (
                    <span className="text-caption font-semibold" style={{ color: '#86868B' }}>
                      {exercise.sets}×{exercise.reps}
                    </span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-body font-medium" style={{ color: '#1D1D1F' }}>
                    {exercise.name}
                  </p>
                  <p className="text-caption" style={{ color: '#86868B' }}>
                    {Math.floor(exercise.duration / 60)} 分钟 · {exercise.phase === 'early' ? '早期' : exercise.phase === 'middle' ? '中期' : '后期'}
                  </p>
                </div>
                <ChevronRight size={16} color="#86868B" />
              </div>
            );
          })}
        </div>
      </section>
      
      {/* Quick Stats */}
      <section className="px-5 mt-6 pb-6">
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: '连续打卡', value: `${userProfile.streakDays}天`, color: '#007AFF' },
            { label: '总训练', value: `${userProfile.totalDays}天`, color: '#34C759' },
            { label: '完成率', value: `${completionRate}%`, color: '#F4BD03' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="p-4 rounded-2xl text-center"
              style={{ background: '#FFFFFF' }}
            >
              <p
                className="text-display"
                style={{ fontSize: '24px', color: stat.color }}
              >
                {stat.value}
              </p>
              <p className="text-caption mt-1" style={{ color: '#86868B' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>
      
      {/* Check-in Modal */}
      <CheckInModal
        isOpen={showCheckIn}
        onClose={() => setShowCheckIn(false)}
        trainingDay={trainingPlan}
        onToggleExercise={(exerciseId) => onToggleExercise(selectedDate, exerciseId)}
        onComplete={() => onCompleteDay(selectedDate, trainingPlan)}
      />
    </div>
  );
}

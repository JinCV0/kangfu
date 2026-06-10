import { useState } from 'react';
import { X, Check } from 'lucide-react';
import { exercises } from '@/data/mockData';
import type { TrainingDay } from '@/types';

interface CheckInModalProps {
  isOpen: boolean;
  onClose: () => void;
  trainingDay: TrainingDay;
  onToggleExercise: (exerciseId: string) => void;
  onComplete: () => void;
}

export default function CheckInModal({
  isOpen,
  onClose,
  trainingDay,
  onToggleExercise,
  onComplete,
}: CheckInModalProps) {
  const [painScore, setPainScore] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  
  if (!isOpen) return null;
  
  const allCompleted = trainingDay.exercises.length > 0 && trainingDay.exercises.every(e => e.completed);
  
  const handleComplete = () => {
    if (!allCompleted) return;
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      onComplete();
      onClose();
    }, 1500);
  };
  
  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0"
        style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
      />
      
      {/* Modal Content */}
      <div
        className="relative w-full rounded-t-[24px] animate-fade-in"
        style={{
          background: '#F5F5F7',
          maxHeight: '85vh',
          overflowY: 'auto',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Success Overlay */}
        {showSuccess && (
          <div
            className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-t-[24px]"
            style={{ background: 'rgba(245,245,247,0.95)' }}
          >
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center animate-spring-in"
              style={{ background: '#007AFF' }}
            >
              <Check size={40} color="#FFFFFF" strokeWidth={3} />
            </div>
            <p className="text-headline mt-4" style={{ color: '#1D1D1F' }}>
              打卡成功！
            </p>
            <p className="text-body mt-1" style={{ color: '#86868B' }}>
              连续 {7} 天，继续保持
            </p>
          </div>
        )}
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 pb-3">
          <div>
            <h2 className="text-headline" style={{ color: '#1D1D1F' }}>
              今日训练
            </h2>
            <p className="text-caption mt-0.5" style={{ color: '#86868B' }}>
              {trainingDay.date} · {trainingDay.exercises.length} 个动作
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.06)' }}
          >
            <X size={18} color="#86868B" />
          </button>
        </div>
        
        {/* Exercise Checklist */}
        <div className="px-5 space-y-3">
          {trainingDay.exercises.map((ex) => {
            const exercise = exercises.find(e => e.id === ex.exerciseId);
            if (!exercise) return null;
            
            return (
              <div
                key={ex.exerciseId}
                className="flex items-center gap-4 p-4 rounded-2xl transition-all duration-300"
                style={{
                  background: ex.completed ? 'rgba(0,122,255,0.06)' : '#FFFFFF',
                  border: ex.completed ? '1px solid rgba(0,122,255,0.15)' : '1px solid transparent',
                }}
                onClick={() => onToggleExercise(ex.exerciseId)}
              >
                {/* Checkbox */}
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300"
                  style={{
                    background: ex.completed ? '#007AFF' : 'rgba(0,0,0,0.06)',
                    border: ex.completed ? 'none' : '2px solid #DEDEE3',
                  }}
                >
                  {ex.completed && (
                    <Check size={16} color="#FFFFFF" strokeWidth={3} />
                  )}
                </div>
                
                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p
                    className="text-body font-medium"
                    style={{
                      color: ex.completed ? '#007AFF' : '#1D1D1F',
                      textDecoration: ex.completed ? 'line-through' : 'none',
                      textDecorationColor: 'rgba(0,122,255,0.3)',
                    }}
                  >
                    {exercise.name}
                  </p>
                  <p className="text-caption mt-0.5" style={{ color: '#86868B' }}>
                    {exercise.sets} 组 × {exercise.reps} 次 · {Math.floor(exercise.duration / 60)} 分钟
                  </p>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Pain Score */}
        <div className="px-5 mt-6">
          <p className="text-body font-medium" style={{ color: '#1D1D1F' }}>
            今日疼痛评分 (VAS)
          </p>
          <p className="text-caption mt-0.5" style={{ color: '#86868B' }}>
            0 = 无痛，10 = 最痛
          </p>
          <div className="flex items-center gap-2 mt-3">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
              <button
                key={score}
                onClick={() => setPainScore(score)}
                className="flex-1 h-10 rounded-xl flex items-center justify-center text-caption font-semibold transition-all duration-200"
                style={{
                  background: painScore === score
                    ? score <= 3 ? '#34C759' : score <= 6 ? '#F4BD03' : '#FF3B30'
                    : '#FFFFFF',
                  color: painScore === score ? '#FFFFFF' : '#1D1D1F',
                  border: painScore === score ? 'none' : '1px solid #E5E5EA',
                  transform: painScore === score ? 'scale(1.08)' : 'scale(1)',
                }}
              >
                {score}
              </button>
            ))}
          </div>
        </div>
        
        {/* Complete Button */}
        <div className="p-5 pb-8">
          <button
            onClick={handleComplete}
            disabled={!allCompleted}
            className="w-full h-14 rounded-2xl text-body font-semibold transition-all duration-300"
            style={{
              background: allCompleted ? '#007AFF' : '#E5E5EA',
              color: allCompleted ? '#FFFFFF' : '#86868B',
              transform: allCompleted ? 'scale(1)' : 'scale(1)',
              boxShadow: allCompleted ? '0 4px 16px rgba(0,122,255,0.3)' : 'none',
            }}
          >
            {allCompleted ? '完成今日打卡' : `还有 ${trainingDay.exercises.filter(e => !e.completed).length} 个动作未完成`}
          </button>
        </div>
      </div>
    </div>
  );
}

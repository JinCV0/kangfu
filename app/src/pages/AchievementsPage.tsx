import { useState } from 'react';
import { Award, Star, Flame, BookOpen, Share2, Trophy, Activity, Calendar, Plus, X } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, ResponsiveContainer, XAxis } from 'recharts';
import ParallaxScene3D from '@/components/ParallaxScene3D';
import { userProfile, achievements, bodyFeelings, weeklyStats } from '@/data/mockData';
import type { BodyFeeling } from '@/types';

interface AchievementsPageProps {
  feelings: BodyFeeling[];
  onAddFeeling: (feeling: BodyFeeling) => void;
  showFeelingModal: boolean;
  setShowFeelingModal: (show: boolean) => void;
}

const iconMap: Record<string, typeof Star> = {
  star: Star,
  flame: Flame,
  calendar: Calendar,
  activity: Activity,
  'book-open': BookOpen,
  trophy: Trophy,
  award: Award,
  'share-2': Share2,
};

const pieData = [
  { name: '已完成', value: 75, color: '#007AFF' },
  { name: '剩余', value: 25, color: '#E5E5EA' },
];

export default function AchievementsPage({
  feelings,
  onAddFeeling,
  showFeelingModal,
  setShowFeelingModal,
}: AchievementsPageProps) {
  const [feelingText, setFeelingText] = useState('');
  const [feelingPain, setFeelingPain] = useState(0);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  
  const allFeelings = [...feelings, ...bodyFeelings];
  
  const handleSubmitFeeling = () => {
    if (!feelingText.trim()) return;
    const now = new Date();
    onAddFeeling({
      id: `f-${Date.now()}`,
      date: `${now.getMonth() + 1}/${now.getDate()}`,
      content: feelingText.trim(),
      painLevel: feelingPain,
    });
    setFeelingText('');
    setFeelingPain(0);
    setShowFeelingModal(false);
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 2000);
  };
  
  return (
    <div className="min-h-screen pb-28" style={{ background: '#F5F5F7' }}>
      {/* Header */}
      <header className="px-5 pt-4 pb-3">
        <h1 className="text-headline" style={{ color: '#1D1D1F' }}>
          我的成就
        </h1>
        <p className="text-caption mt-0.5" style={{ color: '#86868B' }}>
          康复之旅，每一步都值得记录
        </p>
      </header>
      
      {/* 3D Achievement Scene */}
      <section className="px-5 mt-2">
        <div className="rounded-3xl overflow-hidden" style={{ background: '#FFFFFF' }}>
          <ParallaxScene3D />
          <div className="px-5 pb-5 -mt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-caption" style={{ color: '#86868B' }}>
                  已解锁成就
                </p>
                <p className="text-display mt-0.5" style={{ fontSize: '32px', color: '#1D1D1F' }}>
                  {achievements.filter(a => a.unlocked).length}<span style={{ color: '#86868B', fontSize: '20px' }}>/{achievements.length}</span>
                </p>
              </div>
              <div
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                style={{ background: 'rgba(0,122,255,0.08)' }}
              >
                <Flame size={14} color="#007AFF" />
                <span className="text-caption font-semibold" style={{ color: '#007AFF' }}>
                  连续 {userProfile.streakDays} 天
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Overview */}
      <section className="px-5 mt-5">
        <div className="grid grid-cols-2 gap-3">
          {/* Completion Ring */}
          <div className="p-4 rounded-3xl" style={{ background: '#FFFFFF' }}>
            <p className="text-caption font-medium" style={{ color: '#86868B' }}>
              目标完成度
            </p>
            <div style={{ height: '120px' }} className="mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={35}
                    outerRadius={50}
                    startAngle={90}
                    endAngle={-270}
                    dataKey="value"
                    strokeWidth={0}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <p className="text-center text-headline" style={{ color: '#007AFF', marginTop: '-8px' }}>
              75%
            </p>
          </div>
          
          {/* Weekly Bar Chart */}
          <div className="p-4 rounded-3xl" style={{ background: '#FFFFFF' }}>
            <p className="text-caption font-medium" style={{ color: '#86868B' }}>
              周活跃时长
            </p>
            <div style={{ height: '140px' }} className="mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyStats}>
                  <XAxis
                    dataKey="day"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 10, fill: '#86868B' }}
                  />
                  <Bar
                    dataKey="minutes"
                    fill="#111111"
                    radius={[4, 4, 0, 0]}
                    maxBarSize={20}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </section>
      
      {/* Achievement Grid */}
      <section className="px-5 mt-5">
        <h3 className="text-body font-semibold mb-3" style={{ color: '#1D1D1F' }}>
          成就徽章
        </h3>
        <div className="grid grid-cols-4 gap-3">
          {achievements.map((achievement) => {
            const Icon = iconMap[achievement.icon] || Star;
            return (
              <div
                key={achievement.id}
                className="flex flex-col items-center gap-2 p-3 rounded-2xl transition-all duration-300"
                style={{
                  background: achievement.unlocked ? '#FFFFFF' : 'rgba(0,0,0,0.03)',
                  opacity: achievement.unlocked ? 1 : 0.5,
                }}
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center"
                  style={{
                    background: achievement.unlocked
                      ? achievement.id === 'a1' || achievement.id === 'a4'
                        ? 'rgba(0,122,255,0.1)'
                        : achievement.id === 'a2' || achievement.id === 'a6'
                        ? 'rgba(244,189,3,0.1)'
                        : 'rgba(52,199,89,0.1)'
                      : 'rgba(0,0,0,0.04)',
                  }}
                >
                  <Icon
                    size={22}
                    color={achievement.unlocked ? '#1D1D1F' : '#86868B'}
                    strokeWidth={achievement.unlocked ? 2 : 1.5}
                  />
                </div>
                <p
                  className="text-caption text-center font-medium"
                  style={{ color: achievement.unlocked ? '#1D1D1F' : '#86868B' }}
                >
                  {achievement.title}
                </p>
              </div>
            );
          })}
        </div>
      </section>
      
      {/* Body Feelings */}
      <section className="px-5 mt-5 pb-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-body font-semibold" style={{ color: '#1D1D1F' }}>
            身体感受日记
          </h3>
          <button
            onClick={() => setShowFeelingModal(true)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full"
            style={{ background: '#007AFF' }}
          >
            <Plus size={14} color="#FFFFFF" />
            <span className="text-caption font-medium" style={{ color: '#FFFFFF' }}>
              记录
            </span>
          </button>
        </div>
        
        <div className="space-y-3">
          {allFeelings.map((feeling) => (
            <div
              key={feeling.id}
              className="p-4 rounded-2xl animate-fade-in"
              style={{ background: '#FFFFFF' }}
            >
              <div className="flex items-center justify-between">
                <span className="text-caption" style={{ color: '#86868B' }}>
                  {feeling.date}
                </span>
                <span
                  className="text-caption font-semibold px-2 py-0.5 rounded-full"
                  style={{
                    background: feeling.painLevel <= 3
                      ? 'rgba(52,199,89,0.1)'
                      : feeling.painLevel <= 6
                      ? 'rgba(244,189,3,0.1)'
                      : 'rgba(255,59,48,0.1)',
                    color: feeling.painLevel <= 3
                      ? '#34C759'
                      : feeling.painLevel <= 6
                      ? '#F4BD03'
                      : '#FF3B30',
                  }}
                >
                  疼痛 {feeling.painLevel}
                </span>
              </div>
              <p className="text-body mt-2" style={{ color: '#1D1D1F' }}>
                {feeling.content}
              </p>
            </div>
          ))}
        </div>
      </section>
      
      {/* Feeling Modal */}
      {showFeelingModal && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center"
          onClick={() => setShowFeelingModal(false)}
        >
          <div
            className="absolute inset-0"
            style={{ background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)' }}
          />
          <div
            className="relative w-full rounded-t-[24px] animate-fade-in"
            style={{ background: '#F5F5F7', maxHeight: '70vh' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-headline" style={{ color: '#1D1D1F' }}>
                  记录今日感受
                </h3>
                <button
                  onClick={() => setShowFeelingModal(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(0,0,0,0.06)' }}
                >
                  <X size={18} color="#86868B" />
                </button>
              </div>
              
              {/* Pain Score */}
              <div className="mb-4">
                <p className="text-body font-medium" style={{ color: '#1D1D1F' }}>
                  今日疼痛评分
                </p>
                <div className="flex items-center gap-2 mt-2">
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
                    <button
                      key={score}
                      onClick={() => setFeelingPain(score)}
                      className="flex-1 h-10 rounded-xl flex items-center justify-center text-caption font-semibold transition-all duration-200"
                      style={{
                        background: feelingPain === score
                          ? score <= 3 ? '#34C759' : score <= 6 ? '#F4BD03' : '#FF3B30'
                          : '#FFFFFF',
                        color: feelingPain === score ? '#FFFFFF' : '#1D1D1F',
                        border: feelingPain === score ? 'none' : '1px solid #E5E5EA',
                        transform: feelingPain === score ? 'scale(1.08)' : 'scale(1)',
                      }}
                    >
                      {score}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Text Input */}
              <textarea
                value={feelingText}
                onChange={(e) => setFeelingText(e.target.value)}
                placeholder="今天身体感觉如何？有什么想记录的..."
                className="w-full h-32 p-4 rounded-2xl text-body resize-none outline-none"
                style={{
                  background: '#FFFFFF',
                  color: '#1D1D1F',
                }}
              />
              
              {/* Submit */}
              <button
                onClick={handleSubmitFeeling}
                disabled={!feelingText.trim()}
                className="w-full h-14 rounded-2xl text-body font-semibold mt-4 transition-all duration-300"
                style={{
                  background: feelingText.trim() ? '#007AFF' : '#E5E5EA',
                  color: feelingText.trim() ? '#FFFFFF' : '#86868B',
                  boxShadow: feelingText.trim() ? '0 4px 16px rgba(0,122,255,0.3)' : 'none',
                }}
              >
                提交记录
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Success Toast */}
      {showSuccessToast && (
        <div
          className="fixed top-8 left-1/2 -translate-x-1/2 z-[70] px-6 py-3 rounded-full animate-spring-in"
          style={{
            background: '#34C759',
            boxShadow: '0 4px 20px rgba(52,199,89,0.3)',
          }}
        >
          <span className="text-body font-medium" style={{ color: '#FFFFFF' }}>
            记录成功！
          </span>
        </div>
      )}
    </div>
  );
}

import { CalendarDays, Play, Trophy, User } from 'lucide-react';
import type { Tab } from '@/types';

interface BottomNavProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const tabs: { key: Tab; icon: typeof CalendarDays; label: string }[] = [
  { key: 'schedule', icon: CalendarDays, label: '日程' },
  { key: 'explore', icon: Play, label: '训练' },
  { key: 'achievements', icon: Trophy, label: '成就' },
  { key: 'profile', icon: User, label: '我的' },
];

export default function BottomNav({ activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav
      className="fixed bottom-6 left-10 right-10 z-50"
      style={{ pointerEvents: 'none' }}
    >
      <div
        className="flex items-center justify-around py-3 px-4 rounded-full"
        style={{
          background: '#111111',
          boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
          pointerEvents: 'auto',
        }}
      >
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          const Icon = tab.icon;
          
          return (
            <button
              key={tab.key}
              onClick={() => onTabChange(tab.key)}
              className="flex flex-col items-center gap-0.5 tap-highlight-transparent relative"
              style={{ WebkitTapHighlightColor: 'transparent' }}
            >
              <div
                className="transition-all duration-300"
                style={{
                  transform: isActive ? 'scale(1.15)' : 'scale(1)',
                }}
              >
                <Icon
                  size={22}
                  strokeWidth={isActive ? 2.5 : 1.5}
                  color={isActive ? '#FFFFFF' : '#86868B'}
                />
              </div>
              <span
                className="text-caption transition-colors duration-300"
                style={{
                  color: isActive ? '#FFFFFF' : '#86868B',
                  fontSize: '10px',
                  fontWeight: isActive ? 600 : 400,
                }}
              >
                {tab.label}
              </span>
              {isActive && (
                <div
                  className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                  style={{ background: '#007AFF' }}
                />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

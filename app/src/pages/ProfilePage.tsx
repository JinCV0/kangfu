import { Bell, User, Shield, MessageCircle, ChevronRight, Stethoscope, Users, Settings, HelpCircle, FileText } from 'lucide-react';
import { userProfile } from '@/data/mockData';

const recoveryPhases = [
  { key: 'early', label: '术后早期', weekRange: '0-6周', description: '消肿止痛、恢复关节活动度' },
  { key: 'middle', label: '术后中期', weekRange: '6-12周', description: '增强肌力、逐步负重' },
  { key: 'late', label: '术后晚期', weekRange: '12周+', description: '功能恢复、回归日常' },
];

const menuItems = [
  { icon: Stethoscope, label: '绑定医生', desc: '李医生 · 骨科', color: '#007AFF', action: 'doctor' },
  { icon: Users, label: '家属管理', desc: '已绑定1位家属', color: '#34C759', action: 'family' },
  { icon: Bell, label: '消息通知', desc: '训练提醒、医嘱通知', color: '#F4BD03', action: 'notifications' },
  { icon: FileText, label: '评估报告', desc: '查看历史评估记录', color: '#007AFF', action: 'assessment' },
  { icon: Shield, label: '隐私设置', desc: '数据安全与授权', color: '#5856D6', action: 'privacy' },
  { icon: HelpCircle, label: '帮助中心', desc: '常见问题与使用指南', color: '#86868B', action: 'help' },
  { icon: Settings, label: '设置', desc: '账号、通用、关于', color: '#86868B', action: 'settings' },
];

interface ProfilePageProps {
  onNavigate: (page: string) => void;
}

export default function ProfilePage({ onNavigate }: ProfilePageProps) {
  const currentPhaseIndex = recoveryPhases.findIndex(p => p.key === userProfile.recoveryPhase);
  
  return (
    <div className="min-h-screen pb-28" style={{ background: '#F5F5F7' }}>
      {/* Profile Card */}
      <section className="px-5 pt-4">
        <div
          className="rounded-3xl p-5 relative overflow-hidden"
          style={{ background: '#111111' }}
        >
          {/* Background decoration */}
          <div
            className="absolute top-0 right-0 w-40 h-40 rounded-full opacity-10"
            style={{
              background: 'radial-gradient(circle, #007AFF 0%, transparent 70%)',
              transform: 'translate(20%, -30%)',
            }}
          />
          
          <div className="flex items-center gap-4">
            {/* Avatar */}
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(0,122,255,0.2)' }}
            >
              <User size={28} color="#007AFF" />
            </div>
            
            <div className="flex-1">
              <h2 className="text-headline" style={{ color: '#FFFFFF' }}>
                {userProfile.name}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <span
                  className="text-caption px-2.5 py-0.5 rounded-full"
                  style={{ background: 'rgba(0,122,255,0.2)', color: '#007AFF' }}
                >
                  {userProfile.recoveryPhase === 'early' ? '术后早期' : userProfile.recoveryPhase === 'middle' ? '术后中期' : '术后晚期'}
                </span>
                <span className="text-caption" style={{ color: 'rgba(255,255,255,0.5)' }}>
                  {userProfile.surgeryType}
                </span>
              </div>
            </div>
          </div>
          
          {/* Key Info */}
          <div className="flex items-center gap-6 mt-5 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <div>
              <p className="text-caption" style={{ color: 'rgba(255,255,255,0.5)' }}>
                手术日期
              </p>
              <p className="text-body font-medium mt-0.5" style={{ color: '#FFFFFF' }}>
                {userProfile.surgeryDate}
              </p>
            </div>
            <div>
              <p className="text-caption" style={{ color: 'rgba(255,255,255,0.5)' }}>
                主诊医生
              </p>
              <p className="text-body font-medium mt-0.5" style={{ color: '#FFFFFF' }}>
                {userProfile.doctorName}
              </p>
            </div>
            <div>
              <p className="text-caption" style={{ color: 'rgba(255,255,255,0.5)' }}>
                已康复
              </p>
              <p className="text-body font-medium mt-0.5" style={{ color: '#FFFFFF' }}>
                {userProfile.totalDays} 天
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Recovery Phase Timeline */}
      <section className="px-5 mt-5">
        <div className="p-5 rounded-3xl" style={{ background: '#FFFFFF' }}>
          <h3 className="text-body font-semibold mb-4" style={{ color: '#1D1D1F' }}>
            康复阶段
          </h3>
          
          <div className="relative">
            {/* Timeline line */}
            <div
              className="absolute left-[15px] top-4 bottom-4 w-0.5"
              style={{ background: '#E5E5EA' }}
            />
            
            {recoveryPhases.map((phase, index) => {
              const isCurrent = index === currentPhaseIndex;
              const isPast = index < currentPhaseIndex;
              
              return (
                <div key={phase.key} className="flex items-start gap-4 mb-4 last:mb-0 relative">
                  {/* Dot */}
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10"
                    style={{
                      background: isCurrent ? '#007AFF' : isPast ? 'rgba(0,122,255,0.1)' : '#F5F5F7',
                      border: isCurrent ? '2px solid #007AFF' : isPast ? '2px solid rgba(0,122,255,0.3)' : '2px solid #E5E5EA',
                    }}
                  >
                    {isPast ? (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#007AFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    ) : (
                      <span
                        className="text-caption font-bold"
                        style={{ color: isCurrent ? '#FFFFFF' : '#86868B' }}
                      >
                        {index + 1}
                      </span>
                    )}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 pt-0.5">
                    <div className="flex items-center gap-2">
                      <p
                        className="text-body font-medium"
                        style={{ color: isCurrent ? '#007AFF' : isPast ? '#1D1D1F' : '#86868B' }}
                      >
                        {phase.label}
                      </p>
                      <span
                        className="text-caption"
                        style={{ color: '#86868B' }}
                      >
                        {phase.weekRange}
                      </span>
                    </div>
                    <p className="text-caption mt-0.5" style={{ color: '#86868B' }}>
                      {phase.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Medical Disclaimer */}
      <section className="px-5 mt-5">
        <div
          className="p-4 rounded-2xl flex items-start gap-3"
          style={{ background: 'rgba(244,189,3,0.08)', border: '1px solid rgba(244,189,3,0.15)' }}
        >
          <MessageCircle size={18} color="#F4BD03" className="flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-caption font-semibold" style={{ color: '#F4BD03' }}>
              重要提示
            </p>
            <p className="text-caption mt-1" style={{ color: 'rgba(244,189,3,0.8)' }}>
              本应用所有训练内容仅供参考，请严格遵医嘱进行康复训练。如出现异常疼痛或不适，请立即停止并咨询您的主诊医生。
            </p>
          </div>
        </div>
      </section>
      
      {/* Menu List */}
      <section className="px-5 mt-5 pb-6">
        <div className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <button
                key={index}
                className="w-full flex items-center gap-4 p-4 rounded-2xl text-left transition-all duration-200 active:scale-[0.98]"
                style={{ background: '#FFFFFF' }}
                onClick={() => item.action === 'assessment' && onNavigate('assessment')}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${item.color}15` }}
                >
                  <Icon size={20} color={item.color} strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-body font-medium" style={{ color: '#1D1D1F' }}>
                    {item.label}
                  </p>
                  <p className="text-caption mt-0.5" style={{ color: '#86868B' }}>
                    {item.desc}
                  </p>
                </div>
                <ChevronRight size={16} color="#86868B" />
              </button>
            );
          })}
        </div>
      </section>
    </div>
  );
}

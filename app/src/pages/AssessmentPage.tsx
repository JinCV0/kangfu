import { useState } from 'react';
import { ChevronLeft, Calendar, Award, Activity, Footprints, Heart, Stethoscope, ChevronRight, CheckCircle2 } from 'lucide-react';
import { assessmentReports, userProfile } from '@/data/mockData';
import type { AssessmentReport } from '@/types';

interface AssessmentPageProps {
  onBack: () => void;
}

const typeLabels = {
  weekly: '周评估',
  monthly: '月评估',
  final: '终末评估',
};

const scoreColor = (score: number) => {
  if (score >= 80) return '#34C759';
  if (score >= 60) return '#007AFF';
  if (score >= 40) return '#F4BD03';
  return '#FF3B30';
};

const getScoreLabel = (score: number) => {
  if (score >= 90) return '优秀';
  if (score >= 80) return '良好';
  if (score >= 60) return '中等';
  if (score >= 40) return '一般';
  return '较差';
};

export default function AssessmentPage({ onBack }: AssessmentPageProps) {
  const [selectedReport, setSelectedReport] = useState<AssessmentReport | null>(null);

  if (selectedReport) {
    return (
      <div className="min-h-screen" style={{ background: '#F5F5F7' }}>
        {/* Header */}
        <header className="sticky top-0 z-40 px-5 pt-4 pb-3 glass-surface-light">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ background: 'rgba(0,0,0,0.06)' }}
            >
              <ChevronLeft size={20} color="#1D1D1F" />
            </button>
            <h1 className="text-headline" style={{ color: '#1D1D1F' }}>
              评估报告详情
            </h1>
          </div>
        </header>

        <main className="px-5 pt-4 pb-28">
          {/* Report Card */}
          <div
            className="rounded-3xl p-5 mb-4"
            style={{ background: '#FFFFFF' }}
          >
            {/* Report Header */}
            <div className="flex items-center justify-between mb-5">
              <div>
                <span
                  className="text-caption font-semibold px-3 py-1 rounded-full"
                  style={{
                    background: selectedReport.type === 'final' 
                      ? 'rgba(52,199,89,0.1)' 
                      : selectedReport.type === 'monthly' 
                        ? 'rgba(0,122,255,0.1)' 
                        : 'rgba(244,189,3,0.1)',
                    color: selectedReport.type === 'final' 
                      ? '#34C759' 
                      : selectedReport.type === 'monthly' 
                        ? '#007AFF' 
                        : '#F4BD03',
                  }}
                >
                  {typeLabels[selectedReport.type]}
                </span>
                <h2 className="text-headline mt-3" style={{ color: '#1D1D1F' }}>
                  {selectedReport.date}
                </h2>
              </div>
              <div className="text-right">
                <p className="text-caption" style={{ color: '#86868B' }}>综合评分</p>
                <p
                  className="text-display"
                  style={{ fontSize: '32px', color: scoreColor(selectedReport.overallScore) }}
                >
                  {selectedReport.overallScore}
                </p>
                <p
                  className="text-caption font-semibold"
                  style={{ color: scoreColor(selectedReport.overallScore) }}
                >
                  {getScoreLabel(selectedReport.overallScore)}
                </p>
              </div>
            </div>

            {/* Range of Motion */}
            <section className="mb-6">
              <h3 className="text-body font-semibold mb-3" style={{ color: '#1D1D1F' }}>
                关节活动度 (°)
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: '髋关节屈曲', value: selectedReport.rangeOfMotion.hipFlexion, max: 120 },
                  { label: '髋关节伸展', value: selectedReport.rangeOfMotion.hipExtension, max: 60 },
                  { label: '髋关节外展', value: selectedReport.rangeOfMotion.hipAbduction, max: 60 },
                  { label: '髋关节内收', value: selectedReport.rangeOfMotion.hipAdduction, max: 50 },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="p-3 rounded-2xl"
                    style={{ background: '#F5F5F7' }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-caption" style={{ color: '#86868B' }}>
                        {item.label}
                      </span>
                      <span className="text-body font-semibold" style={{ color: '#1D1D1F' }}>
                        {item.value}°
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full" style={{ background: '#E5E5EA' }}>
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${(item.value / item.max) * 100}%`,
                          background: '#007AFF',
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Muscle Strength */}
            <section className="mb-6">
              <h3 className="text-body font-semibold mb-3" style={{ color: '#1D1D1F' }}>
                肌肉力量 (5级)
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: '股四头肌', value: selectedReport.muscleStrength.quadriceps },
                  { label: '臀肌', value: selectedReport.muscleStrength.glutes },
                  { label: '腘绳肌', value: selectedReport.muscleStrength.hamstrings },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="p-3 rounded-2xl text-center"
                    style={{ background: '#F5F5F7' }}
                  >
                    <p className="text-caption mb-2" style={{ color: '#86868B' }}>
                      {item.label}
                    </p>
                    <div className="flex justify-center gap-0.5">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className="w-3 h-3 rounded-full"
                          style={{
                            background: level <= item.value ? '#34C759' : '#E5E5EA',
                          }}
                        />
                      ))}
                    </div>
                    <p className="text-caption mt-1" style={{ color: '#34C759' }}>
                      {item.value}级
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Other Scores */}
            <section className="mb-6">
              <h3 className="text-body font-semibold mb-3" style={{ color: '#1D1D1F' }}>
                功能评估
              </h3>
              <div className="space-y-3">
                {[
                  { icon: Activity, label: '平衡能力', value: selectedReport.balanceScore },
                  { icon: Footprints, label: '行走能力', value: selectedReport.walkingAbility },
                  { icon: Heart, label: '疼痛评分', value: selectedReport.painLevel * 20 },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className="flex items-center gap-3 p-3 rounded-2xl"
                      style={{ background: '#F5F5F7' }}
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center"
                        style={{ background: 'rgba(0,122,255,0.1)' }}
                      >
                        <Icon size={16} color="#007AFF" />
                      </div>
                      <div className="flex-1">
                        <p className="text-caption" style={{ color: '#86868B' }}>
                          {item.label}
                        </p>
                        <div className="h-1 rounded-full mt-1" style={{ background: '#E5E5EA' }}>
                          <div
                            className="h-full rounded-full"
                            style={{
                              width: `${item.value}%`,
                              background: scoreColor(item.value),
                            }}
                          />
                        </div>
                      </div>
                      <span className="text-body font-semibold" style={{ color: '#1D1D1F' }}>
                        {item.value}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Doctor Remarks */}
            <section className="mb-6">
              <h3 className="text-body font-semibold mb-3" style={{ color: '#1D1D1F' }}>
                医生评语
              </h3>
              <div
                className="p-4 rounded-2xl"
                style={{ background: 'rgba(0,122,255,0.05)', border: '1px solid rgba(0,122,255,0.1)' }}
              >
                <p className="text-body" style={{ color: '#1D1D1F' }}>
                  {selectedReport.remarks}
                </p>
                <div className="flex items-center gap-2 mt-4 pt-4" style={{ borderTop: '1px solid rgba(0,122,255,0.1)' }}>
                  <Stethoscope size={16} color="#007AFF" />
                  <span className="text-caption font-semibold" style={{ color: '#007AFF' }}>
                    {selectedReport.doctorSignature}
                  </span>
                </div>
              </div>
            </section>

            {/* Patient Info */}
            <section>
              <h3 className="text-body font-semibold mb-3" style={{ color: '#1D1D1F' }}>
                患者信息
              </h3>
              <div
                className="p-4 rounded-2xl"
                style={{ background: '#111111' }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-caption" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      患者姓名
                    </p>
                    <p className="text-body font-semibold mt-1" style={{ color: '#FFFFFF' }}>
                      {userProfile.name}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-caption" style={{ color: 'rgba(255,255,255,0.5)' }}>
                      诊断
                    </p>
                    <p className="text-body font-semibold mt-1" style={{ color: '#FFFFFF' }}>
                      {userProfile.surgeryType}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: '#F5F5F7' }}>
      {/* Header */}
      <header className="sticky top-0 z-40 px-5 pt-4 pb-3 glass-surface-light">
        <div className="flex items-center gap-4">
          <button
            onClick={onBack}
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.06)' }}
          >
            <ChevronLeft size={20} color="#1D1D1F" />
          </button>
          <h1 className="text-headline" style={{ color: '#1D1D1F' }}>
            评估报告
          </h1>
        </div>
      </header>

      <main className="px-5 pt-4 pb-28">
        {/* Stats Summary */}
        <div
          className="rounded-3xl p-5 mb-4"
          style={{ background: '#111111' }}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-caption" style={{ color: 'rgba(255,255,255,0.6)' }}>
                最近评估
              </p>
              <p className="text-headline mt-1" style={{ color: '#FFFFFF' }}>
                {assessmentReports[assessmentReports.length - 1].date}
              </p>
            </div>
            <div className="text-right">
              <p className="text-caption" style={{ color: 'rgba(255,255,255,0.6)' }}>
                综合评分
              </p>
              <p
                className="text-display"
                style={{
                  fontSize: '40px',
                  color: scoreColor(assessmentReports[assessmentReports.length - 1].overallScore),
                }}
              >
                {assessmentReports[assessmentReports.length - 1].overallScore}
              </p>
            </div>
          </div>
          
          {/* Progress */}
          <div className="mt-5 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-caption" style={{ color: 'rgba(255,255,255,0.6)' }}>
                康复进度
              </span>
              <span className="text-caption font-semibold" style={{ color: '#34C759' }}>
                已完成
              </span>
            </div>
            <div className="h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: '100%',
                  background: 'linear-gradient(90deg, #007AFF 0%, #34C759 100%)',
                }}
              />
            </div>
          </div>
        </div>

        {/* Achievements */}
        <div
          className="rounded-3xl p-5 mb-4"
          style={{ background: '#FFFFFF' }}
        >
          <h3 className="text-body font-semibold mb-4" style={{ color: '#1D1D1F' }}>
            康复成就
          </h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: CheckCircle2, label: '连续打卡', value: '55天', color: '#34C759' },
              { icon: Award, label: '评估次数', value: '5次', color: '#007AFF' },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className="flex items-center gap-3 p-3 rounded-2xl"
                  style={{ background: '#F5F5F7' }}
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: `${item.color}15` }}
                  >
                    <Icon size={20} color={item.color} />
                  </div>
                  <div>
                    <p className="text-caption" style={{ color: '#86868B' }}>
                      {item.label}
                    </p>
                    <p className="text-headline font-semibold" style={{ color: item.color }}>
                      {item.value}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Report List */}
        <div className="space-y-3">
          <h3 className="text-body font-semibold mb-3" style={{ color: '#1D1D1F' }}>
            评估记录
          </h3>
          {assessmentReports.map((report) => (
            <button
              key={report.id}
              onClick={() => setSelectedReport(report)}
              className="w-full p-4 rounded-2xl text-left transition-all duration-200 active:scale-[0.98]"
              style={{ background: '#FFFFFF' }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{
                      background: report.type === 'final'
                        ? 'rgba(52,199,89,0.1)'
                        : report.type === 'monthly'
                          ? 'rgba(0,122,255,0.1)'
                          : 'rgba(244,189,3,0.1)',
                    }}
                  >
                    <Calendar
                      size={18}
                      color={
                        report.type === 'final'
                          ? '#34C759'
                          : report.type === 'monthly'
                            ? '#007AFF'
                            : '#F4BD03'
                      }
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span
                        className="text-caption font-semibold"
                        style={{
                          color: report.type === 'final'
                            ? '#34C759'
                            : report.type === 'monthly'
                              ? '#007AFF'
                              : '#F4BD03',
                        }}
                      >
                        {typeLabels[report.type]}
                      </span>
                      <span className="text-body" style={{ color: '#1D1D1F' }}>
                        {report.date}
                      </span>
                    </div>
                    <p className="text-caption mt-0.5" style={{ color: '#86868B' }}>
                      综合评分：{report.overallScore}分 · {getScoreLabel(report.overallScore)}
                    </p>
                  </div>
                </div>
                <ChevronRight size={18} color="#86868B" />
              </div>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}

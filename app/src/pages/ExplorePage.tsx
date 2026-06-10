import { useState, useRef } from 'react';
import { Search, Play, Pause, RotateCcw, FastForward, BookOpen, AlertTriangle, ChevronLeft, Clock, X } from 'lucide-react';
import { exercises, knowledgeCards } from '@/data/mockData';

const categories = [
  { key: 'all', label: '全部' },
  { key: 'hip', label: '髋关节' },
  { key: 'knee', label: '膝关节' },
  { key: 'neck', label: '颈椎' },
  { key: 'shoulder', label: '肩关节' },
  { key: 'back', label: '腰背' },
  { key: 'ankle', label: '脚踝' },
];

const phases = [
  { key: 'all', label: '全部阶段' },
  { key: 'early', label: '术后早期' },
  { key: 'middle', label: '术后中期' },
  { key: 'late', label: '术后晚期' },
];

export default function ExplorePage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [activePhase, setActivePhase] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [showActionPanel, setShowActionPanel] = useState(false);
  const [activeActionIndex, setActiveActionIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const controlsTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  const filteredExercises = exercises.filter(ex => {
    const matchCategory = activeCategory === 'all' || ex.category === activeCategory;
    const matchPhase = activePhase === 'all' || ex.phase === activePhase;
    const matchSearch = !searchQuery || ex.name.includes(searchQuery) || ex.description.includes(searchQuery);
    return matchCategory && matchPhase && matchSearch;
  });
  
  const selectedExercise = exercises.find(e => e.id === selectedVideo);
  
  const handleVideoTap = () => {
    setShowControls(true);
    if (controlsTimer.current !== null) clearTimeout(controlsTimer.current);
    controlsTimer.current = setTimeout(() => setShowControls(false), 3000);
  };
  
  const handleActionPoint = (index: number) => {
    setActiveActionIndex(index);
    setShowActionPanel(true);
  };
  
  if (selectedVideo && selectedExercise) {
    return (
      <div className="fixed inset-0 z-50" style={{ background: '#000000' }}>
        {/* Video Area */}
        <div
          className="relative w-full h-full flex items-center justify-center"
          onClick={handleVideoTap}
        >
          <img
            src={selectedExercise.coverImage}
            alt={selectedExercise.name}
            className="w-full h-full object-cover"
            style={{ opacity: 0.8 }}
          />
          
          {/* Gradient Overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 40%, transparent 60%)',
            }}
          />
          
          {/* Back Button */}
          <button
            className="absolute top-4 left-4 z-10 w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
            onClick={(e) => { e.stopPropagation(); setSelectedVideo(null); setIsPlaying(false); }}
          >
            <ChevronLeft size={22} color="#FFFFFF" />
          </button>
          
          {/* Playback Speed */}
          {showControls && (
            <button
              className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-full text-caption font-semibold"
              style={{
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                color: '#FFFFFF',
              }}
              onClick={(e) => {
                e.stopPropagation();
                setPlaybackSpeed(s => s >= 2 ? 0.5 : s + 0.5);
              }}
            >
              {playbackSpeed}x
            </button>
          )}
          
          {/* Play/Pause Button */}
          {showControls && (
            <button
              className="absolute z-10 w-20 h-20 rounded-full flex items-center justify-center"
              style={{
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.2)',
              }}
              onClick={(e) => { e.stopPropagation(); setIsPlaying(!isPlaying); }}
            >
              {isPlaying ? (
                <Pause size={32} color="#FFFFFF" fill="#FFFFFF" />
              ) : (
                <Play size={32} color="#FFFFFF" fill="#FFFFFF" style={{ marginLeft: '4px' }} />
              )}
            </button>
          )}
          
          {/* Bottom Info */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h2 className="text-headline" style={{ color: '#FFFFFF' }}>
              {selectedExercise.name}
            </h2>
            <p className="text-body mt-1" style={{ color: 'rgba(255,255,255,0.7)' }}>
              {selectedExercise.description}
            </p>
            
            {/* Action Points Timeline */}
            <div className="flex items-center gap-2 mt-4">
              {selectedExercise.keyPoints.map((_, i) => (
                <button
                  key={i}
                  className="flex-1 h-1 rounded-full transition-all duration-300"
                  style={{
                    background: i === activeActionIndex ? '#007AFF' : 'rgba(255,255,255,0.3)',
                  }}
                  onClick={(e) => { e.stopPropagation(); handleActionPoint(i); }}
                />
              ))}
            </div>
            
            {/* Quick Stats */}
            <div className="flex items-center gap-4 mt-4">
              <div className="flex items-center gap-1.5">
                <Clock size={14} color="rgba(255,255,255,0.6)" />
                <span className="text-caption" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  {Math.floor(selectedExercise.duration / 60)} 分钟
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <RotateCcw size={14} color="rgba(255,255,255,0.6)" />
                <span className="text-caption" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  {selectedExercise.sets} 组 × {selectedExercise.reps} 次
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <FastForward size={14} color="rgba(255,255,255,0.6)" />
                <span className="text-caption" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  {playbackSpeed}x 倍速
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Action Analysis Panel */}
        {showActionPanel && (
          <div
            className="absolute right-0 top-0 bottom-0 w-[80%] z-20 animate-fade-in"
            style={{
              background: 'rgba(30,30,30,0.85)',
              backdropFilter: 'blur(40px)',
              WebkitBackdropFilter: 'blur(40px)',
              borderLeft: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <div className="p-5">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-body font-semibold" style={{ color: '#FFFFFF' }}>
                  动作分解
                </h3>
                <button
                  onClick={() => setShowActionPanel(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(255,255,255,0.1)' }}
                >
                  <X size={16} color="#FFFFFF" />
                </button>
              </div>
              
              <div className="mb-6">
                <span
                  className="text-caption font-semibold px-2.5 py-1 rounded-full"
                  style={{ background: 'rgba(0,122,255,0.2)', color: '#007AFF' }}
                >
                  要点 {activeActionIndex + 1}/{selectedExercise.keyPoints.length}
                </span>
                <p className="text-headline mt-3" style={{ color: '#FFFFFF' }}>
                  {selectedExercise.keyPoints[activeActionIndex]}
                </p>
              </div>
              
              {/* Common Mistakes */}
              <div
                className="p-4 rounded-2xl"
                style={{ background: 'rgba(244,189,3,0.1)', border: '1px solid rgba(244,189,3,0.2)' }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle size={16} color="#F4BD03" />
                  <span className="text-caption font-semibold" style={{ color: '#F4BD03' }}>
                    常见错误
                  </span>
                </div>
                <p className="text-body" style={{ color: 'rgba(255,255,255,0.8)' }}>
                  {selectedExercise.commonMistakes[activeActionIndex] || selectedExercise.commonMistakes[0]}
                </p>
              </div>
              
              {/* Navigation */}
              <div className="flex items-center gap-3 mt-6">
                {selectedExercise.keyPoints.map((_, i) => (
                  <button
                    key={i}
                    className="w-3 h-3 rounded-full transition-all duration-300"
                    style={{
                      background: i === activeActionIndex ? '#007AFF' : 'rgba(255,255,255,0.2)',
                      transform: i === activeActionIndex ? 'scale(1.2)' : 'scale(1)',
                    }}
                    onClick={() => setActiveActionIndex(i)}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  
  return (
    <div className="min-h-screen pb-28" style={{ background: '#F5F5F7' }}>
      {/* Header */}
      <header className="px-5 pt-4 pb-3">
        <h1 className="text-headline" style={{ color: '#1D1D1F' }}>
          探索训练
        </h1>
        
        {/* Search */}
        <div
          className="flex items-center gap-2 mt-3 px-4 h-11 rounded-xl"
          style={{ background: '#FFFFFF' }}
        >
          <Search size={18} color="#86868B" />
          <input
            type="text"
            placeholder="搜索训练动作..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-body outline-none"
            style={{ color: '#1D1D1F' }}
          />
        </div>
      </header>
      
      {/* Category Filter */}
      <div className="flex items-center gap-2 px-5 mt-3 overflow-x-auto no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className="px-4 py-2 rounded-full text-caption font-medium flex-shrink-0 transition-all duration-300"
            style={{
              background: activeCategory === cat.key ? '#111111' : '#FFFFFF',
              color: activeCategory === cat.key ? '#FFFFFF' : '#86868B',
            }}
          >
            {cat.label}
          </button>
        ))}
      </div>
      
      {/* Phase Filter */}
      <div className="flex items-center gap-2 px-5 mt-2 overflow-x-auto no-scrollbar">
        {phases.map((phase) => (
          <button
            key={phase.key}
            onClick={() => setActivePhase(phase.key)}
            className="px-3 py-1.5 rounded-full text-caption flex-shrink-0 transition-all duration-300"
            style={{
              background: activePhase === phase.key ? 'rgba(0,122,255,0.1)' : 'transparent',
              color: activePhase === phase.key ? '#007AFF' : '#86868B',
              border: activePhase === phase.key ? '1px solid rgba(0,122,255,0.2)' : '1px solid transparent',
            }}
          >
            {phase.label}
          </button>
        ))}
      </div>
      
      {/* Video Grid */}
      <div className="px-5 mt-4 grid grid-cols-2 gap-3">
        {filteredExercises.map((exercise) => (
          <button
            key={exercise.id}
            className="text-left rounded-2xl overflow-hidden transition-all duration-300 active:scale-95"
            style={{ background: '#FFFFFF' }}
            onClick={() => setSelectedVideo(exercise.id)}
          >
            <div className="relative aspect-square">
              <img
                src={exercise.coverImage}
                alt={exercise.name}
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ background: 'rgba(0,0,0,0.2)' }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    background: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                  }}
                >
                  <Play size={18} color="#FFFFFF" fill="#FFFFFF" style={{ marginLeft: '2px' }} />
                </div>
              </div>
              <div
                className="absolute bottom-2 right-2 px-2 py-0.5 rounded-full text-caption"
                style={{
                  background: 'rgba(0,0,0,0.5)',
                  color: '#FFFFFF',
                }}
              >
                {Math.floor(exercise.duration / 60)} 分钟
              </div>
            </div>
            <div className="p-3">
              <p className="text-body font-medium truncate" style={{ color: '#1D1D1F' }}>
                {exercise.name}
              </p>
              <p className="text-caption mt-0.5" style={{ color: '#86868B' }}>
                {exercise.sets} 组 × {exercise.reps} 次
              </p>
            </div>
          </button>
        ))}
      </div>
      
      {/* Knowledge Cards */}
      <section className="px-5 mt-6 pb-6">
        <div className="flex items-center gap-2 mb-3">
          <BookOpen size={18} color="#007AFF" />
          <h3 className="text-body font-semibold" style={{ color: '#1D1D1F' }}>
            康复小知识
          </h3>
        </div>
        <div className="space-y-3">
          {knowledgeCards.map((card) => (
            <div
              key={card.id}
              className="p-4 rounded-2xl"
              style={{ background: '#111111' }}
            >
              <span
                className="text-caption font-semibold px-2 py-0.5 rounded"
                style={{ background: 'rgba(244,189,3,0.15)', color: '#F4BD03' }}
              >
                {card.category}
              </span>
              <h4 className="text-body font-semibold mt-2" style={{ color: '#FFFFFF' }}>
                {card.title}
              </h4>
              <p className="text-body mt-1" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>
                {card.content}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

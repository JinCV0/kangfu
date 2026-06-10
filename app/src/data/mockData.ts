import type { Exercise, TrainingDay, RecoveryTrend, UserProfile, Achievement, BodyFeeling, WeeklyStats, WeeklyData, AssessmentReport } from '@/types';

export const userProfile: UserProfile = {
  name: '张承玉',
  avatar: '',
  surgeryType: '髋关节翻修术后脱位',
  surgeryDate: '2026-04-15',
  recoveryPhase: 'late',
  doctorName: '李医生',
  totalDays: 55,
  streakDays: 55,
};

export const exercises: Exercise[] = [
  {
    id: 'ex1',
    name: '踝泵训练',
    videoUrl: '',
    coverImage: '/images/hero-training.jpg',
    duration: 300,
    category: 'hip',
    phase: 'early',
    sets: 3,
    reps: 10,
    description: '通过踝关节的屈伸运动，促进下肢血液循环，预防深静脉血栓形成。',
    keyPoints: ['尽量屈伸踝关节', '动作缓慢有控制', '保持5分钟/次'],
    commonMistakes: ['动作过快', '幅度不够', '膝盖跟着晃动'],
  },
  {
    id: 'ex2',
    name: '躯干旋转训练',
    videoUrl: '',
    coverImage: '/images/hero-training.jpg',
    duration: 300,
    category: 'hip',
    phase: 'early',
    sets: 3,
    reps: 10,
    description: '由家属帮助固定骨盆，协助患者脊柱整体缓慢进行旋转。',
    keyPoints: ['家属固定骨盆', '脊柱整体旋转', '动作缓慢平稳'],
    commonMistakes: ['用力过猛', '骨盆跟着转动', '旋转幅度过大'],
  },
  {
    id: 'ex3',
    name: '身体仰伸训练',
    videoUrl: '',
    coverImage: '/images/hero-training.jpg',
    duration: 300,
    category: 'hip',
    phase: 'early',
    sets: 3,
    reps: 10,
    description: '由家属协助患者抬头挺胸，循序渐进地进行训练。',
    keyPoints: ['抬头挺胸', '循序渐进', '保持正确姿势'],
    commonMistakes: ['用力不当', '速度过快', '姿势不标准'],
  },
  {
    id: 'ex4',
    name: '颈部训练',
    videoUrl: '',
    coverImage: '/images/explore-cover.jpg',
    duration: 300,
    category: 'neck',
    phase: 'early',
    sets: 3,
    reps: 10,
    description: '下颌放松，整体平移，保持颈部灵活性。',
    keyPoints: ['下颌放松', '整体平移', '动作缓慢'],
    commonMistakes: ['耸肩', '头部歪斜', '动作过快'],
  },
  {
    id: 'ex5',
    name: '头部训练',
    videoUrl: '',
    coverImage: '/images/explore-cover.jpg',
    duration: 300,
    category: 'neck',
    phase: 'early',
    sets: 3,
    reps: 10,
    description: '左右缓慢扭转头部，训练时目光平视前方。',
    keyPoints: ['目光平视前方', '缓慢扭转', '保持平衡'],
    commonMistakes: ['扭转过快', '头部前倾', '用力过猛'],
  },
  {
    id: 'ex6',
    name: '勾脚尖训练',
    videoUrl: '',
    coverImage: '/images/hero-training.jpg',
    duration: 300,
    category: 'hip',
    phase: 'middle',
    sets: 3,
    reps: 10,
    description: '身体正直站立，双手扶住栏杆或椅背，双脚打开与肩同宽，两脚跟着地，抬起脚尖。',
    keyPoints: ['身体正直', '脚跟着地', '抬起脚尖'],
    commonMistakes: ['身体晃动', '脚跟抬起', '动作过快'],
  },
  {
    id: 'ex7',
    name: '提踵训练',
    videoUrl: '',
    coverImage: '/images/hero-training.jpg',
    duration: 300,
    category: 'hip',
    phase: 'middle',
    sets: 3,
    reps: 10,
    description: '动作姿势与勾脚尖一致，两脚尖着地，抬脚跟，使身体自然前倾。',
    keyPoints: ['脚尖着地', '抬起脚跟', '身体前倾'],
    commonMistakes: ['身体不稳', '脚尖抬起', '幅度不够'],
  },
  {
    id: 'ex8',
    name: '髋外展训练',
    videoUrl: '',
    coverImage: '/images/hero-training.jpg',
    duration: 300,
    category: 'hip',
    phase: 'middle',
    sets: 3,
    reps: 10,
    description: '侧面站立，左手扶住栏杆或椅背，右手叉腰，髋关节和腿向侧方展开。',
    keyPoints: ['侧面站立', '髋关节展开', '身体保持稳定'],
    commonMistakes: ['身体转动', '幅度不足', '用力不当'],
  },
  {
    id: 'ex9',
    name: '伸膝训练',
    videoUrl: '',
    coverImage: '/images/hero-training.jpg',
    duration: 300,
    category: 'hip',
    phase: 'middle',
    sets: 3,
    reps: 10,
    description: '采取坐立位，双手自然放松下垂，后背紧靠椅背，将患肢向上抬高至与大腿平行。',
    keyPoints: ['坐立稳定', '患肢抬高', '保持平行'],
    commonMistakes: ['后背离开椅背', '抬得过高', '放下过快'],
  },
  {
    id: 'ex10',
    name: '屈膝训练',
    videoUrl: '',
    coverImage: '/images/hero-training.jpg',
    duration: 300,
    category: 'hip',
    phase: 'middle',
    sets: 3,
    reps: 10,
    description: '取站立位，双手扶住栏杆或椅背，脚跟向上、脚尖向下，向下做屈膝动作。',
    keyPoints: ['站立稳定', '屈膝向下', '动作缓慢'],
    commonMistakes: ['身体前倾', '屈膝不够', '速度过快'],
  },
  {
    id: 'ex11',
    name: '倒着走',
    videoUrl: '',
    coverImage: '/images/hero-training.jpg',
    duration: 300,
    category: 'hip',
    phase: 'late',
    sets: 3,
    reps: 5,
    description: '借助相关辅助工具，向后缓慢行走，训练平衡能力。',
    keyPoints: ['借助辅助工具', '缓慢行走', '保持平衡'],
    commonMistakes: ['速度过快', '不看后方', '身体不稳'],
  },
  {
    id: 'ex12',
    name: '8字走',
    videoUrl: '',
    coverImage: '/images/hero-training.jpg',
    duration: 300,
    category: 'hip',
    phase: 'late',
    sets: 3,
    reps: 2,
    description: '借助相关辅助工具，在平地按8字行走，提高平衡和协调能力。',
    keyPoints: ['保持8字轨迹', '速度均匀', '身体稳定'],
    commonMistakes: ['轨迹不标准', '速度过快', '身体晃动'],
  },
  {
    id: 'ex13',
    name: '侧向走',
    videoUrl: '',
    coverImage: '/images/hero-training.jpg',
    duration: 300,
    category: 'hip',
    phase: 'late',
    sets: 3,
    reps: 10,
    description: '借助相关辅助工具，先向右走、再向左走，训练侧向移动能力。',
    keyPoints: ['先右后左', '步幅均匀', '保持平衡'],
    commonMistakes: ['身体转动', '步幅过大', '速度过快'],
  },
  {
    id: 'ex14',
    name: '单腿站立',
    videoUrl: '',
    coverImage: '/images/hero-training.jpg',
    duration: 300,
    category: 'hip',
    phase: 'late',
    sets: 3,
    reps: 1,
    description: '借助相关辅助工具，患侧肢体弯曲，进行站立训练。',
    keyPoints: ['患侧弯曲', '保持站立', '循序渐进'],
    commonMistakes: ['站立不稳', '未用辅助工具', '时间过长'],
  },
  {
    id: 'ex15',
    name: '勾脚行走',
    videoUrl: '',
    coverImage: '/images/hero-training.jpg',
    duration: 300,
    category: 'hip',
    phase: 'late',
    sets: 3,
    reps: 10,
    description: '抬脚尖，脚跟着地，向前行走，训练腿部力量和平衡。',
    keyPoints: ['脚尖抬起', '脚跟着地', '缓慢行走'],
    commonMistakes: ['脚跟抬起', '速度过快', '身体不稳'],
  },
  {
    id: 'ex16',
    name: '自行坐立',
    videoUrl: '',
    coverImage: '/images/hero-training.jpg',
    duration: 300,
    category: 'hip',
    phase: 'late',
    sets: 3,
    reps: 4,
    description: '采取坐立位，双臂交叉于前胸，身体前倾，进行起立及坐下训练。',
    keyPoints: ['双臂交叉', '身体前倾', '缓慢起立'],
    commonMistakes: ['用力过猛', '身体后仰', '动作过快'],
  },
];

export const getWeeklyData = (): WeeklyData[] => {
  const days = ['一', '二', '三', '四', '五', '六', '日'];
  const today = new Date();
  const currentDay = today.getDay() || 7;
  
  return days.map((day, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (currentDay - 1) + index);
    const dateStr = `${date.getMonth() + 1}/${date.getDate()}`;
    const isToday = index === currentDay - 1;
    
    return {
      day,
      date: dateStr,
      completed: isToday ? false : index < currentDay - 1,
      isToday,
    };
  });
};

export const getTrainingPlan = (dateStr: string): TrainingDay => {
  const day = parseInt(dateStr.split('/')[1]);
  
  let exerciseIds: string[];
  const phase = userProfile.recoveryPhase;
  
  if (phase === 'early' || day <= 14) {
    exerciseIds = ['ex1', 'ex2', 'ex3', 'ex4', 'ex5'];
  } else if (phase === 'middle' || (day > 14 && day <= 28)) {
    exerciseIds = ['ex6', 'ex7', 'ex8', 'ex9', 'ex10'];
  } else {
    exerciseIds = ['ex11', 'ex12', 'ex13', 'ex14', 'ex15', 'ex16'];
  }
  
  return {
    date: dateStr,
    exercises: exerciseIds.map(id => ({
      exerciseId: id,
      completed: true,
    })),
    completed: true,
  };
};

export const recoveryTrend: RecoveryTrend[] = [
  { date: '5/1', score: 35 },
  { date: '5/5', score: 38 },
  { date: '5/10', score: 42 },
  { date: '5/15', score: 45 },
  { date: '5/20', score: 50 },
  { date: '5/25', score: 55 },
  { date: '5/30', score: 58 },
  { date: '6/4', score: 62 },
  { date: '6/9', score: 65 },
];

export const achievements: Achievement[] = [
  { id: 'a1', title: '初出茅庐', description: '完成首次训练打卡', icon: 'star', unlocked: true, unlockedAt: '2026-04-16' },
  { id: 'a2', title: '坚持不懈', description: '连续打卡7天', icon: 'flame', unlocked: true, unlockedAt: '2026-04-25' },
  { id: 'a3', title: '月度达人', description: '累计打卡30天', icon: 'calendar', unlocked: true, unlockedAt: '2026-05-20' },
  { id: 'a4', title: '疼痛管理师', description: '连续记录疼痛评分14天', icon: 'activity', unlocked: true, unlockedAt: '2026-05-10' },
  { id: 'a5', title: '学霸之路', description: '学习完所有视频课程', icon: 'book-open', unlocked: true, unlockedAt: '2026-05-25' },
  { id: 'a6', title: '百日维新', description: '连续打卡100天', icon: 'trophy', unlocked: true, unlockedAt: '2026-06-01' },
  { id: 'a7', title: '完美康复', description: '获得医生满分评估', icon: 'award', unlocked: true, unlockedAt: '2026-06-10' },
  { id: 'a8', title: '榜样力量', description: '分享训练海报给3位好友', icon: 'share-2', unlocked: true, unlockedAt: '2026-06-05' },
];

export const bodyFeelings: BodyFeeling[] = [
  { id: 'f1', date: '6/8', content: '今天髋关节活动时还是有些紧绷感，但比上周好多了。', painLevel: 3 },
  { id: 'f2', date: '6/7', content: '做完训练后感觉腿部轻松很多，睡眠质量也改善了。', painLevel: 2 },
  { id: 'f3', date: '6/6', content: '走路时髋关节有点隐隐作痛，但按照医生说的减少强度后好转了。', painLevel: 4 },
  { id: 'f4', date: '6/5', content: '今天去复查，医生说恢复进度很好，继续加油！', painLevel: 2 },
];

export const weeklyStats: WeeklyStats[] = [
  { day: '周一', minutes: 25 },
  { day: '周二', minutes: 30 },
  { day: '周三', minutes: 20 },
  { day: '周四', minutes: 35 },
  { day: '周五', minutes: 28 },
  { day: '周六', minutes: 40 },
  { day: '周日', minutes: 15 },
];

export const knowledgeCards = [
  {
    id: 'k1',
    title: '冰敷 vs 热敷',
    content: '术后早期（0-2周）应使用冰敷消肿，后期可使用热敷促进血液循环。',
    category: '康复常识',
  },
  {
    id: 'k2',
    title: '为什么需要持续训练',
    content: '规律的康复训练可以防止关节粘连、肌肉萎缩，加速功能恢复。',
    category: '训练原理',
  },
  {
    id: 'k3',
    title: '疼痛是正常的吗',
    content: '适度疼痛是正常的，但如果VAS评分超过5分，应立即停止训练并咨询医生。',
    category: '注意事项',
  },
];

export const assessmentReports: AssessmentReport[] = [
  {
    id: 'ar1',
    date: '2026-04-22',
    type: 'weekly',
    overallScore: 65,
    rangeOfMotion: {
      hipFlexion: 60,
      hipExtension: 15,
      hipAbduction: 25,
      hipAdduction: 20,
    },
    muscleStrength: {
      quadriceps: 3,
      glutes: 3,
      hamstrings: 3,
    },
    balanceScore: 50,
    walkingAbility: 40,
    painLevel: 4,
    remarks: '术后第一周，患者恢复情况良好，髋关节活动度逐步改善。建议继续坚持康复训练，注意疼痛管理。',
    doctorSignature: '李医生',
  },
  {
    id: 'ar2',
    date: '2026-04-29',
    type: 'weekly',
    overallScore: 72,
    rangeOfMotion: {
      hipFlexion: 75,
      hipExtension: 25,
      hipAbduction: 35,
      hipAdduction: 28,
    },
    muscleStrength: {
      quadriceps: 4,
      glutes: 3,
      hamstrings: 4,
    },
    balanceScore: 65,
    walkingAbility: 55,
    painLevel: 3,
    remarks: '第二周恢复进展顺利，关节活动度明显改善，肌力有所增强。建议开始增加平衡训练。',
    doctorSignature: '李医生',
  },
  {
    id: 'ar3',
    date: '2026-05-13',
    type: 'monthly',
    overallScore: 78,
    rangeOfMotion: {
      hipFlexion: 90,
      hipExtension: 35,
      hipAbduction: 45,
      hipAdduction: 35,
    },
    muscleStrength: {
      quadriceps: 4,
      glutes: 4,
      hamstrings: 4,
    },
    balanceScore: 75,
    walkingAbility: 70,
    painLevel: 2,
    remarks: '术后一个月评估：患者恢复情况良好，髋关节功能逐步恢复。建议继续加强肌力训练和平衡训练，逐步增加行走距离。',
    doctorSignature: '李医生',
  },
  {
    id: 'ar4',
    date: '2026-05-27',
    type: 'weekly',
    overallScore: 85,
    rangeOfMotion: {
      hipFlexion: 100,
      hipExtension: 45,
      hipAbduction: 55,
      hipAdduction: 42,
    },
    muscleStrength: {
      quadriceps: 5,
      glutes: 4,
      hamstrings: 5,
    },
    balanceScore: 85,
    walkingAbility: 85,
    painLevel: 1,
    remarks: '恢复进展非常好！关节活动度接近正常范围，肌力明显增强。可以开始尝试正常日常活动。',
    doctorSignature: '李医生',
  },
  {
    id: 'ar5',
    date: '2026-06-10',
    type: 'final',
    overallScore: 92,
    rangeOfMotion: {
      hipFlexion: 110,
      hipExtension: 50,
      hipAbduction: 60,
      hipAdduction: 48,
    },
    muscleStrength: {
      quadriceps: 5,
      glutes: 5,
      hamstrings: 5,
    },
    balanceScore: 95,
    walkingAbility: 95,
    painLevel: 0,
    remarks: '康复评估结论：优秀！患者髋关节翻修术后脱位康复效果显著，关节功能基本恢复正常。建议继续保持适当锻炼，定期复查。',
    doctorSignature: '李医生',
  },
];

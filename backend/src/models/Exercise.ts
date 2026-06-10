import mongoose, { Document, Schema } from 'mongoose';

export interface IExercise extends Document {
  name: string;
  videoUrl?: string;
  coverImage: string;
  duration: number;
  category: 'neck' | 'shoulder' | 'back' | 'knee' | 'ankle' | 'hip';
  phase: 'early' | 'middle' | 'late';
  sets: number;
  reps: number;
  description: string;
  keyPoints: string[];
  commonMistakes: string[];
}

const ExerciseSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  videoUrl: {
    type: String,
    default: '',
  },
  coverImage: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
    min: 0,
  },
  category: {
    type: String,
    enum: ['neck', 'shoulder', 'back', 'knee', 'ankle', 'hip'],
    required: true,
  },
  phase: {
    type: String,
    enum: ['early', 'middle', 'late'],
    required: true,
  },
  sets: {
    type: Number,
    required: true,
    min: 1,
  },
  reps: {
    type: Number,
    required: true,
    min: 1,
  },
  description: {
    type: String,
    required: true,
  },
  keyPoints: {
    type: [String],
    required: true,
  },
  commonMistakes: {
    type: [String],
    required: true,
  },
});

export default mongoose.model<IExercise>('Exercise', ExerciseSchema);

import mongoose, { Document, Schema } from 'mongoose';

export interface IAssessmentReport extends Document {
  userId: string;
  date: Date;
  type: 'weekly' | 'monthly' | 'final';
  overallScore: number;
  rangeOfMotion: {
    hipFlexion: number;
    hipExtension: number;
    hipAbduction: number;
    hipAdduction: number;
  };
  muscleStrength: {
    quadriceps: number;
    glutes: number;
    hamstrings: number;
  };
  balanceScore: number;
  walkingAbility: number;
  painLevel: number;
  remarks: string;
  doctorSignature: string;
}

const AssessmentReportSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  type: {
    type: String,
    enum: ['weekly', 'monthly', 'final'],
    required: true,
  },
  overallScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  rangeOfMotion: {
    hipFlexion: { type: Number, required: true },
    hipExtension: { type: Number, required: true },
    hipAbduction: { type: Number, required: true },
    hipAdduction: { type: Number, required: true },
  },
  muscleStrength: {
    quadriceps: { type: Number, required: true, min: 1, max: 5 },
    glutes: { type: Number, required: true, min: 1, max: 5 },
    hamstrings: { type: Number, required: true, min: 1, max: 5 },
  },
  balanceScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  walkingAbility: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  painLevel: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
  remarks: {
    type: String,
    required: true,
  },
  doctorSignature: {
    type: String,
    required: true,
  },
});

export default mongoose.model<IAssessmentReport>('AssessmentReport', AssessmentReportSchema);

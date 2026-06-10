import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  surgeryType: string;
  surgeryDate: Date;
  recoveryPhase: 'early' | 'middle' | 'late';
  doctorName: string;
  totalDays: number;
  streakDays: number;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  avatar: {
    type: String,
    default: '',
  },
  surgeryType: {
    type: String,
    required: true,
  },
  surgeryDate: {
    type: Date,
    required: true,
  },
  recoveryPhase: {
    type: String,
    enum: ['early', 'middle', 'late'],
    default: 'early',
  },
  doctorName: {
    type: String,
    required: true,
  },
  totalDays: {
    type: Number,
    default: 0,
  },
  streakDays: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

export default mongoose.model<IUser>('User', UserSchema);

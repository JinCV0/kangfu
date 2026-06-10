import mongoose, { Document, Schema } from '../config/database';

export interface ITrainingPlan extends Document {
  userId: string;
  date: Date;
  exercises: {
    exerciseId: string;
    completed: boolean;
  }[];
  completed: boolean;
  painScore?: number;
}

const TrainingPlanSchema: Schema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  exercises: {
    type: [{
      exerciseId: {
        type: Schema.Types.ObjectId,
        ref: 'Exercise',
        required: true,
      },
      completed: {
        type: Boolean,
        default: false,
      },
    }],
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  painScore: {
    type: Number,
    min: 0,
    max: 10,
  },
});

export default mongoose.model<ITrainingPlan>('TrainingPlan', TrainingPlanSchema);

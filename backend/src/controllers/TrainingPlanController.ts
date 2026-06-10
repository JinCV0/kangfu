import { Request, Response } from 'express';
import TrainingPlan from '../models/TrainingPlan';
import Exercise from '../models/Exercise';
import { AuthRequest } from '../middleware/auth';

export const getTrainingPlan = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { date } = req.query;
    const dateObj = date ? new Date(date as string) : new Date();
    
    const trainingPlan = await TrainingPlan.findOne({
      userId: req.user._id,
      date: {
        $gte: new Date(dateObj.toDateString()),
        $lt: new Date(dateObj.getTime() + 24 * 60 * 60 * 1000),
      },
    }).populate('exercises.exerciseId');

    if (trainingPlan) {
      res.status(200).json(trainingPlan);
      return;
    }

    const exercises = await Exercise.find();
    const planData = new TrainingPlan({
      userId: req.user._id,
      date: dateObj,
      exercises: exercises.map(ex => ({
        exerciseId: ex._id,
        completed: false,
      })),
      completed: false,
    });

    await planData.save();
    const populatedPlan = await TrainingPlan.findById(planData._id).populate('exercises.exerciseId');
    res.status(200).json(populatedPlan);
  } catch (error) {
    res.status(500).json({ message: '服务器内部错误', error });
  }
};

export const toggleExercise = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { date, exerciseId } = req.body;
    const dateObj = new Date(date);

    const trainingPlan = await TrainingPlan.findOne({
      userId: req.user._id,
      date: {
        $gte: new Date(dateObj.toDateString()),
        $lt: new Date(dateObj.getTime() + 24 * 60 * 60 * 1000),
      },
    });

    if (!trainingPlan) {
      res.status(404).json({ message: '训练计划不存在' });
      return;
    }

    const exerciseIndex = trainingPlan.exercises.findIndex(
      ex => ex.exerciseId.toString() === exerciseId
    );

    if (exerciseIndex === -1) {
      res.status(404).json({ message: '训练项目不存在' });
      return;
    }

    trainingPlan.exercises[exerciseIndex].completed = !trainingPlan.exercises[exerciseIndex].completed;
    trainingPlan.completed = trainingPlan.exercises.every(ex => ex.completed);

    await trainingPlan.save();
    const populatedPlan = await TrainingPlan.findById(trainingPlan._id).populate('exercises.exerciseId');
    res.status(200).json(populatedPlan);
  } catch (error) {
    res.status(500).json({ message: '服务器内部错误', error });
  }
};

export const completeDay = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { date, painScore } = req.body;
    const dateObj = new Date(date);

    const trainingPlan = await TrainingPlan.findOne({
      userId: req.user._id,
      date: {
        $gte: new Date(dateObj.toDateString()),
        $lt: new Date(dateObj.getTime() + 24 * 60 * 60 * 1000),
      },
    });

    if (!trainingPlan) {
      res.status(404).json({ message: '训练计划不存在' });
      return;
    }

    trainingPlan.exercises.forEach(ex => ex.completed = true);
    trainingPlan.completed = true;
    if (painScore) trainingPlan.painScore = painScore;

    await trainingPlan.save();
    const populatedPlan = await TrainingPlan.findById(trainingPlan._id).populate('exercises.exerciseId');
    res.status(200).json(populatedPlan);
  } catch (error) {
    res.status(500).json({ message: '服务器内部错误', error });
  }
};

export const getUserTrainingHistory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const trainingPlans = await TrainingPlan.find({ userId: req.user._id })
      .sort({ date: -1 })
      .populate('exercises.exerciseId');
    
    res.status(200).json(trainingPlans);
  } catch (error) {
    res.status(500).json({ message: '服务器内部错误', error });
  }
};

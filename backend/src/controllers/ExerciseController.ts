import { Request, Response } from 'express';
import Exercise from '../models/Exercise';

export const getAllExercises = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, phase } = req.query;
    
    let query: any = {};
    if (category) query.category = category;
    if (phase) query.phase = phase;

    const exercises = await Exercise.find(query);
    res.status(200).json(exercises);
  } catch (error) {
    res.status(500).json({ message: '服务器内部错误', error });
  }
};

export const getExerciseById = async (req: Request, res: Response): Promise<void> => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    if (!exercise) {
      res.status(404).json({ message: '训练项目不存在' });
      return;
    }
    res.status(200).json(exercise);
  } catch (error) {
    res.status(500).json({ message: '服务器内部错误', error });
  }
};

export const createExercise = async (req: Request, res: Response): Promise<void> => {
  try {
    const exercise = new Exercise(req.body);
    await exercise.save();
    res.status(201).json({ message: '创建成功', exercise });
  } catch (error) {
    res.status(500).json({ message: '服务器内部错误', error });
  }
};

export const updateExercise = async (req: Request, res: Response): Promise<void> => {
  try {
    const updatedExercise = await Exercise.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedExercise) {
      res.status(404).json({ message: '训练项目不存在' });
      return;
    }
    res.status(200).json({ message: '更新成功', exercise: updatedExercise });
  } catch (error) {
    res.status(500).json({ message: '服务器内部错误', error });
  }
};

export const deleteExercise = async (req: Request, res: Response): Promise<void> => {
  try {
    const deletedExercise = await Exercise.findByIdAndDelete(req.params.id);
    if (!deletedExercise) {
      res.status(404).json({ message: '训练项目不存在' });
      return;
    }
    res.status(200).json({ message: '删除成功' });
  } catch (error) {
    res.status(500).json({ message: '服务器内部错误', error });
  }
};

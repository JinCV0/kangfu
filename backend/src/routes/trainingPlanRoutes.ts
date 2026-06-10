import express from 'express';
import { getTrainingPlan, toggleExercise, completeDay, getUserTrainingHistory } from '../controllers/TrainingPlanController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.get('/', authenticateToken, getTrainingPlan);
router.post('/toggle', authenticateToken, toggleExercise);
router.post('/complete', authenticateToken, completeDay);
router.get('/history', authenticateToken, getUserTrainingHistory);

export default router;

import express from 'express';
import { getUserAssessmentReports, getAssessmentReportById, createAssessmentReport, updateAssessmentReport, deleteAssessmentReport } from '../controllers/AssessmentController';
import { authenticateToken } from '../middleware/auth';

const router = express.Router();

router.get('/', authenticateToken, getUserAssessmentReports);
router.get('/:id', authenticateToken, getAssessmentReportById);
router.post('/', authenticateToken, createAssessmentReport);
router.put('/:id', authenticateToken, updateAssessmentReport);
router.delete('/:id', authenticateToken, deleteAssessmentReport);

export default router;

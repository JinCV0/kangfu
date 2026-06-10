import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/database';

import userRoutes from './routes/userRoutes';
import exerciseRoutes from './routes/exerciseRoutes';
import trainingPlanRoutes from './routes/trainingPlanRoutes';
import assessmentRoutes from './routes/assessmentRoutes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: process.env.NODE_ENV === 'production'
    ? (process.env.CLIENT_URL ? [process.env.CLIENT_URL] : ['*'])
    : ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/users', userRoutes);
app.use('/api/exercises', exerciseRoutes);
app.use('/api/training-plan', trainingPlanRoutes);
app.use('/api/assessments', assessmentRoutes);

app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({ message: '服务器运行正常', timestamp: new Date().toISOString() });
});

const startServer = async (): Promise<void> => {
  try {
    await connectDB();
    
    app.listen(PORT, () => {
      console.log(`服务器运行在 http://localhost:${PORT}`);
      console.log(`健康检查: http://localhost:${PORT}/api/health`);
    });
  } catch (error) {
    console.error('服务器启动失败:', error);
    process.exit(1);
  }
};

startServer();

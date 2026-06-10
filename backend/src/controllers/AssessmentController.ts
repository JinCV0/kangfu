import { Request, Response } from 'express';
import AssessmentReport from '../models/AssessmentReport';
import { AuthRequest } from '../middleware/auth';

export const getUserAssessmentReports = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const reports = await AssessmentReport.find({ userId: req.user._id })
      .sort({ date: -1 });
    
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: '服务器内部错误', error });
  }
};

export const getAssessmentReportById = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const report = await AssessmentReport.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!report) {
      res.status(404).json({ message: '评估报告不存在' });
      return;
    }

    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({ message: '服务器内部错误', error });
  }
};

export const createAssessmentReport = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const report = new AssessmentReport({
      ...req.body,
      userId: req.user._id,
    });

    await report.save();
    res.status(201).json({ message: '创建成功', report });
  } catch (error) {
    res.status(500).json({ message: '服务器内部错误', error });
  }
};

export const updateAssessmentReport = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const updatedReport = await AssessmentReport.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );

    if (!updatedReport) {
      res.status(404).json({ message: '评估报告不存在' });
      return;
    }

    res.status(200).json({ message: '更新成功', report: updatedReport });
  } catch (error) {
    res.status(500).json({ message: '服务器内部错误', error });
  }
};

export const deleteAssessmentReport = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const deletedReport = await AssessmentReport.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!deletedReport) {
      res.status(404).json({ message: '评估报告不存在' });
      return;
    }

    res.status(200).json({ message: '删除成功' });
  } catch (error) {
    res.status(500).json({ message: '服务器内部错误', error });
  }
};

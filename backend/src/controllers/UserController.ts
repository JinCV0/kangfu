import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User';
import { AuthRequest } from '../middleware/auth';

dotenv.config();

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, surgeryType, surgeryDate, doctorName } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({ message: '该邮箱已被注册' });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const surgeryDateObj = new Date(surgeryDate);
    const today = new Date();
    const totalDays = Math.floor((today.getTime() - surgeryDateObj.getTime()) / (1000 * 60 * 60 * 24));

    const user = new User({
      name,
      email,
      password: hashedPassword,
      surgeryType,
      surgeryDate: surgeryDateObj,
      doctorName,
      totalDays: Math.max(0, totalDays),
      streakDays: Math.max(0, totalDays),
      recoveryPhase: totalDays <= 14 ? 'early' : totalDays <= 28 ? 'middle' : 'late',
    });

    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, { expiresIn: '7d' });

    res.status(201).json({
      message: '注册成功',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        surgeryType: user.surgeryType,
        surgeryDate: user.surgeryDate,
        recoveryPhase: user.recoveryPhase,
        doctorName: user.doctorName,
        totalDays: user.totalDays,
        streakDays: user.streakDays,
      },
    });
  } catch (error) {
    res.status(500).json({ message: '服务器内部错误', error });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: '邮箱或密码错误' });
      return;
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      res.status(401).json({ message: '邮箱或密码错误' });
      return;
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET as string, { expiresIn: '7d' });

    res.status(200).json({
      message: '登录成功',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        surgeryType: user.surgeryType,
        surgeryDate: user.surgeryDate,
        recoveryPhase: user.recoveryPhase,
        doctorName: user.doctorName,
        totalDays: user.totalDays,
        streakDays: user.streakDays,
      },
    });
  } catch (error) {
    res.status(500).json({ message: '服务器内部错误', error });
  }
};

export const getUserProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (!user) {
      res.status(404).json({ message: '用户不存在' });
      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: '服务器内部错误', error });
  }
};

export const updateUserProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { name, avatar, doctorName } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, avatar, doctorName },
      { new: true }
    ).select('-password');

    if (!updatedUser) {
      res.status(404).json({ message: '用户不存在' });
      return;
    }

    res.status(200).json({ message: '更新成功', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: '服务器内部错误', error });
  }
};

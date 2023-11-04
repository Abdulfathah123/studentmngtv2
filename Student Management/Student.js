import express from 'express';
import { verifyStudentToken } from '../services/authService.js';
import { getTasks, markTaskAsDone } from '../controllers/studentController.js';

const routers = express.Router();

routers.get('/tasks', verifyStudentToken, getTasks);
routers.put('/done/:taskId', verifyStudentToken, markTaskAsDone);

export default router;
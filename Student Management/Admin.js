import express from 'express';
import { verifyAdminToken } from '../services/authService.js';
import { addStudent, assignTask } from '../controllers/adminController.js';

const routers = express.Router();

routers.post('/add-std', verifyAdminToken, addStudent);
routers.post('/assign-task', verifyAdminToken, assignTask);

export default routers;

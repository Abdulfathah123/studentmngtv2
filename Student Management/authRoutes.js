import express from 'express';
import jwt from 'jsonwebtoken';
import Student from '../models/studentModel.js';

const routers = express.Router();

const adminSecretKey = process.env.ADMIN_SECRET_KEY || 'admin1234';
const studentSecretKey = process.env.STUDENT_SECRET_KEY || 'std1234';

routers.post('/admin/login', (req, res) => {
    const { email, password } = req.body;
    const adminEmail = 'admin@aadmin.com';
    const adminPassword = 'admin';
  
    if (email === adminEmail && password === adminPassword) {
      const token = jwt.sign({ email, role: 'admin' }, adminSecretKey, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Unauthorized' });
    }
  });

routers.post('/student/login', async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const student = await Student.findOne({ email, password });
  
      if (student) {
        const token = jwt.sign({ email, role: 'student' }, studentSecretKey, { expiresIn: '1h' });
        res.json({ token });
      } else {
        res.status(401).json({ message: 'Unauthorized' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Authentication error' });
    }
  });

export { adminSecretKey, studentSecretKey };
export default routers;
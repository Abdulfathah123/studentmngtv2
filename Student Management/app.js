import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cron from 'node-cron';
import adminRoutes from './routers/adminRoutes.js';
import studentRoutes from './routers/studentRoutes.js';
import authRoutes from './routers/authRoutes.js';
import Task from './models/taskModel.js';

const web = express();
web.use(bodyParser.json());

mongoose.connect('mongodb+srv://aadithmanoj1:32OOqa27fRGwAWe5@cluster0.kfkllsc.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const port = process.env.PORT || 3000;

web.use('/admin', adminRoutes);
web.use('/student', studentRoutes);
web.use('/auth', authRoutes);

cron.schedule('* * * * *', async () => {
  try {
    const currentTime = new Date();

    const overdueTasks = await Task.find({
      status: 'pending',
      dueTime: { $lt: currentTime },
    });

    for (const task of overdueTasks) {
      task.status = 'overdue';
      await task.save();
      console.log(`Task with ID ${task._id} is overdue for ${task.studentName}`);
    }
  } catch (error) {
    console.error('Cron job error:', error);
  }
});

web.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

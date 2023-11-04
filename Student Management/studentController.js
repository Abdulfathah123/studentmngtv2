import Student from '../models/studentModel.js';
import Task from '../models/taskModel.js';

export const getTasks = async (req, res) => {
  try {
    const task = await Task.find({ studentEmail: req.studentEmail });
    res.json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving tasks' });
  }
};

export const markTaskAsDone = async (req, res) => {
  const taskId = req.params.taskId;

  try {
    const updatedTask = await Task.findByIdAndUpdate(taskId, { status: 'completed' }, { new: true });
    if (updatedTask) {
      res.json({ message: 'Task as done' });
    } else {
      res.status(404).json({ message: 'Task not found or already completed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error marking the task as done' });
  }
};

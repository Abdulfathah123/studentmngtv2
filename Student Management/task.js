import Task from '../models/taskModel';

export const assignTask = async (studentEmail, task, dueTime, taskId) => {
  const newTask = new Task({ studentEmail, task, dueTime, status: 'pending', taskId });
  return newTask.save();
};

export const markTaskAsDone = async (taskId) => {
  const updatedTask = await Task.findByIdAndUpdate(taskId, { status: 'completed' }, { new: true });
  return updatedTask;
};

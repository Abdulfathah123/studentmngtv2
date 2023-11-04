import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  studentEmail: String,
  task: String,
  dueTime: Date,
  status: String,
  taskId: String,
});

const Tasks = mongoose.model('Task', taskSchema);

export default Tasks;

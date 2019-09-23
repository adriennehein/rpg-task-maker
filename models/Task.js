const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  taskTitle: { type: String, required: true },
  taskDescription:  String,
  taskCompleted: Boolean,
})

const Task = mongoose.model('Task', TaskSchema);
module.exports = Task;
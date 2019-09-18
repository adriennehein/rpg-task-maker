const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  taskTitle: { type: String, required: true },
  taskDescription:  String,
  taskCompleted: Boolean,
})

module.exports = mongoose.model('Task', TaskSchema);

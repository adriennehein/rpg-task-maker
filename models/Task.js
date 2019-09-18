const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  taskTitle: { type: String, require: true },
  taskDescription:  String,
  taskCompleted: Boolean,
})

TaskSchema.pre('save', function(next) {
  console.log('creating task');
  next();
})

module.exports = mongoose.model('Task', TaskSchema);

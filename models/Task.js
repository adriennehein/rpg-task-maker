const mongoose = require('mongoose');
// const bcrype = require('bcyrpt')

const TaskSchema = new mongoose.Schema({
  taskTitle: { type: String, require: true },
  taskDescription: { type: String },
  taskCompleted: { type: Boolean }
})

TaskSchema.pre('save', function(next) {
  console.log('creating task');
})

module.exports = mongoose.model('Task', TaskSchema);

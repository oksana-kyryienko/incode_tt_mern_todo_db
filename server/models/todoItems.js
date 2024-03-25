const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ['todo', 'inprogress', 'closed'],
    default: 'todo',
  },
});

module.exports = mongoose.model('todo', TaskSchema);

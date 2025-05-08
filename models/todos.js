const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    minLength: 5,
    maxnLength: 20
  },
  status: {
    type: String,
    enum: ["to do", "in progress", "done"],
    default: "to do"
  },
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
    required: true,
  },
},
  { timestamps: true });

const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;

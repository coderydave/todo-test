const mongoose = require('mongoose');

const taskShema = new mongoose.Schema({
    tasktext: { type: String },
    datetime: { type: String },
});

const Task = mongoose.model('todos', taskShema, 'todos');

module.exports = Task;

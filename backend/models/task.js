const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    taskName: {
        type: 'string',
        required: true,
    },
    isDone: {
        type: 'string',
        required: false
    },
    owner: {
        type: 'number',
        required: true
    },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task
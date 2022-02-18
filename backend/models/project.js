const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  projectId: {
    type: String,
    required: true,
    unique: true
  },
  projectName: {
    type: String,
    required: true
  },
  members: {
    type: Array,
    required: false
  },
  createdAt: {
    type: Date,
    required: false
  },
  finishedAt: {
    type: Date,
    required: false
  }
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project
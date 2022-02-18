const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        required: true
    },
    // active or inactive
    status: {
        type: String,
        required: true,
    },
    // user or admin
    role: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User
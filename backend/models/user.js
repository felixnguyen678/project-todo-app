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

const UserRole = {
    USER: 'user',
    ADMIN: 'admin'
}
const UserStatus = {
    ACTIVE: 'active',
    INACTIVE: 'inactive'
}
const User = mongoose.model('User', userSchema);

module.exports = {
    User,
    UserRole,
    UserStatus
}


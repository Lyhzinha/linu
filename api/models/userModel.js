'user strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: 'Enter the username'
    },
    email: {
        type: String,
        unique: true,
        required: 'Enter the e-mail'
    },
    password: {
        type: String
    }
});

module.exports = mongoose.model('User', UserSchema)
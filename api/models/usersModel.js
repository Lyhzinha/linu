const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: [true, 'username is required'],
        lowercase: true
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'username is required']
    },
    password: {
        type: String,
        required: [true, 'username is required']
    }
});

UserSchema.pre('save', (next) => {
    // hashing pw
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

module.exports = mongoose.model('User', UserSchema);

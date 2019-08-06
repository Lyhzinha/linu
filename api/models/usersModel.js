const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const environment = process.env.NODE_ENV;
const stage = require('../../config')[environment];

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: 'String',
        required: true,
        trim: true
    },
    password: {
        type: 'String',
        required: true,
        trim: true
    },
    email: {
        type: 'String',
        required: true,
        trim: true,
        unique: true
    },
    role: {
        type: 'String',
        default: 'user',
        enum: ['user', 'admin']
    }
});

// encrypt password

userSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified || !user.isNew) {
        next();
    }
    else {
        bcrypt.hash(user.password, stage.saltingRounds, (err, hash) => {
            if (err) {
                console.log('Error hasing password for user ', user.name);
                next(err);
            }
            else {
                user.password = hash;
                next();
            }
        });
    }
});

module.exports = mongoose.model('User', userSchema);

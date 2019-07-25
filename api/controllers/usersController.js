const userModel = require('../models/usersModel');
const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');


function create(req, res, next) {
    userModel.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password }, (err) => {
        if (err) {
            next(err);
        }
        else {
            res.json({
                status: 'success',
                message: 'User added successfully!!!',
                data: null });
        }
    });
}

function authenticate(req, res, next) {
    userModel.findOne({ email: req.body.email }, (err, userInfo) => {
        if (err) {
            next(err);
        }
        else {
            if (bcrypt.compareSync(req.body.password, userInfo.password)) {
                const token = jwt.sign({ id: userInfo._id }, req.app.get('secretKey'), { expiresIn: '24h' });
                res.json({
                    status: 'success',
                    message: 'user found!!!',
                    data: { user: userInfo, token } });
            }
            else {
                res.json({
                    status: 'error',
                    message: 'Invalid email/password!!!',
                    data: null });
            }
        }
    });
}


module.exports = {
    create,
    authenticate
};


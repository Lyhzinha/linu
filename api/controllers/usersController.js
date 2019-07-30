const mongoose = require('mongoose');
const User = require('../models/usersModel');
const expressValidator = require('express-validator');

const connUri = process.env.MONGODB_URI;

module.exports = {
    add: (req, res) => {
        mongoose.connect(connUri, { useNewUrlParser: true }, (err, next) => {
            const result = {};
            let status = 201;
            if (!err) {
                req.checkBody({
                    name: {
                        notEmpty: true,
                        errorMessage: 'Invalid Name'
                    },
                    password: {
                        notEmpty: true,
                        errorMessage: 'Invalid Password'
                    },
                    email: {
                        notEmpty: true,
                        isEmail: false,
                        errorMessage: 'Invalid Name'
                    }
                });

                const validationErrors = req.validationErrors;

                if (validationErrors) {
                    status = 400;
                    result.status = status;
                    result.error = validationErrors;
                    res.status(status).send(result);
                    next();
                }
                else {
                    const name = req.body.name;
                    const password = req.body.password;
                    const email = req.body.email;

                    const user = new User({ name, password, email });

                    // TODO: hash the password (instead on a model)

                    user.save((errSavingUser, userSaved) => {
                        if (!errSavingUser) {
                            result.status = status;
                            result.result = userSaved;
                        }
                        else {
                            status = 500;
                            result.status = status;
                            result.error = errSavingUser;
                        }
                        res.status(status).send(result);
                    });
                }
            }

            else {
                status = 500;
                result.status = status;
                result.error = err;
                res.status(status).send(result);
            }
        });
    }
};

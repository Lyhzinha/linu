const User = require('../models/usersModel');
const bcrypt = require('bcrypt');

function add(req, res) {
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
            errorMessage: 'Invalid Email'
        }
    });

    req.getValidationResult().then((resultValidation) => {
        if (!resultValidation.isEmpty()) {
            const status = 400; // HTTP 400 Bad request
            res.status(status).send('Invalid Fields');
            return;
        }

        const name = req.body.name;
        const password = req.body.password;
        const email = req.body.email;

        const user = new User({ name, password, email });

        // TODO: hash the password (instead on a model)

        user.save((errSaving, userSaved) => {
            const result = {};
            if (!errSaving) {
                result.status = 201; // HTTP 201 Created
                result.result = userSaved;
            }
            else {
                result.status = 500; // HTTP 500 Server internal error
                result.error = errSaving;
            }
            res.status(result.status).send(result);
        });
    });
}

function login(req, res) {
    req.checkBody({
        email: {
            notEmpty: true,
            isEmail: false
        },
        password: {
            notEmpty: true
        }
    });

    req.getValidationResult().then((resultValidation) => {
        if (!resultValidation.isEmpty()) {
            console.log(resultValidation);
            const status = 400; // HTTP 400 Bad request
            res.status(status).send('Invalid Fields');
            return;
        }
        const email = req.body.email;

        User.findOne({ email }, (error, user) => {
            const result = {};
            if (error) {
                console.log(error);
                result.status = 500; // HTTP 500 Server internal error
                result.error = error;
                res.status(result.status).send('Internal error!!');
                return;
            }

            if (user === null) {
                result.status = 404; // HTTP 404 Not found
                res.status(result.status).send('User not found.');
                return;
            }
            const password = req.body.password;
            bcrypt.compare(password, user.password).then((match) => {
                if (match) {
                    result.status = 200; // HTTP 200 Ok
                    result.result = user;
                }
                else {
                    result.status = 401; // HTTP 401 Unauthorized
                    result.error = 'Authentication error.';
                }
                res.status(result.status).send(result);
            }).catch((errorPassoword) => {
                result.status = 500; // HTTP 500 Server internal error
                result.error = errorPassoword;
                res.status(result.status).send(result);
            });
        });
    });
}


function getAllUsers(req, res) {
    User.find({}, (error, users) => {
        if (error) {
            console.log('Get all users failed', error);
            return;
        }
        res.send(users);
    });
}


module.exports = {
    add,
    login,
    getAllUsers
};

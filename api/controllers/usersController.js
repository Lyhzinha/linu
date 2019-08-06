const User = require('../models/usersModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
        },
        role: {
            notEmpty: true,
            errorMessage: 'Choose an option'
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
        const role = req.body.role;

        const user = new User({ name, password, email, role });

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
                    const payload = { user: user.email, role: user.role };
                    const options = { expiresIn: '1d' };
                    const secret = process.env.JWT_SECRET;
                    const token = jwt.sign(payload, secret, options);

                    result.token = token;
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
    const payload = req.decoded;
    console.log(payload);

    if (payload && payload.role === 'admin') {
        User.find({}, (error, users) => {
            if (error) {
                res.status(500).send('Operation failed'); // HTTP 500 Server internal error
            }
            res.status(200).send(users);
        });
    }
    else {
        res.status(400).send('You don\'t have permissions.');
    }
}


module.exports = {
    add,
    login,
    getAllUsers
};

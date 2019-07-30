const mongoose = require('mongoose');
const User = require('../models/usersModel');

const connUri = process.env.MONGODB_URI;


function add(req, res) {
    mongoose.connect(connUri, { useNewUrlParser: true }, (err) => {
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

            req.getValidationResult().then((resultValidation) => {
                if (!resultValidation.isEmpty()) {
                    status = 400;
                    res.status(status).send('Invalid Fields');
                }
                else {
                    const name = req.body.name;
                    const password = req.body.password;
                    const email = req.body.email;

                    const user = new User({ name, password, email });

                    // TODO: hash the password (instead on a model)

                    user.save((errSaving, userSaved) => {
                        if (!err) {
                            result.status = status;
                            result.result = userSaved;
                        }
                        else {
                            status = 500;
                            result.status = status;
                            result.error = errSaving;
                        }
                        res.status(status).send(result);
                    });
                }
            });
        }
        else {
            status = 500;
            result.status = status;
            result.error = err;
            res.status(status).send(result);
        }
    });
}


module.exports = {
    add
};

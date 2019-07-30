const mongoose = require('mongoose');
const User = require('../models/usersModel');

const connUri = process.env.MONGODB_URI;

module.exports = {
    add: (req, res) => {
        mongoose.connect(connUri, { useNewUrlParser: true }, (err) => {
            const result = {};
            let status = 201;
            if (!err) {
                const name = req.body.name;
                const password = req.body.password;
                const email = req.body.email;

                const user = new User({ name, password, email });

                // TODO: hash the password (instead on a model)

                user.save((errSavingUser, userSaved) => {
                    if (!err) {
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
            else {
                status = 500;
                result.status = status;
                result.error = err;
                res.status(status).send(result);
            }
        });
    }
};

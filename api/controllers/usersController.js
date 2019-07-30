const User = require('../models/usersModel');

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
            errorMessage: 'Invalid Name'
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


module.exports = {
    add
};

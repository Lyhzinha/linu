const jwt = require('jsonwebtoken');

function validateToken(req, res, next) {
    const authorizationHeader = req.headers.authorization;
    let result;
    if (!authorizationHeader) {
        result = {
            error: 'Authentication error. Token required.',
            status: 401
        };
        res.status(401).send(result);
    }

    const token = req.headers.authorization.split(' ')[1];
    const options = { expiresIn: '1d' };

    try {
        result = jwt.verify(token, process.env.JWT_SECRET, options); // verify if token hasn't expired
        req.decoded = result;
        next();
    }
    catch (err) {
        throw new Error(err);
    }
}

module.exports = {
    validateToken
};

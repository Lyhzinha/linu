const jwt = require('jsonwebtoken');

function validateToken(req, res, next) {
    const authorizationHeader = req.headers.authorization;

    if (!authorizationHeader) {
        const result = { error: 'Authentication error. Token required.' };
        res.status(401).send(result);
    }

    const token = req.headers.authorization.split(' ')[1];
    const options = { expiresIn: '1d' };

    try {
        const result = jwt.verify(token, process.env.JWT_SECRET, options); // verify if token hasn't expired
        req.decoded = result;
        next();
    }
    catch (err) {
        const result = { error: 'Error on token verification' + err };
        res.status(500).send(result);
    }
}

module.exports = {
    validateToken
};

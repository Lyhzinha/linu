const users = require('./usersRoutes');

module.exports = (router) => {
    users(router);
    return router;
};

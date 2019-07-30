const controller = require('../controllers/usersController');

module.exports = (router) => {
    router.route('/users')
        .get(controller.getAllUsers)
        .post(controller.add);
    router.route('/login')
        .post(controller.login);
};

const controller = require('../controllers/usersController');
const middleware = require('../middlewares/tokenValidation');

module.exports = (router) => {
    router.route('/users')
        .get(middleware.validateToken, controller.getAllUsers)
        .post(controller.add);
    router.route('/login')
        .post(controller.login);
};

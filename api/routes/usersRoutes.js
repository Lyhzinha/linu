const controller = require('../controllers/usersController');

module.exports = (router) => {
    router.route('/users')
        .post(controller.add);
};

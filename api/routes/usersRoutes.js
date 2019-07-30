const controller = require('../controllers/usersController');

module.exports = (router) => {
    router.route('/usersRoutes')
        .post(controller.add);
};

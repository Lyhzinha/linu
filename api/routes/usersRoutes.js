const express = require('express');

const router = express.Router();
const validation = require('../middlewares/registerValidation');
const userController = require('../controllers/usersController');

router.post('/register', validation.validateRegistrationBody(), userController.create);
router.post('/authenticate', validation.validateLoginBody(), userController.authenticate);

module.exports = router;

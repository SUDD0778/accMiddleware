var express = require('express');
var controller = require('./user.controller');

var router = express.Router();

router.post('/login', controller.login);
router.post('/signUp', controller.signUp);
router.post('/changePassword', controller.changePassword);

module.exports = router;
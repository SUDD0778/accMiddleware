const express = require('express');
const controller = require('./user.controller');
const auth = require('../services/auth');

const router = express.Router();

router.post('/login', controller.login);
router.post('/signUp', controller.signUp);
router.post('/changePassword', auth.isAuthenticated, controller.changePassword);

module.exports = router;
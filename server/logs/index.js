'use strict';

const express = require('express');
const controller = require('./logs.controller');
const auth = require('../services/auth');

const router = express.Router();

router.get('/fetchLogs', auth.isAuthenticated, controller.fetchLogs);

module.exports = router;
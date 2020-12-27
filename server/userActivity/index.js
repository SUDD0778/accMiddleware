'use strict';

const express = require('express');
const controller = require('./userActivity.controller');
const auth = require('../services/auth');


const router = express.Router();

router.get('/fetchHistoryByUserId', auth.isAuthenticated, controller.fetchHistoryByUserId);
router.get('/fetchFavouriteByUserId', auth.isAuthenticated, controller.fetchFavouriteByUserId);
router.post('/setFavouriteMovie', auth.isAuthenticated, controller.setFavouriteMovie);

module.exports = router;
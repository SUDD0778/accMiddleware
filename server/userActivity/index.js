'use strict';

var express = require('express');
var controller = require('./userActivity.controller');
var auth = require('../auth');

var router = express.Router();

router.get('/fetchHistoryByUserId', controller.fetchHistoryByUserId);
router.get('/fetchFavouriteByUserId', controller.fetchFavouriteByUserId);
router.post('/setFavouriteMovie', controller.setFavouriteMovie);

module.exports = router;
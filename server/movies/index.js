'use strict';

var express = require('express');
var controller = require('./movies.controller');
var auth = require('../auth');

var router = express.Router();

router.get('/fetchMoviesfromApi', controller.fetchMoviesfromApi);
router.get('/getMovieById', controller.getMovieById);
router.get('/fetchMovies', controller.fetchMovies);

module.exports = router;
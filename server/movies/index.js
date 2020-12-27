'use strict';

const express = require('express');
const controller = require('./movies.controller');
const auth = require('../services/auth');

const router = express.Router();

router.get('/fetchMoviesfromApi', controller.fetchMoviesfromApi);
router.get('/getMovieById', auth.isAuthenticated, controller.getMovieById);
router.get('/fetchMovies', auth.isAuthenticated, controller.fetchMovies);

module.exports = router;
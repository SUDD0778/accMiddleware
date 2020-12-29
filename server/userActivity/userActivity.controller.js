'use strict';

const _ = require('lodash');
const FavouriteMovie = require('./favouriteMovie.model.js');
const MovieHistory = require('./movieHistory.model.js');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

exports.setFavouriteMovie = function(req, res) {

    if(!req.body.userId) return handleError(res, "User Id not found");
    if(!req.body.hasOwnProperty("favMovieFlag")) return handleError(res, "favourite Movie Flag  not found");
    else if(typeof req.body.favMovieFlag != 'boolean') return handleError(res, "favourite Movie Flag  must be boolena");
    if(!req.body.movieId) return handleError(res, "Movie Id not found", res);

    let userId = req.body.userId;
    let favMovieFlag = req.body.favMovieFlag;
    let movieId = req.body.movieId;
    
    FavouriteMovie.findOne({userId : new ObjectId(userId)}, function(err, activity){
        if(err) handleError(res, err);
        if(activity == null) {
            let _activity = {
                userId : userId,
                movieInfo : {},
            };
            if(favMovieFlag && !_activity.movieInfo[movieId]) {
                _activity.movieInfo[movieId] = {
                    movieId : movieId,
                    timestamp : new Date()
                };
            }
            activity = _activity;
        } else {
            if(favMovieFlag) {
                if(!activity.movieInfo[movieId]) activity.movieInfo[movieId] = {
                    movieId : movieId,
                    timestamp : new Date()
                };
            } else {
                if(activity.movieInfo[movieId])
                    delete activity.movieInfo[movieId];
            }
        }
        FavouriteMovie.updateOne({userId : userId},activity,{upsert : true}, function(err, activity) {
            if(err) handleError(res, err);
            res.status(200).json({success : true});
        });
    });   
}

exports.fetchHistoryByUserId = function(req, res) {
    if(!req.query.userId) return handleError("User Id not found", res);

    let userId = req.query.userId;
    MovieHistory.find({userId : userId}).sort({timestamp : -1}).exec(function(err, history) {
        if(err) handleError(res, err);
        res.status(200).send(history);
    });
}

exports.fetchFavouriteByUserId = function(req, res) {
    if(!req.query.userId) return handleError("User Id not found", res);

    let userId = req.query.userId;
    FavouriteMovie.find({userId : userId}).sort({timestamp : -1}).exec(function(err, history) {
        if(err) handleError(res, err);
        res.status(200).send(history);
    });
}

function handleError(res, err) {
  return res.status(500).send(err);
}
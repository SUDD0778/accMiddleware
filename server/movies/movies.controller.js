'use strict';

const _ = require('lodash');
const Movies = require('./movies.model.js');
const MovieHistory = require('../userActivity/movieHistory.model.js');
const request = require('request');
const Q = require('q');
const async = require('async');

exports.fetchMoviesfromApi = function(req, res) {
    
    let url = 'https://accedo-ps-programming-exam.s3-ap-southeast-1.amazonaws.com/movies.json';
    request(url, function (err, response, body) {
    if(err) res.status(500).send(err);
        let result = body ? JSON.parse(body) : {};
        writeOrdersInDb(result.entries ? result.entries : [])
        .then(function(orders) {
            res.status(200).send({msg : 'done'});
        })
        .catch(function(err){
            res.status(400).send(err);
        });
    });
};

exports.getMovieById = function(req, res) {

    if(!req.query.userId) return handleError(res ,"User Id not found");
    if(!req.query.movieId) return handleError(res, "Movie Id not found");
    let userId = req.query.userId;
    let movieId = req.query.movieId;

    Movies.findOne({id : movieId}, function(err, movie){
        if(err) handleError(res, err);
        if(!movie)  {
            return res.status(200).send(" No movie with this id found");
        } else {
            recordHistory(userId, movieId)
            .then(function(result) {
                if(result)
                    res.status(200).send(movie);
                else 
                    res.status(200).send("some error occured");
            })
            .catch(function(err) {
                if(err) handleError(res, err);
            });
        }
    });
}

exports.fetchMovies = function(req, res) {

    if(!req.query.userId) return handleError(res, "User Id not found");
    let query = {},
        projection = {},
        limit = 0,
        skip = 10;

    try {
        projection = JSON.parse(req.query.projection);
    } catch(err) {
        projection = {};
    }
    //search by title
    if(req.query.title) {
        let re = new RegExp(req.query.title, 'i');
        query.title = re;
    }
    //saerch by catgory
    if(req.query.categories) {
        let re = new RegExp(req.query.categories, 'i');
        query.categories = { $elemMatch : { title : re } };
    }
    //saerch by parentalRatings
    if(req.query.parentalRatings) {
        let re = new RegExp(req.query.parentalRatings, 'i');
        query.parentalRatings = { $elemMatch : { rating : re } };
    }

    //saerch by credits
    if(req.query.creditsName) {
        let re = new RegExp(req.query.creditsName, 'i');
        query.credits = { $elemMatch : { name : re } };
    }
    if(req.query.creditsRole && req.query.creditsName) {
        let re = new RegExp(req.query.creditsRole, 'i');
        query.credits = { $elemMatch : { role : re } };
    }

    //saerch by dates    
    if(req.query.fromDate && req.query.toDate && req.query.filterBy) {
        let fromDate = new Date(req.query.fromDate);
        let toDate = new Date(req.query.toDate);
        toDate.setDate(toDate.getDate() + 1);
        if(req.query.filterBy && req.query.filterBy == 'availableDate')        
            query.availableDate = {$gte : fromDate, $lte : toDate};
        if(req.query.filterBy && req.query.filterBy == 'publishedDate')        
            query.publishedDate = {$gte : fromDate, $lte : toDate};
    }

    if(req.query.skip)
        skip = Number(req.query.skip);
    if(req.query.limit)
        limit = Number(req.query.limit);

    Movies.find(query, projection).skip(skip).limit(limit).exec(function(err, movie){
        if(err) handleError(res, err);
        if(!movie)  {
            return res.status(200).send(" No match found");
        } else {
            res.status(200).send(movie);
        }
    });
}

function recordHistory (userId, movieId) {
    let deferred = Q.defer();
    let historyObj = {
        userId : userId,
        movieInfo : {},
        timestamp : new Date()
    };
    historyObj.movieInfo = {
        movieId : movieId,
    };

    MovieHistory.updateOne({userId : userId},historyObj,{upsert : true}, function(err, history){
        if(err) deferred.reject(err);
        if(!history) deferred.reject(err);
        deferred.resolve(true);
    });
    return deferred.promise;
}

function writeOrdersInDb (entries) {
    let deferred = Q.defer();
    async.eachSeries(entries,function(movie, cb) {
        Movies.update({id : movie.id},movie,{upsert : true}, function(err, _movies){
            if(err) deferred.reject(err);
            if(!_movies) deferred.reject(err);
            cb();
        });
    },function (err) {
        if(err) deferred.reject(err);
        deferred.resolve(entries);
    });
    return deferred.promise;
}

function handleError(res, err) {
    return res.status(500).send(err);
}
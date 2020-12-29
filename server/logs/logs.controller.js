'use strict';

const _ = require('lodash');
const Logs = require('./logs.model.js');
const moment = require('moment');

exports.fetchLogs = function(req, res) {

    if(!req.query.level) return handleError(res, "Level not found");
    let query = {},
        projection = {},
        limit = 0,
        skip = 10;

    try {
        projection = JSON.parse(req.query.projection);
    } catch(err) {
        projection = {};
    }
    //search by level
    if(req.query.level) {
        query.level = req.query.level;
    }
    //saerch by dates    
    if(req.query.fromDate && req.query.toDate) {
        let fromDate = new Date(req.query.fromDate).toISOString();
        let toDate = new Date(req.query.toDate).toISOString();
        query.timestamp = {$gte : fromDate, $lte : toDate};
    }
    //search by response time
    if(req.query.responseTimeFrom && req.query.responseTimeTo) {
        req.query.responseTimeFrom = Number(req.query.responseTimeFrom);
        req.query.responseTimeTo = Number(req.query.responseTimeTo);
        query['meta.responseTime'] = {$gte : req.query.responseTimeFrom , $lt : req.query.responseTimeTo};
    }

    if(req.query.statusCode) {
        query['meta.res.statusCode'] = Number(req.query.statusCode);   
    }
    //method type
    if(req.query.searchQuery) {
        let re = new RegExp(req.query.searchQuery, 'i');
        query['message'] = re;
    }

    if(req.query.skip)
        skip = Number(req.query.skip);
    if(req.query.limit)
        limit = Number(req.query.limit);

    Logs.find(query, projection).skip(skip).limit(limit).exec(function(err, movie) {
        if(err) handleError(res, err);
        if(!movie)  {
            return res.status(200).send(" No match found");
        } else {
            res.status(200).send(movie);
        }
    });
}

function handleError(res, err) {
    return res.status(500).send(err);
}
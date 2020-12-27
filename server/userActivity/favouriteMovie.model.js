'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var FavouriteSchema = new Schema({
    userId: String,
    movieInfo: Object,
    timestamp : {
        type : Date
    },
});

module.exports = mongoose.model('FavouriteSchema', FavouriteSchema);
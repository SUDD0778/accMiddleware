'use strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const FavouriteSchema = new Schema({
    userId: String,
    movieInfo: Object,
    timestamp : {
        type : Date
    },
});

module.exports = mongoose.model('FavouriteSchema', FavouriteSchema);
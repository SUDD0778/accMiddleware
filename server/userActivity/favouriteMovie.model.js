'use strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const FavouriteSchema = new Schema({
    userId: String,
    movieInfo: Object,
    timestamp : Date
});
FavouriteSchema.index({timestamp: -1});

module.exports = mongoose.model('FavouriteSchema', FavouriteSchema);
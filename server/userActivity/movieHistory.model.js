'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var HistorySchema = new Schema({
    userId: String,
    movieInfo: Object,
    timestamp : Date
});
HistorySchema.index({timestamp: -1});

module.exports = mongoose.model('HistorySchema', HistorySchema);
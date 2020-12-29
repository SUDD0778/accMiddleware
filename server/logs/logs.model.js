'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');

const LogsSchema = new Schema({
  message: {
    type : String,
    text : true
  },
  meta: Object,
  timestamp  : Date,
  level : String
});

LogsSchema.index({timestamp: -1});
LogsSchema.path('message').index({text : true});

module.exports = mongoose.model('log', LogsSchema);

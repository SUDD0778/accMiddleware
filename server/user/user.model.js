'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  created  : {
    type : Date,
    deafult : Date.now()
  },
  password : String
});

module.exports = mongoose.model('User', UserSchema);

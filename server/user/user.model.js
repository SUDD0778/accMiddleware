'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');

const UserSchema = new Schema({
  name: String,
  email: { type: String, lowercase: true },
  hashedPassword: String,
  salt: String,
  created  : Date,
  password : String
});

module.exports = mongoose.model('User', UserSchema);

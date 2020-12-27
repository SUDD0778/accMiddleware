'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var MoviesSchema = new Schema({
    title: String,
    description: String,
    type: String,
    publishedDate : Date,
    availableDate : Date,
    metadata : Array,
    contents : Array,
    credits : Array,
    parentalRatings : Array,
    images: Array,
    categories : Array,
    id : String,
});

MoviesSchema
  .path('id')
  .validate(function(name) {
    return name.length;
  }, 'id cannot be blank');

MoviesSchema
  .path('id')
  .validate(function(value, respond) {
    var self = this;
    this.constructor.findOne({id: value, resource: this.resource}, function(err, resource) {
      if(err) throw err;
      if(resource) {
        if(self.id === resource.id) return respond(true);
        return respond(false);
      }
      respond(true);
    });
}, 'The movie id is already in this collection.');

MoviesSchema.index({id: 1});
module.exports = mongoose.model('MoviesSchema', MoviesSchema);


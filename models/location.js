/**
 * Created by xicunhan on 10/01/2017.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var locationSchema = new Schema({
  lon:{type:Number, required:true},
  lat:{type:Number, required:true}

});

var Location = mongoose.model('Location',locationSchema);
module.exports = Location;


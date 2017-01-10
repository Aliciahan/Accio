/**
 * Created by xicunhan on 10/01/2017.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var locateSchema = require('./location.js');



var trajetUserSchema = new Schema({
  trajet:[locateSchema],
  reserve:{type:Boolean},
  timeStamp: {type:Number},
  maxAttant:{type: Number}
});

var TrajetUser = mongoose.model('TrajetUser',trajetUserSchema);
module.exports = TrajetUser;

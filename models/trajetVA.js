/**
 * Created by xicunhan on 10/01/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var locateSchema = require('./location.js');


var trajetVASchema = new Schema({

  trajet:[locateSchema]
  //reserve:{type:Boolean},
  //timeStamp: {type:Number},
  //maxAttant:{type: Number}
});

var TrajetVA = mongoose.model('TrajetVA',trajetVASchema);
module.exports = TrajetVA;


/**
 * Created by xicunhan on 10/01/2017.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var locateSchema = require('./location.js');
var vaSchema = new Schema({

  loc :{type: {lat:Number, lon:Number}, required:true},
  nbrPersonne: Number,
  capacite: Number,
  listePersonne: [Schema.Types.ObjectId],
  trajetVa: [{lat:Number, lon:Number}],
  trajetUsers: [Schema.Types.ObjectId],
  diospo: Boolean,
});

var VehiculeAuto = mongoose.model('VehiculeAuto',vaSchema);

module.exports = VehiculeAuto;
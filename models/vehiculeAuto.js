/**
 * Created by xicunhan on 10/01/2017.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var locateSchema = require('./location.js');
var vaSchema = new Schema({

  loc :{ type: locateSchema, required:true},
  nbrPersonne: Number,
  capacite: Number,
  listePersonne: [Schema.Types.ObjectId],
  trajetVa: Schema.Types.ObjectId,
  trajetUsers: [Schema.Types.ObjectId]
});

var VehiculeAuto = mongoose.model('VehiculeAuto',vaSchema);

module.exports = VehiculeAuto;
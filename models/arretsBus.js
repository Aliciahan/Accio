/**
 * Created by xicunhan on 10/01/2017.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var locateSchema = require('./location.js');


var arretsBusSchema = new Schema({
  loc:{type:locateSchema},
  nom: {type:String}
});

var ArretsBus = mongoose.model('ArretsBus',arretsBusSchema);
module.exports = ArretsBus;
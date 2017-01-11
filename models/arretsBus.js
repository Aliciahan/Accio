/**
 * Created by xicunhan on 10/01/2017.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var arretsBusSchema = new Schema(
  {
  location:{
    lat:Number,
    lon:Number
  },
  nom: String
  }
);

arretsBusSchema.methods.test= function(){
  return 0
};


var ArretsBus = mongoose.model('ArretsBus',arretsBusSchema);

exports.module = ArretsBus;
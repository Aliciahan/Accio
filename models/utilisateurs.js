/**
 * Created by xicunhan on 10/01/2017.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var utilisateurSchema = new Schema({
  username:{type:String, lowercase: true, required:true, unique:true},
  email:{type:String, unique:true, required:true},
  passwordSalt:{type:String, required:true},
  //passwordHash:{type:String, required:true},
  role:{
    type:String, enum:['0','1','2','3','4'],
    default:'0',
    required: true
  },
  trajet:{
    depart:{lon:Number,lat:Number},
    arrivee:{lon:Number,lat:Number},
    reserve:{type:Boolean},
    timeStamp: {type:Number},
    maxAttant:{type: Number}
  }
});

var User = mongoose.model('User',utilisateurSchema);
module.exports = User;


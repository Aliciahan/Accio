/**
 * Created by xicunhan on 10/01/2017.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;




var trajetUserSchema = new Schema({
  userName: Schema.Types.ObjectId,
  depart:{lon:Number,lat:Number},
  arrivee:{lon:Number,lat:Number},
  reserve:{type:Boolean},
  timeStamp: {type:Number},
  maxAttant:{type: Number}
});

var TrajetUser = mongoose.model('TrajetUser',trajetUserSchema);
module.exports = TrajetUser;

/**
 * Created by xicunhan on 11/01/2017.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var centerCtrlSchema = new Schema({
  listUser: [Schema.Types.ObjectId],
  listVehicule:[Schema.Types.ObjectId]
});

var CenterCtrl = mongoose.model('CenterCtrl',centerCtrlSchema);
module.exports = CenterCtrl;

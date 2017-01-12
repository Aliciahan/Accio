/**
 * Created by xicunhan on 11/01/2017.
 */

var express = require('express');
var router = express.Router();

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xmlHttp = new XMLHttpRequest();

var VehiculeAuto = require('../models/vehiculeAuto');
var User  = require('../models/utilisateurs');


/* GET home page. */
router.get('/', function(req, res, next) {
  reqApi3(49.2193211, -0.3681615,49.2166514, -0.3694925,"1170b7cf-8fd0-4796-86f5-de3ca31c5d45");

  res.render('index', { title: 'Express' });
});


var reqApi3 = function(oriLat,oriLon,destLat,destLon,apiKey){
  var uri ="https://www.graphhopper.com/api/1/route?point="+oriLat.toString()+"%2C"+oriLon.toString()+"&point="+destLat.toString()+"%2C"+destLon.toString()+"&vehicle=car&locale=de&key="+apiKey;
  xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", uri, false ); // false for synchronous request
  //xmlHttp.setRequestHeader("Content-Type: text/html");
  xmlHttp.setRequestHeader("Accept: application/json");
  xmlHttp.send();
  return JSON.parse(xmlHttp.responseText);
};

module.exports = router;
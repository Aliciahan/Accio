/**
 * Created by xicunhan on 10/01/2017.
 */
var express = require('express');
var router = express.Router();
var request = require('request');

/* GET users listing. */
router.get('/', function(req, res, next) {

  rrr = testRequest();
  console.log(rrr);
  res.json(rrr);
});



var testRequest = function (){
  var res;
  var x = request("https://maps.googleapis.com/maps/api/directions/json?origin=49.188946,-0.397495&destination=49.188615,-0.396881&key=AIzaSyDQY_P21Hi8DS2ax03CxCwEKzk-AJucQWc"
  ,function (err,resp,body,callback){
      res = JSON.parse(body);
  });
};

module.exports = router;

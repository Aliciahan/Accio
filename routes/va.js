/**
 * Created by xicunhan on 10/01/2017.
 */
var express = require('express');
var router = express.Router();
var request = require('request');

/* GET users listing. */
router.get('/', function(req, res, next) {
  request('http://www.google.com',function(error,response,body){
    console.log(body)
  });
  res.send('respond with a resource');
});

module.exports = router;

/**
 * Created by xicunhan on 10/01/2017.
 */
var express = require('express');
var router = express.Router();
var request = require('request');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send("helo");
});



module.exports = router;
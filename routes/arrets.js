/**
 * Created by xicunhan on 10/01/2017.
 */
var express = require('express');
var router = express.Router();

//rajouter les modules Mongoose
var mongoose = require('mongoose');
var arretsBusSchema = require('../models/arretsBus').arretsBusSchema;
var ArretsBus = mongoose.model('ArretsBus',arretsBusSchema);

// get /arrets/
router.get('/', getarrets);

function getarrets(req,res,next){
  ArretsBus.find().exec(function getAllArrets(error,arrets){
    if(error)
      return next(error);
    res.json(arrets)
  })
}


//Create Nouvel Arret
router.post('/', createArret);
function createArret(req,res,next){
  var arret = new ArretsBus(req.body);
  arret.save(function(err,details){
    if(err){
      return next(err);
    }
    res.json(details);
  });
}

//Delete
router.delete('/:arret_id', deleteArret);
function deleteArret(req,res,next){
  ArretsBus.remove({_id:req.params.arret_id}, function(err,arret){
    if (err) return next(err);
    res.json({message:'Delete!'});
  })
}


module.exports = router;


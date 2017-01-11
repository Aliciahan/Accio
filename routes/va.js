/**
 * Created by xicunhan on 10/01/2017.
 */
var express = require('express');
var router = express.Router();
var request = require('request');
var VehiculeAuto = require('../models/vehiculeAuto');


  /* GET users listing. */
router.get('/', function(req, res, next) {
  res.send("helo");
});

router.post('/create',function(req,res,next){
  var newVa = new VehiculeAuto(req.body);
  newVa.save(function(err,details){
    if(err){next(err);}
    res.json(details);
  });
});

router.get('/all',function (req,res,next) {
  VehiculeAuto.find().exec(function(err,details){
    if(err) next(err);
    res.json(details);
  });
});

router.get('/:va_id',function(req,res,next){

  VehiculeAuto.find({_id:req.params.va_id},function(err,details){
    if(err) next(err);
    res.json(details);
  });
});


router.delete('/:va_id',function(req,res,next){
  VehiculeAuto.remove({_id:req.params.va_id},function(err,detail){
    if(err) next(err);
    res.json({Message:'Deleted!'})
  })
});




router.post('/:va_id/montrer',function(req,res,next){
  VehiculeAuto.findById(req.params.va_id, function(err,va){
    if(err) return handleError(err);

    va.loc = req.body.loc;
    va.nbrPersonne += 1;
    va.listePersonne.join(req.body.newClient);
    va.trajetVa = req.body.newTrajetVa;
    va.trajetUsers.join(req.body.trajetUserID);

    va.dispo = va.capacite > va.nbrPersonne;
    va.onMovement = true;

    va.save(function(err,updateVa){
      if(err) return next(err);
      res.json(updateVa);
    })
  })
});


module.exports = router;
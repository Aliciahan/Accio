var express = require('express');
var router = express.Router();
var User  = require('../models/utilisateurs');


/* GET users listing. */
router.get('/', function(req, res, next) {
  User.find().exec(function(err,details){
    if (err) next(err);
    res.json(details);
  })
});

router.get('/:user_id',function(req,res,next){
  User.find({_id:req.params.user_id },function(err,details){
    if(err) next(err);
    res.json(details);
  })
});

router.post('/create',function(req,res,next){
  var newUser = new User(req.body);
  newUser.save(function(err,details){
    if(err){next(err);}
    res.json(details);
  });
});

router.delete('/:va_id',function(req,res,next){
  User.remove({_id:req.params.va_id},function(err,detail){
    if(err) next(err);
    res.json({Message:'Deleted!'})
  })
});

router.post('/:va_id/addtrajet', function(req,res,next){
  User.findById(req.params.va_id,function(err,userUp){
    if(err) next(err);

    userUp.trajet.depart = req.body.depart;
    userUp.trajet.arrivee = req.body.arrivee;
    userUp.trajet.reserve = req.body.reserve;
    userUp.trajet.timeStamp = req.body.reserve;
    userUp.trajet.maxAttant = req.body.maxAttant;

    userUp.save(function(err,updateUser){
      if(err) next(err);
      res.json(updateUser);
    })
  })
});


module.exports = router;

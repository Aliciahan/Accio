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
  res.json(reqApi3(49.2193211, -0.3681615,49.2166514, -0.3694925,"1170b7cf-8fd0-4796-86f5-de3ca31c5d45"));

});


router.post('/demande', function(req,res,next) {
  VehiculeAuto.find({dispo: true, onMovement: true}, function (err, resultat) {
    if (err) next(err);
    if (resultat.length > 0) {
      //la situation dispo et onMovement
      boucle(resultat);

      //res.json(resultat);
    } else {
      VehiculeAuto.find({dispo: true}, function (err, resultat) {
        if (err) next(err);
        if (resultat.lengh > 0) {
          //la situation dispo

          res.json(resultat);
        } else {

          //la situation non service
          return JSON.parse({decision: false});
        }
      });
    }
  });
});

var boucle = function (objVA){
  //return [Best idVA, [liste newTrajet]]

  for (var i =0; i<objVA.length; i++){
    scoreVA(objVA[i]);
  }

};


var scoreVA = function(vaObjet){
  //return [score, [liste New Trajet]]

  var tjs = vaObjet.trajetUsers;
  var trajetUsersAcient=[];


    User.find()
      .where('_id').in(tjs).exec(function(err,body){
        if(err) next(err);
        trajetUsersAcient.push(body);
      });

  console.log(trajetUsersAcient);

  //initData(allUsers);
  //GAInitialize();



};


var reqApi3 = function(oriLat,oriLon,destLat,destLon,apiKey){
  var uri ="https://www.graphhopper.com/api/1/route?point="+oriLat.toString()+"%2C"+oriLon.toString()+"&point="+destLat.toString()+"%2C"+destLon.toString()+"&vehicle=car&locale=de&key="+apiKey;
  xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", uri, false ); // false for synchronous request
  //xmlHttp.setRequestHeader("Content-Type: text/html");
  xmlHttp.setRequestHeader("Accept: application/json");
  xmlHttp.send();
  return JSON.parse(xmlHttp.responseText);
};



//A nettoyer

var CROSSOVER_PROBABILITY;
var MUTATION_PROBABILITY;
var OX_CROSSOVER_RATE;
var UNCHANGED_GENS;

var mutationTimes;
var dis;
var bestValue, best;
var currentGeneration;
var currentBest;
var population;
var values;
var fitnessValues;
var roulette;

var time;
var apikey;

/*var originLat;
var originLong;
var destinationLat;
var destinationLong;*/

var compteur;

var trajet;

var points = [];

// var points_depart = [];
// var points_arrivee = [];

/*router.get('/test',function (req,res,next) {

  initData();
  //countDistances();
  GAInitialize();
  res.send("ok");
  /// res.send(bestValue.toString()+"okokok"+best.toString()+"    compteur  "+compteur);

});*/


module.exports = router;

function initData(arrUsers) {
  running = false;
  POPULATION_SIZE = 144;
  ELITE_RATE = 0.3;
  CROSSOVER_PROBABILITY = 0.9;
  MUTATION_PROBABILITY  = 0.01;
  //OX_CROSSOVER_RATE = 0.05;
  UNCHANGED_GENS = 0;
  mutationTimes = 0;
  doPreciseMutate = true;

  bestValue = undefined;
  best = [];
  currentGeneration = 0;
  currentBest;
  population = []; //new Array(POPULATION_SIZE);
  values = new Array(POPULATION_SIZE);
  fitnessValues = new Array(POPULATION_SIZE);
  roulette = new Array(POPULATION_SIZE);

  /////////////////////////////////////////////////

  time=0;
  //apikey="AIzaSyDQY_P21Hi8DS2ax03CxCwEKzk-AJucQWc";
  apikey="1170b7cf-8fd0-4796-86f5-de3ca31c5d45";

  for (var i=0; i<arrUsers.length;i++){
    points_depart.push(new Point(arrUsers[i].depart.lat,arrUsers[i].depart.lon));
    points_arrivee.push(new Point (arrUsers[i].arrivee.lat,arrUsers[i].arrivee.lon));
    points.push(new Point(arrUsers[i].depart.lat,arrUsers[i].depart.lon));
    points.push(new Point(arrUsers[i].arrivee.lat,arrUsers[i].arrivee.lon));
  }

}

function GAInitialize() {
  //countDistances();

  for(var i=0; i<POPULATION_SIZE; i++) {
    var chemin = randomIndivial(points_depart,points_arrivee);
    if (chemin!=false && !existe(population, chemin)){ //&& population.indexOf(chemin) == -1){
      console.log("test");
      population.push(chemin);
      for (var j=0; j<chemin.length; j++){
        console.log(chemin[j]);
      }
    }
  }
  setBestValue();


}

function existe(population, chemin){
  for (var i=0; i<population.length; i++){
    var test = 0;

    for (var j=0; j<chemin.length; j++){
      if (population[i][j] == chemin[j]){
        test += 1;
      }
    }
    if (test == chemin.length){return true;}
  }
  return false;
}


function GANextGeneration() {
  currentGeneration++;
  selection();
  crossover();
  mutation();
  setBestValue();
}

function tribulate() {
  //for(var i=0; i<POPULATION_SIZE; i++) {
  for(var i=population.length>>1; i<POPULATION_SIZE; i++) {
    population[i] = randomIndivial(points.length);
  }
}

function selection() {
  var parents = new Array();
  var initnum = 4;
  parents.push(population[currentBest.bestPosition]);
  parents.push(doMutate(best.clone()));
  parents.push(pushMutate(best.clone()));
  parents.push(best.clone());

  setRoulette();
  for(var i=initnum; i<POPULATION_SIZE; i++) {
    parents.push(population[wheelOut(Math.random())]);
  }
  population = parents;
}
function crossover() {
  var queue = new Array();
  for(var i=0; i<POPULATION_SIZE; i++) {
    if( Math.random() < CROSSOVER_PROBABILITY ) {
      queue.push(i);
    }
  }
  queue.shuffle();
  for(var i=0, j=queue.length-1; i<j; i+=2) {
    doCrossover(queue[i], queue[i+1]);
    //oxCrossover(queue[i], queue[i+1]);
  }
}
//function oxCrossover(x, y) {
//  //var px = population[x].roll();
//  //var py = population[y].roll();
//  var px = population[x].slice(0);
//  var py = population[y].slice(0);
//  var rand = randomNumber(points.length-1) + 1;
//  var pre_x = px.slice(0, rand);
//  var pre_y = py.slice(0, rand);
//  var tail_x = px.slice(rand, px.length);
//  var tail_y = py.slice(rand, py.length);
//  px = tail_x.concat(pre_x);
//  py = tail_y.concat(pre_y);
//  population[x] = pre_y.concat(px.reject(pre_y));
//  population[y] = pre_x.concat(py.reject(pre_x));
//}
function doCrossover(x, y) {
  child1 = getChild('next', x, y);
  child2 = getChild('previous', x, y);
  population[x] = child1;
  population[y] = child2;
}




function getChild(fun, x, y) {
  solution = new Array();
  var px = population[x].clone();
  var py = population[y].clone();
  var dx,dy;
  var c = px[randomNumber(px.length)];
  solution.push(c);
  while(px.length > 1) {
    dx = px[fun](px.indexOf(c));
    dy = py[fun](py.indexOf(c));
    px.deleteByValue(c);
    py.deleteByValue(c);
    c = dis[c][dx] < dis[c][dy] ? dx : dy;
    solution.push(c);
  }
  return solution;
}



function mutation() {
  for(var i=0; i<POPULATION_SIZE; i++) {
    if(Math.random() < MUTATION_PROBABILITY) {
      if(Math.random() > 0.5) {
        population[i] = pushMutate(population[i]);
      } else {
        population[i] = doMutate(population[i]);
      }
      i--;
    }
  }
}
function preciseMutate(orseq) {
  var seq = orseq.clone();
  if(Math.random() > 0.5){
    seq.reverse();
  }
  var bestv = evaluate(seq);
  for(var i=0; i<(seq.length>>1); i++) {
    for(var j=i+2; j<seq.length-1; j++) {
      var new_seq = swap_seq(seq, i,i+1,j,j+1);
      var v = evaluate(new_seq);
      if(v < bestv) {bestv = v, seq = new_seq; };
    }
  }
  //alert(bestv);
  return seq;
}
function preciseMutate1(orseq) {
  var seq = orseq.clone();
  var bestv = evaluate(seq);

  for(var i=0; i<seq.length-1; i++) {
    var new_seq = seq.clone();
    new_seq.swap(i, i+1);
    var v = evaluate(new_seq);
    if(v < bestv) {bestv = v, seq = new_seq; };
  }
  //alert(bestv);
  return seq;
}
function swap_seq(seq, p0, p1, q0, q1) {
  var seq1 = seq.slice(0, p0);
  var seq2 = seq.slice(p1+1, q1);
  seq2.push(seq[p0]);
  seq2.push(seq[p1]);
  var seq3 = seq.slice(q1, seq.length);
  return seq1.concat(seq2).concat(seq3);
}
function doMutate(seq) {
  mutationTimes++;
  // m and n refers to the actual index in the array
  // m range from 0 to length-2, n range from 2...length-m
  do {
    m = randomNumber(seq.length - 2);
    n = randomNumber(seq.length);
  } while (m>=n)

  for(var i=0, j=(n-m+1)>>1; i<j; i++) {
    seq.swap(m+i, n-i);
  }
  return seq;
}
function pushMutate(seq) {
  mutationTimes++;
  var m,n;
  do {
    m = randomNumber(seq.length>>1);
    n = randomNumber(seq.length);
  } while (m>=n)

  var s1 = seq.slice(0,m);
  var s2 = seq.slice(m,n)
  var s3 = seq.slice(n,seq.length);
  return s2.concat(s1).concat(s3).clone();
}
function setBestValue() {
  for(var i=0; i<population.length; i++) {
    values[i] = evaluate(population[i]);
  }
  currentBest = getCurrentBest();
  if(bestValue === undefined || bestValue > currentBest.bestValue) {
    best = population[currentBest.bestPosition].clone();
    bestValue = currentBest.bestValue;
    UNCHANGED_GENS = 0;
  } else {
    UNCHANGED_GENS += 1;
  }
}
function getCurrentBest() {
  var bestP = 0,
    currentBestValue = values[0];

  for(var i=1; i<population.length; i++) {
    if(values[i] < currentBestValue) {
      currentBestValue = values[i];
      bestP = i;
    }
  }
  return {
    bestPosition : bestP
    , bestValue    : currentBestValue
  }
}
function setRoulette() {
  //calculate all the fitness
  for(var i=0; i<values.length; i++) { fitnessValues[i] = 1.0/values[i]; }
  //set the roulette
  var sum = 0;
  for(var i=0; i<fitnessValues.length; i++) { sum += fitnessValues[i]; }
  for(var i=0; i<roulette.length; i++) { roulette[i] = fitnessValues[i]/sum; }
  for(var i=1; i<roulette.length; i++) { roulette[i] += roulette[i-1]; }
}
function wheelOut(rand) {
  var i;
  for(i=0; i<roulette.length; i++) {
    if( rand <= roulette[i] ) {
      return i;
    }
  }
}

function randomIndivial(points_depart, points_arrivee) {

  var a = [];
  var n = points_arrivee.length + points_depart.length; // nombre de points

  for(var i=0; i<n; i++) {
    a.push(i);
  }

  ////////////melange des points avec contraintes
  var chemin = a.shuffle();

  var test = true;
  for(var i=0; i<n; i+=2) {
    if (position(chemin,i) > position(chemin,i+1)){
      test = false;
      break;
    }
  }
  if (test){return chemin;}
  else {return false;}
}

function position(tab, n){
  for (var i=0; i<tab.length; i++){
    if (tab[i] == n){
      return i;
    }
  }
}


function evaluate(indivial) {
  var sum = dis[
    indivial[0]
    ]
    [
    indivial
      [
    indivial.length - 1
      ]
    ];
  for(var i=1; i<indivial.length; i++) {
    sum += dis[indivial[i]][indivial[i-1]];
  }
  return sum;
}


function countDistances() {
  var length = points.length;
  dis = new Array(length);
  for (var i = 0; i < length; i++) {
    dis[i] = new Array(length);
    for (var j = 0; j < length; j++) {


      uri = "https://www.graphhopper.com/api/1/route?point=" + points[i].x.toString() + "%2C" +
        points[i].y.toString() + "&point=" + points[j].x.toString() + "%2C" + points[j].y.toString() +
        "&vehicle=car&locale=de&key=" + apikey;


      //var uri ="https://www.graphhopper.com/api/1/route?point="+oriLat.toString()+"%2C"+oriLon.toString()+"&point="+destLat.toString()+"%2C"+destLon.toString()+"&vehicle=car&locale=de&key="+apiKey;
      xmlHttp = new XMLHttpRequest();
      xmlHttp.open("GET", uri, false); // false for synchronous request
      //xmlHttp.setRequestHeader("Content-Type: text/html");
      xmlHttp.setRequestHeader("Accept: application/json");
      xmlHttp.send();
      dis[i][j] = JSON.parse(xmlHttp.responseText.paths[0].time);

    }
  }
}



/////////////////////////////////

Array.prototype.clone = function() { return this.slice(0); }
Array.prototype.shuffle = function() {
  for(var j, x, i = this.length-1; i; j = randomNumber(i), x = this[--i], this[i] = this[j], this[j] = x);
  return this;
};

Array.prototype.indexOf = function (value) {
  for(var i=0; i<this.length; i++) {
    if(this[i] === value) {
      return i;
    }
  }
}
Array.prototype.deleteByValue = function (value) {
  var pos = this.indexOf(value);
  this.splice(pos, 1);
}
Array.prototype.next = function (index) {
  if(index === this.length-1) {
    return this[0];
  } else {
    return this[index+1];
  }
}
Array.prototype.previous = function (index) {
  if(index === 0) {
    return this[this.length-1];
  } else {
    return this[index-1];
  }
}
Array.prototype.swap = function (x, y) {
  if(x>this.length || y>this.length || x === y) {return}
  var tem = this[x];
  this[x] = this[y];
  this[y] = tem;
}
Array.prototype.roll = function () {
  var rand = randomNumber(this.length);
  var tem = [];
  for(var i = rand; i<this.length; i++) {
    tem.push(this[i]);
  }
  for(var i = 0; i<rand; i++) {
    tem.push(this[i]);
  }
  return tem;
}
Array.prototype.reject = function (array) {
  return $.map(this,function (ele) {
    return $.inArray(ele, array) < 0 ? ele : null;
  })
}
function intersect(x, y) {
  return $.map(x, function (xi) {
    return $.inArray(xi, y) < 0 ? null : xi;
  })
}
function Point(x, y) {
  this.x = x;
  this.y = y;
}

function randomNumber(boundary) {
  return parseInt(Math.random() * boundary);
  //return Math.floor(Math.random() * boundary);
}

module.exports = router;
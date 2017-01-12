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

module.exports = router;

///var sleep = require('sleep');

var http = require("http");

var express = require('express');
var router = express.Router();
//var request=require("request");
var fs = require("fs");

var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xmlHttp = new XMLHttpRequest();

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

var originLat;
var originLong;
var destinationLat;
var destinationLong;

var compteur;

var trajet;

var points = [];

router.get('/test',function (req,res,next) {

    initData();
    countDistances();
    res.send("ok");
   ///GAInitialize();
   /// res.send(bestValue.toString()+"okokok"+best.toString()+"    compteur  "+compteur);

});


module.exports = router;

function initData() {
    running = false;
    POPULATION_SIZE = 30;
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

    points.push(new Point(49.2228327, -0.370879 ));
    points.push(new Point(49.2215374, -0.3729479 ));
    points.push(new Point(49.2193211, -0.3681615));
    points.push(new Point(49.2166514, -0.3694925));
    /*points.push(new Point(49.2133912, -0.3753152));
    points.push(new Point(49.2114286, -0.3732522));
    points.push(new Point(49.2098955, -0.3701443));*/

    compteur=0;

}

function GAInitialize() {
    countDistances();
    for(var i=0; i<POPULATION_SIZE; i++) {
        population.push(randomIndivial(points.length));
    }
    setBestValue();
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
function randomIndivial(n) {
    var a = [];
    for(var i=0; i<n; i++) {
        a.push(i);
    }

    ////////////melange des points avec contraintes

    return a.shuffle();



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
   /* var length = points.length;
    dis = new Array(length);
    for(var i=0; i<length; i++) {
        dis[i] = new Array(length);
        for(var j=0; j<length; j++) {
           //sleep.sleep(1);*/
          /* var uri="https://maps.googleapis.com/maps/api/directions/json?origin="+points[0].x.toString()+","+points[0].y.toString()+
           "&destination="+points[1].x.toString()+","+points[1].y.toString()+"&key="+apikey;//&sensor=false&departure_time=1343605500&mode=transit;
          console.log(uri);*/

    points.push(new Point(49.2193211, -0.3681615));
    points.push(new Point(49.2166514, -0.3694925));

    //var uri="https://maps.googleapis.com/maps/api/directions/json?origin=49.2193211,-0.3681615&destination=49.2166514,-0.3694925&key=AIzaSyDQY_P21Hi8DS2ax03CxCwEKzk-AJucQWc";//&sensor=false&departure_time=1343605500&mode=transit;
          var uri ="https://www.graphhopper.com/api/1/route?point="+points[0].x.toString()+"%2C"+
              points[0].y.toString()+"&point="+points[1].x.toString()+"%2C"+points[1].y.toString()+
              "&vehicle=car&locale=de&key="+apikey;
    console.log(uri);
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", uri, false ); // false for synchronous request
    //xmlHttp.setRequestHeader("Content-Type: text/html");
    xmlHttp.setRequestHeader("Accept: application/json");
    xmlHttp.send();
          // dis[i][j] = JSON.parse(xmlHttp.responseText.routes[0].legs[0].duration.value);
            dis[i][j] = JSON.parse(xmlHttp.responseText.paths[0].time);
            //dis[i][j] = (Math.random() * 20);
            compteur++;


      }
    //}

   /*http.get(uri, (res) => {
        const statusCode = res.statusCode;
    const contentType = res.headers['content-type'];

    let error;
   if (!/^application\/json/.test(contentType)) {
        error = new Error(`Invalid content-type.\n` +
            `Expected application/json but received ${contentType}`);
    }

    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => rawData += chunk);
    res.on('end', () => {
        try {
            let parsedData = JSON.parse(rawData);
    dis[i][j] = parsedData.paths.time;
    console.log(parsedData);
} catch (e) {
        console.log(rawData);
        console.log(e.message);
    }
});
}).on('error', (e) => {
        console.log(`Got error: ${e.message}`);
});
}*/

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


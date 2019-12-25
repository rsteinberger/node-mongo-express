const express = require('express')
const app = express()

var Db = require('mongodb').Db,
    MongoClient = require('mongodb').MongoClient,
    Server = require('mongodb').Server,
    ReplSetServers = require('mongodb').ReplSetServers,
    ObjectID = require('mongodb').ObjectID,
    Binary = require('mongodb').Binary,
    GridStore = require('mongodb').GridStore,
    Grid = require('mongodb').Grid,
    Code = require('mongodb').Code;

var createdCtr = 0;
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/local";
var collectionNames = ["association", "audio", "authority", "customer", "event", "pivot", "rule", "setting", "tag", "user"];

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8000"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

MongoClient.connect(url, {native_parser:true, useUnifiedTopology: true}, function(err, db) {
  if (err) throw err;

  console.log("Creating Client");

  var dbo = db.db("local");
  const cursor = dbo.collection('event').find({});


});


app.get('/', function (req, res) {
  res.send('hello world')
})

app.get('/regions', function (req, res) {
  MongoClient.connect(url, {useUnifiedTopology: true}, function(err, db) {
    if (err) throw err;
    var dbo = db.db("local");
    dbo.collection("pivot").find({_class: "region"}).toArray(function(err, result) {
      if (err) throw err;
      db.close();
      res.send(result);
    });
  });
});

app.get('/region', function (req, res) {
  console.log(req.query);
  MongoClient.connect(url, {useUnifiedTopology: true}, function(err, db) {
    if (err) throw err;
    var dbo = db.db("local");
    dbo.collection("pivot").find({_class: "country", region_id: req.query.id}).toArray(function(err, result) {
      if (err) throw err;
      db.close();
      res.send(result)
    });
  });
});

app.get('/country', function (req, res) {
  console.log(req.query);
  MongoClient.connect(url, {useUnifiedTopology: true}, function(err, db) {
    if (err) throw err;
    var dbo = db.db("local");
    dbo.collection("pivot").find({_class: "country", _id: req.query.id}).toArray(function(err, result) {
      if (err) throw err;
      db.close();
      res.send(result)
    });
  });
});


app.listen(3000)

















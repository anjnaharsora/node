/**
 * Created by lcom23_two on 1/20/2017.
 */

var express = require("express");
var bodyParser = require('body-parser');
var path = require("path");


var app = express();

var server = require('http').Server(app);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
var mongobd = require("mongodb");
var MongoClient = mongobd.MongoClient;
var url = "mongodb://localhost:27017/dataTable";


app.post('/insert',function (req, res) {
    MongoClient.connect(url,function (err , db) {
        if (!err) {
            db.collection('dt').insert({"name": req.body.name,"quote" : req.body.quote});

            db.collection('dt').find({"name" : req.body.name}).toArray(function (err, data) {
                if(err){
                    console.log(err);
                }
                else {
                    console.log(data);
                    res.send(data);
                }
            });
            // db.close();
        }
    });

});

app.post('/display',function (req, res) {
    MongoClient.connect(url,function (err , db) {
        if (!err) {

            db.collection('dt').find({}).sort({_id : 1}).toArray(function (err, data) {
                if(err){
                    console.log(err);
                }
                else {
                    console.log(data);
                    res.send(data);
                }
            });
            // db.close();
        }
    });

});

app.post('/delete',function (req, res) {
    MongoClient.connect(url,function (err , db) {
        if (!err) {

            db.collection('dt').remove({"name" : req.body.name},function (err, data) {
                if(err){
                    console.log(err);
                }
                else {
                    console.log("dta removed!!!!!!!!!");
                }
            });
            // db.close();
        }
    });

});

app.post('/update',function (req, res) {
    MongoClient.connect(url,function (err , db) {
        if (!err) {
            db.collection('dt').update({"name": req.body.old_name},{$set:{"name": req.body.name,"quote" : req.body.quote}});

            db.collection('dt').find({"name" : req.body.name}).toArray(function (err, data) {
                if(err){
                    console.log(err);
                }
                else {
                    console.log(data);
                    res.send(data);
                }
            });
            // db.close();
        }
    });

});

var server = app.listen(8055,function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("host:port  %s:%s",host,port);
});
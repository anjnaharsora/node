var express = require("express");
var bodyParser = require('body-parser');
var path = require("path");
var fs = require("fs");

var app = express();

var server = require('http').Server(app);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
var mongobd = require("mongodb");
var MongoClient = mongobd.MongoClient;
var url = "mongodb://localhost:27017/formdata";

app.post('/register',function (req, res) {

    MongoClient.connect(url,function (err , db) {
        if (!err) {
            db.collection('frm').insert({"fname": req.body.fname,"lname": req.body.lname,"email": req.body.email});

                res.send("data added");
        }
    });

});
app.post('/delete',function (req, res) {
    MongoClient.connect(url,function (err , db) {
        if (!err) {

            db.collection('frm').remove({"fname" : req.body.fname},function (err, data) {
                if(err){
                    console.log(err);
                }
                else {
                    console.log("dta removed!!!!!!!!!");
                }
            });
        }
    });

});

app.post('/update',function (req, res) {
    MongoClient.connect(url,function (err , db) {
        if (!err) {
            db.collection('frm').update({"fname": req.body.fname},{$set:{"fname": req.body.nfname,"lname": req.body.nlname,"email" : req.body.nmail}});

            db.collection('frm').find({"fname" : req.body.nfname}).toArray(function (err, data) {
                if(err){
                    console.log(err);
                }
                else {
                    console.log(data);
                }
            });
        }
    });

});
app.post('/display',function (req, res) {
    MongoClient.connect(url,function (err , db) {
        if (!err) {

            db.collection('frm').find({name : req.body.name}).toArray(function (err, data) {
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

var server = app.listen(8087,function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("host:port  %s:%s",host,port);
});
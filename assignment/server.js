var express = require("express");
var bodyParser = require('body-parser');
var path = require("path");
var fs = require("fs");
var app = express();

var server = require('http').Server(app);

app.use(express.static(__dirname+"/public"));

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
var mongobd = require("mongodb");
var MongoClient = mongobd.MongoClient;
var url = "mongodb://localhost:27017/dataTable";


app.get("/frm",function (req, res) {
    res.sendFile(__dirname+"/public/index.html");
});
app.get("/state",function (req, res) {

    MongoClient.connect(url,function (err , db) {
        if (!err) {

            db.collection('state').find({}).toArray(function (err, data) {
                if(err){
                    console.log(err);
                }
                else {

                    res.send(data);
                }
            });
            // db.close();
        }
    });
});

app.get("/city/:state",function (req, res) {

    MongoClient.connect(url,function (err , db) {
        if (!err) {

            db.collection('city').find({"state":{$eq:req.params.state}}).toArray(function (err, data) {

                if(err){
                    console.log(err);
                }
                else {

                    res.send(data);
                }
            });
            // db.close();
        }
    });
});

app.post('/insert',function (req, res) {
    console.log(req);

    MongoClient.connect(url,function (err , db) {
            console.log("Inside connection")
        if (!err) {
            console.log("Inside db"+db)
            db.collection('data').insert({"name": req.body.name,"state": req.body.state,"city": req.body.city,"gender": req.body.gender,"email": req.body.email});


            const msg = {status: 1, message: "Successfully inserted"};
            res.json(msg);
        }
        else {
            console.log(err);
            const msg = {status: 0, message: "Fail to insert data"};
            res.json(msg);
        }
    });

});

app.get("/getData",function (req, res) {

    MongoClient.connect(url,function (err , db) {
        if (!err) {

            db.collection('data').find({}).toArray(function (err, data) {

                if(err){
                    console.log(err);
                    res.send(err);
                }
                else {

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
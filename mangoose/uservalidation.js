/**
 * Created by lcom23_two on 1/21/2017.
 */
var Person = require("./User.js");
var express = require("express");
var bodyParser = require('body-parser');

var app = express();


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/dataTable');

app.post("/insert",function (req, res) {
    Person.find({"name" : req.body.name},(function (err,data)
        {
            if(data.length>0){
                res.send("data exist!!!");
                res.send(data);

            }
           // else if(req.body.name===data["name"]){
           //      res.send("data exist!!!");
           //      res.send(data);
           //  }
            else{
                var person = new Person();
                person.name = req.body.name;
                person.username = req.body.username;
                person.password = req.body.password;

                person.save(function (err,data) {
                    if(err){
                        res.send(err);
                    }
                    else{
                        res.send(data);
                    }
                });
            }
        })
    );

});

app.post("/update",function (req, res) {

    Person.update({"name":req.body.name},{$set:{"username":"username","password":"password"}},function (err,data) {
        if(err){
            res.send(err);
        }
        else{
            res.send(data);
        }
    });
});

app.post("/delete",function (req, res) {

    Person.remove({"name":req.body.name},function (err,data) {
        if(err){
            res.send(err);
        }
        else{
            res.send(data);
        }
    });
});

app.post("/display",function (req, res) {

    Person.find({"name" : req.body.name},(function (err,data)
        {
            if(err){
                res.send(err);
            }
            else {
                res.send(data);

            }
        })
    );
});
var server = app.listen(8076,function () {
    var host = server.address().address;
    var port  = server.address().port;
    console.log(host + port);
});
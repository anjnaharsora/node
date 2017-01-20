var Person = require("./User.js");
var express = require("express");
var bodyParser = require('body-parser');

var app = express();


app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/dataTable');

app.post("/insert",function (req, res) {
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

    Person.find(function (err,data)
    {
        if(err){
            res.send(err);
        }
        else {
            res.send(data);
        }
    });

});
/*var u1=new user({name : "kinjal",   username: "kinjalm",
    password: "kinjal1",
    admin: true,
    location: "surat"
});
console.log("name:"+u1.name+"\nUsername:"+u1.username);*/

var server = app.listen(8075,function () {
    var host = server.address().address;
    var port  = server.address().port;
    console.log(host + port);
});
/**
 * Created by lcom23_two on 1/19/2017.
 */
var mconnect = require("./mconnect");
var deleteUser = require("./deleteuser");
var updateuser = require("./updateuser");
var adduser = require("./adduser");
var bodyParser = require('body-parser');
var express = require("express");
var path = require("path");


var app = express();
var server = require('http').Server(app);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.get("/mget",function (err, data) {

        mconnect.get(data);
       // console.log(data);

});

app.get("/insert",function (err, data) {

    adduser.get(data);
    // console.log(data);

});

app.get("/update",function (err, data) {

    updateuser.get(data);

    // console.log(data);

});

app.get("/delete",function (err, data) {

    deleteUser.get(data);
    // console.log(data);

});


var server = app.listen(8055,function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("host:port  %s:%s",host,port);
});
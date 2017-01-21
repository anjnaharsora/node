/**
 * Created by lcom23_two on 1/20/2017.
 */
var Person = require("./User");
var express = require("express");
var bodyParser = require('body-parser');

var app = express();

var server = require('http').Server(app);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/dataTable");



app.post("/display",function (req, res) {

    Person.findOne({"name" : req.body.name},(function (err,data)
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
var server = app.listen(7055,function () {
    var host = server.address().address;
    var port  = server.address().port;
    console.log(host + port);
});

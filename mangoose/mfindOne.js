/**
 * Created by lcom23_two on 1/20/2017.
 */
var User = require("./User");
var express = require("express");
var bodyParser = require('body-parser');

var app = express();

var server = require('http').Server(app);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/dataTable");


// find each person with a last name matching 'Ghost', selecting the `name` and `occupation` fields
User.findOne({ 'name': 'kinjal' }, 'username password', function (err, person) {
    if (err) return handleError(err);
    console.log('%s %s is a %s.', person.name.first, person.name.last, person.occupation) // Space Ghost is a talk show host.
})



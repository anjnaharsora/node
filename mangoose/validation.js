/**
 * Created by lcom23_two on 1/21/2017.
 */
var express = require("express");
var bodyParser = require('body-parser');
var assert = require('mongoose-assert');

var app = express();

var server = require('http').Server(app);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/dataTable");

var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});
var Cat = mongoose.model('Cat', schema);

// This cat has no name :(
var cat = new Cat();
cat.save(function(error) {
   // assert.equal(error.message,
        //'Path `name` is required.');
console.log(error.errors['name'].message);

    // error = cat.validateSync();
    // assert.equal(error.errors['name'].message,
    //     'Path `name` is required.');
});

var server = app.listen(8056,function () {
    var host = server.address().address;
    var port  = server.address().port;
    console.log(host + port);
});
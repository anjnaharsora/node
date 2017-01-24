/**
 * Created by lcom23_two on 1/21/2017.
 */
var express = require("express");
var assert = require('mongoose-assert');
var bodyParser = require('body-parser');
var Breakfast = require("./Breakfast.js");

var app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/dataTable');

var badBreakfast = new Breakfast({
    eggs: 2,
    bacon: 0,
    drink: 'Milk'
});
var error = badBreakfast.validateSync();
// console.log(error);
if(error.errors['eggs'].message==='Too few eggs'){
console.log(error.errors['eggs'].message);
}
// if(error.errors['bacon'].message==='Why not bacon?'){
//     console.log(error.errors['eggs'].message);
// }
if(error.errors['drink'].message==='`Milk` is not a valid enum value for path `drink`.'){
    console.log(error.errors['drink'].message);
}

// assert.equal(error.errors['eggs'].message,
//     'Too few eggs');
// assert.ok(!error.errors['bacon']);
// assert.equal(error.errors['drink'].message,
//     '`Milk` is not a valid enum value for path `drink`.');

badBreakfast.bacon = null;
error = badBreakfast.validateSync();
